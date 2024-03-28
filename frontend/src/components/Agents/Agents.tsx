import { useState, useEffect } from 'react';
import { Agent } from '../../models/Agent';
import { fetchAgents } from '../../services/agentsApi';
import { saveAgentStats } from '../../services/userStatsApi';

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [kills, setKills] = useState('');
  const [deaths, setDeaths] = useState('');
  const userID = "1"; //TODO - add user id from auth

  useEffect(() => {
    fetchAgents().then(setAgents);
  }, []);

  const handleGenerateClick = () => {
    if (agents.length) {
      const randomIndex = Math.floor(Math.random() * agents.length);
      setSelectedAgent(agents[randomIndex]);
    }
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
      } catch (error) {
        console.error('Failed to save stats:', error);
        alert('Failed to save stats.');
      }
    }
  };

  return (
    <div>
      <h1>Agent Generator</h1>
      <button onClick={handleGenerateClick}>Generate</button>
      {selectedAgent && (
        <form onSubmit={handleSaveStats}>
          <div>
            <h2>{selectedAgent.displayName}</h2>
            <p>Role: {selectedAgent.role}</p> 
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

export default Agents;