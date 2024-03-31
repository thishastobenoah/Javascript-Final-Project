import { useState, useEffect } from 'react';
import { Agent } from '../../models/Agent';
import { fetchAgents } from '../../services/agentsApi';
import { saveAgentStats } from '../../services/userStatsApi';
import Modal from '../../Modal';
import '../../RouletteWheel.css';
import '../../Modal.css';

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [kills, setKills] = useState('');
  const [deaths, setDeaths] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userID = "1"; //TODO - add user id from auth

  useEffect(() => {
    fetchAgents().then(setAgents);
  }, []);

  const handleGenerateClick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      if (agents.length) {
        const randomIndex = Math.floor(Math.random() * agents.length);
        setSelectedAgent(agents[randomIndex]);
        setIsModalOpen(true);
      }
      setIsSpinning(false);
    }, 3000);
  };

  const handleSaveStats = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedAgent && userID) {
      try {
        await saveAgentStats({
          userId: userID,
          characterName: selectedAgent.displayName,
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
      <h1>Agent Generator</h1>
      <button onClick={handleGenerateClick} disabled={isSpinning}>Generate</button>
      <div className={`compsoul-roulette ${isSpinning ? 'is-spinning' : ''}`}>
        <ul className="roulette-list">
          {agents.map((agent, index) => (
            <li key={index} className="roulette-item" style={{ transform: `rotate(${index * (360 / agents.length)}deg)` }}>
              {agent.displayName}
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedAgent && (
          <form onSubmit={handleSaveStats}>
            <div>
              <h2>{selectedAgent.displayName}</h2>
              <p>Role: {selectedAgent.role.displayName}</p>
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

export default Agents;