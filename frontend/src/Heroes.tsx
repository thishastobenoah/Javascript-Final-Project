import { useState, useEffect } from 'react';
import { fetchHeroes } from './services/heroesApi';
import { Hero } from './models/Hero';

const Heroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  useEffect(() => {
    fetchHeroes().then(setHeroes);
  }, []);

  const handleGenerateClick = () => {
    if (heroes.length) {
      const randomIndex = Math.floor(Math.random() * heroes.length);
      setSelectedHero(heroes[randomIndex]);
    }
  };

  return (
    <div>
      <h1>Hero Generator</h1>
      <button onClick={handleGenerateClick}>Generate</button>
      {selectedHero && (
        <div>
          <h2>{selectedHero.name}</h2>
          <p>Role: {selectedHero.new_role}</p>
          <p>Type: {selectedHero.type}</p>
        </div>
      )}
    </div>
  );
};

export default Heroes;