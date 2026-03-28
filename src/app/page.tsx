"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, Trophy, ChevronRight, Zap, Activity, LayoutDashboard, 
  ShieldCheck, Users, Settings, BarChart3, Swords, Target, Flame, 
  Database, Lock, Unlock, AlertTriangle, Terminal, Cpu, HardDrive, 
  Network, Globe, Radio, Hash, ShoppingCart, Music, Signal, Send, 
  ArrowUpRight, X, MessageSquare, ShieldAlert, BellRing, UserPlus, 
  Filter, Layers, RefreshCw, Star, User, Ban, Edit3, Save, Power, Crosshair
} from 'lucide-react';

// --- TITAN HARDCODED CONFIG ---
const PASSKEY = "PVP_PROPLE";
const DISCORD_AVATAR = "https://mc-heads.net/avatar/Utkarsh/100";
const GLOBAL_WEBHOOK = "https://discord.com/api/webhooks/1487157795169243236/7KlEaV40W3BPxlU0K276i8VO6gu5mk9Hu-hdmEBplKDSmagLIvuxDfMnhK8THr3FmdhV";

const GAME_MODES = ["KITPVP", "CRYSTAL", "CART", "MACE", "AXE", "NETHERPOT"];

// INITIAL LEADERBOARD DATABASE (MULTI-MODE)
const INITIAL_LEADERBOARDS: Record<string, any[]> = {
  KITPVP: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_OWNER", statType: "KILLS", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100" },
    { rank: "02", name: "SHIVAM", tag: "KIT_MASTER", statType: "KILLS", kd: "8.1", img: "https://mc-heads.net/avatar/Shivam/100" },
    { rank: "03", name: "SATYARTH", tag: "VETERAN", statType: "KILLS", kd: "6.5", img: "https://mc-heads.net/avatar/Satyarth/100" },
  ],
  CRYSTAL: [
    { rank: "01", name: "SATYARTH", tag: "GLOBAL_ELITE", statType: "HT1", kd: "4.8", img: "https://mc-heads.net/avatar/Satyarth/100" },
    { rank: "02", name: "UTKARSH", tag: "NORDEN_OWNER", statType: "HT1", kd: "4.5", img: "https://mc-heads.net/avatar/Utkarsh/100" },
    { rank: "03", name: "SHIVAM", tag: "CRYSTAL_GOD", statType: "HT1", kd: "3.9", img: "https://mc-heads.net/avatar/Shivam/100" },
  ],
  CART: [
    { rank: "01", name: "SHIVAM", tag: "BOMBER", statType: "BLASTS", kd: "9.2", img: "https://mc-heads.net/avatar/Shivam/100" },
    { rank: "02", name: "UTKARSH", tag: "CART_KING", statType: "BLASTS", kd: "7.4", img: "https://mc-heads.net/avatar/Utkarsh/100" },
    { rank: "03", name: "SATYARTH", tag: "DEMOLITION", statType: "BLASTS", kd: "6.1", img: "https://mc-heads.net/avatar/Satyarth/100" },
  ],
  MACE: [
    { rank: "01", name: "UTKARSH", tag: "SMASH_PRO", statType: "CRITS", kd: "15.0", img: "https://mc-heads.net/avatar/Utkarsh/100" },
    { rank: "02", name: "SATYARTH", tag: "HEAVY_HITTER", statType: "CRITS", kd: "11.2", img: "https://mc-heads.net/avatar/Satyarth/100" },
    { rank: "03", name: "SHIVAM", tag: "BRUTE", statType: "CRITS", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100" },
  ],
  AXE: [
    { rank: "01", name: "SATYARTH", tag: "SHIELD_BREAKER", statType: "DMG", kd: "5.5", img: "https://mc-heads.net/avatar/Satyarth/100" },
    { rank: "02", name: "SHIVAM", tag: "LUMBERJACK", statType: "DMG", kd: "4.9", img: "https://mc-heads.net/avatar/Shivam/100" },
    { rank: "03", name: "UTKARSH", tag: "EXECUTIONER", statType: "DMG", kd: "4.2", img: "https://mc-heads.net/avatar/Utkarsh/100" },
  ],
  NETHERPOT: [
    { rank: "01", name: "SHIVAM", tag: "ALCHEMIST", statType: "POTS", kd: "8.8", img: "https://mc-heads.net/avatar/Shivam/100" },
    { rank: "02", name: "UTKARSH", tag: "BREW_MASTER", statType: "POTS", kd: "7.6", img: "https://mc-heads.net/avatar/Utkarsh/100" },
    { rank: "03", name: "SATYARTH", tag: "TOXIC", statType: "POTS", kd: "6.3", img: "https://mc-heads.net/avatar/Satyarth/100" },
  ]
};

export default function NordenNexusV17() {
  // --- CORE STATE ENGINES ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('KITPVP');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  // --- PURCHASE MODAL STATE ---
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [mcUsername, setMcUsername] = useState('');

  // --- ADMIN SYSTEMS STATE ---
  const [adminXp, setAdminXp] = useState(1000);
  const [ipBanInput, setIpBanInput] = useState('');
  const [bannedIps, setBannedIps] = useState<string[]>([]);
  
  // --- WEBHOOK & NETWORK STATES ---
  const [isWebhookActive, setIsWebhookActive] = useState(true);
  const [webhookStatus, setWebhookStatus] = useState('STABLE');
  const [onlinePlayers, setOnlinePlayers] = useState(2841);

  // --- AUDIO / LOGS / SPENDERS ---
  const [ytLink, setYtLink] = useState('');
  const [currentTrackId, setCurrentTrackId] = useState('');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [topSpenders, setTopSpenders] = useState([
    { name: "UTKARSH", amount: 15 },
    { name: "SATYARTH", amount: 11 },
    { name: "SHIVAM", amount: 7 }
  ]);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] V17_CYBER_NEXUS ONLINE",
    "[UI] RAINBOW_GLASSMORPHISM_RENDERED",
    "[DB] MULTI_MODE_LEADERBOARDS_SYNCED",
    "[MARKET] RANKS_INJECTED_FLY_PURGED"
  ]);

  // --- MULTI-MODE LEADERBOARD STATE ---
  const [leaderboards, setLeaderboards] = useState(INITIAL_LEADERBOARDS);

  // --- DISCORD WEBHOOK DISPATCHER ---
  const sendDiscordNotification = useCallback(async (title: string, message: string, color: number = 13631487, fields: any[] = []) => {
    if (!isWebhookActive) return;

    const embed = {
      username: "NordenMC Cyber Nexus",
      avatar_url: DISCORD_AVATAR,
      embeds: [{
        title: title,
        description: message,
        color: color,
        fields: fields,
        timestamp: new Date().toISOString(),
        footer: { text: "V17 Cyber | Network Intelligence" }
      }]
    };

    try {
      await fetch(GLOBAL_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(embed)
      });
      setWebhookStatus('STABLE');
    } catch (err) {
      setWebhookStatus('INTERRUPTED');
      pushLog("[CRITICAL] DISCORD_UPLINK_LOST");
    }
  }, [isWebhookActive]);

  const pushLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 15));
  };

  // --- MARKET PURCHASE HANDLER ---
  const initPurchase = (itemName: string) => {
    setSelectedItem(itemName);
    setIsPurchaseModalOpen(true);
  };

  const finalizePurchase = () => {
    if (!mcUsername.trim()) {
      alert("CRITICAL: Minecraft Username Required.");
      return;
    }
    pushLog(`[MARKET] RANK SECURED: ${selectedItem} BY ${mcUsername}`);
    
    setTopSpenders(prev => {
      const exists = prev.find(s => s.name.toUpperCase() === mcUsername.toUpperCase());
      if (exists) {
        return prev.map(s => s.name.toUpperCase() === mcUsername.toUpperCase() ? { ...s, amount: s.amount + 1 } : s);
      }
      return [...prev, { name: mcUsername.toUpperCase(), amount: 1 }].slice(-5);
    });

    sendDiscordNotification("🛒 Global Rank Secured", `A player has purchased a rank from the Cyber Market.`, 13631487, [
        { name: "👤 Identity", value: `\`${mcUsername}\``, inline: true },
        { name: "📦 Rank/Item", value: `\`${selectedItem}\``, inline: true }
    ]);

    setIsPurchaseModalOpen(false);
    setMcUsername('');
    alert(`SUCCESS: ${selectedItem} dispatched to ${mcUsername}.`);
  };

  // --- ADMIN SYSTEMS ---
  const grantSelfXp = (amount: number) => {
    setAdminXp(prev => prev + amount);
    pushLog(`[XP_INJECT] GRANTED +${amount} XP TO UTKARSH`);
  };

  const executeIpBan = () => {
    if(!ipBanInput.trim()) return;
    setBannedIps(prev => [ipBanInput, ...prev]);
    pushLog(`[SECURITY] NEON_BAN_ENFORCED: ${ipBanInput}`);
    sendDiscordNotification("🔨 Network Ban Deployed", `Malicious IP obliterated from the Cyber Nexus.`, 16711680, [
        { name: "Target IPv4", value: `\`${ipBanInput}\``, inline: false },
        { name: "Executor", value: "Utkarsh Pandey", inline: false }
    ]);
    setIpBanInput('');
    alert("TARGET IP BLACKLISTED.");
  };

  // Edits the currently active game mode's leaderboard
  const handleLeaderboardEdit = (index: number, field: string, value: string) => {
    setLeaderboards(prev => {
      const activeBoard = [...prev[activeMode]];
      activeBoard[index] = { ...activeBoard[index], [field]: value };
      return { ...prev, [activeMode]: activeBoard };
    });
  };

  const handleAuth = () => {
    if (passwordInput === PASSKEY) {
      setIsAuthorized(true);
      pushLog("[SUCCESS] V17_CYBER_ROOT_GRANTED");
      sendDiscordNotification("⚡ Cyber Root Login", "Administrator Utkarsh has accessed the Nexus Core.", 13631487);
    } else {
      pushLog("[WARN] INVALID_KEY_ENTRY");
    }
  };

  const syncMusic = () => {
    const videoIdMatch = ytLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n]+)/);
    if (videoIdMatch) {
      setCurrentTrackId(videoIdMatch[1]);
      setIsMusicPlaying(true);
      pushLog(`[AUDIO] NEON_RELAY_ACTIVE: ${videoIdMatch[1]}`);
    }
  };

  const currentPlayers = leaderboards[activeMode];

  return (
    <div className="flex min-h-screen font-sans overflow-hidden text-white relative selection:bg-fuchsia-500/30">
      
      {/* 🌌 CYBER-NEXUS GLASSMORPHISM BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#05050A]">
         {/* Neon Magenta Orb */}
         <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/20 blur-[180px] rounded-full mix-blend-screen animate-[pulse_6s_ease-in-out_infinite]"></div>
         {/* Neon Cyan Orb */}
         <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/20 blur-[180px] rounded-full mix-blend-screen animate-[pulse_8s_ease-in-out_infinite_reverse]"></div>
         {/* Cyber Grid */}
         <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-24 hover:w-72 transition-all duration-700 border-r border-fuchsia-500/20 bg-black/40 backdrop-blur-3xl flex flex-col items-center py-10 z-50 group shadow-[10px_0_50px_rgba(0,0,0,0.5)]">
        <motion.div whileHover={{ rotate: 180, scale: 1.1 }} transition={{ duration: 0.8 }} className="mb-16 cursor-pointer" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.4)]">
            <Zap size={28} className="text-white fill-white" />
          </div>
        </motion.div>
        
        <nav className="flex flex-col gap-8 flex-1 w-full px-6">
          <SidebarBtn icon={<LayoutDashboard />} label="NEXUS_CORE" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <SidebarBtn icon={<ShoppingCart />} label="RANK_MARKET" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <SidebarBtn icon={<Users />} label="FACTION_UPLINK" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <div className="h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent my-4 mx-2" />
          <SidebarBtn icon={<ShieldCheck className={isAuthorized ? "text-fuchsia-400 drop-shadow-[0_0_10px_#d946ef]" : "text-cyan-600"} />} label="ADMIN_LOCK" onClick={() => setIsAdminOpen(true)} />
        </nav>

        {/* AUDIO RELAY */}
        <div className="mt-auto px-6 w-full pb-10">
          <div className="bg-black/40 border border-fuchsia-500/20 rounded-[2.5rem] p-3 group/music hover:bg-white/5 transition-all overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex items-center justify-center p-3 bg-fuchsia-500/10 rounded-2xl border border-fuchsia-500/20">
               <Radio className={`text-fuchsia-400 ${isMusicPlaying ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`} size={20} />
            </div>
            <div className="hidden group-hover:flex flex-col gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2">
               <input value={ytLink} onChange={(e) => setYtLink(e.target.value)} placeholder="YOUTUBE_URL..." className="bg-black/80 border border-fuchsia-500/20 rounded-xl px-3 py-2 text-[10px] font-mono outline-none text-fuchsia-100 focus:border-fuchsia-500 transition-all" />
               <button onClick={syncMusic} className="bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-fuchsia-500/30 text-white text-[10px] font-black py-2.5 rounded-xl uppercase hover:from-cyan-500 hover:to-fuchsia-500 hover:text-black transition-all">Engage_Relay</button>
            </div>
          </div>
        </div>
      </aside>

      {/* MEDIA BRIDGE */}
      {currentTrackId && <div className="fixed -left-[9999px]"><iframe width="0" height="0" src={`https://www.youtube.com/embed/${currentTrackId}?autoplay=1`} allow="autoplay" /></div>}

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative custom-scrollbar z-10">
        
        {/* HEADER */}
        <header className="flex items-center justify-between px-16 py-8 sticky top-0 bg-[#05050A]/70 backdrop-blur-3xl z-40 border-b border-fuchsia-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-8">
            <div>
               <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">NORDEN<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-[0_0_20px_#d946ef]">MC</span></h1>
               {/* 🌟 TOP LEFT XP COUNTER */}
               <div className="flex items-center gap-3 mt-3 ml-1">
                  <div className="bg-black/50 border border-fuchsia-500/40 text-fuchsia-300 px-4 py-1.5 rounded-full text-[11px] font-black tracking-[0.2em] flex items-center gap-2 uppercase shadow-[0_0_20px_rgba(217,70,239,0.3)] backdrop-blur-md">
                     <Star size={14} className="fill-fuchsia-400/50" /> TOTAL_XP: {adminXp.toLocaleString()}
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400/60 tracking-[0.3em] uppercase animate-pulse">V17_CYBER_NEXUS</span>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-right hidden sm:block">
               <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">GLOBAL_NETWORK</p>
               <p className="text-xs font-black text-fuchsia-400 uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">UPSTREAM_SECURE</p>
            </div>
            <button className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-black text-[11px] px-14 py-5 rounded-2xl shadow-[0_10px_40px_rgba(217,70,239,0.5)] hover:scale-105 hover:shadow-[0_20px_60px_rgba(217,70,239,0.7)] transition-all uppercase tracking-[0.2em] border border-white/20 relative overflow-hidden group">
                <span className="relative z-10">PLAY.NORDENMC.COM</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </header>

        <main className="p-16 max-w-[1700px] mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* ---------------- DASHBOARD MATRIX ---------------- */}
            {activeMenu === 'DASHBOARD' && (
              <motion.div key="DASHBOARD" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="space-y-16">
                
                {/* STATUS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <StatCard icon={<Flame className="text-fuchsia-500" />} label="SESSIONS" value={onlinePlayers.toLocaleString()} />
                  <StatCard icon={<Target className="text-cyan-500" />} label="GLOBAL_FRAGS" value="18.9M" />
                  <StatCard icon={<Database className="text-purple-500" />} label="CORE_TPS" value="20.0" />
                  <StatCard icon={<Signal className="text-emerald-400" />} label="WEBHOOK" value={webhookStatus} />
                </div>

                {/* GAME MODE SWITCHER (CYBER TABS) */}
                <div className="flex flex-wrap items-center justify-center gap-4 bg-black/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/10 shadow-2xl">
                    {GAME_MODES.map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setActiveMode(mode)}
                            className={`relative px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-300 ${activeMode === mode ? 'text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            {activeMode === mode && (
                                <motion.div layoutId="activeModeTab" className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.5)]" transition={{ type: "spring", stiffness: 300, damping: 25 }} />
                            )}
                            <span className="relative z-10">{mode}</span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={activeMode} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="space-y-16">
                        {/* EDITABLE PLAYER PODIUM */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
                        {currentPlayers.slice(0,3).map((p, idx) => <PodiumCard key={`${activeMode}-${p.name}-${idx}`} player={p} idx={idx} onAction={() => pushLog(`[DATA_UPLINK] FETCHING ${p.name} STATS FOR ${activeMode}`)} />)}
                        </div>

                        {/* EDITABLE PLAYER ROWS */}
                        <div className="space-y-6">
                        {currentPlayers.map((p, idx) => (
                            <motion.div key={`${activeMode}-row-${idx}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                                <PlayerRow player={p} onAction={() => pushLog(`[DEEP_SCAN] INITIATED ON ${p.name} (${activeMode})`)} />
                            </motion.div>
                        ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* ---------------- MARKET MATRIX (ALL RANKS, NO FLY) ---------------- */}
            {activeMenu === 'MARKET' && (
              <motion.div key="MARKET" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="space-y-12">
                 
                 <div className="text-center mb-16">
                     <h2 className="text-5xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-[0_0_20px_rgba(217,70,239,0.4)] mb-4">GLOBAL RANK MATRIX</h2>
                     <p className="text-[12px] font-black text-white/40 uppercase tracking-[0.4em]">Secure your dominance across all game modes.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 {['VIP_RANK', 'MVP_RANK', 'ELITE_RANK', 'OMEGA_RANK', 'TITAN_RANK', 'NEXUS_SUPREME'].map((item, i) => (
                   <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={item} className="bg-black/60 backdrop-blur-2xl border border-fuchsia-500/20 p-12 rounded-[4rem] hover:bg-black/80 hover:border-cyan-400/50 transition-all duration-500 text-center group relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-700 text-fuchsia-500"><Crown size={180} /></div>
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 rounded-[2.5rem] mx-auto mb-10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 border border-fuchsia-500/30 shadow-inner"><ShoppingCart className="text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" size={36} /></div>
                      <h3 className="text-3xl font-black italic mb-4 uppercase tracking-tighter text-white drop-shadow-md">{item.replace('_', ' ')}</h3>
                      <p className="text-[9px] font-black text-white/30 tracking-[0.2em] mb-10 uppercase h-8">Unlocks premium global commands & kits.</p>
                      <button onClick={() => initPurchase(item)} className="w-full bg-gradient-to-r from-cyan-500/80 to-fuchsia-500/80 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:from-cyan-400 hover:to-fuchsia-400 transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)] border border-white/10 relative overflow-hidden">
                          <span className="relative z-10">AUTHORIZE_PURCHASE</span>
                      </button>
                   </motion.div>
                 ))}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* 💳 PURCHASE MODAL */}
      <AnimatePresence>
        {isPurchaseModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsPurchaseModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 40 }} className="bg-[#08080C] border border-fuchsia-500/40 w-full max-w-lg p-12 rounded-[4rem] relative z-[110] shadow-[0_0_100px_rgba(217,70,239,0.2)]">
              <div className="text-center mb-10">
                <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400/20 to-fuchsia-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-cyan-300 border border-cyan-400/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.5)]"><User size={44} /></div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-white">Identity Verification</h3>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Target Payload: <span className="text-fuchsia-400 drop-shadow-[0_0_8px_#d946ef]">{selectedItem}</span></p>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-cyan-400/70 uppercase tracking-[0.3em] ml-2">Minecraft IGN</label>
                  <input type="text" placeholder="Enter Username..." value={mcUsername} onChange={(e) => setMcUsername(e.target.value)} className="w-full bg-black border border-white/10 p-7 rounded-[2rem] text-2xl font-mono text-fuchsia-300 outline-none focus:border-fuchsia-500 transition-all shadow-inner text-center" />
                </div>
                <button onClick={finalizePurchase} className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] hover:shadow-[0_0_40px_rgba(217,70,239,0.6)] transition-all mt-6 text-xs border border-white/20">TRANSMIT_FUNDS</button>
                <button onClick={() => setIsPurchaseModalOpen(false)} className="w-full text-white/30 font-black text-[10px] uppercase tracking-[0.4em] mt-4 hover:text-red-400 transition-all">Abort_Protocol</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔐 V17 CYBER ADMIN CONSOLE */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 900 }} animate={{ x: 0 }} exit={{ x: 900 }} transition={{ type: "spring", damping: 25, stiffness: 120 }} className="fixed right-0 top-0 h-full w-[750px] bg-[#020206]/90 border-l border-fuchsia-500/20 z-[60] p-12 shadow-[-100px_0_200px_rgba(0,0,0,0.9)] backdrop-blur-3xl overflow-y-auto custom-scrollbar">
            
            <div className="flex justify-between items-center mb-12 sticky top-0 bg-[#020206]/90 backdrop-blur-md py-4 z-20 border-b border-white/5">
               <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">NEXUS_COMMAND</h3>
               <button onClick={() => setIsAdminOpen(false)} className="text-white/40 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] border border-white/10 px-5 py-3 rounded-xl hover:bg-white/10 transition-all">CLOSE_BAY [X]</button>
            </div>

            {!isAuthorized ? (
              <div className="flex flex-col items-center justify-center h-[70%]">
                 <ShieldAlert size={120} className="text-fuchsia-500/30 mb-12 animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_30px_#d946ef]" />
                 <p className="text-fuchsia-400/70 font-black text-[11px] tracking-[0.6em] mb-10 uppercase text-center">Classified_Access_Only<br/>Enter_Passkey_Prople</p>
                 <input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAuth()} className="bg-black border border-fuchsia-500/30 w-full p-8 rounded-[2.5rem] text-center text-4xl tracking-[0.5em] font-mono outline-none focus:border-cyan-400 transition-all mb-8 shadow-[inset_0_0_30px_rgba(217,70,239,0.1)] text-cyan-100" />
                 <button onClick={handleAuth} className="w-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-fuchsia-500/40 text-white py-7 rounded-[2rem] font-black uppercase tracking-[0.4em] hover:from-cyan-500 hover:to-fuchsia-500 hover:text-black transition-all shadow-2xl">BREACH_FIREWALL</button>
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-700 pb-20">
                 
                 {/* 🌟 PERSONAL ADMIN XP UPLINK */}
                 <div className="bg-gradient-to-br from-cyan-900/20 to-fuchsia-900/10 border border-cyan-500/30 p-10 rounded-[3.5rem] relative overflow-hidden shadow-2xl backdrop-blur-xl">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.05] rotate-45 text-cyan-300"><Star size={180} /></div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <div className="flex items-center gap-4 text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]">
                          <Crown size={28} />
                          <span className="font-black text-xs tracking-[0.4em] uppercase">Admin_XP_Inject</span>
                       </div>
                       <div className="px-5 py-2 rounded-full bg-cyan-500/20 text-cyan-200 text-[11px] font-black uppercase border border-cyan-500/40 tracking-widest">{adminXp.toLocaleString()} XP</div>
                    </div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-8">Authorizing Entity: <span className="text-white drop-shadow-md">UTKARSH PANDEY</span></p>
                    <div className="grid grid-cols-3 gap-5 relative z-10">
                       <button onClick={() => grantSelfXp(100)} className="bg-cyan-500/10 border border-cyan-500/30 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest text-cyan-100 hover:bg-cyan-400 hover:text-black transition-all shadow-md">+100</button>
                       <button onClick={() => grantSelfXp(500)} className="bg-cyan-500/10 border border-cyan-500/30 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest text-cyan-100 hover:bg-cyan-400 hover:text-black transition-all shadow-md">+500</button>
                       <button onClick={() => grantSelfXp(1000)} className="bg-cyan-500/10 border border-cyan-500/30 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest text-cyan-100 hover:bg-cyan-400 hover:text-black transition-all shadow-md">+1000</button>
                    </div>
                 </div>

                 {/* ✏️ DYNAMIC LEADERBOARD OVERRIDE (Tied to activeMode) */}
                 <div className="bg-black/60 border border-fuchsia-500/20 p-10 rounded-[3.5rem] shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-4 text-fuchsia-400 mb-6 drop-shadow-[0_0_10px_#d946ef]">
                       <Edit3 size={28} />
                       <span className="font-black text-xs tracking-[0.4em] uppercase">Matrix_Override</span>
                    </div>
                    <p className="text-[10px] font-black text-cyan-400/60 uppercase tracking-[0.2em] mb-8 leading-relaxed">
                        Currently editing database for: <span className="text-fuchsia-300 font-bold bg-fuchsia-500/20 px-2 py-1 rounded-md border border-fuchsia-500/30">[{activeMode}]</span>
                    </p>
                    
                    <div className="space-y-6">
                       {currentPlayers.map((p, index) => (
                         <div key={index} className="bg-black/80 border border-white/10 p-6 rounded-[2rem] flex flex-col gap-4 relative group shadow-inner">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.05] font-black text-5xl italic pointer-events-none text-fuchsia-300">{p.rank}</div>
                            <div className="flex gap-4 relative z-10">
                               <div className="flex-1">
                                  <label className="text-[8px] font-black text-cyan-400/70 uppercase tracking-widest ml-2 mb-1 block">Entity Name</label>
                                  <input type="text" value={p.name} onChange={(e) => handleLeaderboardEdit(index, 'name', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-black italic text-white outline-none focus:border-fuchsia-500 transition-colors" />
                               </div>
                               <div className="w-32">
                                  <label className="text-[8px] font-black text-white/40 uppercase tracking-widest ml-2 mb-1 block">{activeMode} Stat</label>
                                  <input type="text" value={p.kd} onChange={(e) => handleLeaderboardEdit(index, 'kd', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-mono text-cyan-300 outline-none focus:border-fuchsia-500 text-center transition-colors" />
                               </div>
                            </div>
                            <div className="flex-1 relative z-10">
                               <label className="text-[8px] font-black text-white/40 uppercase tracking-widest ml-2 mb-1 block">Class Tag</label>
                               <input type="text" value={p.tag} onChange={(e) => handleLeaderboardEdit(index, 'tag', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-[10px] font-black tracking-[0.2em] text-fuchsia-300/80 outline-none focus:border-cyan-400 uppercase transition-colors" />
                            </div>
                         </div>
                       ))}
                    </div>
                    <button onClick={() => pushLog(`[DATA] ${activeMode}_STATE_SAVED`)} className="w-full mt-8 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 hover:from-cyan-500 hover:to-fuchsia-500 text-white/70 hover:text-black py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 border border-fuchsia-500/30"><Save size={16}/> COMMIT_CHANGES</button>
                 </div>

                 {/* 🔨 IP BAN MATRIX */}
                 <div className="bg-red-950/20 border border-red-500/30 p-10 rounded-[3.5rem] relative shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-4 text-red-500 mb-8 drop-shadow-[0_0_10px_#ef4444]">
                       <Ban size={28} />
                       <span className="font-black text-xs tracking-[0.4em] uppercase">Global_Blacklist</span>
                    </div>
                    <div className="flex gap-4">
                       <input type="text" placeholder="Target IPv4..." value={ipBanInput} onChange={(e) => setIpBanInput(e.target.value)} className="flex-1 bg-black/80 border border-red-500/30 p-5 rounded-[1.5rem] text-red-300 font-mono text-sm outline-none focus:border-red-500 transition-all shadow-inner" />
                       <button onClick={executeIpBan} className="bg-red-600/20 border border-red-500/50 text-red-200 px-8 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all">EXECUTE</button>
                    </div>
                    {bannedIps.length > 0 && (
                      <div className="mt-6 space-y-2">
                        <p className="text-[9px] font-black text-red-500/60 uppercase tracking-widest mb-3">Recent Exiles</p>
                        {bannedIps.map((ip, i) => <div key={i} className="text-[11px] font-mono text-red-300 bg-red-950/40 p-3 rounded-xl border border-red-900/40">{ip}</div>)}
                      </div>
                    )}
                 </div>

                 {/* SYSTEM SYSLOG */}
                 <div className="bg-black/90 border border-cyan-500/20 p-10 rounded-[3rem] font-mono text-[11px] h-[350px] overflow-y-auto text-cyan-300/60 custom-scrollbar shadow-[inset_0_0_30px_rgba(6,182,212,0.1)] relative">
                    <div className="flex items-center gap-3 text-fuchsia-400 mb-8 border-b border-white/10 pb-6 sticky top-0 bg-black/95 backdrop-blur-md z-10"><Terminal size={16}/> CYBER_SYSLOG</div>
                    <div className="space-y-4">
                       {logs.map((log, i) => <div key={i} className="flex gap-6 leading-relaxed hover:text-white transition-colors"><span className="opacity-20 pointer-events-none text-cyan-500">0x{i.toString(16).toUpperCase()}</span><span>{log}</span></div>)}
                    </div>
                 </div>
                 
                 <button onClick={() => {setIsAuthorized(false); setPasswordInput('')}} className="w-full text-white/20 font-black text-[10px] uppercase tracking-[0.8em] mt-12 hover:text-red-500 transition-colors py-4">Terminate_Session</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SidebarBtn({ icon, label, active = false, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-6 cursor-pointer group py-4 px-4 rounded-2xl transition-all duration-500 ${active ? 'bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 text-white border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.3)]' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
      <div className={`transition-transform duration-500 ${active ? 'scale-110 drop-shadow-[0_0_8px_#22d3ee]' : 'group-hover:scale-110'}`}>{icon}</div>
      <span className="text-[11px] font-black tracking-[0.2em] hidden group-hover:block whitespace-nowrap uppercase animate-in slide-in-from-left-2">{label}</span>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] hover:bg-white/[0.04] hover:border-fuchsia-500/40 transition-all duration-500 group overflow-hidden relative shadow-2xl">
      <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:scale-150 transition-all duration-700">{icon}</div>
      <div className="flex items-center gap-4 mb-6 opacity-60 font-black text-[10px] tracking-[0.3em] uppercase text-white drop-shadow-md">{icon} {label}</div>
      <p className="text-5xl font-black italic tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-400 transition-all leading-none text-white">{value}</p>
    </div>
  );
}

function PodiumCard({ player, idx, onAction }: any) {
  const isW = idx === 0;
  return (
    <div className={`bg-gradient-to-b ${isW ? 'from-cyan-500/40 via-fuchsia-500/10 to-transparent shadow-[0_30px_80px_-20px_rgba(217,70,239,0.4)]' : 'from-white/10 to-transparent'} p-[2px] rounded-[4.5rem] group hover:-translate-y-2 transition-transform duration-500`}>
      <div className="bg-[#05050A]/95 backdrop-blur-3xl rounded-[4.5rem] p-12 flex flex-col items-center border border-white/5 text-center relative overflow-hidden h-full">
        {isW && <Crown className="mb-6 text-cyan-400 drop-shadow-[0_0_25px_#22d3ee]" size={48} />}
        <img src={player.img} className={`w-44 h-44 rounded-[3.5rem] mb-10 border-4 ${isW ? 'border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.4)] scale-110' : 'border-white/10 opacity-70 group-hover:opacity-100 group-hover:scale-105 group-hover:border-fuchsia-400/50'} transition-all duration-700`} />
        <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-500 transition-all text-white">{player.name}</h2>
        <p className="text-[10px] tracking-[0.4em] text-fuchsia-400/80 font-black mb-12 uppercase">{player.tag}</p>
        <button onClick={onAction} className={`w-full py-5 rounded-[2.5rem] font-black text-[11px] border tracking-[0.3em] transition-all uppercase ${isW ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black border-transparent shadow-[0_10px_30px_rgba(217,70,239,0.4)] hover:shadow-[0_15px_40px_rgba(217,70,239,0.6)]' : 'bg-white/5 text-white/50 border-white/10 hover:bg-white hover:text-black shadow-inner'}`}>SCAN_ENTITY</button>
      </div>
    </div>
  );
}

function PlayerRow({ player, onAction }: any) {
  return (
    <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-[4rem] p-10 flex items-center justify-between group hover:border-cyan-400/40 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden shadow-2xl">
      <div className="flex items-center gap-12 relative z-10">
        <span className="text-6xl font-black italic text-white/[0.05] group-hover:text-fuchsia-500/20 w-24 transition-all duration-500">{player.rank}</span>
        <img src={player.img} className="w-20 h-20 rounded-[1.5rem] shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-white/10 group-hover:border-cyan-400/50 transition-all duration-500" />
        <div className="flex flex-col gap-2">
           <h4 className="font-black italic text-4xl uppercase text-white group-hover:text-cyan-300 transition-colors tracking-tighter leading-none">{player.name}</h4>
           <span className="text-[10px] font-black text-fuchsia-300/60 tracking-[0.4em] uppercase transition-all">{player.tag}</span>
        </div>
      </div>
      <div className="flex items-center gap-16 relative z-10">
         <div className="text-center">
            <p className="text-[10px] font-black text-cyan-400/50 mb-2 uppercase tracking-widest">{player.statType}</p>
            <p className="text-3xl font-black italic leading-none text-white">{player.kd}</p>
         </div>
         <button onClick={onAction} className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-500 group-hover:text-black transition-all group-hover:rotate-[360deg] shadow-2xl duration-700 border border-white/10 group-hover:border-transparent"><Crosshair size={24} /></button>
      </div>
    </div>
  );
}
