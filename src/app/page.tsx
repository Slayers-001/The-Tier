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
  ShieldAlert as Alert, UserMinus, UserPlus as AddUser, Ban, Timer, Cloud,
  Dna, Fingerprint as Bio, Microscope, FlaskConical, Atom, Binary as DataBits
} from 'lucide-react';

/**
 * ============================================================
 * NORDEN_NEXUS_OS // VERSION 28.0.6 // "OMNI_REAPER_BUILD"
 * AUTHOR: UTKARSH PANDEY // REAPEROF_DEATH
 * STATUS: CRITICAL_DENSITY_STABLE
 * CORE_PROTOCOL: NEXUS_HYPER_VOL_X
 * ============================================================
 */

const PASSKEY = "PVP_PROPLE";
const SERVER_IP = "PLAY.NORDENMC.COM";
const SYSTEM_BUILD = "OMNI_NEXUS_REAPER_V28.0.6";

// --- EXPANDED DATA CLUSTERS (FOR DENSITY) ---
const MODES = ["OVERALL", "LTMs", "Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace", "Crystal", "Boxing", "Bridge", "Parkour", "BedWars", "SkyWars"];

const SYSTEM_ALERTS = [
  { id: 1, type: "CRITICAL", msg: "Unauthorized login attempt from 192.168.1.1", time: "2m ago" },
  { id: 2, type: "INFO", msg: "Backup of Norden_World_Alpha completed.", time: "15m ago" },
  { id: 3, type: "WARN", msg: "High latency detected in Asian region nodes.", time: "45m ago" }
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
  { id: "V3", name: "Chrono_Shield", level: 88, value: "25M", category: "Armor" }
];

// Seed the rest of the modes dynamically for buffer density
MODES.forEach(m => { if(!LEADERBOARDS[m]) LEADERBOARDS[m] = [...LEADERBOARDS.OVERALL].sort(() => Math.random() - 0.5); });

export default function NordenReaperV28() {
  // --- KERNEL STATES ---
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

  // --- MARKET & COMMERCE STATES ---
  const [cart, setCart] = useState<any[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [marketCategory, setMarketCategory] = useState('RANKS');

  // --- ADMIN & COMMAND ENGINE STATES ---
  const [terminalInput, setTerminalInput] = useState("");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [systemLockdown, setSystemLockdown] = useState(false);
  const [tps, setTps] = useState(20.0);
  const [ram, setRam] = useState(42);
  const [adminSection, setAdminSection] = useState('GENERAL');
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // --- INITIALIZATION ---
  useEffect(() => {
    const clock = setInterval(() => {
      setUptime(u => u + 1);
      setTps(20.0 - (Math.random() * 0.1));
      setRam(38 + (Math.random() * 8));
    }, 1000);
    const mouse = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', mouse);
    
    pushLog("KERNEL: OMNI_NEXUS_REAPER V28.0.6 INITIALIZED.");
    pushLog("SECURITY: RSA_4096_ACTIVE // ENCRYPTION_LAYER_6_LOADED.");
    return () => { clearInterval(clock); window.removeEventListener('mousemove', mouse); };
  }, []);

  // --- LOGIC HANDLERS ---
  const pushLog = useCallback((msg: string) => {
    setLogs(p => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...p].slice(0, 150));
  }, []);

  const addNotify = (title: string, body: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, body }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
  };

  const execTerminal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput) return;
    const rawCmd = terminalInput.trim();
    const cmd = rawCmd.toLowerCase();
    pushLog(`USER@NORDEN:~ $ ${rawCmd}`);

    // COMPLEX COMMAND PARSER
    switch(cmd) {
      case '/help':
        pushLog("COMMANDS: /CLEAR, /REBOOT, /LOCKDOWN_ON, /LOCKDOWN_OFF, /FLUSH_DB, /TPS_BOOST, /FORCE_SAVE, /ANNOUNCE [MSG]");
        break;
      case '/clear': setLogs([]); break;
      case '/lockdown_on': setSystemLockdown(true); pushLog("CRITICAL: GLOBAL LOCKDOWN ENGAGED."); break;
      case '/lockdown_off': setSystemLockdown(false); pushLog("SUCCESS: LOCKDOWN RELEASED."); break;
      case '/tps_boost': setTps(20.0); pushLog("ADMIN: TPS OVERCLOCK TRIGGERED."); break;
      case '/flush_db': pushLog("WARNING: PERSISTENT BUFFER PURGED."); break;
      case '/reboot': window.location.reload(); break;
      default:
        if (cmd.startsWith('/announce ')) {
          const msg = rawCmd.slice(10);
          pushLog(`[GLOBAL_BROADCAST]: ${msg.toUpperCase()}`);
          addNotify("ADMIN ANNOUNCEMENT", msg);
        } else {
          pushLog(`ERROR: '${cmd}' NOT FOUND IN BASH_DIRECTORIES.`);
        }
    }
    setTerminalInput("");
  };

  const toggleAdmin = () => {
    setIsAdminOpen(!isAdminOpen);
    if (!isAdminOpen) setPassInput(""); // Reset on open
  };

  const handleAuth = (val: string) => {
    setPassInput(val);
    if (val === PASSKEY) {
      setIsAuthorized(true);
      pushLog("SECURITY: ADMIN_ACCESS_GRANTED. SESSION_TOKEN_VERIFIED.");
      addNotify("SECURITY", "God Mode Override Enabled.");
    }
  };

  // --- RENDER CLUSTERS ---
  return (
    <div className={`min-h-screen bg-[#010103] text-white font-sans overflow-hidden select-none transition-all duration-1000 ${systemLockdown ? 'grayscale contrast-125' : ''}`}>
      
      {/* 🧬 HYPER-CORE BACKGROUND */}
      <div className="fixed inset-0 z-0">
         <motion.div 
            animate={{ x: cursorPos.x - 500, y: cursorPos.y - 500 }}
            transition={{ type: 'spring', damping: 100, stiffness: 200 }}
            className="w-[1000px] h-[1000px] bg-indigo-600/10 blur-[200px] rounded-full absolute"
         />
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-[#010103]" />
      </div>

      {/* ⛩️ OMNI-SIDEBAR V2 */}
      <aside className="fixed left-0 top-0 bottom-0 w-28 hover:w-80 transition-all duration-700 bg-black/60 backdrop-blur-3xl border-r border-white/5 z-[500] group overflow-hidden shadow-2xl">
         <div className="flex flex-col h-full items-center group-hover:items-start py-12 px-6">
            <motion.div 
               whileHover={{ rotate: 180 }}
               className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-24 cursor-pointer shadow-[0_0_30px_rgba(6,182,212,0.3)]"
               onClick={() => setActiveMenu('DASHBOARD')}
            >
               <Ghost size={32} className="text-white" />
            </motion.div>

            <nav className="flex-1 w-full space-y-4">
               <SidebarBtn icon={<LayoutDashboard/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
               <SidebarBtn icon={<Swords/>} label="CLAN_WARS" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
               <SidebarBtn icon={<ShoppingCart/>} label="NEXUS_STORE" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
               <SidebarBtn icon={<Terminal/>} label="TERMINAL_STX" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
               <SidebarBtn icon={<BookOpen/>} label="CORE_WIKI" active={activeMenu === 'WIKI'} onClick={() => setActiveMenu('WIKI')} />
               <SidebarBtn icon={<Database/>} label="OMNI_VAULT" active={activeMenu === 'VAULT'} onClick={() => setActiveMenu('VAULT')} />
            </nav>

            <div className="w-full pt-8 border-t border-white/5 mt-8">
               <SidebarBtn 
                  icon={<ShieldCheck className={isAuthorized ? "text-green-400" : "text-red-500 animate-pulse"} />} 
                  label="ADMIN_PANEL" 
                  onClick={toggleAdmin} 
               />
            </div>
         </div>
      </aside>

      {/* 🚀 MAIN VIEWPORT AREA */}
      <main className="ml-28 flex-1 h-screen overflow-y-auto custom-scrollbar relative z-10 px-16 py-12">
        
        {/* TOP STATUS BAR */}
        <header className="flex justify-between items-center mb-20 sticky top-0 z-[400] bg-[#010103]/90 backdrop-blur-md py-6 border-b border-white/5">
           <div>
              <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-none">NORDEN<span className="text-indigo-500">MC</span></h1>
              <div className="flex items-center gap-4 mt-4 text-white/20 font-black uppercase text-[10px] tracking-[0.4em]">
                 <Pulse size={12} className="text-green-500 animate-ping" />
                 <span>Status: Optimized</span>
                 <div className="w-1 h-1 bg-white/20 rounded-full" />
                 <span>ID: {SYSTEM_BUILD}</span>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-3xl flex items-center gap-6 backdrop-blur-xl">
                 <AdminMetric icon={<Cpu/>} val={`${tps.toFixed(1)}`} label="TPS" />
                 <div className="w-[1px] h-8 bg-white/10" />
                 <AdminMetric icon={<Activity/>} val={`${ram.toFixed(0)}%`} label="RAM" />
              </div>
              <button className="bg-indigo-600 text-white font-black px-12 py-5 rounded-3xl uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl active:scale-95">
                 {SERVER_IP}
              </button>
           </div>
        </header>

        <AnimatePresence mode="wait">
          
          {/* DASHBOARD MODULE */}
          {activeMenu === 'DASHBOARD' && (
            <motion.div key="dash" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="space-y-16">
               <div className="flex justify-center gap-2 bg-black/40 p-2 rounded-full border border-white/5 w-fit mx-auto backdrop-blur-3xl shadow-2xl">
                  {MODES.map(m => (
                    <button key={m} onClick={() => setActiveMode(m)} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === m ? 'bg-indigo-500 text-white shadow-lg' : 'text-white/20 hover:text-white'}`}>{m}</button>
                  ))}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {LEADERBOARDS[activeMode].slice(0, 3).map((p, i) => (
                    <Podium key={p.name} player={p} rank={i+1} />
                  ))}
               </div>

               <div className="bg-black/60 border border-white/5 rounded-[4rem] p-16 shadow-inner">
                  <div className="flex justify-between items-center mb-16">
                     <h2 className="text-4xl font-black italic tracking-tighter uppercase flex items-center gap-6"><Table size={32}/> Global_Rankings</h2>
                     <div className="flex gap-4">
                        <div className="relative">
                           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                           <input 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="SEARCH_PLAYER_ID..." 
                              className="bg-white/5 border border-white/10 pl-14 pr-8 py-4 rounded-2xl text-xs font-bold outline-none focus:border-indigo-500/50 transition-all w-80" 
                           />
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     {LEADERBOARDS[activeMode].filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((p, i) => (
                       <PlayerStrip key={p.name} player={p} />
                     ))}
                  </div>
               </div>
            </motion.div>
          )}

          {/* OMNI_VAULT MODULE */}
          {activeMenu === 'VAULT' && (
            <motion.div key="vault" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
               <div className="bg-gradient-to-r from-indigo-900/40 to-transparent p-24 rounded-[4rem] border border-indigo-500/20">
                  <h2 className="text-8xl font-black italic tracking-tighter uppercase mb-6">Omni_Vault</h2>
                  <p className="text-indigo-400 font-black uppercase tracking-[0.5em] text-xs">High-Value Virtual Asset Storage Engine</p>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {VAULT_ITEMS.map(item => (
                    <div key={item.id} className="bg-white/5 border border-white/10 p-12 rounded-[3rem] hover:bg-white/10 transition-all group">
                       <div className="flex justify-between items-start mb-8">
                          <div className="bg-black/40 p-6 rounded-2xl group-hover:bg-indigo-500 transition-all"><Package size={30}/></div>
                          <span className="text-[10px] font-black text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-lg">LVL {item.level}</span>
                       </div>
                       <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-2">{item.name}</h3>
                       <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest mb-10">{item.category}</p>
                       <div className="flex justify-between items-center border-t border-white/5 pt-8">
                          <span className="text-3xl font-black italic">{item.value}</span>
                          <button className="bg-white text-black font-black px-6 py-3 rounded-xl text-[10px] uppercase">Withdraw</button>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* REBUILT TERMINAL MODULE */}
          {activeMenu === 'LOGS' && (
            <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[850px] bg-black border border-white/10 rounded-[4rem] flex flex-col shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/50" />
               <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-xl">
                  <div className="flex items-center gap-6">
                     <TerminalSquare size={24} className="text-indigo-500" />
                     <span className="text-xl font-black italic tracking-tighter uppercase">Nexus_Kernel_Shell</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="px-4 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[9px] font-black uppercase">Socket: Open</span>
                     <span className="px-4 py-1 bg-white/5 text-white/30 border border-white/10 rounded text-[9px] font-black uppercase">Root@NordenMC</span>
                  </div>
               </div>
               <div className="flex-1 p-12 overflow-y-auto font-mono text-sm custom-scrollbar space-y-2 bg-[#020205]">
                  {logs.map((l, i) => (
                    <div key={i} className="flex gap-8 group">
                       <span className="text-white/5 w-12 shrink-0">{i.toString().padStart(3, '0')}</span>
                       <span className={l.includes('CRITICAL') || l.includes('ERROR') ? 'text-red-500' : l.includes('SUCCESS') ? 'text-green-400' : 'text-indigo-400/80'}>{l}</span>
                    </div>
                  ))}
                  <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
               </div>
               <form onSubmit={execTerminal} className="p-8 bg-white/5 border-t border-white/10 flex items-center gap-6">
                  <ChevronRight size={20} className="text-indigo-500 animate-pulse" />
                  <input 
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="ENTER_KERNEL_DIRECTIVE... (Type /HELP)"
                    className="flex-1 bg-transparent border-none outline-none text-indigo-400 text-lg font-mono placeholder:text-white/10" 
                  />
                  <button type="submit" className="bg-indigo-600 p-4 rounded-2xl hover:bg-white hover:text-black transition-all shadow-lg"><Send size={20}/></button>
               </form>
            </motion.div>
          )}

          {/* STORE MODULE */}
          {activeMenu === 'MARKET' && (
            <motion.div key="market" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12 pb-24">
               <div className="flex justify-between items-end">
                  <div>
                     <h2 className="text-7xl font-black italic tracking-tighter uppercase mb-4">Marketplace</h2>
                     <p className="text-white/20 font-black uppercase tracking-[0.6em] text-[10px] italic">Official NordenMC Transaction Gateway</p>
                  </div>
                  <div className="flex gap-6 items-center">
                     <div className="bg-white/5 p-2 rounded-2xl flex gap-2 border border-white/10">
                        {['RANKS', 'BOOSTERS', 'CRATES'].map(cat => (
                           <button key={cat} onClick={() => setMarketCategory(cat)} className={`px-10 py-3 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all ${marketCategory === cat ? 'bg-white text-black shadow-2xl' : 'text-white/20 hover:text-white'}`}>{cat}</button>
                        ))}
                     </div>
                     <button onClick={() => setCheckoutStep(1)} className="bg-indigo-600 px-10 py-5 rounded-2xl flex items-center gap-4 text-xs font-black uppercase shadow-xl hover:scale-105 transition-all">
                        <ShoppingCart size={18}/> Cart ({cart.length})
                     </button>
                  </div>
               </div>

               {checkoutStep === 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[4rem] group hover:bg-white/10 hover:border-indigo-500/50 transition-all flex flex-col relative overflow-hidden">
                         <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-20 transition-all"><Zap size={200}/></div>
                         <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-6 group-hover:text-indigo-400 transition-colors">Elite_Rank_V{i}</h3>
                         <ul className="space-y-3 flex-1 mb-12">
                            <li className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40"><CheckCircle size={14} className="text-green-500"/> Global Nickname</li>
                            <li className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40"><CheckCircle size={14} className="text-green-500"/> Priority Queue</li>
                            <li className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40"><CheckCircle size={14} className="text-green-500"/> Custom Emoji</li>
                         </ul>
                         <div className="pt-8 border-t border-white/5">
                            <span className="text-4xl font-black italic mb-8 block">₹1,500</span>
                            <button onClick={() => { setCart([...cart, {name: `Rank_V${i}`, price: 1500}]); addNotify("CART", "Item added to sequence."); }} className="w-full bg-white text-black font-black py-6 rounded-3xl uppercase tracking-widest text-[10px] hover:bg-indigo-500 hover:text-white transition-all">Add_To_Buffer</button>
                         </div>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="max-w-4xl mx-auto bg-black border border-white/10 p-20 rounded-[5rem] shadow-2xl backdrop-blur-3xl relative">
                    <button onClick={() => setCheckoutStep(0)} className="absolute top-10 left-10 text-white/20 hover:text-white flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"><ChevronRight size={16} className="rotate-180"/> Back</button>
                    <h3 className="text-5xl font-black italic tracking-tighter uppercase text-center mb-16">Transmission_Ready</h3>
                    <div className="space-y-4 mb-16">
                       {cart.length === 0 ? <p className="text-center text-white/10 py-20 font-black uppercase italic tracking-[0.5em]">Cart is currently null.</p> : cart.map((item, idx) => (
                         <div key={idx} className="bg-white/5 p-8 rounded-3xl border border-white/5 flex justify-between items-center group hover:border-indigo-500/30 transition-all">
                            <span className="text-xl font-black italic uppercase tracking-tighter">{item.name}</span>
                            <span className="text-xl font-black italic tracking-tighter">₹{item.price}</span>
                         </div>
                       ))}
                    </div>
                    <button onClick={() => { setCheckoutStep(0); setCart([]); addNotify("SUCCESS", "Purchase injected into Core."); pushLog("MARKET: TRANSACTION_SUCCESSFUL // HASH_0x821"); }} className="w-full bg-indigo-600 text-white font-black py-10 rounded-[2.5rem] uppercase tracking-widest text-xl shadow-[0_0_50px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-all">Confirm_Global_Purchase</button>
                 </div>
               )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 🔐 ADMIN_GOD_PANEL (FIXED LOGIC) */}
      <AnimatePresence>
         {isAdminOpen && (
           <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 40, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-[1100px] bg-[#020205] border-l border-white/10 z-[1000] p-24 shadow-[-50px_0_100px_rgba(0,0,0,0.9)] overflow-y-auto custom-scrollbar"
           >
              <div className="flex justify-between items-center mb-24">
                 <div>
                    <h2 className="text-8xl font-black italic tracking-tighter uppercase flex items-center gap-8 text-indigo-500"><Gavel size={60}/> Admin_Omni</h2>
                    <div className="flex items-center gap-6 mt-4">
                       <span className="text-white/20 font-black uppercase tracking-[0.5em] text-[10px] italic">Auth_Level: 0 (GOD_MODE)</span>
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                 </div>
                 <button onClick={() => setIsAdminOpen(false)} className="bg-white/5 p-6 rounded-[2rem] hover:bg-red-500 transition-all group shadow-xl">
                    <X size={40} className="group-hover:rotate-90 transition-transform" />
                 </button>
              </div>

              {!isAuthorized ? (
                <div className="h-[600px] flex flex-col items-center justify-center">
                   <Lock size={120} className="text-white/5 mb-16" />
                   <h3 className="text-2xl font-black italic tracking-widest uppercase mb-12 text-white/30">Awaiting Passkey Injection...</h3>
                   <input 
                      type="password"
                      value={passInput}
                      autoFocus
                      onChange={(e) => handleAuth(e.target.value)}
                      placeholder="SCANNING_KEYBOARD_INPUT..." 
                      className="bg-black border border-white/10 w-full max-w-xl p-14 rounded-[4rem] text-center text-7xl font-black tracking-[0.8em] outline-none focus:border-indigo-500/50 shadow-2xl transition-all" 
                   />
                   <div className="mt-16 grid grid-cols-2 gap-8 w-full max-w-lg">
                      <div className="bg-white/5 p-8 rounded-[2rem] text-center border border-white/5">
                         <p className="text-[10px] font-black text-white/20 uppercase mb-2">Security_Protocol</p>
                         <p className="text-xs font-bold text-indigo-400">RSA-4096-ECC</p>
                      </div>
                      <div className="bg-white/5 p-8 rounded-[2rem] text-center border border-white/5">
                         <p className="text-[10px] font-black text-white/20 uppercase mb-2">Auth_Method</p>
                         <p className="text-xs font-bold text-indigo-400">Master_Override</p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="space-y-16 pb-24">
                   
                   {/* ADMIN SUB-NAV */}
                   <div className="flex gap-4 p-2 bg-white/5 rounded-3xl border border-white/10 w-fit">
                      {['GENERAL', 'PLAYERS', 'SECURITY', 'NETWORK'].map(s => (
                        <button key={s} onClick={() => setAdminSection(s)} className={`px-10 py-4 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all ${adminSection === s ? 'bg-indigo-600 text-white' : 'text-white/20 hover:text-white'}`}>{s}</button>
                      ))}
                   </div>

                   {adminSection === 'GENERAL' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                        {/* REAL TIME METRICS GRID */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                           <MetricCard icon={<CpuIcon/>} label="CORE_LOAD" val="14.2%" color="text-indigo-400" />
                           <MetricCard icon={<Zap/>} label="TPS_AVG" val="19.98" color="text-green-400" />
                           <MetricCard icon={<Network/>} label="NET_IN" val="4.2 MB/s" color="text-cyan-400" />
                           <MetricCard icon={<Database/>} label="DB_LATENCY" val="0.2ms" color="text-yellow-400" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                           {/* BROADCAST CENTER */}
                           <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem]">
                              <h4 className="text-3xl font-black italic tracking-tighter uppercase mb-10 flex items-center gap-4 text-fuchsia-400"><Radio size={30}/> Global_Signal_Injector</h4>
                              <textarea 
                                 value={broadcastMsg}
                                 onChange={(e) => setBroadcastMsg(e.target.value)}
                                 placeholder="MESSAGE_BUFFER_WAITING..." 
                                 className="w-full h-48 bg-black border border-white/10 p-8 rounded-[2.5rem] font-mono text-sm text-fuchsia-400 outline-none focus:border-fuchsia-500/50 mb-8" 
                              />
                              <div className="flex gap-4">
                                 <button onClick={() => { pushLog(`[GLOBAL_BROADCAST]: ${broadcastMsg}`); setBroadcastMsg(""); addNotify("BROADCAST", "Message transmitted."); }} className="flex-1 bg-fuchsia-600 font-black py-6 rounded-3xl uppercase tracking-widest text-[11px] shadow-xl hover:scale-105 transition-all">Transmit_Signal</button>
                                 <button onClick={() => setBroadcastMsg("")} className="bg-white/5 p-6 rounded-3xl hover:bg-white/10 transition-all"><Trash2 size={24}/></button>
                              </div>
                           </div>

                           {/* SYSTEM LOGS MINI */}
                           <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] flex flex-col">
                              <h4 className="text-3xl font-black italic tracking-tighter uppercase mb-10 flex items-center gap-4 text-cyan-400"><Activity size={30}/> Security_Events</h4>
                              <div className="flex-1 space-y-4">
                                 {SYSTEM_ALERTS.map(alert => (
                                   <div key={alert.id} className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-2xl group hover:border-white/20 transition-all">
                                      <div className="flex items-center gap-6">
                                         <div className={`w-2 h-2 rounded-full ${alert.type === 'CRITICAL' ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`} />
                                         <div>
                                            <p className="text-[11px] font-black italic text-white/60 uppercase">{alert.msg}</p>
                                            <p className="text-[9px] font-black text-white/10 mt-1 uppercase">{alert.time}</p>
                                         </div>
                                      </div>
                                      <X size={14} className="text-white/5 cursor-pointer hover:text-red-500" />
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>

                        {/* ADVANCED RECOVERY */}
                        <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem]">
                           <h4 className="text-3xl font-black italic tracking-tighter uppercase mb-10 flex items-center gap-6"><Settings size={30}/> Recovery_Protocols</h4>
                           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                              <QuickActionBtn label="Purge_Heap" icon={<Trash2/>} color="bg-red-500/10 text-red-500" />
                              <QuickActionBtn label="Flush_Sockets" icon={<RefreshCw/>} color="bg-cyan-500/10 text-cyan-500" />
                              <QuickActionBtn label="Sync_Core" icon={<Save/>} color="bg-indigo-500/10 text-indigo-500" />
                              <QuickActionBtn label="Backup_World" icon={<HardDriveDownload/>} color="bg-green-500/10 text-green-500" />
                           </div>
                        </div>
                     </motion.div>
                   )}

                   {adminSection === 'PLAYERS' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                         <div className="lg:col-span-1 bg-white/5 border border-white/10 p-10 rounded-[4rem] h-[800px] flex flex-col">
                            <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-8 px-4">Entity_Directory</h4>
                            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar px-2">
                               {LEADERBOARDS.OVERALL.map(p => (
                                 <button key={p.name} onClick={() => setSelectedPlayer(p)} className={`w-full p-6 rounded-[2.5rem] border transition-all text-left group ${selectedPlayer?.name === p.name ? 'bg-indigo-600 border-indigo-500 shadow-2xl scale-105' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                                    <div className="flex items-center gap-6">
                                       <img src={p.img} className="w-12 h-12 rounded-xl border border-white/10" />
                                       <div>
                                          <p className="text-xl font-black italic uppercase tracking-tighter">{p.name}</p>
                                          <p className={`text-[9px] font-black uppercase tracking-widest ${selectedPlayer?.name === p.name ? 'text-white' : 'text-white/20'}`}>{p.clan}</p>
                                       </div>
                                    </div>
                                 </button>
                               ))}
                            </div>
                         </div>
                         <div className="lg:col-span-2 space-y-12">
                            {selectedPlayer ? (
                              <div className="bg-white/5 border border-white/10 p-16 rounded-[4rem] relative overflow-hidden">
                                 <div className="flex justify-between items-start mb-16 relative z-10">
                                    <div className="flex gap-10 items-center">
                                       <img src={selectedPlayer.img} className="w-32 h-32 rounded-[3rem] border-4 border-white/10" />
                                       <div>
                                          <h3 className="text-6xl font-black italic tracking-tighter uppercase">{selectedPlayer.name}</h3>
                                          <p className="text-indigo-400 font-black uppercase tracking-[0.5em] text-xs mt-2 italic">Entity_Override_Active</p>
                                       </div>
                                    </div>
                                    <div className="bg-black/60 px-8 py-4 rounded-3xl border border-white/5">
                                       <p className="text-[10px] font-black text-white/20 uppercase mb-1">Threat_Level</p>
                                       <p className={`text-2xl font-black italic ${selectedPlayer.threatLevel === 'OMEGA' ? 'text-red-500' : 'text-yellow-500'}`}>{selectedPlayer.threatLevel}</p>
                                    </div>
                                 </div>
                                 
                                 <div className="grid grid-cols-2 gap-8 relative z-10">
                                    <PlayerAction label="Global_Ban" icon={<Ban/>} desc="Remove entity from network indefinitely." red />
                                    <PlayerAction label="Inventory_Lock" icon={<Lock/>} desc="Freeze all virtual assets." />
                                    <PlayerAction label="Force_Mute" icon={<VolumeX/>} desc="Silence entity in all chat buffers." />
                                    <PlayerAction label="Reset_Stats" icon={<RefreshCcw/>} desc="Wipe all combat metadata." />
                                 </div>

                                 <Ghost size={400} className="absolute -right-40 -bottom-40 text-white/5 rotate-12" />
                              </div>
                            ) : (
                              <div className="h-full flex flex-col items-center justify-center text-white/10 border border-white/5 rounded-[4rem] border-dashed">
                                 <User size={100} className="mb-8 opacity-20" />
                                 <p className="text-2xl font-black italic uppercase tracking-widest">Select an entity to override</p>
                              </div>
                            )}
                         </div>
                      </motion.div>
                   )}

                   {adminSection === 'SECURITY' && (
                     <div className="space-y-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                           <SecurityCard title="Firewall_Shield_V9" status="ACTIVE" icon={<ShieldCheck/>} desc="Blocking 12 concurrent packet-flood attempts." />
                           <SecurityCard title="Anti_Cheat_Engine" status="SCANNING" icon={<Search/>} desc="Analyzing hit-box consistency in PVP_ARENA_1." />
                        </div>
                        <div className="bg-red-500/10 border border-red-500/30 p-16 rounded-[4rem]">
                           <div className="flex justify-between items-center mb-12">
                              <div>
                                 <h4 className="text-4xl font-black italic tracking-tighter uppercase text-red-500 flex items-center gap-6"><AlertTriangle size={40}/> Critical_Overload</h4>
                                 <p className="text-red-500/40 font-black uppercase tracking-widest text-[10px] mt-2">Kill-Switch Authorization Required</p>
                              </div>
                              <button onClick={() => setSystemLockdown(!systemLockdown)} className={`px-12 py-6 rounded-3xl font-black uppercase tracking-widest shadow-2xl transition-all ${systemLockdown ? 'bg-white text-red-600 animate-pulse' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                                 {systemLockdown ? 'DISABLE_LOCKDOWN' : 'INITIATE_LOCKDOWN'}
                              </button>
                           </div>
                        </div>
                     </div>
                   )}

                </div>
              )}
           </motion.div>
         )}
      </AnimatePresence>

      {/* 🚀 GLOBAL TOASTS */}
      <div className="fixed bottom-12 right-12 z-[2000] space-y-4">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div key={n.id} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="bg-white text-black px-12 py-6 rounded-[2.5rem] shadow-2xl border-l-[12px] border-indigo-600 min-w-[400px]">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-2">{n.title}</p>
               <p className="text-xl font-black italic uppercase tracking-tighter">{n.body}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

// --- SUB_COMPONENTS (DENSE_LOGIC) ---

function SidebarBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-8 w-full p-5 rounded-[2rem] transition-all duration-700 group/btn relative ${active ? 'bg-indigo-600 text-white shadow-2xl' : 'text-white/10 hover:text-white hover:bg-white/5'}`}>
       <div className={`${active ? 'scale-125' : 'group-hover/btn:scale-110'} transition-transform`}>{icon}</div>
       <span className="text-xs font-black tracking-[0.5em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 whitespace-nowrap">{label}</span>
       {active && <motion.div layoutId="side_glow" className="absolute -left-2 top-4 bottom-4 w-1.5 bg-white rounded-r-full shadow-[0_0_20px_white]" />}
    </button>
  );
}

function AdminMetric({ icon, val, label }: any) {
  return (
    <div className="flex items-center gap-4">
       <div className="text-indigo-500">{icon}</div>
       <div className="flex flex-col">
          <span className="text-lg font-black italic leading-none">{val}</span>
          <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{label}</span>
       </div>
    </div>
  );
}

function MetricCard({ icon, label, val, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:border-white/20 transition-all group">
       <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{label}</span>
          <div className={`${color} group-hover:rotate-[360deg] transition-transform duration-1000`}>{icon}</div>
       </div>
       <p className={`text-4xl font-black italic tracking-tighter ${color}`}>{val}</p>
    </div>
  );
}

function QuickActionBtn({ label, icon, color, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center p-8 rounded-[3rem] transition-all hover:scale-105 active:scale-95 ${color} border border-transparent hover:border-current`}>
       <div className="mb-4">{icon}</div>
       <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function Podium({ player, rank }: any) {
  return (
    <motion.div whileHover={{ y: -25 }} className={`relative p-16 rounded-[5rem] border-2 bg-gradient-to-b from-white/5 to-transparent text-center group ${rank === 1 ? 'border-indigo-500 shadow-2xl shadow-indigo-500/10' : 'border-white/5'}`}>
       <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-all"><Crown size={180}/></div>
       <div className="relative z-10">
          <div className="w-44 h-44 mx-auto mb-10 relative">
             <img src={player.img} className="w-full h-full rounded-[4rem] border-4 border-white/10 shadow-2xl" />
             <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-black font-black text-3xl shadow-xl">{rank}</div>
          </div>
          <h3 className="text-5xl font-black italic tracking-tighter uppercase mb-2">{player.name}</h3>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12 italic">{player.tag}</p>
          <div className="grid grid-cols-2 gap-10 border-t border-white/5 pt-10">
             <div><p className="text-[9px] font-black text-white/20 uppercase mb-2">Combat_ID</p><p className="text-4xl font-black italic">{player.kd}</p></div>
             <div><p className="text-[9px] font-black text-white/20 uppercase mb-2">XP_Yield</p><p className="text-4xl font-black italic text-indigo-400">{(player.xp/1000).toFixed(0)}K</p></div>
          </div>
       </div>
    </motion.div>
  );
}

function PlayerStrip({ player }: any) {
  return (
    <div className="bg-black border border-white/5 p-8 rounded-[3rem] flex items-center justify-between group hover:border-indigo-500/30 hover:translate-x-4 transition-all duration-500">
       <div className="flex items-center gap-10">
          <span className="text-4xl font-black italic text-white/5 w-16 text-center">{player.rank}</span>
          <img src={player.img} className="w-16 h-16 rounded-2xl border-2 border-white/10" />
          <div>
             <h4 className="text-3xl font-black italic uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{player.name}</h4>
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic">{player.clan}</p>
          </div>
       </div>
       <div className="flex items-center gap-12">
          <div className="text-right">
             <p className="text-[10px] font-black text-white/10 uppercase mb-1 italic">Efficiency</p>
             <p className="text-3xl font-black italic">{player.kd}</p>
          </div>
          <button className="bg-white/5 p-4 rounded-2xl hover:bg-white hover:text-black transition-all"><ArrowUpRight size={20}/></button>
       </div>
    </div>
  );
}

function SecurityCard({ title, status, icon, desc }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] group hover:bg-white/10 transition-all">
       <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-6">
             <div className="p-6 bg-black/40 rounded-3xl text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">{icon}</div>
             <h4 className="text-2xl font-black italic tracking-tighter uppercase">{title}</h4>
          </div>
          <span className="px-6 py-2 bg-indigo-500/20 text-indigo-400 rounded-full text-[9px] font-black tracking-widest uppercase border border-indigo-500/20">{status}</span>
       </div>
       <p className="text-white/30 font-bold uppercase tracking-widest text-[11px] italic leading-relaxed">{desc}</p>
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
