import React, { useState } from 'react';

const CreatorOnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    domain: '',
    category: 'Entertainment & Lifestyle'
  });
  const [generatedCommand, setGeneratedCommand] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = `./infra/cps/scripts/deploy-tenant.sh "${formData.name}" "${formData.slug}" "${formData.domain}"`;
    setGeneratedCommand(cmd);
  };

  return (
    <div className="onboarding-form-container" style={{ padding: '20px', background: '#1a1a1a', borderRadius: '8px', maxWidth: '600px' }}>
      <h3 style={{ color: '#fff', marginBottom: '20px' }}>New Creator Onboarding</h3>
      <form onSubmit={generateCommand} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ color: '#888', display: 'block', marginBottom: '5px' }}>Creator Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="e.g. Club Saditty"
            required
            style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
          />
        </div>
        
        <div>
          <label style={{ color: '#888', display: 'block', marginBottom: '5px' }}>Slug (URL Safe)</label>
          <input 
            type="text" 
            name="slug" 
            value={formData.slug} 
            onChange={handleChange} 
            placeholder="e.g. club-saditty"
            required
            pattern="[a-z0-9-]+"
            style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ color: '#888', display: 'block', marginBottom: '5px' }}>Target Domain</label>
          <input 
            type="text" 
            name="domain" 
            value={formData.domain} 
            onChange={handleChange} 
            placeholder="e.g. clubsaditty.n3xuscos.online"
            required
            style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ color: '#888', display: 'block', marginBottom: '5px' }}>Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
          >
            <option>Entertainment & Lifestyle</option>
            <option>Health & Wellness</option>
            <option>Gaming & Esports</option>
            <option>Food & Community</option>
            <option>Talk & Discussion</option>
            <option>Urban Entertainment</option>
            <option>Dance & Performing Arts</option>
            <option>Creative Arts</option>
            <option>Beauty & Fashion</option>
            <option>Family & Children</option>
            <option>Comedy & Entertainment</option>
            <option>Local Community</option>
          </select>
        </div>

        <button 
          type="submit" 
          style={{ padding: '12px', background: 'linear-gradient(45deg, #00ffff, #0099ff)', border: 'none', borderRadius: '4px', color: '#000', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
          Generate Deployment Command
        </button>
      </form>

      {generatedCommand && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#000', border: '1px solid #333', borderRadius: '4px' }}>
          <h4 style={{ color: '#00ffff', margin: '0 0 10px 0' }}>Deployment Command:</h4>
          <code style={{ color: '#0f0', display: 'block', wordBreak: 'break-all', fontFamily: 'monospace' }}>
            {generatedCommand}
          </code>
          <button 
            onClick={() => navigator.clipboard.writeText(generatedCommand)}
            style={{ marginTop: '10px', padding: '5px 10px', background: '#333', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatorOnboardingForm;
