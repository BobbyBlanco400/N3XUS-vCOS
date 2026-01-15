import React, { useState } from 'react';

interface Tenant {
  id: number;
  name: string;
  slug: string;
  domain: string;
  category: string;
  status: string;
  deployed: string;
  icon: string;
}

interface TenantTableProps {
  tenants: Tenant[];
}

const TenantTable: React.FC<TenantTableProps> = ({ tenants }) => {
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState<keyof Tenant>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(filter.toLowerCase()) || 
    t.slug.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedTenants = [...filteredTenants].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Tenant) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="tenant-table-container" style={{ padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
      <div className="table-controls" style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Search tenants..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#000', color: '#fff', flex: 1 }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333', textAlign: 'left' }}>
            <th onClick={() => handleSort('id')} style={{ padding: '10px', cursor: 'pointer' }}>ID</th>
            <th onClick={() => handleSort('icon')} style={{ padding: '10px', cursor: 'pointer' }}>Icon</th>
            <th onClick={() => handleSort('name')} style={{ padding: '10px', cursor: 'pointer' }}>Name</th>
            <th onClick={() => handleSort('slug')} style={{ padding: '10px', cursor: 'pointer' }}>Slug</th>
            <th onClick={() => handleSort('domain')} style={{ padding: '10px', cursor: 'pointer' }}>Domain</th>
            <th onClick={() => handleSort('category')} style={{ padding: '10px', cursor: 'pointer' }}>Category</th>
            <th onClick={() => handleSort('status')} style={{ padding: '10px', cursor: 'pointer' }}>Status</th>
            <th onClick={() => handleSort('deployed')} style={{ padding: '10px', cursor: 'pointer' }}>Deployed</th>
          </tr>
        </thead>
        <tbody>
          {sortedTenants.map((tenant) => (
            <tr key={tenant.id} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '10px' }}>{tenant.id}</td>
              <td style={{ padding: '10px' }}>{tenant.icon}</td>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>{tenant.name}</td>
              <td style={{ padding: '10px', color: '#888' }}>{tenant.slug}</td>
              <td style={{ padding: '10px' }}>
                <a href={`https://${tenant.domain}`} target="_blank" rel="noopener noreferrer" style={{ color: '#00ffff' }}>
                  {tenant.domain}
                </a>
              </td>
              <td style={{ padding: '10px' }}>{tenant.category}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '12px', 
                  background: tenant.status === 'live' ? '#004400' : '#444',
                  color: tenant.status === 'live' ? '#00ff00' : '#ccc',
                  fontSize: '0.8em'
                }}>
                  {tenant.status.toUpperCase()}
                </span>
              </td>
              <td style={{ padding: '10px', fontSize: '0.9em', color: '#888' }}>{new Date(tenant.deployed).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
        Showing {sortedTenants.length} of {tenants.length} residents
      </div>
    </div>
  );
};

export default TenantTable;
