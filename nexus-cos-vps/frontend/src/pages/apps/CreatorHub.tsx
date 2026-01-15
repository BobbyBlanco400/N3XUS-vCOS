import { useState } from 'react';
import AppStub from '../../components/AppStub';
import { commandBus } from '../../utils/CommandBus';

export const AssetManager = ({ isWindow }: { isWindow?: boolean }) => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);
  
  const assets = [
    { id: '1', name: 'Logo_Final.png', type: 'Image', size: '2.4 MB' },
    { id: '2', name: 'Intro_Sequence.mp4', type: 'Video', size: '145 MB' },
    { id: '3', name: 'Podcast_Ep1.wav', type: 'Audio', size: '45 MB' },
    { id: '4', name: 'Brand_Guide.pdf', type: 'Document', size: '1.2 MB' },
  ];

  const handleLocateInConstellation = (id: string) => {
      // PR 26: Constellation-linked navigation
      commandBus.emit('nexus:node-selected', { nodeId: `asset-${id}`, type: 'asset' });
      commandBus.emit('constellation:toggle'); // Switch to constellation view
  };

  return (
    <AppStub 
      appName="Asset Manager" 
      moduleId="creator-hub" 
      moduleName="Creator Hub" 
      description="Centralized media asset management system." 
      isWindow={isWindow}
    >
      {!selectedAsset ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
          {assets.map(asset => (
            <div 
              key={asset.id}
              onClick={() => setSelectedAsset(asset.id)}
              onMouseEnter={() => setHoveredAsset(asset.id)}
              onMouseLeave={() => setHoveredAsset(null)}
              style={{
                background: '#1e293b',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #334155',
                cursor: 'pointer',
                textAlign: 'center',
                // PR 26: Soft Zoom-in & Hover Depth
                transform: hoveredAsset === asset.id ? 'scale(1.05) translateY(-4px)' : 'scale(1)',
                boxShadow: hoveredAsset === asset.id ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : 'none',
                borderColor: hoveredAsset === asset.id ? '#60a5fa' : '#334155',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {asset.type === 'Image' ? '🖼️' : asset.type === 'Video' ? '🎬' : asset.type === 'Audio' ? '🎵' : '📄'}
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {asset.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {asset.size}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button 
            onClick={() => setSelectedAsset(null)}
            style={{ marginBottom: '1rem', background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer' }}
          >
            ← Back to Assets
          </button>
          <div style={{ padding: '2rem', background: '#1e293b', borderRadius: '0.5rem', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: '#fff', margin: 0 }}>
                {assets.find(a => a.id === selectedAsset)?.name}
                </h3>
                <button
                    onClick={() => handleLocateInConstellation(selectedAsset)}
                    style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(96, 165, 250, 0.1)',
                        border: '1px solid #60a5fa',
                        color: '#60a5fa',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                    }}
                >
                    📍 Locate in Constellation
                </button>
            </div>
            <div style={{ height: '150px', background: '#0f172a', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
              Preview Placeholder
            </div>
          </div>
        </div>
      )}
    </AppStub>
  );
};

export const ProjectCollab = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Project Collaboration" 
    moduleId="creator-hub" 
    moduleName="Creator Hub" 
    description="Real-time team collaboration and project tracking." 
    isWindow={isWindow}
  />
);

export const Distribution = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Distribution" 
    moduleId="creator-hub" 
    moduleName="Creator Hub" 
    description="Multi-platform content distribution and publishing." 
    isWindow={isWindow}
  />
);

export const Analytics = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Analytics" 
    moduleId="creator-hub" 
    moduleName="Creator Hub" 
    description="Comprehensive performance metrics and audience insights." 
    isWindow={isWindow}
  />
);
