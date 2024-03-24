import { useState, useEffect } from 'react';
import { fetchHeroes } from './services/heroesApi';
import { Hero } from './models/Hero';
import { saveHeroStats } from './services/userStatsApi';

const Heroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [kills, setKills] = useState('');
  const [deaths, setDeaths] = useState('');
  const userID = ""; //TODO - add user id from auth

  useEffect(() => {
    fetchHeroes().then(setHeroes);
  }, []);

  const handleGenerateClick = () => {
    if (heroes.length) {
      const randomIndex = Math.floor(Math.random() * heroes.length);
      setSelectedHero(heroes[randomIndex]);
    }
  };

  const handleSaveStats = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedHero && userID) {
      try {
        await saveHeroStats({
          userId: userID,
          characterName: selectedHero.name,
          kills: parseInt(kills, 10),
          deaths: parseInt(deaths, 10),
        });
        alert('Stats saved successfully!');
        setKills('');
        setDeaths('');
      } catch (error) {
        console.error('Failed to save stats:', error);
        alert('Failed to save stats.');
      }
    }
  };

  return (
    <div>
      <h1>Hero Generator</h1>
      <button onClick={handleGenerateClick}>Generate</button>
      {selectedHero && (
        <form onSubmit={handleSaveStats}>
          <div>
            <h2>{selectedHero.name}</h2>
            <p>Role: {selectedHero.role}</p>
            <p>Type: {selectedHero.type}</p>
          </div>
          <input
            type="number"
            placeholder="Kills"
            value={kills}
            onChange={(e) => setKills(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Deaths"
            value={deaths}
            onChange={(e) => setDeaths(e.target.value)}
            required
          />
          <button type="submit">Save Stats</button>
        </form>
      )}
    </div>
  );
};

export default Heroes;