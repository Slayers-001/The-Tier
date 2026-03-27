import { useState, useEffect } from 'react';
import { getPlayerData, Player } from '@/lib/fetchPlayers';

export const useTitanLiveStats = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const updateStats = async () => {
      const data = await getPlayerData();
      setPlayers(data);
    };

    updateStats();
    const interval = setInterval(updateStats, 5000); // REFRESH EVERY 5 SECONDS
    return () => clearInterval(interval);
  }, []);

  return players;
<<<<<<< HEAD
};
=======
};
>>>>>>> f49598a2be4a9d53f4761bd0e198f6d45c990f1a
