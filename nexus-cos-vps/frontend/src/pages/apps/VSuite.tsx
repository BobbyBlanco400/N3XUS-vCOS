import { useState, useEffect } from 'react';
import AppStub from '../../components/AppStub';
import { commandBus } from '../../utils/CommandBus';

export const VPrompter = ({ isWindow }: { isWindow?: boolean }) => {
  const [text, setText] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [nexusActive, setNexusActive] = useState(false);

  // PR 25: N.E.X.U.S Command Trigger
  useEffect(() => {
    if (isScrolling) {
        commandBus.emit('vsuite:prompter-start');
    } else {
        commandBus.emit('vsuite:prompter-stop');
    }
  }, [isScrolling]);

  const handleNexusAssist = () => {
      setNexusActive(true);
      commandBus.emit('ai:thinking', true);
      setTimeout(() => {
          setText(prev => prev + "\n[N.E.X.U.S Suggested Line]: Welcome to the future of broadcasting.");
          setNexusActive(false);
          commandBus.emit('ai:thinking', false);
      }, 1500);
  };

  return (
    <AppStub 
      appName="V-Prompter Pro" 
      moduleId="v-suite" 
      moduleName="V-Suite" 
      description="Professional teleprompter for broadcast and streaming."
      isWindow={isWindow}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter script text here..."
              style={{
                width: '100%',
                height: '200px',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#fff',
                padding: '1rem',
                fontFamily: 'monospace',
                transition: 'border-color 0.3s ease', // PR 25: Smoother transitions
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#334155'}
            />
            {/* PR 25: Contextual Tooltip / Badge */}
            <div style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'rgba(30, 41, 59, 0.8)',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                color: '#94a3b8',
                pointerEvents: 'none'
            }}>
                SCRIPT BUFFER
            </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={() => setIsScrolling(!isScrolling)}
            title={isScrolling ? "Stop Teleprompter Scroll" : "Start Teleprompter Scroll"} // PR 25: Tooltip
            style={{
              padding: '0.5rem 1rem',
              background: isScrolling ? '#ef4444' : '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isScrolling ? 'Stop Scroll' : 'Start Scroll'}
          </button>
          
          <div style={{ 
            padding: '0.5rem', 
            background: '#1e293b', 
            borderRadius: '0.5rem', 
            flex: 1,
            textAlign: 'center',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
             {isScrolling && <span className="blink-dot">🔴</span>}
             Status: {isScrolling ? 'ON AIR' : 'STANDBY'}
          </div>

          {/* PR 25: Nexus Integration */}
          <button
            onClick={handleNexusAssist}
            disabled={nexusActive}
            style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: '1px solid #60a5fa',
                color: '#60a5fa',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                opacity: nexusActive ? 0.5 : 1
            }}
          >
              {nexusActive ? 'N.E.X.U.S Generating...' : '✨ AI Assist'}
          </button>
        </div>
        <style>{`
            .blink-dot { animation: blink 1s infinite; }
            @keyframes blink { 50% { opacity: 0; } }
        `}</style>
      </div>
    </AppStub>
  );
};

export const VScreen = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="V-Screen Hollywood" 
    moduleId="v-suite" 
    moduleName="V-Suite" 
    description="High-fidelity screen sharing and remote collaboration tool." 
    isWindow={isWindow}
  />
);

export const VCaster = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="V-Caster" 
    moduleId="v-suite" 
    moduleName="V-Suite" 
    description="Multi-destination broadcasting solution." 
    isWindow={isWindow}
  />
);

export const VStage = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="V-Stage" 
    moduleId="v-suite" 
    moduleName="V-Suite" 
    description="Virtual stage management and production control." 
    isWindow={isWindow}
  />
);
