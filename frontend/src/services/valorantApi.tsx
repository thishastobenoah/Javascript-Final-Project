import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Valorant from '../models/Valorant';

interface Props {
  baseUrl: string;
}

const RandomValorant: React.FC<Props> = ({ baseUrl }) => {
  const [randomChar, setRandomChar] = useState<Valorant | null>(null);
  const [chars, setChars] = useState<Valorant[]>([]);

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const response = await axios.get<Valorant[]>(baseUrl);
        setChars(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
    fetchChars();
  }, [baseUrl]);

  useEffect(() => {
    if (chars.length > 0) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      setRandomChar(chars[randomIndex]);
    }
  }, [chars]);

  return (
    <div>
      <h1>Random Valorant Character</h1>
      {randomChar && (
        <div>
          <h2>{randomChar.displayName}</h2>
          <p>{randomChar.description}</p>
          {/* idk what else idk if this even works man idk how to test it yet*/}
        </div>
      )}
    </div>
  );
};

export default RandomValorant;