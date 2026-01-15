export interface App {
  id: string;
  name: string;
  description: string;
  url: string;
  component: React.ComponentType<{ isWindow?: boolean }>;
}

export interface Module {
  id: string;
  name: string;
  icon: string;
  apps: App[];
}
