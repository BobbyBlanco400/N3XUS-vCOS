import { commandBus } from './CommandBus';

interface FlowNode {
    id: string;
    timestamp: number;
}

interface FlowEdge {
    source: string;
    target: string;
    weight: number;
    lastActive: number;
}

export class CreativeFlowEngine {
    private static instance: CreativeFlowEngine;
    private history: FlowNode[] = [];
    private edges: Map<string, FlowEdge> = new Map();
    private readonly DECAY_MS = 1000 * 60 * 5; // 5 minutes decay
    private readonly MAX_HISTORY = 50;

    private constructor() {
        this.setupListeners();
    }

    public static getInstance(): CreativeFlowEngine {
        if (!CreativeFlowEngine.instance) {
            CreativeFlowEngine.instance = new CreativeFlowEngine();
        }
        return CreativeFlowEngine.instance;
    }

    private setupListeners() {
        // Listen for window open/focus events
        commandBus.on('window:focus', (appId: string) => this.trackInteraction(appId));
        commandBus.on('app:launch', (appId: string) => this.trackInteraction(appId));
    }

    public trackInteraction(appId: string) {
        const now = Date.now();
        
        // Add to history
        const lastNode = this.history.length > 0 ? this.history[this.history.length - 1] : null;
        
        if (lastNode && lastNode.id !== appId) {
            // Create or update edge
            const edgeKey = `${lastNode.id}-${appId}`;
            const existing = this.edges.get(edgeKey);
            
            if (existing) {
                existing.weight += 1;
                existing.lastActive = now;
            } else {
                this.edges.set(edgeKey, {
                    source: lastNode.id,
                    target: appId,
                    weight: 1,
                    lastActive: now
                });
            }
        }

        this.history.push({ id: appId, timestamp: now });
        if (this.history.length > this.MAX_HISTORY) {
            this.history.shift();
        }

        // Notify Constellation Mode to update
        commandBus.emit('flow:update', this.getFlowMap());
    }

    public getFlowMap() {
        const now = Date.now();
        // Filter out decayed edges
        const activeEdges = Array.from(this.edges.values()).filter(edge => {
            return (now - edge.lastActive) < this.DECAY_MS;
        });

        return {
            nodes: this.history.map(h => h.id),
            edges: activeEdges
        };
    }
}

export const creativeFlowEngine = CreativeFlowEngine.getInstance();
