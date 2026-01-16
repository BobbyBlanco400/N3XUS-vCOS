import React from 'react';
import { Link } from 'react-router-dom';

interface AppStubProps {
  appName: string;
  moduleId: string;
  moduleName: string;
  description: string;
  isWindow?: boolean;
  children?: React.ReactNode;
}

const AppStub: React.FC<AppStubProps> = ({ appName, moduleId, moduleName, description, isWindow = false, children }) => {
  if (isWindow) {
    return (
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        background: '#0f172a', 
        color: '#fff',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{appName}</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{description}</p>
          
          {children || (
            <div style={{ 
              padding: '1.5rem', 
              background: 'rgba(37, 99, 235, 0.1)', 
              borderRadius: '0.5rem', 
              border: '1px dashed #2563eb',
              textAlign: 'center'
            }}>
              <p style={{ color: '#60a5fa', fontWeight: 'bold', margin: 0 }}>
                🚀 Application Module Active
              </p>
              <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                Handshake Verified: 55-45-17
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="nexus-platform" style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
      <header className="nexus-header">
        <div className="header-content">
          <div className="logo-container">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="#2563eb" strokeWidth="5"/>
                <path d="M35 50 L50 35 L65 50 L50 65 Z" fill="#2563eb"/>
                <circle cx="50" cy="50" r="8" fill="#fff"/>
              </svg>
              <h1 style={{ margin: 0 }}>N3XUS COS</h1>
            </Link>
          </div>
          <p className="header-subtitle">The Creative Operating System</p>
          <nav className="main-nav">
            <Link to="/desktop">← Back to Desktop</Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', color: '#94a3b8', fontSize: '0.875rem' }}>
          <Link to="/desktop" style={{ color: '#94a3b8', textDecoration: 'none' }}>Desktop</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: '#cbd5e1' }}>{moduleName}</span>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{appName}</span>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
          border: '1px solid #334155', 
          borderRadius: '1rem', 
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>
            {appName}
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            {description}
          </p>
          
          <div style={{ 
            padding: '2rem', 
            background: 'rgba(37, 99, 235, 0.1)', 
            borderRadius: '0.5rem', 
            border: '1px dashed #2563eb',
            display: 'inline-block',
            width: '100%',
            maxWidth: '600px',
            textAlign: 'left'
          }}>
            {children || (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#60a5fa', fontWeight: 'bold', margin: 0 }}>
                  🚀 Application Module Active
                </p>
                <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                  Handshake Verified: 55-45-17
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="nexus-footer">
        <div className="footer-content" style={{ justifyContent: 'center' }}>
          <p>&copy; 2024 N3XUS COS. All rights reserved. | The Creative Operating System</p>
        </div>
      </footer>
    </div>
  );
};

export default AppStub;
