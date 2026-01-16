import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TenantMiniPlatform } from '../components/TenantMiniPlatform';
import { FOUNDING_RESIDENTS } from '../components/FoundingResidents';

export default function TenantPlatformPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find tenant by slug
  const tenant = FOUNDING_RESIDENTS.find(t => t.slug === slug);
  
  if (!tenant) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#0f172a', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#ef4444' }}>⚠️ 404: PLATFORM NOT FOUND</h2>
        <p>The tenant platform you are looking for does not exist or is not live yet.</p>
        <button 
          onClick={() => navigate('/residents')}
          style={{ 
            marginTop: '30px', 
            padding: '10px 20px', 
            background: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Return to Registry
        </button>
      </div>
    );
  }

  return (
    <TenantMiniPlatform 
      tenant={{ 
        name: tenant.name, 
        url: `/platform/${tenant.slug}`,
        category: tenant.category
      }} 
      onClose={() => navigate('/residents')} 
    />
  );
}
