import { useState, useEffect } from 'react';
import { getUserStatsByUserId } from './services/userStatsApi';
import { UserStatsResponse } from './models/UserStatsResponse';

interface UserStatsProps {
  userId: string;
}

const UserStats = ({ userId }: UserStatsProps) => {
  const [userStats, setUserStats] = useState<UserStatsResponse[]>([]);

  useEffect(() => {
    getUserStatsByUserId(userId)
      .then(data => setUserStats(data))
      .catch((error) => console.error('Failed to fetch stats:', error));
  }, [userId]);

  const totalKills = userStats.reduce((acc, curr) => acc + curr.kills, 0);
  const totalDeaths = userStats.reduce((acc, curr) => acc + curr.deaths, 0);
  const averageKD = totalDeaths > 0 ? (totalKills / totalDeaths).toFixed(2) : 'N/A';

  return (
    <div>
      <h2>User Stats</h2>
      <p>Average K/D: {averageKD}</p>
      <ul>
        {userStats.map((stat, index) => (
          <li key={index}>
            Character: {stat.characterName} - K/D: {stat.kills}/{stat.deaths} ({(stat.deaths > 0 ? (stat.kills / stat.deaths).toFixed(2) : 'N/A')})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserStats;