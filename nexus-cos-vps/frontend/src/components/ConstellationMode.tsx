import React, { useState, useEffect, useRef } from 'react';
import { commandBus } from '../utils/CommandBus';
import { soundManager } from '../utils/SoundManager';
import { creativeFlowEngine } from '../utils/CreativeFlowEngine';
import { intelligenceEngine } from '../utils/IntelligenceEngine';
import { Module, App } from '../types/nexus';
import { MotionTuningPanel } from './MotionTuningPanel';

interface ConstellationModeProps {
  modules: Module[];
  creatorMode: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface Node {
  id: string;
  type: 'module' | 'app';
  label: string;
  x: number;
  y: number;
  r: number;
  parent?: string;
  data?: any;
}

interface Edge {
  source: string;
  target: string;
}

const ConstellationMode: React.FC<ConstellationModeProps> = ({ modules, creatorMode }) => {
  const [active, setActive] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [pathway, setPathway] = useState<string[]>([]);
  const [aiActive, setAiActive] = useState(false);
  const [flowMap, setFlowMap] = useState<any>(null); // PR 21
  const [drift, setDrift] = useState<Point>({ x: 0, y: 0 }); // Fix missing state
  const [identityPulse, setIdentityPulse] = useState(false); // PR 23: Identity Pulse
  const [portalActive, setPortalActive] = useState(false); // PR 23: Portal Transition
  
  // PR 32: Motion Tuning State
  const [driftIntensity, setDriftIntensity] = useState(0.5); // Default higher for visibility
  const [parallaxDepth, setParallaxDepth] = useState(1);
  const [glowStrength, setGlowStrength] = useState(0.5);

  // PR 33: AI Suggestions
  const [suggestedNodes, setSuggestedNodes] = useState<string[]>([]);
  
  // Dragging & Panning State
  const [isPanning, setIsPanning] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });

  // PR 33: AI Navigation Logic
  const triggerAiNavigation = () => {
      if (!nodes.length) return;
      const randomNodes = [...nodes].sort(() => 0.5 - Math.random()).slice(0, 3).map(n => n.id);
      setSuggestedNodes(randomNodes);
      setAiActive(true);
      soundManager.playConstellationTone(600);
      
      const firstNode = nodes.find(n => n.id === randomNodes[0]);
      if (firstNode) {
          const targetScale = 1.5;
          const targetX = (window.innerWidth / 2) - (firstNode.x * targetScale);
          const targetY = (window.innerHeight / 2) - (firstNode.y * targetScale);
          setOffset({ x: targetX, y: targetY });
          setScale(targetScale);
      }
  };

  const previousTimeRef = useRef<number>();
  const requestRef = useRef<number>();
  const svgRef = useRef<SVGSVGElement>(null);

  // PR 5 & 32: Idle Drift
  const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
          const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (!isReducedMotion && !isPanning && !draggedNodeId) {
              setDrift(prev => ({
                  x: prev.x + Math.sin(time * 0.0005) * driftIntensity,
                  y: prev.y + Math.cos(time * 0.0005) * driftIntensity
              }));
          }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current!);
  }, [isPanning, draggedNodeId, driftIntensity]);

  // PR 21: Listen for Flow Updates
  useEffect(() => {
    const updateHandler = (map: any) => setFlowMap(map);
    commandBus.on('flow:update', updateHandler);
    // Initial fetch
    setFlowMap(creativeFlowEngine.getFlowMap());
    return () => commandBus.off('flow:update', updateHandler);
  }, []);

  // Layout calculation (PR 31: Custom Layouts)
  useEffect(() => {
    if (!modules.length) return;

    // Load saved layout
    const savedLayout = localStorage.getItem('nexus_constellation_layout');
    const customPositions = savedLayout ? JSON.parse(savedLayout) : {};

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moduleRadius = 250;
    const appRadius = 80;

    modules.forEach((mod, i) => {
      // Use saved position or default ring
      let modX, modY;
      if (customPositions[mod.id]) {
          modX = customPositions[mod.id].x;
          modY = customPositions[mod.id].y;
      } else {
          const angle = (i / modules.length) * 2 * Math.PI;
          modX = centerX + Math.cos(angle) * moduleRadius;
          modY = centerY + Math.sin(angle) * moduleRadius;
      }

      newNodes.push({
        id: mod.id,
        type: 'module',
        label: mod.name,
        x: modX,
        y: modY,
        r: 30,
        data: mod
      });

      mod.apps.forEach((app, j) => {
        let appX, appY;
        if (customPositions[app.id]) {
            appX = customPositions[app.id].x;
            appY = customPositions[app.id].y;
        } else {
            const angle = (i / modules.length) * 2 * Math.PI;
            const appAngle = angle + ((j - mod.apps.length / 2 + 0.5) * 0.5);
            appX = modX + Math.cos(appAngle) * appRadius;
            appY = modY + Math.sin(appAngle) * appRadius;
        }

        newNodes.push({
          id: app.id,
          type: 'app',
          label: app.name,
          x: appX,
          y: appY,
          r: 15,
          parent: mod.id,
          data: app
        });

        newEdges.push({ source: mod.id, target: app.id });
      });
    });

    // Inter-module connections (ring)
    for (let i = 0; i < modules.length; i++) {
      newEdges.push({
        source: modules[i].id,
        target: modules[(i + 1) % modules.length].id
      });
    }

    // PR 11: Creator-Only Nodes
    if (creatorMode) {
        const creatorNodes = [
            { id: 'core-engine', label: 'Core Engine', x: centerX, y: centerY, r: 40 },
            { id: 'theme-matrix', label: 'Theme Matrix', x: centerX - 100, y: centerY - 100, r: 25 },
            { id: 'motion-lab', label: 'Motion Lab', x: centerX + 100, y: centerY - 100, r: 25 },
            { id: 'node-editor', label: 'Node Editor', x: centerX - 100, y: centerY + 100, r: 25 },
            { id: 'flow-engine', label: 'Flow Engine', x: centerX + 100, y: centerY + 100, r: 25 }
        ];

        creatorNodes.forEach(node => {
            let nodeX = node.x;
            let nodeY = node.y;
            
            if (customPositions[node.id]) {
                nodeX = customPositions[node.id].x;
                nodeY = customPositions[node.id].y;
            }

            newNodes.push({
                id: node.id,
                type: 'module', // Treat as module for size/color
                label: node.label,
                x: nodeX,
                y: nodeY,
                r: node.r,
                data: { icon: '🛠️' }
            });
            // Connect to center
            if (node.id !== 'core-engine') {
                newEdges.push({ source: 'core-engine', target: node.id });
            }
        });
        
        // Connect Core to all modules
        modules.forEach(mod => {
            newEdges.push({ source: 'core-engine', target: mod.id });
        });
    }

    setNodes(newNodes);
    setEdges(newEdges);
  }, [modules, creatorMode]);

  // Command Bus Listeners
  useEffect(() => {
    const toggleHandler = () => setActive(prev => !prev);
    const contextHandler = (data: any) => setSuggestedNodes(data.suggestions); // Phase 1: Context Awareness
    
    commandBus.on('constellation:toggle', toggleHandler);
    commandBus.on('nexus:context-update', contextHandler);
    
    return () => {
      commandBus.off('constellation:toggle', toggleHandler);
      commandBus.off('nexus:context-update', contextHandler);
    };
  }, []);

  // Cinematic Audio Mode (PR 9)
  useEffect(() => {
    if (active) {
        soundManager.startAmbience();
    } else {
        soundManager.stopAmbience();
    }
  }, [active]);

  // Pan/Zoom Logic
  const handleWheel = (e: React.WheelEvent) => {
    const zoomSensitivity = 0.001;
    const newScale = Math.max(0.1, Math.min(5, scale - e.deltaY * zoomSensitivity));
    setScale(newScale);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation(); // Prevent panning
    setDraggedNodeId(nodeId);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else if (draggedNodeId) {
        // PR 31: Live Node Dragging
        const worldX = (e.clientX - offset.x) / scale;
        const worldY = (e.clientY - offset.y) / scale;
        
        setNodes(prev => prev.map(n => {
            if (n.id === draggedNodeId) {
                return { ...n, x: worldX, y: worldY };
            }
            return n;
        }));
    }
  };

  const handleMouseUp = () => {
    if (draggedNodeId) {
        // PR 31: Save Layout
        const savedLayout = localStorage.getItem('nexus_constellation_layout');
        const customPositions = savedLayout ? JSON.parse(savedLayout) : {};
        
        const node = nodes.find(n => n.id === draggedNodeId);
        if (node) {
            customPositions[draggedNodeId] = { x: node.x, y: node.y };
            localStorage.setItem('nexus_constellation_layout', JSON.stringify(customPositions));
        }
        setDraggedNodeId(null);
    }
    setIsPanning(false);
  };

  const handleNodeClick = (e: React.MouseEvent, node: Node) => {
    e.stopPropagation();
    
    // PR 9: Audio
    soundManager.playConstellationTone(node.type === 'module' ? 220 : 440);

    // PR 3 Logic (Restored)
    setSelectedNode(node.id);
    
    // Pathway Logic
    if (pathway[pathway.length - 1] !== node.id) {
        setPathway(prev => {
            const newPath = [...prev, node.id];
            return newPath.slice(-5); // Keep last 5
        });
    }

    // AI Integration
    commandBus.emit('nexus:node-selected', { nodeId: node.id, type: node.type });

    if (node.type === 'module') {
        commandBus.emit('nexus:cluster-focus', { moduleId: node.id });
        // Zoom to module
        const targetScale = 2;
        const targetX = (window.innerWidth / 2) - (node.x * targetScale);
        const targetY = (window.innerHeight / 2) - (node.y * targetScale);
        setOffset({ x: targetX, y: targetY });
        setScale(targetScale);
    } else {
        commandBus.emit('nexus:app-init', { appId: node.id });
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(5, 10, 20, 0.95)',
        zIndex: 9999,
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'all' : 'none',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)', // PR 6: Smooth transitions
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg 
        ref={svgRef}
        width="100%" 
        height="100%"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
      >
        <g transform={`translate(${offset.x + drift.x}, ${offset.y + drift.y}) scale(${scale})`}>
          {/* PR 21: Flow Lines */}
          {flowMap && flowMap.edges.map((edge: any, i: number) => {
              const source = nodes.find(n => n.id === edge.source);
              const target = nodes.find(n => n.id === edge.target);
              if (!source || !target) return null;

              // Calculate intensity based on weight and decay
              const age = Date.now() - edge.lastActive;
              const opacity = Math.max(0.1, 1 - (age / (1000 * 60 * 5))) * Math.min(1, edge.weight * 0.2);

              return (
                  <path
                      key={`flow-${i}`}
                      d={`M ${source.x} ${source.y} Q ${(source.x + target.x)/2} ${(source.y + target.y)/2 - 50} ${target.x} ${target.y}`}
                      fill="none"
                      stroke="url(#flowGradient)"
                      strokeWidth={2 + edge.weight}
                      strokeOpacity={opacity}
                      strokeDasharray="10,5"
                      className="flow-line"
                  >
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                  </path>
              );
          })}
          
          <defs>
              <linearGradient id="flowGradient" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
          </defs>

          {/* Edges */}
          {edges.map((edge, i) => {
            const source = nodes.find(n => n.id === edge.source);
            const target = nodes.find(n => n.id === edge.target);
            if (!source || !target) return null;
            
            return (
              <line
                key={i}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="#2563eb"
                strokeWidth={1}
                strokeOpacity={0.3}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            // Phase 1: Adaptive Clustering (Size based on usage)
            const usageBonus = intelligenceEngine.getUsageCount(node.id) * 2;
            const adaptiveRadius = node.r + Math.min(25, usageBonus);

            return (
            <g 
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onMouseEnter={() => {
                setHoveredNode(node.id);
                soundManager.playHover();
              }}
              onMouseLeave={() => setHoveredNode(null)}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)} // PR 31
              onClick={(e) => handleNodeClick(e, node)}
              style={{ cursor: draggedNodeId === node.id ? 'grabbing' : 'pointer', transition: draggedNodeId === node.id ? 'none' : 'all 0.3s ease' }}
            >
              <circle 
                r={adaptiveRadius} 
                fill={node.type === 'module' ? 'rgba(0, 243, 255, 0.1)' : 'rgba(0, 243, 255, 0.05)'}
                stroke={suggestedNodes.includes(node.id) ? '#fbbf24' : '#00f3ff'}
                strokeWidth={suggestedNodes.includes(node.id) ? 3 : 1}
                style={{
                    filter: `drop-shadow(0 0 ${glowStrength * 20}px ${suggestedNodes.includes(node.id) ? '#fbbf24' : '#00f3ff'})`
                }}
              />
              {/* Icon for Modules */}
              {node.type === 'module' && (
                 <text 
                   dy="5" 
                   textAnchor="middle" 
                   fill="#00f3ff" 
                   style={{ fontSize: '24px', pointerEvents: 'none', filter: `drop-shadow(0 0 ${glowStrength * 10}px #00f3ff)` }}
                 >
                   {node.data.icon || '📦'}
                 </text>
              )}
              <text
                y={adaptiveRadius + 20}
                textAnchor="middle"
                fill={suggestedNodes.includes(node.id) ? '#fbbf24' : '#fff'}
                style={{ 
                  fontSize: '12px', 
                  pointerEvents: 'none',
                  textShadow: `0 0 ${glowStrength * 10}px rgba(255,255,255,0.5)`
                }}
              >
                {node.label}
              </text>
            </g>
          )})}

        </g>
      </svg>
      
      <div style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#64748b',
        fontSize: '0.8rem',
        pointerEvents: 'none',
        textAlign: 'center'
      }}>
        CONSTELLATION MODE // PAN + ZOOM ENABLED<br/>
        {aiActive && <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>N.E.X.U.S AI ACTIVE</span>}
      </div>

      {/* PR 23: Portal Transition Overlay */}
      {portalActive && (
          <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              background: 'radial-gradient(circle at center, transparent 0%, #000 100%)',
              animation: 'portalIn 3s ease-in-out forwards',
              pointerEvents: 'none',
              zIndex: 10000
          }}>
             <style>{`
                 @keyframes portalIn {
                     0% { opacity: 0; transform: scale(0.8); }
                     50% { opacity: 1; transform: scale(1.1); }
                     100% { opacity: 0; transform: scale(1.5); }
                 }
             `}</style>
          </div>
      )}
      {/* PR 33: AI Navigation Button */}
      <button
        onClick={(e) => { e.stopPropagation(); triggerAiNavigation(); }}
        style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid #fbbf24',
            color: '#fbbf24',
            padding: '10px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}
      >
        <span>🤖</span> AI Assist
      </button>

      {/* PR 32: Motion Tuning Panel */}
      {creatorMode && (
          <MotionTuningPanel 
            driftIntensity={driftIntensity} setDriftIntensity={setDriftIntensity}
            parallaxDepth={parallaxDepth} setParallaxDepth={setParallaxDepth}
            glowStrength={glowStrength} setGlowStrength={setGlowStrength}
          />
      )}
    </div>
  );
};

export default ConstellationMode;
