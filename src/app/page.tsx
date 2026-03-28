"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, Trophy, ChevronRight, Zap, Activity, LayoutDashboard, 
  ShieldCheck, Users, Settings, BarChart3, Swords, Target, Flame, 
  Database, Lock, Unlock, AlertTriangle, Terminal, Cpu, HardDrive, 
  Network, Globe, Radio, Hash, ShoppingCart, Music, Signal, Send, 
  ArrowUpRight, X, MessageSquare, ShieldAlert, BellRing, UserPlus, 
  Filter, Layers, RefreshCw, Star, User, Ban, Edit3, Save, Power
} from 'lucide-react';

// --- TITAN HARDCODED CONFIG ---
const PASSKEY = "PVP_PROPLE";
const DISCORD_AVATAR = "https://mc-heads.net/avatar/Utkarsh/100";
const GLOBAL_WEBHOOK = "https://discord.com/api/webhooks/1487157795169243236/7KlEaV40W3BPxlU0K276i8VO6gu5mk9Hu-hdmEBplKDSmagLIvuxDfMnhK8THr3FmdhV";

export default function NordenNexusV16() {
  // --- CORE STATE ENGINES ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
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
    { name: "UTKARSH", amount: 12 },
    { name: "SATYARTH", amount: 8 },
    { name: "SHIVAM", amount: 5 }
  ]);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] V16_GALACTIC_CORE ONLINE",
    "[SECURITY] IP_BAN_MATRIX_INITIALIZED",
    "[XP_SYSTEM] TOP_LEVEL_COUNTER_ACTIVE",
    "[MARKET] PLAYER_PURCHASE_BUG_PURGED"
  ]);

  // --- LIVE LEADERBOARD STATE (EDITABLE) ---
  const [leaderboard, setLeaderboard] = useState([
    { rank: "01", name: "UTKARSH", tag: "NORDEN_OWNER", statType: "HT1", kd: "5.2", img: "https://mc-heads.net/avatar/Utkarsh/100" },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE", statType: "HT1", kd: "4.8", img: "https://mc-heads.net/avatar/Satyarth/100" },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST", statType: "HT1", kd: "4.1", img: "https://mc-heads.net/avatar/Shivam/100" },
  ]);

  // --- DISCORD WEBHOOK DISPATCHER ---
  const sendDiscordNotification = useCallback(async (title: string, message: string, color: number = 3447003, fields: any[] = []) => {
    if (!isWebhookActive) return;

    const embed = {
      username: "NordenMC Galactic Command",
      avatar_url: DISCORD_AVATAR,
      embeds: [{
        title: title,
        description: message,
        color: color,
        fields: fields,
        timestamp: new Date().toISOString(),
        footer: { text: "V16 Galactic | Network Intelligence" }
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
    pushLog(`[MARKET] SALE: ${selectedItem} TO ${mcUsername}`);
    
    setTopSpenders(prev => {
      const exists = prev.find(s => s.name.toUpperCase() === mcUsername.toUpperCase());
      if (exists) {
        return prev.map(s => s.name.toUpperCase() === mcUsername.toUpperCase() ? { ...s, amount: s.amount + 1 } : s);
      }
      return [...prev, { name: mcUsername.toUpperCase(), amount: 1 }].slice(-5);
    });

    sendDiscordNotification("🛒 Market Transaction", `Item secured from Web-Shop.`, 15105570, [
        { name: "👤 Player", value: `\`${mcUsername}\``, inline: true },
        { name: "📦 Item", value: `\`${selectedItem}\``, inline: true }
    ]);

    setIsPurchaseModalOpen(false);
    setMcUsername('');
    alert(`SUCCESS: ${selectedItem} dispatched to ${mcUsername}.`);
  };

  // --- ADMIN SYSTEMS ---
  const grantSelfXp = (amount: number) => {
    setAdminXp(prev => prev + amount);
    pushLog(`[XP_INJECT] GRANTED +${amount} XP TO UTKARSH`);
    sendDiscordNotification("✨ XP Injected", "Admin XP override triggered.", 10181046, [
        { name: "Amount", value: `+${amount} XP`, inline: true },
        { name: "Total", value: `${adminXp + amount} XP`, inline: true }
    ]);
  };

  const executeIpBan = () => {
    if(!ipBanInput.trim()) return;
    setBannedIps(prev => [ipBanInput, ...prev]);
    pushLog(`[SECURITY] IP_BAN_ENFORCED: ${ipBanInput}`);
    sendDiscordNotification("🔨 IP Ban Deployed", `A malicious IP address has been blacklisted from the website and API.`, 15548997, [
        { name: "Target IP", value: `\`${ipBanInput}\``, inline: false },
        { name: "Authorized By", value: "Utkarsh", inline: false }
    ]);
    setIpBanInput('');
    alert("TARGET IP BLACKLISTED.");
  };

  const handleLeaderboardEdit = (index: number, field: string, value: string) => {
    const updated = [...leaderboard];
    updated[index] = { ...updated[index], [field]: value };
    setLeaderboard(updated);
  };

  const handleAuth = () => {
    if (passwordInput === PASSKEY) {
      setIsAuthorized(true);
      pushLog("[SUCCESS] V16_ROOT_ACCESS_GRANTED");
      sendDiscordNotification("⚡ Galactic Root Login", "Administrator Utkarsh has entered the deep-space console.", 15844367);
    } else {
      pushLog("[WARN] INVALID_KEY_ENTRY");
    }
  };

  const syncMusic = () => {
    const videoIdMatch = ytLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n]+)/);
    if (videoIdMatch) {
      setCurrentTrackId(videoIdMatch[1]);
      setIsMusicPlaying(true);
      pushLog(`[AUDIO] RELAY_ACTIVE: ${videoIdMatch[1]}`);
    }
  };

  // --- AUTO-PULSE MONITOR ---
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      sendDiscordNotification("📊 Nebula Status", "Automated deep-space ping.", 1752220, [
          { name: "Players", value: `${onlinePlayers}`, inline: true },
          { name: "System", value: "V16_GALACTIC", inline: true }
      ]);
    }, 600000);
    return () => clearInterval(pulseInterval);
  }, [sendDiscordNotification, onlinePlayers]);

  return (
    <div className="flex min-h-screen font-sans overflow-hidden text-white relative selection:bg-cyan-500/30">
      
      {/* 🌌 GALACTIC SPACE BACKGROUND (PURE CSS) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#050510] via-[#020205] to-[#000000]">
         <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-900/10 blur-[150px] rounded-full mix-blend-screen"></div>
         {/* Simulated Stars Layer */}
         <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_#ffffff_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_#cyan_1px,_transparent_1px)] bg-[size:60px_60px] animate-[pulse_4s_ease-in-out_infinite]"></div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-24 hover:w-72 transition-all duration-700 border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col items-center py-10 z-50 group shadow-[10px_0_50px_rgba(0,0,0,0.5)]">
        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.8 }} className="mb-16 cursor-pointer" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)]">
            <Zap size={28} className="text-white fill-white" />
          </div>
        </motion.div>
        
        <nav className="flex flex-col gap-8 flex-1 w-full px-6">
          <SidebarBtn icon={<LayoutDashboard />} label="NEBULA_CORE" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <SidebarBtn icon={<ShoppingCart />} label="MARKET_HUB" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <SidebarBtn icon={<Users />} label="FACTION_UPLINK" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <div className="h-px bg-white/5 my-4 mx-2" />
          <SidebarBtn icon={<ShieldCheck className={isAuthorized ? "text-green-500" : "text-red-500"} />} label="ADMIN_LOCK" onClick={() => setIsAdminOpen(true)} />
        </nav>

        {/* AUDIO RELAY */}
        <div className="mt-auto px-6 w-full pb-10">
          <div className="bg-black/40 border border-white/10 rounded-[2.5rem] p-3 group/music hover:bg-white/5 transition-all overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-center p-3 bg-cyan-500/10 rounded-2xl">
               <Radio className={`text-cyan-400 ${isMusicPlaying ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`} size={20} />
            </div>
            <div className="hidden group-hover:flex flex-col gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2">
               <input value={ytLink} onChange={(e) => setYtLink(e.target.value)} placeholder="YOUTUBE_URL..." className="bg-black/80 border border-white/5 rounded-xl px-3 py-2 text-[10px] font-mono outline-none text-cyan-100 focus:border-cyan-500 transition-all" />
               <button onClick={syncMusic} className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-black py-2.5 rounded-xl uppercase hover:bg-cyan-500 hover:text-black transition-all">Engage_Relay</button>
            </div>
          </div>
        </div>
      </aside>

      {/* MEDIA BRIDGE */}
      {currentTrackId && <div className="fixed -left-[9999px]"><iframe width="0" height="0" src={`https://www.youtube.com/embed/${currentTrackId}?autoplay=1`} allow="autoplay" /></div>}

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative custom-scrollbar z-10">
        
        {/* HEADER */}
        <header className="flex items-center justify-between px-16 py-8 sticky top-0 bg-[#020205]/60 backdrop-blur-2xl z-40 border-b border-white/5 shadow-2xl">
          <div className="flex items-center gap-8">
            <div>
               <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">NORDEN<span className="text-cyan-400 drop-shadow-[0_0_20px_#06b6d4]">MC</span></h1>
               {/* 🌟 TOP LEFT XP COUNTER */}
               <div className="flex items-center gap-3 mt-3 ml-1">
                  <div className="bg-gradient-to-r from-cyan-500/20 to-transparent border border-cyan-500/30 text-cyan-300 px-4 py-1.5 rounded-full text-[11px] font-black tracking-[0.2em] flex items-center gap-2 uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                     <Star size={14} className="fill-cyan-400/50" /> TOTAL_XP: {adminXp.toLocaleString()}
                  </div>
                  <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase animate-pulse">V16_GALACTIC_CORE</span>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-right hidden sm:block">
               <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">DEEP_SPACE_UPLINK</p>
               <p className="text-xs font-black text-cyan-400 uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">SIGNAL_LOCKED</p>
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-black text-[11px] px-14 py-5 rounded-2xl shadow-[0_15px_40px_rgba(6,182,212,0.4)] hover:scale-105 hover:shadow-[0_20px_50px_rgba(6,182,212,0.6)] transition-all uppercase tracking-widest border border-cyan-400/50">PLAY.NORDENMC.COM</button>
          </div>
        </header>

        <main className="p-16 max-w-[1700px] mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* DASHBOARD MATRIX */}
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="space-y-16">
                
                {/* STATUS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <StatCard icon={<Flame className="text-orange-500" />} label="SESSIONS" value={onlinePlayers.toLocaleString()} />
                  <StatCard icon={<Target className="text-red-500" />} label="FRAGS" value="14.2M" />
                  <StatCard icon={<Database className="text-cyan-500" />} label="CORE_TPS" value="20.0" />
                  <StatCard icon={<Signal className="text-green-500" />} label="WEBHOOK" value={webhookStatus} />
                </div>

                {/* TOP SPENDERS LEADERBOARD */}
                <div className="bg-gradient-to-r from-indigo-500/10 via-cyan-500/5 to-transparent p-[1.5px] rounded-[3.5rem] shadow-2xl">
                   <div className="bg-[#05050A]/80 backdrop-blur-xl p-10 rounded-[3.5rem] flex items-center justify-between border border-white/5">
                      <div className="flex items-center gap-8">
                         <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-inner"><Trophy size={32} /></div>
                         <div>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white/90">Market Overlords</h3>
                            <p className="text-[10px] font-black text-cyan-400/40 uppercase tracking-[0.4em]">Galactic Transaction Feed</p>
                         </div>
                      </div>
                      <div className="flex gap-12">
                         {topSpenders.sort((a,b) => b.amount - a.amount).slice(0, 3).map((spender, i) => (
                           <div key={spender.name} className="flex flex-col items-center">
                              <span className="text-[9px] font-black text-white/20 uppercase mb-2 tracking-widest">RANK_0{i+1}</span>
                              <span className="text-xl font-black italic text-cyan-50 uppercase mb-1">{spender.name}</span>
                              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">{spender.amount} TRANSACTIONS</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* EDITABLE PLAYER PODIUM */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
                  {leaderboard.map((p, idx) => <PodiumCard key={p.name} player={p} idx={idx} onAction={() => pushLog(`[DATA_UPLINK] FETCHING STATS FOR ${p.name}`)} />)}
                </div>

                {/* EDITABLE PLAYER ROWS */}
                <div className="space-y-6">
                  {leaderboard.map(p => <PlayerRow key={p.name} player={p} onAction={() => pushLog(`[DEEP_SCAN] INITIATED ON ${p.name}`)} />)}
                </div>
              </motion.div>
            )}

            {/* MARKET MATRIX */}
            {activeMenu === 'MARKET' && (
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 {['ULTIMATE_RANK', 'NEXUS_KEYS', 'GLOW_TAGS', 'OMEGA_CRATE', 'FLY_PERM', 'MVP_PLUS'].map(item => (
                   <div key={item} className="bg-[#05050A]/80 backdrop-blur-xl border border-white/5 p-12 rounded-[4rem] hover:bg-white/[0.03] transition-all duration-500 text-center group border-b-4 border-b-cyan-500/20 relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.02] rotate-12 group-hover:rotate-0 transition-transform duration-700"><ShoppingCart size={140} /></div>
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 rounded-[2.5rem] mx-auto mb-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-inner"><ShoppingCart className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" size={36} /></div>
                      <h3 className="text-3xl font-black italic mb-10 uppercase tracking-tighter text-white/90 drop-shadow-md">{item.replace('_', ' ')}</h3>
                      <button onClick={() => initPurchase(item)} className="w-full bg-cyan-500 text-black py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_10px_30px_rgba(6,182,212,0.3)]">SECURE_ITEM</button>
                   </div>
                 ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* 💳 PURCHASE MODAL */}
      <AnimatePresence>
        {isPurchaseModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setIsPurchaseModalOpen(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-[#05050A] border border-cyan-500/30 w-full max-w-lg p-12 rounded-[4rem] relative z-[110] shadow-[0_0_100px_rgba(6,182,212,0.15)]">
              <div className="text-center mb-10">
                <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-cyan-400 border border-cyan-500/20"><User size={44} /></div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-white">Identity Verification</h3>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Target Payload: <span className="text-cyan-400">{selectedItem}</span></p>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-cyan-500/50 uppercase tracking-[0.3em] ml-2">Minecraft IGN</label>
                  <input type="text" placeholder="Enter Username..." value={mcUsername} onChange={(e) => setMcUsername(e.target.value)} className="w-full bg-black/50 border border-white/10 p-7 rounded-[2rem] text-2xl font-mono text-cyan-300 outline-none focus:border-cyan-500 transition-all shadow-inner text-center" />
                </div>
                <button onClick={finalizePurchase} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all mt-6 text-xs">TRANSMIT_FUNDS</button>
                <button onClick={() => setIsPurchaseModalOpen(false)} className="w-full text-white/20 font-black text-[10px] uppercase tracking-[0.4em] mt-4 hover:text-red-400 transition-all">Abort_Protocol</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔐 V16 GALACTIC ADMIN CONSOLE */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 900 }} animate={{ x: 0 }} exit={{ x: 900 }} transition={{ type: "spring", damping: 25, stiffness: 120 }} className="fixed right-0 top-0 h-full w-[700px] bg-[#020206]/95 border-l border-white/5 z-[60] p-12 shadow-[-100px_0_150px_rgba(0,0,0,0.9)] backdrop-blur-3xl overflow-y-auto custom-scrollbar">
            
            <div className="flex justify-between items-center mb-12 sticky top-0 bg-[#020206]/95 py-4 z-20 border-b border-white/5">
               <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">GALACTIC_COMMAND</h3>
               <button onClick={() => setIsAdminOpen(false)} className="text-white/30 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] border border-white/10 px-5 py-3 rounded-xl hover:bg-white/5 transition-all">CLOSE_BAY [X]</button>
            </div>

            {!isAuthorized ? (
              <div className="flex flex-col items-center justify-center h-[70%]">
                 <ShieldAlert size={120} className="text-red-500/20 mb-12 animate-[pulse_2s_ease-in-out_infinite]" />
                 <p className="text-red-400/50 font-black text-[11px] tracking-[0.6em] mb-10 uppercase text-center">Classified_Access_Only<br/>Enter_Passkey_Prople</p>
                 <input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAuth()} className="bg-black/80 border border-red-500/20 w-full p-8 rounded-[2.5rem] text-center text-4xl tracking-[0.5em] font-mono outline-none focus:border-red-500 transition-all mb-8 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] text-red-100" />
                 <button onClick={handleAuth} className="w-full bg-red-600/10 border border-red-500/30 text-red-500 py-7 rounded-[2rem] font-black uppercase tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all shadow-2xl">BREACH_FIREWALL</button>
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-700 pb-20">
                 
                 {/* 🌟 PERSONAL ADMIN XP UPLINK */}
                 <div className="bg-gradient-to-br from-indigo-900/20 to-black border border-indigo-500/20 p-10 rounded-[3.5rem] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] rotate-45"><Star size={180} /></div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <div className="flex items-center gap-4 text-indigo-400">
                          <Crown size={28} />
                          <span className="font-black text-xs tracking-[0.4em] uppercase text-indigo-300">Admin_XP_Inject</span>
                       </div>
                       <div className="px-5 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-black uppercase border border-indigo-500/30 tracking-widest">{adminXp.toLocaleString()} XP</div>
                    </div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-8">Authorizing Entity: <span className="text-white">UTKARSH PANDEY</span></p>
                    <div className="grid grid-cols-3 gap-5 relative z-10">
                       <button onClick={() => grantSelfXp(100)} className="bg-indigo-500/10 border border-indigo-500/20 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest text-indigo-200 hover:bg-indigo-500 hover:text-white transition-all shadow-md">+100</button>
                       <button onClick={() => grantSelfXp(500)} className="bg-indigo-500/10 border border-indigo-500/20 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest text-indigo-200 hover:bg-indigo-500 hover:text-white transition-all shadow-md">+500</button>
                       <button onClick={() => grantSelfXp(1000)} className="bg-indigo-500/10 border border-indigo-500/20 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest text-indigo-200 hover:bg-indigo-500 hover:text-white transition-all shadow-md">+1000</button>
                    </div>
                 </div>

                 {/* 🔨 IP BAN MATRIX */}
                 <div className="bg-red-950/10 border border-red-500/20 p-10 rounded-[3.5rem] relative shadow-2xl">
                    <div className="flex items-center gap-4 text-red-500 mb-8">
                       <Ban size={28} />
                       <span className="font-black text-xs tracking-[0.4em] uppercase">Global_IP_Blacklist</span>
                    </div>
                    <div className="flex gap-4">
                       <input type="text" placeholder="IPv4 / Target..." value={ipBanInput} onChange={(e) => setIpBanInput(e.target.value)} className="flex-1 bg-black/60 border border-red-500/20 p-5 rounded-[1.5rem] text-red-300 font-mono text-sm outline-none focus:border-red-500 transition-all" />
                       <button onClick={executeIpBan} className="bg-red-600/20 border border-red-500/40 text-red-400 px-8 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all">EXECUTE_BAN</button>
                    </div>
                    {bannedIps.length > 0 && (
                      <div className="mt-6 space-y-2">
                        <p className="text-[9px] font-black text-red-500/50 uppercase tracking-widest mb-3">Recent Bans</p>
                        {bannedIps.map((ip, i) => <div key={i} className="text-[11px] font-mono text-red-400 bg-red-950/30 p-3 rounded-xl border border-red-900/30">{ip}</div>)}
                      </div>
                    )}
                 </div>

                 {/* ✏️ MANUAL LEADERBOARD OVERRIDE */}
                 <div className="bg-white/[0.02] border border-white/10 p-10 rounded-[3.5rem] shadow-2xl">
                    <div className="flex items-center gap-4 text-white/60 mb-8">
                       <Edit3 size={28} />
                       <span className="font-black text-xs tracking-[0.4em] uppercase text-white/80">Leaderboard_Override</span>
                    </div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-6 leading-relaxed">Modify the global matrix directly. Changes reflect instantly on the dashboard.</p>
                    
                    <div className="space-y-6">
                       {leaderboard.map((p, index) => (
                         <div key={index} className="bg-black/50 border border-white/5 p-6 rounded-[2rem] flex flex-col gap-4 relative group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-4xl italic pointer-events-none">{p.rank}</div>
                            <div className="flex gap-4 relative z-10">
                               <div className="flex-1">
                                  <label className="text-[8px] font-black text-cyan-500/50 uppercase tracking-widest ml-2 mb-1 block">Player Name</label>
                                  <input type="text" value={p.name} onChange={(e) => handleLeaderboardEdit(index, 'name', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-black italic text-white outline-none focus:border-cyan-500" />
                               </div>
                               <div className="w-32">
                                  <label className="text-[8px] font-black text-white/30 uppercase tracking-widest ml-2 mb-1 block">K/D Ratio</label>
                                  <input type="text" value={p.kd} onChange={(e) => handleLeaderboardEdit(index, 'kd', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-mono text-white outline-none focus:border-cyan-500 text-center" />
                               </div>
                            </div>
                            <div className="flex-1 relative z-10">
                               <label className="text-[8px] font-black text-white/30 uppercase tracking-widest ml-2 mb-1 block">Tagline</label>
                               <input type="text" value={p.tag} onChange={(e) => handleLeaderboardEdit(index, 'tag', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-[10px] font-black tracking-[0.2em] text-white/60 outline-none focus:border-cyan-500 uppercase" />
                            </div>
                         </div>
                       ))}
                    </div>
                    <button onClick={() => pushLog("[DATA] LEADERBOARD_STATE_SAVED")} className="w-full mt-8 bg-white/5 hover:bg-white text-white/50 hover:text-black py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 border border-white/10"><Save size={16}/> COMMIT_CHANGES</button>
                 </div>

                 {/* COMMAND CENTER (ENHANCED) */}
                 <div className="grid grid-cols-2 gap-5">
                    <button onClick={() => pushLog("[CMD] PURGING_GLOBAL_CACHE")} className="bg-white/5 border border-white/10 py-8 rounded-[2rem] text-white/60 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-md flex flex-col items-center gap-3"><HardDrive size={24}/> Purge_Cache</button>
                    <button onClick={() => pushLog("[CMD] RESTARTING_ALL_NODES")} className="bg-white/5 border border-white/10 py-8 rounded-[2rem] text-cyan-400 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-black transition-all shadow-md flex flex-col items-center gap-3"><Power size={24}/> Restart_Nodes</button>
                 </div>

                 {/* SYSTEM SYSLOG */}
                 <div className="bg-black/80 border border-white/10 p-10 rounded-[3rem] font-mono text-[11px] h-[350px] overflow-y-auto text-white/30 custom-scrollbar shadow-inner relative">
                    <div className="flex items-center gap-3 text-cyan-500/50 mb-8 border-b border-white/5 pb-6 sticky top-0 bg-black/90 backdrop-blur-md z-10"><Terminal size={16}/> GALACTIC_SYSLOG</div>
                    <div className="space-y-4">
                       {logs.map((log, i) => <div key={i} className="flex gap-6 leading-relaxed hover:text-white/60 transition-colors"><span className="opacity-10 pointer-events-none">0x{i.toString(16).toUpperCase()}</span><span>{log}</span></div>)}
                    </div>
                 </div>
                 
                 <button onClick={() => {setIsAuthorized(false); setPasswordInput('')}} className="w-full text-white/10 font-black text-[10px] uppercase tracking-[0.8em] mt-12 hover:text-red-500 transition-colors py-4">Terminate_Session</button>
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
    <div onClick={onClick} className={`flex items-center gap-6 cursor-pointer group py-4 px-4 rounded-2xl transition-all duration-500 ${active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
      <div className={`transition-transform duration-500 ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'group-hover:scale-110'}`}>{icon}</div>
      <span className="text-[11px] font-black tracking-[0.2em] hidden group-hover:block whitespace-nowrap uppercase animate-in slide-in-from-left-2">{label}</span>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-[#05050A]/80 backdrop-blur-xl border border-white/5 p-12 rounded-[3.5rem] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group overflow-hidden relative shadow-xl">
      <div className="absolute -bottom-6 -right-6 opacity-[0.02] group-hover:scale-150 transition-all duration-700">{icon}</div>
      <div className="flex items-center gap-4 mb-6 opacity-40 font-black text-[10px] tracking-[0.3em] uppercase text-white drop-shadow-md">{icon} {label}</div>
      <p className="text-5xl font-black italic tracking-tighter group-hover:text-cyan-300 transition-colors leading-none text-white/90">{value}</p>
    </div>
  );
}

function PodiumCard({ player, idx, onAction }: any) {
  const isW = idx === 0;
  return (
    <div className={`bg-gradient-to-b ${isW ? 'from-cyan-500/30 to-transparent shadow-[0_30px_80px_-20px_rgba(6,182,212,0.4)]' : 'from-white/5 to-transparent'} p-[1.5px] rounded-[4.5rem] group hover:scale-[1.02] transition-all duration-500`}>
      <div className="bg-[#05050A]/90 backdrop-blur-2xl rounded-[4.5rem] p-12 flex flex-col items-center border border-white/5 text-center relative overflow-hidden h-full">
        {isW && <Crown className="mb-6 text-yellow-400 drop-shadow-[0_0_25px_#facc15]" size={48} />}
        <img src={player.img} className={`w-44 h-44 rounded-[3.5rem] mb-10 border-4 ${isW ? 'border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.3)] scale-110' : 'border-white/10 opacity-70 group-hover:opacity-100 group-hover:scale-105'} transition-all duration-700`} />
        <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2 group-hover:text-cyan-300 transition-colors text-white">{player.name}</h2>
        <p className="text-[10px] tracking-[0.4em] text-cyan-400/60 font-black mb-12 uppercase">{player.tag}</p>
        <button onClick={onAction} className={`w-full py-5 rounded-[2.5rem] font-black text-[11px] border tracking-[0.3em] transition-all uppercase ${isW ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_10px_20px_rgba(6,182,212,0.3)] hover:bg-white' : 'bg-white/5 text-white/40 border-white/5 hover:bg-white hover:text-black shadow-inner'}`}>VIEW_STATS</button>
      </div>
    </div>
  );
}

function PlayerRow({ player, onAction }: any) {
  return (
    <div className="bg-[#05050A]/80 backdrop-blur-xl border border-white/5 rounded-[4rem] p-10 flex items-center justify-between group hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden shadow-lg">
      <div className="flex items-center gap-12 relative z-10">
        <span className="text-6xl font-black italic text-white/[0.04] group-hover:text-cyan-500/10 w-24 transition-all duration-500">{player.rank}</span>
        <img src={player.img} className="w-20 h-20 rounded-[1.5rem] shadow-2xl border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500" />
        <div className="flex flex-col gap-2">
           <h4 className="font-black italic text-4xl uppercase text-white/90 group-hover:text-cyan-300 transition-colors tracking-tighter leading-none">{player.name}</h4>
           <span className="text-[10px] font-black text-white/30 tracking-[0.4em] uppercase transition-all">{player.tag}</span>
        </div>
      </div>
      <div className="flex items-center gap-16 relative z-10">
         <div className="text-center">
            <p className="text-[10px] font-black text-white/20 mb-2 uppercase tracking-widest">K_D_RATIO</p>
            <p className="text-3xl font-black italic leading-none text-white">{player.kd}</p>
         </div>
         <div className={`w-40 py-5 rounded-[2rem] font-black text-center text-[10px] border tracking-[0.3em] transition-all uppercase shadow-inner ${player.statType === 'HT1' ? 'text-red-400 border-red-500/20 bg-red-500/10' : 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10'}`}>{player.statType}</div>
         <button onClick={onAction} className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white/30 group-hover:bg-cyan-500 group-hover:text-black transition-all group-hover:rotate-[360deg] shadow-2xl duration-700 border border-white/5 group-hover:border-cyan-400"><Search size={24} /></button>
      </div>
    </div>
  );
}
