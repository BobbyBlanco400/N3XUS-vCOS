import React from 'react';

const ToolContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ padding: '2rem', color: '#fff' }}>
    <h2 style={{ borderBottom: '1px solid #334155', paddingBottom: '1rem', marginBottom: '2rem' }}>
      🛠️ {title}
    </h2>
    {children}
  </div>
);

export const ThemeForge: React.FC = () => (
  <ToolContainer title="Theme Forge">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '0.5rem' }}>
        <h3>Color Palette</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {['#0f172a', '#1e293b', '#334155', '#2563eb', '#60a5fa'].map(c => (
            <div key={c} style={{ width: '40px', height: '40px', background: c, borderRadius: '50%' }} />
          ))}
        </div>
      </div>
      <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '0.5rem' }}>
        <h3>Typography</h3>
        <p style={{ fontFamily: 'Inter, sans-serif' }}>Inter (System UI)</p>
        <p style={{ fontFamily: 'monospace' }}>JetBrains Mono (Code)</p>
      </div>
    </div>
  </ToolContainer>
);

export const MotionLab: React.FC = () => (
  <ToolContainer title="Motion Lab">
    <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center' }}>
      <div style={{ 
        width: '100px', 
        height: '100px', 
        background: '#2563eb', 
        margin: '0 auto',
        animation: 'spin 4s linear infinite'
      }} />
      <p style={{ marginTop: '1rem', color: '#94a3b8' }}>Physics Engine: Active (60fps)</p>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  </ToolContainer>
);

export const NodeEditor: React.FC = () => (
  <ToolContainer title="Node Editor">
    <div style={{ height: '400px', background: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height="100%">
        <path d="M50 50 C 150 50, 150 150, 250 150" stroke="#60a5fa" strokeWidth="2" fill="none" />
        <circle cx="50" cy="50" r="5" fill="#fff" />
        <circle cx="250" cy="150" r="5" fill="#fff" />
      </svg>
      <div style={{ position: 'absolute', top: '1rem', left: '1rem', color: '#64748b' }}>
        // Logic Graph Visualizer
      </div>
    </div>
  </ToolContainer>
);

export const OSTelemetry: React.FC = () => (
  <ToolContainer title="OS Telemetry">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      {['Memory', 'CPU', 'Network'].map(metric => (
        <div key={metric} style={{ background: '#1e293b', padding: '1rem', borderRadius: '0.5rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{metric}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>
            {Math.floor(Math.random() * 30 + 10)}%
          </div>
        </div>
      ))}
    </div>
  </ToolContainer>
);

export const DebugConsole: React.FC = () => (
  <ToolContainer title="Debug Console">
    <div style={{ background: '#000', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', height: '300px', overflowY: 'auto', color: '#22c55e' }}>
      <div>> System.init()</div>
      <div>> Loading modules... OK</div>
      <div>> Mounting V-Suite... OK</div>
      <div>> Connecting to PUABO Fleet... OK</div>
      <div>> Creator Mode: ACTIVE</div>
      <div style={{ color: '#fbbf24' }}> WARN: Experimental features enabled</div>
    </div>
  </ToolContainer>
);
