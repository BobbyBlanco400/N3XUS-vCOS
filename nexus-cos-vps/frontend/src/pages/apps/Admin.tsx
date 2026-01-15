import AppStub from '../../components/AppStub';

export const UserManagement = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="User Management" 
    moduleId="admin" 
    moduleName="Admin Panel" 
    description="Platform user administration and role management." 
    isWindow={isWindow}
  />
);

export const ServiceControl = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Service Control" 
    moduleId="admin" 
    moduleName="Admin Panel" 
    description="Microservice status control and configuration." 
    isWindow={isWindow}
  />
);

export const Monitoring = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Monitoring" 
    moduleId="admin" 
    moduleName="Admin Panel" 
    description="Real-time system health and performance monitoring." 
    isWindow={isWindow}
  />
);

export const Logs = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Logs" 
    moduleId="admin" 
    moduleName="Admin Panel" 
    description="System event logs and audit trails." 
    isWindow={isWindow}
  />
);
