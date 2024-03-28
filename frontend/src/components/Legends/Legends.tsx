import { useState, useEffect } from 'react';
import { Legend } from '../../models/Legend';
import { fetchLegends } from '../../services/legendsApi';
import { saveLegendStats } from '../../services/userStatsApi';

const Legends = () => {
  const [legends, setLegends] = useState<Legend[]>([]);
  const [selectedLegend, setSelectedLegend] = useState<Legend | null>(null);
  const [kills, setKills] = useState('');
  const [deaths, setDeaths] = useState('');
  const userID = "1"; //TODO: Add user ID from auth

  useEffect(() => {
    fetchLegends().then(data => setLegends(data));
  }, []);

  const handleGenerateClick = () => {
    if (legends.length) {
      const randomIndex = Math.floor(Math.random() * legends.length);
      setSelectedLegend(legends[randomIndex]);
    }
  };

  const handleSaveStats = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedLegend && userID) {
      try {
        await saveLegendStats({
          userId: userID,
          characterName: selectedLegend.name,
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
      <h1>Legend Generator</h1>
      <button onClick={handleGenerateClick}>Generate</button>
      {selectedLegend && (
        <form onSubmit={handleSaveStats}>
          <div>
            <h2>{selectedLegend.name}</h2>
            <h3>{selectedLegend.title}</h3>
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

export default Legends;
