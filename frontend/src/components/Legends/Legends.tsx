import { useState, useEffect } from 'react';
import { Legend } from '../../models/Legend';
import { fetchLegends } from '../../services/legendsApi';
import { saveLegendStats } from '../../services/userStatsApi';
import Modal from '../../Modal';
import '../Legends/Legends.css';
import '../../Modal.css';
import { Link } from "react-router-dom";
import { useUser } from '../../hooks/useUser'

const Legends = () => {
  const [legends, setLegends] = useState<Legend[]>([]);
  const [selectedLegend, setSelectedLegend] = useState<Legend | null>(null);
  const [kills, setKills] = useState('');
  const [deaths, setDeaths] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    fetchLegends().then(setLegends);
  }, []);

  const handleGenerateClick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      if (legends.length) {
        const randomIndex = Math.floor(Math.random() * legends.length);
        setSelectedLegend(legends[randomIndex]);
        setIsModalOpen(true);
      }
      setIsSpinning(false);
    }, 3000);
  };

  const handleSaveStats = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedLegend && user?.uid) {
      try {
        await saveLegendStats({
          userId: user.uid,
          characterName: selectedLegend.name,
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
    <body className='legends-body'>
    <div className="legends-container compsoul-body">
    <Link className='legends-body' to="/">Home</Link>
      <h1>Legend Generator</h1>
      <button onClick={handleGenerateClick} disabled={isSpinning}>Generate</button>
      <div className={`compsoul-roulette ${isSpinning ? 'is-spinning' : ''}`}>
        <ul className="roulette-list">
          {legends.map((legend, index) => (
            <li key={index} className="roulette-item" style={{ transform: `rotate(${index * (360 / legends.length)}deg)` }}>
              {legend.name}
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
      </Modal>
    </div>
    </body>
  );
};

export default Legends;
