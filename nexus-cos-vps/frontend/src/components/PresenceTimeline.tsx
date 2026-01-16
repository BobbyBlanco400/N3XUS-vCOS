import React, { useEffect, useState } from 'react';
import { presenceManager, DeviceProfile } from '../utils/PresenceManager';
import { useTheme } from '../context/ThemeContext';
import { commandBus } from '../utils/CommandBus';

export const PresenceTimeline: React.FC = () => {
    const { theme } = useTheme();
    const [devices, setDevices] = useState<DeviceProfile[]>([]);
    const [currentDevice, setCurrentDevice] = useState<DeviceProfile | null>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const sync = () => {
            setDevices(presenceManager.getDevices());
            setCurrentDevice(presenceManager.getCurrentDevice());
            setLogs(presenceManager.getSessionLog());
        };

        sync();
        const interval = setInterval(sync, 2000); // Poll for updates

        const handoffHandler = () => {
             sync();
             setExpanded(true); // Auto-expand on handoff
             setTimeout(() => setExpanded(false), 5000); // Auto-close
        };

        commandBus.on('presence:handoff', handoffHandler);

        return () => {
            clearInterval(interval);
            commandBus.off('presence:handoff', handoffHandler);
        };
    }, []);

    if (!currentDevice) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '10px'
        }}>
            {/* Device Switcher */}
            <div style={{
                background: `${theme.colors.surface}cc`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '20px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: `0 0 15px ${currentDevice.color}40`,
                transition: 'all 0.5s ease'
            }}>
                <div style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: currentDevice.color,
                    animation: 'pulse 2s infinite'
                }}/>
                <span style={{ color: theme.colors.text, fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {currentDevice.name}
                </span>
                <button 
                    onClick={() => setExpanded(!expanded)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: theme.colors.textSecondary,
                        cursor: 'pointer'
                    }}
                >
                    {expanded ? '▲' : '▼'}
                </button>
            </div>

            {/* Dropdown Panel */}
            {expanded && (
                <div style={{
                    width: '300px',
                    background: theme.colors.background,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    animation: 'slideDown 0.3s ease-out'
                }}>
                    <h4 style={{ margin: '0 0 12px 0', color: theme.colors.textSecondary, fontSize: '0.8rem', textTransform: 'uppercase' }}>Available Devices</h4>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        {devices.map(dev => (
                            <button
                                key={dev.id}
                                onClick={() => presenceManager.switchDevice(dev.id)}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    borderRadius: '8px',
                                    border: `1px solid ${dev.id === currentDevice.id ? dev.color : theme.colors.border}`,
                                    background: dev.id === currentDevice.id ? `${dev.color}20` : 'transparent',
                                    color: theme.colors.text,
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dev.color }}/>
                                {dev.name}
                            </button>
                        ))}
                    </div>

                    <h4 style={{ margin: '0 0 12px 0', color: theme.colors.textSecondary, fontSize: '0.8rem', textTransform: 'uppercase' }}>Presence Timeline</h4>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {logs.map((log, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: theme.colors.textSecondary }}>
                                <span style={{ color: theme.colors.accent }}>{new Date(log.timestamp).toLocaleTimeString()}</span>
                                <span>{log.action}</span>
                                <span style={{ marginLeft: 'auto', opacity: 0.5 }}>{log.deviceId}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 ${currentDevice.color}40; }
                    70% { box-shadow: 0 0 0 10px transparent; }
                    100% { box-shadow: 0 0 0 0 transparent; }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};
