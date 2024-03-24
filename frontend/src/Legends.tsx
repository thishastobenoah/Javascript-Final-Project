import { useState, useEffect } from 'react';
import { fetchLegends } from './services/legendsApi';
import { Legend } from './models/Legend';

const Legends = () => {
  const [legends, setLegends] = useState<Legend[]>([]);
  const [selectedLegend, setSelectedLegend] = useState<Legend | null>(null);

  useEffect(() => {
    fetchLegends().then(setLegends);
  }, []);

  const handleGenerateClick = () => {
    if (legends.length) {
      const randomIndex = Math.floor(Math.random() * legends.length);
      setSelectedLegend(legends[randomIndex]);
    }
  };

  return (
    <div>
      <h1>Legend Generator</h1>
      <button onClick={handleGenerateClick}>Generate</button>
      {selectedLegend && (
        <div>
          <h2>{selectedLegend.name}</h2>
          <h3>{selectedLegend.title}</h3>
          <p>Roles: {selectedLegend.roles.join(', ')}</p>
          <p>Partype: {selectedLegend.partype}</p>
        </div>
      )}
    </div>
  );
};

export default Legends;
