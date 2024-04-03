import React, { useState, useEffect } from 'react';
import { UserStatsResponse } from '../../models/UserStatsResponse';
import { getUserStatsByUserId } from '../../services/userStatsApi';
import './UserStats.css';

interface UserStatsProps {
  userId: string;
}

const UserStats: React.FC<UserStatsProps> = ({ userId }) => {
  const [userStats, setUserStats] = useState<UserStatsResponse[]>([]);

  useEffect(() => {
    getUserStatsByUserId(userId)
      .then(setUserStats)
      .catch((error) => console.error('Failed to fetch stats:', error));
  }, [userId]);

  const totalKills = userStats.reduce((acc, curr) => acc + curr.kills, 0);
  const totalDeaths = userStats.reduce((acc, curr) => acc + curr.deaths, 0);
  const averageKD = totalDeaths > 0 ? (totalKills / totalDeaths).toFixed(2) : 'N/A';

  return (
    <div className="user-stats">
      <h2>User Stats</h2>
      <div className="overall-kd">Overall Average K/D: {averageKD}</div>
      <div className="stats-cards">
        {userStats.map((stat, index) => (
          <div key={index} className="stats-card">
            <h3>{stat.characterName}</h3>
            <p>Kills: {stat.kills}</p>
            <p>Deaths: {stat.deaths}</p>
            <p>K/D: {stat.deaths > 0 ? (stat.kills / stat.deaths).toFixed(2) : 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
