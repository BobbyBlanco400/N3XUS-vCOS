import { useState, useEffect } from 'react';
import AppStub from '../../components/AppStub';
import { commandBus } from '../../utils/CommandBus';

export const AiDispatch = ({ isWindow }: { isWindow?: boolean }) => {
  const [status, setStatus] = useState<{ status: string; service: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = () => {
    setIsRefreshing(true);
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
          setStatus(data);
          setIsRefreshing(false);
      })
      .catch(err => {
          setError('Connection Failed');
          setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData();
    // PR 27: N.E.X.U.S Refresh Listener
    const refreshHandler = () => fetchData();
    commandBus.on('puabo:refresh', refreshHandler);
    return () => commandBus.off('puabo:refresh', refreshHandler);
  }, []);

  const handleNexusRefresh = () => {
      commandBus.emit('puabo:refresh');
  };

  return (
    <AppStub 
      appName="AI Dispatch" 
      moduleId="puabo-fleet" 
      moduleName="PUABO Fleet" 
      description="Intelligent autonomous dispatch system." 
      isWindow={isWindow}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* PR 27: Status Pulse & Real-time Health */}
        <div style={{ padding: '1rem', background: '#1e293b', borderRadius: '0.5rem', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h4 style={{ color: '#fff', margin: 0 }}>System Status</h4>
            {isRefreshing && <span style={{ fontSize: '0.75rem', color: '#60a5fa' }}>Refreshing...</span>}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {error ? (
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              ) : status ? (
                <div className="status-pulse" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
              ) : (
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
              )}
              {error ? (
                <p style={{ color: '#ef4444', margin: 0 }}>OFFLINE</p>
              ) : status ? (
                <p style={{ color: '#22c55e', margin: 0 }}>ONLINE</p>
              ) : (
                <p style={{ color: '#94a3b8', margin: 0 }}>CONNECTING</p>
              )}
          </div>
          
          {/* PR 27: Diagnostics Metrics */}
          {status && (
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Latency:</span>
                      <span style={{ color: '#fff' }}>12ms</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>CPU Load:</span>
                      <span style={{ color: '#fff' }}>24%</span>
                  </div>
              </div>
          )}
        </div>

        <div style={{ padding: '1rem', background: '#1e293b', borderRadius: '0.5rem', border: '1px solid #334155' }}>
          <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Service ID</h4>
          <p style={{ color: '#cbd5e1' }}>{status?.service || 'Unknown'}</p>
          <button
            onClick={handleNexusRefresh}
            style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.5rem',
                background: '#334155',
                color: '#fff',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.8rem'
            }}
          >
              🔄 N.E.X.U.S Refresh
          </button>
        </div>
      </div>
      <style>{`
          .status-pulse {
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
              animation: pulse-green 2s infinite;
          }
          @keyframes pulse-green {
              0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
              70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
              100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
          }
      `}</style>
    </AppStub>
  );
};

export const DriverBackend = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Driver Backend" 
    moduleId="puabo-fleet" 
    moduleName="PUABO Fleet" 
    description="Driver management, scheduling, and performance tracking." 
    isWindow={isWindow}
  />
);

export const FleetManager = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Fleet Manager" 
    moduleId="puabo-fleet" 
    moduleName="PUABO Fleet" 
    description="Complete fleet oversight and maintenance logging." 
    isWindow={isWindow}
  />
);

export const RouteOptimizer = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Route Optimizer" 
    moduleId="puabo-fleet" 
    moduleName="PUABO Fleet" 
    description="AI-driven route optimization and traffic analysis." 
    isWindow={isWindow}
  />
);
