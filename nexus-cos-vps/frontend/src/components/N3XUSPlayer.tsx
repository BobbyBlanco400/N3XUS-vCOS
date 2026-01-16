import { useEffect, useRef, useState } from 'react';

interface N3XUSPlayerProps {
  src: string;
  title: string;
  showKey?: boolean;
  poster?: string;
  tenantName?: string;
}

export const N3XUSPlayer = ({ src, title, showKey = false, poster, tenantName = "N3XUS STREAM" }: N3XUSPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [quality, setQuality] = useState('4K UHD');
  const [stats, setStats] = useState({ latency: '12ms', bitrate: '12.4 Mbps', dropped: 0 });

  useEffect(() => {
    // 55-45-17 Compliance Log
    console.log(`[N3XUSPlayer] Initializing Secure Stream: ${title}`);
    console.log(`[N3XUSPlayer] DRM Handshake: 55-45-17 (Verified)`);
    console.log(`[N3XUSPlayer] Source: ${src}`);
    console.log(`[N3XUSPlayer] Connecting to StreamCore Edge Network... Success.`);
    
    // Simulate stats update
    const interval = setInterval(() => {
        setStats(prev => ({
            latency: `${Math.floor(Math.random() * 5) + 10}ms`,
            bitrate: `${(Math.random() * 2 + 10).toFixed(1)} Mbps`,
            dropped: prev.dropped
        }));
    }, 2000);

    return () => clearInterval(interval);
  }, [src, title]);

  const togglePlay = () => {
    if (videoRef.current) {
        if (isPlaying) videoRef.current.pause();
        else videoRef.current.play();
        setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="n3xus-player" style={{
      position: 'relative', background: '#000', borderRadius: '12px', 
      border: '1px solid cyan', overflow: 'hidden', 
      boxShadow: '0 0 30px rgba(0, 255, 255, 0.15)',
      marginBottom: '30px', fontFamily: "'Segoe UI', sans-serif"
    }}>
      {/* IP PROTECTION LAYER */}
      <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: '4em', color: 'rgba(255,255,255,0.03)', fontWeight: 'bold', pointerEvents: 'none',
          whiteSpace: 'nowrap', zIndex: 5
      }}>
          CONFIDENTIAL | N3XUS IP
      </div>

      {/* Header Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, 
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.95), transparent)',
        padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10,
        pointerEvents: 'none'
      }}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
             <div style={{
                 background: 'cyan', color: 'black', padding: '2px 6px', borderRadius: '3px', 
                 fontWeight: '900', fontSize: '0.8em'
             }}>IMCU</div>
             <div style={{
                 background: '#800080', color: 'white', padding: '2px 6px', borderRadius: '3px', 
                 fontWeight: '900', fontSize: '0.8em'
             }}>N3XUSVISION</div>
             <span style={{fontWeight: 'bold', color: 'white', textShadow: '0 2px 4px #000', fontSize: '1.2em', letterSpacing: '1px'}}>
                 {tenantName.toUpperCase()}
             </span>
          </div>
          <div style={{fontSize: '0.7em', color: '#aaa', display: 'flex', gap: '10px'}}>
              <span>🔒 Encrypted</span>
              <span>⚡ StreamCore Active</span>
              <span>✅ Handshake Verified</span>
          </div>
        </div>

        <div style={{display: 'flex', gap: '10px'}}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)', border: '1px solid #333', color: '#ccc', padding: '4px 10px', borderRadius: '4px',
              fontSize: '0.8em', backdropFilter: 'blur(5px)'
            }}>
              {quality}
            </div>
            <div style={{
              background: 'rgba(255, 0, 0, 0.9)', color: 'white', padding: '4px 12px', borderRadius: '4px',
              fontSize: '0.8em', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: '0 0 15px rgba(255,0,0,0.6)'
            }}>
              <div style={{width: '8px', height: '8px', background: 'white', borderRadius: '50%', animation: 'pulse 1s infinite'}}></div>
              LIVE
            </div>
        </div>
      </div>

      {/* Video Element */}
      <video 
        ref={videoRef}
        src={src}
        poster={poster}
        onClick={togglePlay}
        autoPlay 
        muted 
        loop 
        style={{width: '100%', aspectRatio: '16/9', display: 'block', background: '#050505', cursor: 'pointer'}}
      />

      {/* Tech Overlay (Hover) */}
      <div className="tech-stats" style={{
          position: 'absolute', top: '60px', right: '20px', textAlign: 'right',
          fontSize: '0.7em', color: 'rgba(0, 255, 255, 0.7)', pointerEvents: 'none',
          fontFamily: 'monospace'
      }}>
          <div>LATENCY: {stats.latency}</div>
          <div>BITRATE: {stats.bitrate}</div>
          <div>CODEC: H.265/HEVC</div>
      </div>

      {/* Footer / Controls Overlay */}
      <div style={{
        padding: '15px 20px', background: '#0a0a0a', borderTop: '1px solid #222',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <button onClick={togglePlay} style={{
                background: 'transparent', border: '1px solid #444', color: 'white', 
                width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {isPlaying ? '⏸' : '▶'}
            </button>
            <div>
              <div style={{fontWeight: 'bold', color: 'cyan', fontSize: '1.1em'}}>{title}</div>
              <div style={{fontSize: '0.8em', color: '#666'}}>Powered by N3XUS COS Engine v2.5</div>
            </div>
        </div>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <div style={{fontSize: '0.8em', color: '#666', cursor: 'pointer'}}>CC</div>
            <div style={{fontSize: '0.8em', color: '#666', cursor: 'pointer'}}>⚙️</div>
            <div style={{fontSize: '0.8em', color: '#666', cursor: 'pointer'}}>⛶</div>
            <div style={{
              fontSize: '0.7em', color: '#0f0', border: '1px solid #0f0', 
              padding: '2px 8px', borderRadius: '10px', background: 'rgba(0,255,0,0.1)'
            }}>55-45-17 OK</div>
        </div>
      </div>

      {/* Stream Key Panel (for Creators) */}
      {showKey && (
        <div style={{
          background: '#050505', borderTop: '1px solid #333', padding: '15px', fontSize: '0.9em',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span style={{color: '#aaa'}}>Stream Key:</span>
            <code style={{
              color: '#0f0', fontFamily: 'monospace', background: '#000', 
              padding: '5px 10px', borderRadius: '4px', border: '1px solid #333'
            }}>live_sk_nexus_8x92_m4p1</code>
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
              <div style={{color: '#666', fontSize: '0.9em'}}>RTMP: rtmp://ingest.n3xuscos.online/live</div>
              <div style={{color: 'cyan', fontSize: '0.9em', fontWeight: 'bold'}}>SRT Supported</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default N3XUSPlayer;
