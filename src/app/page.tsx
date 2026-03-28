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
  Cpu as Cpu2, HardDrive as Disk, Activity as Pulse, Zap as Energy, Globe as Web
} from 'lucide-react';

/**
 * ============================================================
 * NORDEN_NEXUS_OS // VERSION 28.0.5 // "TITAN_PROTOCOL"
 * AUTHOR: UTKARSH PANDEY
 * PROTOCOL: OMNI_NEXUS_HYPER_DENSE_UNABRIDGED
 * TOTAL LINE TARGET: 1,000+
 * ============================================================
 */

// --- GLOBAL CONSTANTS ---
const PASSKEY = "PVP_PROPLE";
const SERVER_IP = "PLAY.NORDENMC.COM";
const SYSTEM_BUILD = "OMNI_NEXUS_TITAN_V28.0.5";

// --- HYPER-DENSE DATABASE SEEDING ---
const MODES = ["OVERALL", "LTMs", "Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace", "Crystal", "Boxing", "Bridge", "Parkour"];

const LEADERBOARDS: Record<string, any[]> = {
  OVERALL: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 1250000, kills: 15400, deaths: 1241, wins: 890, loses: 45, clan: "GLACIERZ", status: "ONLINE", power: 9800 },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 1120000, kills: 12000, deaths: 1080, wins: 750, loses: 60, clan: "GLACIERZ", status: "ONLINE", power: 8500 },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", statType: "HT1", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 980000, kills: 9800, deaths: 1000, wins: 620, loses: 85, clan: "DEMON_SQUAD", status: "OFFLINE", power: 7200 },
    { rank: "04", name: "DREAM_SLAYER", tag: "DIAMOND #4", statType: "HT2", kd: "8.5", img: "https://mc-heads.net/avatar/Dream/100", xp: 850000, kills: 8500, deaths: 1000, wins: 500, loses: 120, clan: "NONE", status: "AWAY", power: 6500 },
    { rank: "05", name: "TECHNO_FAN", tag: "PLATINUM #5", statType: "HT2", kd: "7.2", img: "https://mc-heads.net/avatar/Technoblade/100", xp: 720000, kills: 7200, deaths: 1000, wins: 410, loses: 150, clan: "DEMON_SQUAD", status: "ONLINE", power: 5800 },
  ],
  UHC: [
    { rank: "01", name: "ULTRA_GAPPLE", tag: "UHC_KING", kd: "25.0", img: "https://mc-heads.net/avatar/Steve/100", xp: 45000, kills: 250, deaths: 10, wins: 50, loses: 2, clan: "GLACIERZ", status: "ONLINE", power: 9000 }
  ]
};

// Fill empty modes with mock generators to keep data dense
MODES.forEach(m => { if(!LEADERBOARDS[m]) LEADERBOARDS[m] = [...LEADERBOARDS.OVERALL].sort(() => Math.random() - 0.5); });

const RANKS = [
  { id: "vip", name: "VIP", cost: 500, type: "INR", color: "text-green-400", perks: ["/fly in lobby", "Green Prefix", "Basic Kits", "1.2x XP Multiplier"], desc: "Entry level access for dedicated players." },
  { id: "elite", name: "ELITE", cost: 1500, type: "INR", color: "text-cyan-400", perks: ["/glow", "Cyan Prefix", "Elite Kits", "1.5x XP Multiplier", "Priority Queue"], desc: "High-tier combatant rank with priority access." },
  { id: "omega", name: "OMEGA", cost: 3000, type: "INR", color: "text-fuchsia-400", perks: ["/nick", "Pink Prefix", "Omega Kits", "2.0x XP Multiplier", "Private Discord Channel"], desc: "The ultimate rank for NordenMC legends." },
  { id: "nexus", name: "NEXUS", cost: 5000, type: "INR", color: "text-yellow-400", perks: ["All Perks", "Nexus Prefix", "Custom Cape", "Alpha Testing Access"], desc: "Server supporter status. Direct access to dev builds." }
];

const BOOSTERS = [
  { id: "b1", name: "GLOBAL_XP_2X", cost: 1000, duration: "1H", icon: <Zap/>, color: "text-orange-400" },
  { id: "b2", name: "COIN_BOOSTER_3X", cost: 2500, duration: "3H", icon: <Coins/>, color: "text-yellow-400" },
  { id: "b3", name: "LOOT_STRIKE", cost: 5000, duration: "Instant", icon: <Box/>, color: "text-red-400" }
];

const CLANS = [
  { id: "C1", name: "GLACIERZ", leader: "Utkarsh", members: 42, power: "98%", trophies: 12500, dominance: "RANK_1", color: "text-cyan-400" },
  { id: "C2", name: "DEMON_SQUAD", leader: "Unknown", members: 28, power: "85%", trophies: 8400, dominance: "RANK_2", color: "text-red-500" },
  { id: "C3", name: "VOID_WALKERS", leader: "Shadow", members: 15, power: "70%", trophies: 4200, dominance: "RANK_3", color: "text-purple-500" }
];

const WIKI_DATA = [
  { cat: "BASICS", items: [{ t: "Server IP", c: "PLAY.NORDENMC.COM" }, { t: "Version", c: "1.20.x - 1.21.x" }] },
  { cat: "RULES", items: [{ t: "Fair Play", c: "No macros or hacks." }, { t: "Chat", c: "No toxicity allowed." }] },
  { cat: "LORE", items: [{ t: "The Beginning", c: "NordenMC was built from the ruins of the Old World." }] }
];

// --- MAIN SYSTEM COMPONENT ---
export default function NordenTitanV28() {
  // --- CORE ENGINE STATES ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  // --- MARKETPLACE LOGIC STATES ---
  const [cart, setCart] = useState<any[]>([]);
  const [marketCategory, setMarketCategory] = useState('RANKS');
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: Browse, 1: Checkout, 2: Success
  
  // --- ADMIN COMMAND STATES ---
  const [terminalInput, setTerminalInput] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  
  // --- UI REFINEMENT STATES ---
  const [notifications, setNotifications] = useState<any[]>([]);
  const [tps, setTps] = useState(20.0);
  const [ram, setRam] = useState(42);

  // --- BOOT SEQUENCE ---
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    const clock = setInterval(() => {
      setUptime(u => u + 1);
      setTps(20.0 - Math.random() * 0.05);
      setRam(40 + Math.random() * 5);
    }, 1000);

    pushLog("SYSTEM: KERNEL_V28.0.5 BOOTED SUCCESSFULLY.");
    pushLog("NETWORK: CONNECTED TO PLAY.NORDENMC.COM [LATENCY: 14ms]");
    pushLog("SECURITY: RSA_ENCRYPTION_ACTIVE // OMNI_SHIELD_V4");

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      clearInterval(clock);
    };
  }, []);

  // --- HELPER FUNCTIONS ---
  const pushLog = useCallback((msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 100));
  }, []);

  const addNotify = (title: string, body: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, body }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput) return;
    pushLog(`COMMAND_EXECUTED: ${terminalInput.toUpperCase()}`);
    
    const cmd = terminalInput.toLowerCase();
    if (cmd === '/clear') setLogs([]);
    else if (cmd === '/help') pushLog("AVAILABLE: /CLEAR, /HELP, /REBOOT, /MAINTENANCE_ON, /MAINTENANCE_OFF");
    else if (cmd === '/reboot') window.location.reload();
    else if (cmd === '/maintenance_on') { setMaintenanceMode(true); pushLog("SYSTEM: MAINTENANCE_MODE ENABLED."); }
    else if (cmd === '/maintenance_off') { setMaintenanceMode(false); pushLog("SYSTEM: MAINTENANCE_MODE DISABLED."); }
    else pushLog(`ERROR: COMMAND '${cmd.toUpperCase()}' NOT RECOGNIZED.`);
    
    setTerminalInput("");
  };

  const addToCart = (item: any) => {
    setCart([...cart, item]);
    addNotify("MARKETPLACE", `${item.name} added to cart.`);
    pushLog(`MARKET: ITEM_${item.id.toUpperCase()} ATTACHED TO SESSION_CART.`);
  };

  // --- FILTERING LOGIC ---
  const filteredLeaderboard = useMemo(() => {
    const data = LEADERBOARDS[activeMode] || [];
    return data.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [activeMode, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#010103] text-white font-sans overflow-hidden select-none">
      
      {/* 🔮 THE NEURAL BACKGROUND ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ x: cursorPos.x - 400, y: cursorPos.y - 400 }}
          transition={{ type: 'spring', damping: 80, stiffness: 120 }}
          className="w-[800px] h-[800px] bg-cyan-500/5 blur-[180px] rounded-full absolute"
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#010103_100%)]" />
      </div>

      {/* 🚀 OMNI-HUD: DUAL SIDEBAR SYSTEM */}
      <aside className="fixed left-0 top-0 bottom-0 w-24 hover:w-80 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) bg-black/40 backdrop-blur-[120px] border-r border-white/5 z-[300] group overflow-hidden">
        <div className="flex flex-col h-full py-12">
          
          <div className="px-6 mb-20">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              className="w-12 h-12 bg-gradient-to-tr from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer mx-auto"
              onClick={() => setActiveMenu('DASHBOARD')}
            >
              <Zap size={24} className="fill-white" />
            </motion.div>
          </div>

          <nav className="flex-1 space-y-3 px-4">
            <NavBtn icon={<LayoutDashboard size={22}/>} label="COMMAND_CENTER" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
            <NavBtn icon={<Swords size={22}/>} label="ALLIANCE_WAR" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
            <NavBtn icon={<ShoppingCart size={22}/>} label="NEXUS_MARKET" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
            <NavBtn icon={<Terminal size={22}/>} label="STX_TERMINAL" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
            <NavBtn icon={<BookOpen size={22}/>} label="SERVER_WIKI" active={activeMenu === 'WIKI'} onClick={() => setActiveMenu('WIKI')} />
            
            <div className="pt-8 mt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
              <NavBtn icon={<ShieldCheck size={22} className={isAuthorized ? "text-green-400" : "text-red-500"} />} label="GOD_MODE_OVERRIDE" onClick={() => setIsAdminOpen(true)} />
            </div>
          </nav>

          <div className="px-6 mt-auto">
             <div className="bg-white/5 border border-white/10 p-5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Sys_Resources</p>
                  <Pulse size={12} className="text-cyan-400 animate-pulse" />
                </div>
                <div className="space-y-4">
                  <ResourceBar label="TPS" val={tps.toFixed(1)} percent={(tps/20)*100} />
                  <ResourceBar label="RAM" val={`${ram.toFixed(0)}%`} percent={ram} />
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* 🖥️ VIEWPORT ENGINE */}
      <div className="ml-24 flex-1 h-screen overflow-y-auto custom-scrollbar relative z-10 selection:bg-cyan-500/30">
        
        {/* 📟 TITAN HEADER */}
        <header className="px-16 py-12 flex justify-between items-center sticky top-0 bg-[#010103]/80 backdrop-blur-3xl z-[200] border-b border-white/5">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-8">
               <h1 className="text-6xl font-black italic tracking-tighter uppercase bg-gradient-to-r from-white via-white to-cyan-500 bg-clip-text text-transparent">NORDEN<span className="text-cyan-500">MC</span></h1>
               <div className="bg-cyan-500/5 border border-cyan-500/20 px-4 py-1.5 rounded-xl">
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">{SYSTEM_BUILD}</span>
               </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
               <Activity size={14} className="text-green-500 animate-pulse" />
               <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.4em]">Node: Utkarsh_Pandey // Security: Level_Max</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-8">
            <div className="relative group/search">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-cyan-400 transition-all" size={20} />
               <input 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="SCAN_NETWORK_DATABASES..." 
                  className="bg-white/5 border border-white/10 rounded-full pl-16 pr-8 py-5 text-sm outline-none w-[450px] focus:w-[550px] focus:border-cyan-500/40 focus:bg-white/10 transition-all font-bold placeholder:text-white/5" 
               />
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black font-black px-12 py-5 rounded-full text-xs uppercase tracking-[0.3em] shadow-[0_10px_40px_rgba(255,255,255,0.1)] flex items-center gap-4"
            >
              <Web size={18}/> {SERVER_IP}
            </motion.button>
          </div>
        </header>

        <main className="p-16 max-w-[2000px] mx-auto min-h-[1500px]">
          <AnimatePresence mode="wait">
            
            {/* 📊 CORE COMMAND CENTER */}
            {activeMenu === 'DASHBOARD' && (
              <motion.div key="dash" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-20">
                
                {/* MODE NAVIGATION BAR */}
                <div className="flex justify-center">
                  <div className="bg-black/80 p-3 rounded-full border border-white/10 flex gap-2 backdrop-blur-3xl shadow-2xl">
                    {MODES.map((m) => (
                      <button 
                        key={m} 
                        onClick={() => setActiveMode(m)} 
                        className={`px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all relative ${activeMode === m ? 'text-black' : 'text-white/20 hover:text-white'}`}
                      >
                        {activeMode === m && <motion.div layoutId="modeGlow" className="absolute inset-0 bg-white rounded-full shadow-[0_0_30px_white]" />}
                        <span className="relative z-10">{m}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* THE PODIUM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   {filteredLeaderboard.slice(0, 3).map((p, i) => (
                     <PodiumCard key={p.name} player={p} rank={i + 1} />
                   ))}
                </div>

                {/* DETAILED RANKINGS TABLE */}
                <div className="bg-black/60 border border-white/5 rounded-[4rem] p-16 relative overflow-hidden">
                   <div className="flex items-center justify-between mb-16">
                      <h3 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-4 text-white/40"><Database size={24}/> Database_Query_Result</h3>
                      <div className="flex gap-4">
                         <button className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all"><Filter size={20}/></button>
                         <button className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all"><RefreshCw size={20}/></button>
                      </div>
                   </div>

                   <div className="space-y-6">
                      {filteredLeaderboard.map((p, i) => (
                        <PlayerRow key={p.name} player={p} />
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {/* ⚔️ ALLIANCE_WAR_ROOM */}
            {activeMenu === 'CLANS' && (
              <motion.div key="clans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                 <div className="bg-gradient-to-br from-white/10 via-transparent to-transparent p-24 rounded-[5rem] border border-white/10 relative overflow-hidden group">
                    <div className="relative z-10">
                       <h2 className="text-9xl font-black italic tracking-tighter leading-none mb-10 uppercase">Alliance<br/><span className="text-cyan-500">Systems</span></h2>
                       <p className="text-white/30 font-bold uppercase tracking-[0.4em] text-sm max-w-2xl mb-16 leading-relaxed italic">Coordination node for global factions. Create your legacy, recruit warriors, and dominate the leaderboard.</p>
                       <div className="flex gap-8">
                          <button className="bg-white text-black font-black px-16 py-7 rounded-3xl flex items-center gap-6 uppercase tracking-widest hover:bg-cyan-500 hover:scale-105 transition-all shadow-2xl"><UserPlus size={28}/> Form_Faction</button>
                          <button className="bg-white/5 border border-white/10 text-white font-black px-16 py-7 rounded-3xl flex items-center gap-6 uppercase tracking-widest hover:bg-white/10 transition-all"><Trophy size={28}/> View_War_Log</button>
                       </div>
                    </div>
                    <Swords size={700} className="absolute -right-40 -bottom-40 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-[4000ms]" />
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {CLANS.map(clan => (
                      <ClanCard key={clan.id} clan={clan} />
                    ))}
                 </div>
              </motion.div>
            )}

            {/* 🛒 NEXUS_MARKETPLACE (REBUILT & WORKING) */}
            {activeMenu === 'MARKET' && (
              <motion.div key="market" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-16">
                 <div className="flex justify-between items-end bg-black/40 p-12 rounded-[4rem] border border-white/5">
                    <div>
                       <h2 className="text-7xl font-black italic tracking-tighter uppercase">Nexus_Store</h2>
                       <p className="text-white/20 font-bold uppercase tracking-[0.5em] text-xs mt-4">Authorized network commerce protocol.</p>
                    </div>
                    <div className="flex flex-col items-end gap-6">
                       <div className="flex bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-3xl">
                          <button onClick={() => setMarketCategory('RANKS')} className={`px-12 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${marketCategory === 'RANKS' ? 'bg-white text-black shadow-xl' : 'text-white/20'}`}>Ranks</button>
                          <button onClick={() => setMarketCategory('BOOSTERS')} className={`px-12 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${marketCategory === 'BOOSTERS' ? 'bg-white text-black shadow-xl' : 'text-white/20'}`}>Boosters</button>
                          <button onClick={() => setMarketCategory('ITEMS')} className={`px-12 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${marketCategory === 'ITEMS' ? 'bg-white text-black shadow-xl' : 'text-white/20'}`}>Items</button>
                       </div>
                       <button onClick={() => setCheckoutStep(1)} className="flex items-center gap-4 bg-cyan-500 text-black font-black px-10 py-4 rounded-2xl text-[11px] uppercase tracking-widest hover:scale-105 transition-all">
                          <ShoppingCart size={18}/> Cart ({cart.length})
                       </button>
                    </div>
                 </div>

                 {checkoutStep === 0 && (
                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                      {marketCategory === 'RANKS' && RANKS.map(rank => (
                        <StoreCard key={rank.id} item={rank} type="RANK" onAction={() => addToCart(rank)} />
                      ))}
                      {marketCategory === 'BOOSTERS' && BOOSTERS.map(boost => (
                        <StoreCard key={boost.id} item={boost} type="BOOSTER" onAction={() => addToCart(boost)} />
                      ))}
                   </div>
                 )}

                 {checkoutStep === 1 && (
                   <div className="max-w-4xl mx-auto bg-black/80 border border-white/10 rounded-[4rem] p-20 shadow-2xl backdrop-blur-3xl">
                      <h3 className="text-5xl font-black italic tracking-tighter uppercase mb-12 flex items-center gap-8"><CreditCard size={50}/> Order_Summary</h3>
                      <div className="space-y-6 mb-16">
                         {cart.length === 0 ? (
                           <p className="text-white/20 font-black uppercase tracking-[0.5em] text-center py-20 italic">No packets in buffer.</p>
                         ) : (
                           cart.map((item, idx) => (
                             <div key={idx} className="flex justify-between items-center p-8 bg-white/5 rounded-3xl border border-white/5">
                                <span className={`text-2xl font-black italic uppercase ${item.color}`}>{item.name}</span>
                                <span className="text-2xl font-black italic">₹{item.cost || item.price}</span>
                             </div>
                           ))
                         )}
                      </div>
                      <div className="flex gap-6">
                         <button onClick={() => setCheckoutStep(0)} className="flex-1 bg-white/5 border border-white/10 py-8 rounded-[2rem] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Back_To_Store</button>
                         <button onClick={() => { setCheckoutStep(2); setCart([]); }} className="flex-1 bg-white text-black py-8 rounded-[2rem] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-2xl">Confirm_Transmission</button>
                      </div>
                   </div>
                 )}

                 {checkoutStep === 2 && (
                   <div className="max-w-2xl mx-auto text-center py-40 bg-white/5 rounded-[5rem] border border-white/10 backdrop-blur-3xl relative overflow-hidden">
                      <Sparkles size={100} className="mx-auto text-cyan-400 mb-10 animate-bounce" />
                      <h3 className="text-6xl font-black italic tracking-tighter uppercase mb-4">Transmission_Success</h3>
                      <p className="text-white/30 font-bold uppercase tracking-[0.5em] text-xs mb-16">Packet injected into NordenMC Core Database.</p>
                      <button onClick={() => setCheckoutStep(0)} className="bg-cyan-500 text-black font-black px-16 py-6 rounded-full uppercase tracking-widest shadow-xl">Return_Home</button>
                   </div>
                 )}
              </motion.div>
            )}

            {/* 📟 STX_TERMINAL (FUNCTIONAL LOGS) */}
            {activeMenu === 'LOGS' && (
              <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[800px] flex flex-col bg-black border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl relative">
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                 
                 <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <div className="flex items-center gap-6">
                       <TerminalSquare size={28} className="text-cyan-400" />
                       <h3 className="text-2xl font-black italic tracking-tighter uppercase">STX_Kernel_Buffer</h3>
                    </div>
                    <div className="flex gap-4">
                       <div className="bg-green-500/10 text-green-500 px-4 py-1 rounded-lg text-[9px] font-black uppercase border border-green-500/20">Active</div>
                       <div className="bg-white/5 px-4 py-1 rounded-lg text-[9px] font-black text-white/30 uppercase border border-white/10">Build_28.0.5</div>
                    </div>
                 </div>

                 <div className="flex-1 p-12 overflow-y-auto custom-scrollbar font-mono text-[13px] space-y-3 bg-[#010103]">
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-6 group">
                         <span className="text-white/10 w-12 shrink-0">{i.toString().padStart(3, '0')}</span>
                         <span className={log.includes('ERROR') ? 'text-red-500' : log.includes('SUCCESS') ? 'text-green-400' : log.includes('COMMAND') ? 'text-fuchsia-400' : 'text-cyan-500/60'}>
                            {log}
                         </span>
                      </div>
                    ))}
                    <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
                 </div>

                 <form onSubmit={handleCommand} className="p-10 bg-white/5 border-t border-white/10 flex gap-6 items-center">
                    <ChevronRight size={24} className="text-cyan-400 animate-pulse" />
                    <input 
                       value={terminalInput}
                       onChange={(e) => setTerminalInput(e.target.value)}
                       placeholder="EXECUTE_SYSTEM_DIRECTIVE... (Type /HELP)" 
                       className="flex-1 bg-transparent border-none outline-none font-mono text-cyan-400 placeholder:text-white/10 text-lg" 
                    />
                    <button type="submit" className="bg-cyan-500 text-black p-4 rounded-2xl hover:bg-white transition-all"><Send size={20}/></button>
                 </form>
              </motion.div>
            )}

            {/* 📚 SERVER_WIKI */}
            {activeMenu === 'WIKI' && (
              <motion.div key="wiki" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                 <div className="lg:col-span-1 space-y-6">
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-10">Knowledge_Base</h3>
                    {WIKI_DATA.map(w => (
                      <button key={w.cat} className="w-full text-left p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:border-cyan-500/40 transition-all group">
                         <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-2 group-hover:text-cyan-400 transition-colors">{w.cat}</p>
                         <p className="text-xl font-black italic uppercase tracking-tighter text-white/60 group-hover:text-white transition-colors">Section_Directory</p>
                      </button>
                    ))}
                 </div>
                 <div className="lg:col-span-3 space-y-10">
                    {WIKI_DATA.map(section => (
                      <div key={section.cat} className="bg-black/60 border border-white/5 rounded-[4rem] p-16">
                         <h4 className="text-4xl font-black italic tracking-tighter uppercase mb-12 flex items-center gap-6 text-cyan-400"><ScrollText size={32}/> {section.cat}</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {section.items.map((item, i) => (
                              <div key={i} className="bg-white/5 p-10 rounded-[3rem] border border-white/5 hover:border-white/20 transition-all">
                                 <h5 className="text-lg font-black italic uppercase tracking-widest mb-4 text-white/80">{item.t}</h5>
                                 <p className="text-white/30 font-bold leading-relaxed italic">"{item.c}"</p>
                              </div>
                            ))}
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* 🔐 ADMIN_GOD_MODE_OVERRIDE (MODAL) */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-[1000] flex justify-end">
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 40, stiffness: 200 }}
              className="w-full max-w-[1000px] h-full bg-[#020205] border-l border-white/10 p-24 shadow-[-50px_0_100px_rgba(0,0,0,0.9)] overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-24">
                 <div>
                    <h2 className="text-7xl font-black italic tracking-tighter uppercase flex items-center gap-8 text-cyan-400"><Gavel size={60}/> God_Mode</h2>
                    <p className="text-white/20 font-black uppercase tracking-[0.5em] text-xs mt-4 italic">Security_Clearance: Level_Omni // System: Norden_Nexus</p>
                 </div>
                 <button onClick={() => setIsAdminOpen(false)} className="bg-red-500/10 text-red-500 p-6 rounded-3xl hover:bg-red-500 hover:text-white transition-all"><X size={32}/></button>
              </div>

              {!isAuthorized ? (
                <div className="flex flex-col items-center justify-center py-40">
                   <Lock size={120} className="text-red-500/20 mb-16 animate-pulse" />
                   <input 
                      type="password" 
                      value={passInput}
                      onChange={(e) => { setPassInput(e.target.value); if(e.target.value === PASSKEY) setIsAuthorized(true); }}
                      placeholder="ENTER_OMNI_KEY..." 
                      className="bg-white/5 border border-white/10 w-full max-w-lg p-12 rounded-[4rem] text-center text-6xl outline-none font-black tracking-[0.6em] focus:border-cyan-500/50 shadow-2xl" 
                   />
                   <p className="text-white/10 font-black uppercase tracking-widest mt-12 text-sm italic italic">Awaiting high-priority credential transmission...</p>
                </div>
              ) : (
                <div className="space-y-16">
                   {/* STATS OVERRIDE */}
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      <AdminStat label="CPU_LOAD" val="14.2%" trend="STABLE" icon={<Cpu2/>} />
                      <AdminStat label="DISK_I/O" val="1.4GB/s" trend="NORMAL" icon={<Disk/>} />
                      <AdminStat label="NET_LAT" val="0.8ms" trend="FAST" icon={<Web/>} />
                      <AdminStat label="ENERGY" val="98%" trend="STABLE" icon={<Energy/>} />
                   </div>

                   {/* CORE COMMANDS */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10">
                         <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4 text-fuchsia-400"><Radio size={28}/> Broadcast_Control</h4>
                         <textarea 
                            value={broadcastMessage}
                            onChange={(e) => setBroadcastMessage(e.target.value)}
                            placeholder="TRANSMIT_GLOBAL_MESSAGE..." 
                            className="w-full bg-black border border-white/10 p-10 rounded-[3rem] font-mono text-sm text-fuchsia-400 outline-none focus:border-fuchsia-500/50 h-48 mb-8" 
                         />
                         <button onClick={() => { pushLog(`BROADCAST: ${broadcastMessage}`); setBroadcastMessage(""); addNotify("BROADCAST", "Message sent globally."); }} className="w-full bg-fuchsia-500 text-white font-black py-7 rounded-3xl uppercase tracking-widest shadow-xl">Inject_Signal</button>
                      </div>

                      <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10">
                         <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4 text-cyan-400"><Users size={28}/> Player_Override</h4>
                         <div className="space-y-4 mb-10 h-48 overflow-y-auto custom-scrollbar px-2">
                            {LEADERBOARDS.OVERALL.map(p => (
                              <button key={p.name} onClick={() => setSelectedPlayer(p)} className={`w-full flex justify-between p-6 rounded-2xl border ${selectedPlayer?.name === p.name ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'bg-black/40 border-white/5 text-white/40'}`}>
                                 <span className="font-black italic uppercase">{p.name}</span>
                                 <span className="text-[10px] font-black uppercase tracking-widest">{p.rank}</span>
                              </button>
                            ))}
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <button className="bg-red-500/20 border border-red-500/40 text-red-500 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all">IP_Ban</button>
                            <button className="bg-white/5 border border-white/10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest">Inventory_View</button>
                         </div>
                      </div>
                   </div>

                   {/* RECOVERY MODULE */}
                   <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10">
                      <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4 text-yellow-400"><Database size={28}/> Database_Recovery_Protocol</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                         <RecoveryBtn label="Restore_Backups" icon={<HardDriveDownload/>} />
                         <RecoveryBtn label="Purge_Cached_Logs" icon={<Trash2/>} onClick={() => setLogs([])} />
                         <RecoveryBtn label="Re-Index_Global" icon={<RefreshCw/>} />
                         <RecoveryBtn label="Kernel_Debug_On" icon={<FileCode/>} />
                      </div>
                   </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🚀 GLOBAL TOAST SYSTEM */}
      <div className="fixed bottom-12 right-12 z-[2000] space-y-4">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div 
              key={n.id}
              initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }}
              className="bg-white text-black px-10 py-6 rounded-[2rem] shadow-2xl border-l-8 border-cyan-500 flex flex-col gap-2 min-w-[350px]"
            >
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-600">{n.title}</span>
               <span className="text-lg font-black italic uppercase tracking-tighter">{n.body}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

// --- HYPER-DENSE SUB-COMPONENTS ---

function NavBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-8 w-full p-5 rounded-[1.5rem] transition-all duration-700 relative group/btn ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/15 hover:text-white hover:bg-white/5'}`}>
       <div className={`${active ? 'scale-125 shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'group-hover/btn:scale-110'}`}>{icon}</div>
       <span className="text-[13px] font-black tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 whitespace-nowrap">{label}</span>
       {active && <motion.div layoutId="navMarker" className="absolute left-0 top-3 bottom-3 w-1.5 bg-cyan-400 rounded-r-full" />}
    </button>
  );
}

function ResourceBar({ label, val, percent }: any) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-white/30">
          <span>{label}</span>
          <span className="text-cyan-400">{val}</span>
       </div>
       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} className="h-full bg-cyan-500 shadow-[0_0_10px_cyan]" />
       </div>
    </div>
  );
}

function PodiumCard({ player, rank }: any) {
  const isGold = rank === 1;
  return (
    <motion.div 
      whileHover={{ y: -20, scale: 1.02 }}
      className={`relative p-14 rounded-[5rem] border-2 bg-gradient-to-b from-white/5 to-transparent text-center overflow-hidden group shadow-2xl ${isGold ? 'border-cyan-500/40 shadow-cyan-500/10' : 'border-white/10'}`}
    >
       <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity"><Crown size={150}/></div>
       <div className="relative z-10">
          <div className="relative w-48 h-48 mx-auto mb-10">
             <img src={player.img} className="w-full h-full rounded-[4rem] border-4 border-white/10 group-hover:border-white transition-all duration-1000 object-cover" />
             <div className={`absolute -bottom-6 -right-6 w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-3xl border-4 border-black ${isGold ? 'bg-yellow-400 text-black shadow-lg' : 'bg-slate-800 text-white'}`}>{rank}</div>
          </div>
          <h3 className="text-5xl font-black italic tracking-tighter uppercase mb-4">{player.name}</h3>
          <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{player.tag}</p>
          <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
             <div><p className="text-[9px] font-black text-white/20 uppercase mb-2">Efficacy</p><p className="text-4xl font-black italic">{player.kd}</p></div>
             <div><p className="text-[9px] font-black text-white/20 uppercase mb-2">XP_Core</p><p className="text-4xl font-black italic text-cyan-400">{(player.xp/1000000).toFixed(1)}M</p></div>
          </div>
       </div>
    </motion.div>
  );
}

function PlayerRow({ player }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ x: 20, backgroundColor: 'rgba(255,255,255,0.03)' }}
      className="bg-black/50 border border-white/5 p-10 rounded-[3rem] flex items-center justify-between group transition-all"
    >
       <div className="flex items-center gap-12">
          <span className="text-5xl font-black italic text-white/5 w-20 group-hover:text-cyan-500/20 transition-colors">{player.rank}</span>
          <div className="relative">
             <img src={player.img} className="w-16 h-16 rounded-2xl border-2 border-white/10" />
             <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${player.status === 'ONLINE' ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
          <div>
             <h4 className="text-3xl font-black italic uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{player.name}</h4>
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] flex items-center gap-4"><Shield size={10}/> {player.clan}</p>
          </div>
       </div>
       <div className="flex items-center gap-16">
          <div className="text-right">
             <p className="text-[10px] font-black text-white/10 uppercase mb-2">Combat_Eff</p>
             <p className="text-4xl font-black italic group-hover:text-white transition-colors text-white/60">{player.kd}</p>
          </div>
          <ArrowUpRight size={32} className="text-white/5 group-hover:text-cyan-500 group-hover:translate-x-3 group-hover:-translate-y-3 transition-all" />
       </div>
    </motion.div>
  );
}

function ClanCard({ clan }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-16 rounded-[5rem] relative overflow-hidden group hover:border-white/20 transition-all shadow-2xl">
       <div className="flex justify-between items-start mb-12">
          <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-all group-hover:rotate-[360deg] duration-1000">
             <ShieldCheck size={40}/>
          </div>
          <div className="text-right">
             <p className="text-[11px] font-black text-white/20 uppercase tracking-widest">Dominance</p>
             <p className="text-4xl font-black italic text-cyan-400">{clan.dominance}</p>
          </div>
       </div>
       <h3 className={`text-6xl font-black italic tracking-tighter uppercase mb-6 ${clan.color}`}>{clan.name}</h3>
       <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] mb-12 italic">Leader: {clan.leader}</p>
       <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="bg-black/40 p-10 rounded-[2.5rem] border border-white/5">
             <p className="text-[10px] font-black text-white/20 uppercase mb-3">Troop_Count</p>
             <p className="text-4xl font-black italic">{clan.members}</p>
          </div>
          <div className="bg-black/40 p-10 rounded-[2.5rem] border border-white/5">
             <p className="text-[10px] font-black text-white/20 uppercase mb-3">Power_Index</p>
             <p className="text-4xl font-black italic text-cyan-400">{clan.power}</p>
          </div>
       </div>
       <button className="w-full bg-white text-black font-black py-7 rounded-[2rem] uppercase tracking-widest text-[12px] hover:bg-cyan-500 transition-all shadow-xl">Apply_To_Faction</button>
    </div>
  );
}

function StoreCard({ item, type, onAction }: any) {
  return (
    <motion.div 
      whileHover={{ y: -15 }}
      className="bg-white/5 border border-white/10 p-14 rounded-[5rem] flex flex-col h-full group hover:bg-white/[0.08] transition-all relative overflow-hidden shadow-2xl"
    >
       <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-15 transition-opacity"><Package size={150}/></div>
       <h3 className={`text-5xl font-black italic mb-8 uppercase tracking-tighter ${item.color}`}>{item.name}</h3>
       <p className="text-[12px] text-white/30 mb-10 uppercase leading-relaxed font-black tracking-widest">{item.desc || `Premium ${type} protocol for NordenMC network.`}</p>
       <div className="space-y-4 mb-12 flex-1">
          {item.perks?.map((p: any) => (
            <div key={p} className="flex items-center gap-4 text-[10px] font-black text-white/60 uppercase tracking-widest">
               <CheckCircle size={14} className="text-cyan-400" /> {p}
            </div>
          ))}
          {item.duration && (
            <div className="flex items-center gap-4 text-[10px] font-black text-fuchsia-400 uppercase tracking-widest">
               <Activity size={14}/> Duration: {item.duration}
            </div>
          )}
       </div>
       <div className="mt-auto pt-10 border-t border-white/10">
          <p className="text-5xl font-black italic text-white mb-10 tracking-tighter">₹{item.cost || item.price}</p>
          <button onClick={onAction} className="w-full bg-white text-black font-black py-7 rounded-[2rem] uppercase tracking-widest text-[11px] hover:bg-cyan-500 transition-all">Initialize_Purchase</button>
       </div>
    </motion.div>
  );
}

function AdminStat({ label, val, trend, icon }: any) {
  return (
    <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:border-cyan-500/40 transition-all group">
       <div className="flex justify-between items-center mb-4">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{label}</p>
          <div className="text-cyan-400 group-hover:scale-125 transition-transform">{icon}</div>
       </div>
       <p className="text-4xl font-black italic tracking-tighter mb-2">{val}</p>
       <span className="text-[9px] font-black text-green-500 uppercase flex items-center gap-2"><TrendingUp size={10}/> {trend}</span>
    </div>
  );
}

function RecoveryBtn({ label, icon, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:border-yellow-500/40 transition-all group">
       <div className="mb-4 text-white/20 group-hover:text-yellow-400 transition-colors">{icon}</div>
       <span className="text-[9px] font-black text-white/30 uppercase tracking-widest text-center group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}
