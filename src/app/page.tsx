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
  TrendingDown, Rocket, Eye, Link, Copy, Check, MessageSquare, BookOpen, Shield,
  BellRing, Share, Send, Mail, User, AtSign, UserCheck, UserX, Inbox, Sparkles,
  Command, ShieldQuestion, ZapIcon, Filter, CpuChip, Wifi, Disc, Briefcase,
  HistoryIcon, TerminalSquare, AlertCircle, CheckCircle, ChevronDown, ChevronUp,
  Cpu as CpuIcon, Server, Network, ShieldCloseIcon, Key, FileCode, Monitor,
  Trello, GitBranch, Terminal as TerminalIcon
} from 'lucide-react';

/**
 * ==========================================
 * NORDEN_NEXUS_OS // VERSION 28.0.1
 * DEVELOPER: UTKARSH PANDEY
 * PROTOCOL: OMNI_NEXUS_FULL_SCALE
 * ==========================================
 */

const PASSKEY = "PVP_PROPLE";
const SERVER_IP = "PLAY.NORDENMC.COM";
const SYSTEM_BUILD = "OMNI_NEXUS_BETA_V28";

const MODES = [
  "OVERALL", 
  "LTMs", 
  "Vanilla", 
  "UHC", 
  "Pot", 
  "NethOP", 
  "SMP", 
  "Sword", 
  "Axe", 
  "Mace"
];

// ------------------------------------------
// --- DATA SEEDING (EXPANDED) ---
// ------------------------------------------

const INITIAL_LEADERBOARDS: Record<string, any[]> = {
  OVERALL: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 125000, ip: "192.168.1.1", banned: false, kills: 15400, deaths: 1241, wins: 890, loses: 45 },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 112000, ip: "192.168.1.2", banned: false, kills: 12000, deaths: 1080, wins: 750, loses: 60 },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", statType: "HT1", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 98000, ip: "192.168.1.3", banned: false, kills: 9800, deaths: 1000, wins: 620, loses: 85 },
  ],
  "LTMs": [{ rank: "01", name: "EVENT_KING", tag: "LTM_GOD", statType: "HT1", kd: "15.0", img: "https://mc-heads.net/avatar/Notch/100", xp: 5000, ip: "0.0.0.0", banned: false, kills: 500, deaths: 33 }],
};

// Ensure all modes are initialized to prevent map errors
MODES.forEach(mode => {
  if (!INITIAL_LEADERBOARDS[mode]) {
    INITIAL_LEADERBOARDS[mode] = [];
  }
});

const INITIAL_CLANS = [
  { id: "CLAN_001", name: "GLACIERZ", leader: "Utkarsh", members: 42, power: "98%", dominance: 45, color: "text-cyan-400", discord: "utkarsh#0001", ign: "Utkarsh", email: "admin@nordenmc.com", userIp: "LOCAL_HOST", requests: [] },
  { id: "CLAN_002", name: "DEMON_SQUAD", leader: "Unknown", members: 28, power: "85%", dominance: 30, color: "text-red-500", discord: "demon#6666", ign: "DemonKing", email: "demon@nordenmc.com", userIp: "REMOTE_LINK", requests: [] },
];

const INITIAL_RULES = [
  "No Unfair Advantages (No Client Mods/Cheats)",
  "Respect All Community Members (No Toxicity)",
  "No Griefing in Spawn/Safe Zones",
  "Report All Bugs via Discord Tickets",
  "One Team per User IP Identity strictly enforced",
  "No advertising other Minecraft Servers",
  "Exploiting economy glitches results in an IP Ban",
  "Keep chat English/Hindi for moderation clarity"
];

const INITIAL_RANKS = [
  { id: "rank_vip", name: "VIP_RANK", description: "Access to /feed, /fly in hub, and basic monthly kits.", color: "text-green-400", cost: 5000, type: "XP" },
  { id: "rank_elite", name: "ELITE_RANK", description: "Animated chat tags, priority queue, and elite kits.", color: "text-cyan-400", cost: 15000, type: "XP" },
  { id: "rank_omega", name: "OMEGA_RANK", description: "All previous perks + exclusive access to the Omega Arena.", color: "text-fuchsia-400", cost: 500, type: "INR" },
  { id: "rank_legend", name: "LEGEND_RANK", description: "Custom /nick, reserved slots, and Alpha Tester status.", color: "text-yellow-400", cost: 1500, type: "INR" }
];

export default function NordenNexusV28() {
  // ------------------------------------------
  // --- CORE ENGINE STATES ---
  // ------------------------------------------
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data States
  const [leaderboards, setLeaderboards] = useState(INITIAL_LEADERBOARDS);
  const [clans, setClans] = useState(INITIAL_CLANS);
  const [rules, setRules] = useState(INITIAL_RULES);
  const [globalRanks, setGlobalRanks] = useState(INITIAL_RANKS);
  
  // UI States
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [isClanGuiOpen, setIsClanGuiOpen] = useState(false);
  const [isJoinGuiOpen, setIsJoinGuiOpen] = useState(false);
  const [targetClanForJoin, setTargetClanForJoin] = useState<any>(null);
  
  // Admin & Security States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [webhookUrl, setWebhookUrl] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  // System Logs & Metrics
  const [logs, setLogs] = useState<string[]>([]);
  const [uptime, setUptime] = useState(0);

  // Form States
  const [clanForm, setClanForm] = useState({ teamName: '', discordName: '', ign: '', gmail: '' });
  const [joinForm, setJoinForm] = useState({ ign: '', discord: '', gmail: '', reason: '' });

  // ------------------------------------------
  // --- SYSTEM LOGIC HANDLERS ---
  // ------------------------------------------
  
  // Initialization & Persistence
  useEffect(() => {
    const saved = localStorage.getItem('NORDEN_OMNI_NEXUS_V28');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLeaderboards(parsed.leaderboards || INITIAL_LEADERBOARDS);
        setClans(parsed.clans || INITIAL_CLANS);
        setRules(parsed.rules || INITIAL_RULES);
        setWebhookUrl(parsed.webhookUrl || "");
      } catch (e) {
        console.error("DATA_CORRUPTION_DETECTED: Resetting to defaults.");
      }
    }
    
    // Boot sequence logs
    pushLog("SYSTEM_KERNEL: BOOTING OMNI_NEXUS V28...");
    pushLog("AUTH_MODULE: SECURE_ID_LOADED [UTKARSH_PANDEY]");
    pushLog("DATABASE: ATTACHED_TO_NORDEN_CLOUD_RELAY");
    pushLog("SMTP: GMAIL_RELAY_LISTENING_ON_PORT_587");

    const timer = setInterval(() => setUptime(p => p + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const pushLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 100));
  };

  const saveToVault = useCallback(() => {
    const bundle = { leaderboards, clans, rules, webhookUrl };
    localStorage.setItem('NORDEN_OMNI_NEXUS_V28', JSON.stringify(bundle));
    pushLog("VAULT: SYSTEM_STATE_SYNCHRONIZED_SUCCESSFULLY");
    alert("SYSTEM: DATA SECURED IN LOCAL_STORAGE VAULT.");
  }, [leaderboards, clans, rules, webhookUrl]);

  // Discord Dispatch Logic
  const dispatchWebhook = async (title: string, message: string, color: number = 5814783) => {
    if (!webhookUrl || !webhookUrl.startsWith("http")) return;
    
    const embed = {
      username: "NORDEN_NEXUS_V28",
      avatar_url: "https://mc-heads.net/avatar/Utkarsh/100",
      embeds: [{
        title: `⚡ ${title}`,
        description: message,
        color: color,
        footer: { text: "Admin: Utkarsh Pandey | System: V28.0.1" },
        timestamp: new Date().toISOString()
      }]
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(embed)
      });
      pushLog(`DISCORD: DISPATCHED_${title.toUpperCase()}`);
    } catch (e) {
      pushLog("DISCORD: ERROR_DISPATCHING_PAYLOAD");
    }
  };

  // ------------------------------------------
  // --- WAR_ROOM ACTION HANDLERS ---
  // ------------------------------------------

  const handleCreateClan = () => {
    if (!clanForm.teamName || !clanForm.ign || !clanForm.gmail) {
      alert("ERROR: INCOMPLETE_CREDENTIALS");
      return;
    }

    const newId = `CLAN_${Math.floor(Math.random() * 9999)}`;
    const newEntry = {
      id: newId,
      name: clanForm.teamName.toUpperCase(),
      leader: clanForm.ign,
      members: 1,
      power: "10%",
      dominance: 0,
      color: "text-white",
      discord: clanForm.discordName,
      ign: clanForm.ign,
      email: clanForm.gmail,
      userIp: "LOCAL_ID_PROXY",
      requests: []
    };

    setClans(prev => [...prev, newEntry]);
    setIsClanGuiOpen(false);
    pushLog(`CLAN_CORE: ${newEntry.name} INITIALIZED BY ${newEntry.ign}`);
    dispatchWebhook("NEW_CLAN_CREATED", `**Name:** ${newEntry.name}\n**Leader:** ${newEntry.ign}\n**Gmail:** ${newEntry.email}`);
    setClanForm({ teamName: '', discordName: '', ign: '', gmail: '' });
  };

  const handleJoinSubmit = () => {
    if (!joinForm.ign || !joinForm.gmail || !joinForm.reason) {
      alert("ERROR: ENLISTMENT_DATA_MISSING");
      return;
    }

    setClans(prev => prev.map(c => {
      if (c.id === targetClanForJoin.id) {
        pushLog(`SMTP: ATTEMPTING HANDSHAKE WITH ${c.email}`);
        pushLog(`SMTP: SENDING ENLISTMENT_PACKET FROM ${joinForm.gmail}`);
        dispatchWebhook("JOIN_REQUEST_SENT", `**Player:** ${joinForm.ign}\n**Target:** ${c.name}\n**Reason:** ${joinForm.reason}`);
        
        return {
          ...c,
          requests: [...(c.requests || []), { ...joinForm, id: Date.now() }]
        };
      }
      return c;
    }));

    setIsJoinGuiOpen(false);
    setJoinForm({ ign: '', discord: '', gmail: '', reason: '' });
    alert("ENLISTMENT SUCCESS: THE CLAN LEADER WILL RECEIVE YOUR GMAIL RELAY.");
  };

  const resolveEnlistment = (clanId: string, reqId: number, status: 'ACCEPT' | 'REJECT') => {
    setClans(prev => prev.map(c => {
      if (c.id === clanId) {
        const targetReq = c.requests.find((r: any) => r.id === reqId);
        const remaining = c.requests.filter((r: any) => r.id !== reqId);
        
        if (status === 'ACCEPT') {
          pushLog(`RECRUITMENT: ${targetReq.ign} ASSIMILATED INTO ${c.name}`);
          dispatchWebhook("ENLISTMENT_APPROVED", `**Player:** ${targetReq.ign}\n**Clan:** ${c.name}`, 3066993);
          return { ...c, members: c.members + 1, requests: remaining };
        }
        
        pushLog(`RECRUITMENT: ${targetReq.ign} SIGNAL_DENIED`);
        return { ...c, requests: remaining };
      }
      return c;
    }));
  };

  // ------------------------------------------
  // --- ADMIN & MANAGEMENT ---
  // ------------------------------------------

  const toggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    pushLog(`ADMIN: MAINTENANCE_MODE_${!maintenanceMode ? 'ENABLED' : 'DISABLED'}`);
    dispatchWebhook("SYSTEM_ALERT", `Maintenance mode has been ${!maintenanceMode ? 'ENABLED' : 'DISABLED'} by Administrator Utkarsh Pandey.`, 15158332);
  };

  const deleteClan = (id: string) => {
    setClans(prev => prev.filter(c => c.id !== id));
    pushLog(`ADMIN: TERMINATED_ALLIANCE_${id}`);
  };

  const filteredStats = useMemo(() => {
    const list = leaderboards[activeMode] || [];
    return list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [leaderboards, activeMode, searchQuery]);

  // ------------------------------------------
  // --- RENDER ENGINE ---
  // ------------------------------------------

  return (
    <div className={`flex min-h-screen bg-[#020205] text-white font-sans overflow-hidden selection:bg-cyan-500 selection:text-black ${maintenanceMode ? 'grayscale saturate-50 brightness-75' : ''}`}>
      
      {/* 🌌 NEXUS BACKGROUND ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* 🚀 OMNI-SIDEBAR */}
      <aside className="w-24 hover:w-72 transition-all duration-[700ms] border-r border-white/5 bg-black/60 backdrop-blur-[80px] flex flex-col items-center py-12 z-[100] group shadow-[25px_0_60px_rgba(0,0,0,0.8)]">
        <div className="mb-20 cursor-pointer group/logo" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-600 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] group-hover/logo:rotate-[360deg] transition-all duration-1000 relative z-10">
            <Zap size={32} className="text-white fill-white" />
          </div>
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-0 group-hover/logo:scale-150 transition-all duration-700"></div>
        </div>

        <nav className="flex flex-col gap-8 w-full px-6 flex-1">
          <SidebarLink icon={<LayoutDashboard size={24}/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <SidebarLink icon={<ShoppingCart size={24}/>} label="MARKETPLACE" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <SidebarLink icon={<Swords size={24}/>} label="WAR_ROOM" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <SidebarLink icon={<Terminal size={24}/>} label="KERNEL_LOGS" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
          <SidebarLink icon={<Globe size={24}/>} label="LIVE_MAP" active={activeMenu === 'MAP'} onClick={() => setActiveMenu('MAP')} />
          
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />
          
          <SidebarLink icon={<ShieldCheck size={24} className={isAuthorized ? "text-green-400" : "text-red-500"} />} label="GOD_MODE" active={activeMenu === 'ADMIN'} onClick={() => setIsAdminOpen(true)} />
        </nav>

        <div className="mt-auto px-6 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="bg-white/5 p-5 rounded-3xl border border-white/10 backdrop-blur-md">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">Network Uptime</p>
              <p className="text-sm font-mono text-cyan-400 font-bold">{Math.floor(uptime/60)}m {uptime%60}s</p>
           </div>
        </div>
      </aside>

      {/* 🖥️ MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative z-10">
        
        {/* 🛰️ GLOBAL HEADER */}
        <header className="px-16 py-12 flex justify-between items-center sticky top-0 bg-[#020205]/90 backdrop-blur-3xl z-[90] border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-6">
               <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none bg-gradient-to-r from-white via-white to-cyan-500 bg-clip-text text-transparent">NORDEN<span className="text-cyan-400">MC</span></h1>
               <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <p className="text-[12px] font-black text-cyan-400 tracking-tighter uppercase">{SYSTEM_BUILD}</p>
               </div>
            </div>
            <p className="text-[12px] font-bold text-white/30 mt-4 uppercase tracking-[0.5em] flex items-center gap-4">
               <span className={`w-2.5 h-2.5 rounded-full ${maintenanceMode ? 'bg-red-500' : 'bg-green-500 animate-pulse'} shadow-[0_0_10px_rgba(34,197,94,0.5)]`}></span>
               SYSTEM_STATUS: {maintenanceMode ? 'MAINTENANCE' : 'OPERATIONAL'} // REGION: GLOBAL_INDIA
            </p>
          </motion.div>

          <div className="flex items-center gap-12">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-all duration-500" size={22} />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SCAN_DATABASE_NODES..." className="bg-white/5 border border-white/10 rounded-[3rem] pl-16 pr-10 py-5 text-sm outline-none w-[500px] focus:border-cyan-500/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10" />
            </div>
            
            <button className="relative overflow-hidden group/btn bg-white text-black font-black text-[12px] px-12 py-6 rounded-[3rem] uppercase tracking-[0.4em] shadow-[0_15px_40px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all duration-500">
               <span className="relative z-10">{SERVER_IP}</span>
               <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>
        </header>

        <main className="p-16 max-w-[2000px] mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* 📊 DASHBOARD ENGINE */}
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6 }} className="space-y-20">
                
                {/* DYNAMIC MODE SELECTOR */}
                <div className="bg-black/40 backdrop-blur-3xl p-4 rounded-[4rem] border border-white/10 w-fit mx-auto flex items-center gap-4 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                  {MODES.map((mode) => (
                    <button key={mode} onClick={() => setActiveMode(mode)} className={`relative px-12 py-5 rounded-[3rem] text-[13px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${activeMode === mode ? 'text-black' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
                      {activeMode === mode && <motion.div layoutId="modeGlow" className="absolute inset-0 bg-white rounded-[3rem] shadow-[0_0_40px_rgba(255,255,255,0.3)]" />}
                      <span className="relative z-10">{mode}</span>
                    </button>
                  ))}
                </div>

                {/* PODIUM DISPLAY (TOP 3) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {filteredStats.slice(0, 3).map((player, index) => (
                    <PodiumCard key={player.name} player={player} rank={index + 1} onClick={() => setSelectedPlayer(player)} />
                  ))}
                </div>

                {/* FULL LEADERBOARD LIST */}
                <div className="space-y-8 mt-24">
                  <div className="flex items-center px-16 mb-6 text-[12px] font-black text-white/20 uppercase tracking-[0.6em]">
                     <span className="w-24">Index</span>
                     <span className="flex-1">Combat Identity</span>
                     <span className="w-48 text-right">Prestige XP</span>
                     <span className="w-48 text-right">K/D Efficacy</span>
                  </div>
                  {filteredStats.map((p, i) => (
                    <PlayerRow key={p.name} player={p} onClick={() => setSelectedPlayer(p)} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ⚔️ WAR_ROOM (CLAN SYSTEM) */}
            {activeMenu === 'CLANS' && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="space-y-20">
                
                {/* FACTION HEADER */}
                <div className="bg-gradient-to-br from-white/10 to-transparent p-20 rounded-[5rem] border border-white/10 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">WAR_ROOM<br/><span className="text-cyan-400">COMMAND_CENTER</span></h2>
                        <p className="text-white/40 text-xl mt-8 uppercase font-bold tracking-[0.25em] leading-relaxed">Centralized recruitment and management node for all NordenMC alliances. Deploy your faction and dominate the territory.</p>
                        
                        <div className="flex gap-8 mt-12">
                          <button onClick={() => setIsClanGuiOpen(true)} className="bg-cyan-500 text-black font-black px-16 py-7 rounded-[3rem] uppercase tracking-[0.3em] flex items-center gap-6 hover:bg-white hover:scale-105 transition-all duration-500 shadow-[0_20px_50px_rgba(6,182,212,0.3)] group">
                              <UserPlus size={30} className="group-hover:rotate-12 transition-transform"/> INITIALIZE_ALLIANCE
                          </button>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-[900px] h-full overflow-hidden opacity-5 pointer-events-none">
                       <Swords size={700} className="text-white -mr-40 rotate-12" />
                    </div>
                </div>

                {/* FACTION GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                   {clans.map((clan, i) => (
                     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={clan.id} className="bg-black/50 border border-white/10 p-14 rounded-[5rem] relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-500 shadow-2xl">
                        <div className="flex justify-between items-start mb-12">
                           <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-700 shadow-inner">
                              <Shield size={48} />
                           </div>
                           <div className="text-right">
                              <p className="text-[11px] text-white/20 uppercase font-black tracking-widest">Signal_ID</p>
                              <p className="text-lg font-mono text-cyan-400 font-black tracking-tighter">{clan.id}</p>
                           </div>
                        </div>
                        
                        <h3 className={`text-6xl font-black italic uppercase mb-4 tracking-tighter ${clan.color} drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]`}>{clan.name}</h3>
                        <p className="text-[14px] text-white/40 tracking-[0.5em] mb-12 uppercase font-black">Commander: {clan.leader}</p>
                        
                        <div className="grid grid-cols-2 gap-8 mb-14">
                           <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all">
                              <p className="text-[11px] text-white/20 uppercase font-black mb-3 tracking-widest">Active_Units</p>
                              <p className="text-4xl font-black italic">{clan.members}</p>
                           </div>
                           <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all">
                              <p className="text-[11px] text-white/20 uppercase font-black mb-3 tracking-widest">Strategic_Power</p>
                              <p className="text-4xl font-black italic text-cyan-400">{clan.power}</p>
                           </div>
                        </div>

                        <button onClick={() => { setTargetClanForJoin(clan); setIsJoinGuiOpen(true); }} className="w-full bg-white/10 border border-white/10 text-white font-black py-7 rounded-[2.5rem] uppercase text-[13px] tracking-[0.4em] hover:bg-cyan-500 hover:text-black transition-all duration-500 flex items-center justify-center gap-5 group/join">
                            <Send size={24} className="group-hover/join:translate-x-2 transition-transform"/> DISPATCH_ENLISTMENT
                        </button>
                     </motion.div>
                   ))}
                </div>
              </motion.div>
            )}

            {/* 📟 KERNEL_CORE & RECRUITMENT RELAY */}
            {activeMenu === 'LOGS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-[850px]">
                 
                 {/* KERNEL LOG OUTPUT */}
                 <div className="bg-black/80 border border-white/10 rounded-[5rem] p-16 font-mono flex flex-col shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
                    <div className="flex justify-between items-center mb-14 relative z-10">
                        <h2 className="text-4xl font-black italic uppercase flex items-center gap-6 text-white"><TerminalIcon className="text-cyan-400" size={40} /> KERNEL_STREAMS</h2>
                        <div className="flex items-center gap-4">
                           <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.6)]"></div>
                           <span className="text-[12px] font-black text-green-400 uppercase tracking-widest">Active_Kernel_V28</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-8 relative z-10">
                       {logs.map((log, i) => (
                         <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={i} className="text-[14px] text-cyan-500/60 uppercase leading-relaxed flex gap-8 group">
                            <span className="text-white/10 font-black min-w-[50px] group-hover:text-cyan-500/40 transition-colors">[{logs.length - i}]</span> 
                            <span className="group-hover:text-white transition-colors tracking-tight">{log}</span>
                         </motion.div>
                       ))}
                    </div>
                 </div>

                 {/* SMTP RELAY (GMAIL INBOX SIMULATION) */}
                 <div className="bg-[#050505]/60 border border-white/10 rounded-[5rem] p-16 flex flex-col shadow-2xl relative overflow-hidden">
                    <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-fuchsia-600/5 blur-[150px] rounded-full" />
                    <div className="flex justify-between items-center mb-14 relative z-10">
                        <h2 className="text-4xl font-black italic uppercase text-fuchsia-400 flex items-center gap-6"><Inbox size={40} /> SMTP_RELAY_INBOX</h2>
                        <div className="bg-fuchsia-500/10 text-fuchsia-400 text-[11px] font-black px-6 py-2.5 rounded-full uppercase border border-fuchsia-500/20 tracking-[0.2em]">Gmail Relay Node: Nordic_587</div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-10 pr-8 relative z-10">
                       {clans.map(clan => (
                         clan.requests.map((req: any) => (
                           <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={req.id} className="bg-white/5 p-12 rounded-[4rem] border border-white/10 hover:border-fuchsia-500/40 transition-all duration-700 group shadow-xl">
                              <div className="flex justify-between items-start mb-10">
                                 <div>
                                    <div className="flex items-center gap-5">
                                       <h4 className="text-4xl font-black italic uppercase text-white group-hover:text-fuchsia-400 transition-colors">{req.ign}</h4>
                                       <span className="text-[11px] bg-fuchsia-500/20 text-fuchsia-400 px-4 py-1 rounded-md uppercase font-black animate-pulse">ENLISTMENT_SIGNAL</span>
                                    </div>
                                    <p className="text-[12px] text-white/30 uppercase tracking-[0.4em] mt-3 font-black">Target Alliance: <span className="text-white bg-white/5 px-3 py-1 rounded-lg ml-2">{clan.name}</span></p>
                                 </div>
                                 <div className="flex gap-5">
                                    <button onClick={() => resolveEnlistment(clan.id, req.id, 'ACCEPT')} className="w-16 h-16 bg-green-500 text-black rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-green-500/20"><UserCheck size={32}/></button>
                                    <button onClick={() => resolveEnlistment(clan.id, req.id, 'REJECT')} className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-red-500/20"><UserX size={32}/></button>
                                 </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-8 mb-10">
                                 <div className="bg-black/60 p-6 rounded-[2rem] border border-white/5 text-[12px] uppercase font-black flex items-center gap-5 text-white/60">
                                    <AtSign size={20} className="text-cyan-400"/> {req.discord}
                                 </div>
                                 <div className="bg-black/60 p-6 rounded-[2rem] border border-white/5 text-[12px] uppercase font-black flex items-center gap-5 text-white/60">
                                    <Mail size={20} className="text-fuchsia-400"/> {req.gmail}
                                 </div>
                              </div>

                              <div className="bg-black/30 p-10 rounded-[3rem] border border-white/5 italic shadow-inner">
                                 <p className="text-sm text-white/50 leading-relaxed uppercase font-black tracking-widest">
                                    <span className="text-fuchsia-500 mr-3 text-2xl font-serif">"</span>
                                    {req.reason}
                                    <span className="text-fuchsia-500 ml-3 text-2xl font-serif">"</span>
                                 </p>
                              </div>
                           </motion.div>
                         ))
                       ))}

                       {clans.every(c => c.requests.length === 0) && (
                         <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-10 grayscale">
                            <Radio size={150} className="mb-10" />
                            <p className="text-3xl font-black uppercase tracking-[0.8em]">No Signals Detected</p>
                            <p className="text-[12px] mt-6 uppercase tracking-[0.4em]">Waiting for player enlistment packets through Gmail Relay...</p>
                         </div>
                       )}
                    </div>
                 </div>
              </motion.div>
            )}

            {/* 🛒 MARKETPLACE (XP/INR RANKS) */}
            {activeMenu === 'MARKET' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {globalRanks.map((rank) => (
                  <RankCard key={rank.id} rank={rank} />
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* 📧 ENLISTMENT OVERLAY (MODAL) */}
      <AnimatePresence>
        {isJoinGuiOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12 bg-black/95 backdrop-blur-[120px]">
             <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#080808] border border-white/10 w-full max-w-4xl rounded-[6rem] p-20 shadow-[0_0_200px_rgba(6,182,212,0.25)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-600" />
                <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full" />
                
                <h2 className="text-7xl font-black italic uppercase text-center mb-6 tracking-tighter">ENLISTMENT_HANDSHAKE</h2>
                <p className="text-center text-[13px] text-white/30 uppercase tracking-[0.6em] mb-20 flex items-center justify-center gap-6">
                   <Monitor size={20} className="text-cyan-500" /> DESTINATION_NODE: <span className="text-white font-black bg-white/5 px-6 py-2 rounded-xl">{targetClanForJoin?.name}</span>
                </p>
                
                <div className="grid grid-cols-2 gap-12 mb-12">
                    <NexusInput icon={<User />} label="Player In-Game Name" value={joinForm.ign} onChange={v => setJoinForm({...joinForm, ign: v})} />
                    <NexusInput icon={<Mail />} label="Admin Gmail Relay" value={joinForm.gmail} onChange={v => setJoinForm({...joinForm, gmail: v})} />
                </div>
                <div className="mb-12">
                    <NexusInput icon={<Hash />} label="Discord Master ID" value={joinForm.discord} onChange={v => setJoinForm({...joinForm, discord: v})} />
                </div>
                <div className="space-y-4 mb-16">
                    <p className="text-[12px] font-black text-white/20 uppercase tracking-[0.4em] ml-12">Personal Statement / Experience</p>
                    <textarea value={joinForm.reason} onChange={e => setJoinForm({...joinForm, reason: e.target.value})} className="w-full bg-white/5 border border-white/10 p-12 rounded-[4rem] text-[15px] outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-bold h-48 uppercase italic tracking-widest leading-relaxed resize-none placeholder:text-white/5" placeholder="DESCRIBE_YOUR_INTENT_FOR_ALLIANCE..." />
                </div>
                
                <div className="flex flex-col gap-8">
                    <button onClick={handleJoinSubmit} className="w-full bg-white text-black font-black py-10 rounded-[3rem] uppercase tracking-[0.5em] flex items-center justify-center gap-8 hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 transition-all duration-500 shadow-2xl text-xl relative overflow-hidden group">
                       <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                       <Send size={32} className="relative z-10"/> <span className="relative z-10">DISPATCH_ENLISTMENT_SIGNAL</span>
                    </button>
                    <button onClick={() => setIsJoinGuiOpen(false)} className="w-full text-white/10 font-black text-[13px] uppercase tracking-[0.5em] hover:text-red-500 transition-colors py-4">ABORT_ALLIANCE_RELAY</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ⚔️ CLAN CORE INITIALIZATION (MODAL) */}
      <AnimatePresence>
        {isClanGuiOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12 bg-black/95 backdrop-blur-[120px]">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#080808] border border-white/10 w-full max-w-4xl rounded-[6rem] p-20 relative shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[200px] rounded-full" />
                <h2 className="text-7xl font-black italic uppercase text-center mb-20 tracking-tighter">DEPLOY_ALLIANCE_NODE</h2>
                
                <div className="space-y-12">
                    <div className="grid grid-cols-2 gap-12">
                        <NexusInput icon={<Shield />} label="Clan/Team Identity" value={clanForm.teamName} onChange={v => setClanForm({...clanForm, teamName: v})} />
                        <NexusInput icon={<User />} label="Commander IGN" value={clanForm.ign} onChange={v => setClanForm({...clanForm, ign: v})} />
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                        <NexusInput icon={<Mail />} label="Admin Gmail Sync" value={clanForm.gmail} onChange={v => setClanForm({...clanForm, gmail: v})} />
                        <NexusInput icon={<Hash />} label="Discord Handle" value={clanForm.discordName} onChange={v => setClanForm({...clanForm, discordName: v})} />
                    </div>
                    
                    <div className="pt-12">
                        <button onClick={handleCreateClan} className="w-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 text-white font-black py-10 rounded-[3.5rem] uppercase tracking-[0.5em] flex items-center justify-center gap-8 hover:scale-[1.03] transition-all duration-700 shadow-[0_30px_70px_rgba(79,70,229,0.35)] text-2xl group">
                           <Crosshair size={36} className="group-hover:rotate-90 transition-transform duration-700"/> INITIALIZE_ALLIANCE_PROTOCOL
                        </button>
                        <button onClick={() => setIsClanGuiOpen(false)} className="w-full text-white/10 font-black text-[13px] uppercase text-center mt-12 tracking-[0.5em] hover:text-red-500 transition-colors">TERMINATE_DEPLOYMENT_CORE</button>
                    </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔐 GOD-MODE OVERRIDE (ADMIN PANEL) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 1200 }} animate={{ x: 0 }} exit={{ x: 1200 }} transition={{ type: 'spring', damping: 30, stiffness: 150 }} className="fixed right-0 top-0 h-full w-[900px] bg-[#030308]/98 border-l border-white/10 z-[2000] p-20 shadow-[-60px_0_150px_rgba(0,0,0,1)] backdrop-blur-3xl overflow-y-auto custom-scrollbar">
            
            <div className="flex justify-between items-center mb-24 sticky top-0 bg-[#030308]/10 backdrop-blur-2xl py-10 border-b border-white/10 z-[2010]">
              <div>
                <h2 className="text-6xl font-black italic uppercase text-cyan-400 flex items-center gap-8 tracking-tighter"><Gavel size={60}/> GOD_MODE_OVERRIDE</h2>
                <p className="text-[13px] font-black text-white/20 uppercase mt-4 tracking-[0.6em]">Protocol: V28.0.1_LEVEL_10_CLEARANCE</p>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="bg-red-500/10 text-red-500 border border-red-500/30 px-12 py-5 rounded-[3rem] font-black text-[12px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-500 shadow-xl">TERMINATE_SESSION</button>
            </div>

            {!isAuthorized ? (
              <div className="py-40 flex flex-col items-center max-w-lg mx-auto">
                <div className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center mb-16 border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.05)] group hover:border-red-500/50 transition-all duration-700">
                   <Lock size={60} className="text-red-500 animate-pulse group-hover:scale-110" />
                </div>
                <p className="text-[14px] font-black text-white/30 uppercase tracking-[0.5em] mb-12">Security Decryption Key Required</p>
                <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (passwordInput === PASSKEY ? setIsAuthorized(true) : alert("INVALID_KEY_CODE"))} placeholder="ENTER_LEGION_KEY..." className="bg-white/5 border border-white/10 w-full p-12 rounded-[4rem] text-center text-5xl outline-none mb-12 focus:border-cyan-500 focus:bg-white/10 transition-all font-black placeholder:text-white/5 tracking-widest" />
                <button onClick={() => passwordInput === PASSKEY ? setIsAuthorized(true) : alert("INVALID_KEY_CODE")} className="w-full bg-white text-black font-black py-10 rounded-[3rem] uppercase tracking-[0.6em] hover:bg-cyan-400 transition-all duration-500 shadow-2xl text-xl">AUTHENTICATE_IDENTITY</button>
              </div>
            ) : (
              <div className="space-y-24 pb-40">
                
                {/* GLOBAL NETWORK STATS */}
                <div className="grid grid-cols-2 gap-10">
                   <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10">
                      <p className="text-[11px] font-black text-white/20 uppercase tracking-widest mb-4">Core Temperature</p>
                      <p className="text-5xl font-black italic text-cyan-400">32°C <span className="text-xs text-green-500 font-bold ml-4">OPTIMAL</span></p>
                   </div>
                   <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 cursor-pointer hover:border-red-500/50 transition-all" onClick={toggleMaintenance}>
                      <p className="text-[11px] font-black text-white/20 uppercase tracking-widest mb-4">Maintenance Mode</p>
                      <p className={`text-5xl font-black italic ${maintenanceMode ? 'text-red-500' : 'text-white/20'}`}>{maintenanceMode ? 'ON' : 'OFF'}</p>
                   </div>
                </div>

                {/* DISCORD WEBHOOK INTEGRATION */}
                <div className="bg-white/5 p-16 rounded-[5rem] border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-2 bg-fuchsia-500" />
                   <h4 className="text-4xl font-black italic uppercase mb-12 flex items-center gap-8 text-fuchsia-400 tracking-tighter"><Radio size={40}/> DISCORD_RELAY_SYNC</h4>
                   <p className="text-[12px] text-white/30 uppercase font-black tracking-[0.4em] mb-8 leading-relaxed">System will dispatch all join requests and server alerts to this specific endpoint via JSON-POST protocol.</p>
                   <div className="flex gap-8">
                      <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="HTTPS://DISCORD.COM/API/WEBHOOKS/..." className="flex-1 bg-black border border-white/10 p-8 rounded-[2.5rem] text-[13px] outline-none focus:border-fuchsia-500/50 transition-all font-mono text-fuchsia-200" />
                      <button onClick={() => dispatchWebhook("SYSTEM_PING", "Administrator Utkarsh Pandey has initialized a secure link.")} className="bg-fuchsia-500 text-white px-10 rounded-[2.5rem] hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-fuchsia-500/30 flex items-center justify-center"><Send size={32}/></button>
                   </div>
                </div>

                {/* CLAN MASTER OVERRIDE */}
                <div className="bg-white/5 p-16 rounded-[5rem] border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500" />
                   <h4 className="text-4xl font-black italic uppercase mb-14 text-indigo-400 flex items-center gap-8 tracking-tighter"><ShieldQuestion size={40}/> ALLIANCE_OVERRIDE_LIST</h4>
                   <div className="space-y-8">
                     {clans.map((c) => (
                       <div key={c.id} className="bg-black/60 p-12 rounded-[3.5rem] border border-white/5 flex justify-between items-center group hover:border-indigo-500/50 transition-all duration-700 shadow-xl">
                          <div>
                             <h5 className="text-4xl font-black italic uppercase text-white group-hover:text-cyan-400 transition-colors tracking-tighter">{c.name}</h5>
                             <p className="text-[12px] text-white/20 uppercase mt-4 font-black tracking-widest leading-relaxed">ID: {c.id} | MASTER_IP: {c.userIp} | COMMAND: {c.leader}</p>
                          </div>
                          <button onClick={() => deleteClan(c.id)} className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-500 shadow-2xl group/del">
                             <Trash2 size={36} className="group-hover/del:rotate-12 transition-transform"/>
                          </button>
                       </div>
                     ))}
                   </div>
                </div>

                {/* NETWORK RULESET MODERATION */}
                <div className="bg-white/5 p-16 rounded-[5rem] border border-white/10">
                   <h4 className="text-4xl font-black italic uppercase mb-14 text-cyan-400 flex items-center gap-8 tracking-tighter"><Gavel size={40}/> NETWORK_RULESET_MOD</h4>
                   <div className="space-y-6 mb-12">
                      {rules.map((rule, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-black/50 p-7 rounded-[2rem] border border-white/5 group hover:border-cyan-500/20 transition-colors">
                           <p className="text-[13px] font-black uppercase tracking-widest text-white/50">{idx + 1}. {rule}</p>
                           <button onClick={() => setRules(prev => prev.filter((_, i) => i !== idx))} className="text-red-500/30 hover:text-red-500 transition-all duration-300"><X size={20}/></button>
                        </div>
                      ))}
                   </div>
                   <div className="flex gap-8">
                      <input id="new-rule-field" placeholder="DEFINE_NEW_GLOBAL_DIRECTIVE..." className="flex-1 bg-black border border-white/10 p-8 rounded-[2.5rem] text-[13px] outline-none uppercase font-black tracking-widest placeholder:text-white/10" />
                      <button onClick={() => {
                        const field = document.getElementById('new-rule-field') as HTMLInputElement;
                        if(field.value) {
                           setRules(prev => [...prev, field.value]);
                           field.value = '';
                           pushLog("ADMIN: DEPLOYED_NEW_GLOBAL_DIRECTIVE");
                        }
                      }} className="bg-cyan-500 text-black px-12 rounded-[2.5rem] font-black uppercase text-[12px] tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-2xl">APPEND</button>
                   </div>
                </div>

                <div className="pt-16">
                   <button onClick={saveToVault} className="w-full bg-gradient-to-r from-cyan-500 via-indigo-700 to-fuchsia-700 text-white font-black py-12 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] uppercase tracking-[0.6em] flex items-center justify-center gap-10 text-3xl hover:scale-[1.02] transition-all duration-700 relative overflow-hidden group/save">
                      <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover/save:scale-x-100 transition-transform origin-left duration-[1000ms]"></div>
                      <Save size={48} className="relative z-10" /> <span className="relative z-10">COMMIT_TO_VAULT</span>
                   </button>
                   <p className="text-center text-[12px] text-white/10 uppercase tracking-[1em] mt-16 font-black italic">End of God Mode Virtual Session Protocol</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ==========================================
// --- REUSABLE NEXUS UI COMPONENTS ---
// ==========================================

/**
 * Sidebar Navigation Link
 */
function SidebarLink({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-10 w-full py-7 px-7 rounded-[2rem] transition-all duration-700 relative group ${active ? 'bg-cyan-500/10 text-cyan-400 shadow-inner' : 'text-white/15 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'scale-110 rotate-0' : 'scale-100'} transition-all duration-700`}>{icon}</div>
      <span className="text-[15px] font-black tracking-[0.4em] hidden group-hover:block uppercase transition-all duration-[700ms] pointer-events-none whitespace-nowrap">{label}</span>
      {active && (
         <motion.div layoutId="sidebarGlow" className="absolute left-0 top-6 bottom-6 w-2 bg-cyan-400 rounded-r-full shadow-[0_0_30px_rgba(6,182,212,1)]" />
      )}
    </button>
  );
}

/**
 * Standardized High-End Input Component
 */
function NexusInput({ icon, label, value, onChange }: any) {
    return (
        <div className="space-y-5 w-full">
            <p className="text-[13px] font-black text-white/20 uppercase tracking-[0.5em] ml-12">{label}</p>
            <div className="relative group/field">
                <div className="absolute left-12 top-1/2 -translate-y-1/2 text-cyan-500 group-focus-within/field:text-white group-focus-within/field:scale-110 transition-all duration-500">{icon}</div>
                <input value={value} onChange={e => onChange(e.target.value)} placeholder={`SYST_${label.toUpperCase().replace(/\s/g, '_')}...`} className="w-full bg-white/5 border border-white/10 p-10 pl-28 rounded-[3.5rem] text-[14px] outline-none focus:border-cyan-500 focus:bg-white/10 transition-all duration-700 font-black italic uppercase tracking-[0.2em] placeholder:text-white/5" />
            </div>
        </div>
    );
}

/**
 * Top 3 Leaderboard Podium Cards
 */
function PodiumCard({ player, rank, onClick }: any) {
  const isRank1 = rank === 1;
  const isRank2 = rank === 2;
  const isRank3 = rank === 3;
  
  return (
    <motion.div whileHover={{ y: -20, scale: 1.02 }} onClick={onClick} className={`cursor-pointer bg-gradient-to-b ${isRank1 ? 'from-cyan-500/40 to-transparent border-cyan-500/50 shadow-cyan-500/10' : 'from-white/10 to-transparent border-white/10'} border-2 p-16 rounded-[7rem] text-center relative group shadow-2xl overflow-hidden transition-all duration-1000 h-full flex flex-col items-center justify-center`}>
      {isRank1 && <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-25 group-hover:scale-125 transition-all duration-[2000ms]"><Crown size={250} className="text-yellow-400" /></div>}
      
      <div className="relative z-10">
        <div className="relative w-56 h-56 mx-auto mb-12">
           <img src={player.img} className="w-full h-full rounded-[5rem] border-4 border-white/10 group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-[1200ms] shadow-[0_40px_80px_rgba(0,0,0,0.6)]" />
           <div className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-3xl flex items-center justify-center font-black italic text-3xl shadow-3xl border-4 border-black/80 ${isRank1 ? 'bg-yellow-400 text-black shadow-yellow-500/40' : isRank2 ? 'bg-slate-300 text-black shadow-slate-500/40' : 'bg-amber-600 text-white shadow-amber-800/40'}`}>
              {rank}
           </div>
        </div>
        
        <h4 className="text-6xl font-black italic uppercase leading-none tracking-tighter group-hover:text-cyan-400 transition-colors duration-700 shadow-sm">{player.name}</h4>
        <p className="text-[14px] font-black text-white/30 tracking-[0.6em] mt-6 uppercase">{player.tag}</p>
        
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 gap-10">
            <div><p className="text-[11px] text-white/20 uppercase font-black tracking-widest mb-3">Efficiency</p><p className="text-4xl font-black italic text-white leading-none">{player.kd}</p></div>
            <div><p className="text-[11px] text-white/20 uppercase font-black tracking-widest mb-3">Legacy XP</p><p className="text-4xl font-black italic text-cyan-400 leading-none">{Math.floor(player.xp / 1000)}K</p></div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Standard Leaderboard Row
 */
function PlayerRow({ player, onClick }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onClick={onClick} className="bg-black/40 border border-white/5 p-10 rounded-[4rem] flex items-center justify-between group hover:border-cyan-500/40 transition-all duration-700 cursor-pointer relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-1000" />
      
      <div className="flex items-center gap-16 relative z-10">
        <span className="text-7xl font-black italic text-white/5 w-40 group-hover:text-cyan-400/15 transition-all duration-700 tracking-tighter">{player.rank}</span>
        <div className="relative">
           <img src={player.img} className="w-24 h-24 rounded-[2rem] border-2 border-white/10 shadow-2xl group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-1000" />
           <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full border-4 border-[#030308] ${player.banned ? 'bg-red-600' : 'bg-green-500 animate-pulse'}`}></div>
        </div>
        <div>
           <h4 className="text-5xl font-black italic uppercase group-hover:text-cyan-400 transition-all duration-700 tracking-tighter drop-shadow-lg">{player.name}</h4>
           <p className="text-[13px] font-black text-white/20 uppercase tracking-[0.6em] mt-3 flex items-center gap-4">
              {player.tag} <span className="w-1.5 h-1.5 bg-white/15 rounded-full"></span> {player.kills} TOTAL_KILLS
           </p>
        </div>
      </div>

      <div className="flex items-center gap-20 relative z-10 mr-10">
        <div className="text-right">
            <p className="text-[12px] text-white/10 uppercase font-black mb-3 tracking-[0.3em]">Combat Efficacy</p>
            <p className="text-6xl font-black italic text-white/60 group-hover:text-white transition-all duration-700">{player.kd}</p>
        </div>
        <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-white/15 group-hover:bg-cyan-500 group-hover:text-black group-hover:rotate-45 transition-all duration-1000 shadow-3xl border border-white/5">
            <ArrowUpRight size={40}/>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Marketplace Item Card
 */
function RankCard({ rank }: any) {
    return (
      <div className="bg-black/60 border border-white/10 p-16 rounded-[6rem] text-center group hover:border-fuchsia-500/50 transition-all duration-1000 shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col h-full">
        <div className="absolute top-0 right-0 w-60 h-60 bg-fuchsia-500/10 blur-[100px] rounded-full group-hover:bg-fuchsia-500/20 transition-all duration-[2000ms]" />
        
        <div className="w-32 h-32 bg-white/5 rounded-[3rem] mx-auto mb-16 flex items-center justify-center border border-white/10 group-hover:bg-fuchsia-500 group-hover:text-black group-hover:rotate-[360deg] transition-all duration-[1200ms] shadow-inner relative z-10">
            <Sparkles size={60} />
        </div>

        <h3 className={`text-5xl font-black italic mb-8 uppercase tracking-tighter ${rank.color} relative z-10`}>{rank.name}</h3>
        <p className="text-[14px] text-white/30 mb-auto uppercase leading-[1.8] font-black tracking-widest px-8 relative z-10">{rank.description}</p>
        
        <div className="mt-16 pt-12 border-t border-white/10 relative z-10">
           <div className="flex items-center justify-center bg-black/60 p-8 rounded-[3rem] border border-white/5 mb-8 group-hover:border-fuchsia-500/30 transition-all duration-700">
              <span className="text-5xl font-black italic text-white tracking-tighter">{rank.cost} <span className="text-[13px] text-white/20 tracking-normal ml-2">{rank.type}</span></span>
           </div>
           <button className="w-full bg-white text-black text-[14px] font-black py-8 rounded-[2.5rem] uppercase tracking-[0.5em] hover:bg-cyan-400 transition-all duration-700 shadow-2xl active:scale-95 group/btn">
              <span className="group-hover/btn:scale-110 transition-transform">INITIALIZE_PURCHASE</span>
           </button>
        </div>
      </div>
    );
}
