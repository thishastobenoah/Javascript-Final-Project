import React, { useState } from 'react';
import Heroes from './Heroes';
import Valorant from './Valorant';
import League from './League';

const App = () => {
  const [selectedGame, setSelectedGame] = useState('');

  const renderGameComponent = () => {
    switch (selectedGame) {
      case 'heroes':
        return <Heroes />;
      case 'valorant':
        return <Valorant />;
      case 'league':
        return <League />;
      default:
        return <div>Please select a game</div>;
    }
  };

  return (
    <div>
      <h1>Game Stats Tracker</h1>
      <button onClick={() => setSelectedGame('heroes')}>Heroes</button>
      <button onClick={() => setSelectedGame('valorant')}>Valorant</button>
      <button onClick={() => setSelectedGame('league')}>League of Legends</button>
      {renderGameComponent()}
    </div>
  );
};

export default App;