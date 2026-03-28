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

const INITIAL_LEADERBOARDS: Record<string, any[]> = {
  OVERALL: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 125000, ip: "192.168.1.1", banned: false, kills: 15400, deaths: 1241, wins: 890, loses: 45 },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 112000, ip: "192.168.1.2", banned: false, kills: 12000, deaths: 1080, wins: 750, loses: 60 },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", statType: "HT1", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 98000, ip: "192.168.1.3", banned: false, kills: 9800, deaths: 1000, wins: 620, loses: 85 },
  ],
  "LTMs": [{ rank: "01", name: "EVENT_KING", tag: "LTM_GOD", statType: "HT1", kd: "15.0", img: "https://mc-heads.net/avatar/Notch/100", xp: 5000, ip: "0.0.0.0", banned: false, kills: 500, deaths: 33 }],
};

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
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [leaderboards, setLeaderboards] = useState(INITIAL_LEADERBOARDS);
  const [clans, setClans] = useState(INITIAL_CLANS);
  const [rules, setRules] = useState(INITIAL_RULES);
  const [globalRanks, setGlobalRanks] = useState(INITIAL_RANKS);
  
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [isClanGuiOpen, setIsClanGuiOpen] = useState(false);
  const [isJoinGuiOpen, setIsJoinGuiOpen] = useState(false);
  const [targetClanForJoin, setTargetClanForJoin] = useState<any>(null);
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [webhookUrl, setWebhookUrl] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  const [logs, setLogs] = useState<string[]>([]);
  const [uptime, setUptime] = useState(0);

  const [clanForm, setClanForm] = useState({ teamName: '', discordName: '', ign: '', gmail: '' });
  const [joinForm, setJoinForm] = useState({ ign: '', discord: '', gmail: '', reason: '' });

  useEffect(() => {
    const saved = localStorage.getItem('NORDEN_OMNI_NEXUS_V28');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLeaderboards(parsed.leaderboards || INITIAL_LEADERBOARDS);
        setClans(parsed.clans || INITIAL_CLANS);
        setRules(parsed.rules || INITIAL_RULES);
        setWebhookUrl(parsed.webhookUrl || "");
      } catch (e) { console.error("DATA_CORRUPTION_DETECTED"); }
    }
    
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
      await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(embed) });
      pushLog(`DISCORD: DISPATCHED_${title.toUpperCase()}`);
    } catch (e) { pushLog("DISCORD: ERROR_DISPATCHING_PAYLOAD"); }
  };

  const handleCreateClan = () => {
    if (!clanForm.teamName || !clanForm.ign || !clanForm.gmail) return alert("ERROR: INCOMPLETE_CREDENTIALS");
    const newEntry = {
      id: `CLAN_${Math.floor(Math.random() * 9999)}`,
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
    if (!joinForm.ign || !joinForm.gmail || !joinForm.reason) return alert("ERROR: ENLISTMENT_DATA_MISSING");
    setClans(prev => prev.map(c => {
      if (c.id === targetClanForJoin.id) {
        pushLog(`SMTP: SENDING ENLISTMENT_PACKET FROM ${joinForm.gmail}`);
        dispatchWebhook("JOIN_REQUEST_SENT", `**Player:** ${joinForm.ign}\n**Target:** ${c.name}\n**Reason:** ${joinForm.reason}`);
        return { ...c, requests: [...(c.requests || []), { ...joinForm, id: Date.now() }] };
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
        return { ...c, requests: remaining };
      }
      return c;
    }));
  };

  const toggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    pushLog(`ADMIN: MAINTENANCE_MODE_${!maintenanceMode ? 'ENABLED' : 'DISABLED'}`);
    dispatchWebhook("SYSTEM_ALERT", `Maintenance mode has been ${!maintenanceMode ? 'ENABLED' : 'DISABLED'} by Administrator Utkarsh Pandey.`, 15158332);
  };

  const filteredStats = useMemo(() => {
    const list = leaderboards[activeMode] || [];
    return list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [leaderboards, activeMode, searchQuery]);

  return (
    <div className={`flex min-h-screen bg-[#020205] text-white font-sans overflow-hidden selection:bg-cyan-500 selection:text-black ${maintenanceMode ? 'grayscale saturate-50 brightness-75' : ''}`}>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <aside className="w-24 hover:w-72 transition-all duration-[700ms] border-r border-white/5 bg-black/60 backdrop-blur-[80px] flex flex-col items-center py-12 z-[100] group shadow-[25px_0_60px_rgba(0,0,0,0.8)]">
        <div className="mb-20 cursor-pointer group/logo" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-600 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] group-hover/logo:rotate-[360deg] transition-all duration-1000 relative z-10">
            <Zap size={32} className="text-white fill-white" />
          </div>
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
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative z-10">
        <header className="px-16 py-12 flex justify-between items-center sticky top-0 bg-[#020205]/90 backdrop-blur-3xl z-[90] border-b border-white/5">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-6">
               <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none bg-gradient-to-r from-white via-white to-cyan-500 bg-clip-text text-transparent">NORDEN<span className="text-cyan-400">MC</span></h1>
               <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <p className="text-[12px] font-black text-cyan-400 tracking-tighter uppercase">{SYSTEM_BUILD}</p>
               </div>
            </div>
            <p className="text-[12px] font-bold text-white/30 mt-4 uppercase tracking-[0.5em] flex items-center gap-4">
               <span className={`w-2.5 h-2.5 rounded-full ${maintenanceMode ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
               SYSTEM_STATUS: {maintenanceMode ? 'MAINTENANCE' : 'OPERATIONAL'}
            </p>
          </motion.div>

          <div className="flex items-center gap-12">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={22} />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SCAN_DATABASE_NODES..." className="bg-white/5 border border-white/10 rounded-[3rem] pl-16 pr-10 py-5 text-sm outline-none w-[500px] font-bold" />
            </div>
            <button className="bg-white text-black font-black text-[12px] px-12 py-6 rounded-[3rem] uppercase tracking-[0.4em] shadow-xl">{SERVER_IP}</button>
          </div>
        </header>

        <main className="p-16 max-w-[2000px] mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-20">
                <div className="bg-black/40 backdrop-blur-3xl p-4 rounded-[4rem] border border-white/10 w-fit mx-auto flex items-center gap-4">
                  {MODES.map((mode) => (
                    <button key={mode} onClick={() => setActiveMode(mode)} className={`relative px-12 py-5 rounded-[3rem] text-[13px] font-black tracking-[0.2em] uppercase transition-all ${activeMode === mode ? 'text-black' : 'text-white/30 hover:text-white'}`}>
                      {activeMode === mode && <motion.div layoutId="modeGlow" className="absolute inset-0 bg-white rounded-[3rem]" />}
                      <span className="relative z-10">{mode}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {filteredStats.slice(0, 3).map((player, index) => (
                    <PodiumCard key={player.name} player={player} rank={index + 1} onClick={() => setSelectedPlayer(player)} />
                  ))}
                </div>

                <div className="space-y-8 mt-24">
                  {filteredStats.map((p, i) => (
                    <PlayerRow key={p.name} player={p} onClick={() => setSelectedPlayer(p)} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeMenu === 'CLANS' && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-20">
                <div className="bg-gradient-to-br from-white/10 to-transparent p-20 rounded-[5rem] border border-white/10 relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">WAR_ROOM<br/><span className="text-cyan-400">COMMAND_CENTER</span></h2>
                        <div className="flex gap-8 mt-12">
                          <button onClick={() => setIsClanGuiOpen(true)} className="bg-cyan-500 text-black font-black px-16 py-7 rounded-[3rem] uppercase tracking-[0.3em] flex items-center gap-6">
                              <UserPlus size={30}/> INITIALIZE_ALLIANCE
                          </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                   {clans.map((clan, i) => (
                     <div key={clan.id} className="bg-black/50 border border-white/10 p-14 rounded-[5rem] relative group">
                        <h3 className={`text-6xl font-black italic uppercase mb-4 tracking-tighter ${clan.color}`}>{clan.name}</h3>
                        <p className="text-[14px] text-white/40 tracking-[0.5em] mb-12 uppercase font-black">Commander: {clan.leader}</p>
                        <button onClick={() => { setTargetClanForJoin(clan); setIsJoinGuiOpen(true); }} className="w-full bg-white/10 border border-white/10 text-white font-black py-7 rounded-[2.5rem] uppercase text-[13px] tracking-[0.4em] hover:bg-cyan-500 hover:text-black transition-all">DISPATCH_ENLISTMENT</button>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {activeMenu === 'LOGS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-[850px]">
                 <div className="bg-black/80 border border-white/10 rounded-[5rem] p-16 font-mono overflow-hidden flex flex-col">
                    <h2 className="text-4xl font-black italic uppercase mb-14 flex items-center gap-6 text-white"><TerminalIcon className="text-cyan-400" size={40} /> KERNEL_STREAMS</h2>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6">
                       {logs.map((log, i) => <div key={i} className="text-[14px] text-cyan-500/60 uppercase">{log}</div>)}
                    </div>
                 </div>

                 <div className="bg-[#050505]/60 border border-white/10 rounded-[5rem] p-16 flex flex-col overflow-hidden">
                    <h2 className="text-4xl font-black italic uppercase text-fuchsia-400 mb-14 flex items-center gap-6"><Inbox size={40} /> SMTP_RELAY_INBOX</h2>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-10">
                       {clans.flatMap(clan => clan.requests.map((req: any) => (
                         <div key={req.id} className="bg-white/5 p-12 rounded-[4rem] border border-white/10">
                            <div className="flex justify-between items-start mb-10">
                               <h4 className="text-4xl font-black italic uppercase text-white">{req.ign}</h4>
                               <div className="flex gap-5">
                                  <button onClick={() => resolveEnlistment(clan.id, req.id, 'ACCEPT')} className="w-16 h-16 bg-green-500 text-black rounded-2xl flex items-center justify-center"><UserCheck size={32}/></button>
                                  <button onClick={() => resolveEnlistment(clan.id, req.id, 'REJECT')} className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center"><UserX size={32}/></button>
                               </div>
                            </div>
                            <p className="text-sm text-white/50 uppercase tracking-widest italic">"{req.reason}"</p>
                         </div>
                       )))}
                    </div>
                 </div>
              </motion.div>
            )}

            {activeMenu === 'MARKET' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {globalRanks.map((rank) => <RankCard key={rank.id} rank={rank} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* MODALS & OVERLAYS (FULL LOGIC) */}
      <AnimatePresence>
        {isJoinGuiOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12 bg-black/95 backdrop-blur-[120px]">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#080808] border border-white/10 w-full max-w-4xl rounded-[6rem] p-20 shadow-2xl">
                <h2 className="text-7xl font-black italic uppercase text-center mb-20">ENLISTMENT_HANDSHAKE</h2>
                <div className="grid grid-cols-2 gap-12 mb-12">
                    <NexusInput icon={<User />} label="Player In-Game Name" value={joinForm.ign} onChange={v => setJoinForm({...joinForm, ign: v})} />
                    <NexusInput icon={<Mail />} label="Admin Gmail Relay" value={joinForm.gmail} onChange={v => setJoinForm({...joinForm, gmail: v})} />
                </div>
                <textarea value={joinForm.reason} onChange={e => setJoinForm({...joinForm, reason: e.target.value})} className="w-full bg-white/5 border border-white/10 p-12 rounded-[4rem] text-[15px] outline-none font-bold h-48 uppercase mb-16" placeholder="DESCRIBE_YOUR_INTENT..." />
                <button onClick={handleJoinSubmit} className="w-full bg-white text-black font-black py-10 rounded-[3rem] uppercase tracking-[0.5em] text-xl">DISPATCH_ENLISTMENT_SIGNAL</button>
                <button onClick={() => setIsJoinGuiOpen(false)} className="w-full text-white/10 font-black text-[13px] uppercase mt-4">ABORT_ALLIANCE_RELAY</button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isClanGuiOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12 bg-black/95 backdrop-blur-[120px]">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#080808] border border-white/10 w-full max-w-4xl rounded-[6rem] p-20 relative">
                <h2 className="text-7xl font-black italic uppercase text-center mb-20">DEPLOY_ALLIANCE_NODE</h2>
                <div className="space-y-12">
                    <div className="grid grid-cols-2 gap-12">
                        <NexusInput icon={<Shield />} label="Clan Identity" value={clanForm.teamName} onChange={v => setClanForm({...clanForm, teamName: v})} />
                        <NexusInput icon={<User />} label="Commander IGN" value={clanForm.ign} onChange={v => setClanForm({...clanForm, ign: v})} />
                    </div>
                    <button onClick={handleCreateClan} className="w-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 text-white font-black py-10 rounded-[3.5rem] uppercase tracking-[0.5em] text-2xl">INITIALIZE_ALLIANCE_PROTOCOL</button>
                    <button onClick={() => setIsClanGuiOpen(false)} className="w-full text-white/10 font-black text-[13px] uppercase text-center mt-12">TERMINATE_DEPLOYMENT_CORE</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 1200 }} animate={{ x: 0 }} exit={{ x: 1200 }} className="fixed right-0 top-0 h-full w-[900px] bg-[#030308]/98 border-l border-white/10 z-[2000] p-20 backdrop-blur-3xl overflow-y-auto">
            <div className="flex justify-between items-center mb-24 border-b border-white/10 pb-10">
              <h2 className="text-6xl font-black italic uppercase text-cyan-400 flex items-center gap-8 tracking-tighter"><Gavel size={60}/> GOD_MODE_OVERRIDE</h2>
              <button onClick={() => setIsAdminOpen(false)} className="bg-red-500/10 text-red-500 border border-red-500/30 px-12 py-5 rounded-[3rem] font-black uppercase">TERMINATE_SESSION</button>
            </div>

            {!isAuthorized ? (
              <div className="py-40 flex flex-col items-center max-w-lg mx-auto">
                <Lock size={60} className="text-red-500 mb-16 animate-pulse" />
                <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (passwordInput === PASSKEY ? setIsAuthorized(true) : alert("INVALID_KEY_CODE"))} placeholder="ENTER_LEGION_KEY..." className="bg-white/5 border border-white/10 w-full p-12 rounded-[4rem] text-center text-5xl outline-none mb-12 font-black" />
                <button onClick={() => passwordInput === PASSKEY ? setIsAuthorized(true) : alert("INVALID_KEY_CODE")} className="w-full bg-white text-black font-black py-10 rounded-[3rem] uppercase tracking-[0.6em] text-xl">AUTHENTICATE_IDENTITY</button>
              </div>
            ) : (
              <div className="space-y-24 pb-40">
                <div className="grid grid-cols-2 gap-10">
                   <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10">
                      <p className="text-[11px] font-black text-white/20 uppercase tracking-widest mb-4">Core Temperature</p>
                      <p className="text-5xl font-black italic text-cyan-400">32°C</p>
                   </div>
                   <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 cursor-pointer" onClick={toggleMaintenance}>
                      <p className="text-[11px] font-black text-white/20 uppercase tracking-widest mb-4">Maintenance Mode</p>
                      <p className={`text-5xl font-black italic ${maintenanceMode ? 'text-red-500' : 'text-white/20'}`}>{maintenanceMode ? 'ON' : 'OFF'}</p>
                   </div>
                </div>

                <div className="bg-white/5 p-16 rounded-[5rem] border border-white/10">
                   <h4 className="text-4xl font-black italic uppercase mb-12 flex items-center gap-8 text-fuchsia-400 tracking-tighter"><Radio size={40}/> DISCORD_RELAY_SYNC</h4>
                   <div className="flex gap-8">
                      <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="HTTPS://DISCORD.COM/API/WEBHOOKS/..." className="flex-1 bg-black border border-white/10 p-8 rounded-[2.5rem] text-[13px] outline-none font-mono" />
                      <button onClick={() => dispatchWebhook("SYSTEM_PING", "Administrator Utkarsh Pandey has initialized a secure link.")} className="bg-fuchsia-500 text-white px-10 rounded-[2.5rem]"><Send size={32}/></button>
                   </div>
                </div>

                <button onClick={saveToVault} className="w-full bg-gradient-to-r from-cyan-500 via-indigo-700 to-fuchsia-700 text-white font-black py-12 rounded-[4rem] uppercase tracking-[0.6em] text-3xl">COMMIT_TO_VAULT</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// COMPONENTS (REUSABLE)
function SidebarLink({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-10 w-full py-7 px-7 rounded-[2rem] transition-all relative group ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/15 hover:text-white'}`}>
      {icon} <span className="text-[15px] font-black tracking-[0.4em] hidden group-hover:block uppercase">{label}</span>
      {active && <motion.div layoutId="sidebarGlow" className="absolute left-0 top-6 bottom-6 w-2 bg-cyan-400 rounded-r-full" />}
    </button>
  );
}

function NexusInput({ icon, label, value, onChange }: any) {
    return (
        <div className="space-y-5 w-full">
            <p className="text-[13px] font-black text-white/20 uppercase tracking-[0.5em] ml-12">{label}</p>
            <div className="relative">
                <div className="absolute left-12 top-1/2 -translate-y-1/2 text-cyan-500">{icon}</div>
                <input value={value} onChange={e => onChange(e.target.value)} placeholder={`SYST_${label.toUpperCase().replace(/\s/g, '_')}...`} className="w-full bg-white/5 border border-white/10 p-10 pl-28 rounded-[3.5rem] text-[14px] outline-none font-black italic uppercase" />
            </div>
        </div>
    );
}

function PodiumCard({ player, rank, onClick }: any) {
  const isRank1 = rank === 1;
  return (
    <motion.div whileHover={{ y: -20 }} onClick={onClick} className={`cursor-pointer bg-gradient-to-b ${isRank1 ? 'from-cyan-500/40' : 'from-white/10'} to-transparent border-2 border-white/10 p-16 rounded-[7rem] text-center relative group`}>
      <img src={player.img} className="w-56 h-56 mx-auto mb-12 rounded-[5rem] border-4 border-white/10" />
      <h4 className="text-6xl font-black italic uppercase tracking-tighter">{player.name}</h4>
      <p className="text-[14px] font-black text-white/30 tracking-[0.6em] mt-6 uppercase">{player.tag}</p>
    </motion.div>
  );
}

function PlayerRow({ player, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-black/40 border border-white/5 p-10 rounded-[4rem] flex items-center justify-between group cursor-pointer hover:border-cyan-500/40">
      <div className="flex items-center gap-16">
        <span className="text-7xl font-black italic text-white/5 w-40">{player.rank}</span>
        <img src={player.img} className="w-24 h-24 rounded-[2rem] border-2 border-white/10" />
        <h4 className="text-5xl font-black italic uppercase tracking-tighter">{player.name}</h4>
      </div>
      <div className="flex items-center gap-20 mr-10">
        <p className="text-6xl font-black italic text-white/60">{player.kd}</p>
        <ArrowUpRight size={40} className="text-white/15"/>
      </div>
    </div>
  );
}

function RankCard({ rank }: any) {
    return (
      <div className="bg-black/60 border border-white/10 p-16 rounded-[6rem] text-center group flex flex-col h-full">
        <h3 className={`text-5xl font-black italic mb-8 uppercase tracking-tighter ${rank.color}`}>{rank.name}</h3>
        <p className="text-[14px] text-white/30 mb-auto uppercase font-black tracking-widest">{rank.description}</p>
        <div className="mt-16 pt-12 border-t border-white/10">
           <p className="text-5xl font-black italic text-white mb-8">{rank.cost} {rank.type}</p>
           <button className="w-full bg-white text-black font-black py-8 rounded-[2.5rem] uppercase tracking-[0.5em]">INITIALIZE_PURCHASE</button>
        </div>
      </div>
    );
}
