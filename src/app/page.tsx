"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, LayoutDashboard, ShieldCheck, Users, Swords, 
  Database, Lock, Terminal, ShoppingCart, ArrowUpRight, X, AlertTriangle, 
  CheckCircle, Edit, Ban, VolumeX, RefreshCcw, Trash2, UserPlus, 
  Send, Package, Ghost, Cpu, Activity, Shield, User, Globe, Zap
} from 'lucide-react';

/**
 * ============================================================
 * NORDEN_TIER_OS // BUILD: FINAL_OMNI_NEXUS
 * ARCHITECT: UTKARSH PANDEY
 * SERVER: play.mythichosting.fun:65102
 * AESTHETIC: CYBER_GLASSMORPHISM
 * ============================================================
 */

const SERVER_IP = "play.mythichosting.fun:65102";
const ADMIN_KEY = "PVP_PRO";

const MODES = ["OVERALL", "VANILLA", "UHC", "POT", "SMP", "BOXING", "BEDWARS"];

const STORE_RANKS = [
  { 
    id: "mvp", 
    name: "MVP", 
    price: "₹499", 
    color: "text-blue-400", 
    glow: "shadow-[0_0_30px_rgba(96,165,250,0.3)]",
    perks: ["[MVP] Prefix", "Priority Entry", "White Chat", "/nick access"] 
  },
  { 
    id: "mvp_plus", 
    name: "MVP+", 
    price: "₹999", 
    color: "text-red-500", 
    glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
    perks: ["All MVP Perks", "Particle Auras", "Colored Nicks", "Hub Flight"] 
  },
  { 
    id: "mvp_plus_plus", 
    name: "MVP++", 
    price: "₹1999", 
    color: "text-yellow-500", 
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.3)]",
    perks: ["All MVP+ Perks", "Private SMP", "Hex Nametags", "Queue Bypass", "Mythic Crates"] 
  }
];

export default function NordenTierFinal() {
  // SYSTEM STATES
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<any[]>([]);
  
  // LIVE DATA STATES
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [isServerOnline, setIsServerOnline] = useState(false);
  
  // SHOP STATES
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedRank, setSelectedRank] = useState<any>(null);
  const [playerIGN, setPlayerIGN] = useState("");

  // ADMIN STATES
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");

  // 1. REAL-TIME SERVER FETCH
  useEffect(() => {
    const updateStats = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await res.json();
        setIsServerOnline(data.online);
        setOnlinePlayers(data.players?.online || 0);
      } catch (e) {
        setIsServerOnline(false);
      }
    };
    updateStats();
    const timer = setInterval(updateStats, 30000);
    return () => clearInterval(timer);
  }, []);

  const addNotify = (title: string, msg: string, isError = false) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, msg, isError }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  // 2. DISCORD WEBHOOK LOGIC
  const triggerWebhook = async (type: 'SHOP' | 'STAFF', content: string, embed?: any) => {
    try {
      const res = await fetch('/api/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content, embed, username: playerIGN || "Utkarsh" })
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  };

  const handleFinalPurchase = async () => {
    if (!playerIGN.trim()) return addNotify("ACCESS DENIED", "Enter a valid Minecraft IGN", true);

    const embed = {
      title: "💎 NEW RANK ORDER INITIATED",
      description: `A player is requesting a rank upgrade.`,
      color: 0x00D1FF,
      fields: [
        { name: "Player Username", value: `\`${playerIGN}\``, inline: true },
        { name: "Selected Rank", value: selectedRank.name, inline: true },
        { name: "Order ID", value: `#${Math.floor(Math.random() * 90000)}`, inline: true }
      ],
      timestamp: new Date().toISOString()
    };

    const success = await triggerWebhook('SHOP', `🚨 **${playerIGN}** clicked the checkout for **${selectedRank.name}**!`, embed);
    
    if (success) {
      addNotify("ORDER SENT", "Redirecting to staff validation...");
      setIsCheckoutOpen(false);
    } else {
      addNotify("LINK FAILURE", "API Route not found or Discord blocked.", true);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1b4b,transparent)] opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
      </div>

      {/* MOBILE NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-2xl border-t border-white/10 z-[1000] flex justify-around items-center px-4">
        <MobileNavIcon icon={<LayoutDashboard/>} active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
        <MobileNavIcon icon={<ShoppingCart/>} active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
        <MobileNavIcon icon={<Swords/>} active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
        <MobileNavIcon icon={<ShieldCheck className={isAuthorized ? 'text-green-400' : 'text-white/40'}/>} active={false} onClick={() => setIsAdminOpen(true)} />
      </nav>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-24 hover:w-64 transition-all duration-500 bg-black/40 backdrop-blur-3xl border-r border-white/5 z-[1000] flex-col py-10 group overflow-hidden">
         <div className="flex flex-col items-center group-hover:items-start px-6 gap-12">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)]">
               <Ghost size={24}/>
            </div>
            <div className="flex flex-col gap-6 w-full">
               <SideBtn icon={<LayoutDashboard/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
               <SideBtn icon={<ShoppingCart/>} label="MARKET" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
               <SideBtn icon={<Swords/>} label="CLAN_WARS" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
               <SideBtn icon={<Terminal/>} label="SYSTEM_LOG" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
            </div>
         </div>
         <div className="mt-auto px-6">
            <SideBtn icon={<ShieldCheck className={isAuthorized ? 'text-green-400' : 'text-red-500 animate-pulse'}/>} label="ADMIN" onClick={() => setIsAdminOpen(true)} />
         </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="md:ml-24 p-6 sm:p-12 lg:p-20 relative z-10 pb-32 md:pb-20">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 mb-20">
           <div>
              <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">
                 NORDEN <span className="text-indigo-500">TIER</span>
              </motion.h1>
              <div className="flex items-center gap-4 mt-4">
                 <div className={`px-4 py-1 rounded-full border text-[10px] font-black tracking-[0.2em] flex items-center gap-2 ${isServerOnline ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                    <span className={`w-2 h-2 rounded-full ${isServerOnline ? 'bg-green-500 animate-ping' : 'bg-red-500'}`} />
                    {isServerOnline ? 'SYSTEM_ONLINE' : 'SYSTEM_OFFLINE'}
                 </div>
                 <span className="text-white/20 font-bold text-[10px] tracking-widest">BUILD_OMNI_3.1</span>
              </div>
           </div>

           <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full xl:w-auto">
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex justify-around items-center gap-8 flex-1">
                 <StatItem icon={<Users size={20}/>} label="ONLINE" val={onlinePlayers} />
                 <div className="w-[1px] h-10 bg-white/10" />
                 <StatItem icon={<Activity size={20}/>} label="TPS" val="20.0" />
              </div>
              <button 
                onClick={() => { navigator.clipboard.writeText(SERVER_IP); addNotify("COPIED", "IP added to clipboard"); }}
                className="bg-indigo-600 hover:bg-white hover:text-black transition-all text-white font-black px-10 py-6 rounded-3xl uppercase tracking-tighter text-sm shadow-2xl"
              >
                 {SERVER_IP}
              </button>
           </div>
        </header>

        {/* CONTENT SWITCHER */}
        <AnimatePresence mode="wait">
          {activeMenu === 'DASHBOARD' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
               
               {/* MODE SELECTOR */}
               <div className="flex flex-wrap gap-2 justify-center bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-3xl w-fit mx-auto">
                  {MODES.map(m => (
                    <button key={m} onClick={() => setActiveMode(m)} className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeMode === m ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}>
                       {m}
                    </button>
                  ))}
               </div>

               {/* TOP PLAYERS GRID */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <TopPlayerCard rank={1} name="UTKARSH" tag="OWNER" kd="15.4" img="Utkarsh" color="border-indigo-500" />
                  <TopPlayerCard rank={2} name="SATYARTH" tag="ELITE" kd="11.2" img="Satyarth" color="border-white/10" />
                  <TopPlayerCard rank={3} name="SHIVAM" tag="ELITE" kd="9.8" img="Shivam" color="border-white/10" />
               </div>
            </motion.div>
          )}

          {activeMenu === 'MARKET' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
               <div className="text-center">
                  <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-2">Norden_Store</h2>
                  <p className="text-indigo-500 font-bold uppercase tracking-[0.4em] text-xs italic">Power up your gameplay sequence</p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {STORE_RANKS.map(rank => (
                    <div key={rank.id} className={`bg-[#050508] border border-white/10 p-10 md:p-14 rounded-[3rem] relative overflow-hidden group transition-all duration-500 hover:-translate-y-2 ${rank.glow}`}>
                       <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                          <Package size={300}/>
                       </div>
                       <div className="relative z-10 h-full flex flex-col">
                          <h3 className={`text-5xl font-black italic uppercase mb-8 ${rank.color}`}>{rank.name}</h3>
                          <div className="space-y-5 mb-12 flex-1">
                             {rank.perks.map(perk => (
                               <div key={perk} className="flex items-center gap-4 text-xs font-black uppercase text-white/50 group-hover:text-white transition-colors">
                                  <CheckCircle size={16} className={rank.color}/> {perk}
                               </div>
                             ))}
                          </div>
                          <div className="pt-8 border-t border-white/5">
                             <p className="text-4xl font-black italic mb-6 tracking-tighter">{rank.price}</p>
                             <button 
                               onClick={() => { setSelectedRank(rank); setIsCheckoutOpen(true); }}
                               className="w-full bg-white/5 border border-white/10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
                             >
                                Checkout_Sequence
                             </button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* 3. CHECKOUT MODAL (IGN REQUEST) */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCheckoutOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#08080c] border border-white/10 w-full max-w-lg p-10 md:p-14 rounded-[4rem] relative z-10 shadow-[0_0_100px_rgba(79,70,229,0.2)]">
                <h3 className="text-4xl font-black italic uppercase mb-4">IDENTITY_CHECK</h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-10">Verification required for {selectedRank?.name}</p>
                
                <div className="space-y-8">
                   <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500 group-focus-within:text-white transition-colors" size={24} />
                      <input 
                        autoFocus
                        value={playerIGN}
                        onChange={(e) => setPlayerIGN(e.target.value.toUpperCase())}
                        placeholder="ENTER_MC_IGN..."
                        className="w-full bg-black border border-white/10 pl-16 pr-8 py-6 rounded-3xl text-xl font-black uppercase tracking-widest outline-none focus:border-indigo-500 focus:ring-4 ring-indigo-500/10 transition-all text-white"
                      />
                   </div>
                   <div className="flex gap-4">
                      <button onClick={() => setIsCheckoutOpen(false)} className="flex-1 py-6 rounded-3xl border border-white/10 font-black uppercase text-xs hover:bg-white/5 transition-all">Cancel</button>
                      <button onClick={handleFinalPurchase} className="flex-[2] bg-indigo-600 py-6 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 transition-all">Confirm Order</button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. ADMIN CONSOLE */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 40 }} className="fixed inset-y-0 right-0 w-full md:max-w-4xl bg-[#040408] border-l border-white/10 z-[6000] p-10 md:p-20 overflow-y-auto">
             <div className="flex justify-between items-center mb-20">
                <h2 className="text-4xl font-black italic uppercase text-red-500">Staff_Nexus</h2>
                <button onClick={() => setIsAdminOpen(false)} className="p-4 bg-white/5 rounded-2xl hover:bg-red-600 transition-all"><X/></button>
             </div>

             {!isAuthorized ? (
               <div className="flex flex-col items-center justify-center py-20 gap-10">
                  <Lock size={100} className="text-white/5 animate-pulse" />
                  <input 
                    type="password" 
                    value={passkeyInput}
                    onChange={(e) => { setPasskeyInput(e.target.value); if(e.target.value === ADMIN_KEY) setIsAuthorized(true); }}
                    placeholder="ADMIN_PASSKEY..."
                    className="w-full max-w-md bg-black border border-white/10 p-8 rounded-3xl text-center text-3xl font-black tracking-[0.5em] outline-none focus:border-red-500"
                  />
               </div>
             ) : (
               <div className="space-y-12">
                  <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-[3rem]">
                     <h4 className="text-2xl font-black uppercase italic text-red-500 mb-8 flex items-center gap-4"><AlertTriangle/> Emergency Directives</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <StaffAction icon={<Ban/>} label="Global Ban Player" onClick={() => triggerWebhook('STAFF', 'ADMIN COMMAND: GLOBAL_BAN EXECUTED')} />
                        <StaffAction icon={<VolumeX/>} label="Server Mute" onClick={() => triggerWebhook('STAFF', 'ADMIN COMMAND: GLOBAL_MUTE EXECUTED')} />
                        <StaffAction icon={<RefreshCcw/>} label="Node Restart" onClick={() => triggerWebhook('STAFF', 'ADMIN COMMAND: RESTART EXECUTED')} />
                        <StaffAction icon={<Shield/>} label="Toggle Whitelist" onClick={() => triggerWebhook('STAFF', 'ADMIN COMMAND: WHITELIST_TOGGLE')} />
                     </div>
                  </div>
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NOTIFICATIONS */}
      <div className="fixed bottom-24 md:bottom-10 right-10 z-[7000] space-y-4">
         <AnimatePresence>
            {notifications.map(n => (
              <motion.div key={n.id} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }} className={`p-6 rounded-2xl border-l-4 min-w-[320px] shadow-2xl backdrop-blur-3xl ${n.isError ? 'bg-red-500/10 border-red-500' : 'bg-indigo-500/10 border-indigo-500'}`}>
                 <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">{n.title}</p>
                 <p className="text-sm font-black uppercase">{n.msg}</p>
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

    </div>
  );
}

// ATOMIC COMPONENTS
function SideBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-6 p-4 rounded-2xl transition-all group relative ${active ? 'bg-indigo-600 text-white' : 'text-white/20 hover:bg-white/5 hover:text-white'}`}>
       <div className="shrink-0">{icon}</div>
       <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all absolute left-20 bg-black/90 border border-white/10 px-4 py-2 rounded-lg pointer-events-none">{label}</span>
    </button>
  );
}

function MobileNavIcon({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-4 rounded-2xl transition-all ${active ? 'bg-indigo-600 text-white' : 'text-white/20'}`}>
       {icon}
    </button>
  );
}

function StatItem({ icon, label, val }: any) {
  return (
    <div className="flex flex-col items-center md:items-start gap-1">
       <div className="flex items-center gap-2 text-indigo-400">
          {icon} <span className="text-[9px] font-black tracking-widest opacity-40">{label}</span>
       </div>
       <span className="text-3xl font-black italic tracking-tighter">{val}</span>
    </div>
  );
}

function TopPlayerCard({ rank, name, tag, kd, img, color }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} className={`bg-white/5 border ${color} p-10 rounded-[3rem] text-center relative overflow-hidden`}>
       <div className="absolute top-6 left-6 w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center font-black italic text-xl">{rank}</div>
       <img src={`https://mc-heads.net/avatar/${img}/100`} className="w-24 h-24 mx-auto rounded-3xl mb-8 border-2 border-white/10 shadow-2xl" />
       <h4 className="text-3xl font-black italic uppercase mb-2">{name}</h4>
       <p className="text-[10px] font-black text-indigo-500 tracking-[0.3em] uppercase mb-8">{tag}</p>
       <div className="grid grid-cols-2 border-t border-white/5 pt-8">
          <div><p className="text-[9px] opacity-30 font-black mb-1">RATING</p><p className="text-2xl font-black italic">{kd}</p></div>
          <div><p className="text-[9px] opacity-30 font-black mb-1">STREAK</p><p className="text-2xl font-black italic text-indigo-400">#1</p></div>
       </div>
    </motion.div>
  );
}

function StaffAction({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="bg-black border border-white/5 p-6 rounded-2xl flex items-center gap-5 hover:border-red-500/50 hover:bg-red-500/5 transition-all">
       <div className="text-red-500">{icon}</div>
       <span className="text-[10px] font-black uppercase text-white/70">{label}</span>
    </button>
  );
}
