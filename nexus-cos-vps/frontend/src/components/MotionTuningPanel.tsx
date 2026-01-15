import React from 'react';
import { soundManager } from '../utils/SoundManager';

interface MotionTuningPanelProps {
    driftIntensity: number;
    setDriftIntensity: (val: number) => void;
    parallaxDepth: number;
    setParallaxDepth: (val: number) => void;
    glowStrength: number;
    setGlowStrength: (val: number) => void;
}

export const MotionTuningPanel: React.FC<MotionTuningPanelProps> = ({
    driftIntensity, setDriftIntensity,
    parallaxDepth, setParallaxDepth,
    glowStrength, setGlowStrength
}) => {
    
    const handleChange = (setter: (val: number) => void, value: number) => {
        setter(value);
        soundManager.playInteractionCue(); // Subtle feedback
    };

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            padding: '1rem',
            color: '#fff',
            width: '250px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
        }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fbbf24', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '0.5rem' }}>🛠️</span> MOTION LAB
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                    Drift Intensity: {Math.round(driftIntensity * 100)}%
                </label>
                <input 
                    type="range" 
                    min="0" max="1" step="0.1" 
                    value={driftIntensity}
                    onChange={(e) => handleChange(setDriftIntensity, parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#fbbf24' }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                    Parallax Depth: {Math.round(parallaxDepth * 100)}%
                </label>
                <input 
                    type="range" 
                    min="0" max="2" step="0.1" 
                    value={parallaxDepth}
                    onChange={(e) => handleChange(setParallaxDepth, parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#fbbf24' }}
                />
            </div>

            <div style={{ marginBottom: '0' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                    Glow Strength: {Math.round(glowStrength * 100)}%
                </label>
                <input 
                    type="range" 
                    min="0" max="1" step="0.1" 
                    value={glowStrength}
                    onChange={(e) => handleChange(setGlowStrength, parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#fbbf24' }}
                />
            </div>
        </div>
    );
};
