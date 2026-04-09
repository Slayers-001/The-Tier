"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, ShoppingCart, Swords, ShieldCheck, 
  Users, Activity, Ghost, CheckCircle, User, X, 
  AlertTriangle, VolumeX, Ban, RefreshCcw, ExternalLink, 
  Ticket, Copy, Globe, Zap, Terminal, Shield
} from 'lucide-react';

/**
 * ============================================================
 * NORDEN_TIER_OS // OMNI_NEXUS_V4
 * OWNER: UTKARSH PANDEY
 * SERVER: play.mythichosting.fun:65102
 * ============================================================
 */

const SERVER_IP = "play.mythichosting.fun:65102";
const ADMIN_PASS = "PVP_PRO";
const DISCORD_TICKET_URL = "https://discord.gg/ZhCZU8ThSM";

const RANKS = [
  { 
    id: "mvp", 
    name: "MVP", 
    price: "₹499", 
    color: "text-blue-400", 
    glow: "shadow-blue-500/20",
    features: ["MVP Prefix", "Priority Entry", "White Chat"] 
  },
  { 
    id: "mvp_plus", 
    name: "MVP+", 
    price: "₹999", 
    color: "text-red-500", 
    glow: "shadow-red-500/20",
    features: ["Particle Aura", "Colored Nicks", "Hub Flight"] 
  },
  { 
    id: "mvp_plus_plus", 
    name: "MVP++", 
    price: "₹1999", 
    color: "text-yellow-500", 
    glow: "shadow-yellow-500/20",
    features: ["Private SMP", "Hex Nametags", "No Queues", "Mythic Crate"] 
  }
];

export default function NordenTierNexus() {
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [serverStats, setServerStats] = useState({ online: 0, status: 'OFFLINE', loading: true });
  
  // UI States
  const [selectedRank, setSelectedRank] = useState<any>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [playerIGN, setPlayerIGN] = useState("");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // 1. AUTOMATIC DATA SYNC (Leaderboard & Stats)
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await res.json();
        
        setServerStats({
          online: data.players?.online || 0,
          status: data.online ? 'ONLINE' : 'OFFLINE',
          loading: false
        });

        if (data.players?.list) {
          const formattedPlayers = data.players.list.map((name: string, index: number) => ({
            rank: index + 1,
            name: name,
            kd: (Math.random() * 4 + 1).toFixed(1), // Simulated K/D for visual appeal
            active: true
          }));
          setLeaderboard(formattedPlayers);
        }
      } catch (error) {
        console.error("Sync Error:", error);
      }
    };

    fetchServerData();
    const interval = setInterval(fetchServerData, 30000); // 30s Auto-Refresh
    return () => clearInterval(interval);
  }, []);

  const addNotification = (msg: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  // 2. DISCORD COMMUNICATION (For Admin & Shop)
  const relayToDiscord = async (type: 'SHOP' | 'STAFF', username: string, embed: any) => {
    try {
      const res = await fetch('/api/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, username, embed })
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  };

  const finalizePurchase = async () => {
    if (!playerIGN.trim()) return addNotification("Enter a valid IGN first.");
    
    const embed = {
      title: "🛒 RANK INTEREST REGISTERED",
      color: 0x6366f1,
      fields: [
        { name: "Minecraft IGN", value: `\`${playerIGN}\``, inline: true },
        { name: "Selected Rank", value: selectedRank.name, inline: true },
        { name: "Price Point", value: selectedRank.price, inline: true }
      ],
      timestamp: new Date().toISOString()
    };

    const success = await relayToDiscord('SHOP', playerIGN, embed);
    if (success) {
      setSelectedRank(null);
      setShowTicketModal(true); // Open the Ticket GUI
    }
  };

  const sendAdminDirective = async (action: string, color: number) => {
    const embed = {
      title: `🚨 STAFF DIRECTIVE: ${action}`,
      description: `A remote admin command has been triggered from the web nexus.`,
      color: color,
      timestamp: new Date().toISOString(),
      footer: { text: "Norden Administrative Protocol" }
    };

    const success = await relayToDiscord('STAFF', "ADMIN_CONSOLE", embed);
    if (success) addNotification(`Directive [${action}] sent to Discord.`);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-indigo-500/30">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b,transparent)] opacity-40 pointer-events-none z-0" />

      {/* SIDEBAR NAVIGATION */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-24 hover:w-64 transition-all duration-500 bg-black/40 backdrop-blur-3xl border-r border-white/5 z-[1000] flex-col py-12 group overflow-hidden">
        <div className="flex flex-col items-center gap-12 w-full px-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)]">
            <Ghost size={24} />
          </div>
          
          <div className="flex flex-col gap-6 w-full">
            <SidebarButton icon={<LayoutDashboard/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
            <SidebarButton icon={<ShoppingCart/>} label="MARKET" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
            <SidebarButton icon={<Swords/>} label="CLANS" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          </div>
        </div>

        <div className="mt-auto px-6">
          <SidebarButton icon={<ShieldCheck className="text-red-500"/>} label="ADMIN" active={false} onClick={() => setIsAdminOpen(true)} />
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-3xl border-t border-white/10 z-[1000] flex justify-around items-center px-4">
        <MobileIcon icon={<LayoutDashboard/>} active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
        <MobileIcon icon={<ShoppingCart/>} active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
        <MobileIcon icon={<Swords/>} active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
        <MobileIcon icon={<ShieldCheck className="text-red-500"/>} active={false} onClick={() => setIsAdminOpen(true)} />
      </nav>

      {/* CONTENT AREA */}
      <main className="md:ml-24 p-6 md:p-20 relative z-10 pb-32">
        
        {/* TOP HEADER */}
        <header className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-24">
          <div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
              NORDEN <span className="text-indigo-500">TIER</span>
            </h1>
            <div className="flex items-center gap-4 mt-6">
              <span className={`px-4 py-1 rounded-full text-[10px] font-black border tracking-widest ${serverStats.status === 'ONLINE' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                {serverStats.status}
              </span>
              <button 
                onClick={() => { navigator.clipboard.writeText(SERVER_IP); addNotification("IP COPIED"); }}
                className="text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase hover:text-white transition-colors flex items-center gap-2"
              >
                <Globe size={12}/> {SERVER_IP}
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl min-w-[220px] text-center shadow-2xl">
            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Active_Players</p>
            <p className="text-5xl font-black italic tracking-tighter text-indigo-400">{serverStats.online}</p>
          </div>
        </header>

        {/* PAGE CONTENT SWITCHER */}
        <AnimatePresence mode="wait">
          {activeMenu === 'DASHBOARD' && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
              <div className="bg-black/40 border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-inner">
                <h3 className="text-3xl font-black italic uppercase mb-12 flex items-center gap-4 text-indigo-500">
                  <Activity size={32}/> RANKING_PROTOCOL
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {leaderboard.length > 0 ? leaderboard.map((player) => (
                    <div key={player.name} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                      <div className="flex items-center gap-8">
                        <span className="text-2xl font-black italic text-white/10 w-8">#0{player.rank}</span>
                        <img src={`https://mc-heads.net/avatar/${player.name}/50`} alt="head" className="w-12 h-12 rounded-xl group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-xl font-black uppercase italic tracking-tighter">{player.name}</p>
                          <p className="text-[10px] font-black text-indigo-500/50 uppercase">{player.tag}</p>
                        </div>
                      </div>
                      <div className="text-right px-8">
                        <p className="text-[10px] font-black text-white/20 uppercase">Rating</p>
                        <p className="text-2xl font-black italic text-indigo-400">{player.kd}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="py-20 text-center opacity-20 uppercase font-black italic text-4xl tracking-tighter">
                      No Data in Sector
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          )}

          {activeMenu === 'MARKET' && (
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {RANKS.map(rank => (
                <div key={rank.id} className={`bg-[#050508] border border-white/10 p-12 rounded-[4rem] group hover:-translate-y-2 transition-all duration-500 shadow-2xl ${rank.glow}`}>
                  <h3 className={`text-5xl font-black italic uppercase mb-8 ${rank.color}`}>{rank.name}</h3>
                  <div className="space-y-4 mb-16">
                    {rank.features.map(feat => (
                      <div key={feat} className="flex items-center gap-3 text-[10px] font-black uppercase text-white/40 group-hover:text-white transition-colors">
                        <CheckCircle size={14} className={rank.color}/> {feat}
                      </div>
                    ))}
                  </div>
                  <div className="pt-8 border-t border-white/5">
                    <p className="text-4xl font-black italic mb-8 tracking-tighter">{rank.price}</p>
                    <button 
                      onClick={() => setSelectedRank(rank)}
                      className="w-full bg-white/5 border border-white/10 py-6 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                      Initialize_Purchase
                    </button>
                  </div>
                </div>
              ))}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* SHOP: IDENTITY VERIFICATION MODAL */}
      <AnimatePresence>
        {selectedRank && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#08080c] border border-white/10 p-12 md:p-16 rounded-[4rem] w-full max-w-xl shadow-[0_0_100px_rgba(79,70,229,0.2)]">
              <h2 className="text-4xl font-black italic uppercase mb-4">Identity_Check</h2>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-12">Required for {selectedRank.name} acquisition</p>
              
              <div className="relative group mb-10">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500" size={24} />
                <input 
                  autoFocus
                  value={playerIGN}
                  onChange={(e) => setPlayerIGN(e.target.value.toUpperCase())}
                  placeholder="MINECRAFT_IGN..."
                  className="w-full bg-black border border-white/10 pl-16 pr-8 py-7 rounded-3xl text-xl font-black uppercase outline-none focus:border-indigo-500 focus:ring-4 ring-indigo-500/10 transition-all text-white"
                />
              </div>

              <div className="flex gap-4">
                <button onClick={() => setSelectedRank(null)} className="flex-1 py-6 rounded-3xl border border-white/10 font-black uppercase text-xs">Cancel</button>
                <button onClick={finalizePurchase} className="flex-[2] bg-indigo-600 py-6 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-indigo-500 transition-all">Verify & Proceed</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SHOP: TICKET REDIRECT GUI */}
      <AnimatePresence>
        {showTicketModal && (
          <div className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-indigo-600 p-1 rounded-[4rem] w-full max-w-2xl shadow-[0_0_120px_rgba(79,70,229,0.5)]">
              <div className="bg-[#08080c] p-12 md:p-20 rounded-[3.8rem] text-center">
                <div className="w-24 h-24 bg-indigo-600/10 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-10 border border-indigo-500/20">
                  <Ticket size={40} />
                </div>
                <h2 className="text-5xl font-black italic uppercase mb-6 tracking-tighter">Action Required</h2>
                <p className="text-white/50 font-bold uppercase tracking-widest text-[10px] mb-12 leading-loose max-w-sm mx-auto">
                  Your interest in the rank has been logged. To finalize payment and claim your rewards, please open a support ticket in our HQ.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={DISCORD_TICKET_URL} target="_blank" className="flex-1 bg-white text-black py-7 rounded-3xl font-black uppercase flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                    Open Ticket <ExternalLink size={20}/>
                  </a>
                  <button onClick={() => setShowTicketModal(false)} className="flex-1 border border-white/10 py-7 rounded-3xl font-black uppercase text-white/30 hover:text-white transition-all">
                    Return to Nexus
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADMIN SYSTEM: STAFF CONSOLE */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:max-w-xl bg-[#030307] border-l border-white/10 z-[7000] p-12 overflow-y-auto backdrop-blur-3xl">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-4xl font-black italic uppercase text-red-500 tracking-tighter flex items-center gap-4">
                <Terminal/> Staff_Nexus
              </h2>
              <button onClick={() => { setIsAdminOpen(false); setIsAuthorized(false); }} className="p-4 bg-white/5 rounded-2xl hover:bg-red-500 transition-all"><X/></button>
            </div>

            {!isAuthorized ? (
              <div className="py-20 flex flex-col items-center">
                <Shield size={80} className="text-white/5 mb-10" />
                <input 
                  type="password" 
                  onChange={(e) => e.target.value === ADMIN_PASS && setIsAuthorized(true)}
                  placeholder="ACCESS_KEY" 
                  className="w-full bg-black border border-white/10 p-8 rounded-3xl text-center text-4xl font-black tracking-[0.5em] outline-none focus:border-red-500" 
                />
              </div>
            ) : (
              <div className="space-y-6">
                <AdminCommand color="text-red-500" icon={<Ban/>} label="Global Ban" onClick={() => sendAdminDirective("GLOBAL_BAN", 0xff0000)} />
                <AdminCommand color="text-orange-500" icon={<VolumeX/>} label="Server Mute" onClick={() => sendAdminDirective("GLOBAL_MUTE", 0xffa500)} />
                <AdminCommand color="text-indigo-500" icon={<RefreshCcw/>} label="Node Restart" onClick={() => sendAdminDirective("SERVER_RESTART", 0x6366f1)} />
                <AdminCommand color="text-green-500" icon={<Zap/>} label="Clear Lag" onClick={() => sendAdminDirective("CLEAR_LAG", 0x22c55e)} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST SYSTEM */}
      <div className="fixed bottom-24 md:bottom-10 right-10 flex flex-col gap-4 z-[9999]">
        {notifications.map(n => (
          <motion.div key={n.id} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="bg-indigo-600 px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-indigo-600/30">
            {n.msg}
          </motion.div>
        ))}
      </div>

    </div>
  );
}

/**
 * SUB-COMPONENTS
 */

function SidebarButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-6 p-4 rounded-2xl transition-all group relative ${active ? 'bg-indigo-600 text-white' : 'text-white/20 hover:bg-white/5 hover:text-white'}`}>
      <div className="shrink-0">{icon}</div>
      <span className="absolute left-20 bg-black/90 border border-white/10 px-4 py-2 rounded-lg text-[10px] font-black tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[2000]">{label}</span>
    </button>
  );
}

function MobileIcon({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-4 rounded-2xl transition-all ${active ? 'bg-indigo-600 text-white' : 'text-white/20'}`}>
      {icon}
    </button>
  );
}

function AdminCommand({ label, icon, color, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:bg-white/10 transition-all ${color}`}>
      <span className="text-xl font-black uppercase italic">{label}</span>
      <div className="p-4 bg-black/50 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
    </button>
  );
}
