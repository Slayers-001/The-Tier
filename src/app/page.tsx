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
  BellRing, Share, Send
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

MODES.forEach(m => { if(!INITIAL_LEADERBOARDS[m]) INITIAL_LEADERBOARDS[m] = []; });

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

export default function NordenNexusAstraOmniV22() {
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
  
  // --- SECURITY & DISCORD ---
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] V22_ASTRA_OMNI_LIVE", "[KERNEL] DISCORD_WEBHOOK_ATTACHED"]);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");

  // --- ADMIN INPUTS ---
  const [newPlayer, setNewPlayer] = useState({ name: '', tag: '', kd: '', statType: 'HT1' });
  const [newRule, setNewRule] = useState('');

  // --- PERSISTENCE ---
  useEffect(() => {
    const data = localStorage.getItem('norden_v22_save');
    if (data) {
      const parsed = JSON.parse(data);
      setLeaderboards(parsed.leaderboards || INITIAL_LEADERBOARDS);
      setClans(parsed.clans || INITIAL_CLANS);
      setRules(parsed.rules || INITIAL_RULES);
      setUserXP(parsed.userXP || 50000);
      setGlobalRanks(parsed.globalRanks || INITIAL_RANKS);
      setWebhookUrl(parsed.webhookUrl || "");
    }
  }, []);

  const pushLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 100));
  };

  // --- DISCORD WEBHOOK ENGINE ---
  const sendDiscordAlert = async (type: string, details: string) => {
    if (!webhookUrl) {
        pushLog("WEBHOOK_ERR: URL_NOT_FOUND");
        return;
    }
    const payload = {
      username: "ASTRA_OMNI_CORE",
      avatar_url: "https://mc-heads.net/avatar/Utkarsh/100",
      embeds: [{
        title: `⚡ SYSTEM_ALERT: ${type}`,
        description: details,
        color: type.includes("BAN") ? 16711680 : 65535, // Red for bans, Cyan for others
        timestamp: new Date(),
        footer: { text: "Astra Omni V22 // NordenMC" }
      }]
    };
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      pushLog(`DISCORD: ALERT_SENT_${type}`);
    } catch (e) {
      pushLog("DISCORD: FAILED_TO_SEND");
    }
  };

  const syncVault = () => {
    const bundle = { leaderboards, clans, rules, userXP, globalRanks, webhookUrl };
    localStorage.setItem('norden_v22_save', JSON.stringify(bundle));
    pushLog("OMNI_SYNC: VAULT_COMMITTED");
    alert("DATABASE UPDATED.");
  };

  // --- INTERACTION LOGIC ---
  const handleChallenge = (player: any) => {
    const matchId = Math.random().toString(36).substring(7).toUpperCase();
    pushLog(`DUEL: CHALLENGE_${matchId}_VS_${player.name}`);
    alert(`CHALLENGE ${matchId} DISPATCHED.`);
  };

  const handleShare = (player: any) => {
    const data = `NordenMC Stats: ${player.name} | KD: ${player.kd} | Mode: ${activeMode}`;
    navigator.clipboard.writeText(data);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const purchaseRank = (rank: any) => {
    if (rank.type === "XP") {
      if (userXP >= rank.cost) {
        setUserXP(prev => prev - rank.cost);
        pushLog(`MARKET: ${rank.name}_BOUGHT`);
        sendDiscordAlert("MARKET_PURCHASE", `User bought ${rank.name} for ${rank.cost} XP.`);
      } else {
        alert("XP_INSUFFICIENT.");
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
    pushLog("GOD_CMD: ECON_INFLATE_2X");
    sendDiscordAlert("ECONOMY_OVERRIDE", "Admin Utkarsh has doubled global XP values.");
  };

  const toggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    pushLog(`GOD_CMD: MAINT_${!maintenanceMode}`);
    sendDiscordAlert("SYSTEM_STATUS", `Maintenance mode set to: ${!maintenanceMode}`);
  };

  const addRule = () => {
    if(!newRule) return;
    setRules(prev => [...prev, newRule]);
    sendDiscordAlert("RULE_UPDATE", `New protocol added: ${newRule}`);
    setNewRule('');
  };

  const removeRule = (idx: number) => {
    setRules(prev => prev.filter((_, i) => i !== idx));
  };

  const injectPlayerNode = () => {
    if (!newPlayer.name) return;
    setLeaderboards(prev => {
      const updated = { ...prev };
      const currentList = updated[activeMode] || [];
      updated[activeMode] = [...currentList, {
        ...newPlayer,
        rank: (currentList.length + 1).toString().padStart(2, '0'),
        img: `https://mc-heads.net/avatar/${newPlayer.name}/100`,
        xp: 0, ip: "STATIC_NODE", banned: false
      }];
      return updated;
    });
    sendDiscordAlert("ENTITY_INJECTION", `Player ${newPlayer.name} injected into ${activeMode}.`);
    setNewPlayer({ name: '', tag: '', kd: '', statType: 'HT1' });
  };

  const toggleBan = (idx: number) => {
    setLeaderboards(prev => {
      const updated = { ...prev };
      const player = updated[activeMode][idx];
      player.banned = !player.banned;
      sendDiscordAlert(player.banned ? "SECURITY_BAN" : "SECURITY_UNBAN", `User ${player.name} has been ${player.banned ? 'banned' : 'restored'}.`);
      return updated;
    });
  };

  const filteredLeaderboard = useMemo(() => {
    return (leaderboards[activeMode] || []).filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [leaderboards, activeMode, searchQuery]);

  return (
    <div className={`flex min-h-screen bg-[#010103] text-white font-sans overflow-hidden selection:bg-cyan-500/50 ${maintenanceMode ? 'grayscale saturate-0' : ''}`}>
      
      {/* 🌌 BG FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.1)_0%,_transparent_60%)]"></div>
      </div>

      {/* 🚀 SIDEBAR */}
      <aside className="w-20 hover:w-64 transition-all duration-[800ms] border-r border-white/5 bg-black/80 backdrop-blur-[100px] flex flex-col items-center py-10 z-[60] group shadow-2xl overflow-hidden">
        <div className="mb-14 cursor-pointer" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000">
            <Zap size={24} className="text-white fill-white" />
          </div>
        </div>

        <nav className="flex flex-col gap-6 w-full px-4 flex-1">
          <MenuButton icon={<LayoutDashboard size={20}/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <MenuButton icon={<ShoppingCart size={20}/>} label="MARKET" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <MenuButton icon={<Swords size={20}/>} label="WAR_ROOM" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <MenuButton icon={<PlayCircle size={20}/>} label="MEDIA" active={activeMenu === 'MEDIA'} onClick={() => setActiveMenu('MEDIA')} />
          <MenuButton icon={<Terminal size={20}/>} label="SYSTEM" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
          
          <div className="h-px bg-white/5 my-6" />
          <MenuButton icon={<ShieldCheck size={20} className={isAuthorized ? "text-green-400" : "text-red-500"} />} label="ADMIN" onClick={() => setIsAdminOpen(true)} />
        </nav>

        <div className="mt-auto px-4 w-full opacity-0 group-hover:opacity-100 transition-all duration-700">
           <div className="bg-white/5 border border-white/10 p-4 rounded-3xl flex flex-col gap-2 shadow-xl">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{userXP.toLocaleString()} XP</span>
           </div>
        </div>
      </aside>

      {/* 🖥️ VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative z-10">
        
        <header className="px-12 py-8 flex justify-between items-center sticky top-0 bg-[#010103]/90 backdrop-blur-3xl z-40 border-b border-white/5">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
              NORDEN<span className="text-cyan-400">MC</span>
            </h1>
            <p className="text-[10px] font-black text-white/20 mt-2 uppercase tracking-widest">LIVE_NET_PVP</p>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SCAN_DATABASE..." className="bg-white/5 border border-white/10 rounded-full pl-10 pr-6 py-3 text-sm outline-none w-[350px]" />
            </div>
            <button className="bg-white text-black font-black text-[10px] px-8 py-3 rounded-full uppercase tracking-widest">{SERVER_IP}</button>
          </div>
        </header>

        <main className="p-12 max-w-[1800px] mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div className="bg-black/40 backdrop-blur-3xl p-2 rounded-full border border-white/5 w-fit mx-auto flex items-center gap-2">
                  {MODES.map((mode) => (
                    <button key={mode} onClick={() => setActiveMode(mode)} className={`relative px-6 py-2 rounded-full text-[11px] font-black tracking-widest uppercase transition-all ${activeMode === mode ? 'text-black' : 'text-white/30 hover:text-white'}`}>
                      {activeMode === mode && <motion.div layoutId="modeGlow" className="absolute inset-0 bg-white rounded-full" />}
                      <span className="relative z-10">{mode}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredLeaderboard.slice(0, 3).map((p, i) => (
                    <PodiumCard key={p.name} player={p} rank={i+1} onClick={() => setSelectedPlayer(p)} />
                  ))}
                </div>

                <div className="grid gap-4 mt-12">
                  {filteredLeaderboard.map((p, i) => (
                    <PlayerListRow key={p.name} player={p} onClick={() => setSelectedPlayer(p)} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeMenu === 'MARKET' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {globalRanks.map((rank) => (
                  <MarketCard key={rank.id} rank={rank} onBuy={() => purchaseRank(rank)} />
                ))}
              </motion.div>
            )}

            {activeMenu === 'LOGS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-black/50 border border-white/10 rounded-[3rem] p-8 font-mono h-[600px] overflow-hidden flex flex-col">
                    <h2 className="text-2xl font-black italic uppercase mb-6 flex items-center gap-2"><Terminal className="text-cyan-400" /> KERNEL_STREAM</h2>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
                       {logs.map((log, i) => <p key={i} className="text-[12px] text-cyan-500/60 uppercase">{log}</p>)}
                    </div>
                 </div>

                 <div className="bg-black/30 border border-white/10 rounded-[3rem] p-8 h-[600px] overflow-hidden flex flex-col">
                    <h2 className="text-2xl font-black italic uppercase mb-6 flex items-center gap-2"><BookOpen className="text-fuchsia-400" /> RULEBOOK</h2>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                       {rules.map((rule, i) => (
                         <div key={i} className="bg-white/5 p-4 rounded-2xl flex items-center gap-4">
                            <span className="text-fuchsia-400 font-black">0{i+1}</span>
                            <p className="text-sm font-black italic uppercase">{rule}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* 🔐 ADMIN PANEL (EXTENDED) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 1000 }} animate={{ x: 0 }} exit={{ x: 1000 }} className="fixed right-0 top-0 h-full w-[600px] bg-[#020206] border-l border-white/10 z-[100] p-10 shadow-2xl backdrop-blur-3xl overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-10 sticky top-0 bg-[#020206] py-4 border-b border-white/10">
              <h2 className="text-3xl font-black italic uppercase text-cyan-400 flex items-center gap-3"><Gavel /> GOD_MODE</h2>
              <button onClick={() => setIsAdminOpen(false)} className="bg-red-500/10 text-red-500 px-6 py-2 rounded-full font-black text-[10px] uppercase">EXIT</button>
            </div>

            {!isAuthorized ? (
              <div className="py-20 flex flex-col items-center">
                <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="PASSKEY..." className="bg-white/5 border border-white/10 w-full p-6 rounded-3xl text-center text-2xl outline-none focus:border-cyan-500 mb-6" />
                <button onClick={() => passwordInput === PASSKEY ? setIsAuthorized(true) : alert("WRONG_KEY")} className="w-full bg-white text-black font-black py-4 rounded-3xl uppercase tracking-widest">AUTHORIZE</button>
              </div>
            ) : (
              <div className="space-y-12 pb-20">
                {/* 📡 WEBHOOK CONTROLLER (NEW) */}
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                   <h4 className="text-xl font-black italic uppercase mb-4 flex items-center gap-2 text-fuchsia-400"><Radio size={18}/> DISCORD_BRIDGE</h4>
                   <p className="text-[10px] text-white/30 mb-4 tracking-widest">ENTER WEBHOOK URL TO SYNC ACTIONS TO DISCORD CHANNEL</p>
                   <div className="flex gap-2">
                      <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="HTTPS://DISCORD.COM/API/WEBHOOKS/..." className="flex-1 bg-black/40 border border-white/10 p-3 rounded-xl text-[10px] outline-none focus:border-fuchsia-500" />
                      <button onClick={() => sendDiscordAlert("TEST_PING", "Connection Established with Astra Omni Core.")} className="bg-fuchsia-500 text-white p-3 rounded-xl"><Send size={18}/></button>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <GodCommand icon={<TrendingUp />} title="ECON_INFLATE" onClick={economyInflation} color="text-cyan-400" bg="bg-cyan-500/5" />
                   <GodCommand icon={<Power />} title="MAINT_MODE" onClick={toggleMaintenance} color={maintenanceMode ? "text-green-500" : "text-yellow-500"} bg="bg-yellow-500/5" />
                </div>

                {/* 👤 ENTITY CONTROL */}
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                   <h4 className="text-xl font-black italic uppercase mb-6 flex items-center gap-2"><Edit3 size={18}/> ENTITY_MGMT // {activeMode}</h4>
                   <div className="space-y-3 mb-8 max-h-[300px] overflow-y-auto pr-2">
                     {leaderboards[activeMode]?.map((p, idx) => (
                       <div key={idx} className="bg-black p-4 rounded-xl border border-white/5 flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                             <img src={p.img} className="w-8 h-8 rounded-lg" />
                             <span className="text-sm font-black italic uppercase">{p.name}</span>
                          </div>
                          <button onClick={() => toggleBan(idx)} className={`p-2 rounded-lg ${p.banned ? 'bg-red-500' : 'bg-white/5'}`}><Hammer size={14}/></button>
                       </div>
                     ))}
                   </div>
                   <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-4">
                      <input value={newPlayer.name} onChange={e => setNewPlayer({...newPlayer, name: e.target.value})} placeholder="NAME" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-xs" />
                      <button onClick={injectPlayerNode} className="w-full bg-cyan-500 text-black font-black py-3 rounded-xl text-[10px] uppercase">INJECT_PLAYER</button>
                   </div>
                </div>

                {/* 📝 RULEBOOK CONTROL */}
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                   <h4 className="text-xl font-black italic uppercase mb-6 flex items-center gap-2"><Shield size={18}/> RULE_PROTOCOL</h4>
                   <div className="space-y-3 mb-4">
                      {rules.map((rule, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-black p-3 rounded-xl border border-white/5">
                           <p className="text-[10px] font-black italic uppercase flex-1 truncate">{rule}</p>
                           <button onClick={() => removeRule(idx)} className="text-red-500"><X size={14}/></button>
                        </div>
                      ))}
                   </div>
                   <div className="flex gap-2">
                      <input value={newRule} onChange={e => setNewRule(e.target.value)} placeholder="PROTOCOL..." className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-xs" />
                      <button onClick={addRule} className="bg-fuchsia-500 text-white p-3 rounded-xl"><UserPlus size={18}/></button>
                   </div>
                </div>

                <button onClick={syncVault} className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black py-6 rounded-[2rem] shadow-xl uppercase tracking-widest flex items-center justify-center gap-4 text-lg">
                  <Save size={24} /> COMMIT_SYSTEM_DATA
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👤 PLAYER MODAL (LEGACY) */}
      <AnimatePresence>
        {selectedPlayer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/90 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-black border border-white/10 w-full max-w-4xl rounded-[4rem] p-12 relative shadow-2xl">
              <button onClick={() => setSelectedPlayer(null)} className="absolute top-8 right-8 text-white/20 hover:text-white"><X size={32} /></button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="text-center">
                  <img src={selectedPlayer.img} className="w-64 h-64 rounded-[3rem] mx-auto border-4 border-cyan-400 mb-6" />
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter">{selectedPlayer.name}</h2>
                  <p className="text-cyan-400 font-black tracking-widest mt-2">{selectedPlayer.tag}</p>
                </div>
                <div className="flex flex-col justify-center gap-8">
                  <StatRow icon={<Target />} label="K/D" value={selectedPlayer.kd} />
                  <StatRow icon={<Flame />} label="XP" value={selectedPlayer.xp.toLocaleString()} />
                  <div className="flex gap-4 pt-8">
                    <button onClick={() => handleChallenge(selectedPlayer)} className="flex-1 bg-white text-black font-black py-4 rounded-full uppercase tracking-widest flex items-center justify-center gap-4"><Swords size={20}/> DUEL</button>
                    <button onClick={() => handleShare(selectedPlayer)} className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all">
                      {isCopied ? <Check className="text-green-500" /> : <Share2 />}
                    </button>
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

// --- SUB-COMPONENTS ---
function MenuButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 w-full py-4 px-4 rounded-2xl transition-all relative group ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/20 hover:text-white'}`}>
      {icon} <span className="text-[12px] font-black tracking-widest hidden group-hover:block uppercase">{label}</span>
      {active && <div className="absolute left-0 top-3 bottom-3 w-1 bg-cyan-400 rounded-r-full" />}
    </button>
  );
}

function PodiumCard({ player, rank, onClick }: any) {
  const is1 = rank === 1;
  return (
    <div onClick={onClick} className={`cursor-pointer bg-gradient-to-b ${is1 ? 'from-cyan-500/20 to-transparent border-cyan-500/30' : 'from-white/5 to-transparent border-white/5'} border-2 p-8 rounded-[4rem] text-center relative group hover:-translate-y-2 transition-all`}>
      {is1 && <Crown className="text-yellow-400 absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce" size={48} />}
      <img src={player.img} className="w-32 h-32 rounded-[2.5rem] mx-auto mb-6 border-4 border-white/10 group-hover:border-cyan-400" />
      <h4 className="text-3xl font-black italic uppercase leading-none">{player.name}</h4>
      <p className="text-[10px] font-black text-white/20 tracking-widest mt-2">{player.tag}</p>
    </div>
  );
}

function PlayerListRow({ player, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-black/30 border border-white/5 p-4 rounded-[2rem] flex items-center justify-between group hover:border-cyan-500/30 transition-all cursor-pointer relative overflow-hidden">
      {player.banned && <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm z-10 flex items-center justify-center"><span className="text-white font-black uppercase tracking-[1em] text-[8px]">BLACKLISTED</span></div>}
      <div className="flex items-center gap-8">
        <span className="text-4xl font-black italic text-white/5 w-16">{player.rank}</span>
        <img src={player.img} className="w-14 h-14 rounded-2xl border border-white/10" />
        <h4 className="text-2xl font-black italic uppercase group-hover:text-cyan-400 transition-colors">{player.name}</h4>
      </div>
      <div className="flex items-center gap-10">
        <p className="text-4xl font-black italic text-white/80">{player.kd}</p>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all"><ArrowUpRight size={18}/></button>
      </div>
    </div>
  );
}

function MarketCard({ rank, onBuy }: any) {
  return (
    <div className="bg-black/40 border border-white/10 p-8 rounded-[3rem] text-center group hover:border-cyan-500/30 transition-all">
      <div className="w-16 h-16 bg-cyan-500/5 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-cyan-500/10"><ShoppingCart className="text-cyan-400" /></div>
      <h3 className={`text-3xl font-black italic mb-4 uppercase ${rank.color}`}>{rank.name}</h3>
      <p className="text-[10px] text-white/20 mb-8 px-4 leading-relaxed">{rank.description}</p>
      <div className="flex items-center justify-between bg-black p-4 rounded-3xl border border-white/5">
        <span className="text-xl font-black italic text-white">{rank.cost} {rank.type}</span>
        <button onClick={onBuy} className="bg-white text-black text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest">BUY</button>
      </div>
    </div>
  );
}

function GodCommand({ icon, color, bg, title, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer ${bg} p-6 rounded-[2rem] border border-white/5 group hover:scale-[1.02] transition-all`}>
       <div className={`${color} mb-4`}>{icon}</div>
       <h4 className="text-lg font-black italic uppercase leading-none">{title}</h4>
    </div>
  );
}

function StatRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-6">
       <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400">{icon}</div>
       <div><p className="text-[10px] font-black text-white/20 uppercase mb-1">{label}</p><p className="text-3xl font-black italic text-white leading-none">{value}</p></div>
    </div>
  );
}
