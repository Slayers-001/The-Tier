"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
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
  Trello, GitBranch, Terminal as TerminalIcon, MousePointer, Scan, HardDriveDownload,
  CreditCard, Gift, Box, Binary, Earth, Ghost, Wind, Droplets, Map, Compass,
  Book, ScrollText, PenTool, PieChart, LineChart, Table, Layout, Sidebar,
  Maximize2, Minimize2, Move, Navigation, RefreshCw, Smartphone, Tablet, Watch,
  Cpu as Cpu2, HardDrive as Disk, Activity as Pulse, Zap as Energy, Globe as Web,
  ShieldAlert as Alert, UserMinus, Ban, Timer, Cloud, Edit,
  Dna, Microscope, FlaskConical, Atom, Binary as DataBits
} from 'lucide-react';

/**
 * ============================================================
 * NORDEN_NEXUS_OS // VERSION 30.0.0 // "OMNIPOTENT_BUILD"
 * AUTHOR: UTKARSH PANDEY // REAPEROF_DEATH
 * STATUS: MAX_CAPACITY // ALL_SYSTEMS_FUNCTIONAL
 * CORE_PROTOCOL: HYPER_DENSE_V4_DYNAMIC
 * ============================================================
 */

const PASSKEY = "PVP_PROPLE";
const SERVER_IP = "PLAY.NORDENMC.COM";
const SYSTEM_BUILD = "OMNI_NEXUS_REAPER_V30.0.0";
const MOCK_USER_IP = "192.168.1.100"; // Simulated normal user IP

const MODES = ["OVERALL", "LTMs", "Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace", "Crystal", "Boxing", "Bridge", "Parkour", "BedWars", "SkyWars"];

const SYSTEM_ALERTS = [
  { id: 1, type: "CRITICAL", msg: "Unauthorized login attempt from 192.168.1.1", time: "2m ago" },
  { id: 2, type: "INFO", msg: "Backup of Norden_World_Alpha completed.", time: "15m ago" },
  { id: 3, type: "WARN", msg: "High latency detected in Asian region nodes.", time: "45m ago" },
  { id: 4, type: "SUCCESS", msg: "Nexus_Firewall successfully repelled DDoS burst.", time: "1h ago" }
];

// INITIAL STATIC DATA (Used to seed dynamic state)
const INITIAL_LEADERBOARDS: Record<string, any[]> = {
  OVERALL: [
    { id: "P1", rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 1250000, kills: 15400, deaths: 1241, wins: 890, loses: 45, clan: "GLACIERZ", status: "ONLINE", power: 9800, threatLevel: "OMEGA" },
    { id: "P2", rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 1120000, kills: 12000, deaths: 1080, wins: 750, loses: 60, clan: "GLACIERZ", status: "ONLINE", power: 8500, threatLevel: "ALPHA" },
    { id: "P3", rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", statType: "HT1", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 980000, kills: 9800, deaths: 1000, wins: 620, loses: 85, clan: "DEMON_SQUAD", status: "OFFLINE", power: 7200, threatLevel: "BETA" },
    { id: "P4", rank: "04", name: "DREAM_SLAYER", tag: "DIAMOND #4", statType: "HT2", kd: "8.5", img: "https://mc-heads.net/avatar/Dream/100", xp: 850000, kills: 8500, deaths: 1000, wins: 500, loses: 120, clan: "NONE", status: "AWAY", power: 6500, threatLevel: "GAMMA" },
    { id: "P5", rank: "05", name: "TECHNO_FAN", tag: "PLATINUM #5", statType: "HT2", kd: "7.2", img: "https://mc-heads.net/avatar/Technoblade/100", xp: 720000, kills: 7200, deaths: 1000, wins: 410, loses: 150, clan: "DEMON_SQUAD", status: "ONLINE", power: 5800, threatLevel: "DELTA" },
  ]
};

const INITIAL_CLANS = [
  { id: "C1", name: "GLACIERZ", leader: "Utkarsh", members: 42, power: "98%", trophies: 12500, dominance: "RANK_1", color: "text-cyan-400", userIp: "192.168.1.1", level: 50 },
  { id: "C2", name: "DEMON_SQUAD", leader: "Shivam", members: 28, power: "85%", trophies: 8400, dominance: "RANK_2", color: "text-red-500", userIp: "192.168.1.2", level: 35 },
  { id: "C3", name: "VOID_WALKERS", leader: "Shadow", members: 15, power: "70%", trophies: 4200, dominance: "RANK_3", color: "text-purple-500", userIp: "192.168.1.3", level: 20 }
];

const VAULT_ITEMS = [
  { id: "V1", name: "Void_Catalyst", level: 99, value: "50M", category: "Artifact" },
  { id: "V2", name: "Nexus_Edge", level: 75, value: "12M", category: "Weapon" },
  { id: "V3", name: "Chrono_Shield", level: 88, value: "25M", category: "Armor" },
  { id: "V4", name: "Glacier_Heart", level: 100, value: "Locked", category: "Legendary" }
];

// Dynamic Seed Mode Generator
MODES.forEach(m => { 
  if(!INITIAL_LEADERBOARDS[m]) {
    INITIAL_LEADERBOARDS[m] = [...INITIAL_LEADERBOARDS.OVERALL].map(p => ({...p, id: `${p.id}_${m}`, kd: (parseFloat(p.kd) - Math.random()).toFixed(1)})).sort((a,b) => parseFloat(b.kd) - parseFloat(a.kd)); 
  }
});

export default function NordenNexusFinal() {
  // --- CORE KERNEL STATES ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [uptime, setUptime] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [notifications, setNotifications] = useState<any[]>([]);

  // --- DYNAMIC DATABASE STATES (NEW IN V30) ---
  const [leaderboardData, setLeaderboardData] = useState<Record<string, any[]>>(INITIAL_LEADERBOARDS);
  const [clanData, setClanData] = useState<any[]>(INITIAL_CLANS);

  // --- MARKET STATES ---
  const [cart, setCart] = useState<any[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [marketCategory, setMarketCategory] = useState('RANKS');

  // --- NORMAL USER MODALS ---
  const [playerDossier, setPlayerDossier] = useState<any | null>(null);
  const [isClanGuiOpen, setIsClanGuiOpen] = useState(false);
  const [clanForm, setClanForm] = useState({ name: '', leader: '', tag: '', color: 'text-white' });

  // --- ADMIN ENGINE STATES ---
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [systemLockdown, setSystemLockdown] = useState(false);
  const [tps, setTps] = useState(20.0);
  const [ram, setRam] = useState(42);
  const [adminSection, setAdminSection] = useState('GENERAL'); // Tabs: GENERAL, PLAYERS, ALLIANCES, SECURITY
  
  // Admin Editing States
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [editPlayerForm, setEditPlayerForm] = useState<any>(null);

  // --- SYSTEM INITIALIZATION ---
  useEffect(() => {
    const clock = setInterval(() => {
      setUptime(u => u + 1);
      setTps(prev => Math.max(18.5, Math.min(20.0, prev + (Math.random() * 0.2 - 0.1))));
      setRam(prev => Math.max(30, Math.min(85, prev + (Math.random() * 2 - 1))));
    }, 1000);
    const mouse = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', mouse);
    
    pushLog("SYSTEM: BOOTING NORDEN_NEXUS_OS V30...");
    pushLog("NETWORK: HANDSHAKE WITH PLAY.NORDENMC.COM SUCCESSFUL.");
    pushLog("DATABASE: DYNAMIC STATE CLUSTERS MOUNTED.");
    return () => { clearInterval(clock); window.removeEventListener('mousemove', mouse); };
  }, []);

  // --- HELPER LOGIC ---
  const pushLog = useCallback((msg: string) => {
    setLogs(p => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...p].slice(0, 150));
  }, []);

  const addNotify = (title: string, body: string, isError: boolean = false) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, body, isError }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
  };

  // --- NORMAL USER: CLAN CREATION LOGIC ---
  const submitUserClan = () => {
    if (!clanForm.name || !clanForm.leader) {
      addNotify("FORM_ERROR", "Clan Name and Commander IGN are required.", true);
      return;
    }
    
    // 1 IP PER TEAM LOGIC CHECK
    const existingClan = clanData.find(c => c.userIp === MOCK_USER_IP);
    if (existingClan) {
      addNotify("FIREWALL_BLOCK", `IP Limit Reached. You already command [${existingClan.name}].`, true);
      pushLog(`SECURITY: Denied faction creation for IP ${MOCK_USER_IP} (Limit Exceeded).`);
      return;
    }

    const newClan = {
      id: `C${Date.now()}`,
      name: clanForm.name.toUpperCase(),
      leader: clanForm.leader,
      members: 1,
      power: "10%",
      trophies: 0,
      dominance: "UNRANKED",
      color: clanForm.color,
      userIp: MOCK_USER_IP,
      level: 1
    };

    setClanData(prev => [...prev, newClan]);
    setIsClanGuiOpen(false);
    setClanForm({ name: '', leader: '', tag: '', color: 'text-white' });
    addNotify("FACTION_ESTABLISHED", `Welcome to the war, ${newClan.name}.`);
    pushLog(`NETWORK: New Faction [${newClan.name}] registered by ${MOCK_USER_IP}.`);
  };

  // --- ADMIN: LEADERBOARD MANUAL EDIT LOGIC ---
  const handlePlayerEditSave = () => {
    if (!editPlayerForm) return;

    setLeaderboardData(prev => {
      const updatedModeData = prev[activeMode].map(p => 
        p.id === editPlayerForm.id ? { ...p, ...editPlayerForm } : p
      );
      
      // Resort leaderboard based on new KD
      updatedModeData.sort((a,b) => parseFloat(b.kd) - parseFloat(a.kd));
      
      // Update ranks visually
      updatedModeData.forEach((p, idx) => p.rank = (idx + 1).toString().padStart(2, '0'));

      return { ...prev, [activeMode]: updatedModeData };
    });

    setSelectedPlayer({ ...selectedPlayer, ...editPlayerForm }); // Update local select state
    setEditPlayerForm(null); // Close edit mode
    addNotify("OVERRIDE_SUCCESS", "Entity database manually altered.");
    pushLog(`ADMIN: Overridden combat metrics for Entity [${selectedPlayer.name}].`);
  };

  // --- ADMIN: ALLIANCE MANAGER LOGIC ---
  const adminUpdateClan = (clanId: string, field: string, value: string) => {
    setClanData(prev => prev.map(c => c.id === clanId ? { ...c, [field]: value } : c));
    pushLog(`ADMIN: Clan [${clanId}] parameter [${field}] modified.`);
  };

  const adminDisbandClan = (clanId: string, clanName: string) => {
    setClanData(prev => prev.filter(c => c.id !== clanId));
    addNotify("ALLIANCE_PURGED", `Faction ${clanName} has been forcefully disbanded.`);
    pushLog(`ADMIN: FORCE_DISBAND EXECUTED ON FACTION [${clanName}].`);
  };

  // --- TERMINAL COMMAND EXECUTION ---
  const execTerminal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput) return;
    const rawCmd = terminalInput.trim();
    const cmd = rawCmd.toLowerCase();
    pushLog(`REAPER@NORDEN:~$ ${rawCmd}`);

    if (cmd === '/help') pushLog("AVAIL: /CLEAR, /REBOOT, /LOCKDOWN, /UNLOCK, /TPS_MAX, /BROADCAST [MSG]");
    else if (cmd === '/clear') setLogs([]);
    else if (cmd === '/lockdown') { setSystemLockdown(true); pushLog("CRITICAL: SYSTEM ENTERING RESTRICTED MODE."); }
    else if (cmd === '/unlock') { setSystemLockdown(false); pushLog("SUCCESS: RESTRICTIONS LIFTED."); }
    else if (cmd === '/tps_max') { setTps(20.0); pushLog("ADMIN: TPS OVERCLOCK APPLIED."); }
    else if (cmd.startsWith('/broadcast ')) {
      const m = rawCmd.split('/broadcast ')[1];
      addNotify("GLOBAL ANNOUNCEMENT", m);
      pushLog(`INJECTED: ${m}`);
    } else pushLog(`ERR: COMMAND '${cmd}' NOT RECOGNIZED.`);
    
    setTerminalInput("");
  };

  // --- AUTH LOGIC ---
  const handlePasskeyChange = (val: string) => {
    setPassInput(val);
    if (val === PASSKEY) {
      setIsAuthorized(true);
      pushLog("SECURITY: RSA_AUTH_SUCCESS. ADMIN_PRIVILEGES_ENGAGED.");
      addNotify("SECURITY", "Master Access Granted.");
    }
  };

  // Derived State
  const currentLeaderboard = useMemo(() => {
    const list = leaderboardData[activeMode] || [];
    return list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [leaderboardData, activeMode, searchQuery]);


  return (
    <div className={`min-h-screen bg-[#020205] text-white font-sans overflow-hidden select-none transition-all duration-[2000ms] ${systemLockdown ? 'grayscale contrast-150' : ''}`}>
      
      {/* 🔮 BACKGROUND HYPER-LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <motion.div 
            animate={{ x: cursorPos.x / 10, y: cursorPos.y / 10 }}
            className="w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.08)_0%,transparent_70%)] absolute -top-[10%] -left-[10%]"
         />
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
         <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black" />
      </div>

      {/* 🛠️ NAVIGATION SIDEBAR */}
      <aside className="fixed left-0 top-0 bottom-0 w-24 hover:w-72 transition-all duration-700 bg-black/40 backdrop-blur-3xl border-r border-white/5 z-[1000] group overflow-hidden shadow-2xl">
         <div className="flex flex-col h-full items-center group-hover:items-start py-10 px-5">
            <div 
               className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-20 cursor-pointer shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:rotate-90 transition-transform duration-500"
               onClick={() => { setActiveMenu('DASHBOARD'); addNotify("NAV", "Returning to Core."); }}
            >
               <Ghost size={28} />
            </div>

            <nav className="flex-1 w-full space-y-4">
               <NavBtn icon={<LayoutDashboard/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
               <NavBtn icon={<Swords/>} label="CLAN_WARS" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
               <NavBtn icon={<ShoppingCart/>} label="NEXUS_STORE" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
               <NavBtn icon={<TerminalSquare/>} label="SYSTEM_LOGS" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
               <NavBtn icon={<Database/>} label="OMNI_VAULT" active={activeMenu === 'VAULT'} onClick={() => setActiveMenu('VAULT')} />
            </nav>

            <div className="w-full pt-10 border-t border-white/5 mt-10">
               <NavBtn 
                  icon={<ShieldCheck className={isAuthorized ? "text-green-400" : "text-red-500 animate-pulse"} />} 
                  label="ADMIN_GOD_PANEL" 
                  onClick={() => setIsAdminOpen(true)} 
               />
            </div>
         </div>
      </aside>

      {/* 🎞️ PRIMARY VIEWPORT */}
      <main className="ml-24 flex-1 h-screen overflow-y-auto custom-scrollbar relative z-10 p-12 lg:p-20">
        
        {/* PERSISTENT HEADER */}
        <header className="flex flex-col lg:flex-row justify-between items-center mb-24 gap-10">
           <div>
              <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-none group cursor-default">
                 NORDEN<span className="text-indigo-500 group-hover:text-white transition-colors">MC</span>
              </h1>
              <div className="flex items-center gap-6 mt-6">
                 <div className="flex items-center gap-3 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Core_Online</span>
                 </div>
                 <span className="text-white/10 font-bold uppercase text-[10px] tracking-[0.4em]">Node: {SYSTEM_BUILD}</span>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="bg-black/50 border border-white/10 px-10 py-5 rounded-[2.5rem] flex items-center gap-8 backdrop-blur-2xl">
                 <StatusIndicator icon={<Cpu2/>} val={`${tps.toFixed(2)}`} label="TPS" />
                 <div className="w-[1px] h-10 bg-white/10" />
                 <StatusIndicator icon={<Disk/>} val={`${ram.toFixed(0)}%`} label="RAM" />
                 <div className="w-[1px] h-10 bg-white/10" />
                 <StatusIndicator icon={<Users/>} val="412" label="PLAYERS" />
              </div>
              <button className="bg-white text-black font-black px-10 py-6 rounded-[2rem] uppercase tracking-tighter hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95">
                 {SERVER_IP}
              </button>
           </div>
        </header>

        <AnimatePresence mode="wait">
          
          {/* 📊 DASHBOARD VIEW */}
          {activeMenu === 'DASHBOARD' && (
            <motion.div key="dash" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-20">
               
               {/* MODE SELECTOR */}
               <div className="flex flex-wrap justify-center gap-3 bg-white/5 p-3 rounded-[3rem] border border-white/5 backdrop-blur-3xl w-fit mx-auto shadow-2xl">
                  {MODES.map(m => (
                    <button 
                      key={m} 
                      onClick={() => setActiveMode(m)} 
                      className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeMode === m ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
                    >
                      {m}
                    </button>
                  ))}
               </div>

               {/* TOP 3 PODIUM */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {currentLeaderboard.slice(0, 3).map((p, i) => (
                    <RankCard key={p.id} player={p} rank={i+1} onAction={() => setPlayerDossier(p)} />
                  ))}
               </div>

               {/* DETAILED RANKINGS */}
               <div className="bg-black/40 border border-white/5 rounded-[5rem] p-16 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                  <div className="flex justify-between items-center mb-16">
                     <h2 className="text-4xl font-black italic tracking-tighter uppercase flex items-center gap-6"><Table size={32} className="text-indigo-500"/> Global_Ledger</h2>
                     <div className="relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input 
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           placeholder="FILTER_PLAYER_NAME..." 
                           className="bg-white/5 border border-white/10 pl-16 pr-8 py-5 rounded-2xl text-[11px] font-bold outline-none focus:border-indigo-500/50 transition-all w-96 text-indigo-400" 
                        />
                     </div>
                  </div>
                  <div className="space-y-4">
                     {currentLeaderboard.map((p) => (
                       <PlayerRow key={p.id} player={p} onAction={() => setPlayerDossier(p)} />
                     ))}
                     {currentLeaderboard.length === 0 && (
                        <p className="text-center text-white/20 py-10 font-black uppercase tracking-widest italic">No entities match query.</p>
                     )}
                  </div>
               </div>
            </motion.div>
          )}

          {/* ⚔️ CLAN WAR ROOM VIEW */}
          {activeMenu === 'CLANS' && (
            <motion.div key="clans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
               <div className="bg-gradient-to-br from-indigo-900/20 via-transparent to-transparent p-24 rounded-[5rem] border border-white/10 relative overflow-hidden group shadow-2xl">
                  <div className="relative z-10">
                     <h2 className="text-9xl font-black italic tracking-tighter leading-none mb-10 uppercase">Alliance<br/><span className="text-indigo-500">Systems</span></h2>
                     <p className="text-white/30 font-bold uppercase tracking-[0.4em] text-sm max-w-2xl mb-16 leading-relaxed italic">Coordination node for global factions. 1 Faction permitted per Network IP.</p>
                     <button onClick={() => setIsClanGuiOpen(true)} className="bg-white text-black font-black px-16 py-7 rounded-3xl flex items-center gap-6 uppercase tracking-widest hover:bg-indigo-500 hover:text-white hover:scale-105 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)]"><UserPlus size={28}/> Initialize_Faction</button>
                  </div>
                  <Swords size={600} className="absolute -right-32 -bottom-32 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-[4000ms]" />
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {clanData.map(clan => (
                    <div key={clan.id} className="bg-black/50 border border-white/10 p-14 rounded-[4rem] group hover:border-indigo-500/50 transition-all shadow-xl hover:-translate-y-2">
                       <div className="flex justify-between items-start mb-10">
                          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-500 group-hover:text-white transition-all"><Shield size={32}/></div>
                          <div className="text-right">
                             <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Level</p>
                             <p className="text-3xl font-black italic text-indigo-400">{clan.level}</p>
                          </div>
                       </div>
                       <h3 className={`text-5xl font-black italic tracking-tighter uppercase mb-4 ${clan.color}`}>{clan.name}</h3>
                       <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] mb-10">Cmdr: {clan.leader}</p>
                       <div className="grid grid-cols-2 gap-6 mb-10">
                          <div className="bg-white/5 p-6 rounded-3xl"><p className="text-[9px] font-black text-white/20 uppercase mb-2">Units</p><p className="text-3xl font-black italic">{clan.members}</p></div>
                          <div className="bg-white/5 p-6 rounded-3xl"><p className="text-[9px] font-black text-white/20 uppercase mb-2">Power</p><p className="text-3xl font-black italic text-indigo-400">{clan.power}</p></div>
                       </div>
                       <button className="w-full bg-white/10 border border-white/10 py-6 rounded-2xl uppercase font-black tracking-widest text-[11px] hover:bg-white hover:text-black transition-all">Request_Join</button>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* 💎 MARKET VIEW */}
          {activeMenu === 'MARKET' && (
            <motion.div key="market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
               <div className="flex justify-between items-end">
                  <div>
                     <h2 className="text-8xl font-black italic tracking-tighter uppercase">Nexus_Market</h2>
                     <p className="text-indigo-500 font-black uppercase tracking-[0.5em] text-xs mt-4">Authorized Virtual Goods Distribution</p>
                  </div>
                  <button onClick={() => addNotify("MARKET", "Checkout integration pending.")} className="bg-indigo-600 text-white font-black px-12 py-5 rounded-2xl flex items-center gap-4 text-xs uppercase shadow-xl hover:scale-105 transition-all">
                     <ShoppingCart size={20}/> View_Cart
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[4rem] group hover:bg-white/10 transition-all flex flex-col relative overflow-hidden">
                       <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-20 transition-all"><Package size={200}/></div>
                       <h3 className="text-4xl font-black italic uppercase mb-8 group-hover:text-indigo-400 transition-colors">Tier_{i}_Package</h3>
                       <div className="space-y-4 mb-12 flex-1">
                          <p className="text-[10px] font-bold text-white/30 uppercase flex items-center gap-3"><CheckCircle size={14} className="text-indigo-500"/> Custom Prefix Access</p>
                          <p className="text-[10px] font-bold text-white/30 uppercase flex items-center gap-3"><CheckCircle size={14} className="text-indigo-500"/> Priority Slot Entry</p>
                          <p className="text-[10px] font-bold text-white/30 uppercase flex items-center gap-3"><CheckCircle size={14} className="text-indigo-500"/> Dynamic Particle Aura</p>
                       </div>
                       <div className="pt-10 border-t border-white/5 flex flex-col gap-6">
                          <span className="text-5xl font-black italic tracking-tighter text-indigo-400">₹{i * 499}</span>
                          <button onClick={() => addNotify("CART", "Sequence Added.")} className="w-full bg-white text-black font-black py-6 rounded-3xl uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all">Infect_Cart</button>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* 💻 LOGS/TERMINAL VIEW */}
          {activeMenu === 'LOGS' && (
            <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[800px] bg-black border border-white/10 rounded-[4rem] flex flex-col overflow-hidden shadow-2xl">
               <div className="p-10 border-b border-white/5 bg-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-6">
                     <div className="w-3 h-3 bg-red-500 rounded-full" />
                     <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                     <div className="w-3 h-3 bg-green-500 rounded-full" />
                     <span className="text-xs font-black uppercase tracking-[0.4em] text-white/20 ml-6">Norden_Core_Terminal</span>
                  </div>
                  <button onClick={() => setLogs([])} className="text-[10px] font-black text-white/20 hover:text-red-500 transition-colors uppercase tracking-widest">Wipe_Buffer</button>
               </div>
               <div className="flex-1 p-12 overflow-y-auto font-mono text-sm space-y-3 custom-scrollbar">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-8 group">
                       <span className="text-white/5 w-10 shrink-0 select-none">[{idx}]</span>
                       <span className="text-indigo-400/70">{log}</span>
                    </div>
                  ))}
                  <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
               </div>
               <form onSubmit={execTerminal} className="p-10 bg-white/5 border-t border-white/10 flex items-center gap-6">
                  <span className="text-indigo-500 font-black animate-pulse">#_</span>
                  <input 
                     value={terminalInput}
                     onChange={(e) => setTerminalInput(e.target.value)}
                     placeholder="AWAITING_COMMAND... (Type /HELP)"
                     className="flex-1 bg-transparent border-none outline-none text-indigo-400 font-mono text-lg placeholder:text-white/5 uppercase"
                  />
                  <button type="submit" className="bg-indigo-600 p-5 rounded-2xl hover:bg-white hover:text-black transition-all"><Send size={20}/></button>
               </form>
            </motion.div>
          )}

          {/* 🏦 VAULT VIEW */}
          {activeMenu === 'VAULT' && (
            <motion.div key="vault" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
               <div className="bg-indigo-600 p-24 rounded-[5rem] flex flex-col items-center text-center shadow-[0_0_100px_rgba(79,70,229,0.2)]">
                  <Database size={80} className="mb-10" />
                  <h2 className="text-8xl font-black italic tracking-tighter uppercase mb-4">Omni_Vault</h2>
                  <p className="text-white/40 font-black uppercase tracking-[0.5em] text-sm">Secure Distributed Asset Storage</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {VAULT_ITEMS.map(item => (
                    <div key={item.id} className="bg-white/5 border border-white/10 p-12 rounded-[4rem] hover:border-indigo-500/50 transition-all group">
                       <div className="flex justify-between items-start mb-10">
                          <div className="bg-black/50 p-6 rounded-3xl text-indigo-500"><Package size={30}/></div>
                          <span className="text-[10px] font-black text-indigo-400 border border-indigo-500/20 px-4 py-1.5 rounded-full uppercase">LVL {item.level}</span>
                       </div>
                       <h4 className="text-3xl font-black italic uppercase mb-2 tracking-tighter">{item.name}</h4>
                       <p className="text-white/20 font-black uppercase text-[10px] tracking-widest mb-10">{item.category}</p>
                       <div className="flex justify-between items-center pt-8 border-t border-white/5">
                          <span className="text-3xl font-black italic">{item.value}</span>
                          <button className="bg-white/5 p-4 rounded-xl hover:bg-white hover:text-black transition-all"><ArrowUpRight size={20}/></button>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 📧 NORMAL USER: CLAN CREATION MODAL */}
      <AnimatePresence>
         {isClanGuiOpen && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-[50px] p-10">
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#050505] border border-white/10 p-20 rounded-[5rem] shadow-2xl w-full max-w-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full" />
                  <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-16 relative z-10">Initialize_Faction</h2>
                  <div className="space-y-8 relative z-10">
                     <div>
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4 mb-2 block">Faction Name</label>
                        <input value={clanForm.name} onChange={e => setClanForm({...clanForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-8 rounded-3xl font-black uppercase tracking-widest outline-none focus:border-indigo-500/50" placeholder="ENTER_NAME..." />
                     </div>
                     <div>
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4 mb-2 block">Commander IGN</label>
                        <input value={clanForm.leader} onChange={e => setClanForm({...clanForm, leader: e.target.value})} className="w-full bg-white/5 border border-white/10 p-8 rounded-3xl font-black uppercase tracking-widest outline-none focus:border-indigo-500/50" placeholder="YOUR_IGN..." />
                     </div>
                     <div>
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4 mb-2 block">Faction Color</label>
                        <select value={clanForm.color} onChange={e => setClanForm({...clanForm, color: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl font-black uppercase tracking-widest outline-none focus:border-indigo-500/50 appearance-none">
                           <option value="text-white">White</option>
                           <option value="text-red-500">Red</option>
                           <option value="text-cyan-400">Cyan</option>
                           <option value="text-purple-500">Purple</option>
                        </select>
                     </div>
                     <div className="pt-8 flex gap-6">
                        <button onClick={() => setIsClanGuiOpen(false)} className="flex-1 bg-white/5 border border-white/10 py-8 rounded-3xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all">Abort</button>
                        <button onClick={submitUserClan} className="flex-1 bg-indigo-600 text-white font-black py-8 rounded-3xl uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-xl">Deploy_Node</button>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* 📋 NORMAL USER: PLAYER DOSSIER MODAL */}
      <AnimatePresence>
         {playerDossier && !isAdminOpen && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-[50px] p-10">
               <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-[#050505] border border-white/10 p-16 rounded-[4rem] shadow-2xl w-full max-w-4xl relative overflow-hidden flex gap-16">
                  <button onClick={() => setPlayerDossier(null)} className="absolute top-10 right-10 text-white/20 hover:text-white"><X size={32}/></button>
                  <div className="w-1/3">
                     <img src={playerDossier.img} className="w-full rounded-[3rem] border-4 border-white/10 shadow-2xl mb-8" />
                     <div className={`py-4 rounded-2xl text-center font-black uppercase tracking-widest text-xs ${playerDossier.status === 'ONLINE' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {playerDossier.status}
                     </div>
                  </div>
                  <div className="flex-1 space-y-10">
                     <div>
                        <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-2">{playerDossier.name}</h2>
                        <p className="text-indigo-400 font-black uppercase tracking-widest text-xs">{playerDossier.tag}</p>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                           <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Rank</p>
                           <p className="text-3xl font-black italic">{playerDossier.rank}</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                           <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Alliance</p>
                           <p className="text-xl mt-2 font-black italic uppercase text-indigo-400">{playerDossier.clan}</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                           <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">K/D Ratio</p>
                           <p className="text-3xl font-black italic">{playerDossier.kd}</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                           <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">XP Yield</p>
                           <p className="text-3xl font-black italic text-cyan-400">{(playerDossier.xp/1000).toFixed(0)}K</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>


      {/* 🔐 ADMIN PANEL (STATE BINDINGS FIXED) */}
      <AnimatePresence>
         {isAdminOpen && (
            <motion.div 
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 40, stiffness: 250 }}
               className="fixed inset-y-0 right-0 w-full max-w-[1200px] bg-[#030307] border-l border-white/10 z-[3000] shadow-[-100px_0_150px_rgba(0,0,0,0.9)] overflow-y-auto custom-scrollbar flex flex-col"
            >
               {/* ADMIN HEADER */}
               <div className="p-16 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#030307]/90 backdrop-blur-3xl z-20">
                  <div>
                     <h2 className="text-7xl font-black italic tracking-tighter uppercase flex items-center gap-8 text-indigo-500"><Gavel size={50}/> God_Nexus</h2>
                     <p className="text-white/10 font-black uppercase tracking-[0.5em] text-[10px] mt-4 italic">Security_Clearance: Level_Omega</p>
                  </div>
                  <button 
                     onClick={() => setIsAdminOpen(false)} 
                     className="bg-white/5 p-8 rounded-[2.5rem] hover:bg-red-600 transition-all group"
                  >
                     <X size={40} className="group-hover:rotate-180 transition-transform duration-500" />
                  </button>
               </div>

               <div className="p-16 flex-1">
                  {!isAuthorized ? (
                    <div className="h-full flex flex-col items-center justify-center py-20">
                       <Lock size={150} className="text-white/5 mb-16 animate-pulse" />
                       <h3 className="text-2xl font-black italic tracking-[1em] uppercase mb-16 text-white/20">Inject_Passkey_Now</h3>
                       <input 
                          type="password"
                          autoFocus
                          value={passInput}
                          onChange={(e) => handlePasskeyChange(e.target.value)}
                          placeholder="SCANNING_INPUT..." 
                          className="bg-black border border-white/10 w-full max-w-2xl p-16 rounded-[4rem] text-center text-8xl font-black tracking-[1em] outline-none focus:border-indigo-500/50 shadow-[0_0_80px_rgba(79,70,229,0.1)] transition-all" 
                       />
                    </div>
                  ) : (
                    <div className="space-y-16">
                       
                       {/* ADMIN NAV TABS */}
                       <div className="flex flex-wrap gap-4 p-3 bg-white/5 rounded-[3rem] border border-white/5 w-fit">
                          {['GENERAL', 'PLAYERS', 'ALLIANCES', 'SECURITY'].map(s => (
                            <button 
                               key={s} 
                               onClick={() => setAdminSection(s)} 
                               className={`px-12 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${adminSection === s ? 'bg-indigo-600 text-white shadow-2xl scale-105' : 'text-white/20 hover:text-white hover:bg-white/10'}`}
                            >
                               {s}
                            </button>
                          ))}
                       </div>

                       {/* TAB: GENERAL */}
                       {adminSection === 'GENERAL' && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                               <AdminMetricCard icon={<CpuIcon/>} label="CORE_LOAD" val="22.1%" color="text-indigo-400" />
                               <AdminMetricCard icon={<Radio/>} label="LATENCY" val="12ms" color="text-green-400" />
                               <AdminMetricCard icon={<Database/>} label="QUERY_TIME" val="0.04s" color="text-cyan-400" />
                               <AdminMetricCard icon={<Activity/>} label="THREADS" val="1,024" color="text-fuchsia-400" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                               <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem]">
                                  <h4 className="text-3xl font-black italic tracking-tighter uppercase mb-10 flex items-center gap-4 text-indigo-500"><Terminal/> Signal_Broadcast</h4>
                                  <textarea 
                                     value={broadcastMsg}
                                     onChange={(e) => setBroadcastMsg(e.target.value)}
                                     placeholder="ENTER_SYSTEM_ANNOUNCEMENT..." 
                                     className="w-full h-48 bg-black border border-white/10 p-10 rounded-[3rem] font-mono text-sm text-indigo-400 outline-none focus:border-indigo-500/50 mb-10" 
                                  />
                                  <button 
                                     onClick={() => { pushLog(`ADMIN_BROADCAST: ${broadcastMsg}`); addNotify("SIGNAL", "Transmission sent."); setBroadcastMsg(""); }}
                                     className="w-full bg-indigo-600 font-black py-8 rounded-[2rem] uppercase tracking-widest text-[12px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                                  >
                                     Emit_Signal_Pulse
                                  </button>
                               </div>

                               <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] flex flex-col">
                                  <h4 className="text-3xl font-black italic tracking-tighter uppercase mb-10 flex items-center gap-4 text-cyan-400"><Activity size={30}/> Security_Pulse</h4>
                                  <div className="space-y-4 flex-1">
                                     {SYSTEM_ALERTS.map(alert => (
                                       <div key={alert.id} className="p-6 bg-black/50 border border-white/5 rounded-3xl flex justify-between items-center group">
                                          <div className="flex gap-6 items-center">
                                             <div className={`w-3 h-3 rounded-full ${alert.type === 'CRITICAL' ? 'bg-red-500 animate-pulse' : 'bg-indigo-500'}`} />
                                             <div>
                                                <p className="text-[12px] font-black italic uppercase tracking-tighter text-white/80">{alert.msg}</p>
                                                <p className="text-[9px] font-black text-white/10 uppercase mt-1 tracking-widest">{alert.time}</p>
                                             </div>
                                          </div>
                                          <X size={14} className="text-white/5 cursor-pointer hover:text-red-500" />
                                       </div>
                                     ))}
                                  </div>
                               </div>
                            </div>
                         </motion.div>
                       )}

                       {/* TAB: PLAYERS (MANUAL LEADERBOARD EDIT) */}
                       {adminSection === 'PLAYERS' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                             <div className="lg:col-span-1 bg-white/5 border border-white/10 p-10 rounded-[4rem] h-[800px] flex flex-col">
                                <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-8 px-4">Entity_Directory</h4>
                                <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar px-2">
                                   {currentLeaderboard.map(p => (
                                     <button key={p.id} onClick={() => { setSelectedPlayer(p); setEditPlayerForm(null); }} className={`w-full p-6 rounded-[2.5rem] border transition-all text-left group ${selectedPlayer?.id === p.id ? 'bg-indigo-600 border-indigo-500 shadow-2xl scale-105' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                                        <div className="flex items-center gap-6">
                                           <img src={p.img} className="w-12 h-12 rounded-xl border border-white/10" />
                                           <div>
                                              <p className="text-lg font-black italic uppercase tracking-tighter">{p.name}</p>
                                              <p className={`text-[9px] font-black uppercase tracking-widest ${selectedPlayer?.id === p.id ? 'text-white/80' : 'text-white/20'}`}>Rank: {p.rank} | K/D: {p.kd}</p>
                                           </div>
                                        </div>
                                     </button>
                                   ))}
                                </div>
                             </div>
                             
                             <div className="lg:col-span-2 space-y-12">
                                {selectedPlayer ? (
                                  <div className="bg-white/5 border border-white/10 p-16 rounded-[4rem] relative overflow-hidden shadow-2xl">
                                     <div className="flex justify-between items-start mb-16 relative z-10">
                                        <div className="flex gap-10 items-center">
                                           <img src={selectedPlayer.img} className="w-32 h-32 rounded-[3rem] border-4 border-white/10" />
                                           <div>
                                              <h3 className="text-6xl font-black italic tracking-tighter uppercase">{selectedPlayer.name}</h3>
                                              <p className="text-indigo-400 font-black uppercase tracking-[0.5em] text-xs mt-2 italic">Entity_Override_Active</p>
                                           </div>
                                        </div>
                                        <button onClick={() => setEditPlayerForm({ kd: selectedPlayer.kd, xp: selectedPlayer.xp, rank: selectedPlayer.rank })} className="bg-indigo-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:scale-105 transition-all"><Edit size={14}/> Override Stats</button>
                                     </div>
                                     
                                     {/* EDIT FORM OR DISPLAY */}
                                     {editPlayerForm ? (
                                        <div className="bg-black/50 p-10 rounded-[3rem] border border-white/10 relative z-10 space-y-8">
                                           <h4 className="text-xl font-black uppercase tracking-widest text-red-500 mb-6">Manual Database Alteration</h4>
                                           <div className="grid grid-cols-2 gap-8">
                                              <div>
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4 mb-2 block">K/D Ratio</label>
                                                <input value={editPlayerForm.kd} onChange={e => setEditPlayerForm({...editPlayerForm, kd: e.target.value})} className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl font-black outline-none focus:border-indigo-500" />
                                              </div>
                                              <div>
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4 mb-2 block">XP Points</label>
                                                <input value={editPlayerForm.xp} onChange={e => setEditPlayerForm({...editPlayerForm, xp: e.target.value})} className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl font-black outline-none focus:border-indigo-500" />
                                              </div>
                                           </div>
                                           <div className="flex gap-4 pt-6 border-t border-white/5">
                                              <button onClick={() => setEditPlayerForm(null)} className="flex-1 bg-white/5 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10">Cancel</button>
                                              <button onClick={handlePlayerEditSave} className="flex-1 bg-red-600 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-red-500">Inject Changes</button>
                                           </div>
                                        </div>
                                     ) : (
                                        <div className="grid grid-cols-2 gap-8 relative z-10">
                                           <PlayerAction label="Global_Ban" icon={<Ban/>} desc="Remove entity from network indefinitely." red />
                                           <PlayerAction label="Inventory_Lock" icon={<Lock/>} desc="Freeze all virtual assets." />
                                           <PlayerAction label="Force_Mute" icon={<VolumeX/>} desc="Silence entity in all chat buffers." />
                                           <PlayerAction label="Reset_Stats" icon={<RefreshCcw/>} desc="Wipe all combat metadata." />
                                        </div>
                                     )}

                                     <Ghost size={400} className="absolute -right-40 -bottom-40 text-white/5 rotate-12 pointer-events-none" />
                                  </div>
                                ) : (
                                  <div className="h-[800px] flex flex-col items-center justify-center text-white/10 border border-white/5 rounded-[4rem] border-dashed">
                                     <User size={100} className="mb-8 opacity-20" />
                                     <p className="text-2xl font-black italic uppercase tracking-widest">Select an entity to override</p>
                                  </div>
                                )}
                             </div>
                          </motion.div>
                       )}

                       {/* TAB: ALLIANCES (CLAN MANAGEMENT) */}
                       {adminSection === 'ALLIANCES' && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                            <h3 className="text-4xl font-black italic tracking-tighter uppercase text-indigo-400 flex items-center gap-6"><Swords size={36}/> Alliance_Management_Console</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                               {clanData.map(c => (
                                 <div key={c.id} className="bg-white/5 border border-white/10 p-12 rounded-[4rem] flex flex-col shadow-xl">
                                    <div className="flex justify-between items-center mb-8">
                                       <h4 className={`text-4xl font-black italic tracking-tighter uppercase ${c.color}`}>{c.name}</h4>
                                       <span className="text-[10px] font-black bg-black/40 px-4 py-2 rounded-xl text-white/50">{c.id}</span>
                                    </div>
                                    <div className="space-y-6 mb-10">
                                       <div className="flex items-center justify-between">
                                          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Power %</span>
                                          <input value={c.power} onChange={(e) => adminUpdateClan(c.id, 'power', e.target.value)} className="bg-black border border-white/10 px-4 py-2 rounded-xl text-xs font-black text-right w-24 outline-none focus:border-indigo-500" />
                                       </div>
                                       <div className="flex items-center justify-between">
                                          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Level</span>
                                          <input value={c.level} onChange={(e) => adminUpdateClan(c.id, 'level', e.target.value)} className="bg-black border border-white/10 px-4 py-2 rounded-xl text-xs font-black text-right w-24 outline-none focus:border-indigo-500" />
                                       </div>
                                    </div>
                                    <button onClick={() => adminDisbandClan(c.id, c.name)} className="mt-auto bg-red-500/10 border border-red-500/30 text-red-500 font-black py-6 rounded-3xl uppercase tracking-widest text-[11px] hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-4"><Trash2 size={16}/> Force Disband</button>
                                 </div>
                               ))}
                               {clanData.length === 0 && <p className="col-span-full text-center py-20 text-white/20 font-black uppercase tracking-widest">No Alliances Found in Database.</p>}
                            </div>
                         </motion.div>
                       )}

                       {/* TAB: SECURITY */}
                       {adminSection === 'SECURITY' && (
                         <div className="space-y-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                               <SecurityCard title="Firewall_Shield_V9" status="ACTIVE" icon={<ShieldCheck/>} desc="Blocking 12 concurrent packet-flood attempts." />
                               <SecurityCard title="Anti_Cheat_Engine" status="SCANNING" icon={<Search/>} desc="Analyzing hit-box consistency in PVP_ARENA_1." />
                            </div>
                            <div className="bg-red-500/10 border border-red-500/30 p-16 rounded-[4rem]">
                               <div className="flex justify-between items-center mb-12">
                                  <div>
                                     <h4 className="text-5xl font-black italic tracking-tighter uppercase text-red-500 flex items-center gap-6"><AlertTriangle size={40}/> Critical_Overload</h4>
                                     <p className="text-red-500/40 font-black uppercase tracking-widest text-[10px] mt-4">Kill-Switch Authorization Required</p>
                                  </div>
                                  <button onClick={() => setSystemLockdown(!systemLockdown)} className={`px-16 py-8 rounded-[3rem] font-black uppercase tracking-widest shadow-2xl transition-all text-xl ${systemLockdown ? 'bg-white text-red-600 animate-pulse' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                                     {systemLockdown ? 'DISABLE_LOCKDOWN' : 'INITIATE_LOCKDOWN'}
                                  </button>
                               </div>
                            </div>
                         </div>
                       )}

                    </div>
                  )}
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* 🛎️ GLOBAL TOASTS */}
      <div className="fixed bottom-10 right-10 z-[4000] space-y-4">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div 
               key={n.id} 
               initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} 
               className={`bg-[#050505] p-8 rounded-[2rem] shadow-2xl border-l-[10px] min-w-[350px] relative overflow-hidden ${n.isError ? 'border-red-500' : 'border-indigo-600'}`}
            >
               <p className={`text-[9px] font-black uppercase tracking-[0.5em] mb-2 ${n.isError ? 'text-red-500' : 'text-indigo-500'}`}>{n.title}</p>
               <p className="text-lg font-black italic uppercase tracking-tighter text-white">{n.body}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

// --- SUB_COMPONENTS (HEAVILY DENSE) ---

function NavBtn({ icon, label, active, onClick }: any) {
  return (
    <button 
       onClick={onClick} 
       className={`flex items-center gap-8 w-full p-6 rounded-[2rem] transition-all duration-700 group/btn relative ${active ? 'bg-indigo-600 text-white shadow-[0_0_40px_rgba(79,70,229,0.4)]' : 'text-white/10 hover:text-white hover:bg-white/5'}`}
    >
       <div className={`${active ? 'scale-110' : 'group-hover/btn:scale-110'} transition-transform duration-500`}>{icon}</div>
       <span className="text-[11px] font-black tracking-[0.5em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 whitespace-nowrap">{label}</span>
       {active && <motion.div layoutId="side_glow" className="absolute -left-1.5 top-4 bottom-4 w-1.5 bg-white rounded-r-full shadow-[0_0_20px_white]" />}
    </button>
  );
}

function StatusIndicator({ icon, val, label }: any) {
  return (
    <div className="flex items-center gap-5">
       <div className="text-indigo-500 bg-indigo-500/10 p-4 rounded-xl">{icon}</div>
       <div className="flex flex-col">
          <span className="text-3xl font-black italic tracking-tighter leading-none">{val}</span>
          <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mt-1">{label}</span>
       </div>
    </div>
  );
}

function RankCard({ player, rank, onAction }: any) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -10 }} className={`relative p-16 rounded-[5rem] border-2 bg-gradient-to-br from-white/5 to-transparent group ${rank === 1 ? 'border-indigo-500 shadow-[0_0_80px_rgba(79,70,229,0.15)]' : 'border-white/5'} cursor-pointer`} onClick={onAction}>
       <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-all"><Crown size={150}/></div>
       <div className="relative z-10 flex flex-col items-center">
          <div className="w-48 h-48 mb-12 relative">
             <img src={player.img} className="w-full h-full rounded-[4rem] border-4 border-white/10 shadow-2xl transition-transform group-hover:rotate-3" />
             <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-black font-black text-3xl shadow-2xl italic tracking-tighter">{rank}</div>
          </div>
          <h3 className="text-5xl font-black italic tracking-tighter uppercase mb-2 group-hover:text-indigo-400 transition-colors">{player.name}</h3>
          <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] mb-12 italic">{player.clan}</p>
          <div className="grid grid-cols-2 gap-8 w-full border-t border-white/5 pt-12">
             <div className="text-center">
                <p className="text-[10px] font-black text-white/10 uppercase mb-2">Efficiency</p>
                <p className="text-4xl font-black italic">{player.kd}</p>
             </div>
             <div className="text-center">
                <p className="text-[10px] font-black text-white/10 uppercase mb-2">XP_Yield</p>
                <p className="text-4xl font-black italic text-indigo-500">{(player.xp/1000).toFixed(0)}K</p>
             </div>
          </div>
       </div>
    </motion.div>
  );
}

function PlayerRow({ player, onAction }: any) {
  return (
    <div className="bg-black border border-white/5 p-8 rounded-[3rem] flex items-center justify-between group hover:border-indigo-500/30 hover:scale-[1.01] transition-all duration-500 cursor-pointer" onClick={onAction}>
       <div className="flex items-center gap-10">
          <span className="text-4xl font-black italic text-white/5 w-16 text-center">{player.rank}</span>
          <img src={player.img} className="w-16 h-16 rounded-2xl border-2 border-white/10 group-hover:border-indigo-500/50 transition-all" />
          <div>
             <h4 className="text-3xl font-black italic uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{player.name}</h4>
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic mt-1">{player.clan}</p>
          </div>
       </div>
       <div className="flex items-center gap-12">
          <div className="text-right">
             <p className="text-[10px] font-black text-white/10 uppercase mb-1 italic">K/D_RATING</p>
             <p className="text-3xl font-black italic tracking-tighter">{player.kd}</p>
          </div>
          <button className="bg-white/5 p-4 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all group-hover:rotate-45 duration-700">
             <ArrowUpRight size={22}/>
          </button>
       </div>
    </div>
  );
}

function AdminMetricCard({ icon, label, val, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] group hover:bg-white/10 transition-all">
       <div className="flex justify-between items-center mb-8">
          <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">{label}</span>
          <div className={`${color} group-hover:rotate-12 transition-transform`}>{icon}</div>
       </div>
       <p className={`text-5xl font-black italic tracking-tighter ${color}`}>{val}</p>
    </div>
  );
}

function SecurityCard({ title, status, icon, desc }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] flex items-center gap-10 group hover:border-indigo-500/30 transition-all cursor-pointer">
       <div className="bg-black/50 p-8 rounded-[2rem] text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">{icon}</div>
       <div>
          <h5 className="text-3xl font-black italic uppercase tracking-tighter mb-2">{title}</h5>
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{status}</span>
       </div>
    </div>
  );
}

function PlayerAction({ label, icon, desc, red }: any) {
  return (
    <div className={`p-10 rounded-[3rem] border transition-all cursor-pointer group flex items-center gap-8 ${red ? 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10' : 'bg-white/5 border-white/5 hover:border-indigo-500/30'}`}>
       <div className={`p-6 rounded-2xl ${red ? 'bg-red-500/20 text-red-500' : 'bg-black/40 text-indigo-400'}`}>{icon}</div>
       <div>
          <h5 className={`text-xl font-black italic uppercase tracking-tighter mb-1 ${red ? 'text-red-500' : 'text-white/80'}`}>{label}</h5>
          <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{desc}</p>
       </div>
    </div>
  );
}
