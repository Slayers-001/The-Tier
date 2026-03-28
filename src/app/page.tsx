"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, Trophy, ChevronRight, Zap, Activity, LayoutDashboard, 
  ShieldCheck, Users, Settings, BarChart3, Swords, Target, Flame, 
  Database, Lock, Unlock, Terminal, Radio, Hash, ShoppingCart, Music, 
  ArrowUpRight, X, ShieldAlert, Star, Edit3, Save, Power, Crosshair, Package,
  Layers, HardDrive, Cpu, ExternalLink, Trash2, UserPlus, RefreshCcw, 
  AlertTriangle, CheckCircle2, Gavel, Globe, ZapOff
} from 'lucide-react';

// --- TITAN CONFIG ---
const PASSKEY = "PVP_PROPLE";
const DISCORD_AVATAR = "https://mc-heads.net/avatar/Utkarsh/100";
const SERVER_IP = "PLAY.NORDENMC.COM";

// --- GAME MODES ---
const GAME_MODES = [
  "OVERALL", "LTMs", "Vanilla", "UHC", "Pot", 
  "NethOP", "SMP", "Sword", "Axe", "Mace"
];

// --- INITIAL DATA SEED ---
const SEED_DATA: Record<string, any[]> = {
  OVERALL: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 125000 },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 112000 },
  ],
  Mace: [
    { rank: "01", name: "UTKARSH", tag: "SMASH_GOD", statType: "HT1", kd: "18.2", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 5000 },
  ]
};

// Initialize empty arrays for missing modes
GAME_MODES.forEach(m => { if(!SEED_DATA[m]) SEED_DATA[m] = []; });

const INITIAL_RANKS = [
  { id: "vip", name: "VIP_RANK", description: "Permanent command access & basic kits.", color: "text-green-400", price: "XP_UPLINK" },
  { id: "el", name: "ELITE_RANK", description: "Animated tags, priority node access.", color: "text-cyan-400", price: "XP_UPLINK" },
  { id: "om", name: "OMEGA_RANK", description: "Global kit-pvp access, exclusive arena access.", color: "text-fuchsia-400", price: "₹499" },
  { id: "nx", name: "NEXUS_SUPREME", description: "Animated prefix, total access pass.", color: "text-fuchsia-300", price: "₹999" },
];

export default function NordenNexusTitanV18_3() {
  // --- CORE STATE ---
  const [leaderboards, setLeaderboards] = useState<Record<string, any[]>>(SEED_DATA);
  const [globalRanks, setGlobalRanks] = useState(INITIAL_RANKS);
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- ADMIN & SECURITY ---
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] NORDEN_NEXUS_V18.3 ONLINE", "[KERNEL] ALL_SYSTEMS_FUNCTIONAL"]);

  // --- ADMIN INPUT STATES ---
  const [newRank, setNewRank] = useState({ name: '', price: '', desc: '', color: 'text-cyan-400' });
  const [newPlayer, setNewPlayer] = useState({ name: '', tag: '', kd: '', statType: 'HT1' });

  // --- PERSISTENCE HOOKS ---
  useEffect(() => {
    const savedDB = localStorage.getItem('norden_v18_db');
    const savedRanks = localStorage.getItem('norden_v18_ranks');
    if (savedDB) setLeaderboards(JSON.parse(savedDB));
    if (savedRanks) setGlobalRanks(JSON.parse(savedRanks));
    pushLog("VAULT_SYNC: SUCCESSFUL");
  }, []);

  const pushLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 30));
  };

  const commitToVault = () => {
    localStorage.setItem('norden_v18_db', JSON.stringify(leaderboards));
    localStorage.setItem('norden_v18_ranks', JSON.stringify(globalRanks));
    pushLog("CRITICAL_SAVE: ALL_DATA_COMMITTED");
    alert("NEXUS VAULT SYNCHRONIZED.");
  };

  // --- LEADERBOARD LOGIC ---
  const updatePlayer = (idx: number, field: string, value: string) => {
    const updated = { ...leaderboards };
    updated[activeMode][idx] = { ...updated[activeMode][idx], [field]: value };
    setLeaderboards(updated);
  };

  const deletePlayer = (idx: number) => {
    const updated = { ...leaderboards };
    updated[activeMode].splice(idx, 1);
    setLeaderboards(updated);
    pushLog(`PLAYER_REMOVED_FROM_${activeMode}`);
  };

  const injectPlayer = () => {
    if (!newPlayer.name) return;
    const updated = { ...leaderboards };
    const nextRank = (updated[activeMode].length + 1).toString().padStart(2, '0');
    updated[activeMode].push({
      ...newPlayer,
      rank: nextRank,
      img: `https://mc-heads.net/avatar/${newPlayer.name}/100`,
      xp: 0
    });
    setLeaderboards(updated);
    setNewPlayer({ name: '', tag: '', kd: '', statType: 'HT1' });
    pushLog(`MANUAL_INJECTION: ${newPlayer.name} -> ${activeMode}`);
  };

  const wipeMode = () => {
    if (confirm(`CRITICAL: Wipe all data for ${activeMode}?`)) {
      const updated = { ...leaderboards };
      updated[activeMode] = [];
      setLeaderboards(updated);
      pushLog(`CORE_WIPE: ${activeMode}_CLEARED`);
    }
  };

  // --- RANK LOGIC ---
  const updateRank = (idx: number, field: string, value: string) => {
    const updated = [...globalRanks];
    updated[idx] = { ...updated[idx], [field]: value };
    setGlobalRanks(updated);
  };

  const createRank = () => {
    if (!newRank.name) return;
    setGlobalRanks([...globalRanks, { 
      id: Date.now().toString(), 
      ...newRank, 
      name: newRank.name.toUpperCase() 
    }]);
    setNewRank({ name: '', price: '', desc: '', color: 'text-cyan-400' });
    pushLog(`NEW_RANK_CREATED: ${newRank.name}`);
  };

  // --- RENDER HELPERS ---
  const filteredPlayers = useMemo(() => {
    const data = leaderboards[activeMode] || [];
    return searchQuery 
      ? data.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) 
      : data;
  }, [leaderboards, activeMode, searchQuery]);

  return (
    <div className="flex min-h-screen bg-[#010103] text-white font-sans overflow-hidden selection:bg-cyan-500/40">
      
      {/* 🌌 TITAN BACKGROUND FX (Isolated) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.05)_0%,_transparent_70%)]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-cyan-900/10 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-fuchsia-900/10 blur-[140px] rounded-full"></div>
      </div>

      {/* 🚀 COMMAND SIDEBAR */}
      <aside className="w-24 hover:w-72 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-white/5 bg-black/50 backdrop-blur-3xl flex flex-col items-center py-10 z-[60] group shadow-2xl">
        <div className="mb-20 cursor-pointer" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)] rotate-3 hover:rotate-0 transition-transform">
            <Zap size={32} className="text-white fill-white" />
          </div>
        </div>

        <nav className="flex flex-col gap-6 w-full px-4 flex-1">
          <SideItem icon={<LayoutDashboard />} label="COMMAND_CENTER" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <SideItem icon={<ShoppingCart />} label="RANK_MATRIX" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <SideItem icon={<Users />} label="CLAN_UPLINK" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <div className="h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />
          <SideItem 
            icon={<ShieldCheck className={isAuthorized ? "text-green-400 drop-shadow-[0_0_10px_#4ade80]" : "text-red-500"} />} 
            label="NEXUS_ADMIN" 
            onClick={() => setIsAdminOpen(true)} 
          />
        </nav>

        <div className="mt-auto flex flex-col items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-black tracking-[0.5em] text-cyan-500/50">VAULT_V18.3</p>
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-bounce [animation-delay:0.2s]"></div>
          </div>
        </div>
      </aside>

      {/* 🖥️ MAIN ENGINE */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative z-10">
        
        {/* TITAN HEADER */}
        <header className="px-16 py-12 flex justify-between items-center sticky top-0 bg-[#010103]/70 backdrop-blur-3xl z-40 border-b border-white/5 shadow-2xl">
          <div className="flex items-end gap-6">
            <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-none">
              NORDEN<span className="text-cyan-400 drop-shadow-[0_0_20px_#06b6d4]">MC</span>
            </h1>
            <p className="text-[12px] font-black text-white/20 tracking-[0.6em] mb-1">ULTRA_NEXUS</p>
          </div>

          <div className="flex items-center gap-10">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SCAN_NORDEN_DATABASE..." 
                className="bg-white/5 border border-white/10 rounded-3xl pl-14 pr-8 py-5 text-xs font-mono tracking-widest outline-none focus:border-cyan-500/50 transition-all w-[400px] shadow-inner" 
              />
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-black text-cyan-400 tracking-[0.3em] mb-1">STATUS: OPERATIONAL</span>
               <button className="bg-white text-black font-black text-xs px-12 py-5 rounded-[2rem] shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest border border-white/20">
                 {SERVER_IP}
               </button>
            </div>
          </div>
        </header>

        <main className="p-16 max-w-[1800px] mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="space-y-24">
                
                {/* MODE SELECTOR */}
                <div className="bg-black/60 backdrop-blur-3xl p-3 rounded-3xl border border-white/10 w-fit mx-auto flex items-center gap-3 shadow-2xl relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/20 tracking-[1em] uppercase">Matrix_Switch</div>
                  {GAME_MODES.map((mode) => (
                    <button 
                      key={mode} 
                      onClick={() => setActiveMode(mode)}
                      className={`relative px-10 py-4 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${activeMode === mode ? 'text-black' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
                    >
                      {activeMode === mode && (
                        <motion.div layoutId="modeGlow" className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_30px_#fff]" />
                      )}
                      <span className="relative z-10">{mode}</span>
                    </button>
                  ))}
                </div>

                {/* THE TITAN PODIUM */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {filteredPlayers.slice(0, 3).map((p, i) => (
                    <Podium key={p.name} player={p} rank={i+1} />
                  ))}
                </div>

                {/* THE LIST ENGINE */}
                <div className="space-y-6 pt-20 border-t border-white/5">
                  <div className="flex items-center justify-between px-10">
                    <h3 className="text-3xl font-black italic tracking-tighter text-white/40 uppercase">Global_Leaderboard // {activeMode}</h3>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-2 rounded-full text-[10px] font-black text-cyan-400 tracking-widest">
                      ACTIVE_NODES: {filteredPlayers.length}
                    </div>
                  </div>
                  <div className="grid gap-6">
                    {filteredPlayers.map((p, i) => (
                      <PlayerCard key={p.name} player={p} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeMenu === 'MARKET' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10">
                {globalRanks.map((rank, i) => (
                  <RankCard key={rank.id} rank={rank} i={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* 🔐 THE OMNI-VAULT (ULTIMATE ADMIN PANEL) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div 
            initial={{ x: 1000 }} animate={{ x: 0 }} exit={{ x: 1000 }}
            transition={{ type: "spring", damping: 35, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[800px] bg-[#020206] border-l border-white/10 z-[100] p-16 shadow-[-100px_0_150px_rgba(0,0,0,0.95)] backdrop-blur-[50px] overflow-y-auto custom-scrollbar"
          >
            {/* ADMIN HEADER */}
            <div className="flex justify-between items-center mb-16 sticky top-0 bg-[#020206]/95 py-6 z-30 border-b border-white/10">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 text-cyan-400">
                  <Gavel size={32} />
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">NEXUS_OMNI_VAULT</h2>
                </div>
                <p className="text-[10px] font-black text-white/20 tracking-[0.4em] mt-1 ml-12 uppercase">Privileged_Access_Level_9</p>
              </div>
              <button 
                onClick={() => setIsAdminOpen(false)} 
                className="group flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-red-500 transition-all"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-black">Terminate</span>
              </button>
            </div>

            {!isAuthorized ? (
              <div className="flex flex-col items-center justify-center py-32">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="mb-12">
                   <ShieldAlert size={120} className="text-red-500/20 drop-shadow-[0_0_50px_rgba(239,68,68,0.2)]" />
                </motion.div>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (passwordInput === PASSKEY ? setIsAuthorized(true) : alert("ACCESS_DENIED"))}
                  placeholder="DECRYPT_PASSKEY..." 
                  className="bg-white/5 border-2 border-white/10 w-full max-w-md p-8 rounded-[2.5rem] text-center text-3xl tracking-[0.5em] font-mono outline-none focus:border-cyan-500 transition-all mb-8 shadow-2xl" 
                />
                <button 
                  onClick={() => passwordInput === PASSKEY ? setIsAuthorized(true) : alert("ACCESS_DENIED")}
                  className="w-full max-w-md bg-white text-black font-black py-6 rounded-[2rem] hover:bg-cyan-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all uppercase tracking-[0.3em] text-sm"
                >
                  INITIALIZE_UPLINK
                </button>
              </div>
            ) : (
              <div className="space-y-16 pb-32">
                
                {/* SECTION 1: DATABASE OVERRIDE */}
                <div className="bg-gradient-to-br from-white/5 to-transparent p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-cyan-400 rotate-12"><Database size={200}/></div>
                   <div className="flex items-center justify-between mb-12">
                      <div className="flex items-center gap-4">
                        <Edit3 className="text-cyan-400" />
                        <h4 className="text-sm font-black tracking-[0.3em] uppercase">MATRIX_EDITOR: {activeMode}</h4>
                      </div>
                      <button onClick={wipeMode} className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-xl text-[10px] font-black border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={14}/> WIPE_MATRIX
                      </button>
                   </div>

                   <div className="space-y-8 mb-12">
                     {leaderboards[activeMode]?.map((p, idx) => (
                       <div key={idx} className="bg-black/80 p-8 rounded-[2.5rem] border border-white/5 relative group">
                          <button onClick={() => deletePlayer(idx)} className="absolute top-4 right-4 text-white/10 hover:text-red-500 transition-colors"><X size={16}/></button>
                          <div className="grid grid-cols-2 gap-8">
                             <div className="col-span-2">
                               <label className="text-[9px] font-black text-cyan-400/50 uppercase tracking-widest mb-2 block">PLAYER_NAME</label>
                               <input value={p.name} onChange={(e) => updatePlayer(idx, 'name', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-lg font-black italic outline-none focus:border-cyan-500" />
                             </div>
                             <div>
                               <label className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2 block">KD_VALUE</label>
                               <input value={p.kd} onChange={(e) => updatePlayer(idx, 'kd', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm font-mono outline-none focus:border-cyan-500" />
                             </div>
                             <div>
                               <label className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2 block">TAG_IDENTIFIER</label>
                               <input value={p.tag} onChange={(e) => updatePlayer(idx, 'tag', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-[10px] font-black uppercase outline-none focus:border-cyan-400" />
                             </div>
                          </div>
                       </div>
                     ))}
                   </div>

                   {/* INJECT NEW PLAYER NODE */}
                   <div className="bg-cyan-500/5 border-2 border-dashed border-cyan-500/20 p-10 rounded-[3rem] space-y-6">
                      <div className="flex items-center gap-3 text-cyan-400 mb-2">
                        <UserPlus size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Inject_New_Data_Node</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Username" value={newPlayer.name} onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})} className="bg-black/40 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-cyan-500" />
                        <input placeholder="K/D Ratio" value={newPlayer.kd} onChange={(e) => setNewPlayer({...newPlayer, kd: e.target.value})} className="bg-black/40 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-cyan-500" />
                      </div>
                      <input placeholder="Special Tag (e.g. LEGEND #9)" value={newPlayer.tag} onChange={(e) => setNewPlayer({...newPlayer, tag: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-cyan-500" />
                      <button onClick={injectPlayer} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all">EXECUTE_INJECTION</button>
                   </div>
                </div>

                {/* SECTION 2: RANK ARCHITECT */}
                <div className="bg-gradient-to-br from-fuchsia-950/10 to-transparent p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-fuchsia-400 rotate-12"><Package size={200}/></div>
                   <div className="flex items-center gap-4 mb-12">
                      <Package className="text-fuchsia-400" />
                      <h4 className="text-sm font-black tracking-[0.3em] uppercase">GLOBAL_RANK_ARCHITECT</h4>
                   </div>

                   <div className="space-y-6 mb-12">
                     {globalRanks.map((rank, i) => (
                       <div key={rank.id} className="flex items-center justify-between bg-black/60 p-6 rounded-3xl border border-white/5 group">
                          <div className="flex flex-col gap-1">
                            <input value={rank.name} onChange={(e) => updateRank(i, 'name', e.target.value)} className={`bg-transparent font-black italic uppercase text-2xl ${rank.color} outline-none`} />
                            <input value={rank.description} onChange={(e) => updateRank(i, 'description', e.target.value)} className="bg-transparent text-[10px] text-white/20 font-medium outline-none w-[300px]" />
                          </div>
                          <input value={rank.price} onChange={(e) => updateRank(i, 'price', e.target.value)} className="bg-transparent text-right font-black italic text-white/50 outline-none text-xl" />
                       </div>
                     ))}
                   </div>

                   {/* CREATE NEW RANK NODE */}
                   <div className="bg-fuchsia-500/5 border-2 border-dashed border-fuchsia-500/20 p-10 rounded-[3rem] space-y-6">
                      <div className="flex items-center gap-3 text-fuchsia-400 mb-2">
                        <Star size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Synthesize_Rank_Node</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Rank Title" value={newRank.name} onChange={(e) => setNewRank({...newRank, name: e.target.value})} className="bg-black/40 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-fuchsia-500" />
                        <input placeholder="Price Value" value={newRank.price} onChange={(e) => setNewRank({...newRank, price: e.target.value})} className="bg-black/40 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-fuchsia-500" />
                      </div>
                      <input placeholder="Description..." value={newRank.desc} onChange={(e) => setNewRank({...newRank, desc: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-fuchsia-500" />
                      <button onClick={createRank} className="w-full bg-fuchsia-500 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">DEPLOY_RANK_NODE</button>
                   </div>
                </div>

                {/* CRITICAL COMMIT */}
                <button 
                  onClick={commitToVault} 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black py-8 rounded-[3rem] shadow-[0_30px_70px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.5em] flex items-center justify-center gap-6 group"
                >
                  <Save size={28} className="group-hover:animate-bounce" /> COMMIT_ALL_VAULT_CHANGES
                </button>

                {/* LIVE SYSLOG */}
                <div className="bg-black p-10 rounded-[3.5rem] border border-white/5 font-mono text-[11px] text-cyan-500/40 h-64 overflow-y-auto custom-scrollbar shadow-inner relative">
                  <div className="sticky top-0 bg-black/90 py-2 border-b border-white/5 mb-4 text-[9px] font-bold text-white/10 tracking-[0.5em]">LIVE_LOG_STREAM</div>
                  {logs.map((log, i) => (
                    <div key={i} className="mb-2 flex gap-4">
                      <span className="opacity-20">[{i}]</span>
                      <span className="hover:text-cyan-400 transition-colors cursor-default">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- TITAN SUB-COMPONENTS ---

function SideItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-6 w-full py-5 px-5 rounded-[2rem] transition-all relative group ${active ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'scale-125 drop-shadow-[0_0_12px_#06b6d4]' : 'group-hover:scale-110'} transition-transform duration-500`}>{icon}</div>
      <span className="text-[12px] font-black tracking-[0.2em] hidden group-hover:block whitespace-nowrap uppercase animate-in fade-in slide-in-from-left-4">{label}</span>
      {active && <motion.div layoutId="sideInd" className="absolute left-0 top-4 bottom-4 w-1.5 bg-cyan-400 rounded-r-full shadow-[5px_0_20px_#06b6d4]" />}
    </button>
  );
}

function Podium({ player, rank }: { player: any, rank: number }) {
  const is1 = rank === 1;
  return (
    <div className={`bg-gradient-to-b ${is1 ? 'from-cyan-500/20 via-cyan-500/5 to-transparent border-cyan-500/40 shadow-[0_50px_100px_-20px_rgba(6,182,212,0.3)]' : 'from-white/5 to-transparent border-white/10'} border-2 p-16 rounded-[5rem] text-center relative group hover:-translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]`}>
      {is1 && <Crown className="text-yellow-400 absolute -top-10 left-1/2 -translate-x-1/2 drop-shadow-[0_0_25px_#facc15] animate-bounce" size={64} />}
      <div className="text-[120px] font-black italic text-white/[0.03] absolute top-10 right-10 select-none pointer-events-none">{rank}</div>
      <img src={player.img} className={`w-48 h-48 rounded-[4rem] mx-auto mb-12 border-4 ${is1 ? 'border-cyan-400' : 'border-white/10'} group-hover:scale-110 transition-transform duration-700`} />
      <h4 className="text-4xl font-black italic uppercase mb-3 group-hover:text-cyan-400 transition-colors drop-shadow-lg">{player.name}</h4>
      <p className="text-[10px] font-black text-white/30 tracking-[0.5em] uppercase mb-12">{player.tag}</p>
      <div className="pt-12 border-t border-white/5 flex justify-around">
        <div>
          <p className="text-[10px] font-black text-white/20 mb-1 tracking-widest uppercase">KD_RATIO</p>
          <p className="text-3xl font-black italic text-white">{player.kd}</p>
        </div>
        <div className="h-10 w-px bg-white/5 self-center" />
        <div>
          <p className="text-[10px] font-black text-white/20 mb-1 tracking-widest uppercase">XP_LOAD</p>
          <p className="text-3xl font-black italic text-cyan-400">{player.xp.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function PlayerCard({ player }: { player: any }) {
  return (
    <div className="bg-black/40 border border-white/5 p-10 rounded-[3.5rem] flex items-center justify-between group hover:border-cyan-500/40 hover:bg-white/[0.03] transition-all duration-700 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center gap-14 relative z-10">
        <span className="text-7xl font-black italic text-white/[0.04] w-24 group-hover:text-cyan-500/10 transition-all duration-700">{player.rank}</span>
        <img src={player.img} className="w-20 h-20 rounded-[2rem] border-2 border-white/5 group-hover:border-cyan-400 group-hover:rotate-6 transition-all duration-500" />
        <div className="flex flex-col">
          <h4 className="text-4xl font-black italic uppercase text-white group-hover:text-cyan-300 transition-colors leading-none mb-2 tracking-tighter">{player.name}</h4>
          <span className="text-[11px] font-black text-white/20 tracking-[0.4em] uppercase">{player.tag}</span>
        </div>
      </div>
      <div className="flex items-center gap-16 relative z-10">
        <div className="text-right">
          <p className="text-[10px] font-black text-white/20 mb-1 uppercase tracking-widest">KD_STAT</p>
          <p className="text-4xl font-black italic text-white group-hover:scale-110 transition-transform">{player.kd}</p>
        </div>
        <div className={`w-32 py-5 rounded-2xl text-center text-[11px] font-black border tracking-[0.2em] transition-all shadow-lg ${player.statType === 'HT1' ? 'text-red-500 border-red-500/20 bg-red-500/5 group-hover:bg-red-500 group-hover:text-white' : 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5 group-hover:bg-cyan-400 group-hover:text-black'}`}>
          {player.statType}
        </div>
        <button className="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all group-hover:rotate-45 border border-white/10 shadow-2xl duration-700"><ArrowUpRight size={28}/></button>
      </div>
    </div>
  );
}

function RankCard({ rank, i }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
      className="bg-black/60 border border-white/10 p-16 rounded-[5rem] text-center group hover:border-fuchsia-500/50 hover:bg-black/80 transition-all duration-700 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-12 opacity-[0.02] rotate-12 group-hover:rotate-0 transition-transform duration-1000 text-fuchsia-500"><Trophy size={200} /></div>
      <div className="w-24 h-24 bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20 rounded-[2.5rem] mx-auto mb-12 flex items-center justify-center border border-fuchsia-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-inner">
        <ShoppingCart className="text-fuchsia-400 drop-shadow-[0_0_15px_#d946ef]" size={40} />
      </div>
      <h3 className={`text-4xl font-black italic mb-6 uppercase tracking-tighter drop-shadow-lg ${rank.color}`}>{rank.name}</h3>
      <p className="text-[11px] font-medium text-white/30 mb-14 leading-relaxed tracking-wide h-12 overflow-hidden">{rank.description}</p>
      <div className="flex items-center justify-between bg-black p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
        <span className="text-2xl font-black italic text-white/70">{rank.price}</span>
        <button className="bg-white text-black text-[11px] font-black px-10 py-4 rounded-2xl hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all uppercase tracking-widest">ACQUIRE</button>
      </div>
    </motion.div>
  );
}
