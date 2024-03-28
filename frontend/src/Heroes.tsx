import React, { useState, useEffect } from 'react';
import { fetchHeroes } from './services/heroesApi';
import { Hero } from './models/Hero';
import { saveHeroStats } from './services/userStatsApi';
import Modal from './Modal';
import './RouletteWheel.css';
import './Modal.css';

const Heroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [kills, setKills] = useState('');
  const [deaths, setDeaths] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userID = "1"; //TODO - replace with auth user id 

  useEffect(() => {
    fetchHeroes().then(setHeroes);
  }, []);

  const handleGenerateClick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      if (heroes.length) {
        const randomIndex = Math.floor(Math.random() * heroes.length);
        setSelectedHero(heroes[randomIndex]);
        setIsModalOpen(true);
      }
      setIsSpinning(false);
    }, 3000);
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
        setIsModalOpen(false);
      } catch (error) {
        console.error('Failed to save stats:', error);
        alert('Failed to save stats.');
      }
    }
  };

  return (
    <div className="compsoul-body">
      <h1>Hero Generator</h1>
      <button onClick={handleGenerateClick} disabled={isSpinning}>Generate</button>
      <div className={`compsoul-roulette ${isSpinning ? 'is-spinning' : ''}`}>
        <ul className="roulette-list">
          {heroes.map((hero, index) => (
            <li key={index} className="roulette-item" style={{ transform: `rotate(${index * (360 / heroes.length)}deg)` }}>
              {hero.name}
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
      </Modal>
    </div>
  );
};

export default Heroes;