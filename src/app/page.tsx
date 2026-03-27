"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, Trophy, ChevronRight, Zap, Activity, LayoutDashboard, 
  ShieldCheck, Users, Settings, BarChart3, Swords, Target, Flame, 
  Database, Lock, Unlock, AlertTriangle, Terminal, Cpu, HardDrive, 
  Network, Globe, Radio, Hash, ShoppingCart, Music, Signal, Send, 
  ArrowUpRight, X, MessageSquare, ShieldAlert, BellRing, UserPlus, 
  Filter, Layers, RefreshCw, Star, User
} from 'lucide-react';

// --- TITAN HARDCODED CONFIG ---
const PASSKEY = "PVP_PROPLE";
const DISCORD_AVATAR = "https://mc-heads.net/avatar/Utkarsh/100";
const GLOBAL_WEBHOOK = "https://discord.com/api/webhooks/1487157795169243236/7KlEaV40W3BPxlU0K276i8VO6gu5mk9Hu-hdmEBplKDSmagLIvuxDfMnhK8THr3FmdhV";

export default function NordenNexusV15() {
  // --- CORE STATE ENGINES ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  // --- PURCHASE MODAL STATE ---
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [mcUsername, setMcUsername] = useState('');

  // --- ADMIN XP STATE ---
  const [adminXp, setAdminXp] = useState(1000);
  
  // --- WEBHOOK & NETWORK STATES ---
  const [isWebhookActive, setIsWebhookActive] = useState(true);
  const [webhookStatus, setWebhookStatus] = useState('STABLE');
  const [onlinePlayers, setOnlinePlayers] = useState(2841);

  // --- MUSIC ENGINE ---
  const [ytLink, setYtLink] = useState('');
  const [currentTrackId, setCurrentTrackId] = useState('');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // --- TOP SPENDER STATE ---
  const [topSpenders, setTopSpenders] = useState([
    { name: "UTKARSH", amount: 12 },
    { name: "SATYARTH", amount: 8 },
    { name: "SHIVAM", amount: 5 }
  ]);

  // --- LOGGING ---
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] NORDEN_NEXUS_V15_LEGACY ONLINE",
    "[CORE] PURCHASE_VALIDATION_ACTIVE",
    "[XP_SYSTEM] ADMIN_PERSONAL_UPLINK_READY",
    "[MONITOR] PULSE_SERVICE_STARTED"
  ]);

  const players = [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_OWNER", discipline: "CRYSTAL", statType: "HT1", kd: "5.2", img: "https://mc-heads.net/avatar/Utkarsh/100" },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE", discipline: "CRYSTAL", statType: "HT1", kd: "4.8", img: "https://mc-heads.net/avatar/Satyarth/100" },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST", discipline: "SWORD", statType: "HT1", kd: "4.1", img: "https://mc-heads.net/avatar/Shivam/100" },
  ];

  // --- DISCORD WEBHOOK DISPATCHER ---
  const sendDiscordNotification = useCallback(async (title: string, message: string, color: number = 3447003, fields: any[] = []) => {
    if (!isWebhookActive) return;

    const embed = {
      username: "NordenMC Nexus Global",
      avatar_url: DISCORD_AVATAR,
      embeds: [{
        title: title,
        description: message,
        color: color,
        fields: fields,
        timestamp: new Date().toISOString(),
        footer: { text: "V15 Legacy | NordenMC Network" }
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
      alert("CRITICAL: Minecraft Username Required for Purchase.");
      return;
    }

    pushLog(`[MARKET] SALE: ${selectedItem} TO ${mcUsername}`);
    
    // Update Leaderboard
    setTopSpenders(prev => {
      const exists = prev.find(s => s.name.toUpperCase() === mcUsername.toUpperCase());
      if (exists) {
        return prev.map(s => s.name.toUpperCase() === mcUsername.toUpperCase() ? { ...s, amount: s.amount + 1 } : s);
      }
      return [...prev, { name: mcUsername.toUpperCase(), amount: 1 }].slice(-5);
    });

    // Discord Signal
    sendDiscordNotification(
      "🛒 New Shop Transaction",
      `A purchase has been successfully processed.`,
      15105570,
      [
        { name: "👤 Player", value: `\`${mcUsername}\``, inline: true },
        { name: "📦 Item", value: `\`${selectedItem}\``, inline: true },
        { name: "📡 Origin", value: "Nexus_Web_Portal", inline: true }
      ]
    );

    setIsPurchaseModalOpen(false);
    setMcUsername('');
    alert("PURCHASE SUCCESSFUL: Items will be synced to your account in-game.");
  };

  // --- ADMIN XP HANDLER ---
  const grantSelfXp = (amount: number) => {
    setAdminXp(prev => prev + amount);
    pushLog(`[XP] GRANTED +${amount} XP TO ADMIN_SESSION`);
    sendDiscordNotification(
      "✨ Admin XP Uplink",
      "XP has been successfully granted to the authorized Admin account.",
      10181046,
      [
        { name: "Admin", value: "Utkarsh Pandey", inline: true },
        { name: "Amount", value: `${amount} XP`, inline: true },
        { name: "New Total", value: `${adminXp + amount}`, inline: true }
      ]
    );
  };

  // --- AUTO-PULSE MONITOR ---
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      sendDiscordNotification(
        "📊 Periodic Server Status",
        "Automated health check for NordenMC Infrastructure.",
        1752220,
        [
          { name: "Node Status", value: "ONLINE", inline: true },
          { name: "Players", value: `${onlinePlayers}`, inline: true },
          { name: "IP", value: "PLAY.NORDENMC.COM", inline: true }
        ]
      );
    }, 600000);
    return () => clearInterval(pulseInterval);
  }, [sendDiscordNotification, onlinePlayers]);

  const handleAuth = () => {
    if (passwordInput === PASSKEY) {
      setIsAuthorized(true);
      pushLog("[SUCCESS] PRIVILEGED_ACCESS_GRANTED");
      sendDiscordNotification("⚡ Secure Root Login", "Admin Utkarsh has entered the Exodus Chamber.", 15844367);
    } else {
      pushLog("[WARN] UNAUTHORIZED_LOGIN_ATTEMPT");
    }
  };

  const syncMusic = () => {
    const videoIdMatch = ytLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n]+)/);
    if (videoIdMatch) {
      setCurrentTrackId(videoIdMatch[1]);
      setIsMusicPlaying(true);
      pushLog(`[AUDIO] SYNCED: ${videoIdMatch[1]}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#010103] text-white font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-24 hover:w-72 transition-all duration-700 border-r border-white/5 bg-black/60 backdrop-blur-3xl flex flex-col items-center py-10 z-50 group shadow-2xl">
        <div className="mb-16 transform hover:rotate-180 transition-all duration-500 cursor-pointer" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)]">
            <Zap size={28} className="text-white fill-white" />
          </div>
        </div>
        
        <nav className="flex flex-col gap-8 flex-1 w-full px-6">
          <SidebarBtn icon={<LayoutDashboard />} label="COMMAND_CENTER" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <SidebarBtn icon={<ShoppingCart />} label="NEXUS_MARKET" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <SidebarBtn icon={<Users />} label="CLAN_UPLINK" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <SidebarBtn icon={<BarChart3 />} label="DATA_ANALYTICS" active={activeMenu === 'STATS'} onClick={() => setActiveMenu('STATS')} />
          <div className="h-px bg-white/5 my-4 mx-2" />
          <SidebarBtn icon={<ShieldCheck className={isAuthorized ? "text-green-500" : "text-red-500"} />} label="ADMIN_LOCK" onClick={() => setIsAdminOpen(true)} />
        </nav>

        {/* AUDIO SECTION */}
        <div className="mt-auto px-6 w-full pb-10">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-3 group/music hover:bg-white/10 transition-all overflow-hidden shadow-lg">
            <div className="flex items-center justify-center p-3 bg-cyan-500/20 rounded-2xl">
               <Radio className={`text-cyan-400 ${isMusicPlaying ? 'animate-pulse' : ''}`} size={20} />
            </div>
            <div className="hidden group-hover:flex flex-col gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2">
               <input value={ytLink} onChange={(e) => setYtLink(e.target.value)} placeholder="YT_URL..." className="bg-black/60 border border-white/5 rounded-xl px-3 py-2 text-[10px] outline-none" />
               <button onClick={syncMusic} className="bg-white text-black text-[10px] font-black py-2.5 rounded-xl uppercase hover:bg-cyan-400 transition-colors">Sync</button>
            </div>
          </div>
        </div>
      </aside>

      {/* HIDDEN MEDIA BRIDGE */}
      {currentTrackId && <div className="fixed -left-[9999px]"><iframe width="0" height="0" src={`https://www.youtube.com/embed/${currentTrackId}?autoplay=1`} allow="autoplay" /></div>}

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative custom-scrollbar">
        <header className="flex items-center justify-between px-16 py-10 sticky top-0 bg-[#010103]/90 backdrop-blur-3xl z-40 border-b border-white/5">
          <div className="flex items-center gap-6">
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">NORDEN<span className="text-cyan-400 drop-shadow-[0_0_20px_#06b6d4]">MC</span></h1>
            <div className="pl-6 border-l border-white/10 hidden lg:block">
               <p className="text-[10px] font-black tracking-[0.4em] text-green-400 uppercase leading-none mb-1"><Activity size={12} className="inline mr-2" /> UPLINK_STABLE</p>
               <p className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase tracking-tighter">V15_LEGACY_CORE</p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-right hidden sm:block">
               <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">NETWORK_BRIDGE</p>
               <p className="text-xs font-black text-cyan-400 uppercase tracking-tighter">DISCORD_SYNC_ACTIVE</p>
            </div>
            <button className="bg-cyan-500 text-black font-black text-[11px] px-14 py-5 rounded-2xl shadow-xl hover:scale-105 hover:bg-white transition-all uppercase tracking-widest">PLAY.NORDENMC.COM</button>
          </div>
        </header>

        <main className="p-16 max-w-[1700px] mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeMenu === 'DASHBOARD' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                
                {/* STATUS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <StatCard icon={<Flame className="text-orange-500" />} label="SESSIONS" value={onlinePlayers.toLocaleString()} />
                  <StatCard icon={<Target className="text-red-500" />} label="ELIMINATIONS" value="12.9M" />
                  <StatCard icon={<Database className="text-cyan-500" />} label="CORE_TPS" value="20.0" />
                  <StatCard icon={<Signal className="text-green-500" />} label="WEBHOOK" value={webhookStatus} />
                </div>

                {/* TOP SPENDERS LEADERBOARD */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-transparent p-[1.5px] rounded-[3.5rem]">
                   <div className="bg-[#08080c] p-10 rounded-[3.5rem] flex items-center justify-between border border-white/5">
                      <div className="flex items-center gap-8">
                         <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400"><Trophy size={32} /></div>
                         <div>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Market Top Spenders</h3>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Global Transaction Feed</p>
                         </div>
                      </div>
                      <div className="flex gap-12">
                         {topSpenders.sort((a,b) => b.amount - a.amount).slice(0, 3).map((spender, i) => (
                           <div key={spender.name} className="flex flex-col items-center">
                              <span className="text-[9px] font-black text-white/10 uppercase mb-2">#0{i+1}</span>
                              <span className="text-xl font-black italic text-white/80 uppercase mb-1">{spender.name}</span>
                              <span className="text-xs font-black text-cyan-500 uppercase tracking-widest">{spender.amount} ITEMS</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* PLAYER PODIUM */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {players.map((p, idx) => <PodiumCard key={p.name} player={p} idx={idx} onAction={() => initPurchase(`VIP_Insight_${p.name}`)} />)}
                </div>

                {/* LIST VIEW */}
                <div className="space-y-6">
                  {players.map(p => <PlayerRow key={p.name} player={p} onAction={() => initPurchase(`Data_Sync_${p.name}`)} />)}
                </div>
              </motion.div>
            )}

            {activeMenu === 'MARKET' && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 {['ULTIMATE_RANK', 'NEXUS_KEYS', 'GLOW_TAGS', 'OMEGA_CRATE', 'FLY_PERM', 'MVP_PLUS'].map(item => (
                   <div key={item} className="bg-[#08080c] border border-white/5 p-12 rounded-[4rem] hover:bg-white/[0.02] transition-all text-center group border-b-4 border-b-cyan-500/20 relative overflow-hidden">
                      <div className="w-20 h-20 bg-cyan-500/10 rounded-[2rem] mx-auto mb-10 flex items-center justify-center group-hover:scale-110 transition-transform"><ShoppingCart className="text-cyan-400" size={32} /></div>
                      <h3 className="text-3xl font-black italic mb-10 uppercase tracking-tighter text-white/90">{item.replace('_', ' ')}</h3>
                      <button onClick={() => initPurchase(item)} className="w-full bg-cyan-500 text-black py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg">INITIALIZE_BUY</button>
                   </div>
                 ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* 💳 PURCHASE MODAL (USERNAME INPUT) */}
      <AnimatePresence>
        {isPurchaseModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsPurchaseModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#08080c] border border-white/10 w-full max-w-lg p-12 rounded-[4rem] relative z-[110] shadow-2xl">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-cyan-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-cyan-400"><User size={40} /></div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Checkout Verification</h3>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Confirming Item: <span className="text-cyan-500">{selectedItem}</span></p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-2">Minecraft Username</label>
                  <input 
                    type="text" 
                    placeholder="Enter Username..." 
                    value={mcUsername}
                    onChange={(e) => setMcUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-xl font-mono text-cyan-400 outline-none focus:border-cyan-500 transition-all" 
                  />
                </div>
                <button onClick={finalizePurchase} className="w-full bg-cyan-500 text-black py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl mt-4">CONFIRM_UPLINK</button>
                <button onClick={() => setIsPurchaseModalOpen(false)} className="w-full text-white/20 font-black text-[10px] uppercase tracking-widest mt-2 hover:text-white transition-all">Cancel_Transaction</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔐 ADMIN PANEL (WITH XP UPLINK) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 800 }} animate={{ x: 0 }} exit={{ x: 800 }} className="fixed right-0 top-0 h-full w-[650px] bg-[#020205] border-l border-white/10 z-[60] p-16 shadow-[-50px_0_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-16">
               <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">NEXUS_ADMIN_V15</h3>
               <button onClick={() => setIsAdminOpen(false)} className="text-white/20 hover:text-white font-black text-[10px] uppercase tracking-widest border border-white/10 px-4 py-2 rounded-xl">CLOSE [X]</button>
            </div>

            {!isAuthorized ? (
              <div className="flex flex-col items-center justify-center h-[60%]">
                 <ShieldAlert size={100} className="text-red-500/10 mb-10 animate-pulse" />
                 <input type="password" placeholder="ROOT_PASSKEY..." value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAuth()} className="bg-white/5 border border-white/10 w-full p-8 rounded-[2.5rem] text-center text-3xl tracking-[0.4em] font-mono outline-none focus:border-cyan-500 transition-all mb-8 shadow-inner" />
                 <button onClick={handleAuth} className="w-full bg-white text-black py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all shadow-2xl">AUTHORIZE</button>
              </div>
            ) : (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10">
                 
                 {/* 🌟 PERSONAL ADMIN XP UPLINK */}
                 <div className="bg-cyan-500/5 border border-cyan-500/20 p-10 rounded-[3.5rem] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.05]"><Star size={120} /></div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <div className="flex items-center gap-4 text-cyan-400">
                          <Crown size={24} />
                          <span className="font-black text-xs tracking-[0.3em] uppercase">Admin_Personal_XP</span>
                       </div>
                       <div className="px-5 py-2 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase border border-cyan-500/30">{adminXp} XP</div>
                    </div>
                    
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-6 px-2">Target: <span className="text-white">Utkarsh Pandey (Self)</span></p>
                    
                    <div className="grid grid-cols-3 gap-4 relative z-10">
                       <button onClick={() => grantSelfXp(100)} className="bg-white/5 border border-white/10 py-4 rounded-xl text-[10px] font-black uppercase hover:bg-cyan-500 hover:text-black transition-all">+100 XP</button>
                       <button onClick={() => grantSelfXp(500)} className="bg-white/5 border border-white/10 py-4 rounded-xl text-[10px] font-black uppercase hover:bg-cyan-500 hover:text-black transition-all">+500 XP</button>
                       <button onClick={() => grantSelfXp(1000)} className="bg-white/5 border border-white/10 py-4 rounded-xl text-[10px] font-black uppercase hover:bg-cyan-500 hover:text-black transition-all">+1K XP</button>
                    </div>
                 </div>

                 {/* SYSTEM SYSLOG */}
                 <div className="bg-black border border-white/10 p-10 rounded-[3rem] font-mono text-[11px] h-[350px] overflow-y-auto text-white/30 custom-scrollbar shadow-inner relative">
                    <div className="flex items-center gap-3 text-cyan-500/50 mb-8 border-b border-white/5 pb-6 sticky top-0 bg-black z-10"><Terminal size={16}/> ADMIN_SYSLOG</div>
                    <div className="space-y-3">
                       {logs.map((log, i) => <div key={i} className="flex gap-6"><span className="opacity-10">0x{i}</span><span>{log}</span></div>)}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <button onClick={() => pushLog("[CMD] GLOBAL_MUTE_INIT")} className="bg-red-500/10 border border-red-500/20 py-7 rounded-[2rem] text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg">Global_Mute</button>
                    <button onClick={() => pushLog("[CMD] REFRESH_NODES")} className="bg-cyan-500/10 border border-cyan-500/20 py-7 rounded-[2rem] text-cyan-400 font-black text-xs uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all shadow-lg">Sync_Nodes</button>
                 </div>
                 
                 <button onClick={() => {setIsAuthorized(false); setPasswordInput('')}} className="w-full text-white/10 font-black text-[10px] uppercase tracking-[0.8em] mt-10 hover:text-red-500 transition-colors py-4">Terminate_Uplink</button>
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
    <div onClick={onClick} className={`flex items-center gap-6 cursor-pointer group py-4 px-4 rounded-2xl transition-all duration-500 ${active ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 shadow-lg' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
      <div className={`transition-transform duration-500 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</div>
      <span className="text-[11px] font-black tracking-[0.2em] hidden group-hover:block whitespace-nowrap uppercase animate-in slide-in-from-left-2">{label}</span>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[3.5rem] hover:bg-white/[0.04] transition-all group overflow-hidden relative shadow-lg">
      <div className="absolute -bottom-6 -right-6 opacity-[0.02] group-hover:scale-150 transition-all duration-700">{icon}</div>
      <div className="flex items-center gap-4 mb-6 opacity-30 font-black text-[10px] tracking-[0.3em] uppercase">{icon} {label}</div>
      <p className="text-5xl font-black italic tracking-tighter group-hover:text-cyan-400 transition-colors leading-none">{value}</p>
    </div>
  );
}

function PodiumCard({ player, idx, onAction }: any) {
  const isW = idx === 0;
  return (
    <div className={`bg-gradient-to-b ${isW ? 'from-cyan-500/40 to-transparent shadow-[0_30px_60px_-15px_rgba(6,182,212,0.4)]' : 'from-white/10 to-transparent'} p-[1.5px] rounded-[4.5rem] group hover:scale-[1.02] transition-all duration-500`}>
      <div className="bg-[#08080c] rounded-[4.5rem] p-12 flex flex-col items-center border border-white/5 text-center relative overflow-hidden h-full">
        {isW && <Crown className="mb-6 text-yellow-400 drop-shadow-[0_0_20px_#facc15]" size={48} />}
        <img src={player.img} className={`w-44 h-44 rounded-[3.5rem] mb-10 border-4 ${isW ? 'border-cyan-400 shadow-2xl scale-110' : 'border-white/10 opacity-80 group-hover:opacity-100 group-hover:scale-105'} transition-all duration-700`} />
        <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2 group-hover:text-cyan-400 transition-colors">{player.name}</h2>
        <p className="text-[10px] tracking-[0.4em] text-cyan-400/50 font-black mb-12 uppercase">{player.tag}</p>
        <button onClick={onAction} className={`w-full py-5 rounded-[2.5rem] font-black text-[11px] border tracking-[0.3em] transition-all uppercase ${isW ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg hover:bg-white' : 'bg-white/5 text-white/40 border-white/5 hover:bg-white hover:text-black'}`}>UPLINK_DATA</button>
      </div>
    </div>
  );
}

function PlayerRow({ player, onAction }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-[4rem] p-10 flex items-center justify-between group hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden shadow-sm">
      <div className="flex items-center gap-12 relative z-10">
        <span className="text-6xl font-black italic text-white/[0.03] group-hover:text-cyan-500/10 w-24 transition-all duration-500">{player.rank}</span>
        <img src={player.img} className="w-20 h-20 rounded-[1.5rem] shadow-2xl border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500" />
        <div className="flex flex-col gap-2">
           <h4 className="font-black italic text-4xl uppercase group-hover:text-cyan-400 transition-colors tracking-tighter leading-none">{player.name}</h4>
           <span className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase transition-all">{player.tag}</span>
        </div>
      </div>
      <div className="flex items-center gap-16 relative z-10">
         <div className="text-center">
            <p className="text-[10px] font-black text-white/10 mb-2 uppercase tracking-widest">K_D_RATIO</p>
            <p className="text-3xl font-black italic leading-none">{player.kd}</p>
         </div>
         <div className={`w-40 py-5 rounded-[2rem] font-black text-center text-[10px] border tracking-[0.2em] transition-all uppercase ${player.statType === 'HT1' ? 'text-red-500 border-red-500/20 bg-red-500/5' : 'text-cyan-500 border-cyan-500/20 bg-cyan-500/5'}`}>{player.statType}</div>
         <button onClick={onAction} className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-cyan-500 group-hover:text-black transition-all group-hover:rotate-[360deg] shadow-2xl duration-700 border border-white/5 group-hover:border-cyan-400"><ArrowUpRight size={28} /></button>
      </div>
    </div>
  );
}
