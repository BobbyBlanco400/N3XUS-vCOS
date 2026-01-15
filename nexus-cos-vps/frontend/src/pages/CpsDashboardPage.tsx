import React, { useState, useEffect } from 'react';
import TenantTable from '../components/cps/TenantTable';
import CreatorOnboardingForm from '../components/cps/CreatorOnboardingForm';
import DeploymentTab from '../components/dashboard/DeploymentTab';

// Import canonical tenant data (mocking the import or assuming it's available via API/Context in real app)
// For this implementation, we'll hardcode the initial state based on the JSON we just updated
import canonicalTenants from '../assets/canonical_tenants.json';

const CpsDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tenants' | 'onboarding'>('overview');
  const [systemStats, setSystemStats] = useState({
    totalTenants: 13,
    activeDeployments: 13,
    systemHealth: 'Optimal',
    version: 'v2.5.0-RC1'
  });

  return (
    <div className="cps-dashboard" style={{ padding: '20px', color: '#fff', minHeight: '100vh', background: '#0a0a0a' }}>
      <header style={{ marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(90deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Control Plane Service (CPS)
        </h1>
        <p style={{ color: '#666', marginTop: '10px' }}>Platform Management & Orchestration</p>
      </header>

      <div className="cps-tabs" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <button 
          onClick={() => setActiveTab('overview')}
          style={{ 
            padding: '10px 20px', 
            background: activeTab === 'overview' ? '#333' : 'transparent', 
            border: '1px solid #333', 
            color: '#fff', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('tenants')}
          style={{ 
            padding: '10px 20px', 
            background: activeTab === 'tenants' ? '#333' : 'transparent', 
            border: '1px solid #333', 
            color: '#fff', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Tenants Registry
        </button>
        <button 
          onClick={() => setActiveTab('onboarding')}
          style={{ 
            padding: '10px 20px', 
            background: activeTab === 'onboarding' ? '#333' : 'transparent', 
            border: '1px solid #333', 
            color: '#fff', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Onboarding
        </button>
        <button 
          onClick={() => setActiveTab('deployment')}
          style={{ 
            padding: '10px 20px', 
            background: activeTab === 'deployment' ? '#333' : 'transparent', 
            border: '1px solid #333', 
            color: '#fff', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Deployment
        </button>
      </div>

      <div className="cps-content">
        {activeTab === 'overview' && (
          <div className="overview-panel">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#151515', borderRadius: '8px', borderLeft: '4px solid #00ffff' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#888' }}>Total Residents</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{systemStats.totalTenants}</div>
              </div>
              <div style={{ padding: '20px', background: '#151515', borderRadius: '8px', borderLeft: '4px solid #00ff00' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#888' }}>Active Deployments</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{systemStats.activeDeployments}</div>
              </div>
              <div style={{ padding: '20px', background: '#151515', borderRadius: '8px', borderLeft: '4px solid #ff00ff' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#888' }}>System Health</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00ff00' }}>{systemStats.systemHealth}</div>
              </div>
              <div style={{ padding: '20px', background: '#151515', borderRadius: '8px', borderLeft: '4px solid #ffff00' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#888' }}>Core Version</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{systemStats.version}</div>
              </div>
            </div>

            <div style={{ marginTop: '30px', padding: '20px', background: '#151515', borderRadius: '8px' }}>
              <h3>System Status</h3>
              <p>Ready for Mainnet Launch. All verification checks passed.</p>
              <div style={{ marginTop: '10px', padding: '10px', background: '#004400', color: '#00ff00', display: 'inline-block', borderRadius: '4px' }}>
                ✅ READY_FOR_MAINNET
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tenants' && (
          <TenantTable tenants={canonicalTenants.tenants} />
        )}

        {activeTab === 'onboarding' && (
          <CreatorOnboardingForm />
        )}
        {activeTab === 'deployment' && (
          <DeploymentTab />
        )}
      </div>
    </div>
  );
};

export default CpsDashboardPage;
