import { useState } from 'react';
import Heroes from './Heroes';
import Valorant from './Agents';
import League from './Legends';
import UserStats from './UserStats';

const App = () => {
  const [selectedGame, setSelectedGame] = useState('');
  const [showStats, setShowStats] = useState(false);
  const userID = "1"; // TODO - connect to auth ID

  const renderGameComponent = () => {
    if (showStats) {
      return <UserStats userId={userID} />;
    }
    switch (selectedGame) {
      case 'heroes':
        return <Heroes />;
      case 'valorant':
        return <Valorant />;
      case 'league':
        return <League />;
      default:
        return <div>Please select a game or view stats</div>;
    }
  };

  return (
    <div>
      <h1>Game Stats Tracker</h1>
      <button onClick={() => { setSelectedGame('heroes'); setShowStats(false); }}>Heroes</button>
      <button onClick={() => { setSelectedGame('valorant'); setShowStats(false); }}>Valorant</button>
      <button onClick={() => { setSelectedGame('league'); setShowStats(false); }}>League of Legends</button>
      <button onClick={() => { setShowStats(true); setSelectedGame(''); }}>Show Stats</button> {/* New button to show stats */}
      {renderGameComponent()}
    </div>
  );
};

export default App;