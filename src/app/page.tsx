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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.15)_0%,_transparent_65%)]"></div>
        <div className="absolute top-[-25%] left-[-15%] w-[130vw] h-[130vw] bg-cyan-950/10 blur-[250px] rounded-full animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-[-15%] right-[-15%] w-[110vw] h-[110vw] bg-fuchsia-950/10 blur-[250px] rounded-full"></div>
      </div>

      {/* 🚀 OMNI-ASTRA SIDEBAR (WIDE) */}
      <aside className="w-40 hover:w-[450px] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-white/5 bg-black/80 backdrop-blur-[100px] flex flex-col items-center py-20 z-[60] group shadow-[50px_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
        
        <div className="mb-28 flex flex-col items-center gap-8 cursor-pointer" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-[3rem] flex items-center justify-center shadow-[0_0_80px_rgba(6,182,212,0.6)] group-hover:rotate-[720deg] transition-all duration-[2000ms]">
            <Zap size={48} className="text-white fill-white" />
          </div>
          <div className="text-center opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">
             <p className="text-[14px] font-black tracking-[1em] text-cyan-400 uppercase">Nexus_Astra_V21</p>
             <p className="text-[10px] font-black text-white/20 mt-2 uppercase tracking-widest">NORDEN_OMNI_OVERLORD_OS</p>
          </div>
        </div>

        <nav className="flex flex-col gap-10 w-full px-12 flex-1">
          <MenuButton icon={<LayoutDashboard />} label="COMMAND_CENTER" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <MenuButton icon={<ShoppingCart />} label="RANK_UPLINK" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <MenuButton icon={<Swords />} label="WAR_ROOM_CLANS" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <MenuButton icon={<PlayCircle />} label="MEDIA_STREAM" active={activeMenu === 'MEDIA'} onClick={() => setActiveMenu('MEDIA')} />
          <MenuButton icon={<Terminal />} label="SYSTEM_LOGS_RULES" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
          
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />
          
          <MenuButton 
            icon={<ShieldCheck className={isAuthorized ? "text-green-400 drop-shadow-[0_0_20px_#4ade80]" : "text-red-500"} />} 
            label="GOD_MODE_ADMIN" 
            onClick={() => setIsAdminOpen(true)} 
          />
        </nav>

        {/* CREDIT MODULE */}
        <div className="mt-auto px-12 w-full opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-10 group-hover:translate-y-0">
           <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-[3.5rem] flex flex-col gap-4 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5 blur-xl"></div>
              <div className="flex items-center justify-between relative z-10">
                 <span className="text-[10px] font-black uppercase text-white/30 tracking-[0.3em]">Personal_Balance</span>
                 <Wallet size={20} className="text-cyan-400" />
              </div>
              <div className="flex items-baseline gap-3 relative z-10">
                 <span className="text-5xl font-black italic text-cyan-400 tracking-tighter">{userXP.toLocaleString()}</span>
                 <span className="text-[12px] font-black text-white/20 uppercase">XP</span>
              </div>
           </div>
        </div>
      </aside>

      {/* 🖥️ MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative z-10">
        
        {/* TITAN HEADER */}
        <header className="px-32 py-20 flex justify-between items-center sticky top-0 bg-[#010103]/90 backdrop-blur-3xl z-40 border-b border-white/10">
          <div className="flex flex-col">
            <h1 className="text-[10rem] font-black italic tracking-tighter uppercase leading-none drop-shadow-[0_0_60px_rgba(255,255,255,0.08)]">
              NORDEN<span className="text-cyan-400 drop-shadow-[0_0_60px_#06b6d4]">MC</span>
            </h1>
            <div className="flex items-center gap-10 mt-6 ml-4">
               <div className="flex items-center gap-3 bg-green-500/10 px-6 py-2 rounded-full border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_20px_#22c55e]"></div>
                  <span className="text-[14px] font-black text-green-500 tracking-[0.5em]">SYSTEM_LIVE</span>
               </div>
               <div className="h-1.5 w-32 bg-white/10 rounded-full" />
               <span className="text-[14px] font-black text-white/20 tracking-[0.8em] uppercase">Tactical_PVP_Network_V21</span>
            </div>
          </div>

          <div className="flex items-center gap-16">
            <div className="relative group">
              <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={28} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SCAN_NEXUS_DATABASE..." 
                className="bg-white/5 border border-white/10 rounded-[3.5rem] pl-24 pr-16 py-8 text-lg font-mono tracking-[0.4em] outline-none focus:border-cyan-500/50 transition-all w-[750px] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" 
              />
            </div>
            <button className="bg-white text-black font-black text-sm px-20 py-8 rounded-[3rem] shadow-[0_50px_100px_rgba(255,255,255,0.15)] hover:scale-110 active:scale-95 transition-all uppercase tracking-[0.6em] border-4 border-cyan-400/20">
              {SERVER_IP}
            </button>
          </div>
        </header>

        <main className="p-32 max-w-[2400px] mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* ⚔️ DASHBOARD VIEW */}
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -100 }} className="space-y-48">
                <div className="bg-black/70 backdrop-blur-3xl p-6 rounded-[4rem] border border-white/10 w-fit mx-auto flex items-center gap-8 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                  {MODES.map((mode) => (
                    <button key={mode} onClick={() => setActiveMode(mode)} className={`relative px-16 py-8 rounded-[2rem] text-[15px] font-black tracking-widest uppercase transition-all duration-700 ${activeMode === mode ? 'text-black shadow-2xl' : 'text-white/30 hover:text-white'}`}>
                      {activeMode === mode && <motion.div layoutId="modeGlow" className="absolute inset-0 bg-white rounded-[2rem] shadow-[0_0_60px_rgba(255,255,255,0.5)]" />}
                      <span className="relative z-10">{mode}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-24">
                  {filteredLeaderboard.slice(0, 3).map((p, i) => (
                    <PodiumCard key={p.name} player={p} rank={i+1} onClick={() => setSelectedPlayer(p)} />
                  ))}
                </div>

                <div className="space-y-16 pt-32 border-t border-white/10">
                  <div className="flex items-center justify-between px-20 mb-10">
                     <div className="flex items-center gap-10">
                        <TrendingUp className="text-cyan-400" size={48} />
                        <h3 className="text-7xl font-black italic tracking-tighter text-white/40 uppercase">Entity_Stream // {activeMode}</h3>
                     </div>
                  </div>
                  <div className="grid gap-14">
                    {filteredLeaderboard.map((p, i) => (
                      <PlayerListRow key={p.name} player={p} onClick={() => setSelectedPlayer(p)} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 🛒 MARKET VIEW */}
            {activeMenu === 'MARKET' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-24 pt-10">
                {globalRanks.map((rank, i) => (
                  <MarketCard key={rank.id} rank={rank} i={i} onBuy={() => purchaseRank(rank)} />
                ))}
              </motion.div>
            )}

            {/* 🛡️ WAR ROOM (CLANS) */}
            {activeMenu === 'CLANS' && (
              <motion.div initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} className="space-y-24">
                 <div className="flex flex-col items-center mb-32">
                    <div className="relative mb-12">
                       <Swords size={120} className="text-fuchsia-500 relative z-10 drop-shadow-[0_0_40px_rgba(217,70,239,0.5)]" />
                       <div className="absolute inset-0 bg-fuchsia-500/20 blur-[100px] animate-pulse"></div>
                    </div>
                    <h2 className="text-9xl font-black italic uppercase tracking-tighter">NORDEN_WAR_ROOM</h2>
                    <p className="text-[16px] font-black text-white/20 tracking-[1.5em] uppercase mt-6">Faction_Territory_Control</p>
                 </div>
                 <div className="grid gap-16">
                    {clans.map((clan, i) => (
                      <div key={i} className="bg-black/50 border-4 border-white/5 p-20 rounded-[5rem] flex items-center justify-between group hover:border-fuchsia-500/40 hover:bg-white/[0.02] transition-all duration-[1000ms] shadow-2xl relative overflow-hidden">
                         <div className="flex items-center gap-24 relative z-10">
                            <span className="text-[12rem] font-black italic text-white/[0.02] absolute -left-10 -top-20 pointer-events-none">#0{i+1}</span>
                            <div className="flex flex-col relative z-20">
                               <h3 className={`text-8xl font-black italic uppercase ${clan.color} tracking-tighter leading-none mb-4 group-hover:translate-x-4 transition-transform`}>{clan.name}</h3>
                               <p className="text-[14px] font-black text-white/20 tracking-[0.8em] uppercase ml-1">LEADER: {clan.leader}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-32 relative z-10">
                            <div className="text-center">
                               <p className="text-[12px] font-black text-white/20 mb-3 uppercase tracking-widest">MEMBERS</p>
                               <p className="text-6xl font-black italic text-white">{clan.members}</p>
                            </div>
                            <div className="text-center">
                               <p className="text-[12px] font-black text-white/20 mb-3 uppercase tracking-widest">DOMINANCE</p>
                               <div className="flex items-center gap-4">
                                  <div className="w-48 h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                                     <motion.div initial={{ width: 0 }} animate={{ width: `${clan.dominance}%` }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-fuchsia-500 shadow-[0_0_20px_#d946ef]" />
                                  </div>
                                  <p className="text-6xl font-black italic text-fuchsia-500">{clan.power}</p>
                               </div>
                            </div>
                            <button className="bg-white/5 border-2 border-white/10 px-16 py-8 rounded-[2.5rem] hover:bg-white hover:text-black font-black uppercase tracking-[0.3em] text-[14px] transition-all shadow-xl">JOIN_FACTION</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {/* 🎥 MEDIA HUB */}
            {activeMenu === 'MEDIA' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-24">
                  {media.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                       <div className="relative aspect-video rounded-[4rem] overflow-hidden mb-12 border-4 border-white/5 group-hover:border-cyan-500/50 transition-all duration-1000 shadow-2xl">
                          <img src={item.thumb} className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-transform duration-[1500ms]" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                             <div className="p-12 bg-white rounded-full text-black shadow-[0_0_100px_rgba(255,255,255,0.8)] animate-pulse">
                                <PlayCircle size={100} fill="currentColor" />
                             </div>
                          </div>
                          <div className="absolute bottom-10 right-10 bg-black/90 px-8 py-4 rounded-2xl text-[14px] font-black tracking-[0.5em] border border-white/10">03:42</div>
                       </div>
                       <h4 className="text-4xl font-black italic uppercase mb-4 group-hover:text-cyan-400 transition-colors tracking-tighter leading-none">{item.title}</h4>
                       <div className="flex items-center justify-between text-white/30 text-[12px] font-black uppercase tracking-[0.8em] px-4">
                          <span>{item.author}</span>
                          <span className="flex items-center gap-4"><Eye size={16}/> {item.views} VIEWS</span>
                       </div>
                    </div>
                  ))}
               </motion.div>
            )}

            {/* 📂 LOGS & RULEBOOK VIEW */}
            {activeMenu === 'LOGS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 2xl:grid-cols-2 gap-24">
                 {/* KERNEL LOGS */}
                 <div className="bg-black/70 border-4 border-white/10 rounded-[6rem] p-24 font-mono shadow-[0_0_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
                    <div className="flex items-center justify-between mb-20 border-b border-white/10 pb-12">
                       <div className="flex items-center gap-8">
                          <Terminal className="text-cyan-400" size={48} />
                          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-cyan-400">KERNEL_V21_STREAM</h2>
                       </div>
                       <div className="flex gap-6">
                          <div className="w-5 h-5 rounded-full bg-red-500 shadow-[0_0_20px_#ef4444]"></div>
                          <div className="w-5 h-5 rounded-full bg-yellow-500 shadow-[0_0_20px_#eab308]"></div>
                          <div className="w-5 h-5 rounded-full bg-green-500 shadow-[0_0_20px_#22c55e]"></div>
                       </div>
                    </div>
                    <div className="space-y-8 h-[800px] overflow-y-auto custom-scrollbar pr-12">
                       {logs.map((log, i) => (
                         <div key={i} className="flex gap-16 text-[15px] group hover:bg-white/[0.03] p-6 rounded-3xl transition-all border border-transparent hover:border-white/5">
                           <span className="text-white/10 font-black">NODE_{10000 + i}</span>
                           <span className="text-white/30 whitespace-nowrap">[{new Date().toLocaleTimeString()}]</span>
                           <span className="text-cyan-500/60 group-hover:text-cyan-400 transition-colors leading-relaxed uppercase">{log}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* LIVE RULEBOOK */}
                 <div className="bg-gradient-to-br from-white/[0.03] to-transparent border-4 border-white/10 rounded-[6rem] p-24 shadow-2xl backdrop-blur-2xl">
                    <div className="flex items-center gap-10 mb-20 border-b border-white/10 pb-12">
                       <BookOpen className="text-fuchsia-400" size={48} />
                       <h2 className="text-5xl font-black italic uppercase tracking-tighter">OMNI_POLICY_ENGINE</h2>
                    </div>
                    <div className="space-y-12">
                       {rules.map((rule, i) => (
                         <div key={i} className="bg-black/60 p-10 rounded-[3rem] border-2 border-white/5 flex items-center gap-10 group hover:border-fuchsia-500/40 transition-all">
                            <div className="w-16 h-16 bg-fuchsia-500/10 flex items-center justify-center rounded-2xl text-fuchsia-400 font-black text-2xl group-hover:bg-fuchsia-500 group-hover:text-black transition-all">
                               {i + 1}
                            </div>
                            <p className="text-2xl font-black italic uppercase tracking-tighter text-white/80 group-hover:text-white transition-colors">{rule}</p>
                         </div>
                       ))}
                    </div>
                    <div className="mt-24 p-12 bg-fuchsia-500/5 border-2 border-dashed border-fuchsia-500/20 rounded-[4rem] text-center">
                       <Shield size={64} className="text-fuchsia-500/20 mx-auto mb-6" />
                       <p className="text-[14px] font-black text-white/20 tracking-[1em] uppercase">Authorized_Policies_Only</p>
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* 👤 NEURAL LINK MODAL (PLAYER STATS) */}
      <AnimatePresence>
        {selectedPlayer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-16 bg-[#010103]/98 backdrop-blur-[50px]">
            <motion.div initial={{ scale: 0.7, opacity: 0, rotateY: 90 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }} exit={{ scale: 0.7, opacity: 0 }} className="bg-black border-4 border-white/10 w-full max-w-7xl rounded-[8rem] p-32 relative overflow-hidden shadow-[0_0_200px_rgba(0,0,0,1)]">
              <button onClick={() => setSelectedPlayer(null)} className="absolute top-20 right-20 text-white/10 hover:text-white transition-colors">
                <X size={64} />
              </button>
              
              <div className="grid grid-cols-2 gap-48">
                <div className="flex flex-col items-center">
                  <div className="relative mb-20 group">
                    <div className="absolute inset-0 bg-cyan-500/40 blur-[120px] rounded-full group-hover:bg-cyan-500/70 transition-all duration-[2000ms]"></div>
                    <img src={selectedPlayer.img} className="w-[450px] h-[450px] rounded-[7rem] border-8 border-cyan-400 relative z-10 shadow-2xl group-hover:rotate-12 transition-transform duration-[1200ms]" />
                  </div>
                  <h2 className="text-[9rem] font-black italic uppercase text-center mb-8 tracking-tighter leading-none drop-shadow-2xl">{selectedPlayer.name}</h2>
                  <span className="bg-cyan-500/15 border-2 border-cyan-500/40 px-16 py-6 rounded-[2.5rem] text-2xl font-black text-cyan-400 tracking-[1em] uppercase drop-shadow-xl shadow-[0_0_50px_rgba(6,182,212,0.3)]">{selectedPlayer.tag}</span>
                </div>

                <div className="space-y-20 py-16">
                  <StatRow icon={<Target />} label="KILL_DEATH_RATIO" value={selectedPlayer.kd} />
                  <StatRow icon={<Flame />} label="TOTAL_XP_LOAD" value={selectedPlayer.xp.toLocaleString()} />
                  <StatRow icon={<Fingerprint />} label="NETWORK_IDENTITY_NODE" value={selectedPlayer.ip} />
                  
                  <div className="pt-24 border-t border-white/10 flex gap-10">
                     <button 
                        onClick={() => handleChallenge(selectedPlayer)}
                        className="flex-1 bg-white text-black font-black py-10 rounded-[3.5rem] uppercase tracking-[0.5em] text-2xl hover:bg-cyan-400 hover:shadow-[0_40px_100px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-8 group"
                     >
                        <Swords size={48} className="group-hover:rotate-180 transition-transform duration-700" /> INITIATE_DUEL
                     </button>
                     <button 
                        onClick={() => handleShare(selectedPlayer)}
                        className="w-32 h-32 bg-white/5 border-2 border-white/10 flex items-center justify-center rounded-[3.5rem] hover:bg-white hover:text-black transition-all group shadow-2xl"
                     >
                        {isCopied ? <Check size={48} className="text-green-500" /> : <Share2 size={48} className="group-hover:scale-125 transition-transform duration-700" />}
                     </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔐 OMNI-GOD OVERRIDE (ADMIN PANEL) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 1500 }} animate={{ x: 0 }} exit={{ x: 1500 }} transition={{ type: "spring", damping: 50, stiffness: 250 }} className="fixed right-0 top-0 h-full w-[1200px] bg-[#020206] border-l-4 border-white/10 z-[100] p-32 shadow-[-150px_0_300px_rgba(0,0,0,0.98)] backdrop-blur-[150px] overflow-y-auto custom-scrollbar">
            
            <div className="flex justify-between items-center mb-32 sticky top-0 bg-[#020206]/98 py-16 z-30 border-b-2 border-white/10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-10 text-cyan-400">
                  <Gavel size={72} className="drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]" />
                  <h2 className="text-7xl font-black italic tracking-tighter uppercase">GOD_MODE_KERNEL</h2>
                </div>
                <p className="text-[18px] font-black text-white/20 tracking-[1em] ml-28 uppercase">Astra_Omni_Superuser_Access</p>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="bg-red-500/10 border-2 border-red-500/20 text-red-500 px-16 py-8 rounded-[3rem] font-black text-[18px] uppercase hover:bg-red-500 hover:text-white transition-all shadow-2xl">DISCONNECT_TERMINAL</button>
            </div>

            {!isAuthorized ? (
              <div className="flex flex-col items-center justify-center py-72">
                <Lock size={150} className="text-white/10 mb-20 animate-pulse" />
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (passwordInput === PASSKEY ? setIsAuthorized(true) : alert("DECRYPTION_CRITICAL_FAILURE"))}
                  placeholder="DECRYPT_GOD_KEY..." 
                  className="bg-white/5 border-4 border-white/10 w-full max-w-4xl p-16 rounded-[5rem] text-center text-6xl tracking-[1em] font-mono outline-none focus:border-cyan-500 transition-all mb-16 shadow-inner" 
                />
                <button onClick={() => passwordInput === PASSKEY ? setIsAuthorized(true) : alert("ACCESS_REJECTED")} className="w-full max-w-4xl bg-white text-black font-black py-12 rounded-[4rem] text-3xl uppercase tracking-[0.8em] hover:bg-cyan-500 transition-all shadow-[0_50px_100px_rgba(255,255,255,0.2)]">INJECT_NEURAL_LINK</button>
              </div>
            ) : (
              <div className="space-y-40 pb-72">
                
                {/* GOD HUB */}
                <div className="grid grid-cols-2 gap-16">
                   <GodCommand icon={<TrendingUp />} color="text-cyan-400" bg="bg-cyan-500/5" border="border-cyan-500/30" title="ECONOMY_BOOST" desc="Hyper-inflate player XP nodes by 200% across all matrices." onClick={economyInflation} />
                   <GodCommand icon={<Power />} color={maintenanceMode ? "text-green-500" : "text-yellow-500"} bg="bg-yellow-500/5" border="border-yellow-500/30" title="MAINTENANCE_LOCK" desc="Force system-wide grayscale and interaction lock for patching." onClick={toggleMaintenance} />
                   <GodCommand icon={<ShieldAlert />} color="text-red-500" bg="bg-red-500/5" border="border-red-500/30" title="THREAT_LEVEL_5" desc="Simulate immediate network attack to test auto-healing nodes." onClick={() => pushLog("THREAT: LEVEL_5_SIMULATION_ACTIVE")} />
                   <GodCommand icon={<Rocket />} color="text-indigo-400" bg="bg-indigo-500/5" border="border-indigo-500/30" title="TPS_OPTIMIZE" desc="Purge idle entities and reset chunk buffers for 20.0 TPS lock." onClick={() => pushLog("KERNEL: TPS_STABILIZED_AT_20.0")} />
                </div>

                {/* RULEBOOK EDITOR ENGINE */}
                <div className="bg-fuchsia-500/5 p-20 rounded-[7rem] border-4 border-fuchsia-500/10 shadow-2xl relative overflow-hidden">
                   <div className="flex items-center gap-10 mb-20 relative z-10">
                      <BookOpen className="text-fuchsia-400" size={48} />
                      <h4 className="text-4xl font-black italic uppercase tracking-tighter">RULEBOOK_ENGINE_OVERRIDE</h4>
                   </div>
                   <div className="space-y-8 mb-20 relative z-10">
                      {rules.map((rule, idx) => (
                        <div key={idx} className="bg-black/90 p-8 rounded-[3rem] border-2 border-white/5 flex items-center justify-between group">
                           <p className="text-xl font-black italic text-white/70 group-hover:text-fuchsia-400 transition-colors uppercase">{rule}</p>
                           <button onClick={() => removeRule(idx)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={24}/></button>
                        </div>
                      ))}
                   </div>
                   <div className="flex gap-8 relative z-10">
                      <input value={newRule} onChange={(e) => setNewRule(e.target.value)} placeholder="ENTER_NEW_NETWORK_POLICY..." className="flex-1 bg-black/60 border-2 border-white/10 p-10 rounded-[2.5rem] font-black uppercase text-sm tracking-widest outline-none focus:border-fuchsia-500 transition-all" />
                      <button onClick={addRule} className="px-16 bg-fuchsia-500 text-black font-black rounded-[2.5rem] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">INJECT_RULE</button>
                   </div>
                </div>

                {/* ENTITY LIST CONTROLLER */}
                <div className="bg-white/5 p-20 rounded-[7rem] border-4 border-white/10 shadow-2xl">
                   <div className="flex items-center gap-10 mb-24">
                      <Edit3 className="text-cyan-400" size={48} />
                      <h4 className="text-4xl font-black italic uppercase tracking-tighter">ENTITY_MATRIX_CONTROLLER</h4>
                   </div>

                   <div className="space-y-16 mb-24">
                     {leaderboards[activeMode]?.map((p, idx) => (
                       <div key={idx} className="bg-black/95 p-16 rounded-[5rem] border-2 border-white/5 shadow-2xl relative overflow-hidden">
                          <div className="flex items-center justify-between mb-12 border-b-2 border-white/5 pb-10">
                             <div className="flex items-center gap-10">
                                <img src={p.img} className="w-24 h-24 rounded-3xl border-2 border-cyan-400/50 shadow-2xl" />
                                <input value={p.name} onChange={(e) => updatePlayer(idx, 'name', e.target.value)} className="bg-transparent text-[4rem] font-black italic outline-none text-white focus:text-cyan-400 transition-colors tracking-tighter" />
                             </div>
                             <div className="flex gap-6">
                                <button onClick={() => banPlayer(idx)} className={`p-8 rounded-[2rem] border-2 transition-all ${p.banned ? 'bg-red-500 text-white shadow-[0_0_50px_#ef4444]' : 'bg-white/5 text-white/20 border-white/10 hover:border-red-500 hover:text-red-500'}`}><Hammer size={32}/></button>
                                <button onClick={() => removePlayer(idx)} className="p-8 rounded-[2rem] bg-white/5 text-white/20 border-2 border-white/10 hover:bg-red-500 hover:text-white transition-all"><X size={32}/></button>
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-12">
                             <div>
                                <label className="text-[14px] font-black text-white/20 uppercase tracking-[0.6em] mb-6 block">K/D_VALUE_FLOAT</label>
                                <input value={p.kd} onChange={(e) => updatePlayer(idx, 'kd', e.target.value)} className="w-full bg-white/5 border-2 border-white/10 p-8 rounded-[3rem] font-mono text-cyan-400 text-3xl outline-none focus:border-cyan-500" />
                             </div>
                             <div>
                                <label className="text-[14px] font-black text-white/20 uppercase tracking-[0.6em] mb-6 block">TAG_IDENTIFIER_UUID</label>
                                <input value={p.tag} onChange={(e) => updatePlayer(idx, 'tag', e.target.value)} className="w-full bg-white/5 border-2 border-white/10 p-8 rounded-[3rem] font-black uppercase text-xl outline-none focus:border-cyan-400" />
                             </div>
                          </div>
                       </div>
                     ))}
                   </div>

                   {/* MANUAL DATA INJECTION */}
                   <div className="bg-cyan-500/5 border-4 border-dashed border-cyan-500/20 p-20 rounded-[6rem] space-y-12 shadow-inner">
                      <div className="text-center space-y-4">
                        <h5 className="text-3xl font-black text-cyan-400 tracking-[1em] uppercase">Infect_Neural_Entity</h5>
                        <p className="text-[14px] text-white/20 uppercase font-black tracking-widest leading-relaxed px-20">Generate and deploy a custom entity node into the {activeMode} stream with full-spectrum data persistence.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <input placeholder="Username..." value={newPlayer.name} onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})} className="bg-black/80 border-2 border-white/10 p-10 rounded-[3rem] text-xl outline-none focus:border-cyan-500" />
                        <input placeholder="K/D Ratio..." value={newPlayer.kd} onChange={(e) => setNewPlayer({...newPlayer, kd: e.target.value})} className="bg-black/80 border-2 border-white/10 p-10 rounded-[3rem] text-xl outline-none focus:border-cyan-500" />
                      </div>
                      <input placeholder="Identifier Tag (e.g. LEGENDARY_OVERLORD)" value={newPlayer.tag} onChange={(e) => setNewPlayer({...newPlayer, tag: e.target.value})} className="w-full bg-black/80 border-2 border-white/10 p-10 rounded-[3rem] text-xl outline-none focus:border-cyan-500" />
                      <button onClick={injectPlayerNode} className="w-full bg-cyan-500 text-black font-black py-12 rounded-[4rem] text-2xl uppercase tracking-[1em] hover:bg-white hover:shadow-[0_40px_100px_rgba(6,182,212,0.8)] transition-all">EXECUTE_DEPLOYMENT_V21</button>
                   </div>
                </div>

                <button onClick={syncVault} className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black py-16 rounded-[5rem] shadow-[0_80px_150px_rgba(6,182,212,0.6)] hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-[1.5em] flex items-center justify-center gap-12 text-4xl group border-4 border-white/20">
                  <Save size={64} className="group-hover:animate-spin" /> COMMIT_GOD_VAULT
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
    pushLog(`ADMIN: REMOVED_PLAYER_FROM_${activeMode}`);
  }

  function banPlayer(idx: number) {
    const updated = { ...leaderboards };
    const p = updated[activeMode][idx];
    p.banned = !p.banned;
    setLeaderboards(updated);
    pushLog(`SECURITY: IP_BAN_${p.banned ? 'ACTIVE' : 'LIFTED'} FOR ${p.name}`);
  }
}

// --- TITAN SUB-COMPONENTS ---

function MenuButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-14 w-full py-10 px-12 rounded-[4rem] transition-all relative group ${active ? 'bg-cyan-500/20 text-cyan-400 shadow-[inset_0_0_60px_rgba(6,182,212,0.15)]' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'scale-[1.4] drop-shadow-[0_0_30px_#06b6d4]' : 'group-hover:scale-125'} transition-transform duration-1000`}>{icon}</div>
      <span className="text-[20px] font-black tracking-[0.5em] hidden group-hover:block whitespace-nowrap uppercase translate-x-4 group-hover:translate-x-0 transition-all duration-700">{label}</span>
      {active && <motion.div layoutId="sideInd" className="absolute left-0 top-10 bottom-10 w-3 bg-cyan-400 rounded-r-full shadow-[20px_0_50px_#06b6d4]" />}
    </button>
  );
}

function PodiumCard({ player, rank, onClick }: any) {
  const is1 = rank === 1;
  return (
    <div onClick={onClick} className={`cursor-pointer bg-gradient-to-b ${is1 ? 'from-cyan-500/30 via-cyan-500/5 to-transparent border-cyan-500/50 shadow-[0_100px_200px_-50px_rgba(6,182,212,0.5)]' : 'from-white/5 to-transparent border-white/10 shadow-2xl'} border-4 p-32 rounded-[9rem] text-center relative group hover:-translate-y-12 hover:scale-105 transition-all duration-[1200ms]`}>
      {is1 && <Crown className="text-yellow-400 absolute -top-24 left-1/2 -translate-x-1/2 drop-shadow-[0_0_60px_#facc15] animate-bounce" size={140} />}
      <div className="text-[250px] font-black italic text-white/[0.03] absolute top-16 right-16 select-none pointer-events-none group-hover:text-cyan-500/10 transition-colors">{rank}</div>
      <img src={player.img} className={`w-80 h-80 rounded-[8rem] mx-auto mb-20 border-8 ${is1 ? 'border-cyan-400 shadow-[0_0_80px_rgba(6,182,212,0.6)]' : 'border-white/10'} group-hover:scale-110 group-hover:rotate-12 transition-all duration-[1000ms] shadow-2xl`} />
      <h4 className="text-8xl font-black italic uppercase mb-6 tracking-tighter group-hover:text-cyan-400 transition-colors drop-shadow-2xl leading-none">{player.name}</h4>
      <p className="text-[18px] font-black text-white/30 tracking-[1em] uppercase mb-20">{player.tag}</p>
      <div className="pt-24 border-t-2 border-white/5 flex justify-around">
        <div><p className="text-[15px] font-black text-white/20 mb-3 uppercase tracking-widest">K_D</p><p className="text-7xl font-black italic text-white drop-shadow-lg">{player.kd}</p></div>
        <div className="h-24 w-px bg-white/10 self-center" />
        <div><p className="text-[15px] font-black text-white/20 mb-3 uppercase tracking-widest">XP</p><p className="text-7xl font-black italic text-cyan-400 drop-shadow-[0_0_20px_#06b6d4]">{player.xp.toLocaleString()}</p></div>
      </div>
    </div>
  );
}

function PlayerListRow({ player, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-black/60 border-4 border-white/5 p-20 rounded-[7rem] flex items-center justify-between group hover:border-cyan-500/50 hover:bg-white/[0.05] transition-all duration-[1200ms] shadow-3xl relative overflow-hidden cursor-pointer">
      <div className="flex items-center gap-28 relative z-10">
        <span className="text-[14rem] font-black italic text-white/[0.05] w-48 group-hover:text-cyan-500/20 transition-all duration-1000">{player.rank}</span>
        <img src={player.img} className="w-40 h-40 rounded-[4.5rem] border-4 border-white/10 group-hover:border-cyan-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-[1000ms] shadow-2xl" />
        <div className="flex flex-col">
          <h4 className="text-9xl font-black italic uppercase text-white group-hover:text-cyan-300 transition-colors tracking-tighter mb-4 leading-none group-hover:translate-x-4 duration-700">{player.name}</h4>
          <div className="flex gap-10 items-center">
             <span className="text-[18px] font-black text-white/20 tracking-[1em] uppercase">{player.tag}</span>
             {player.banned && <span className="bg-red-500/10 text-red-500 text-[14px] font-black px-8 py-3 rounded-full border-2 border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.3)] animate-pulse">RESTRICTED_NODE_V21</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-32 relative z-10">
        <div className="text-right">
          <p className="text-[14px] font-black text-white/20 mb-3 uppercase tracking-widest">NET_STAT_INDEX</p>
          <p className="text-8xl font-black italic text-white group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-1000">{player.kd}</p>
        </div>
        <div className={`w-56 py-10 rounded-[3rem] text-center text-[18px] font-black border-4 tracking-[0.5em] transition-all shadow-2xl ${player.statType === 'HT1' ? 'text-red-500 border-red-500/20 bg-red-500/5 group-hover:bg-red-500 group-hover:text-white' : 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5 group-hover:bg-cyan-400 group-hover:text-black'}`}>
          {player.statType}
        </div>
        <button className="w-32 h-32 rounded-[4.5rem] bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all group-hover:rotate-[225deg] border-4 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] duration-[1500ms]"><ArrowUpRight size={56}/></button>
      </div>
    </div>
  );
}

function MarketCard({ rank, i, onBuy }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="bg-black/70 border-4 border-white/10 p-32 rounded-[9rem] text-center group hover:border-cyan-500/50 hover:bg-black transition-all duration-[1200ms] shadow-3xl relative overflow-hidden">
      <div className="w-48 h-48 bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 rounded-[5rem] mx-auto mb-20 flex items-center justify-center border-2 border-cyan-500/40 group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-[1500ms] shadow-2xl">
        <ShoppingCart className="text-cyan-400" size={80} />
      </div>
      <h3 className={`text-7xl font-black italic mb-12 uppercase tracking-tighter drop-shadow-2xl ${rank.color}`}>{rank.name}</h3>
      <p className="text-[18px] font-medium text-white/30 mb-24 leading-relaxed tracking-widest h-28 px-8">{rank.description}</p>
      <div className="flex items-center justify-between bg-black p-16 rounded-[5rem] border-2 border-white/5 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]">
        <div className="text-left"><span className="text-[14px] font-black text-white/20 block mb-2 uppercase tracking-widest">REQUIRED_LOAD</span><span className="text-5xl font-black italic text-white/80">{rank.cost} {rank.type}</span></div>
        <button onClick={onBuy} className="bg-white text-black text-[16px] font-black px-16 py-8 rounded-[2.5rem] hover:bg-cyan-400 hover:shadow-[0_0_80px_rgba(6,182,212,0.6)] transition-all uppercase tracking-widest border-4 border-transparent hover:border-white shadow-2xl">BUY_NOW</button>
      </div>
    </motion.div>
  );
}

function GodCommand({ icon, color, bg, border, title, desc, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer ${bg} ${border} border-4 p-16 rounded-[6rem] group hover:scale-[1.05] hover:rotate-2 transition-all duration-[800ms] shadow-2xl`}>
       <div className={`${color} mb-10 transition-transform group-hover:scale-[1.5] group-hover:drop-shadow-[0_0_20px_currentColor] duration-[1000ms]`}>{React.cloneElement(icon, { size: 64 })}</div>
       <h4 className="text-4xl font-black italic mb-4 uppercase tracking-tighter leading-none">{title}</h4>
       <p className="text-[14px] text-white/30 font-black uppercase tracking-widest leading-relaxed">{desc}</p>
    </div>
  );
}

function StatRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-14 group">
       <div className="w-28 h-28 rounded-[3rem] bg-white/5 border-4 border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-700 shadow-2xl group-hover:rotate-[360deg]">
          {React.cloneElement(icon, { size: 48 })}
       </div>
       <div><p className="text-[16px] font-black text-white/20 tracking-[1em] mb-3 uppercase">{label}</p><p className="text-7xl font-black italic text-white tracking-tighter leading-none drop-shadow-xl">{value}</p></div>
    </div>
  );
}
