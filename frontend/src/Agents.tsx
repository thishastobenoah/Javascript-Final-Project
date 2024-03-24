import { useState, useEffect } from 'react';
import { fetchAgents } from './services/agentsApi';
import { Agent } from './models/Agent';

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    fetchAgents().then(setAgents);
  }, []);

  const handleGenerateClick = () => {
    if (agents.length) {
      const randomIndex = Math.floor(Math.random() * agents.length);
      setSelectedAgent(agents[randomIndex]);
    }
  };

  return (
    <div>
      <h1>Agent Generator</h1>
      <button onClick={handleGenerateClick}>Generate</button>
      {selectedAgent && (
        <div>
          <h2>{selectedAgent.displayName}</h2>
          <p>Role: {selectedAgent.role}</p>
          <p>Description: {selectedAgent.description}</p>
        </div>
      )}
    </div>
  );
};

export default Agents;