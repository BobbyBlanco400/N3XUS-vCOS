import React, { useState } from 'react';

const DeploymentTab: React.FC = () => {
  const [ipAddress, setIpAddress] = useState('72.62.86.217');
  const [user, setUser] = useState('root');
  const [generatedCommand, setGeneratedCommand] = useState('');

  const handleGenerate = () => {
    if (!ipAddress) return;
    const cmd = `.\\infra\\vps\\deploy-to-vps.ps1 -IPAddress "${ipAddress}" -User "${user}"`;
    setGeneratedCommand(cmd);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCommand);
    alert('Command copied to clipboard!');
  };

  return (
    <div className="deployment-tab" style={{ padding: '20px', background: '#151515', borderRadius: '8px' }}>
      <h2 style={{ color: '#fff', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        🚀 Deployment Center <span style={{ fontSize: '0.8rem', background: '#ef4444', padding: '2px 6px', borderRadius: '4px', verticalAlign: 'middle' }}>ADMIN ONLY</span>
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        {/* Configuration Panel */}
        <div>
          <h3 style={{ color: '#aaa' }}>Target Configuration</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#888', marginBottom: '5px' }}>VPS IP Address</label>
            <input 
              type="text" 
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="e.g. 192.168.1.50"
              style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#888', marginBottom: '5px' }}>SSH User</label>
            <input 
              type="text" 
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="root"
              style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
            />
          </div>
          <button 
            onClick={handleGenerate}
            disabled={!ipAddress}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: !ipAddress ? '#333' : '#2563eb', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: !ipAddress ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            Generate Deployment Command
          </button>
        </div>

        {/* Action Panel */}
        <div style={{ background: '#0a0a0a', padding: '20px', borderRadius: '8px', border: '1px dashed #444' }}>
          <h3 style={{ color: '#aaa', marginTop: 0 }}>Execution Zone</h3>
          
          {generatedCommand ? (
            <div>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>Run this command in your local PowerShell terminal:</p>
              <div style={{ background: '#000', padding: '15px', borderRadius: '4px', fontFamily: 'monospace', color: '#0f0', wordBreak: 'break-all', marginBottom: '10px' }}>
                {generatedCommand}
              </div>
              <button 
                onClick={copyToClipboard}
                style={{ padding: '8px 16px', background: '#444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
              >
                Copy Command
              </button>
              
              <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid #ef4444' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#ef4444' }}>⚠️ Security Warning</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#ccc' }}>
                  This tool triggers a remote infrastructure update. Ensure you have SSH access to the target VPS before proceeding.
                </p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#444' }}>
              Waiting for configuration...
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h3 style={{ color: '#aaa' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => window.open('https://github.com/nexus-cos/infrastructure', '_blank')} style={{ padding: '10px 15px', background: '#222', color: '#ccc', border: '1px solid #444', borderRadius: '4px', cursor: 'pointer' }}>
            View Infrastructure Repo
          </button>
          <button onClick={() => window.open('/docs/deployment/VPS_LAUNCH_GUIDE.md', '_blank')} style={{ padding: '10px 15px', background: '#222', color: '#ccc', border: '1px solid #444', borderRadius: '4px', cursor: 'pointer' }}>
            Open Launch Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeploymentTab;
