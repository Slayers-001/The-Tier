"use client";

/**
 * 🔗 NORDEN-NEXUS V12.5 - THE TITAN ARCHITECTURE
 * 🏢 Project: NordenMC High-End Dashboard
 * 🛠️ Build: March 27, 2026
 * 👑 Developer: Utkarsh Pandey
 * 📏 Status: MAXIMUM_EXPANSION_PROTOCOL_ACTIVE
 */

import React, { 
  useState, 
  useEffect, 
  useMemo, 
  useRef, 
  useCallback 
} from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  Search, Home, List, Users, ShieldAlert, Cpu, Globe, Lock, 
  Activity, Megaphone, Send, Fingerprint, RefreshCcw, 
  Sword, Crown, Terminal, Box, Zap, ShieldCheck, X, 
  ShoppingBag, Map, BarChart3, Settings, Database, 
  Server, Network, HardDrive, Radio, Ghost, Flame, 
  Target, Skull, AlertTriangle, TerminalSquare, 
  MousePointer2, ExternalLink, Filter, Trash2, 
  UserMinus, UserPlus, FileText, Share2, 
  LayoutDashboard, Layers, Monitor, HardHat, History,
  TrendingUp, CreditCard, ShieldX, Key, MessageSquare,
  ChevronRight, ChevronLeft, Command, Eye, Info,
  ZapOff, Wifi, WifiOff, HardDriveDownload, HardDriveUpload,
  PieChart, Gauge, Terminal as TerminalIcon, Shield
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- STYLED UTILITY ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- CORE SYSTEM INTERFACES (FULLY EXPANDED) ---
interface PlayerStats {
  kills: number;
  deaths: number;
  kd: string;
  winRate: string;
  elo: number;
  playtime: string;
  joinDate: string;
  lastLogin: string;
  peakElo: number;
  combatsWon: number;
  combatsLost: number;
  averagePing: number;
  headshots: number;
  killStreak: number;
  maxKillStreak: number;
  assists: number;
  damageDealt: string;
  damageTaken: string;
}

interface Player {
  rank: number;
  name: string;
  tier: string;
  kit: string;
  uuid: string;
  status: 'online' | 'offline';
  stats: PlayerStats;
  tags: string[];
  role: 'ADMIN' | 'MOD' | 'PLAYER' | 'MVP' | 'VIP';
  lastAction: string;
  location: string;
}

interface MarketItem {
  id: string;
  name: string;
  price: string;
  rarity: 'COMMON' | 'RARE' | 'LEGENDARY' | 'MYTHIC' | 'SINGULARITY';
  description: string;
  stock: number;
  category: 'WEAPONS' | 'ARMOR' | 'MATERIALS' | 'COSMETICS' | 'COLLECTIBLES';
  image: string;
  stats: {
    damage?: string;
    protection?: string;
    speed?: string;
    durability?: string;
    weight?: string;
  };
  seller: string;
  timestamp: string;
}

interface TerminalLog {
  id: string;
  text: string;
  type: 'system' | 'user' | 'error' | 'success' | 'warning' | 'critical' | 'alert';
  timestamp: string;
  node: string;
}

type ViewState = 'SYSTEM_CORE' | 'PLAYER_DATABASE' | 'COMMAND_CENTER' | 'MARKETPLACE' | 'LIVE_MAP' | 'ANALYTICS_DEEP';

// --- THE TITAN COMPONENT ---
export default function NordenNexusTitan() {
  
  // 1. SYSTEM INITIALIZATION STATES
  const [mounted, setMounted] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>("SYSTEM_CORE");
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const [isStaffAuthed, setIsStaffAuthed] = useState<boolean>(false);
  const [authInput, setAuthInput] = useState<string>("");
  const [isBooting, setIsBooting] = useState<boolean>(true);

  // 2. LIVE NETWORK TELEMETRY (REAL-TIME UPDATES)
  const [tps, setTps] = useState<string>("20.00");
  const [latency, setLatency] = useState<number>(14);
  const [cpuLoad, setCpuLoad] = useState<number>(18.5);
  const [ramUsed, setRamUsed] = useState<string>("4.82");
  const [ramTotal] = useState<string>("64.00");
  const [networkUp, setNetworkUp] = useState<string>("12.4");
  const [networkDown, setNetworkDown] = useState<string>("45.1");
  const [activeThreads, setActiveThreads] = useState<number>(124);
  const [uptime, setUptime] = useState<string>("12d 04h 22m");

  // 3. EXPANDED DATA ARRAYS (HARD-CODED TO FORCE FILE WEIGHT)
  const [players, setPlayers] = useState<Player[]>([
    {
      rank: 1, name: "UtkarshPandey", tier: "HT1", kit: "Crystal", uuid: "u1", status: "online",
      role: 'ADMIN', lastAction: 'Configuring Plugins', location: 'Spawn_Hub',
      tags: ["DEVELOPER", "MVP++", "ELITE"],
      stats: { kills: 22450, deaths: 142, kd: "158.1", winRate: "99%", elo: 5800, playtime: "1850h", joinDate: "2024-01", lastLogin: "Active", peakElo: 6000, combatsWon: 5200, combatsLost: 15, averagePing: 12, headshots: 840, killStreak: 45, maxKillStreak: 120, assists: 300, damageDealt: "1.2M", damageTaken: "400k" }
    },
    {
      rank: 2, name: "Technoblade", tier: "HT1", kit: "Sword", uuid: "u2", status: "offline",
      role: 'PLAYER', lastAction: 'Conquering Bedwars', location: 'The_End',
      tags: ["LEGEND", "PIG_RANK", "KING"],
      stats: { kills: 999999, deaths: 0, kd: "∞", winRate: "100%", elo: 9999, playtime: "∞", joinDate: "Legacy", lastLogin: "Forever", peakElo: 9999, combatsWon: 9999, combatsLost: 0, averagePing: 1, headshots: 500000, killStreak: 999, maxKillStreak: 9999, assists: 1, damageDealt: "999M", damageTaken: "0" }
    },
    {
        rank: 3, name: "Gojo", tier: "HT1", kit: "UHC", uuid: "u3", status: "online",
        role: 'VIP', lastAction: 'Dueling Dream', location: 'Arena_01',
        tags: ["SIX_EYES", "UNTOUCHABLE"],
        stats: { kills: 45000, deaths: 1, kd: "45000", winRate: "99.9%", elo: 8200, playtime: "550h", joinDate: "2025-05", lastLogin: "Active", peakElo: 8500, combatsWon: 1300, combatsLost: 1, averagePing: 5, headshots: 12000, killStreak: 80, maxKillStreak: 400, assists: 12, damageDealt: "5.4M", damageTaken: "100" }
    },
    {
        rank: 4, name: "Dream", tier: "LT1", kit: "Axe", uuid: "u4", status: "offline",
        role: 'MVP', lastAction: 'Speedrunning', location: 'Nether_Fortress',
        tags: ["SPEEDRUNNER", "HUNTER"],
        stats: { kills: 14500, deaths: 650, kd: "22.3", winRate: "82%", elo: 3400, playtime: "900h", joinDate: "2023-09", lastLogin: "3d ago", peakElo: 3800, combatsWon: 2400, combatsLost: 400, averagePing: 28, headshots: 2500, killStreak: 5, maxKillStreak: 42, assists: 1200, damageDealt: "2.1M", damageTaken: "1.8M" }
    }
  ]);

  const [marketItems] = useState<MarketItem[]>([
    { 
      id: 'm1', name: 'Norden Singularity Blade', price: '2,500,000', rarity: 'SINGULARITY', 
      description: 'The ultimate weapon forged in the Nexus. Sharpness XXV, Knockback X.', 
      stock: 1, category: 'WEAPONS', image: 'https://mc-heads.net/head/UtkarshPandey/100', 
      stats: { damage: "250.0", speed: "+15%", durability: "INFINITE" }, seller: "SERVER_ADMIN", timestamp: "2026-03-27"
    },
    { 
      id: 'm2', name: 'Infinite Void Chestplate', price: '950,000', rarity: 'MYTHIC', 
      description: 'Absorbs 90% of all incoming projectile damage.', 
      stock: 3, category: 'ARMOR', image: 'https://mc-heads.net/head/Gojo/100', 
      stats: { protection: "95.0", speed: "-5%", weight: "Heavy" }, seller: "Nexus_Vault", timestamp: "2026-03-26"
    },
    { 
      id: 'm3', name: 'Ender Dragon Core', price: '450,000', rarity: 'LEGENDARY', 
      description: 'Used to craft high-tier singularity items.', 
      stock: 12, category: 'MATERIALS', image: 'https://mc-heads.net/head/Dream/100',
      stats: { weight: "0.1kg" }, seller: "Void_Merchant", timestamp: "2026-03-25"
    },
    { 
      id: 'm4', name: 'Nexus Wings (Cosmetic)', price: '150,000', rarity: 'RARE', 
      description: 'Visual wings that trail cyan particles.', 
      stock: 100, category: 'COSMETICS', image: 'https://mc-heads.net/head/Technoblade/100',
      stats: { weight: "Weightless" }, seller: "Market_Bot", timestamp: "2026-03-24"
    }
  ]);

  // 4. TERMINAL LOGS
  const [terminalHistory, setTerminalHistory] = useState<TerminalLog[]>([
    { id: 'l1', text: "NORDEN_OS_TITAN [V12.5] BOOTING...", type: 'system', timestamp: '12:00:01', node: 'ROOT_01' },
    { id: 'l2', text: "KERNEL_LOAD: 100% | MEMORY_SCAN: CLEAN", type: 'success', timestamp: '12:00:02', node: 'ROOT_01' },
    { id: 'l3', text: "UPLINKING TO PLAY.NORDENMC.COM...", type: 'warning', timestamp: '12:00:03', node: 'NET_GATE' },
    { id: 'l4', text: "ENCRYPTION_LAYER_4_ACTIVE (AES-256)", type: 'success', timestamp: '12:00:04', node: 'SECURITY' },
    { id: 'l5', text: "SYNCING PLAYER_DATABASE [TITAN_INDEX]...", type: 'system', timestamp: '12:00:05', node: 'DB_CLUSTER' }
  ]);
  const [cmdInput, setCmdInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [kitFilter, setKitFilter] = useState<string>("OVERALL");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // --- SYSTEM LOGIC: THE LIFECYCLE ---
  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsBooting(false), 2500);

    const telemetryTimer = setInterval(() => {
        setCpuLoad(prev => {
            const delta = (Math.random() * 5 - 2.5);
            return Math.min(Math.max(prev + delta, 12), 48);
        });
        setTps(prev => (Math.random() > 0.98 ? "19.98" : "20.00"));
        setLatency(prev => {
            const shift = Math.floor(Math.random() * 3 - 1);
            return Math.min(Math.max(prev + shift, 8), 35);
        });
        setActiveThreads(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);

    return () => clearInterval(telemetryTimer);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const pushLog = (text: string, type: TerminalLog['type'] = 'system') => {
    const newLog: TerminalLog = { 
        id: Math.random().toString(36), 
        text, 
        type, 
        timestamp: new Date().toLocaleTimeString(),
        node: 'TITAN_DASH'
    };
    setTerminalHistory(prev => [...prev.slice(-150), newLog]);
  };

  const executeCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && cmdInput.trim()) {
      const input = cmdInput.toLowerCase().trim();
      pushLog(`USER@ADMIN:~$ ${input}`, 'user');
      
      // THE COMMAND PARSER ENGINE (FULLY EXPANDED)
      if (input === 'help') {
        pushLog("== TITAN_COMMAND_CENTER_HELP ==", "system");
        pushLog("status - Check server health", "system");
        pushLog("ban [name] - Blacklist player", "warning");
        pushLog("mute [name] - Global silence", "warning");
        pushLog("clear - Flush buffer", "system");
        pushLog("reboot - Restart node", "critical");
        pushLog("broadcast [msg] - Send global alert", "alert");
      } 
      else if (input === 'clear') {
        setTerminalHistory([]);
      } 
      else if (input === 'status') {
        pushLog(`CORE_TPS: ${tps}`, "success");
        pushLog(`LATENCY: ${latency}ms`, "success");
        pushLog(`CPU_USAGE: ${cpuLoad.toFixed(2)}%`, "success");
        pushLog(`RAM_USAGE: ${ramUsed}GB / ${ramTotal}GB`, "success");
      } 
      else if (input.startsWith('ban ')) {
        const target = input.split(' ')[1];
        pushLog(`BAN_PROTOCOL_INITIATED: ${target?.toUpperCase()}`, "critical");
        pushLog(`UPLINKING TO GLOBAL_BLACKLIST...`, "warning");
        setTimeout(() => pushLog(`${target} has been PERMANENTLY TERMINATED.`, "error"), 1000);
      }
      else if (input.startsWith('broadcast ')) {
        const msg = input.replace('broadcast ', '');
        pushLog(`GLOBAL_BROADCAST: "${msg}"`, "alert");
      }
      else if (input === 'reboot') {
        pushLog("SYSTEM_REBOOT_INITIATED...", "critical");
        setTimeout(() => window.location.reload(), 2000);
      }
      else {
        pushLog(`ERR: COMMAND_NOT_RECOGNIZED: ${input}`, "error");
      }
      setCmdInput("");
    }
  };

  if (!mounted) return null;

  // --- BOOT SEQUENCE VIEW ---
  if (isBooting) {
    return (
        <div className="h-screen bg-[#020205] flex flex-col items-center justify-center p-20 font-mono">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="w-full max-w-4xl space-y-8"
            >
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center">
                        <Fingerprint size={40} className="text-black" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black italic text-white tracking-tighter">NORDEN_NEXUS_OS</h1>
                        <p className="text-cyan-500 text-xs font-black tracking-[0.5em]">SYSTEM_VERSION_12.5.0_STABLE</p>
                    </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-cyan-500 shadow-[0_0_20px_#06b6d4]" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-10 text-[10px] text-gray-500 uppercase tracking-widest">
                    <div className="space-y-2">
                        <p>Loading Kernel... <span className="text-green-500">DONE</span></p>
                        <p>Initializing Titan_Index... <span className="text-green-500">DONE</span></p>
                        <p>Establishing Socket.io Uplink... <span className="text-green-500">DONE</span></p>
                    </div>
                    <div className="space-y-2">
                        <p>Security Handshake... <span className="text-green-500">DONE</span></p>
                        <p>Mapping Nexus_World... <span className="text-green-500">DONE</span></p>
                        <p>UI_Expansion_Protocol... <span className="text-cyan-500 animate-pulse">RUNNING</span></p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#010103] text-[#e2e8f0] overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* 🌌 ATMOSPHERIC ENGINE: THE TITAN SHADERS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-30%] right-[-20%] w-[1600px] h-[1600px] bg-cyan-600/5 blur-[350px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-25%] left-[-15%] w-[1400px] h-[1400px] bg-indigo-600/5 blur-[300px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
        {/* GRID OVERLAY LAYER 1 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px]" />
        {/* GRID OVERLAY LAYER 2 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_2px,transparent_2px),linear-gradient(to_bottom,#ffffff01_2px,transparent_2px)] bg-[size:20px_20px]" />
      </div>

      {/* 🛠️ NAVIGATION: THE TITAN SIDEBAR (120px - 380px) */}
      <motion.aside 
        animate={{ width: sidebarExpanded ? 380 : 130 }}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        className="relative z-50 border-r border-white/5 bg-[#030305]/95 backdrop-blur-[80px] flex flex-col py-16 shadow-[50px_0_150px_rgba(0,0,0,0.8)]"
      >
        <div className="flex flex-col items-center flex-1 space-y-24 px-10">
          
          {/* BRANDING LOGO */}
          <motion.div 
            whileHover={{ scale: 1.15, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="w-24 h-24 bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-800 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_80px_rgba(34,211,238,0.4)] cursor-none"
          >
            <Fingerprint size={48} className="text-black" />
          </motion.div>

          <nav className="w-full space-y-8">
             {/* NAV_ITEM: SYSTEM_CORE */}
             <button onClick={() => setCurrentView("SYSTEM_CORE")} className={cn("w-full flex items-center gap-10 p-7 rounded-[2rem] transition-all relative group", currentView === "SYSTEM_CORE" ? "text-cyan-400" : "text-gray-600 hover:text-white")}>
                <LayoutDashboard size={32} className="shrink-0 group-hover:rotate-6 transition-transform" />
                {sidebarExpanded && (
                    <div className="flex flex-col items-start overflow-hidden">
                        <span className="font-black tracking-[0.4em] text-[12px] uppercase whitespace-nowrap">CORE_DASHBOARD</span>
                        <span className="text-[8px] text-gray-700 tracking-[0.2em] uppercase font-bold">Main_Cluster</span>
                    </div>
                )}
                {currentView === "SYSTEM_CORE" && <motion.div layoutId="nav-glow" className="absolute inset-0 bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem] shadow-[inset_0_0_30px_rgba(34,211,238,0.1)]" />}
             </button>

             {/* NAV_ITEM: TITAN_INDEX */}
             <button onClick={() => setCurrentView("PLAYER_DATABASE")} className={cn("w-full flex items-center gap-10 p-7 rounded-[2rem] transition-all relative group", currentView === "PLAYER_DATABASE" ? "text-cyan-400" : "text-gray-600 hover:text-white")}>
                <Users size={32} className="shrink-0 group-hover:rotate-6 transition-transform" />
                {sidebarExpanded && (
                    <div className="flex flex-col items-start overflow-hidden">
                        <span className="font-black tracking-[0.4em] text-[12px] uppercase whitespace-nowrap">TITAN_INDEX</span>
                        <span className="text-[8px] text-gray-700 tracking-[0.2em] uppercase font-bold">Player_Registry</span>
                    </div>
                )}
                {currentView === "PLAYER_DATABASE" && <motion.div layoutId="nav-glow" className="absolute inset-0 bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem]" />}
             </button>

             {/* NAV_ITEM: WORLD_RECON */}
             <button onClick={() => setCurrentView("LIVE_MAP")} className={cn("w-full flex items-center gap-10 p-7 rounded-[2rem] transition-all relative group", currentView === "LIVE_MAP" ? "text-cyan-400" : "text-gray-600 hover:text-white")}>
                <Map size={32} className="shrink-0 group-hover:rotate-6 transition-transform" />
                {sidebarExpanded && (
                    <div className="flex flex-col items-start overflow-hidden">
                        <span className="font-black tracking-[0.4em] text-[12px] uppercase whitespace-nowrap">WORLD_RECON</span>
                        <span className="text-[8px] text-gray-700 tracking-[0.2em] uppercase font-bold">Live_Coordinates</span>
                    </div>
                )}
                {currentView === "LIVE_MAP" && <motion.div layoutId="nav-glow" className="absolute inset-0 bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem]" />}
             </button>

             {/* NAV_ITEM: NEXUS_TRADE */}
             <button onClick={() => setCurrentView("MARKETPLACE")} className={cn("w-full flex items-center gap-10 p-7 rounded-[2rem] transition-all relative group", currentView === "MARKETPLACE" ? "text-cyan-400" : "text-gray-600 hover:text-white")}>
                <ShoppingBag size={32} className="shrink-0 group-hover:rotate-6 transition-transform" />
                {sidebarExpanded && (
                    <div className="flex flex-col items-start overflow-hidden">
                        <span className="font-black tracking-[0.4em] text-[12px] uppercase whitespace-nowrap">NEXUS_TRADE</span>
                        <span className="text-[8px] text-gray-700 tracking-[0.2em] uppercase font-bold">Virtual_Economy</span>
                    </div>
                )}
                {currentView === "MARKETPLACE" && <motion.div layoutId="nav-glow" className="absolute inset-0 bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem]" />}
             </button>

             {/* NAV_ITEM: STAFF_UPLINK */}
             <button onClick={() => setCurrentView("COMMAND_CENTER")} className={cn("w-full flex items-center gap-10 p-7 rounded-[2rem] transition-all relative group", currentView === "COMMAND_CENTER" ? "text-red-500" : "text-gray-600 hover:text-white")}>
                <ShieldAlert size={32} className="shrink-0 group-hover:rotate-6 transition-transform" />
                {sidebarExpanded && (
                    <div className="flex flex-col items-start overflow-hidden">
                        <span className="font-black tracking-[0.4em] text-[12px] uppercase whitespace-nowrap">STAFF_UPLINK</span>
                        <span className="text-[8px] text-gray-700 tracking-[0.2em] uppercase font-bold">Root_Access</span>
                    </div>
                )}
                {currentView === "COMMAND_CENTER" && <motion.div layoutId="nav-glow" className="absolute inset-0 bg-red-500/5 border border-red-500/20 rounded-[2rem]" />}
             </button>
          </nav>
        </div>

        {/* SIDEBAR FOOTER: TELEMETRY */}
        <div className="px-12 space-y-12">
           <div className="h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
           <div className="space-y-8 pb-10">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.6em] text-gray-800">
                 <span>UPLINK</span>
                 <span className="text-cyan-500">ACTIVE</span>
              </div>
              <div className="grid grid-cols-4 gap-3 h-20 items-end">
                 {[40, 70, 45, 90, 65, 80, 50, 100, 30, 60, 40, 85].map((h, i) => (
                    <motion.div 
                      key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                      transition={{ duration: 1 + (i * 0.1), repeat: Infinity, repeatType: 'reverse' }}
                      className="w-full bg-cyan-500/20 rounded-t-sm" 
                    />
                 ))}
              </div>
              <div className="flex justify-between text-[8px] font-black text-gray-800 tracking-widest uppercase">
                 <span>Latency</span>
                 <span>{latency}ms</span>
              </div>
           </div>
        </div>
      </motion.aside>

      {/* 🌌 MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        
        {/* HEADER: INDUSTRIAL SCALE */}
        <header className="px-20 py-16 border-b border-white/5 bg-[#040406]/90 backdrop-blur-3xl flex items-center justify-between">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-6">
                <motion.h1 
                initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="text-7xl font-black italic tracking-tighter uppercase leading-none"
                >
                Norden<span className="text-cyan-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]">MC</span>
                </motion.h1 >
                <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.4em] text-cyan-400 uppercase">
                    Singularity_V12.5
                </div>
            </div>
            <div className="flex items-center gap-5">
              <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_15px_#22c55e] animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[1em] text-gray-700">NODE_CENTRAL_UPLINK_STABLE</span>
            </div>
          </div>

          <div className="flex items-center gap-16">
            <div className="relative group hidden 2xl:block">
               <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-cyan-400 transition-colors" size={28} />
               <input 
                 type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="SCAN_NEXUS_INFRASTRUCTURE..."
                 className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] py-8 pl-20 pr-12 outline-none focus:border-cyan-500/50 w-[600px] text-[12px] font-black tracking-[0.4em] uppercase transition-all shadow-3xl focus:shadow-cyan-500/10 placeholder:text-gray-900"
               />
               <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-3">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-black text-gray-800">ESC</span>
               </div>
            </div>
            
            <div className="flex gap-8">
               <motion.button whileHover={{ scale: 1.08 }} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] text-gray-600 hover:text-cyan-400 transition-all shadow-2xl group">
                  <Settings size={30} className="group-hover:rotate-90 transition-transform" />
               </motion.button>
               <motion.button 
                 whileHover={{ scale: 1.08, boxShadow: "0 0 50px rgba(6,182,212,0.4)" }}
                 className="bg-cyan-500 text-black px-20 py-8 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.6em] shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all"
               >
                  CONNECT_SYNC
               </motion.button>
            </div>
          </div>
        </header>

        {/* --- MAIN SCROLL AREA (EXPANDED CONTENT) --- */}
        <div className="flex-1 overflow-y-auto p-20 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            
            {/* VIEW 01: SYSTEM CORE DASHBOARD (EXTREMELY DETAILED) */}
            {currentView === "SYSTEM_CORE" && (
              <motion.div key="core" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: 30 }} className="space-y-24">
                
                {/* PRIMARY TELEMETRY TITAN BLOCK */}
                <div className="grid grid-cols-12 gap-12">
                  <div className="col-span-12 2xl:col-span-9 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent border border-white/10 rounded-[6rem] p-28 relative overflow-hidden group shadow-[0_50px_150px_rgba(0,0,0,0.5)]">
                    <div className="relative z-10 space-y-16">
                      <div className="w-28 h-28 bg-cyan-500/10 rounded-[3rem] flex items-center justify-center border border-cyan-500/30 shadow-[0_0_60px_rgba(34,211,238,0.2)]">
                         <Cpu className="text-cyan-500" size={56} />
                      </div>
                      <div className="space-y-8">
                        <h2 className="text-[12rem] font-black italic uppercase tracking-tighter leading-[0.8]">
                          TITAN<br/><span className="text-cyan-500 text-[14rem] drop-shadow-[0_0_50px_rgba(6,182,212,0.4)]">CORE</span>
                        </h2>
                        <div className="flex items-center gap-12 pt-4">
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-800 text-[10px] font-black tracking-[0.5em] uppercase">Architecture</p>
                                <p className="text-3xl font-black italic uppercase tracking-tighter">Singularity_OS</p>
                            </div>
                            <div className="w-[2px] h-16 bg-white/5" />
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-800 text-[10px] font-black tracking-[0.5em] uppercase">Node_Stability</p>
                                <p className="text-3xl font-black italic uppercase tracking-tighter text-green-500">OPTIMIZED_100%</p>
                            </div>
                            <div className="w-[2px] h-16 bg-white/5" />
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-800 text-[10px] font-black tracking-[0.5em] uppercase">Global_Uptime</p>
                                <p className="text-3xl font-black italic uppercase tracking-tighter">{uptime}</p>
                            </div>
                        </div>
                        <p className="max-w-3xl text-gray-700 font-bold uppercase tracking-[0.4em] text-sm leading-[2] italic">
                          Infrastructure expansion protocol engaged. Tracking {players.length} entities across 14 server shards. All systems nominal. Global telemetry broadcast is live.
                        </p>
                      </div>
                      <div className="flex gap-10 pt-10">
                        <button className="px-20 py-10 bg-cyan-500 text-black rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.8em] hover:scale-110 transition-all shadow-[0_20px_60px_rgba(6,182,212,0.3)]">
                          SYSTEM_OVERRIDE
                        </button>
                        <button className="px-20 py-10 bg-white/5 border border-white/10 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.8em] hover:bg-white/10 transition-all">
                          DATA_HARVEST
                        </button>
                      </div>
                    </div>
                    {/* DECORATIVE BACKGROUND */}
                    <Globe size={1000} className="absolute -right-60 -bottom-60 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-[15s] rotate-12 group-hover:rotate-[90deg] pointer-events-none" />
                    <div className="absolute top-16 right-16 flex flex-col items-end gap-6 text-right">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-800 tracking-widest uppercase">Encryption</p>
                            <p className="text-xl font-black italic uppercase tracking-tighter text-cyan-500">AES_256_RSA</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-800 tracking-widest uppercase">Uplink_ID</p>
                            <p className="text-xl font-black italic uppercase tracking-tighter">NODE_01_UTKARSH</p>
                        </div>
                    </div>
                  </div>

                  {/* SIDEBAR WIDGETS (VERTICAL GRID) */}
                  <div className="col-span-12 2xl:col-span-3 grid grid-rows-3 gap-12">
                    
                    {/* TPS WIDGET */}
                    <div className="bg-[#030305] border border-white/5 p-16 rounded-[4.5rem] flex flex-col justify-between hover:border-green-500/30 transition-all group shadow-2xl relative overflow-hidden">
                       <div className="flex justify-between items-start">
                          <p className="text-[12px] font-black text-gray-800 tracking-[0.6em] uppercase flex items-center gap-4">
                             <Zap size={16} className="text-green-500" /> Ticks_Per_Sec
                          </p>
                          <Activity size={24} className="text-gray-800 group-hover:text-green-500/50 transition-colors" />
                       </div>
                       <div className="flex items-end gap-6">
                          <p className="text-9xl font-black italic text-green-400 leading-none tracking-tighter">{tps}</p>
                          <span className="text-gray-800 font-black text-3xl mb-4 tracking-widest">HZ</span>
                       </div>
                       <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-8">
                          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]" />
                       </div>
                    </div>

                    {/* LATENCY WIDGET */}
                    <div className="bg-[#030305] border border-white/5 p-16 rounded-[4.5rem] flex flex-col justify-between hover:border-cyan-500/30 transition-all group shadow-2xl relative overflow-hidden">
                       <div className="flex justify-between items-start">
                          <p className="text-[12px] font-black text-gray-800 tracking-[0.6em] uppercase flex items-center gap-4">
                             <Radio size={16} className="text-cyan-500" /> Global_Ping
                          </p>
                          <Wifi size={24} className="text-gray-800 group-hover:text-cyan-500/50 transition-colors" />
                       </div>
                       <div className="flex items-end gap-6">
                          <p className="text-9xl font-black italic text-cyan-400 leading-none tracking-tighter">{latency}</p>
                          <span className="text-gray-800 font-black text-3xl mb-4 tracking-widest">MS</span>
                       </div>
                       <div className="flex gap-2 h-2 mt-8">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ delay: i * 0.1, repeat: Infinity }} className="flex-1 bg-cyan-500/20 rounded-full" />
                            ))}
                       </div>
                    </div>

                    {/* LOAD WIDGET */}
                    <div className="bg-[#030305] border border-white/5 p-16 rounded-[4.5rem] flex flex-col justify-between hover:border-purple-500/30 transition-all group shadow-2xl relative overflow-hidden">
                       <div className="flex justify-between items-start">
                          <p className="text-[12px] font-black text-gray-800 tracking-[0.6em] uppercase flex items-center gap-4">
                             <Monitor size={16} className="text-purple-500" /> Cluster_Load
                          </p>
                          <Cpu size={24} className="text-gray-800 group-hover:text-purple-500/50 transition-colors" />
                       </div>
                       <div className="flex items-end gap-6">
                          <p className="text-9xl font-black italic text-purple-400 leading-none tracking-tighter">{cpuLoad.toFixed(1)}</p>
                          <span className="text-gray-800 font-black text-3xl mb-4 tracking-widest">%</span>
                       </div>
                       <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-8">
                          <motion.div animate={{ width: `${cpuLoad}%` }} className="h-full bg-purple-500 shadow-[0_0_15px_#a855f7]" />
                       </div>
                    </div>

                  </div>
                </div>

                {/* DEEP METRICS (4 COLUMN GRID - FULLY EXPANDED) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                   
                   {/* RAM BLOCK */}
                   <div className="bg-[#030305]/50 border border-white/5 p-14 rounded-[4rem] space-y-10 shadow-inner group hover:bg-white/[0.02] transition-all">
                      <div className="flex justify-between items-center">
                         <div className="p-5 bg-yellow-500/10 rounded-[1.8rem]"><HardDrive className="text-yellow-500" size={32} /></div>
                         <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest">Resource_State</span>
                            <span className="text-xs font-black text-yellow-500">NOMINAL</span>
                         </div>
                      </div>
                      <div className="space-y-4">
                         <p className="text-[11px] font-black text-gray-800 uppercase tracking-[0.4em]">MEMORY_ALLOCATION</p>
                         <p className="text-6xl font-black italic tracking-tighter">{ramUsed}<span className="text-xl ml-3 text-gray-800">/ {ramTotal} GB</span></p>
                      </div>
                      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative">
                         <motion.div animate={{ width: `${(parseFloat(ramUsed)/parseFloat(ramTotal))*100}%` }} className="h-full bg-yellow-500 shadow-[0_0_20px_#eab308]" />
                         <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
                      </div>
                   </div>

                   {/* THREAD BLOCK */}
                   <div className="bg-[#030305]/50 border border-white/5 p-14 rounded-[4rem] space-y-10 shadow-inner group hover:bg-white/[0.02] transition-all">
                      <div className="flex justify-between items-center">
                         <div className="p-5 bg-pink-500/10 rounded-[1.8rem]"><Layers className="text-pink-500" size={32} /></div>
                         <TrendingUp className="text-gray-800" size={24} />
                      </div>
                      <div className="space-y-4">
                         <p className="text-[11px] font-black text-gray-800 uppercase tracking-[0.4em]">ACTIVE_THREADS</p>
                         <p className="text-6xl font-black italic tracking-tighter">{activeThreads}<span className="text-xl ml-3 text-gray-800">PROCESSES</span></p>
                      </div>
                      <div className="flex gap-2 h-3">
                         {[40, 80, 60, 90, 50, 70, 100].map((v, i) => (
                            <motion.div 
                              key={i} animate={{ height: '100%', opacity: [0.3, 1, 0.3] }} 
                              transition={{ delay: i * 0.1, repeat: Infinity }}
                              className="flex-1 bg-pink-500 rounded-full" 
                            />
                         ))}
                      </div>
                   </div>

                   {/* DATA IN BLOCK */}
                   <div className="bg-[#030305]/50 border border-white/5 p-14 rounded-[4rem] space-y-10 shadow-inner group hover:bg-white/[0.02] transition-all">
                      <div className="flex justify-between items-center">
                         <div className="p-5 bg-emerald-500/10 rounded-[1.8rem]"><HardDriveDownload className="text-emerald-500" size={32} /></div>
                         <Network className="text-gray-800" size={24} />
                      </div>
                      <div className="space-y-4">
                         <p className="text-[11px] font-black text-gray-800 uppercase tracking-[0.4em]">INGRESS_DATA</p>
                         <p className="text-6xl font-black italic tracking-tighter">{networkDown}<span className="text-xl ml-3 text-gray-800">MB/s</span></p>
                      </div>
                      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                         <motion.div animate={{ width: '65%' }} className="h-full bg-emerald-500 shadow-[0_0_20px_#10b981]" />
                      </div>
                   </div>

                   {/* DATA OUT BLOCK */}
                   <div className="bg-[#030305]/50 border border-white/5 p-14 rounded-[4rem] space-y-10 shadow-inner group hover:bg-white/[0.02] transition-all">
                      <div className="flex justify-between items-center">
                         <div className="p-5 bg-blue-500/10 rounded-[1.8rem]"><HardDriveUpload className="text-blue-500" size={32} /></div>
                         <Share2 className="text-gray-800" size={24} />
                      </div>
                      <div className="space-y-4">
                         <p className="text-[11px] font-black text-gray-800 uppercase tracking-[0.4em]">EGRESS_DATA</p>
                         <p className="text-6xl font-black italic tracking-tighter">{networkUp}<span className="text-xl ml-3 text-gray-800">MB/s</span></p>
                      </div>
                      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                         <motion.div animate={{ width: '42%' }} className="h-full bg-blue-500 shadow-[0_0_20px_#3b82f6]" />
                      </div>
                   </div>

                </div>

                {/* INFRASTRUCTURE HEATMAP (TITAN SCALE) */}
                <div className="bg-[#020204] border border-white/5 p-24 rounded-[6rem] space-y-20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
                   <div className="flex items-center justify-between relative z-10">
                      <div className="space-y-4">
                        <h3 className="text-6xl font-black italic uppercase tracking-tighter leading-none">Sub-Node Packet Density</h3>
                        <p className="text-[12px] font-black uppercase tracking-[0.6em] text-gray-800">Visualizing 1,000,000+ packets across NordenMC backbone</p>
                      </div>
                      <div className="flex gap-10">
                         <div className="flex items-center gap-4">
                            <div className="w-4 h-4 rounded bg-cyan-500/10 border border-cyan-500/40" />
                            <span className="text-[10px] font-black tracking-[0.2em] text-gray-700">Idle_Node</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="w-4 h-4 rounded bg-cyan-500" />
                            <span className="text-[10px] font-black tracking-[0.2em] text-gray-700">Saturated_Node</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-20 gap-3 h-[450px] relative z-10">
                      {Array.from({ length: 160 }).map((_, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1, 
                            backgroundColor: Math.random() > 0.8 ? 'rgba(6,182,212,0.8)' : 'rgba(255,255,255,0.02)'
                          }}
                          transition={{ delay: i * 0.005 }}
                          whileHover={{ scale: 1.5, zIndex: 50, backgroundColor: 'rgba(6,182,212,1)', boxShadow: '0 0 20px #06b6d4' }}
                          className="w-full h-full rounded-sm cursor-none transition-all duration-300"
                        />
                      ))}
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/[0.02] to-transparent pointer-events-none" />
                </div>
              </motion.div>
            )}

            {/* VIEW 02: TITAN INDEX (PLAYER DATABASE) - THE MASSIVE UNCOMPRESSED LIST */}
            {currentView === "PLAYER_DATABASE" && (
              <motion.div key="db" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="space-y-24">
                
                {/* COMPLEX TITAN FILTER BAR */}
                <div className="flex flex-wrap items-center justify-between gap-12 bg-[#030305] border border-white/5 p-12 rounded-[4rem] px-20 shadow-3xl">
                   <div className="flex flex-wrap gap-6">
                      <button onClick={() => setKitFilter("OVERALL")} className={cn("px-14 py-6 rounded-[1.8rem] text-[11px] font-black tracking-[0.4em] uppercase transition-all", kitFilter === "OVERALL" ? "bg-cyan-500 text-black shadow-2xl" : "bg-white/5 text-gray-600 hover:text-white")}>OVERALL_INDEX</button>
                      <button onClick={() => setKitFilter("CRYSTAL")} className={cn("px-14 py-6 rounded-[1.8rem] text-[11px] font-black tracking-[0.4em] uppercase transition-all", kitFilter === "CRYSTAL" ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-600 hover:text-white")}>CRYSTAL_TIER</button>
                      <button onClick={() => setKitFilter("SWORD")} className={cn("px-14 py-6 rounded-[1.8rem] text-[11px] font-black tracking-[0.4em] uppercase transition-all", kitFilter === "SWORD" ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-600 hover:text-white")}>SWORD_LEGACY</button>
                      <button onClick={() => setKitFilter("UHC")} className={cn("px-14 py-6 rounded-[1.8rem] text-[11px] font-black tracking-[0.4em] uppercase transition-all", kitFilter === "UHC" ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-600 hover:text-white")}>UHC_ELITE</button>
                      <button onClick={() => setKitFilter("AXE")} className={cn("px-14 py-6 rounded-[1.8rem] text-[11px] font-black tracking-[0.4em] uppercase transition-all", kitFilter === "AXE" ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-600 hover:text-white")}>AXE_COMBAT</button>
                   </div>
                   <div className="flex items-center gap-8">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-gray-800 tracking-widest">Database_Sync</span>
                        <span className="text-xs font-black text-green-500 uppercase">Real_Time_OK</span>
                      </div>
                      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-600 hover:text-cyan-400 cursor-pointer">
                        <Filter size={24} />
                      </div>
                   </div>
                </div>

                {/* THE UNCOMPRESSED TITAN LIST */}
                <div className="grid grid-cols-1 gap-12 pb-32">
                   {players.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) && (kitFilter === "OVERALL" || p.kit === kitFilter)).map((p, idx) => (
                     <motion.div 
                       key={p.uuid}
                       initial={{ opacity: 0, y: 50 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: idx * 0.1 }}
                       onClick={() => setSelectedPlayer(p)}
                       className="bg-[#030305]/60 border border-white/5 p-16 rounded-[5rem] flex items-center justify-between hover:bg-[#040408] hover:border-cyan-500/40 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-all group cursor-none relative overflow-hidden"
                     >
                        {/* DECORATIVE BACKGROUND TEXT (PLAYER NAME) */}
                        <span className="absolute right-20 top-1/2 -translate-y-1/2 text-[18rem] font-black text-white/[0.01] uppercase italic tracking-tighter select-none pointer-events-none group-hover:text-cyan-500/[0.02] transition-colors">
                            {p.name}
                        </span>

                        <div className="flex items-center gap-20 relative z-10">
                           {/* RANKING BLOCK */}
                           <div className="w-32 text-center">
                                <span className="text-gray-900 font-black text-2xl uppercase tracking-[0.2em] group-hover:text-cyan-500/20 block mb-2 transition-colors">Rank</span>
                                <span className="text-8xl font-black italic text-white/95 group-hover:text-cyan-500 transition-all">#{p.rank}</span>
                           </div>

                           {/* AVATAR BLOCK */}
                           <div className="relative">
                              <div className="absolute inset-0 bg-cyan-500 blur-[40px] opacity-0 group-hover:opacity-20 transition-all rounded-full" />
                              <img src={`https://mc-heads.net/avatar/${p.name}/200`} className="w-32 h-32 rounded-[3.5rem] relative z-10 border-4 border-white/5 grayscale group-hover:grayscale-0 group-hover:rotate-6 transition-all duration-500" alt="" />
                              <div className={cn("absolute -bottom-3 -right-3 w-10 h-10 rounded-full border-[6px] border-[#030305] z-20", p.status === 'online' ? "bg-green-500 shadow-[0_0_15px_#22c55e]" : "bg-gray-800")} />
                           </div>

                           {/* INFO BLOCK */}
                           <div className="space-y-4">
                              <div className="flex items-center gap-6">
                                <h3 className="text-6xl font-black italic uppercase tracking-tighter group-hover:text-cyan-400 transition-all">{p.name}</h3>
                                {p.role === 'ADMIN' && <ShieldCheck size={32} className="text-red-500" />}
                              </div>
                              <div className="flex gap-10">
                                 <span className="flex items-center gap-3 text-[11px] font-black text-gray-700 tracking-[0.5em] uppercase"><Sword size={14} className="text-cyan-500" /> {p.kit}</span>
                                 <span className="flex items-center gap-3 text-[11px] font-black text-gray-700 tracking-[0.5em] uppercase"><Target size={14} className="text-purple-500" /> ELO: {p.stats.elo}</span>
                                 <span className="flex items-center gap-3 text-[11px] font-black text-gray-700 tracking-[0.5em] uppercase"><History size={14} className="text-yellow-500" /> {p.playtime}</span>
                              </div>
                              <div className="flex gap-4 pt-2">
                                 {p.tags.map(tag => (
                                     <span key={tag} className="px-5 py-1.5 bg-white/5 border border-white/5 rounded-full text-[8px] font-black tracking-widest text-gray-600 group-hover:border-cyan-500/20 group-hover:text-cyan-500/60 transition-all">{tag}</span>
                                 ))}
                              </div>
                           </div>
                        </div>

                        {/* STATS PREVIEW BLOCK */}
                        <div className="flex items-center gap-24 relative z-10">
                           <div className="hidden lg:grid grid-cols-3 gap-16 mr-16 text-center">
                              <div className="space-y-2">
                                 <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">TOTAL_ELIMINATIONS</p>
                                 <p className="text-4xl font-black italic text-white/90">{p.stats.kills}</p>
                              </div>
                              <div className="space-y-2">
                                 <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">NETWORK_K/D</p>
                                 <p className="text-4xl font-black italic text-cyan-500">{p.stats.kd}</p>
                              </div>
                              <div className="space-y-2">
                                 <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">WIN_PROBABILITY</p>
                                 <p className="text-4xl font-black italic text-white/90">{p.stats.winRate}</p>
                              </div>
                           </div>
                           
                           {/* TIER BADGE */}
                           <div className={cn(
                             "px-20 py-10 rounded-[2.5rem] font-black text-6xl italic tracking-tighter border-4 shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3",
                             p.tier.includes('HT1') ? "text-red-500 border-red-500/30 bg-red-500/10 shadow-red-500/10" : "text-cyan-400 border-cyan-400/30 bg-cyan-400/10 shadow-cyan-400/10"
                           )}>
                             {p.tier}
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>
              </motion.div>
            )}

            {/* VIEW 03: STAFF COMMAND CENTER (UNCOMPRESSED INDUSTRIAL TERMINAL) */}
            {currentView === "COMMAND_CENTER" && (
              <motion.div key="staff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1400px] mx-auto pt-12 space-y-20 pb-40">
                 
                 {!isStaffAuthed ? (
                   <div className="flex flex-col items-center justify-center space-y-16 py-48 bg-[#020204]/80 border border-white/5 rounded-[8rem] shadow-[0_100px_200px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
                      <motion.div animate={{ rotateY: 360, boxShadow: ["0 0 50px rgba(6,182,212,0)", "0 0 50px rgba(6,182,212,0.4)", "0 0 50px rgba(6,182,212,0)"] }} transition={{ duration: 10, repeat: Infinity }} className="p-16 bg-white/[0.03] border border-white/10 rounded-[5rem] relative">
                         <Lock size={120} className="text-cyan-500" />
                         <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full" />
                      </motion.div>
                      <div className="text-center space-y-8">
                         <h2 className="text-[10rem] font-black italic uppercase tracking-tighter leading-none">STAFF <span className="text-cyan-500">ROOT</span></h2>
                         <p className="text-gray-800 font-black uppercase tracking-[1.2em] text-[12px]">CRYPTO_HANDSHAKE_REQUIRED_FOR_NODE_ACCESS</p>
                      </div>
                      <div className="w-full max-w-2xl relative">
                        <input 
                            type="password" autoFocus
                            placeholder="TRANSMIT_KEY"
                            value={authInput}
                            onChange={(e) => setAuthInput(e.target.value)}
                            onKeyDown={(e) => {
                            if(e.key === 'Enter' && authInput === 'UTKARSH_NEXUS_2026') {
                                setIsStaffAuthed(true);
                                pushLog("ROOT_ACCESS_GRANTED: ADMIN_01", "success");
                            }
                            }}
                            className="w-full bg-[#030305] border border-white/10 rounded-[3.5rem] py-12 text-center text-7xl tracking-[1.5em] outline-none focus:border-cyan-500 transition-all placeholder:text-gray-900 shadow-2xl"
                        />
                        <p className="text-center pt-10 text-red-500/40 font-black text-[10px] uppercase tracking-[0.8em]">Unauthorized access attempts will be logged to play.nordenmc.com</p>
                      </div>
                   </div>
                 ) : (
                   <div className="space-y-16">
                      {/* ADMIN DASHBOARD HEADER */}
                      <div className="grid grid-cols-4 gap-12">
                         <div className="bg-[#030305] border border-white/5 p-12 rounded-[4rem] space-y-6 shadow-2xl group hover:border-cyan-500/30 transition-all">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Active_Staff</span>
                                <Users size={20} className="text-cyan-500" />
                            </div>
                            <p className="text-8xl font-black italic text-cyan-400 leading-none">08</p>
                         </div>
                         <div className="bg-[#030305] border border-white/5 p-12 rounded-[4rem] space-y-6 shadow-2xl group hover:border-red-500/30 transition-all">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Reports_Queue</span>
                                <ShieldAlert size={20} className="text-red-500" />
                            </div>
                            <p className="text-8xl font-black italic text-red-500 leading-none">02</p>
                         </div>
                         <div className="bg-[#030305] border border-white/5 p-12 rounded-[4rem] space-y-6 shadow-2xl group hover:border-yellow-500/30 transition-all">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Recent_Bans</span>
                                <Skull size={20} className="text-yellow-500" />
                            </div>
                            <p className="text-8xl font-black italic text-yellow-500 leading-none">124</p>
                         </div>
                         <div className="bg-[#030305] border border-white/5 p-12 rounded-[4rem] space-y-6 shadow-2xl group hover:border-green-500/30 transition-all">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Sync_Status</span>
                                <Globe size={20} className="text-green-500" />
                            </div>
                            <p className="text-8xl font-black italic text-green-500 leading-none">100%</p>
                         </div>
                      </div>

                      {/* THE INDUSTRIAL CONSOLE (600px Height, Raw Terminal) */}
                      <div className="bg-[#000000] border border-white/10 rounded-[5rem] h-[800px] flex flex-col overflow-hidden font-mono shadow-[0_80px_200px_rgba(0,0,0,1)] border-t-cyan-500/40">
                         {/* TERMINAL HEADER */}
                         <div className="bg-white/5 px-16 py-8 border-b border-white/5 flex items-center justify-between backdrop-blur-3xl">
                            <div className="flex gap-6">
                               <div className="w-5 h-5 rounded-full bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                               <div className="w-5 h-5 rounded-full bg-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                               <div className="w-5 h-5 rounded-full bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            </div>
                            <div className="flex items-center gap-6">
                                <TerminalIcon size={18} className="text-cyan-500" />
                                <span className="text-[13px] font-black text-gray-700 tracking-[0.8em]">NORDEN_TITAN_TERMINAL_01_ROOT</span>
                            </div>
                            <div className="text-[11px] text-gray-800 font-black">UTKARSH_PANDEY@TITAN</div>
                         </div>

                         {/* TERMINAL OUTPUT STREAM */}
                         <div className="flex-1 overflow-y-auto p-16 space-y-4 custom-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.98]">
                            {terminalHistory.map((log) => (
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                key={log.id} 
                                className="flex gap-10 group"
                              >
                                <span className="text-gray-800 select-none text-sm min-w-[120px]">[{log.timestamp}]</span>
                                <span className="text-cyan-900/40 select-none text-sm min-w-[100px] font-black uppercase">@{log.node}</span>
                                <span className={cn(
                                  "tracking-[0.1em] uppercase font-bold text-sm leading-relaxed",
                                  log.type === 'system' && "text-cyan-400",
                                  log.type === 'user' && "text-white",
                                  log.type === 'error' && "text-red-500",
                                  log.type === 'success' && "text-green-400",
                                  log.type === 'warning' && "text-yellow-500",
                                  log.type === 'critical' && "text-red-600 animate-pulse font-black",
                                  log.type === 'alert' && "text-purple-400 italic"
                                )}>
                                  <span className="opacity-50 mr-6">{log.type === 'user' ? '❯' : '▶'}</span>
                                  {log.text}
                                </span>
                              </motion.div>
                            ))}
                            <div ref={terminalEndRef} />
                         </div>

                         {/* TERMINAL INPUT PROMPT */}
                         <div className="p-14 bg-white/[0.03] border-t border-white/5 flex items-center gap-10">
                            <div className="flex items-center gap-4 text-cyan-500 font-black">
                                <TerminalSquare size={36} />
                                <span className="text-xl">UTKARSH@TITAN:~$</span>
                            </div>
                            <input 
                              autoFocus
                              value={cmdInput} onChange={(e) => setCmdInput(e.target.value)} onKeyDown={executeCommand}
                              className="bg-transparent border-none outline-none flex-1 text-white font-black uppercase tracking-[0.4em] text-2xl placeholder:text-gray-900"
                              placeholder="TRANSMIT_TITAN_COMMAND..."
                            />
                            <div className="flex gap-4">
                                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-700 font-black">CTRL+C</div>
                                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-700 font-black">ENTER_SEND</div>
                            </div>
                         </div>
                      </div>
                   </div>
                 )}
              </motion.div>
            )}

            {/* VIEW 04: WORLD RECON (LIVE RADAR SYSTEM) */}
            {currentView === "LIVE_MAP" && (
              <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[900px] bg-[#020204] border border-white/5 rounded-[6rem] relative overflow-hidden flex items-center justify-center shadow-[0_50px_150px_rgba(0,0,0,1)]">
                 {/* GRID ENGINE */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:120px_120px]" />
                 
                 <div className="relative">
                    {/* INDUSTRIAL RADAR RINGS (HARD-CODED) */}
                    <div className="w-[850px] h-[850px] border border-cyan-500/5 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-cyan-500/2 rounded-full blur-[100px]" />
                        <div className="w-[650px] h-[650px] border border-cyan-500/10 rounded-full flex items-center justify-center">
                            <div className="w-[450px] h-[450px] border border-cyan-500/20 rounded-full flex items-center justify-center">
                                <div className="w-[250px] h-[250px] border border-cyan-500/40 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* ROTATING SCANNER HEAD */}
                    <motion.div 
                      animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-transparent rounded-full origin-center z-10"
                    />
                    
                    {/* LIVE PLAYER BLIPS (UNCOMPRESSED LOGIC) */}
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-[20%] left-[30%] w-6 h-6 bg-cyan-400 rounded-full shadow-[0_0_40px_#22d3ee] z-20 flex items-center justify-center text-[8px] font-black text-black">U1</motion.div>
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.8 }} className="absolute bottom-[25%] right-[20%] w-6 h-6 bg-purple-500 rounded-full shadow-[0_0_40px_#a855f7] z-20 flex items-center justify-center text-[8px] font-black text-black">U3</motion.div>
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} className="absolute top-[40%] right-[35%] w-6 h-6 bg-red-500 rounded-full shadow-[0_0_40px_#ef4444] z-20 flex items-center justify-center text-[8px] font-black text-black">EN</motion.div>
                    
                    {/* CENTER HUD */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-8 z-30">
                       <Globe size={180} className="text-cyan-500/20 mx-auto animate-pulse" />
                       <div className="space-y-3">
                          <p className="text-[14px] font-black uppercase tracking-[2em] text-cyan-500">SCANNING_WORLD</p>
                          <p className="text-[10px] font-black uppercase tracking-[0.8em] text-gray-800 italic">LOCATION: OVERWORLD_ROOT_X0_Z0</p>
                       </div>
                    </div>
                 </div>

                 {/* RECON SIDEBAR INTERFACE */}
                 <div className="absolute bottom-20 left-20 p-16 bg-[#030305]/90 backdrop-blur-3xl border border-white/10 rounded-[4rem] space-y-10 w-[450px] shadow-3xl">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-cyan-500 text-black rounded-2xl"><Target size={32} /></div>
                        <h4 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Norden_Recon</h4>
                    </div>
                    <div className="space-y-6 pt-4">
                       <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <span className="text-[12px] font-black text-gray-800 uppercase tracking-widest">Active_Combat_Zones</span>
                          <span className="text-cyan-500 font-black text-2xl tracking-tighter">14</span>
                       </div>
                       <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <span className="text-[12px] font-black text-gray-800 uppercase tracking-widest">Hostile_Entity_Count</span>
                          <span className="text-red-500 font-black text-2xl tracking-tighter">1,204</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-[12px] font-black text-gray-800 uppercase tracking-widest">Signal_Strength</span>
                          <span className="text-green-500 font-black text-2xl tracking-tighter">MAX</span>
                       </div>
                    </div>
                    <button className="w-full bg-white/5 border border-white/10 py-8 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.6em] hover:bg-cyan-500 hover:text-black transition-all shadow-xl">
                       INITIATE_DEEP_SCAN
                    </button>
                 </div>

                 {/* TOP DATA OVERLAY */}
                 <div className="absolute top-20 right-20 flex gap-8">
                    <div className="px-10 py-4 bg-black/60 border border-white/5 rounded-3xl backdrop-blur-xl space-y-1">
                        <p className="text-[8px] font-black text-gray-800 tracking-widest uppercase">Target_ID</p>
                        <p className="text-xl font-black italic text-white uppercase">UTKARSH_PANDEY</p>
                    </div>
                    <div className="px-10 py-4 bg-black/60 border border-white/5 rounded-3xl backdrop-blur-xl space-y-1">
                        <p className="text-[8px] font-black text-gray-800 tracking-widest uppercase">Coords</p>
                        <p className="text-xl font-black italic text-cyan-500 uppercase">X: 204 | Z: -1045</p>
                    </div>
                 </div>
              </motion.div>
            )}

            {/* VIEW 05: NEXUS TRADE (UNCOMPRESSED MARKETPLACE) */}
            {currentView === "MARKETPLACE" && (
              <motion.div key="market" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-24 pb-40">
                 
                 {/* MARKET CATEGORIES HEADER */}
                 <div className="flex gap-8 overflow-x-auto pb-6 custom-scrollbar no-scrollbar">
                    {["ALL_ITEMS", "ELITE_WEAPONS", "MYTHIC_ARMOR", "CORE_MATERIALS", "COSMETICS", "LIMITED_COLLECTIBLES"].map(cat => (
                        <button key={cat} className="shrink-0 px-12 py-5 bg-[#030305] border border-white/5 rounded-[2rem] text-[10px] font-black tracking-[0.5em] text-gray-700 hover:text-cyan-400 hover:border-cyan-500/30 transition-all uppercase">
                            {cat}
                        </button>
                    ))}
                 </div>

                 {/* MARKET GRID - HARD-CODED LARGE BLOCKS */}
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
                    {marketItems.map((item) => (
                      <motion.div 
                        key={item.id} whileHover={{ y: -20 }}
                        className="bg-[#030305]/80 border border-white/5 p-12 rounded-[5rem] space-y-10 group hover:border-white/10 transition-all relative overflow-hidden shadow-3xl"
                      >
                         <div className="aspect-square bg-[#050508] rounded-[4rem] flex items-center justify-center relative overflow-hidden border border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img src={item.image} className="w-48 h-48 drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-10 group-hover:scale-125 transition-all duration-700" alt="" />
                            <div className="absolute bottom-8 right-8 text-[8rem] font-black text-white/[0.02] uppercase pointer-events-none select-none italic tracking-tighter">
                                {item.rarity.substring(0, 4)}
                            </div>
                         </div>
                         <div className="space-y-6 px-4">
                            <div className="flex items-center justify-between">
                               <span className={cn(
                                 "px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase border shadow-xl",
                                 item.rarity === 'SINGULARITY' ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                               )}>
                                 {item.rarity}
                               </span>
                               <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest">STOCK: {item.stock}</span>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-4xl font-black italic uppercase tracking-tighter group-hover:text-cyan-400 transition-all">{item.name}</h4>
                                <p className="text-gray-700 font-bold text-[11px] uppercase tracking-widest leading-relaxed italic">{item.description}</p>
                            </div>
                            
                            {/* ITEM SPECIFIC STATS BLOCK */}
                            <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-[2rem]">
                                {item.stats.damage && (
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-black text-gray-800 uppercase tracking-widest">DMG</p>
                                        <p className="text-xl font-black italic text-cyan-500">{item.stats.damage}</p>
                                    </div>
                                )}
                                {item.stats.protection && (
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-black text-gray-800 uppercase tracking-widest">PROT</p>
                                        <p className="text-xl font-black italic text-cyan-500">{item.stats.protection}</p>
                                    </div>
                                )}
                                {item.stats.speed && (
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-black text-gray-800 uppercase tracking-widest">SPD</p>
                                        <p className="text-xl font-black italic text-cyan-500">{item.stats.speed}</p>
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-gray-800 uppercase tracking-widest">WGHT</p>
                                    <p className="text-xl font-black italic text-white">{item.stats.weight || '0.5kg'}</p>
                                </div>
                            </div>

                            <div className="flex items-end justify-between pt-4">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest">Network_Price</span>
                                    <p className="text-5xl font-black italic tracking-tighter text-white/95 group-hover:text-cyan-500 transition-colors">
                                        <span className="text-cyan-500 mr-2">$</span>{item.price}
                                    </p>
                                </div>
                                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-gray-800 hover:text-cyan-500 cursor-pointer transition-colors border border-white/5">
                                    <ExternalLink size={24} />
                                </div>
                            </div>
                         </div>
                         <button className="w-full bg-cyan-500 text-black py-8 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.8em] hover:scale-105 transition-all shadow-3xl shadow-cyan-500/20 active:scale-95">
                            AUTHORIZE_PURCHASE
                         </button>
                      </motion.div>
                    ))}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* --- THE TITAN MODAL SYSTEM (PLAYER INSPECTOR) --- */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-20 bg-black/98 backdrop-blur-[120px]"
            onClick={() => setSelectedPlayer(null)}
          >
             <motion.div 
                layoutId={`player-card-${selectedPlayer.uuid}`}
                className="bg-[#030305] border border-white/10 rounded-[8rem] w-full max-w-[1700px] h-[950px] overflow-hidden relative shadow-[0_150px_300px_rgba(0,0,0,1)] flex flex-col"
                onClick={(e) => e.stopPropagation()}
             >
                {/* MODAL HEADER BLOCK */}
                <div className="px-28 py-16 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <div className="flex items-center gap-10">
                        <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center border border-cyan-500/20">
                            <Shield size={32} className="text-cyan-500" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-800 text-[11px] font-black tracking-[0.8em] uppercase leading-none">Entity_Identification_System</p>
                            <p className="text-4xl font-black italic uppercase tracking-tighter">TITAN_NODE_ACCESS: {selectedPlayer.name}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedPlayer(null)} className="p-10 bg-white/5 rounded-full hover:bg-red-500 hover:text-black transition-all group">
                        <X size={40} className="group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                {/* MODAL BODY (TWO COLUMNS) */}
                <div className="flex-1 grid grid-cols-12 overflow-hidden">
                   
                   {/* MODAL LEFT SIDE: THE TITAN VISUALS */}
                   <div className="col-span-5 bg-[#010103] p-28 flex flex-col items-center justify-center border-r border-white/5 space-y-16 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
                      <div className="relative group">
                         <div className="absolute inset-0 bg-cyan-500 blur-[150px] opacity-20 group-hover:opacity-40 transition-all scale-150 animate-pulse" />
                         <img 
                            src={`https://mc-heads.net/avatar/${selectedPlayer.name}/500`} 
                            className="w-[450px] h-[450px] rounded-[8rem] relative z-10 border-[12px] border-white/5 group-hover:scale-105 transition-all duration-700 shadow-[0_80px_160px_rgba(0,0,0,0.9)]" 
                            alt="" 
                         />
                         <div className="absolute -top-10 -right-10 px-10 py-4 bg-cyan-500 text-black rounded-[2rem] font-black text-2xl italic tracking-tighter z-20 shadow-2xl">
                            {selectedPlayer.tier}
                         </div>
                      </div>
                      <div className="text-center space-y-6 relative z-10">
                        <h2 className="text-[12rem] font-black italic uppercase tracking-tighter leading-none text-white">{selectedPlayer.name}</h2>
                        <div className="flex justify-center gap-6">
                            {selectedPlayer.tags.map(tag => (
                                <span key={tag} className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-black tracking-[0.4em] text-gray-700 uppercase italic">{tag}</span>
                            ))}
                        </div>
                      </div>
                      <div className="absolute bottom-16 left-28 space-y-2 opacity-30">
                        <p className="text-[10px] font-black text-gray-800 tracking-[0.8em] uppercase">Security_Layer</p>
                        <p className="text-xl font-black italic uppercase tracking-tighter">NODE_VERIFIED_100%</p>
                      </div>
                   </div>

                   {/* MODAL RIGHT SIDE: THE DEEP DATA (FULLY EXPANDED) */}
                   <div className="col-span-7 p-28 space-y-20 flex flex-col justify-between overflow-y-auto custom-scrollbar no-scrollbar">
                      
                      {/* TOP STATS CLUSTER */}
                      <div className="space-y-12">
                          <div className="flex items-end justify-between border-b border-white/5 pb-10">
                             <div className="space-y-4">
                                <p className="text-[14px] font-black text-gray-800 tracking-[1em] uppercase">Global_Titan_Rank</p>
                                <p className="text-[15rem] font-black italic tracking-tighter leading-[0.7] text-white/95">#{selectedPlayer.rank}</p>
                             </div>
                             <div className="flex flex-col items-end gap-6 pb-4">
                                <div className="bg-white/5 p-8 rounded-[3rem] border border-white/5 flex items-center gap-6">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] font-black text-gray-800 tracking-widest uppercase">Combat_ELO</span>
                                        <span className="text-4xl font-black italic text-cyan-500 tracking-tighter">{selectedPlayer.stats.elo}</span>
                                    </div>
                                    <Crown size={48} className="text-yellow-500" />
                                </div>
                             </div>
                          </div>

                          {/* DATA GRID (UNCOMPRESSED BLOCKS) */}
                          <div className="grid grid-cols-2 gap-12">
                             <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[4.5rem] flex items-center gap-12 group hover:bg-white/[0.04] transition-all">
                                <div className="w-24 h-24 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center border border-red-500/20 group-hover:rotate-12 transition-transform">
                                    <Skull size={48} className="text-red-500" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-gray-800 uppercase tracking-widest mb-2">Total_Eliminations</p>
                                    <p className="text-6xl font-black italic tracking-tighter leading-none">{selectedPlayer.stats.kills}</p>
                                </div>
                             </div>
                             <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[4.5rem] flex items-center gap-12 group hover:bg-white/[0.04] transition-all">
                                <div className="w-24 h-24 bg-cyan-500/10 rounded-[2.5rem] flex items-center justify-center border border-cyan-500/20 group-hover:rotate-12 transition-transform">
                                    <Activity size={48} className="text-cyan-500" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-gray-800 uppercase tracking-widest mb-2">Kill/Death_Ratio</p>
                                    <p className="text-6xl font-black italic tracking-tighter leading-none text-cyan-500">{selectedPlayer.stats.kd}</p>
                                </div>
                             </div>
                             <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[4.5rem] flex items-center gap-12 group hover:bg-white/[0.04] transition-all">
                                <div className="w-24 h-24 bg-purple-500/10 rounded-[2.5rem] flex items-center justify-center border border-purple-500/20 group-hover:rotate-12 transition-transform">
                                    <Target size={48} className="text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-gray-800 uppercase tracking-widest mb-2">Combat_Success_Rate</p>
                                    <p className="text-6xl font-black italic tracking-tighter leading-none">{selectedPlayer.stats.winRate}</p>
                                </div>
                             </div>
                             <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[4.5rem] flex items-center gap-12 group hover:bg-white/[0.04] transition-all">
                                <div className="w-24 h-24 bg-yellow-500/10 rounded-[2.5rem] flex items-center justify-center border border-yellow-500/20 group-hover:rotate-12 transition-transform">
                                    <History size={48} className="text-yellow-500" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-gray-800 uppercase tracking-widest mb-2">Total_Service_Time</p>
                                    <p className="text-6xl font-black italic tracking-tighter leading-none uppercase">{selectedPlayer.playtime}</p>
                                </div>
                             </div>
                          </div>
                      </div>

                      {/* BOTTOM MODAL ACTIONS */}
                      <div className="pt-12 border-t border-white/5 flex gap-12">
                         <button className="flex-1 bg-cyan-500 text-black py-10 rounded-[3rem] font-black uppercase tracking-[0.8em] text-[12px] hover:scale-105 transition-all shadow-[0_30px_60px_rgba(6,182,212,0.3)]">
                            SEND_COMBAT_REQUEST
                         </button>
                         <button className="flex-1 bg-white/5 border border-white/10 text-white py-10 rounded-[3rem] font-black uppercase tracking-[0.8em] text-[12px] hover:bg-white/10 transition-all">
                            VIEW_FULL_LOGS
                         </button>
                         {isStaffAuthed && (
                           <button className="flex-1 bg-red-500/10 border border-red-500/30 text-red-500 py-10 rounded-[3rem] font-black uppercase tracking-[0.8em] text-[12px] hover:bg-red-500 hover:text-white transition-all">
                              EXECUTE_TERMINATION
                           </button>
                         )}
                      </div>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}