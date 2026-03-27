export interface Player {
  uuid: string;
  name: string;
  rank: string;
  tier: string;
  status: string;
  stats: { kills: number; deaths: number; kd: number };
}

// THIS FUNCTION IS NOW AUTOMATIC. It fetches live data from NordenMC
export const getPlayerData = async (): Promise<Player[]> => {
  try {
    const response = await fetch(`http://play.nordenmc.fun:8804/api/v1/players`);
    const data = await response.json();
    
    // Mapping Minecraft stats to your Cyber-Nexus Architecture
    return data.map((p: any) => ({
      uuid: p.uuid,
      name: p.name,
      rank: p.group || "PLAYER",
      tier: p.kills > 100 ? "HT1" : "LT1", // Automated Tiering
      status: p.online ? "ONLINE" : "OFFLINE",
      stats: {
        kills: p.kills,
        deaths: p.deaths,
        kd: p.deaths > 0 ? (p.kills / p.deaths).toFixed(2) : p.kills
      }
    }));
  } catch (error) {
    console.error("NORDEN-API-ERROR: Connection Failed", error);
    return [];
  }
};
