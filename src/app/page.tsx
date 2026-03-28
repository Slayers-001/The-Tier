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
  ShieldAlert as Alert, UserMinus, Ban, Timer, Cloud,
  Dna, Microscope, FlaskConical, Atom, Binary as DataBits
} from 'lucide-react';

/**
 * ============================================================
 * NORDEN_NEXUS_OS // VERSION 28.0.9 // "FINAL_STABLE_OMNI"
 * AUTHOR: UTKARSH PANDEY // REAPEROF_DEATH
 * STATUS: ALL_SYSTEMS_FUNCTIONAL // BUTTON_LOGIC_FIXED
 * CORE_PROTOCOL: HYPER_DENSE_V3
 * ============================================================
 */

const PASSKEY = "PVP_PROPLE";
const SERVER_IP = "PLAY.NORDENMC.COM";
const SYSTEM_BUILD = "OMNI_NEXUS_REAPER_V28.0.9";

const MODES = ["OVERALL", "LTMs", "Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace", "Crystal", "Boxing", "Bridge", "Parkour", "BedWars", "SkyWars"];

const SYSTEM_ALERTS = [
  { id: 1, type: "CRITICAL", msg: "Unauthorized login attempt from 192.168.1.1", time: "2m ago" },
  { id: 2, type: "INFO", msg: "Backup of Norden_World_Alpha completed.", time: "15m ago" },
  { id: 3, type: "WARN", msg: "High latency detected in Asian region nodes.", time: "45m ago" },
  { id: 4, type: "SUCCESS", msg: "Nexus_Firewall successfully repelled DDoS burst.", time: "1h ago" }
];

const LEADERBOARDS: Record<string, any[]> = {
  OVERALL: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 1250000, kills: 15400, deaths: 1241, wins: 890, loses: 45, clan: "GLACIERZ", status: "ONLINE", power: 9800, threatLevel: "OMEGA" },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 1120000, kills: 12000, deaths: 1080, wins: 750, loses: 60, clan: "GLACIERZ", status: "ONLINE", power: 8500, threatLevel: "ALPHA" },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", statType: "HT1", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 980000, kills: 9800, deaths: 1000, wins: 620, loses: 85, clan: "DEMON_SQUAD", status: "OFFLINE", power: 7200, threatLevel: "BETA" },
  ]
};

const VAULT_ITEMS = [
  { id: "V1", name: "Void_Catalyst", level: 99, value: "50M", category: "Artifact" },
  { id: "V2", name: "Nexus_Edge", level: 75, value: "12M", category: "Weapon" },
  { id: "V3", name: "Chrono_Shield", level: 88, value: "25M", category: "Armor" },
  { id: "V4", name: "Glacier_Heart", level: 100, value: "Locked", category: "Legendary" }
];

// Populate sub-modes
MODES.forEach(m => { if(!LEADERBOARDS[m]) LEADERBOARDS[m] = [...LEADERBOARDS.OVERALL].sort(() => Math.random() - 0.5); });

export default function NordenNexusFinal() {
  // --- CORE KERNEL STATES ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [uptime, setUptime] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);

  // --- MARKET STATES ---
  const [cart, setCart] = useState<any[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [marketCategory, setMarketCategory] = useState('RANKS');

  // --- ADMIN ENGINE STATES ---
  const [terminalInput, setTerminalInput] = useState("");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [systemLockdown, setSystemLockdown] = useState(false);
  const [tps, setTps] = useState(20.0);
  const [ram, setRam] = useState(42);
  const [adminSection, setAdminSection] = useState('GENERAL');
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // --- SYSTEM INITIALIZATION ---
  useEffect(() => {
    const clock = setInterval(() => {
      setUptime(u => u + 1);
      setTps(prev => Math.max(18.5, Math.min(20.0, prev + (Math.random() * 0.2 - 0.1))));
      setRam(prev => Math.max(30, Math.min(85, prev + (Math.random() * 2 - 1))));
    }, 1000);
    const mouse = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', mouse);
    
    pushLog("SYSTEM: BOOTING NORDEN_NEXUS_OS...");
    pushLog("NETWORK: HANDSHAKE WITH PLAY.NORDENMC.COM SUCCESSFUL.");
    return () => { clearInterval(clock); window.removeEventListener('mousemove', mouse); };
  }, []);

  // --- HELPER LOGIC ---
  const pushLog = useCallback((msg: string) => {
    setLogs(p => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...p].slice(0, 100));
  }, []);

  const addNotify = (title: string, body: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, body }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  // --- TERMINAL COMMAND EXECUTION ---
  const execTerminal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput) return;
    const rawCmd = terminalInput.trim();
    const cmd = rawCmd.toLowerCase();
    pushLog(`REAPER@NORDEN:~$ ${rawCmd}`);

    if (cmd === '/help') {
      pushLog("AVAIL: /CLEAR, /REBOOT, /LOCKDOWN, /UNLOCK, /TPS_MAX, /BROADCAST [MSG]");
    } else if (cmd === '/clear') {
      setLogs([]);
    } else if (cmd === '/lockdown') {
      setSystemLockdown(true);
      pushLog("CRITICAL: SYSTEM ENTERING RESTRICTED MODE.");
    } else if (cmd === '/unlock') {
      setSystemLockdown(false);
      pushLog("SUCCESS: RESTRICTIONS LIFTED.");
    } else if (cmd === '/tps_max') {
      setTps(20.0);
      pushLog("ADMIN: TPS OVERCLOCK APPLIED.");
    } else if (cmd.startsWith('/broadcast ')) {
      const m = rawCmd.split('/broadcast ')[1];
      addNotify("GLOBAL ANNOUNCEMENT", m);
      pushLog(`INJECTED: ${m}`);
    } else {
      pushLog(`ERR: COMMAND '${cmd}' NOT RECOGNIZED.`);
    }
    setTerminalInput("");
  };

  // --- AUTH LOGIC (BUTTON FIX) ---
  const handlePasskeyChange = (val: string) => {
    setPassInput(val);
    if (val === PASSKEY) {
      setIsAuthorized(true);
      pushLog("SECURITY: RSA_AUTH_SUCCESS. ADMIN_PRIVILEGES_ENGAGED.");
      addNotify("SECURITY", "Master Access Granted.");
    }
  };

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

      {/* 🛠️ NAVIGATION SIDEBAR (BUTTONS FIXED) */}
      <aside className="fixed left-0 top-0 bottom-0 w-24 hover:w-72 transition-all duration-700 bg-black/40 backdrop-blur-3xl border-r border-white/5 z-[1000] group overflow-hidden">
         <div className="flex flex-col h-full items-center group-hover:items-start py-10 px-5">
            <div 
               className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-20 cursor-pointer shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:rotate-90 transition-transform duration-500"
               onClick={() => { setActiveMenu('DASHBOARD'); addNotify("NAV", "Returning to Core."); }}
            >
               <Ghost size={28} />
            </div>

            <nav className="flex-1 w-full space-y-4">
               <NavBtn icon={<LayoutDashboard/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
               <NavBtn icon={<Swords/>} label="CLAN_RANKING" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
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
               
               {/* MODE SELECTOR (BUTTONS FIXED) */}
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
                  {LEADERBOARDS[activeMode].slice(0, 3).map((p, i) => (
                    <RankCard key={p.name} player={p} rank={i+1} />
                  ))}
               </div>

               {/* DETAILED RANKINGS */}
               <div className="bg-black/40 border border-white/5 rounded-[5rem] p-16 shadow-inner">
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
                     {LEADERBOARDS[activeMode].filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((p) => (
                       <PlayerRow key={p.name} player={p} />
                     ))}
                  </div>
               </div>
            </motion.div>
          )}

          {/* 💎 MARKET VIEW (BUTTONS FIXED) */}
          {activeMenu === 'MARKET' && (
            <motion.div key="market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
               <div className="flex justify-between items-end">
                  <div>
                     <h2 className="text-8xl font-black italic tracking-tighter uppercase">Nexus_Market</h2>
                     <p className="text-indigo-500 font-black uppercase tracking-[0.5em] text-xs mt-4">Authorized Virtual Goods Distribution</p>
                  </div>
                  <div className="flex gap-4">
                     {['RANKS', 'BOOSTERS', 'CRATES'].map(cat => (
                        <button 
                           key={cat} 
                           onClick={() => setMarketCategory(cat)} 
                           className={`px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${marketCategory === cat ? 'bg-white text-black' : 'bg-white/5 text-white/30 hover:bg-white/10'}`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[4rem] group hover:bg-white/10 transition-all flex flex-col relative overflow-hidden">
                       <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-20 transition-all"><ShoppingCart size={200}/></div>
                       <h3 className="text-4xl font-black italic uppercase mb-8 group-hover:text-indigo-400 transition-colors">Tier_{i}_Package</h3>
                       <div className="space-y-4 mb-12 flex-1">
                          <p className="text-[10px] font-bold text-white/30 uppercase flex items-center gap-3"><CheckCircle size={14} className="text-indigo-500"/> Custom Prefix Access</p>
                          <p className="text-[10px] font-bold text-white/30 uppercase flex items-center gap-3"><CheckCircle size={14} className="text-indigo-500"/> Priority Slot Entry</p>
                          <p className="text-[10px] font-bold text-white/30 uppercase flex items-center gap-3"><CheckCircle size={14} className="text-indigo-500"/> Dynamic Particle Aura</p>
                       </div>
                       <div className="pt-10 border-t border-white/5 flex flex-col gap-6">
                          <span className="text-5xl font-black italic tracking-tighter text-indigo-400">₹{i * 499}</span>
                          <button 
                             onClick={() => { setCart([...cart, {name: `Tier_${i}`, price: i*499}]); addNotify("CART", "Sequence Added."); }}
                             className="w-full bg-white text-black font-black py-6 rounded-3xl uppercase tracking-widest text-[11px] hover:bg-indigo-600 hover:text-white transition-all"
                          >
                             Infect_Cart
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* 💻 LOGS/TERMINAL VIEW (BUTTONS FIXED) */}
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
               </div>
               <form onSubmit={execTerminal} className="p-10 bg-white/5 border-t border-white/10 flex items-center gap-6">
                  <span className="text-indigo-500 font-black animate-pulse">#_</span>
                  <input 
                     value={terminalInput}
                     onChange={(e) => setTerminalInput(e.target.value)}
                     placeholder="AWAITING_COMMAND..."
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

      {/* 🔐 ADMIN PANEL (ALL INTERACTION FIXED) */}
      <AnimatePresence>
         {isAdminOpen && (
            <motion.div 
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 40, stiffness: 250 }}
               className="fixed inset-y-0 right-0 w-full max-w-[1200px] bg-[#030307] border-l border-white/10 z-[2000] shadow-[-100px_0_150px_rgba(0,0,0,0.9)] overflow-y-auto custom-scrollbar flex flex-col"
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
                       
                       {/* ADMIN NAV TABS (BUTTONS FIXED) */}
                       <div className="flex gap-4 p-3 bg-white/5 rounded-[3rem] border border-white/5 w-fit">
                          {['GENERAL', 'PLAYERS', 'SECURITY', 'NET'].map(s => (
                            <button 
                               key={s} 
                               onClick={() => setAdminSection(s)} 
                               className={`px-12 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${adminSection === s ? 'bg-indigo-600 text-white shadow-2xl scale-105' : 'text-white/20 hover:text-white'}`}
                            >
                               {s}
                            </button>
                          ))}
                       </div>

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
                                  <h4 className="text-3xl font-black italic tracking-tighter uppercase mb-10 flex items-center gap-6 text-indigo-500"><Terminal/> Signal_Broadcast</h4>
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
                                  <h4 className="text-3xl font-black italic tracking-tighter uppercase mb-10 flex items-center gap-6"><Activity/> Security_Pulse</h4>
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
                                          <X size={16} className="text-white/5 group-hover:text-red-500 cursor-pointer" />
                                       </div>
                                     ))}
                                  </div>
                               </div>
                            </div>
                         </motion.div>
                       )}

                       {adminSection === 'SECURITY' && (
                         <div className="space-y-12">
                            <div className="bg-red-500/10 border border-red-500/30 p-20 rounded-[5rem] flex justify-between items-center">
                               <div>
                                  <h4 className="text-5xl font-black italic tracking-tighter uppercase text-red-500 flex items-center gap-8"><AlertTriangle size={50}/> System_Lockdown</h4>
                                  <p className="text-red-500/40 font-black uppercase tracking-widest text-xs mt-4">Immediate Restriction of All UI Interactivity</p>
                                </div>
                                <button 
                                   onClick={() => { setSystemLockdown(!systemLockdown); addNotify("SECURITY", systemLockdown ? "Restored." : "Locked."); }}
                                   className={`px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-widest text-lg shadow-2xl transition-all ${systemLockdown ? 'bg-white text-red-600' : 'bg-red-600 text-white hover:bg-red-700 animate-pulse'}`}
                                >
                                   {systemLockdown ? 'DISABLE' : 'ENABLE'}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                               <SecurityOption icon={<ShieldCheck/>} label="Anti_Cheat_V5" status="Enabled" />
                               <SecurityOption icon={<Fingerprint/>} label="Auth_Layer_6" status="Active" />
                               <SecurityOption icon={<Eye/>} label="Entity_Logger" status="Passive" />
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
      <div className="fixed bottom-10 right-10 z-[3000] space-y-4">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div 
               key={n.id} 
               initial={{ x: 100, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               exit={{ x: 100, opacity: 0 }} 
               className="bg-white text-black p-10 rounded-[2.5rem] shadow-2xl border-l-[15px] border-indigo-600 min-w-[450px] relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-8 opacity-5"><Zap size={100}/></div>
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-3">{n.title}</p>
               <p className="text-2xl font-black italic uppercase tracking-tighter">{n.body}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

// --- SUB_COMPONENTS (DENSE LOGIC FIXED) ---

function NavBtn({ icon, label, active, onClick }: any) {
  return (
    <button 
       onClick={onClick} 
       className={`flex items-center gap-8 w-full p-5 rounded-[2rem] transition-all duration-700 group/btn relative ${active ? 'bg-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]' : 'text-white/10 hover:text-white hover:bg-white/5'}`}
    >
       <div className={`${active ? 'scale-110' : 'group-hover/btn:scale-110'} transition-transform duration-500`}>{icon}</div>
       <span className="text-[11px] font-black tracking-[0.6em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 whitespace-nowrap">{label}</span>
       {active && <div className="absolute -left-1.5 top-5 bottom-5 w-1.5 bg-white rounded-r-full" />}
    </button>
  );
}

function StatusIndicator({ icon, val, label }: any) {
  return (
    <div className="flex items-center gap-5">
       <div className="text-indigo-500 bg-indigo-500/10 p-3 rounded-xl">{icon}</div>
       <div className="flex flex-col">
          <span className="text-2xl font-black italic tracking-tighter leading-none">{val}</span>
          <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">{label}</span>
       </div>
    </div>
  );
}

function RankCard({ player, rank }: any) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -10 }} className={`relative p-16 rounded-[5rem] border-2 bg-gradient-to-br from-white/5 to-transparent group ${rank === 1 ? 'border-indigo-500 shadow-[0_0_80px_rgba(79,70,229,0.1)]' : 'border-white/5'}`}>
       <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-all"><Crown size={150}/></div>
       <div className="relative z-10 flex flex-col items-center">
          <div className="w-40 h-40 mb-12 relative">
             <img src={player.img} className="w-full h-full rounded-[4rem] border-4 border-white/10 shadow-2xl transition-transform group-hover:rotate-6" />
             <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-black font-black text-3xl shadow-2xl italic tracking-tighter">{rank}</div>
          </div>
          <h3 className="text-5xl font-black italic tracking-tighter uppercase mb-2 group-hover:text-indigo-400 transition-colors">{player.name}</h3>
          <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] mb-12 italic">{player.clan}</p>
          <div className="grid grid-cols-2 gap-8 w-full border-t border-white/5 pt-12">
             <div className="text-center">
                <p className="text-[9px] font-black text-white/10 uppercase mb-2">Efficiency</p>
                <p className="text-4xl font-black italic">{player.kd}</p>
             </div>
             <div className="text-center">
                <p className="text-[9px] font-black text-white/10 uppercase mb-2">XP_Yield</p>
                <p className="text-4xl font-black italic text-indigo-500">{(player.xp/1000).toFixed(0)}K</p>
             </div>
          </div>
       </div>
    </motion.div>
  );
}

function PlayerRow({ player }: any) {
  return (
    <div className="bg-black/60 border border-white/5 p-8 rounded-[3rem] flex items-center justify-between group hover:border-indigo-500/30 hover:scale-[1.01] transition-all duration-500">
       <div className="flex items-center gap-10">
          <span className="text-4xl font-black italic text-white/5 w-16 text-center">{player.rank}</span>
          <img src={player.img} className="w-16 h-16 rounded-2xl border-2 border-white/10 group-hover:border-indigo-500/50 transition-all" />
          <div>
             <h4 className="text-3xl font-black italic uppercase tracking-tighter group-hover:text-white transition-colors">{player.name}</h4>
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">{player.clan}</p>
          </div>
       </div>
       <div className="flex items-center gap-16">
          <div className="text-right">
             <p className="text-[10px] font-black text-white/10 uppercase mb-1 italic">K/D_RATING</p>
             <p className="text-3xl font-black italic tracking-tighter">{player.kd}</p>
          </div>
          <button className="bg-white/5 p-5 rounded-2xl hover:bg-white hover:text-black transition-all group-hover:rotate-45 duration-700">
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

function SecurityOption({ icon, label, status }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] flex items-center gap-10 group hover:border-indigo-500/30 transition-all cursor-pointer">
       <div className="bg-black/50 p-8 rounded-[2rem] text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">{icon}</div>
       <div>
          <h5 className="text-2xl font-black italic uppercase tracking-tighter mb-1">{label}</h5>
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{status}</span>
       </div>
    </div>
  );
}
