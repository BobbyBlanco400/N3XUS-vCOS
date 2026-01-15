import { commandBus } from './CommandBus';
import { creativeFlowEngine } from './CreativeFlowEngine';

interface TemporalPattern {
    hour: number;
    moduleId: string;
    count: number;
}

interface SessionState {
    workspace: string[]; // List of open app IDs
    focusedApp: string | null;
    zoomLevel: number;
    timestamp: number;
}

export type UserIntent = 'build' | 'explore' | 'create' | 'idle';

export class IntelligenceEngine {
    private static instance: IntelligenceEngine;
    private temporalData: TemporalPattern[] = [];
    private sessionHistory: string[] = [];
    private lastActionTime: number = Date.now();
    private currentIntent: UserIntent = 'idle';

    private constructor() {
        this.loadTemporalData();
        this.setupListeners();
        this.startIntentLoop();
    }

    public static getInstance(): IntelligenceEngine {
        if (!IntelligenceEngine.instance) {
            IntelligenceEngine.instance = new IntelligenceEngine();
        }
        return IntelligenceEngine.instance;
    }

    private setupListeners() {
        commandBus.on('window:focus', (appId: string) => this.trackAction(appId));
        commandBus.on('app:launch', (appId: string) => this.trackAction(appId));
        commandBus.on('constellation:zoom', (scale: number) => this.updateSessionZoom(scale));
    }

    private loadTemporalData() {
        const stored = localStorage.getItem('nexus_temporal_patterns');
        if (stored) {
            this.temporalData = JSON.parse(stored);
        }
    }

    private saveTemporalData() {
        localStorage.setItem('nexus_temporal_patterns', JSON.stringify(this.temporalData));
    }

    public trackAction(moduleId: string) {
        const now = new Date();
        const hour = now.getHours();
        this.lastActionTime = now.getTime();

        // Update Temporal Patterns
        const existing = this.temporalData.find(p => p.hour === hour && p.moduleId === moduleId);
        if (existing) {
            existing.count++;
        } else {
            this.temporalData.push({ hour, moduleId, count: 1 });
        }
        this.saveTemporalData();

        // Update Session History
        this.sessionHistory.push(moduleId);
        if (this.sessionHistory.length > 20) this.sessionHistory.shift();

        // Trigger Intent Check immediately on action
        this.detectIntent();
        
        // Emit Context Update
        commandBus.emit('nexus:context-update', {
            intent: this.currentIntent,
            suggestions: this.getSuggestions()
        });
    }

    private updateSessionZoom(scale: number) {
        // Debounce save? For now just store in memory or a simpler session object
        // Actual persistence happens in saveSessionState
    }

    private startIntentLoop() {
        setInterval(() => this.detectIntent(), 5000); // Check every 5s
    }

    private detectIntent() {
        const now = Date.now();
        const timeSinceLastAction = now - this.lastActionTime;
        
        let newIntent: UserIntent = 'idle';

        if (timeSinceLastAction > 30000) {
            newIntent = 'idle';
        } else {
            // Analyze recent history (last 5 items)
            const recent = this.sessionHistory.slice(-5);
            const uniqueApps = new Set(recent).size;

            if (recent.length < 3) {
                newIntent = 'explore';
            } else if (uniqueApps === 1) {
                newIntent = 'create'; // Focused on one app
            } else if (uniqueApps > 3) {
                newIntent = 'explore'; // Rapid switching
            } else {
                newIntent = 'build'; // Switching between a few related apps
            }
        }

        if (newIntent !== this.currentIntent) {
            this.currentIntent = newIntent;
            commandBus.emit('nexus:intent-change', newIntent);
        }
    }

    public getSuggestions(): string[] {
        // 1. Get Flow-based next steps from CreativeFlowEngine (if available) or internal history
        const lastApp = this.sessionHistory[this.sessionHistory.length - 1];
        if (!lastApp) return [];

        const suggestions = new Set<string>();

        // 2. Add Temporal Recommendations
        const currentHour = new Date().getHours();
        const temporalRecs = this.temporalData
            .filter(p => p.hour === currentHour || p.hour === currentHour - 1 || p.hour === currentHour + 1)
            .sort((a, b) => b.count - a.count)
            .slice(0, 2)
            .map(p => p.moduleId);
        
        temporalRecs.forEach(id => suggestions.add(id));

        // 3. Add Flow Recommendations (simple transition logic for now)
        // In a real scenario, we'd query CreativeFlowEngine's edge weights
        // For now, let's assume we want to suggest 'creator-hub' if 'v-suite' is open, etc.
        if (lastApp === 'v-suite') suggestions.add('creator-hub');
        if (lastApp === 'creator-hub') suggestions.add('puabo-fleet');
        
        return Array.from(suggestions).filter(id => id !== lastApp).slice(0, 3);
    }

    public saveSessionState(openWindows: string[], focusedWindow: string | null, zoom: number) {
        const state: SessionState = {
            workspace: openWindows,
            focusedApp: focusedWindow,
            zoomLevel: zoom,
            timestamp: Date.now()
        };
        localStorage.setItem('nexus_last_session', JSON.stringify(state));
    }

    public restoreSessionState(): SessionState | null {
        const stored = localStorage.getItem('nexus_last_session');
        return stored ? JSON.parse(stored) : null;
    }
    
    public getCurrentIntent(): UserIntent {
        return this.currentIntent;
    }
    public getUsageCount(moduleId: string): number {
        return this.temporalData
            .filter(p => p.moduleId === moduleId)
            .reduce((acc, curr) => acc + curr.count, 0);
    }
}

export const intelligenceEngine = IntelligenceEngine.getInstance();
