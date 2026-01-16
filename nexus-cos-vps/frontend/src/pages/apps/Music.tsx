import AppStub from '../../components/AppStub';

export const MusicLibrary = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Music Library" 
    moduleId="music-portal" 
    moduleName="PMMG Music" 
    description="Browse and manage your complete music collection." 
    isWindow={isWindow}
  />
);

export const Playlists = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Playlists" 
    moduleId="music-portal" 
    moduleName="PMMG Music" 
    description="Curated and custom playlists." 
    isWindow={isWindow}
  />
);

export const Radio = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Radio" 
    moduleId="music-portal" 
    moduleName="PMMG Music" 
    description="Live radio streams and stations." 
    isWindow={isWindow}
  />
);

export const Podcasts = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Podcasts" 
    moduleId="music-portal" 
    moduleName="PMMG Music" 
    description="Podcast library and subscription management." 
    isWindow={isWindow}
  />
);
