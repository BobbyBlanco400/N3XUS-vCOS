import React, { useState } from 'react';
import './FoundingResidents.css'; // Reuse styles for now or create new ones

interface TenantMiniPlatformProps {
  tenant: {
    name: string;
    url: string;
    category?: string;
  };
  onClose: () => void;
}

export const TenantMiniPlatform: React.FC<TenantMiniPlatformProps> = ({ tenant, onClose }) => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="tenant-platform-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: '#0f172a', color: 'white', zIndex: 1000, overflowY: 'auto' }}>
      <header style={{ padding: '20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.95)' }}>
        <div className="platform-brand">
          <h1 style={{ margin: 0, fontSize: '1.5rem', background: 'linear-gradient(45deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {tenant.name}
          </h1>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Powered by N3XUS COS</span>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: '1px solid #475569', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
          Exit Platform
        </button>
      </header>

      <div className="platform-content" style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        <nav className="platform-sidebar" style={{ width: '250px', borderRight: '1px solid #334155', padding: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <button 
                onClick={() => setActiveTab('home')}
                style={{ width: '100%', textAlign: 'left', padding: '10px', background: activeTab === 'home' ? '#334155' : 'transparent', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
              >
                🏠 Home
              </button>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <button 
                onClick={() => setActiveTab('stream')}
                style={{ width: '100%', textAlign: 'left', padding: '10px', background: activeTab === 'stream' ? '#334155' : 'transparent', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
              >
                📺 StreamCore
              </button>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <button 
                onClick={() => setActiveTab('music')}
                style={{ width: '100%', textAlign: 'left', padding: '10px', background: activeTab === 'music' ? '#334155' : 'transparent', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
              >
                🎵 MusicChain
              </button>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <button 
                onClick={() => setActiveTab('dsp')}
                style={{ width: '100%', textAlign: 'left', padding: '10px', background: activeTab === 'dsp' ? '#334155' : 'transparent', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
              >
                📊 DSP Portal
              </button>
            </li>
          </ul>
        </nav>

        <main className="platform-main" style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
          {activeTab === 'home' && (
            <div className="tab-content">
              <h2>Welcome to {tenant.name}</h2>
              <p>This is an independent mini-platform stack running on N3XUS COS.</p>
              <div style={{ marginTop: '30px', padding: '20px', background: '#1e293b', borderRadius: '8px' }}>
                <h3>Platform Status</h3>
                <p>✅ Core Services: Online</p>
                <p>✅ Handshake: 55-45-17 Verified</p>
                <p>✅ License: Active</p>
              </div>
            </div>
          )}

          {activeTab === 'stream' && (
            <div className="tab-content">
              <h2>StreamCore</h2>
              <p>Live streaming services for {tenant.name}.</p>
              <div className="placeholder-stream" style={{ width: '100%', height: '400px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                <span>Stream Offline (Demo Mode)</span>
              </div>
            </div>
          )}

          {activeTab === 'music' && (
            <div className="tab-content">
              <h2>MusicChain</h2>
              <p>Decentralized music distribution.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ background: '#1e293b', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ width: '100%', height: '150px', background: '#334155', marginBottom: '10px', borderRadius: '4px' }}></div>
                    <h4>Track {i}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Artist Name</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'dsp' && (
            <div className="tab-content">
              <h2>DSP Portal</h2>
              <p>Digital Service Provider analytics and management.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px' }}>
                  <h3>Revenue</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$0.00</p>
                </div>
                <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px' }}>
                  <h3>Streams</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
