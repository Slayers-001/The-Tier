// File: app/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, LayoutDashboard, ShieldCheck, Users, Swords, 
  Database, Lock, Terminal, ShoppingCart, ArrowUpRight, X, AlertTriangle, 
  CheckCircle, Edit, Ban, VolumeX, RefreshCcw, Trash2, UserPlus, 
  Send, Package, Ghost, Cpu as Cpu2, HardDrive as Disk, Radio, Activity,
  Cpu as CpuIcon, Shield, User
} from 'lucide-react';

/**
 * ============================================================
 * NORDEN_TIER_OS // VERSION 31.0.0 // "OMNIPOTENT_BUILD"
 * OWNER/DEVELOPER: UTKARSH PANDEY (PVP_PRO)
 * STATUS: MAX_CAPACITY // ALL_SYSTEMS_FUNCTIONAL
 * CORE_PROTOCOL: HYPER_DENSE_V5_DYNAMIC
 * ============================================================
 */

const PASSKEY = "PVP_PRO"; // Updated to Owner IGN
const SERVER_IP = "play.mythichosting.fun:65102";
const SYSTEM_BUILD = "OMNI_NEXUS_REAPER_V31.0.0";
const MOCK_USER_IP = "192.168.1.100"; 

const MODES = ["OVERALL", "LTMs", "Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace", "Crystal", "Boxing", "Bridge", "Parkour", "BedWars"];

// DYNAMIC STORE RANKS
const STORE_RANKS = [
  { id: "R1", name: "MVP", price: "₹499", color: "text-blue-400", border: "hover:border-blue-500", perks: ["Custom MVP Prefix", "Priority Slot Entry", "White Chat Color", "Access to /nick"] },
  { id: "R2", name: "MVP+", price: "₹999", color: "text-red-500", border: "hover:border-red-500", perks: ["All MVP Perks", "Dynamic Particle Aura", "Custom Nickname Colors", "Fly in Hub/Lobby"] },
  { id: "R3", name: "MVP++", price: "₹1999", color: "text-yellow-500", border: "hover:border-yellow-500", perks: ["All MVP+ Perks", "Private SMP Access", "Animated Hex Nametags", "Bypass Queue Entirely", "Monthly Mythic Crate"] }
];

const INITIAL_LEADERBOARDS: Record<string, any[]> = {
  OVERALL: [
    { id: "P1", rank: "01", name: "UTKARSH", tag: "OWNER", statType: "HT1", kd: "15.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 2500000, kills: 25400, clan: "GLACIERZ", status: "ONLINE", power: 9999 },
    { id: "P2", rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 1120000, kills: 12000, clan: "GLACIERZ", status: "ONLINE", power: 8500 },
    { id: "P3", rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST", statType: "HT1", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 980000, kills: 9800, clan: "DEMON_SQUAD", status: "OFFLINE", power: 7200 },
  ]
};

const INITIAL_CLANS = [
  { id: "C1", name: "GLACIERZ", leader: "Utkarsh", members: 42, power: "98%", level: 50, color: "text-cyan-400", userIp: "192.168.1.1" },
  { id: "C2", name: "DEMON_SQUAD", leader: "Shivam", members: 28, power: "85%", level: 35, color: "text-red-500", userIp: "192.168.1.2" }
];

MODES.forEach(m => { 
  if(!INITIAL_LEADERBOARDS[m]) {
    INITIAL_LEADERBOARDS[m] = [...INITIAL_LEADERBOARDS.OVERALL].map(p => ({...p, id: `${p.id}_${m}`, kd: (parseFloat(p.kd) - Math.random()).toFixed(1)})).sort((a,b) => parseFloat(b.kd) - parseFloat(a.kd)); 
  }
});

export default function NordenTierNexus() {
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  // LIVE SERVER STATS
  const [realPlayers, setRealPlayers] = useState(0);
  const [serverStatus, setServerStatus] = useState("Pinging...");

  const [leaderboardData, setLeaderboardData] = useState<Record<string, any[]>>(INITIAL_LEADERBOARDS);
  const [clanData, setClanData] = useState<any[]>(INITIAL_CLANS);

  const [playerDossier, setPlayerDossier] = useState<any | null>(null);
  const [isClanGuiOpen, setIsClanGuiOpen] = useState(false);
  const [clanForm, setClanForm] = useState({ name: '', leader: '', color: 'text-white' });

  // ADMIN ENGINE
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [adminSection, setAdminSection] = useState('GENERAL');
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // --- REAL LIVE COUNTER INITIALIZATION ---
  useEffect(() => {
    const fetchServerStats = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await res.json();
        if (data.online) {
          setRealPlayers(data.players?.online || 0);
          setServerStatus("ONLINE");
        } else {
          setServerStatus("OFFLINE");
          setRealPlayers(0);
        }
      } catch (error) {
        setServerStatus("UNREACHABLE");
      }
    };

    fetchServerStats();
    const interval = setInterval(fetchServerStats, 60000); // Check every minute
    
    pushLog("SYSTEM: BOOTING NORDEN TIER OS V31...");
    pushLog(`NETWORK: ESTABLISHING UPLINK WITH ${SERVER_IP}...`);
    return () => clearInterval(interval);
  }, []);

  const pushLog = useCallback((msg: string) => {
    setLogs(p => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...p].slice(0, 150));
  }, []);

  const addNotify = (title: string, body: string, isError: boolean = false) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, body, isError }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
  };

  // --- WEBHOOK TRIGGER FUNCTION ---
  const sendDiscordWebhook = async (type: 'SHOP' | 'STAFF', message: string, embedData?: any) => {
    try {
      addNotify("TRANSMITTING", "Connecting to Discord Nexus...", false);
      const res = await fetch('/api/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content: message, embed: embedData })
      });
      if (res.ok) {
        addNotify("SUCCESS", "Discord network updated successfully.");
      } else {
        addNotify("ERROR", "Failed to reach Discord.", true);
      }
    } catch (e) {
      addNotify("CRITICAL ERROR", "Webhook API Route missing or blocked.", true);
    }
  };

  const handleRankPurchase = (rank: any) => {
    const embed = {
      title: "💎 NEW RANK PURCHASE INITIATED",
      color: 3447003, // Blue
      fields: [
        { name: "Rank Tier", value: rank.name, inline: true },
        { name: "Price", value: rank.price, inline: true },
        { name: "Status", value: "Pending Checkout Validation", inline: false }
      ],
      timestamp: new Date().toISOString()
    };
    sendDiscordWebhook('SHOP', `🚨 Alert! Someone clicked to purchase the **${rank.name}** rank!`, embed);
  };

  const handleAdminAction = (actionName: string, entityName: string) => {
    const embed = {
      title: "🛡️ STAFF COMMAND EXECUTED",
      color: 15158332, // Red
      description: `**Action:** ${actionName}\n**Target Entity:** ${entityName}\n**Executor:** System Admin (God_Nexus)`,
      timestamp: new Date().toISOString()
    };
    sendDiscordWebhook('STAFF', `Staff command triggered via Web Console.`, embed);
    addNotify("COMMAND_SENT", `${actionName} executed on ${entityName}`);
    pushLog(`ADMIN: ${actionName} applied to [${entityName}].`);
  };

  const currentLeaderboard = useMemo(() => {
    const list = leaderboardData[activeMode] || [];
    return list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [leaderboardData, activeMode, searchQuery]);


  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans overflow-hidden select-none pb-24 md:pb-0">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
         <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0a0a1a] to-black" />
         <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* MOBILE BOTTOM NAV & DESKTOP SIDEBAR */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-3xl border-t border-white/10 z-[1000] flex justify-around items-center md:hidden">
         <MobNavBtn icon={<LayoutDashboard/>} active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
         <MobNavBtn icon={<Swords/>} active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
         <MobNavBtn icon={<ShoppingCart/>} active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
         <MobNavBtn icon={<ShieldCheck className={isAuthorized ? "text-green-400" : "text-white"}/>} active={false} onClick={() => setIsAdminOpen(true)} />
      </nav>

      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-24 hover:w-72 transition-all duration-700 bg-black/40 backdrop-blur-3xl border-r border-white/5 z-[1000] group overflow-hidden shadow-2xl flex-col items-center group-hover:items-start py-10 px-5">
         <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-20 shadow-[0_0_40px_rgba(79,70,229,0.4)]"><Ghost size={28} /></div>
         <div className="flex-1 w-full space-y-4">
            <NavBtn icon={<LayoutDashboard/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
            <NavBtn icon={<Swords/>} label="CLAN_WARS" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
            <NavBtn icon={<ShoppingCart/>} label="NEXUS_STORE" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
            <NavBtn icon={<Terminal/>} label="SYSTEM_LOGS" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
         </div>
         <div className="w-full pt-10 border-t border-white/5 mt-10">
            <NavBtn icon={<ShieldCheck className={isAuthorized ? "text-green-400" : "text-red-500 animate-pulse"} />} label="ADMIN_PANEL" onClick={() => setIsAdminOpen(true)} />
         </div>
      </aside>

      {/* PRIMARY VIEWPORT */}
      <main className="md:ml-24 flex-1 h-screen overflow-y-auto custom-scrollbar relative z-10 p-6 sm:p-12 lg:p-20">
        
        {/* HEADER */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-16 gap-8">
           <div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-none">
                 NORDEN <span className="text-indigo-500">TIER</span>
              </h1>
              <div className="flex items-center gap-4 mt-4">
                 <div className={`flex items-center gap-3 px-4 py-1.5 border rounded-full ${serverStatus === 'ONLINE' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${serverStatus === 'ONLINE' ? 'bg-green-500 animate-ping' : 'bg-red-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{serverStatus}</span>
                 </div>
                 <span className="hidden sm:inline text-white/20 font-bold uppercase text-[10px] tracking-[0.4em]">Node: {SYSTEM_BUILD}</span>
              </div>
           </div>

           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full xl:w-auto">
              <div className="bg-black/50 border border-white/10 px-6 py-4 rounded-3xl flex justify-around items-center gap-6 backdrop-blur-2xl flex-1 xl:flex-none">
                 <StatusIndicator icon={<Users size={18}/>} val={realPlayers} label="ONLINE" />
                 <div className="w-[1px] h-8 bg-white/10" />
                 <StatusIndicator icon={<Activity size={18}/>} val="20.0" label="TPS" />
              </div>
              <button 
                onClick={() => { navigator.clipboard.writeText(SERVER_IP); addNotify("COPIED", "IP added to clipboard."); }}
                className="bg-white text-black font-black px-8 py-5 rounded-3xl uppercase tracking-tighter hover:bg-indigo-600 hover:text-white transition-all shadow-xl text-sm md:text-base text-center"
              >
                 {SERVER_IP}
              </button>
           </div>
        </header>

        <AnimatePresence mode="wait">
          
          {/* DASHBOARD */}
          {activeMenu === 'DASHBOARD' && (
            <motion.div key="dash" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12 md:space-y-20">
               
               <div className="flex flex-wrap justify-center gap-2 bg-white/5 p-2 rounded-3xl border border-white/5 backdrop-blur-3xl w-full max-w-4xl mx-auto">
                  {MODES.map(m => (
                    <button key={m} onClick={() => setActiveMode(m)} className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === m ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}>
                      {m}
                    </button>
                  ))}
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentLeaderboard.slice(0, 3).map((p, i) => (
                    <RankCard key={p.id} player={p} rank={i+1} onAction={() => setPlayerDossier(p)} />
                  ))}
               </div>

               <div className="bg-black/40 border border-white/5 rounded-[3rem] md:rounded-[4rem] p-6 md:p-12 relative overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                     <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase flex items-center gap-4"><Crown className="text-indigo-500"/> Global_Ledger</h2>
                     <div className="relative w-full md:w-auto">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SEARCH_ENTITY..." className="w-full md:w-80 bg-white/5 border border-white/10 pl-12 pr-6 py-4 rounded-2xl text-[11px] font-bold outline-none focus:border-indigo-500 text-white" />
                     </div>
                  </div>
                  <div className="space-y-3">
                     {currentLeaderboard.map((p) => <PlayerRow key={p.id} player={p} onAction={() => setPlayerDossier(p)} />)}
                  </div>
               </div>
            </motion.div>
          )}

          {/* MARKET / STORE VIEW */}
          {activeMenu === 'MARKET' && (
            <motion.div key="market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 md:space-y-16">
               <div>
                  <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Nexus_Store</h2>
                  <p className="text-indigo-500 font-black uppercase tracking-[0.3em] text-xs mt-2">Support Norden Tier Architecture</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {STORE_RANKS.map((rank) => (
                    <div key={rank.id} className={`bg-[#050508] border border-white/10 p-8 md:p-12 rounded-[3rem] group transition-all duration-500 ${rank.border} flex flex-col relative overflow-hidden shadow-2xl`}>
                       <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-all"><Package size={250}/></div>
                       <div className="relative z-10 flex-1">
                         <h3 className={`text-4xl md:text-5xl font-black italic uppercase mb-8 ${rank.color}`}>{rank.name}</h3>
                         <div className="space-y-4 mb-12">
                            {rank.perks.map((perk, i) => (
                              <p key={i} className="text-[10px] md:text-xs font-bold text-white/60 uppercase flex items-center gap-3">
                                <CheckCircle size={14} className={rank.color}/> {perk}
                              </p>
                            ))}
                         </div>
                       </div>
                       <div className="pt-8 border-t border-white/5 flex flex-col gap-6 relative z-10 mt-auto">
                          <span className="text-4xl md:text-5xl font-black italic tracking-tighter">{rank.price}</span>
                          <button onClick={() => handleRankPurchase(rank)} className="w-full bg-white/10 border border-white/10 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">
                             Checkout Sequence
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* ADD OTHER TABS (CLANS, LOGS) SIMILARLY SCALED DOWN FOR MOBILE HERE */}
          
        </AnimatePresence>
      </main>

      {/* ADMIN PANEL */}
      <AnimatePresence>
         {isAdminOpen && (
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 40, stiffness: 250 }} className="fixed inset-y-0 right-0 w-full md:max-w-4xl bg-[#030307] border-l border-white/10 z-[3000] shadow-2xl overflow-y-auto custom-scrollbar flex flex-col">
               <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#030307]/90 backdrop-blur-xl z-20">
                  <div>
                     <h2 className="text-3xl md:text-5xl font-black italic uppercase text-red-500">God_Nexus</h2>
                     <p className="text-white/30 font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px] mt-2">Owner Override Active</p>
                  </div>
                  <button onClick={() => setIsAdminOpen(false)} className="bg-white/5 p-4 rounded-xl hover:bg-red-600 transition-all"><X size={24}/></button>
               </div>

               <div className="p-8 md:p-12 flex-1">
                  {!isAuthorized ? (
                    <div className="h-full flex flex-col items-center justify-center py-20">
                       <Lock size={80} className="text-white/10 mb-10 animate-pulse" />
                       <input type="password" value={passInput} onChange={(e) => { setPassInput(e.target.value); if(e.target.value === PASSKEY) setIsAuthorized(true); }} placeholder="ENTER_PASSKEY..." className="bg-black border border-white/10 w-full max-w-md p-8 rounded-3xl text-center text-3xl font-black tracking-widest outline-none focus:border-red-500 transition-all" />
                    </div>
                  ) : (
                    <div className="space-y-12">
                       {/* DIRECT STAFF ACTIONS USING DISCORD WEBHOOK */}
                       <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
                          <h4 className="text-xl font-black italic uppercase text-red-500 mb-6 flex items-center gap-3"><AlertTriangle size={20}/> Remote Server Execution</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <AdminWebhookAction icon={<Ban/>} label="Global Ban Player" onClick={() => handleAdminAction("GLOBAL_BAN", "Target_User")} />
                             <AdminWebhookAction icon={<VolumeX/>} label="Mute Player" onClick={() => handleAdminAction("MUTE", "Target_User")} />
                             <AdminWebhookAction icon={<RefreshCcw/>} label="Restart Server Node" onClick={() => handleAdminAction("SERVER_RESTART", "Norden_Tier_Main")} />
                             <AdminWebhookAction icon={<Shield/>} label="Enable Whitelist" onClick={() => handleAdminAction("WHITELIST_ON", "All")} />
                          </div>
                       </div>
                       
                       <p className="text-white/30 text-xs font-black uppercase text-center mt-10">Advanced Admin features isolated for security.</p>
                    </div>
                  )}
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* TOASTS */}
      <div className="fixed bottom-24 md:bottom-10 right-4 md:right-10 z-[4000] space-y-4">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div key={n.id} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className={`bg-[#08080c] p-5 md:p-6 rounded-2xl shadow-2xl border-l-4 min-w-[280px] md:min-w-[350px] ${n.isError ? 'border-red-500' : 'border-indigo-500'}`}>
               <p className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${n.isError ? 'text-red-500' : 'text-indigo-500'}`}>{n.title}</p>
               <p className="text-sm md:text-base font-black italic uppercase text-white">{n.body}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// UI COMPONENTS
function NavBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-6 w-full p-5 rounded-2xl transition-all group relative ${active ? 'bg-indigo-600 text-white' : 'text-white/30 hover:bg-white/5'}`}>
       <div>{icon}</div>
       <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all absolute left-20 bg-black/90 px-4 py-2 rounded-lg pointer-events-none">{label}</span>
    </button>
  );
}

function MobNavBtn({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-4 rounded-xl transition-all ${active ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)]' : 'text-white/40 hover:text-white'}`}>
      {icon}
    </button>
  );
}

function StatusIndicator({ icon, val, label }: any) {
  return (
    <div className="flex items-center gap-3">
       <div className="text-indigo-400">{icon}</div>
       <div className="flex flex-col">
          <span className="text-lg md:text-2xl font-black italic leading-none">{val}</span>
          <span className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-widest">{label}</span>
       </div>
    </div>
  );
}

function AdminWebhookAction({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="bg-black/50 border border-red-500/20 p-4 rounded-xl flex items-center gap-4 hover:bg-red-500/20 hover:border-red-500/50 transition-all text-left">
       <div className="text-red-500">{icon}</div>
       <span className="text-xs font-black uppercase text-white/80">{label}</span>
    </button>
  );
}

function RankCard({ player, rank, onAction }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] cursor-pointer" onClick={onAction}>
       <div className="flex flex-col items-center">
          <div className="relative mb-6">
             <img src={player.img} className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-2 border-white/20" />
             <div className="absolute -bottom-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center text-black font-black text-xl italic">{rank}</div>
          </div>
          <h3 className="text-2xl md:text-4xl font-black italic uppercase mb-1 text-center">{player.name}</h3>
          <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-6 text-center">{player.tag}</p>
          <div className="w-full flex justify-between border-t border-white/5 pt-6 px-4">
             <div className="text-center"><p className="text-[8px] text-white/30 mb-1">K/D</p><p className="text-xl font-black italic">{player.kd}</p></div>
             <div className="text-center"><p className="text-[8px] text-white/30 mb-1">XP</p><p className="text-xl font-black italic text-indigo-400">{(player.xp/1000).toFixed(0)}K</p></div>
          </div>
       </div>
    </motion.div>
  );
}

function PlayerRow({ player, onAction }: any) {
  return (
    <div className="bg-black/50 border border-white/5 p-4 md:p-6 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/5" onClick={onAction}>
       <div className="flex items-center gap-4 md:gap-8">
          <span className="text-xl md:text-2xl font-black italic text-white/20 w-8 md:w-12 text-center">{player.rank}</span>
          <img src={player.img} className="w-10 h-10 md:w-12 md:h-12 rounded-xl" />
          <div>
             <h4 className="text-lg md:text-xl font-black italic uppercase">{player.name}</h4>
             <p className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-widest">{player.clan}</p>
          </div>
       </div>
       <div className="text-right mr-2 md:mr-6">
          <p className="text-[8px] text-white/30 mb-1">RATING</p>
          <p className="text-lg md:text-2xl font-black italic">{player.kd}</p>
       </div>
    </div>
  );
}
