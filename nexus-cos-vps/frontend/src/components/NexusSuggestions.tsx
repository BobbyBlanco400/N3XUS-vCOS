import React, { useState, useEffect } from 'react';
import { intelligenceEngine } from '../utils/IntelligenceEngine';
import { commandBus } from '../utils/CommandBus';
import { useTheme } from '../context/ThemeContext';

export const NexusSuggestions: React.FC = () => {
    const { theme } = useTheme();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [intent, setIntent] = useState<string>('idle');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const update = () => {
            const currentIntent = intelligenceEngine.getCurrentIntent();
            setIntent(currentIntent);
            setSuggestions(intelligenceEngine.getSuggestions());
            // Show if we have suggestions and user is active
            setVisible(currentIntent !== 'idle');
        };

        // Initial check
        update();

        // Listen for updates
        const contextHandler = (data: any) => {
            setIntent(data.intent);
            setSuggestions(data.suggestions);
            setVisible(data.intent !== 'idle' && data.suggestions.length > 0);
        };

        const intentHandler = (newIntent: string) => {
             setIntent(newIntent);
             setVisible(newIntent !== 'idle');
        };

        commandBus.on('nexus:context-update', contextHandler);
        commandBus.on('nexus:intent-change', intentHandler);

        return () => {
            commandBus.off('nexus:context-update', contextHandler);
            commandBus.off('nexus:intent-change', intentHandler);
        };
    }, []);

    if (!visible || suggestions.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            background: `${theme.colors.surface}cc`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.colors.primary}`,
            borderRadius: '12px',
            padding: '12px',
            zIndex: 9000,
            maxWidth: '250px',
            boxShadow: `0 4px 20px ${theme.colors.primary}30`,
            animation: 'slideUp 0.3s ease-out'
        }}>
            <div style={{ 
                fontSize: '0.75rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                color: theme.colors.textSecondary,
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
            }}>
                <span style={{ 
                    width: '6px', height: '6px', borderRadius: '50%', 
                    background: theme.colors.accent,
                    boxShadow: `0 0 8px ${theme.colors.accent}`
                }}/>
                N.E.X.U.S Suggests ({intent})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {suggestions.map(id => (
                    <button
                        key={id}
                        onClick={() => commandBus.emit('app:launch', id)}
                        style={{
                            background: `${theme.colors.background}80`,
                            border: `1px solid ${theme.colors.border}`,
                            color: theme.colors.text,
                            padding: '8px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '0.85rem',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = theme.colors.primary;
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${theme.colors.background}80`;
                            e.currentTarget.style.color = theme.colors.text;
                        }}
                    >
                        Launch {id}
                    </button>
                ))}
            </div>
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};
