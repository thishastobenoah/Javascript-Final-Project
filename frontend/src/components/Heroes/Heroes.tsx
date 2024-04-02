
import { useState, useEffect } from 'react';
import { Hero } from '../../models/Hero';
import { fetchHeroes } from '../../services/heroesApi';
import { saveHeroStats } from '../../services/userStatsApi';
import Modal from '../../Modal';
import '../../RouletteWheel.css';
import '../Heroes/Heroes.css';
import '../../Modal.css';
import { Link } from "react-router-dom";
import { useUser } from '../../hooks/useUser';

const Heroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [kills, setKills] = useState('');
  const [deaths, setDeaths] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

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
    if (selectedHero && user?.uid) {
      try {
        await saveHeroStats({
          userId: user.uid,
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
    <body className='heroes-body'>
    <div className="heroes-container compsoul-body">
      <Link className='heroes-body' to="/">Home</Link>
      <h1 className='heroes-body'>Hero Generator</h1>
      <button className='heroes-body' onClick={handleGenerateClick} disabled={isSpinning}>Generate</button>
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
    </body>
  );
};
export default Heroes;
