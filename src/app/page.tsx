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
  HistoryIcon, TerminalSquare, AlertCircle, CheckCircle, ChevronDown, ChevronUp
} from 'lucide-react';

// ==========================================
// --- CORE SYSTEM CONSTANTS (UTKARSH PANDEY) ---
// ==========================================
const PASSKEY = "PVP_PROPLE";
const SERVER_IP = "PLAY.NORDENMC.COM";
const MODES = ["OVERALL", "LTMs", "Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace"];
const SYSTEM_VERSION = "V27.0.4_APEX_NEXUS";

// ==========================================
// --- INITIAL STATE SEEDS ---
// ==========================================
const INITIAL_LEADERBOARDS: Record<string, any[]> = {
  OVERALL: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 125000, ip: "192.168.1.1", banned: false, kills: 15400, deaths: 1241 },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 112000, ip: "192.168.1.2", banned: false, kills: 12000, deaths: 1080 },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", statType: "HT1", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 98000, ip: "192.168.1.3", banned: false, kills: 9800, deaths: 1000 },
  ]
};

// Initialize other modes with empty arrays to prevent crashes
MODES.forEach(m => { if(!INITIAL_LEADERBOARDS[m]) INITIAL_LEADERBOARDS[m] = []; });

const INITIAL_CLANS = [
  { id: "cl_1", name: "GLACIERZ", leader: "Utkarsh", members: 42, power: "98%", dominance: 45, color: "text-cyan-400", discord: "utkarsh#0001", ign: "Utkarsh", email: "admin@nordenmc.com", userIp: "SYSTEM_GEN", requests: [] },
  { id: "cl_2", name: "DEMON_SQUAD", leader: "Unknown", members: 28, power: "85%", dominance: 30, color: "text-red-500", discord: "demon#6666", ign: "DemonKing", email: "demon@nordenmc.com", userIp: "SYSTEM_GEN", requests: [] },
];

const INITIAL_RULES = [
  "No Unfair Advantages (No Client Mods/Cheats)",
  "Respect All Community Members (No Toxicity)",
  "No Griefing in Spawn/Safe Zones",
  "Report All Bugs via Discord Tickets",
  "One Team per User IP Identity strictly enforced",
  "No advertising other Minecraft Servers"
];

const INITIAL_MEDIA = [
  { id: 1, title: "NordenMC Season 5 Trailer", author: "MediaTeam", views: "12.4K", thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500" },
  { id: 2, title: "How to Master Mace PvP", author: "UTKARSH", views: "45.1K", thumb: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500" },
  { id: 3, title: "Technoblade Tribute Arena", author: "NordenBuilds", views: "102K", thumb: "https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?q=80&w=500" }
];

const INITIAL_RANKS = [
  { id: "vip", name: "VIP_RANK", description: "Permanent command access & basic kits.", color: "text-green-400", cost: 5000, type: "XP" },
  { id: "el", name: "ELITE_RANK", description: "Animated tags, priority node access.", color: "text-cyan-400", cost: 15000, type: "XP" },
  { id: "om", name: "OMEGA_RANK", description: "Global kit-pvp access, exclusive arena access.", color: "text-fuchsia-400", cost: 500, type: "INR" },
  { id: "leg", name: "LEGEND_RANK", description: "Custom nick, reserved slots, alpha access.", color: "text-yellow-400", cost: 1500, type: "INR" }
];

export default function NordenNexusApexNexusV27() {
  // ------------------------------------------
  // --- STATE ENGINES ---
  // ------------------------------------------
  const [leaderboards, setLeaderboards] = useState(INITIAL_LEADERBOARDS);
  const [clans, setClans] = useState(INITIAL_CLANS);
  const [rules, setRules] = useState(INITIAL_RULES);
  const [media] = useState(INITIAL_MEDIA);
  const [globalRanks, setGlobalRanks] = useState(INITIAL_RANKS);
  const [userXP, setUserXP] = useState(50000);
  
  // --- UI & NAVIGATION ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  
  // --- MODALS & INTERFACE ---
  const [isClanGuiOpen, setIsClanGuiOpen] = useState(false);
  const [isJoinGuiOpen, setIsJoinGuiOpen] = useState(false);
  const [targetClanForJoin, setTargetClanForJoin] = useState<any>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  // --- SYSTEM & LOGS ---
  const [logs, setLogs] = useState<string[]>(["[KERNEL] APEX_NEXUS_V27_BOOTED", "[SMTP] GMAIL_RELAY_ESTABLISHED", "[DB] CONNECTION_SECURE"]);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [systemUptime, setSystemUptime] = useState(0);

  // --- FORM DATA BINDINGS ---
  const [clanForm, setClanForm] = useState({ teamName: '', discordName: '', ign: '', gmail: '' });
  const [joinForm, setJoinForm] = useState({ ign: '', discord: '', gmail: '', reason: '' });

  // ------------------------------------------
  // --- SYSTEM CORE LOGIC ---
  // ------------------------------------------
  useEffect(() => {
    const data = localStorage.getItem('norden_v27_full');
    if (data) {
      const parsed = JSON.parse(data);
      setLeaderboards(parsed.leaderboards || INITIAL_LEADERBOARDS);
      setClans(parsed.clans || INITIAL_CLANS);
      setRules(parsed.rules || INITIAL_RULES);
      setUserXP(parsed.userXP || 50000);
      setGlobalRanks(parsed.globalRanks || INITIAL_RANKS);
      setWebhookUrl(parsed.webhookUrl || "");
    }
    
    const timer = setInterval(() => setSystemUptime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const pushLog = useCallback((msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 150));
  }, []);

  const syncVault = useCallback(() => {
    const bundle = { leaderboards, clans, rules, userXP, globalRanks, webhookUrl };
    localStorage.setItem('norden_v27_full', JSON.stringify(bundle));
    pushLog("OMNI_SYNC: FULL_DATA_DUMP_COMPLETE");
    alert("SYSTEM: APEX_VAULT_SYNCHRONIZED.");
  }, [leaderboards, clans, rules, userXP, globalRanks, webhookUrl, pushLog]);

  const sendDiscordAlert = async (type: string, details: string) => {
    if (!webhookUrl || !webhookUrl.startsWith("http")) {
        pushLog("ALERT_FAIL: WEBHOOK_NOT_CONFIGURED");
        return;
    }
    const payload = {
      username: "APEX_NEXUS_V27",
      avatar_url: "https://mc-heads.net/avatar/Utkarsh/100",
      embeds: [{
        title: `⚡ NORDEN_NEXUS_PROTOCOL: ${type}`,
        description: details,
        color: type.includes("JOIN") ? 3066993 : (type.includes("TERMINATE") ? 15158332 : 3447003),
        timestamp: new Date().toISOString(),
        footer: { text: "Developer: Utkarsh Pandey | NordenMC Admin" }
      }]
    };
    try { 
        await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); 
        pushLog(`DISCORD: DISPATCHED_${type}`);
    } catch (e) { pushLog("DISCORD: DISPATCH_ERROR"); }
  };

  // ------------------------------------------
  // --- WAR_ROOM LOGIC (ADVANCED) ---
  // ------------------------------------------
  const handleClanCreation = () => {
    if(!clanForm.teamName || !clanForm.ign || !clanForm.gmail) { 
        alert("CRITICAL ERROR: FORM_DATA_INCOMPLETE"); 
        return; 
    }
    
    // IP Anti-Spam Check
    const currentIpId = "USER_IP_PROXY_77"; 
    if(clans.some(c => c.userIp === currentIpId)) { 
        alert("ACCESS DENIED: IDENTITY_ALREADY_LINKED_TO_ALLIANCE"); 
        return; 
    }

    const newClan = {
        id: `cl_${Math.random().toString(36).substr(2, 9)}`,
        name: clanForm.teamName.toUpperCase(),
        leader: clanForm.ign,
        members: 1, power: "10%", dominance: 0, color: "text-white",
        discord: clanForm.discordName, ign: clanForm.ign, email: clanForm.gmail,
        userIp: currentIpId, requests: []
    };

    setClans(prev => [...prev, newClan]);
    pushLog(`CLAN_DEPLOY: ${newClan.name} INITIALIZED BY ${newClan.ign}`);
    sendDiscordAlert("ALLIANCE_FORMED", `**Team:** ${newClan.name}\n**Leader:** ${newClan.ign}\n**Gmail:** ${newClan.email}\n**ID:** ${newClan.id}`);
    
    setIsClanGuiOpen(false);
    setClanForm({ teamName: '', discordName: '', ign: '', gmail: '' });
  };

  const submitJoinRequest = () => {
    if(!joinForm.ign || !joinForm.gmail || !joinForm.discord) { 
        alert("CRITICAL: MISSING ENLISTMENT CREDENTIALS"); 
        return; 
    }
    
    setClans(prev => prev.map(c => {
        if(c.id === targetClanForJoin.id) {
            const updatedRequests: any = [...(c.requests || []), { ...joinForm, id: Date.now() }];
            
            // SMTP SIMULATION LOGS
            pushLog(`SMTP: CONNECTING TO GMAIL_RELAY...`);
            pushLog(`SMTP: SECURE HANDSHAKE WITH ${c.email}`);
            pushLog(`SMTP: DISPATCHING ENLISTMENT_PACKET FROM ${joinForm.gmail}`);
            
            sendDiscordAlert("ENLISTMENT_REQUEST", `**Applicant:** ${joinForm.ign}\n**Target Team:** ${c.name}\n**Email:** ${joinForm.gmail}\n**Reason:** ${joinForm.reason}`);
            
            return { ...c, requests: updatedRequests };
        }
        return c;
    }));

    setIsJoinGuiOpen(false);
    setJoinForm({ ign: '', discord: '', gmail: '', reason: '' });
    alert(`ENLISTMENT SENT TO ${targetClanForJoin.name}. CHECK GMAIL FOR UPDATES.`);
  };

  const handleRequestAction = (clanId: string, requestId: number, action: 'ACCEPT' | 'REJECT') => {
    setClans(prev => prev.map(c => {
        if(c.id === clanId) {
            const req = c.requests.find((r: any) => r.id === requestId);
            const filtered = c.requests.filter((r: any) => r.id !== requestId);
            
            if(action === 'ACCEPT') {
                pushLog(`ENLISTMENT_ACCEPT: ${req.ign} ASSIMILATED INTO ${c.name}`);
                sendDiscordAlert("ENLISTMENT_APPROVED", `**Player:** ${req.ign}\n**Team:** ${c.name}`);
                return { ...c, members: c.members + 1, requests: filtered };
            }
            
            pushLog(`ENLISTMENT_REJECT: ${req.ign} PURGED FROM ${c.name} QUEUE`);
            return { ...c, requests: filtered };
        }
        return c;
    }));
  };

  // ------------------------------------------
  // --- ADMIN OVERRIDES ---
  // ------------------------------------------
  const deleteClan = (id: string) => {
    const clan = clans.find(c => c.id === id);
    setClans(prev => prev.filter(c => c.id !== id));
    pushLog(`ADMIN: TERMINATED_ALLIANCE_${clan?.name}`);
    sendDiscordAlert("CLAN_TERMINATED", `**Clan Name:** ${clan?.name}\n**Status:** Removed from Norden Database`);
  };

  const deleteRule = (idx: number) => {
    setRules(prev => prev.filter((_, i) => i !== idx));
    pushLog(`ADMIN: MODIFIED_RULES_INDEX_${idx}`);
  };

  const filteredLeaderboard = useMemo(() => {
    return (leaderboards[activeMode] || []).filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [leaderboards, activeMode, searchQuery]);

  return (
    <div className={`flex min-h-screen bg-[#010103] text-white font-sans overflow-hidden selection:bg-cyan-500/50 ${maintenanceMode ? 'grayscale saturate-50' : ''}`}>
      
      {/* 🌌 DYNAMIC BACKGROUND ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.18)_0%,_transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* 🚀 CYBER-NEXUS SIDEBAR */}
      <aside className="w-24 hover:w-72 transition-all duration-[800ms] border-r border-white/5 bg-black/80 backdrop-blur-[120px] flex flex-col items-center py-12 z-[100] group shadow-[20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="mb-20 cursor-pointer relative" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-600 rounded-3xl flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000 shadow-[0_0_40px_rgba(6,182,212,0.4)] relative z-10">
            <Zap size={28} className="text-white fill-white" />
          </div>
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-all duration-700"></div>
        </div>

        <nav className="flex flex-col gap-8 w-full px-6 flex-1">
          <MenuButton icon={<LayoutDashboard size={22}/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <MenuButton icon={<ShoppingCart size={22}/>} label="MARKETPLACE" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <MenuButton icon={<Swords size={22}/>} label="WAR_ROOM" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <MenuButton icon={<PlayCircle size={22}/>} label="MEDIA_HUB" active={activeMenu === 'MEDIA'} onClick={() => setActiveMenu('MEDIA')} />
          <MenuButton icon={<Terminal size={22}/>} label="SYSTEM_LOGS" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
          
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />
          <MenuButton icon={<ShieldCheck size={22} className={isAuthorized ? "text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" : "text-red-500"} />} label="GOD_MODE" onClick={() => setIsAdminOpen(true)} />
        </nav>

        <div className="mt-auto px-6 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2">Uptime</p>
              <p className="text-xs font-mono text-cyan-400">{Math.floor(systemUptime/60)}m {systemUptime%60}s</p>
           </div>
        </div>
      </aside>

      {/* 🖥️ MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative z-10">
        
        {/* TOP BAR */}
        <header className="px-16 py-10 flex justify-between items-center sticky top-0 bg-[#010103]/90 backdrop-blur-3xl z-[90] border-b border-white/5 shadow-2xl">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-4">
               <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none bg-gradient-to-r from-white via-white to-cyan-500 bg-clip-text text-transparent">NORDEN<span className="text-cyan-400">MC</span></h1>
               <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md">
                  <p className="text-[10px] font-black text-cyan-400 tracking-tighter">APEX_NEXUS</p>
               </div>
            </div>
            <p className="text-[11px] font-black text-white/30 mt-3 uppercase tracking-[0.4em] flex items-center gap-3">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               NETWORK_STATUS: OPTIMAL // {SYSTEM_VERSION}
            </p>
          </motion.div>

          <div className="flex items-center gap-10">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-all" size={20} />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SCAN_DATABASE_NODES..." className="bg-white/5 border border-white/10 rounded-[2rem] pl-14 pr-8 py-4 text-sm outline-none w-[450px] focus:border-cyan-500/50 focus:bg-white/10 transition-all font-medium" />
            </div>
            <div className="flex flex-col items-end">
               <button className="bg-white text-black font-black text-[11px] px-10 py-5 rounded-[2rem] uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300">
                  {SERVER_IP}
               </button>
            </div>
          </div>
        </header>

        <main className="p-16 max-w-[1900px] mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* 📊 DASHBOARD VIEW */}
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-16">
                
                {/* MODE SELECTOR */}
                <div className="bg-black/50 backdrop-blur-3xl p-3 rounded-[3rem] border border-white/10 w-fit mx-auto flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {MODES.map((mode) => (
                    <button key={mode} onClick={() => setActiveMode(mode)} className={`relative px-10 py-4 rounded-full text-[12px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${activeMode === mode ? 'text-black' : 'text-white/30 hover:text-white'}`}>
                      {activeMode === mode && <motion.div layoutId="modeGlow" className="absolute inset-0 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.5)]" />}
                      <span className="relative z-10">{mode}</span>
                    </button>
                  ))}
                </div>

                {/* PODIUM SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {filteredLeaderboard.slice(0, 3).map((p, i) => (
                    <PodiumCard key={p.name} player={p} rank={i+1} onClick={() => setSelectedPlayer(p)} />
                  ))}
                </div>

                {/* LIST SECTION */}
                <div className="space-y-6 mt-20">
                  <div className="flex items-center px-12 mb-4 text-[11px] font-black text-white/20 uppercase tracking-[0.5em]">
                     <span className="w-24">Rank</span>
                     <span className="flex-1">Warrior Identity</span>
                     <span className="w-48 text-right">Combat XP</span>
                     <span className="w-48 text-right">K/D Ratio</span>
                  </div>
                  {filteredLeaderboard.map((p, i) => (
                    <PlayerListRow key={p.name} player={p} onClick={() => setSelectedPlayer(p)} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ⚔️ WAR_ROOM VIEW */}
            {activeMenu === 'CLANS' && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-16">
                
                {/* HERO HEADER */}
                <div className="bg-gradient-to-br from-white/10 to-transparent p-16 rounded-[4.5rem] border border-white/10 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">WAR_ROOM<br/><span className="text-cyan-400">ALLIANCES</span></h2>
                        <p className="text-white/40 text-lg mt-6 uppercase font-black tracking-[0.2em] leading-relaxed">Centralized Command for NordenMC Factions. Form alliances, manage enlistments, and dominate the leaderboard.</p>
                        <button onClick={() => setIsClanGuiOpen(true)} className="mt-10 bg-cyan-500 text-black font-black px-16 py-6 rounded-[2.5rem] uppercase tracking-widest flex items-center gap-5 hover:bg-white hover:scale-105 transition-all duration-500 shadow-[0_20px_40px_rgba(6,182,212,0.3)] group">
                            <UserPlus size={28} className="group-hover:rotate-12 transition-transform"/> INITIALIZE_TEAM_NODE
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-[800px] h-full overflow-hidden opacity-10">
                       <Swords size={600} className="text-white -mr-40 rotate-12" />
                    </div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full" />
                </div>

                {/* CLAN GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                   {clans.map((clan, i) => (
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={clan.id} className="bg-black/50 border border-white/10 p-12 rounded-[4.5rem] relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-500 shadow-2xl">
                        <div className="flex justify-between items-start mb-10">
                           <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500">
                              <Shield size={40} />
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Network ID</p>
                              <p className="text-sm font-mono text-cyan-400 font-black">{clan.id.split('_')[1]}</p>
                           </div>
                        </div>
                        
                        <h3 className={`text-5xl font-black italic uppercase mb-3 tracking-tighter ${clan.color}`}>{clan.name}</h3>
                        <p className="text-[12px] text-white/40 tracking-[0.4em] mb-10 uppercase font-black">HEAD_OF_COMMAND: {clan.leader}</p>
                        
                        <div className="grid grid-cols-2 gap-6 mb-12">
                           <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-colors">
                              <p className="text-[10px] text-white/20 uppercase font-black mb-2 tracking-widest">MEMBERS</p>
                              <p className="text-3xl font-black italic">{clan.members}</p>
                           </div>
                           <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-colors">
                              <p className="text-[10px] text-white/20 uppercase font-black mb-2 tracking-widest">POWER_LVL</p>
                              <p className="text-3xl font-black italic text-cyan-400">{clan.power}</p>
                           </div>
                        </div>

                        <button onClick={() => { setTargetClanForJoin(clan); setIsJoinGuiOpen(true); }} className="w-full bg-white/10 border border-white/10 text-white font-black py-6 rounded-3xl uppercase text-[12px] tracking-[0.3em] hover:bg-cyan-500 hover:text-black transition-all duration-500 flex items-center justify-center gap-4">
                            <Send size={20}/> DISPATCH_ENLISTMENT
                        </button>
                     </motion.div>
                   ))}
                </div>
              </motion.div>
            )}

            {/* 📟 SYSTEM & GMAIL RECRUITMENT VIEW */}
            {activeMenu === 'LOGS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[800px]">
                 
                 {/* KERNEL LOGS */}
                 <div className="bg-black/80 border border-white/10 rounded-[4.5rem] p-12 font-mono flex flex-col shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full" />
                    <div className="flex justify-between items-center mb-12 relative z-10">
                        <h2 className="text-3xl font-black italic uppercase flex items-center gap-5 text-white"><Terminal className="text-cyan-400" size={32} /> KERNEL_CORE_STREAMS</h2>
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                           <span className="text-[11px] font-black text-green-400 uppercase tracking-widest">Relay_Active</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-5 pr-6 relative z-10">
                       {logs.map((log, i) => (
                         <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={i} className="text-[13px] text-cyan-500/50 uppercase leading-relaxed flex gap-6 group">
                            <span className="text-white/10 font-black min-w-[40px] group-hover:text-cyan-500/30 transition-colors">[{logs.length - i}]</span> 
                            <span className="group-hover:text-white transition-colors">{log}</span>
                         </motion.div>
                       ))}
                    </div>
                 </div>

                 {/* RECRUITMENT INBOX (GMAIL SIMULATION) */}
                 <div className="bg-black/40 border border-white/10 rounded-[4.5rem] p-12 flex flex-col shadow-2xl relative overflow-hidden">
                    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-fuchsia-600/5 blur-[150px] rounded-full" />
                    <div className="flex justify-between items-center mb-12 relative z-10">
                        <h2 className="text-3xl font-black italic uppercase text-fuchsia-400 flex items-center gap-5"><Inbox size={32} /> GMAIL_ENLISTMENTS</h2>
                        <div className="bg-fuchsia-500/10 text-fuchsia-400 text-[10px] font-black px-5 py-2 rounded-full uppercase border border-fuchsia-500/20 tracking-widest">Simulated SMTP Relay</div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-8 pr-6 relative z-10">
                       {clans.map(c => c.requests.map((req: any) => (
                         <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={req.id} className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:border-fuchsia-500/40 transition-all duration-500 group shadow-xl">
                            <div className="flex justify-between items-start mb-8">
                               <div>
                                  <div className="flex items-center gap-4">
                                     <h4 className="text-3xl font-black italic uppercase text-white group-hover:text-fuchsia-400 transition-colors">{req.ign}</h4>
                                     <span className="text-[10px] bg-white/5 text-white/40 px-3 py-1 rounded-md uppercase font-black">NEW_SIGNAL</span>
                                  </div>
                                  <p className="text-[11px] text-white/30 uppercase tracking-[0.3em] mt-2 font-black">Target Alliance: <span className="text-white">{c.name}</span></p>
                               </div>
                               <div className="flex gap-4">
                                  <button onClick={() => handleRequestAction(c.id, req.id, 'ACCEPT')} className="w-16 h-16 bg-green-500 text-black rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-green-500/20"><UserCheck size={28}/></button>
                                  <button onClick={() => handleRequestAction(c.id, req.id, 'REJECT')} className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-red-500/20"><UserX size={28}/></button>
                               </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6 mb-8">
                               <div className="bg-black/60 p-5 rounded-2xl border border-white/5 text-[11px] uppercase font-black flex items-center gap-4 text-white/70">
                                  <AtSign size={18} className="text-cyan-400"/> {req.discord}
                               </div>
                               <div className="bg-black/60 p-5 rounded-2xl border border-white/5 text-[11px] uppercase font-black flex items-center gap-4 text-white/70">
                                  <Mail size={18} className="text-fuchsia-400"/> {req.gmail}
                               </div>
                            </div>

                            <div className="bg-black/20 p-8 rounded-[2rem] border border-white/5 italic shadow-inner">
                               <p className="text-xs text-white/50 leading-loose uppercase font-black tracking-widest">
                                  <span className="text-fuchsia-500 mr-2">"</span>
                                  {req.reason || 'PLAYER DID NOT PROVIDE AN ENLISTMENT STATEMENT.'}
                                  <span className="text-fuchsia-500 ml-2">"</span>
                               </p>
                            </div>
                         </motion.div>
                       )))}
                       {clans.every(c => c.requests.length === 0) && (
                         <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-10">
                            <ZapIcon size={120} className="mb-8" />
                            <p className="text-2xl font-black uppercase tracking-[0.8em]">No Signals Detected</p>
                            <p className="text-[10px] mt-4 uppercase tracking-[0.4em]">Listening for incoming enlistment packets...</p>
                         </div>
                       )}
                    </div>
                 </div>
              </motion.div>
            )}

            {/* 🛒 MARKETPLACE VIEW */}
            {activeMenu === 'MARKET' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {globalRanks.map((rank) => (
                  <MarketCard key={rank.id} rank={rank} />
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* 📧 ENLISTMENT MODAL (ADVANCED GUI) */}
      <AnimatePresence>
        {isJoinGuiOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12 bg-black/95 backdrop-blur-[100px]">
             <motion.div initial={{ scale: 0.8, opacity: 0, rotateX: 20 }} animate={{ scale: 1, opacity: 1, rotateX: 0 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-[#050505] border border-white/10 w-full max-w-3xl rounded-[5rem] p-16 shadow-[0_0_150px_rgba(6,182,212,0.2)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-600" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full" />
                
                <h2 className="text-5xl font-black italic uppercase text-center mb-4 tracking-tighter">ENLISTMENT_REQUEST</h2>
                <p className="text-center text-[11px] text-white/30 uppercase tracking-[0.6em] mb-16 flex items-center justify-center gap-4"><Globe size={16} className="text-cyan-500" /> TARGET_NODE: <span className="text-white bg-white/5 px-4 py-1 rounded-md">{targetClanForJoin?.name}</span></p>
                
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <GuiInput icon={<User />} label="Player In-Game Name" value={joinForm.ign} onChange={v => setJoinForm({...joinForm, ign: v})} />
                    <GuiInput icon={<Mail />} label="Command Gmail Address" value={joinForm.gmail} onChange={v => setJoinForm({...joinForm, gmail: v})} />
                </div>
                <div className="mb-8">
                    <GuiInput icon={<Hash />} label="Discord Handle" value={joinForm.discord} onChange={v => setJoinForm({...joinForm, discord: v})} />
                </div>
                <div className="space-y-3 mb-12">
                    <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em] ml-8">Enlistment Statement (Why you?)</p>
                    <textarea value={joinForm.reason} onChange={e => setJoinForm({...joinForm, reason: e.target.value})} className="w-full bg-white/5 border border-white/10 p-10 rounded-[3rem] text-sm outline-none focus:border-fuchsia-500/50 focus:bg-white/10 transition-all font-black h-40 uppercase italic tracking-widest leading-loose" placeholder="TRANSMITTING_MESSAGE..." />
                </div>
                
                <div className="flex flex-col gap-6">
                    <button onClick={submitJoinRequest} className="w-full bg-white text-black font-black py-8 rounded-[2.5rem] uppercase tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-cyan-400 transition-all duration-500 shadow-2xl text-lg">
                       <Send size={28}/> DISPATCH_SMTP_PACKET
                    </button>
                    <button onClick={() => setIsJoinGuiOpen(false)} className="w-full text-white/20 font-black text-[12px] uppercase tracking-[0.4em] hover:text-white transition-colors py-4">ABORT_RELAY_STATION</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ⚔️ CLAN CREATION MODAL */}
      <AnimatePresence>
        {isClanGuiOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12 bg-black/95 backdrop-blur-[100px]">
             <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#050505] border border-white/10 w-full max-w-3xl rounded-[5rem] p-16 relative shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full" />
                <h2 className="text-6xl font-black italic uppercase text-center mb-16 tracking-tighter">DEPLOY_CLAN_CORE</h2>
                
                <div className="space-y-10">
                    <div className="grid grid-cols-2 gap-8">
                        <GuiInput icon={<Users />} label="Alliance Identity" value={clanForm.teamName} onChange={v => setClanForm({...clanForm, teamName: v})} />
                        <GuiInput icon={<User />} label="Commander IGN" value={clanForm.ign} onChange={v => setClanForm({...clanForm, ign: v})} />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <GuiInput icon={<Mail />} label="Admin SMTP Gmail" value={clanForm.gmail} onChange={v => setClanForm({...clanForm, gmail: v})} />
                        <GuiInput icon={<Hash />} label="Discord Master ID" value={clanForm.discordName} onChange={v => setClanForm({...clanForm, discordName: v})} />
                    </div>
                    
                    <div className="pt-8">
                        <button onClick={handleClanCreation} className="w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-600 text-white font-black py-8 rounded-[3rem] uppercase tracking-[0.4em] flex items-center justify-center gap-6 hover:scale-[1.03] transition-all duration-500 shadow-[0_25px_60px_rgba(79,70,229,0.3)] text-xl group">
                           <Crosshair size={32} className="group-hover:rotate-90 transition-transform duration-700"/> INITIALIZE_ALLIANCE_PROTOCOL
                        </button>
                        <button onClick={() => setIsClanGuiOpen(false)} className="w-full text-white/20 font-black text-[12px] uppercase text-center mt-10 tracking-[0.4em] hover:text-red-500 transition-colors">TERMINATE_DEPLOYMENT</button>
                    </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔐 GOD-MODE PANEL (UNROLLING FULL LOGIC) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 1200 }} animate={{ x: 0 }} exit={{ x: 1200 }} transition={{ type: 'spring', damping: 25, stiffness: 120 }} className="fixed right-0 top-0 h-full w-[800px] bg-[#020206]/98 border-l border-white/10 z-[2000] p-16 shadow-[-50px_0_150px_rgba(0,0,0,1)] backdrop-blur-3xl overflow-y-auto custom-scrollbar">
            
            <div className="flex justify-between items-center mb-20 sticky top-0 bg-[#020206]/10 backdrop-blur-2xl py-8 border-b border-white/10 z-[2010]">
              <div>
                <h2 className="text-5xl font-black italic uppercase text-cyan-400 flex items-center gap-6"><Gavel size={50}/> GOD_MODE_OVERRIDE</h2>
                <p className="text-[11px] font-black text-white/20 uppercase mt-2 tracking-[0.5em]">System Privileges: LEVEL_MAX // {SYSTEM_VERSION}</p>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="bg-red-500/10 text-red-500 border border-red-500/20 px-10 py-4 rounded-[2rem] font-black text-[11px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300">DISCONNECT</button>
            </div>

            {!isAuthorized ? (
              <div className="py-32 flex flex-col items-center max-w-md mx-auto">
                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-12 border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                   <Lock size={48} className="text-red-500 animate-pulse" />
                </div>
                <p className="text-[12px] font-black text-white/30 uppercase tracking-[0.4em] mb-10">Access Key Required for System Mount</p>
                <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (passwordInput === PASSKEY ? setIsAuthorized(true) : alert("SYSTEM_ACCESS_DENIED"))} placeholder="ENTER_LEGION_KEY..." className="bg-white/5 border border-white/10 w-full p-10 rounded-[3rem] text-center text-4xl outline-none mb-10 focus:border-cyan-500 focus:bg-white/10 transition-all font-black placeholder:text-white/5" />
                <button onClick={() => passwordInput === PASSKEY ? setIsAuthorized(true) : alert("SYSTEM_ACCESS_DENIED")} className="w-full bg-white text-black font-black py-8 rounded-[2.5rem] uppercase tracking-[0.5em] hover:bg-cyan-400 transition-all duration-500 shadow-2xl text-lg">AUTHORIZE_ADMIN</button>
              </div>
            ) : (
              <div className="space-y-20 pb-32">
                
                {/* GLOBAL DISCORD BRIDGE */}
                <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500" />
                   <h4 className="text-3xl font-black italic uppercase mb-10 flex items-center gap-6 text-fuchsia-400"><Radio size={32}/> GLOBAL_WEBHOOK_RELAY</h4>
                   <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.3em] mb-6">Enter Discord Webhook for real-time notifications</p>
                   <div className="flex gap-6">
                      <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="HTTPS://DISCORD.COM/API/WEBHOOKS/..." className="flex-1 bg-black/80 border border-white/10 p-6 rounded-3xl text-[11px] outline-none focus:border-fuchsia-500/50 transition-all font-mono" />
                      <button onClick={() => sendDiscordAlert("SYSTEM_PING", "Manual Admin Connection Established.")} className="bg-fuchsia-500 text-white p-6 rounded-3xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-fuchsia-500/20"><Send size={28}/></button>
                   </div>
                </div>

                {/* CLAN MASTER OVERRIDE */}
                <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
                   <h4 className="text-3xl font-black italic uppercase mb-12 text-indigo-400 flex items-center gap-6"><ShieldQuestion size={32}/> ALLIANCE_DESTRUCTION_LIST</h4>
                   <div className="space-y-6">
                     {clans.map((c) => (
                       <div key={c.id} className="bg-black/60 p-10 rounded-[3rem] border border-white/5 flex justify-between items-center group hover:border-indigo-500/40 transition-all duration-500">
                          <div>
                             <h5 className="text-3xl font-black italic uppercase text-white group-hover:text-cyan-400 transition-colors tracking-tighter">{c.name}</h5>
                             <p className="text-[11px] text-white/20 uppercase mt-3 font-black tracking-widest">ID: {c.id} | SMTP: {c.email} | Lead: {c.leader}</p>
                          </div>
                          <button onClick={() => deleteClan(c.id)} className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-xl shadow-red-500/0 hover:shadow-red-500/30"><Trash2 size={28}/></button>
                       </div>
                     ))}
                   </div>
                </div>

                {/* RULESET MANAGER */}
                <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10">
                   <h4 className="text-3xl font-black italic uppercase mb-12 text-cyan-400 flex items-center gap-6"><Gavel size={32}/> NETWORK_RULESET_MOD</h4>
                   <div className="space-y-4 mb-10">
                      {rules.map((rule, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-black/40 p-5 rounded-2xl border border-white/5">
                           <p className="text-xs font-black uppercase tracking-widest text-white/50">{idx + 1}. {rule}</p>
                           <button onClick={() => deleteRule(idx)} className="text-red-500 hover:text-white transition-colors"><X size={16}/></button>
                        </div>
                      ))}
                   </div>
                   <div className="flex gap-4">
                      <input id="new-rule-input" placeholder="DEFINE_NEW_RULE..." className="flex-1 bg-black border border-white/10 p-5 rounded-2xl text-xs outline-none uppercase font-black" />
                      <button onClick={() => {
                        const input = document.getElementById('new-rule-input') as HTMLInputElement;
                        if(input.value) {
                           setRules(prev => [...prev, input.value]);
                           input.value = '';
                           pushLog("ADMIN: DEPLOYED_NEW_GLOBAL_RULE");
                        }
                      }} className="bg-cyan-500 text-black px-8 rounded-2xl font-black uppercase text-[11px]">ADD</button>
                   </div>
                </div>

                <div className="pt-10">
                   <button onClick={syncVault} className="w-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 text-white font-black py-10 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] uppercase tracking-[0.5em] flex items-center justify-center gap-8 text-2xl hover:scale-[1.03] transition-all duration-700 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
                      <Save size={40} className="relative z-10" /> <span className="relative z-10">COMMIT_TO_VAULT</span>
                   </button>
                   <p className="text-center text-[10px] text-white/10 uppercase tracking-[1em] mt-10">End of God Mode Session Protocol</p>
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
// --- HIGH-END UI SUB-COMPONENTS ---
// ==========================================

function GuiInput({ icon, label, value, onChange }: any) {
    return (
        <div className="space-y-4 w-full">
            <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] ml-10">{label}</p>
            <div className="relative group">
                <div className="absolute left-10 top-1/2 -translate-y-1/2 text-cyan-500 group-focus-within:text-white transition-all duration-500">{icon}</div>
                <input value={value} onChange={e => onChange(e.target.value)} placeholder={`INIT_${label.toUpperCase().replace(/\s/g, '_')}...`} className="w-full bg-white/5 border border-white/10 p-8 pl-24 rounded-[3rem] text-sm outline-none focus:border-cyan-500 focus:bg-white/10 transition-all duration-500 font-black italic uppercase tracking-widest placeholder:text-white/5" />
            </div>
        </div>
    );
}

function MenuButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-8 w-full py-6 px-6 rounded-3xl transition-all duration-500 relative group ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform duration-500`}>{icon}</div>
      <span className="text-[14px] font-black tracking-[0.3em] hidden group-hover:block uppercase transition-all duration-500">{label}</span>
      {active && (
         <motion.div layoutId="sidebarGlow" className="absolute left-0 top-4 bottom-4 w-1.5 bg-cyan-400 rounded-r-full shadow-[0_0_25px_rgba(6,182,212,1)]" />
      )}
    </button>
  );
}

function PodiumCard({ player, rank, onClick }: any) {
  const is1 = rank === 1;
  const is2 = rank === 2;
  const is3 = rank === 3;
  
  return (
    <motion.div whileHover={{ y: -15 }} onClick={onClick} className={`cursor-pointer bg-gradient-to-b ${is1 ? 'from-cyan-500/30 to-transparent border-cyan-500/40 shadow-cyan-500/10' : 'from-white/5 to-transparent border-white/5'} border-2 p-12 rounded-[6rem] text-center relative group shadow-2xl overflow-hidden transition-all duration-700`}>
      {is1 && <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-20"><Crown size={180} className="text-yellow-400" /></div>}
      
      <div className="relative z-10">
        <div className="relative w-48 h-48 mx-auto mb-10">
           <img src={player.img} className="w-full h-full rounded-[4.5rem] border-4 border-white/10 group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-[1000ms] shadow-[0_30px_60px_rgba(0,0,0,0.5)]" />
           <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center font-black italic text-2xl shadow-2xl border-2 border-white/10 ${is1 ? 'bg-yellow-400 text-black' : is2 ? 'bg-slate-300 text-black' : 'bg-amber-600 text-white'}`}>
              {rank}
           </div>
        </div>
        
        <h4 className="text-5xl font-black italic uppercase leading-none tracking-tighter group-hover:text-cyan-400 transition-colors duration-500">{player.name}</h4>
        <p className="text-[12px] font-black text-white/30 tracking-[0.5em] mt-5 uppercase">{player.tag}</p>
        
        <div className="mt-12 pt-10 border-t border-white/5 grid grid-cols-2 gap-8">
            <div><p className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2">Efficiency</p><p className="text-3xl font-black italic text-white leading-none">{player.kd}</p></div>
            <div><p className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2">Legacy XP</p><p className="text-3xl font-black italic text-cyan-400 leading-none">{Math.floor(player.xp / 1000)}K</p></div>
        </div>
      </div>
    </motion.div>
  );
}

function PlayerListRow({ player, onClick }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} onClick={onClick} className="bg-black/40 border border-white/5 p-8 rounded-[3.5rem] flex items-center justify-between group hover:border-cyan-500/30 transition-all duration-500 cursor-pointer relative overflow-hidden shadow-2xl group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:to-cyan-500/5 transition-all duration-700" />
      
      <div className="flex items-center gap-14 relative z-10">
        <span className="text-6xl font-black italic text-white/5 w-32 group-hover:text-cyan-500/10 transition-colors duration-500">{player.rank}</span>
        <div className="relative">
           <img src={player.img} className="w-20 h-20 rounded-3xl border border-white/10 shadow-2xl group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-700" />
           <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0d0d0d]"></div>
        </div>
        <div>
           <h4 className="text-4xl font-black italic uppercase group-hover:text-cyan-400 transition-colors duration-500 tracking-tighter">{player.name}</h4>
           <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] mt-2 flex items-center gap-3">
              {player.tag} <span className="w-1 h-1 bg-white/10 rounded-full"></span> {player.kills} KILLS
           </p>
        </div>
      </div>

      <div className="flex items-center gap-16 relative z-10">
        <div className="text-right">
            <p className="text-[10px] text-white/10 uppercase font-black mb-2 tracking-[0.2em]">Combat Rating</p>
            <p className="text-5xl font-black italic text-white/70 group-hover:text-white transition-all duration-500">{player.kd}</p>
        </div>
        <div className="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center text-white/10 group-hover:bg-cyan-500 group-hover:text-black group-hover:rotate-45 transition-all duration-700 shadow-xl border border-white/5">
            <ArrowUpRight size={32}/>
        </div>
      </div>
    </motion.div>
  );
}

function MarketCard({ rank }: any) {
    return (
      <div className="bg-black/60 border border-white/10 p-14 rounded-[5rem] text-center group hover:border-fuchsia-500/40 transition-all duration-700 shadow-2xl relative overflow-hidden flex flex-col h-full">
        <div className="absolute top-0 right-0 w-40 h-40 bg-fuchsia-500/10 blur-[80px] rounded-full" />
        
        <div className="w-28 h-28 bg-white/5 rounded-[2.5rem] mx-auto mb-12 flex items-center justify-center border border-white/10 group-hover:bg-fuchsia-500 group-hover:text-black group-hover:rotate-[360deg] transition-all duration-[1000ms] shadow-2xl">
            <Sparkles size={48} />
        </div>

        <h3 className={`text-4xl font-black italic mb-6 uppercase tracking-tighter ${rank.color}`}>{rank.name}</h3>
        <p className="text-[13px] text-white/30 mb-auto uppercase leading-loose font-black tracking-widest px-6">{rank.description}</p>
        
        <div className="mt-14 pt-10 border-t border-white/5">
           <div className="flex items-center justify-between bg-black/40 p-6 rounded-[2.5rem] border border-white/5 mb-6 group-hover:border-fuchsia-500/20 transition-colors">
              <span className="text-3xl font-black italic text-white">{rank.cost} <span className="text-[11px] text-white/20 tracking-tighter ml-1">{rank.type}</span></span>
           </div>
           <button className="w-full bg-white text-black text-[12px] font-black py-6 rounded-3xl uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all duration-500 shadow-2xl active:scale-95">
              INITIALIZE_PURCHASE
           </button>
        </div>
      </div>
    );
}
