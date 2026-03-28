"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, Trophy, ChevronRight, Zap, Activity, LayoutDashboard, 
  ShieldCheck, Users, Settings, BarChart3, Swords, Target, Flame, 
  Database, Lock, Unlock, Terminal, Radio, Hash, ShoppingCart, Music, 
  ArrowUpRight, X, ShieldAlert, Star, Edit3, Save, Power, Crosshair, Package,
  Layers, HardDrive, Cpu, ExternalLink, Trash2, UserPlus, RefreshCcw, 
  AlertTriangle, CheckCircle2, Gavel, Globe, ZapOff, Fingerprint, MousePointer2,
  TrendingUp, PlayCircle, Share2, Wallet, Coins, History, Hammer
} from 'lucide-react';

// --- TITAN CONFIGURATION ---
const PASSKEY = "PVP_PROPLE"; //
const SERVER_IP = "PLAY.NORDENMC.COM";
const GAME_MODES = ["OVERALL", "LTMs", "Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace"];

// --- INITIAL DATA SEEDING ---
const INITIAL_LEADERBOARDS: Record<string, any[]> = {
  OVERALL: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 125000, ip: "192.168.1.1", banned: false },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 112000, ip: "192.168.1.2", banned: false },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", statType: "HT1", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 98000, ip: "192.168.1.3", banned: false },
  ],
  Mace: [
    { rank: "01", name: "UTKARSH", tag: "SMASH_GOD", statType: "HT1", kd: "18.2", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 5000, ip: "192.168.1.1", banned: false },
  ]
};

// Removed Nexus Supreme as requested
const INITIAL_RANKS = [
  { id: "vip", name: "VIP_RANK", description: "Permanent command access & basic kits.", color: "text-green-400", cost: 5000, type: "XP" },
  { id: "el", name: "ELITE_RANK", description: "Animated tags, priority node access.", color: "text-cyan-400", cost: 15000, type: "XP" },
  { id: "om", name: "OMEGA_RANK", description: "Global kit-pvp access, exclusive arena access.", color: "text-fuchsia-400", cost: 500, type: "INR" },
];

GAME_MODES.forEach(m => { if(!INITIAL_LEADERBOARDS[m]) INITIAL_LEADERBOARDS[m] = []; });

export default function NordenNexusOverlordV19() {
  // --- STATE CORE ---
  const [leaderboards, setLeaderboards] = useState<Record<string, any[]>>(INITIAL_LEADERBOARDS);
  const [globalRanks, setGlobalRanks] = useState(INITIAL_RANKS);
  const [userXP, setUserXP] = useState(25000); // Current user's spending power
  
  // --- UI NAVIGATION ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  
  // --- ADMIN SYSTEMS ---
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] V19_OVERLORD_ACTIVE", "[KERNEL] XP_ECONOMY_LINKED"]);

  // --- ADMIN TOOLS ---
  const [newPlayer, setNewPlayer] = useState({ name: '', tag: '', kd: '', statType: 'HT1' });

  // --- PERSISTENCE ---
  useEffect(() => {
    const savedDB = localStorage.getItem('norden_v19_db');
    const savedRanks = localStorage.getItem('norden_v19_ranks');
    const savedXP = localStorage.getItem('norden_v19_xp');
    if (savedDB) setLeaderboards(JSON.parse(savedDB));
    if (savedRanks) setGlobalRanks(JSON.parse(savedRanks));
    if (savedXP) setUserXP(parseInt(savedXP));
  }, []);

  const pushLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 40));
  };

  const commitData = () => {
    localStorage.setItem('norden_v19_db', JSON.stringify(leaderboards));
    localStorage.setItem('norden_v19_ranks', JSON.stringify(globalRanks));
    localStorage.setItem('norden_v19_xp', userXP.toString());
    pushLog("SYNC: DATA_COMMITTED_TO_NEXUS");
    alert("VAULT SYNCHRONIZED");
  };

  // --- ECONOMY LOGIC ---
  const purchaseRank = (rank: any) => {
    if (rank.type === "XP") {
      if (userXP >= rank.cost) {
        setUserXP(prev => prev - rank.cost);
        pushLog(`ECONOMY: PURCHASED ${rank.name} FOR ${rank.cost} XP`);
        alert(`SUCCESS: ${rank.name} UNLOCKED!`);
      } else {
        alert("INSUFFICIENT XP: COMPLETE MORE DUELS.");
      }
    } else {
      pushLog(`EXTERNAL_REDIRECT: STORE_LINK_OPENED FOR ${rank.name}`);
      window.open('https://store.nordenmc.com', '_blank');
    }
  };

  // --- ADMIN COMMANDS ---
  const grantGlobalXP = (amount: number) => {
    const updated = { ...leaderboards };
    updated[activeMode] = updated[activeMode].map(p => ({ ...p, xp: (p.xp || 0) + amount }));
    setLeaderboards(updated);
    pushLog(`COMMAND: GRANTED ${amount} XP TO ALL IN ${activeMode}`);
  };

  const toggleIPBan = (idx: number) => {
    const updated = { ...leaderboards };
    const p = updated[activeMode][idx];
    p.banned = !p.banned;
    setLeaderboards(updated);
    pushLog(`SECURITY: IP_BAN_${p.banned ? 'ACTIVE' : 'LIFTED'} FOR ${p.name}`);
  };

  const deletePlayerNode = (idx: number) => {
    const updated = { ...leaderboards };
    updated[activeMode].splice(idx, 1);
    setLeaderboards(updated);
    pushLog(`REMOVAL: PLAYER_NODE_DELETED_IN_${activeMode}`);
  };

  const injectPlayerNode = () => {
    if (!newPlayer.name) return;
    const updated = { ...leaderboards };
    updated[activeMode].push({
      ...newPlayer,
      rank: (updated[activeMode].length + 1).toString().padStart(2, '0'),
      img: `https://mc-heads.net/avatar/${newPlayer.name}/100`,
      xp: 0,
      ip: `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
      banned: false
    });
    setLeaderboards(updated);
    setNewPlayer({ name: '', tag: '', kd: '', statType: 'HT1' });
    pushLog(`INJECTION: NEW_ENTITY_${newPlayer.name}_CREATED`);
  };

  // --- RENDER HELPERS ---
  const leaderboardView = useMemo(() => {
    return leaderboards[activeMode]?.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];
  }, [leaderboards, activeMode, searchQuery]);

  return (
    <div className="flex min-h-screen bg-[#010103] text-white font-sans overflow-hidden selection:bg-cyan-500/50">
      
      {/* 🌌 TITAN NEBULA BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] bg-cyan-950/10 blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-fuchsia-950/10 blur-[180px] rounded-full"></div>
      </div>

      {/* 🚀 EXPANDED COMMAND SIDEBAR */}
      <aside className="w-24 hover:w-80 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] border-r border-white/5 bg-black/60 backdrop-blur-[40px] flex flex-col items-center py-12 z-[60] group shadow-2xl">
        <div className="mb-24 flex flex-col items-center gap-4 cursor-pointer" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)] hover:rotate-12 transition-transform">
            <Zap size={32} className="text-white fill-white" />
          </div>
          <span className="text-[10px] font-black tracking-[0.5em] text-cyan-400 opacity-0 group-hover:opacity-100 transition-all">NEXUS_V19</span>
        </div>

        <nav className="flex flex-col gap-6 w-full px-6 flex-1">
          <SidebarItem icon={<LayoutDashboard />} label="COMMAND_CENTER" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <SidebarItem icon={<ShoppingCart />} label="RANK_UPLINK" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <SidebarItem icon={<Swords />} label="WAR_ROOM" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <SidebarItem icon={<Activity />} label="MEDIA_HUB" active={activeMenu === 'MEDIA'} onClick={() => setActiveMenu('MEDIA')} />
          <SidebarItem icon={<History />} label="SYSTEM_LOGS" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
          
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />
          
          <SidebarItem 
            icon={<ShieldCheck className={isAuthorized ? "text-green-400 drop-shadow-[0_0_10px_#4ade80]" : "text-red-500"} />} 
            label="VAULT_SECURITY" 
            onClick={() => setIsAdminOpen(true)} 
          />
        </nav>

        {/* XP WALLET INDICATOR */}
        <div className="mt-auto px-6 w-full opacity-0 group-hover:opacity-100 transition-all duration-500">
           <div className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-3">
                 <Wallet size={18} className="text-cyan-400" />
                 <span className="text-[10px] font-black uppercase text-white/40">Credits</span>
              </div>
              <span className="text-xl font-black italic text-cyan-400">{userXP.toLocaleString()}</span>
           </div>
        </div>
      </aside>

      {/* 🖥️ MAIN INTERFACE */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative z-10">
        
        {/* TITAN HEADER */}
        <header className="px-20 py-14 flex justify-between items-center sticky top-0 bg-[#010103]/80 backdrop-blur-3xl z-40 border-b border-white/5">
          <div className="flex flex-col">
            <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              NORDEN<span className="text-cyan-400 drop-shadow-[0_0_30px_#06b6d4]">MC</span>
            </h1>
            <div className="flex gap-4 mt-2 ml-2">
              <span className="text-[12px] font-black text-white/20 tracking-[0.8em] uppercase">Tactical_Networking</span>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-green-500 tracking-widest">LIVE_V19</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SCAN_LEADERBOARD..." 
                className="bg-white/5 border border-white/10 rounded-[2.5rem] pl-16 pr-10 py-6 text-sm font-mono tracking-[0.2em] outline-none focus:border-cyan-500/50 transition-all w-[500px] shadow-inner" 
              />
            </div>
            <button className="bg-white text-black font-black text-sm px-14 py-6 rounded-[2rem] shadow-[0_30px_60px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.3em] border border-white/20">
              {SERVER_IP}
            </button>
          </div>
        </header>

        <main className="p-20 max-w-[1900px] mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="space-y-32">
                
                {/* DYNAMIC MODE TABS */}
                <div className="bg-black/60 backdrop-blur-3xl p-4 rounded-[2.5rem] border border-white/10 w-fit mx-auto flex items-center gap-4 shadow-2xl relative">
                  {GAME_MODES.map((mode) => (
                    <button 
                      key={mode} 
                      onClick={() => setActiveMode(mode)}
                      className={`relative px-12 py-5 rounded-2xl text-[12px] font-black tracking-widest uppercase transition-all duration-300 ${activeMode === mode ? 'text-black' : 'text-white/30 hover:text-white'}`}
                    >
                      {activeMode === mode && (
                        <motion.div layoutId="modeGlow" className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.3)]" />
                      )}
                      <span className="relative z-10">{mode}</span>
                    </button>
                  ))}
                </div>

                {/* THE TITAN PODIUM */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {leaderboardView.slice(0, 3).map((p, i) => (
                    <PodiumCard key={p.name} player={p} rank={i+1} onClick={() => setSelectedPlayer(p)} />
                  ))}
                </div>

                {/* PLAYER MATRIX LIST */}
                <div className="space-y-8 pt-20 border-t border-white/5">
                  <div className="flex items-center justify-between px-12">
                     <div className="flex items-center gap-6">
                        <TrendingUp className="text-cyan-400" />
                        <h3 className="text-4xl font-black italic tracking-tighter text-white/40 uppercase">Global_Matrix // {activeMode}</h3>
                     </div>
                     <span className="text-[12px] font-black text-white/20 tracking-[0.4em]">SHOWING {leaderboardView.length} ENTITIES</span>
                  </div>
                  <div className="grid gap-8">
                    {leaderboardView.map((p, i) => (
                      <PlayerListRow key={p.name} player={p} onClick={() => setSelectedPlayer(p)} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeMenu === 'MARKET' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-10">
                {globalRanks.map((rank, i) => (
                  <MarketCard key={rank.id} rank={rank} i={i} onBuy={() => purchaseRank(rank)} />
                ))}
              </motion.div>
            )}

            {activeMenu === 'LOGS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-black/60 border border-white/10 rounded-[4rem] p-16 font-mono">
                 <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-cyan-400">NEXUS_KERNEL_LOGS</h2>
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                 </div>
                 <div className="space-y-4 h-[600px] overflow-y-auto custom-scrollbar">
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-8 text-sm group hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <span className="text-white/20">[{new Date().toLocaleDateString()}]</span>
                        <span className="text-cyan-500/70">{log}</span>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* 👤 PLAYER STAT MODAL (Fix for: Clicking stats) */}
      <AnimatePresence>
        {selectedPlayer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-10 bg-[#010103]/90 backdrop-blur-2xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 w-full max-w-4xl rounded-[5rem] p-20 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            >
              <button onClick={() => setSelectedPlayer(null)} className="absolute top-12 right-12 text-white/20 hover:text-white transition-colors">
                <X size={40} />
              </button>
              
              <div className="grid grid-cols-2 gap-20">
                <div className="flex flex-col items-center">
                  <div className="relative mb-12">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full"></div>
                    <img src={selectedPlayer.img} className="w-64 h-64 rounded-[4rem] border-4 border-cyan-400 relative z-10" />
                  </div>
                  <h2 className="text-6xl font-black italic uppercase text-center mb-4">{selectedPlayer.name}</h2>
                  <span className="bg-cyan-500/10 border border-cyan-500/30 px-8 py-3 rounded-2xl text-[12px] font-black text-cyan-400 tracking-[0.4em] uppercase">{selectedPlayer.tag}</span>
                </div>

                <div className="space-y-12 py-10">
                  <StatDisplay icon={<Target />} label="KILL_DEATH_RATIO" value={selectedPlayer.kd} />
                  <StatDisplay icon={<Flame />} label="TOTAL_XP_LOAD" value={selectedPlayer.xp.toLocaleString()} />
                  <StatDisplay icon={<Fingerprint />} label="NETWORK_IDENTITY" value={selectedPlayer.ip} />
                  <div className="pt-10 border-t border-white/5 flex gap-6">
                     <button className="flex-1 bg-white text-black font-black py-6 rounded-3xl uppercase tracking-widest hover:bg-cyan-400 transition-all">CHALLENGE_PLAYER</button>
                     <button className="w-20 h-20 bg-white/5 border border-white/10 flex items-center justify-center rounded-3xl hover:bg-white hover:text-black transition-all"><Share2 size={24}/></button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔐 THE OVERLORD VAULT (ADMIN PANEL) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div 
            initial={{ x: 1000 }} animate={{ x: 0 }} exit={{ x: 1000 }}
            transition={{ type: "spring", damping: 40, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[900px] bg-[#020206] border-l border-white/10 z-[100] p-20 shadow-[-100px_0_150px_rgba(0,0,0,0.95)] backdrop-blur-[60px] overflow-y-auto custom-scrollbar"
          >
            {/* VAULT HEADER */}
            <div className="flex justify-between items-center mb-20 sticky top-0 bg-[#020206]/95 py-10 z-30 border-b border-white/10">
              <div className="flex flex-col">
                <div className="flex items-center gap-6 text-cyan-400">
                  <Gavel size={48} />
                  <h2 className="text-5xl font-black italic tracking-tighter uppercase">OVERLORD_VAULT_V19</h2>
                </div>
                <p className="text-[12px] font-black text-white/20 tracking-[0.5em] mt-2 ml-16">FULL_SYSTEM_PRIVILEGES_GRANTED</p>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="bg-red-500/10 border border-red-500/20 text-red-500 px-8 py-4 rounded-3xl font-black text-[12px] uppercase hover:bg-red-500 hover:text-white transition-all">TERMINATE</button>
            </div>

            {!isAuthorized ? (
              <div className="flex flex-col items-center justify-center py-40">
                <Lock size={100} className="text-white/10 mb-12 animate-pulse" />
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (passwordInput === PASSKEY ? setIsAuthorized(true) : alert("INVALID"))}
                  placeholder="DECRYPT_KEY..." 
                  className="bg-white/5 border-2 border-white/10 w-full max-w-lg p-10 rounded-[3rem] text-center text-4xl tracking-[0.6em] font-mono outline-none focus:border-cyan-500 transition-all mb-10 shadow-2xl" 
                />
                <button onClick={() => passwordInput === PASSKEY ? setIsAuthorized(true) : alert("DENIED")} className="w-full max-w-lg bg-white text-black font-black py-8 rounded-[2.5rem] text-lg uppercase tracking-[0.4em] hover:bg-cyan-500 transition-all">ESTABLISH_LINK</button>
              </div>
            ) : (
              <div className="space-y-24 pb-40">
                
                {/* GLOBAL COMMANDS SECTION */}
                <div className="grid grid-cols-2 gap-10">
                   <div className="bg-cyan-500/5 border border-cyan-500/20 p-12 rounded-[4rem] group hover:bg-cyan-500/10 transition-all">
                      <Zap className="text-cyan-400 mb-6" size={32} />
                      <h4 className="text-xl font-black italic mb-2">GLOBAL_XP_PULSE</h4>
                      <p className="text-[10px] text-white/30 mb-8 font-black uppercase tracking-widest leading-relaxed">Give 1000 XP to every player in the {activeMode} category instantly.</p>
                      <button onClick={() => grantGlobalXP(1000)} className="w-full bg-cyan-500 text-black py-5 rounded-3xl font-black text-[12px] uppercase tracking-widest hover:scale-105 transition-all">EXECUTE_PULSE</button>
                   </div>
                   <div className="bg-red-500/5 border border-red-500/20 p-12 rounded-[4rem] group hover:bg-red-500/10 transition-all">
                      <Trash2 className="text-red-500 mb-6" size={32} />
                      <h4 className="text-xl font-black italic mb-2">MATRIX_WIPE</h4>
                      <p className="text-[10px] text-white/30 mb-8 font-black uppercase tracking-widest leading-relaxed">Permanently clear all player data from the {activeMode} matrix node.</p>
                      <button onClick={() => { if(confirm("CLEAR ALL DATA?")) { setLeaderboards({...leaderboards, [activeMode]: []}); pushLog(`CORE_WIPE: ${activeMode}`); } }} className="w-full bg-red-500 text-white py-5 rounded-3xl font-black text-[12px] uppercase tracking-widest hover:scale-105 transition-all">INITIALIZE_WIPE</button>
                   </div>
                </div>

                {/* ENTITY LIST EDITOR */}
                <div className="bg-white/5 p-14 rounded-[5rem] border border-white/10">
                   <div className="flex items-center gap-6 mb-16">
                      <Edit3 className="text-cyan-400" />
                      <h4 className="text-2xl font-black italic uppercase tracking-tighter">ENTITY_MATRIX: {activeMode}</h4>
                   </div>

                   <div className="space-y-10 mb-16">
                     {leaderboards[activeMode]?.map((p, idx) => (
                       <div key={idx} className="bg-black/80 p-10 rounded-[3rem] border border-white/5 relative shadow-inner">
                          <div className="grid grid-cols-2 gap-10">
                             <div className="col-span-2 flex items-center justify-between border-b border-white/5 pb-6">
                                <div className="flex gap-4 items-center">
                                   <img src={p.img} className="w-12 h-12 rounded-xl" />
                                   <input value={p.name} onChange={(e) => updatePlayerNode(idx, 'name', e.target.value)} className="bg-transparent text-2xl font-black italic outline-none text-white focus:text-cyan-400" />
                                </div>
                                <div className="flex gap-4">
                                   <button onClick={() => toggleIPBan(idx)} className={`p-4 rounded-2xl border transition-all ${p.banned ? 'bg-red-500 text-white border-red-500' : 'bg-white/5 text-white/20 border-white/10 hover:border-red-500 hover:text-red-500'}`} title="BAN_IP">
                                      <Hammer size={18} />
                                   </button>
                                   <button onClick={() => deletePlayerNode(idx)} className="p-4 rounded-2xl bg-white/5 text-white/20 border border-white/10 hover:bg-red-500 hover:text-white transition-all"><X size={18}/></button>
                                </div>
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 block">KD_STAT</label>
                                <input value={p.kd} onChange={(e) => updatePlayerNode(idx, 'kd', e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-mono text-cyan-400 outline-none focus:border-cyan-500" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 block">TAG_IDENTIFIER</label>
                                <input value={p.tag} onChange={(e) => updatePlayerNode(idx, 'tag', e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-black uppercase text-xs outline-none focus:border-cyan-400" />
                             </div>
                          </div>
                       </div>
                     ))}
                   </div>

                   {/* MANUAL INJECTION */}
                   <div className="bg-cyan-500/5 border-2 border-dashed border-cyan-500/20 p-12 rounded-[4rem] space-y-8">
                      <h5 className="text-[12px] font-black text-cyan-400 tracking-[0.5em] uppercase text-center">Infect_New_Entity_Node</h5>
                      <div className="grid grid-cols-2 gap-6">
                        <input placeholder="Username" value={newPlayer.name} onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})} className="bg-black/60 border border-white/10 p-5 rounded-2xl text-sm outline-none focus:border-cyan-500" />
                        <input placeholder="K/D Value" value={newPlayer.kd} onChange={(e) => setNewPlayer({...newPlayer, kd: e.target.value})} className="bg-black/60 border border-white/10 p-5 rounded-2xl text-sm outline-none focus:border-cyan-500" />
                      </div>
                      <input placeholder="Special Identifier (e.g. LEGEND)" value={newPlayer.tag} onChange={(e) => setNewPlayer({...newPlayer, tag: e.target.value})} className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-sm outline-none focus:border-cyan-500" />
                      <button onClick={injectPlayerNode} className="w-full bg-cyan-500 text-black font-black py-6 rounded-3xl text-[14px] uppercase tracking-[0.5em] hover:bg-white transition-all shadow-[0_20px_40px_rgba(6,182,212,0.3)]">SYNTHESIZE_ENTITY</button>
                   </div>
                </div>

                <button onClick={commitData} className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black py-10 rounded-[3.5rem] shadow-[0_40px_100px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.6em] flex items-center justify-center gap-8 text-xl">
                  <Save size={32} /> COMMIT_VAULT_OVERRIDE
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  function updatePlayerNode(idx: number, field: string, value: string) {
    const updated = { ...leaderboards };
    updated[activeMode][idx] = { ...updated[activeMode][idx], [field]: value };
    setLeaderboards(updated);
  }
}

// --- TITAN COMPONENTS ---

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-8 w-full py-6 px-6 rounded-[2.5rem] transition-all relative group ${active ? 'bg-cyan-500/15 text-cyan-400 shadow-[inset_0_0_30px_rgba(6,182,212,0.1)]' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'scale-125 drop-shadow-[0_0_15px_#06b6d4]' : 'group-hover:scale-110'} transition-transform duration-500`}>{icon}</div>
      <span className="text-[14px] font-black tracking-[0.3em] hidden group-hover:block whitespace-nowrap uppercase">{label}</span>
      {active && <motion.div layoutId="sideInd" className="absolute left-0 top-6 bottom-6 w-2 bg-cyan-400 rounded-r-full shadow-[10px_0_30px_#06b6d4]" />}
    </button>
  );
}

function PodiumCard({ player, rank, onClick }: any) {
  const is1 = rank === 1;
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer bg-gradient-to-b ${is1 ? 'from-cyan-500/20 via-cyan-500/5 to-transparent border-cyan-500/40 shadow-[0_60px_120px_-30px_rgba(6,182,212,0.3)]' : 'from-white/5 to-transparent border-white/10'} border-2 p-20 rounded-[6rem] text-center relative group hover:-translate-y-6 transition-all duration-700`}
    >
      {is1 && <Crown className="text-yellow-400 absolute -top-12 left-1/2 -translate-x-1/2 drop-shadow-[0_0_30px_#facc15] animate-bounce" size={80} />}
      <div className="text-[150px] font-black italic text-white/[0.03] absolute top-10 right-10 select-none pointer-events-none">{rank}</div>
      <img src={player.img} className={`w-56 h-56 rounded-[5rem] mx-auto mb-14 border-4 ${is1 ? 'border-cyan-400' : 'border-white/10'} group-hover:scale-110 transition-transform duration-700`} />
      <h4 className="text-5xl font-black italic uppercase mb-4 tracking-tighter group-hover:text-cyan-400 transition-colors drop-shadow-2xl">{player.name}</h4>
      <p className="text-[12px] font-black text-white/30 tracking-[0.6em] uppercase mb-14">{player.tag}</p>
      <div className="pt-14 border-t border-white/5 flex justify-around">
        <div>
          <p className="text-[11px] font-black text-white/20 mb-2 uppercase tracking-widest">K_D</p>
          <p className="text-4xl font-black italic text-white">{player.kd}</p>
        </div>
        <div className="h-12 w-px bg-white/5 self-center" />
        <div>
          <p className="text-[11px] font-black text-white/20 mb-2 uppercase tracking-widest">XP</p>
          <p className="text-4xl font-black italic text-cyan-400">{player.xp.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function PlayerListRow({ player, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="bg-black/40 border-2 border-white/5 p-12 rounded-[4rem] flex items-center justify-between group hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all duration-700 shadow-2xl relative overflow-hidden cursor-pointer"
    >
      <div className="flex items-center gap-16 relative z-10">
        <span className="text-8xl font-black italic text-white/[0.04] w-28 group-hover:text-cyan-500/10 transition-all duration-700">{player.rank}</span>
        <img src={player.img} className="w-24 h-24 rounded-[2.5rem] border-2 border-white/5 group-hover:border-cyan-400 group-hover:rotate-12 transition-all duration-500" />
        <div className="flex flex-col">
          <h4 className="text-5xl font-black italic uppercase text-white group-hover:text-cyan-300 transition-colors tracking-tighter mb-2">{player.name}</h4>
          <div className="flex gap-4 items-center">
             <span className="text-[12px] font-black text-white/20 tracking-[0.5em] uppercase">{player.tag}</span>
             {player.banned && <span className="bg-red-500/10 text-red-500 text-[8px] font-black px-3 py-1 rounded-full border border-red-500/20">NETWORK_RESTRICTED</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-20 relative z-10">
        <div className="text-right">
          <p className="text-[11px] font-black text-white/20 mb-2 uppercase tracking-widest">STAT_INDEX</p>
          <p className="text-5xl font-black italic text-white group-hover:scale-110 transition-transform">{player.kd}</p>
        </div>
        <div className={`w-36 py-6 rounded-3xl text-center text-[12px] font-black border tracking-[0.3em] transition-all shadow-lg ${player.statType === 'HT1' ? 'text-red-500 border-red-500/20 bg-red-500/5 group-hover:bg-red-50' : 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5 group-hover:bg-cyan-400'}`}>
          {player.statType}
        </div>
        <button className="w-20 h-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all group-hover:rotate-45 border border-white/10 shadow-2xl duration-700"><ArrowUpRight size={32}/></button>
      </div>
    </div>
  );
}

function MarketCard({ rank, i, onBuy }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
      className="bg-black/60 border border-white/10 p-20 rounded-[6rem] text-center group hover:border-cyan-500/50 hover:bg-black/80 transition-all duration-700 shadow-2xl relative overflow-hidden"
    >
      <div className="w-28 h-28 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-[3rem] mx-auto mb-14 flex items-center justify-center border border-cyan-500/30 group-hover:rotate-12 transition-all shadow-inner">
        <ShoppingCart className="text-cyan-400" size={48} />
      </div>
      <h3 className={`text-5xl font-black italic mb-8 uppercase tracking-tighter drop-shadow-2xl ${rank.color}`}>{rank.name}</h3>
      <p className="text-[13px] font-medium text-white/30 mb-16 leading-relaxed tracking-wide h-16">{rank.description}</p>
      <div className="flex items-center justify-between bg-black p-10 rounded-[3rem] border border-white/5 shadow-inner">
        <div className="text-left">
           <span className="text-[10px] font-black text-white/20 block mb-1 uppercase tracking-widest">REQUIRED</span>
           <span className="text-3xl font-black italic text-white/80">{rank.cost} {rank.type}</span>
        </div>
        <button onClick={onBuy} className="bg-white text-black text-[12px] font-black px-12 py-5 rounded-3xl hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all uppercase tracking-widest">PURCHASE</button>
      </div>
    </motion.div>
  );
}

function StatDisplay({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-8 group">
       <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
          {React.cloneElement(icon, { size: 24 })}
       </div>
       <div>
          <p className="text-[10px] font-black text-white/20 tracking-[0.5em] mb-1 uppercase">{label}</p>
          <p className="text-3xl font-black italic text-white">{value}</p>
       </div>
    </div>
  );
}
