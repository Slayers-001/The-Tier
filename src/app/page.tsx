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
  TrendingUp, PlayCircle, Share2, Wallet, Coins, History, Hammer, VolumeX,
  TrendingDown, Rocket, Eye, Link, Copy, Check, MessageSquare, BookOpen, Shield
} from 'lucide-react';

// --- CORE SYSTEM CONFIG ---
const PASSKEY = "PVP_PROPLE";
const SERVER_IP = "PLAY.NORDENMC.COM";
const MODES = ["OVERALL", "LTMs", "Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace"];

// --- PERSISTENT DATA SEEDS ---
const INITIAL_LEADERBOARDS: Record<string, any[]> = {
  OVERALL: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 125000, ip: "192.168.1.1", banned: false },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 112000, ip: "192.168.1.2", banned: false },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", statType: "HT1", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 98000, ip: "192.168.1.3", banned: false },
  ]
};

const INITIAL_CLANS = [
  { name: "GLACIERZ", leader: "Utkarsh", members: 42, power: "98%", dominance: 45, color: "text-cyan-400" },
  { name: "DEMON_SQUAD", leader: "Unknown", members: 28, power: "85%", dominance: 30, color: "text-red-500" },
  { name: "ZENITH", leader: "Satyarth", members: 35, power: "91%", dominance: 25, color: "text-fuchsia-500" },
];

const INITIAL_RULES = [
  "No Unfair Advantages (No Client Mods/Cheats)",
  "Respect All Community Members (No Toxic Toxicity)",
  "No Griefing in Spawn/Safe Zones",
  "Report All Bugs via Discord Tickets"
];

const INITIAL_MEDIA = [
  { id: 1, title: "NordenMC Season 5 Trailer", author: "MediaTeam", views: "12.4K", thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500" },
  { id: 2, title: "How to Master Mace PvP", author: "UTKARSH", views: "45.1K", thumb: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500" },
  { id: 3, title: "War Room: Clan Battles", author: "Community", views: "8.9K", thumb: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500" },
];

const INITIAL_RANKS = [
  { id: "vip", name: "VIP_RANK", description: "Permanent command access & basic kits.", color: "text-green-400", cost: 5000, type: "XP" },
  { id: "el", name: "ELITE_RANK", description: "Animated tags, priority node access.", color: "text-cyan-400", cost: 15000, type: "XP" },
  { id: "om", name: "OMEGA_RANK", description: "Global kit-pvp access, exclusive arena access.", color: "text-fuchsia-400", cost: 500, type: "INR" },
];

MODES.forEach(m => { if(!INITIAL_LEADERBOARDS[m]) INITIAL_LEADERBOARDS[m] = []; });

export default function NordenNexusAstraOmniV21() {
  // --- STATE ENGINES ---
  const [leaderboards, setLeaderboards] = useState(INITIAL_LEADERBOARDS);
  const [clans, setClans] = useState(INITIAL_CLANS);
  const [rules, setRules] = useState(INITIAL_RULES);
  const [media] = useState(INITIAL_MEDIA);
  const [globalRanks, setGlobalRanks] = useState(INITIAL_RANKS);
  const [userXP, setUserXP] = useState(50000);
  
  // --- UI CONTROLS ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  // --- SECURITY ENGINES ---
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] V21_ASTRA_OMNI_LIVE", "[KERNEL] RULEBOOK_ENGINE_ATTACHED"]);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // --- ADMIN INPUTS ---
  const [newPlayer, setNewPlayer] = useState({ name: '', tag: '', kd: '', statType: 'HT1' });
  const [newRule, setNewRule] = useState('');

  // --- PERSISTENCE ---
  useEffect(() => {
    const data = localStorage.getItem('norden_v21_save');
    if (data) {
      const parsed = JSON.parse(data);
      setLeaderboards(parsed.leaderboards);
      setClans(parsed.clans);
      setRules(parsed.rules || INITIAL_RULES);
      setUserXP(parsed.userXP);
      setGlobalRanks(parsed.globalRanks);
    }
  }, []);

  const pushLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 100));
  };

  const syncVault = () => {
    const bundle = { leaderboards, clans, rules, userXP, globalRanks };
    localStorage.setItem('norden_v21_save', JSON.stringify(bundle));
    pushLog("OMNI_SYNC: VAULT_COMMITTED_SUCCESSFULLY");
    alert("SYSTEM SYNCHRONIZED.");
  };

  // --- INTERACTION LOGIC ---
  const handleChallenge = (player: any) => {
    const matchId = Math.random().toString(36).substring(7).toUpperCase();
    pushLog(`DUEL: CHALLENGE_DEPLOYED_${matchId}_VS_${player.name}`);
    alert(`MATCH REQUEST ${matchId} SENT TO ${player.name}. STAND BY FOR NEXUS PING.`);
  };

  const handleShare = (player: any) => {
    const data = `NordenMC Stats: ${player.name} | Rank: ${player.rank} | KD: ${player.kd} | Mode: ${activeMode}`;
    navigator.clipboard.writeText(data);
    setIsCopied(true);
    pushLog(`LINK: SHARED_DATA_FOR_${player.name}`);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const purchaseRank = (rank: any) => {
    if (rank.type === "XP") {
      if (userXP >= rank.cost) {
        setUserXP(prev => prev - rank.cost);
        pushLog(`MARKET: ${rank.name}_ACQUIRED_BY_USER`);
        alert(`${rank.name} HAS BEEN APPLIED TO YOUR PROFILE.`);
      } else {
        alert("INSUFFICIENT XP BALANCE.");
      }
    } else {
      window.open('https://store.nordenmc.com', '_blank');
    }
  };

  // --- ADMIN GOD-COMMANDS ---
  const economyInflation = () => {
    const updated = { ...leaderboards };
    Object.keys(updated).forEach(mode => {
      updated[mode] = updated[mode].map(p => ({ ...p, xp: Math.floor(p.xp * 2) }));
    });
    setLeaderboards(updated);
    pushLog("GOD_CMD: GLOBAL_ECONOMY_INFLATED_2X");
  };

  const toggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    pushLog(`GOD_CMD: MAINTENANCE_LOCK_${!maintenanceMode ? 'ENABLED' : 'DISABLED'}`);
  };

  const addRule = () => {
    if(!newRule) return;
    setRules([...rules, newRule]);
    pushLog(`RULEBOOK: ADDED_NEW_POLICY_${newRule.substring(0, 10)}...`);
    setNewRule('');
  };

  const removeRule = (idx: number) => {
    const updated = [...rules];
    updated.splice(idx, 1);
    setRules(updated);
    pushLog(`RULEBOOK: REMOVED_POLICY_INDEX_${idx}`);
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
    pushLog(`ADMIN: INJECTED_NEW_ENTITY_${newPlayer.name}`);
  };

  // --- VIEW FILTERS ---
  const filteredLeaderboard = useMemo(() => {
    return (leaderboards[activeMode] || []).filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [leaderboards, activeMode, searchQuery]);

  return (
    <div className={`flex min-h-screen bg-[#010103] text-white font-sans overflow-hidden selection:bg-cyan-500/50 ${maintenanceMode ? 'grayscale saturate-0' : ''}`}>
      
      {/* 🌌 TITAN NEBULA FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.1)_0%,_transparent_60%)]"></div>
        <div className="absolute top-[-25%] left-[-15%] w-[130vw] h-[130vw] bg-cyan-950/5 blur-[250px] rounded-full animate-pulse duration-[10s]"></div>
      </div>

      {/* 🚀 OMNI-ASTRA SIDEBAR (ADJUSTED) */}
      <aside className="w-20 hover:w-64 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-white/5 bg-black/80 backdrop-blur-[100px] flex flex-col items-center py-10 z-[60] group shadow-2xl overflow-hidden">
        
        <div className="mb-14 flex flex-col items-center gap-4 cursor-pointer" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-[360deg] transition-all duration-1000">
            <Zap size={24} className="text-white fill-white" />
          </div>
          <div className="text-center opacity-0 group-hover:opacity-100 transition-all duration-500">
             <p className="text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase">Astra_V21</p>
          </div>
        </div>

        <nav className="flex flex-col gap-6 w-full px-4 flex-1">
          <MenuButton icon={<LayoutDashboard size={20}/>} label="COMMAND" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <MenuButton icon={<ShoppingCart size={20}/>} label="MARKET" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <MenuButton icon={<Swords size={20}/>} label="CLANS" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <MenuButton icon={<PlayCircle size={20}/>} label="MEDIA" active={activeMenu === 'MEDIA'} onClick={() => setActiveMenu('MEDIA')} />
          <MenuButton icon={<Terminal size={20}/>} label="SYSTEM" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
          
          <div className="h-px bg-white/5 my-6" />
          
          <MenuButton 
            icon={<ShieldCheck size={20} className={isAuthorized ? "text-green-400" : "text-red-500"} />} 
            label="ADMIN" 
            onClick={() => setIsAdminOpen(true)} 
          />
        </nav>

        {/* CREDIT MODULE */}
        <div className="mt-auto px-4 w-full opacity-0 group-hover:opacity-100 transition-all duration-700">
           <div className="bg-white/5 border border-white/10 p-4 rounded-3xl flex flex-col gap-2 shadow-xl">
              <div className="flex items-center justify-between">
                 <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">Balance</span>
                 <Wallet size={12} className="text-cyan-400" />
              </div>
              <div className="flex items-baseline gap-1">
                 <span className="text-xl font-black italic text-cyan-400">{userXP.toLocaleString()}</span>
                 <span className="text-[8px] font-black text-white/20 uppercase">XP</span>
              </div>
           </div>
        </div>
      </aside>

      {/* 🖥️ MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative z-10">
        
        {/* TITAN HEADER (SCALED DOWN) */}
        <header className="px-12 py-8 flex justify-between items-center sticky top-0 bg-[#010103]/90 backdrop-blur-3xl z-40 border-b border-white/5">
          <div className="flex flex-col">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
              NORDEN<span className="text-cyan-400 drop-shadow-[0_0_20px_#06b6d4]">MC</span>
            </h1>
            <div className="flex items-center gap-4 mt-2">
               <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-green-500 tracking-widest uppercase">SYSTEM_LIVE</span>
               </div>
               <span className="text-[10px] font-black text-white/10 tracking-[0.5em] uppercase">V21_NET_PVP</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SCAN_DATABASE..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-6 py-3 text-sm font-mono tracking-widest outline-none focus:border-cyan-500/50 transition-all w-[400px]" 
              />
            </div>
            <button className="bg-white text-black font-black text-[10px] px-8 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
              {SERVER_IP}
            </button>
          </div>
        </header>

        <main className="p-12 max-w-[1800px] mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* ⚔️ DASHBOARD VIEW */}
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div className="bg-black/40 backdrop-blur-3xl p-2 rounded-full border border-white/5 w-fit mx-auto flex items-center gap-2 shadow-2xl">
                  {MODES.map((mode) => (
                    <button key={mode} onClick={() => setActiveMode(mode)} className={`relative px-6 py-2 rounded-full text-[11px] font-black tracking-widest uppercase transition-all duration-500 ${activeMode === mode ? 'text-black' : 'text-white/30 hover:text-white'}`}>
                      {activeMode === mode && <motion.div layoutId="modeGlow" className="absolute inset-0 bg-white rounded-full" />}
                      <span className="relative z-10">{mode}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredLeaderboard.slice(0, 3).map((p, i) => (
                    <PodiumCard key={p.name} player={p} rank={i+1} onClick={() => setSelectedPlayer(p)} />
                  ))}
                </div>

                <div className="space-y-6 pt-12 border-t border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                     <TrendingUp className="text-cyan-400" size={24} />
                     <h3 className="text-2xl font-black italic tracking-tighter text-white/40 uppercase">Entity_Stream // {activeMode}</h3>
                  </div>
                  <div className="grid gap-4">
                    {filteredLeaderboard.map((p, i) => (
                      <PlayerListRow key={p.name} player={p} onClick={() => setSelectedPlayer(p)} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 🛒 MARKET VIEW */}
            {activeMenu === 'MARKET' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                {globalRanks.map((rank, i) => (
                  <MarketCard key={rank.id} rank={rank} i={i} onBuy={() => purchaseRank(rank)} />
                ))}
              </motion.div>
            )}

            {/* 🛡️ CLANS VIEW */}
            {activeMenu === 'CLANS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                 <div className="flex flex-col items-center mb-8">
                    <Swords size={60} className="text-fuchsia-500 mb-4" />
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter">WAR_ROOM</h2>
                 </div>
                 <div className="grid gap-6">
                    {clans.map((clan, i) => (
                      <div key={i} className="bg-black/30 border border-white/10 p-6 rounded-[3rem] flex items-center justify-between group hover:border-fuchsia-500/40 transition-all shadow-xl">
                         <div className="flex items-center gap-10">
                            <span className="text-6xl font-black italic text-white/5">#0{i+1}</span>
                            <div className="flex flex-col">
                               <h3 className={`text-4xl font-black italic uppercase ${clan.color} tracking-tighter leading-none mb-2`}>{clan.name}</h3>
                               <p className="text-[10px] font-black text-white/20 tracking-widest uppercase">LEADER: {clan.leader}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-16">
                            <div className="text-center">
                               <p className="text-[10px] font-black text-white/20 mb-1 uppercase tracking-widest">POWER</p>
                               <p className="text-3xl font-black italic text-fuchsia-500">{clan.power}</p>
                            </div>
                            <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-black font-black uppercase tracking-widest text-[10px] transition-all">JOIN</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {/* 🎥 MEDIA VIEW */}
            {activeMenu === 'MEDIA' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {media.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                       <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 border border-white/5 group-hover:border-cyan-500/50 transition-all shadow-lg">
                          <img src={item.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <PlayCircle size={48} className="text-white" />
                          </div>
                       </div>
                       <h4 className="text-xl font-black italic uppercase mb-1 tracking-tighter">{item.title}</h4>
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{item.author} • {item.views} VIEWS</p>
                    </div>
                  ))}
               </motion.div>
            )}

            {/* 📂 LOGS VIEW */}
            {activeMenu === 'LOGS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-black/50 border border-white/10 rounded-[3rem] p-8 font-mono shadow-2xl">
                    <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                       <Terminal className="text-cyan-400" size={24} />
                       <h2 className="text-2xl font-black italic uppercase tracking-tighter">KERNEL_V21</h2>
                    </div>
                    <div className="space-y-4 h-[500px] overflow-y-auto custom-scrollbar pr-4">
                       {logs.map((log, i) => (
                         <div key={i} className="flex gap-4 text-[12px] group">
                           <span className="text-white/10">NODE_{i}</span>
                           <span className="text-cyan-500/60 uppercase">{log}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-black/30 border border-white/10 rounded-[3rem] p-8 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                       <BookOpen className="text-fuchsia-400" size={24} />
                       <h2 className="text-2xl font-black italic uppercase tracking-tighter">RULEBOOK</h2>
                    </div>
                    <div className="space-y-4">
                       {rules.map((rule, i) => (
                         <div key={i} className="bg-white/5 p-4 rounded-2xl flex items-center gap-4">
                            <div className="w-8 h-8 bg-fuchsia-500/10 flex items-center justify-center rounded-lg text-fuchsia-400 font-black text-sm">{i + 1}</div>
                            <p className="text-sm font-black italic uppercase tracking-tighter">{rule}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* 👤 PLAYER MODAL (SCALED) */}
      <AnimatePresence>
        {selectedPlayer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/90 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-black border border-white/10 w-full max-w-4xl rounded-[4rem] p-12 relative shadow-2xl">
              <button onClick={() => setSelectedPlayer(null)} className="absolute top-8 right-8 text-white/20 hover:text-white">
                <X size={32} />
              </button>
              
              <div className="grid grid-cols-2 gap-12">
                <div className="flex flex-col items-center">
                  <img src={selectedPlayer.img} className="w-64 h-64 rounded-[3rem] border-4 border-cyan-400 shadow-xl mb-6" />
                  <h2 className="text-5xl font-black italic uppercase mb-2 tracking-tighter">{selectedPlayer.name}</h2>
                  <span className="bg-cyan-500/10 border border-cyan-500/30 px-6 py-2 rounded-full text-xs font-black text-cyan-400 tracking-widest uppercase">{selectedPlayer.tag}</span>
                </div>

                <div className="space-y-8 py-4">
                  <StatRow icon={<Target size={24}/>} label="K/D RATIO" value={selectedPlayer.kd} />
                  <StatRow icon={<Flame size={24}/>} label="TOTAL XP" value={selectedPlayer.xp.toLocaleString()} />
                  
                  <div className="pt-8 flex gap-4">
                     <button onClick={() => handleChallenge(selectedPlayer)} className="flex-1 bg-white text-black font-black py-4 rounded-full uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all flex items-center justify-center gap-4">
                        <Swords size={20} /> INITIATE_DUEL
                     </button>
                     <button onClick={() => handleShare(selectedPlayer)} className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all">
                        {isCopied ? <Check size={24} className="text-green-500" /> : <Share2 size={24} />}
                     </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔐 ADMIN PANEL (SCALED) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 1000 }} animate={{ x: 0 }} exit={{ x: 1000 }} className="fixed right-0 top-0 h-full w-[600px] bg-[#020206] border-l border-white/10 z-[100] p-10 shadow-2xl backdrop-blur-3xl overflow-y-auto custom-scrollbar">
            
            <div className="flex justify-between items-center mb-10 sticky top-0 bg-[#020206] py-4 z-30 border-b border-white/10">
              <div className="flex items-center gap-4 text-cyan-400">
                <Gavel size={32} />
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">GOD_MODE</h2>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="bg-red-500/10 text-red-500 px-6 py-2 rounded-full font-black text-[10px] uppercase">EXIT</button>
            </div>

            {!isAuthorized ? (
              <div className="flex flex-col items-center justify-center py-32">
                <Lock size={60} className="text-white/10 mb-8" />
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (passwordInput === PASSKEY ? setIsAuthorized(true) : alert("FAILED"))}
                  placeholder="PASSKEY..." 
                  className="bg-white/5 border border-white/10 w-full p-6 rounded-3xl text-center text-2xl tracking-[0.5em] outline-none mb-6" 
                />
                <button onClick={() => passwordInput === PASSKEY ? setIsAuthorized(true) : alert("FAILED")} className="w-full bg-white text-black font-black py-4 rounded-3xl text-sm uppercase tracking-widest hover:bg-cyan-500 transition-all">AUTHORIZE</button>
              </div>
            ) : (
              <div className="space-y-12 pb-20">
                <div className="grid grid-cols-2 gap-4">
                   <GodCommand icon={<TrendingUp size={24}/>} color="text-cyan-400" bg="bg-cyan-500/5" title="ECON_BOOST" onClick={economyInflation} />
                   <GodCommand icon={<Power size={24}/>} color={maintenanceMode ? "text-green-500" : "text-yellow-500"} bg="bg-yellow-500/5" title="MAINTENANCE" onClick={toggleMaintenance} />
                </div>

                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                   <h4 className="text-xl font-black italic uppercase mb-6 flex items-center gap-2"><Edit3 size={18}/> ENTITY_CONTROL</h4>
                   <div className="space-y-4 mb-6">
                     {leaderboards[activeMode]?.map((p, idx) => (
                       <div key={idx} className="bg-black/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <img src={p.img} className="w-10 h-10 rounded-lg" />
                             <input value={p.name} onChange={(e) => updatePlayer(idx, 'name', e.target.value)} className="bg-transparent text-sm font-black italic outline-none text-white w-24" />
                          </div>
                          <div className="flex gap-2">
                             <button onClick={() => banPlayer(idx)} className={`p-2 rounded-lg transition-all ${p.banned ? 'bg-red-500 text-white' : 'bg-white/5 text-white/20'}`}><Hammer size={16}/></button>
                             <button onClick={() => removePlayer(idx)} className="p-2 bg-white/5 text-white/20 hover:text-red-500"><Trash2 size={16}/></button>
                          </div>
                       </div>
                     ))}
                   </div>
                   <button onClick={injectPlayerNode} className="w-full bg-cyan-500 text-black font-black py-3 rounded-2xl text-[10px] uppercase tracking-widest">ADD_NEW_ENTITY</button>
                </div>

                <button onClick={syncVault} className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black py-6 rounded-[2rem] shadow-xl uppercase tracking-widest flex items-center justify-center gap-4 text-lg">
                  <Save size={24} /> COMMIT_CHANGES
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  function updatePlayer(idx: number, field: string, value: string) {
    const updated = { ...leaderboards };
    updated[activeMode][idx] = { ...updated[activeMode][idx], [field]: value };
    setLeaderboards(updated);
  }

  function removePlayer(idx: number) {
    const updated = { ...leaderboards };
    updated[activeMode].splice(idx, 1);
    setLeaderboards(updated);
  }

  function banPlayer(idx: number) {
    const updated = { ...leaderboards };
    updated[activeMode][idx].banned = !updated[activeMode][idx].banned;
    setLeaderboards(updated);
  }
}

// --- SUB-COMPONENTS (SCALED) ---

function MenuButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 w-full py-4 px-4 rounded-2xl transition-all relative group ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/20 hover:text-white'}`}>
      <div className={`${active ? 'scale-110' : ''}`}>{icon}</div>
      <span className="text-[12px] font-black tracking-widest hidden group-hover:block uppercase">{label}</span>
      {active && <div className="absolute left-0 top-3 bottom-3 w-1 bg-cyan-400 rounded-r-full" />}
    </button>
  );
}

function PodiumCard({ player, rank, onClick }: any) {
  const is1 = rank === 1;
  return (
    <div onClick={onClick} className={`cursor-pointer bg-gradient-to-b ${is1 ? 'from-cyan-500/20 to-transparent border-cyan-500/30' : 'from-white/5 to-transparent border-white/5'} border-2 p-8 rounded-[4rem] text-center relative group hover:-translate-y-2 transition-all duration-700`}>
      {is1 && <Crown className="text-yellow-400 absolute -top-8 left-1/2 -translate-x-1/2 drop-shadow-xl" size={48} />}
      <div className="text-[80px] font-black italic text-white/[0.02] absolute top-4 right-4 pointer-events-none">{rank}</div>
      <img src={player.img} className={`w-32 h-32 rounded-[2.5rem] mx-auto mb-6 border-4 ${is1 ? 'border-cyan-400' : 'border-white/10'} group-hover:scale-105 transition-all`} />
      <h4 className="text-3xl font-black italic uppercase mb-2 tracking-tighter">{player.name}</h4>
      <p className="text-[10px] font-black text-white/20 tracking-widest uppercase mb-6">{player.tag}</p>
      <div className="pt-6 border-t border-white/5 flex justify-around">
        <div><p className="text-[10px] font-black text-white/10 mb-1 uppercase">K/D</p><p className="text-3xl font-black italic text-white">{player.kd}</p></div>
        <div className="h-10 w-px bg-white/5 self-center" />
        <div><p className="text-[10px] font-black text-white/10 mb-1 uppercase">XP</p><p className="text-3xl font-black italic text-cyan-400">{Math.floor(player.xp/1000)}K</p></div>
      </div>
    </div>
  );
}

function PlayerListRow({ player, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-black/30 border border-white/5 p-4 rounded-[2rem] flex items-center justify-between group hover:border-cyan-500/30 transition-all cursor-pointer">
      <div className="flex items-center gap-8">
        <span className="text-4xl font-black italic text-white/5 w-16">{player.rank}</span>
        <img src={player.img} className="w-14 h-14 rounded-2xl border border-white/10 group-hover:border-cyan-400 transition-all" />
        <div className="flex flex-col">
          <h4 className="text-2xl font-black italic uppercase text-white group-hover:text-cyan-400 transition-colors tracking-tighter leading-none">{player.name}</h4>
          <span className="text-[10px] font-black text-white/20 tracking-widest uppercase mt-1">{player.tag}</span>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <p className="text-4xl font-black italic text-white/80">{player.kd}</p>
        <div className={`px-4 py-1 rounded-full text-[10px] font-black border tracking-widest ${player.statType === 'HT1' ? 'text-red-500 border-red-500/20' : 'text-cyan-400 border-cyan-400/20'}`}>
          {player.statType}
        </div>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all"><ArrowUpRight size={18}/></button>
      </div>
    </div>
  );
}

function MarketCard({ rank, i, onBuy }: any) {
  return (
    <div className="bg-black/40 border border-white/10 p-8 rounded-[3rem] text-center group hover:border-cyan-500/30 transition-all">
      <div className="w-20 h-20 bg-cyan-500/5 rounded-3xl mx-auto mb-6 flex items-center justify-center border border-cyan-500/10">
        <ShoppingCart className="text-cyan-400" size={32} />
      </div>
      <h3 className={`text-3xl font-black italic mb-4 uppercase tracking-tighter ${rank.color}`}>{rank.name}</h3>
      <p className="text-[10px] text-white/20 mb-6 leading-relaxed tracking-widest px-4">{rank.description}</p>
      <div className="flex items-center justify-between bg-black/40 p-4 rounded-3xl border border-white/5">
        <div className="text-left"><span className="text-[8px] font-black text-white/20 block uppercase">COST</span><span className="text-xl font-black italic text-white">{rank.cost} {rank.type}</span></div>
        <button onClick={onBuy} className="bg-white text-black text-[10px] font-black px-6 py-2 rounded-full hover:bg-cyan-400 transition-all uppercase tracking-widest">PURCHASE</button>
      </div>
    </div>
  );
}

function GodCommand({ icon, color, bg, title, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer ${bg} p-6 rounded-[2rem] border border-white/5 group hover:scale-[1.02] transition-all`}>
       <div className={`${color} mb-4`}>{icon}</div>
       <h4 className="text-lg font-black italic uppercase tracking-tighter leading-none">{title}</h4>
    </div>
  );
}

function StatRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-6">
       <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400">
          {icon}
       </div>
       <div><p className="text-[10px] font-black text-white/20 tracking-widest uppercase mb-1">{label}</p><p className="text-3xl font-black italic text-white tracking-tighter leading-none">{value}</p></div>
    </div>
  );
}
