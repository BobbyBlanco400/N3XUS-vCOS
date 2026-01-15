import AppStub from '../../components/AppStub';

export const SlotGames = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Slot Games" 
    moduleId="casino-nexus" 
    moduleName="Casino N3XUS" 
    description="Premium slot machine experience." 
    isWindow={isWindow}
  />
);

export const TableGames = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Table Games" 
    moduleId="casino-nexus" 
    moduleName="Casino N3XUS" 
    description="Classic casino table games including Blackjack and Roulette." 
    isWindow={isWindow}
  />
);

export const LiveDealer = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Live Dealer" 
    moduleId="casino-nexus" 
    moduleName="Casino N3XUS" 
    description="Real-time live dealer casino games." 
    isWindow={isWindow}
  />
);

export const SportsBetting = ({ isWindow }: { isWindow?: boolean }) => (
  <AppStub 
    appName="Sports Betting" 
    moduleId="casino-nexus" 
    moduleName="Casino N3XUS" 
    description="Comprehensive sports wagering platform." 
    isWindow={isWindow}
  />
);
