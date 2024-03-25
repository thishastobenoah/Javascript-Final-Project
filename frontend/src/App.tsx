import { useState } from 'react';
import Heroes from './Heroes';
import Agents from './Agents';
import Legends from './Legends';
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
        return <Agents />;
      case 'league':
        return <Legends />;
      default:
        return <div>Please select a game or view stats</div>;
    }
  };

  return (
    <div>
      <h1>Game Stats Tracker</h1>
      <button onClick={() => { setSelectedGame('heroes'); setShowStats(false); }}>Heroes</button>
      <button onClick={() => { setSelectedGame('agents'); setShowStats(false); }}>Valorant</button>
      <button onClick={() => { setSelectedGame('legends'); setShowStats(false); }}>League of Legends</button>
      <button onClick={() => { setShowStats(true); setSelectedGame(''); }}>Show Stats</button> {/* New button to show stats */}
      {renderGameComponent()}
    </div>
  );
};

export default App;