"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Search, Crown, Trophy, ChevronRight, Zap, Activity, LayoutDashboard, 
  ShieldCheck, Users, Settings, BarChart3, Swords, Target, Flame, 
  Database, Lock, Unlock, Terminal, Radio, Hash, ShoppingCart, Music, 
  ArrowUpRight, X, ShieldAlert, Star, Edit3, Save, Power, Crosshair, Package,
  Layers, HardDrive, Cpu, ExternalLink, Trash2, UserPlus, RefreshCcw, 
  AlertTriangle, CheckCircle2, Gavel, Globe, ZapOff, Fingerprint, MousePointer2,
  TrendingUp, PlayCircle, Share2, Wallet, Coins, History, Hammer, VolumeX,
  TrendingDown, Rocket, Eye, Link, Copy, Check, MessageSquare, BookOpen, Shield,
  BellRing, Share, Send, Mail, User, AtSign, UserCheck, UserX, Inbox, Sparkles,
  Command, ShieldQuestion, ZapIcon, Filter, CpuChip, Wifi, Disc, Briefcase,
  HistoryIcon, TerminalSquare, AlertCircle, CheckCircle, ChevronDown, ChevronUp,
  Cpu as CpuIcon, Server, Network, ShieldCloseIcon, Key, FileCode, Monitor,
  Trello, GitBranch, Terminal as TerminalIcon, MousePointer, Scan
} from 'lucide-react';

/**
 * ============================================================
 * NORDEN_NEXUS_OS // VERSION 28.0.2 // "ULTIMATE_POLISH"
 * AUTHOR: UTKARSH PANDEY
 * PROTOCOL: OMNI_NEXUS_FULL_SCALE_ENHANCED
 * DESCRIPTION: High-fidelity React dashboard for NordenMC.
 * ============================================================
 */

const PASSKEY = "PVP_PROPLE";
const SERVER_IP = "PLAY.NORDENMC.COM";
const SYSTEM_BUILD = "OMNI_NEXUS_ULTIMATE_V28.0.2";

const MODES = ["OVERALL", "LTMs", "Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace"];

const INITIAL_LEADERBOARDS = {
  OVERALL: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 125000, ip: "192.168.1.1", banned: false, kills: 15400, deaths: 1241, wins: 890, loses: 45 },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 112000, ip: "192.168.1.2", banned: false, kills: 12000, deaths: 1080, wins: 750, loses: 60 },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", statType: "HT1", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 98000, ip: "192.168.1.3", banned: false, kills: 9800, deaths: 1000, wins: 620, loses: 85 },
  ],
};

const INITIAL_CLANS = [
  { id: "CLAN_001", name: "GLACIERZ", leader: "Utkarsh", members: 42, power: "98%", dominance: 45, color: "text-cyan-400", discord: "utkarsh#0001", ign: "Utkarsh", email: "admin@nordenmc.com", userIp: "LOCAL_HOST", requests: [] },
  { id: "CLAN_002", name: "DEMON_SQUAD", leader: "Unknown", members: 28, power: "85%", dominance: 30, color: "text-red-500", discord: "demon#6666", ign: "DemonKing", email: "demon@nordenmc.com", userIp: "REMOTE_LINK", requests: [] },
];

export default function NordenNexusV28() {
  // --- CORE ENGINE STATES ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // --- UI REFINEMENT STATES ---
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [clans, setClans] = useState(INITIAL_CLANS);
  const [leaderboards, setLeaderboards] = useState(INITIAL_LEADERBOARDS);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);

  // --- SYSTEM INITIALIZATION ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    
    const bootTimer = setInterval(() => setUptime(u => u + 1), 1000);
    pushLog("KERNEL: V28.0.2 INITIALIZED. ATTACHING NEURAL_UI_INTERFACE...");
    pushLog("AUTH: UTKARSH_PANDEY IDENTITY VERIFIED.");

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(bootTimer);
    };
  }, []);

  const pushLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 50));
  };

  const filteredStats = useMemo(() => {
    const list = leaderboards[activeMode] || [];
    return list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [leaderboards, activeMode, searchQuery]);

  return (
    <div className={`relative min-h-screen bg-[#010103] text-white font-sans overflow-hidden select-none`}>
      
      {/* 🔮 ADVANCED AMBIENT ENGINE */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.05)_0%,_transparent_70%)]" />
        <motion.div 
          animate={{ x: cursorPos.x - 250, y: cursorPos.y - 250 }}
          transition={{ type: 'spring', damping: 50, stiffness: 200, mass: 0.5 }}
          className="w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none absolute opacity-40"
        />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

      {/* 🚀 OMNI-NAVIGATOR (SIDEBAR) */}
      <aside className="fixed left-0 top-0 bottom-0 w-24 hover:w-80 transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) bg-black/40 backdrop-blur-[100px] border-r border-white/5 z-[200] group shadow-[40px_0_100px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="flex flex-col h-full py-12">
          
          <div className="px-6 mb-20">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 1 }}
              className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer mx-auto"
              onClick={() => setActiveMenu('DASHBOARD')}
            >
              <Zap size={24} className="fill-white" />
            </motion.div>
          </div>

          <nav className="flex-1 space-y-6 px-6">
            <SidebarItem icon={<LayoutDashboard size={22}/>} label="COMMAND_CENTER" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
            <SidebarItem icon={<Swords size={22}/>} label="ALLIANCE_WAR_ROOM" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
            <SidebarItem icon={<ShoppingCart size={22}/>} label="NEXUS_MARKETPLACE" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
            <SidebarItem icon={<Terminal size={22}/>} label="KERNEL_STREAMS" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
            
            <div className="pt-10 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Security</p>
              <SidebarItem icon={<ShieldCheck size={22} className={isAuthorized ? "text-green-400" : "text-red-500"} />} label="GOD_MODE_OVERRIDE" active={activeMenu === 'ADMIN'} onClick={() => setIsAdminOpen(true)} />
            </div>
          </nav>

          <div className="mt-auto px-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
             <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-[2rem] border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                   <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Network Uptime</p>
                   <Activity size={12} className="text-cyan-400 animate-pulse" />
                </div>
                <p className="text-xl font-mono font-bold tracking-tighter">{Math.floor(uptime/60)}m {uptime%60}s</p>
             </div>
          </div>
        </div>
      </aside>

      {/* 🖥️ MAIN VIEWPORT */}
      <div className="ml-24 flex-1 h-screen overflow-y-auto custom-scrollbar relative z-10 selection:bg-cyan-500 selection:text-black">
        
        {/* 🛰️ NEXUS HEADER */}
        <header className="px-16 py-12 flex justify-between items-center sticky top-0 bg-[#010103]/80 backdrop-blur-2xl z-[150] border-b border-white/5">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-baseline gap-4">
               <h1 className="text-6xl font-black italic tracking-tighter bg-gradient-to-r from-white via-white to-cyan-500 bg-clip-text text-transparent">NORDEN<span className="text-cyan-500">MC</span></h1>
               <span className="text-[10px] font-black text-cyan-500/50 bg-cyan-500/5 px-3 py-1 rounded border border-cyan-500/20 uppercase">{SYSTEM_BUILD}</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
               <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.4em]">Node: Utkarsh_Pandey // Global_Stable</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-10">
            <div className="relative group/search">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within/search:text-cyan-400 transition-colors" size={20} />
               <input 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="SCAN_DATABASE_NODES..." 
                  className="bg-white/5 border border-white/10 rounded-full pl-16 pr-8 py-5 text-sm outline-none w-[450px] focus:border-cyan-500/40 focus:bg-white/10 transition-all font-bold placeholder:text-white/5" 
               />
               <div className="absolute inset-0 bg-cyan-500/5 blur-xl rounded-full opacity-0 group-focus-within/search:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black font-black px-12 py-5 rounded-full text-xs uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center gap-4 group/btn"
            >
              <Globe size={16} className="group-hover/btn:rotate-180 transition-transform duration-700" />
              {SERVER_IP}
            </motion.button>
          </div>
        </header>

        <main className="p-16 max-w-[1800px] mx-auto">
          <AnimatePresence mode="wait">
            
            {/* 📊 DASHBOARD ENGINE */}
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="space-y-20">
                
                {/* MODE NAVIGATION */}
                <div className="flex justify-center">
                  <div className="bg-black/60 p-2 rounded-full border border-white/10 flex gap-2 backdrop-blur-3xl shadow-2xl">
                    {MODES.map((mode) => (
                      <button 
                        key={mode} 
                        onClick={() => setActiveMode(mode)} 
                        className={`px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all relative ${activeMode === mode ? 'text-black' : 'text-white/30 hover:text-white'}`}
                      >
                        {activeMode === mode && <motion.div layoutId="modeGlow" className="absolute inset-0 bg-white rounded-full" />}
                        <span className="relative z-10">{mode}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* PODIUM GRID */}
                <div className="grid grid-cols-3 gap-12 pt-10">
                  {filteredStats.slice(0, 3).map((p, i) => (
                    <PodiumCard key={p.name} player={p} rank={i + 1} />
                  ))}
                </div>

                {/* STATS TABLE */}
                <div className="mt-20 space-y-4">
                  <div className="flex px-12 text-[10px] font-black text-white/20 uppercase tracking-[0.5em] pb-4">
                    <span className="w-20">Rank</span>
                    <span className="flex-1">Identity</span>
                    <span className="w-40 text-right">Efficacy (K/D)</span>
                    <span className="w-40 text-right">Status</span>
                  </div>
                  {filteredStats.map((p, i) => (
                    <PlayerRow key={p.name} player={p} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ⚔️ ALLIANCE WAR_ROOM */}
            {activeMenu === 'CLANS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                <div className="bg-gradient-to-br from-white/5 to-transparent p-20 rounded-[4rem] border border-white/10 relative overflow-hidden group">
                   <div className="relative z-10 max-w-2xl">
                      <h2 className="text-8xl font-black italic tracking-tighter leading-none mb-6">WAR_ROOM<br/><span className="text-cyan-500">SYSTEMS</span></h2>
                      <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-sm mb-10">Global recruitment and faction management node. Deploy your alliance and claim the NordenMC territory.</p>
                      <button className="bg-cyan-500 text-black font-black px-12 py-6 rounded-2xl flex items-center gap-6 uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_20px_50px_rgba(6,182,212,0.3)]">
                        <UserPlus size={24}/> Initialize_Faction_Protocol
                      </button>
                   </div>
                   <Swords size={500} className="absolute -right-20 -bottom-20 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-[2000ms]" />
                </div>

                <div className="grid grid-cols-3 gap-10">
                  {clans.map(clan => (
                    <ClanCard key={clan.id} clan={clan} />
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* 🔐 OVERRIDE PANEL (MODAL) */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-[1000] flex justify-end">
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="w-[800px] h-full bg-[#020205] border-l border-white/10 shadow-[-50px_0_100px_rgba(0,0,0,0.9)] p-20 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-20">
                <h2 className="text-5xl font-black italic text-cyan-400 tracking-tighter uppercase flex items-center gap-6"><Gavel size={50}/> God_Mode</h2>
                <button onClick={() => setIsAdminOpen(false)} className="bg-red-500/10 text-red-500 p-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><X size={30}/></button>
              </div>

              <div className="space-y-12">
                <div className="grid grid-cols-2 gap-8">
                  <AdminStat label="CPU_CORE_TEMP" value="38°C" sub="STABLE" />
                  <AdminStat label="NET_LOAD_BAL" value="12.4ms" sub="OPTIMAL" />
                </div>

                <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10">
                  <h4 className="text-xl font-black italic uppercase mb-8 flex items-center gap-4"><Radio size={24} className="text-fuchsia-500" /> Discord_Relay_Sync</h4>
                  <div className="flex gap-4">
                    <input placeholder="WEBHOOK_ENDPOINT_TOKEN..." className="flex-1 bg-black border border-white/10 rounded-2xl px-8 py-4 font-mono text-xs text-fuchsia-400 outline-none focus:border-fuchsia-500/50" />
                    <button className="bg-fuchsia-500 text-white px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest">Connect</button>
                  </div>
                </div>

                <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10">
                  <h4 className="text-xl font-black italic uppercase mb-8 flex items-center gap-4"><Scan size={24} className="text-cyan-400" /> Active_Alliances</h4>
                  <div className="space-y-4">
                    {clans.map(c => (
                      <div key={c.id} className="flex items-center justify-between bg-black/40 p-6 rounded-2xl border border-white/5">
                        <span className="font-black italic uppercase">{c.name}</span>
                        <button className="text-red-500 hover:scale-125 transition-transform"><Trash2 size={20}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- SUB-COMPONENTS (POLISHED) ---

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-8 w-full p-4 rounded-2xl transition-all duration-500 relative group/item ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'scale-110 shadow-[0_0_20px_rgba(6,182,212,0.5)]' : ''}`}>{icon}</div>
      <span className="text-[13px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{label}</span>
      {active && <motion.div layoutId="sidebarLine" className="absolute left-0 top-3 bottom-3 w-1 bg-cyan-500 rounded-r-full" />}
    </button>
  );
}

function PodiumCard({ player, rank }: any) {
  const isGold = rank === 1;
  return (
    <motion.div 
      whileHover={{ y: -15, scale: 1.02 }}
      className={`relative p-12 rounded-[5rem] border-2 text-center overflow-hidden group ${isGold ? 'bg-gradient-to-b from-cyan-500/20 to-transparent border-cyan-500/40 shadow-2xl' : 'bg-white/5 border-white/10'}`}
    >
      <div className="relative z-10">
        <div className="relative w-40 h-40 mx-auto mb-8">
          <img src={player.img} className="w-full h-full rounded-[3rem] border-4 border-white/10 group-hover:border-cyan-400 transition-all duration-700 object-cover" />
          <div className={`absolute -bottom-4 -right-4 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl border-4 border-black ${isGold ? 'bg-yellow-400 text-black' : 'bg-slate-700 text-white'}`}>
            {rank}
          </div>
        </div>
        <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-2">{player.name}</h3>
        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">{player.tag}</p>
        
        <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
          <div><p className="text-[9px] font-black text-white/20 uppercase mb-1">Efficacy</p><p className="text-2xl font-black italic">{player.kd}</p></div>
          <div><p className="text-[9px] font-black text-white/20 uppercase mb-1">XP_CORE</p><p className="text-2xl font-black italic text-cyan-400">{Math.floor(player.xp/1000)}K</p></div>
        </div>
      </div>
    </motion.div>
  );
}

function PlayerRow({ player }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }} 
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.03)' }}
      className="bg-black/40 border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between group transition-all"
    >
      <div className="flex items-center gap-10">
        <span className="text-4xl font-black italic text-white/5 w-16 group-hover:text-cyan-400/20 transition-colors">{player.rank}</span>
        <img src={player.img} className="w-14 h-14 rounded-xl border border-white/10 group-hover:scale-110 transition-transform" />
        <div>
          <h4 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{player.name}</h4>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{player.tag}</p>
        </div>
      </div>
      <div className="flex items-center gap-12">
        <div className="text-right">
          <p className="text-[10px] font-black text-white/10 uppercase mb-1">Efficiency</p>
          <p className="text-3xl font-black italic group-hover:text-white transition-colors text-white/60">{player.kd}</p>
        </div>
        <div className={`w-3 h-3 rounded-full ${player.banned ? 'bg-red-500' : 'bg-green-500 animate-pulse'} shadow-lg`} />
      </div>
    </motion.div>
  );
}

function ClanCard({ clan }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] relative overflow-hidden group hover:border-cyan-500/30 transition-all">
      <div className="flex justify-between items-start mb-8">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-all">
          <Shield size={32} />
        </div>
        <span className="font-mono text-[10px] text-cyan-400 font-bold">{clan.id}</span>
      </div>
      <h3 className={`text-5xl font-black italic tracking-tighter uppercase mb-4 ${clan.color}`}>{clan.name}</h3>
      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-10">Commander: {clan.leader}</p>
      
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
          <p className="text-[9px] font-black text-white/20 uppercase mb-2">Units</p>
          <p className="text-3xl font-black italic">{clan.members}</p>
        </div>
        <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
          <p className="text-[9px] font-black text-white/20 uppercase mb-2">Power</p>
          <p className="text-3xl font-black italic text-cyan-400">{clan.power}</p>
        </div>
      </div>

      <button className="w-full bg-white/5 border border-white/10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 hover:text-black transition-all">Dispatch_Enlistment</button>
    </div>
  );
}

function AdminStat({ label, value, sub }: any) {
  return (
    <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-3">{label}</p>
      <p className="text-4xl font-black italic tracking-tighter mb-2">{value}</p>
      <span className="text-[10px] font-black text-green-500 uppercase">{sub}</span>
    </div>
  );
}
