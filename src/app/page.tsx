"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, Trophy, Zap, LayoutDashboard, ShieldCheck, Swords, 
  Terminal, Radio, ShoppingCart, X, Trash2, RefreshCcw, Gavel, 
  Shield, VolumeX, Star, Power, CheckCircle2, Flame, Users, Activity, Lock, Cpu,
  Target, Globe, Box, MousePointer2, Zap as Bolt, FlameKindling
} from 'lucide-react';

/**
 * ============================================================
 * NORDEN_NEXUS_OS // VERSION 40.0.0 (SUPREME_EDITION)
 * ARCHITECT: UTKARSH PANDEY
 * PROTOCOL: ZERO_REMOVAL_MAX_AESTHETIC
 * WEBHOOK: ADMIN_RELAY_V2 (HARDCODED)
 * ============================================================
 */

const PASSKEY = "PVP_PROPLE";
const ADMIN_WEBHOOK = "https://discord.com/api/webhooks/1487157795169243236/7KlEaV40W3BPxlU0K276i8VO6gu5mk9Hu-hdmEBplKDSmagLIvuxDfMnhK8THr3FmdhV";

const DB = {
  LEADERBOARD: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 125000, kills: "15,400" },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 112000, kills: "12,000" },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 98000, kills: "9,800" },
    { rank: "04", name: "PVP_GOD", tag: "DIAMOND_V", kd: "7.2", img: "https://mc-heads.net/avatar/Steve/100", xp: 85000, kills: "7,200" },
    { rank: "05", name: "NEXUS_X", tag: "PLATINUM_I", kd: "6.5", img: "https://mc-heads.net/avatar/Alex/100", xp: 72000, kills: "6,500" },
    { rank: "06", name: "DRAGON_H", tag: "GOLD_III", kd: "5.9", img: "https://mc-heads.net/avatar/Dragon/100", xp: 64000, kills: "5,900" },
    { rank: "07", name: "VENOM_01", tag: "SILVER_I", kd: "4.8", img: "https://mc-heads.net/avatar/Venom/100", xp: 51000, kills: "4,800" },
    { rank: "08", name: "STORM", tag: "BRONZE_IV", kd: "3.2", img: "https://mc-heads.net/avatar/Storm/100", xp: 32000, kills: "3,200" },
  ],
  CLANS: [
    { name: "GLACIERZ", leader: "UTKARSH", members: 42, power: "98%", color: "text-cyan-400" },
    { name: "DEMON_SQUAD", leader: "SATYARTH", members: 28, power: "85%", color: "text-red-500" },
    { name: "BLISS_LEGION", leader: "SHIVAM", members: 35, power: "91%", color: "text-fuchsia-500" },
  ]
};

export default function NordenNexusV40() {
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [query, setQuery] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [maint, setMaint] = useState(false);
  const [logs, setLogs] = useState<string[]>(["[KERNEL] BOOT_V40", "[WEBHOOK] RELAY_ACTIVE"]);

  const relayToDiscord = async (title: string, desc: string, color: number = 0x00FFFF) => {
    try {
      await fetch(ADMIN_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{ title: `🔥 NORDEN_NEXUS | ${title}`, description: desc, color: color, timestamp: new Date().toISOString() }]
        })
      });
      setLogs(p => [`[RELAY] ${title}_SENT`, ...p].slice(0, 30));
    } catch (e) { console.error("RELAY_FAILED"); }
  };

  const filtered = useMemo(() => DB.LEADERBOARD.filter(p => p.name.includes(query.toUpperCase())), [query]);

  return (
    <div className="min-h-screen bg-[#010103] text-white font-sans overflow-hidden flex">
      
      {/* 🌌 RAINBOW GLASSMORPHISM ENGINE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse transition-all duration-[5s]"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* 🚀 SIDEBAR (FULLY RESTORED) */}
      <aside className="w-24 hover:w-80 transition-all duration-700 border-r border-white/5 bg-black/80 backdrop-blur-3xl flex flex-col items-center py-10 z-[100] group">
        <div className="mb-20 cursor-pointer" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-400 via-blue-600 to-fuchsia-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)] group-hover:rotate-180 transition-all duration-1000">
            <Flame size={32} fill="white" />
          </div>
        </div>
        <nav className="flex flex-col gap-8 w-full px-6 flex-1">
          <NavItem icon={<LayoutDashboard/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <NavItem icon={<ShoppingCart/>} label="MARKETPLACE" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <NavItem icon={<Swords/>} label="WAR_ROOM" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <NavItem icon={<Terminal/>} label="KERNEL_LOGS" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
          <div className="h-px bg-white/5 my-4 mx-4" />
          <NavItem icon={<ShieldCheck className={isAuth ? "text-green-400" : "text-red-500"}/>} label="GOD_MODE" onClick={() => setIsAdminOpen(true)} />
        </nav>
      </aside>

      {/* 🖥️ MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative z-10">
        
        {/* 🛰️ SUPREME HEADER */}
        <header className="px-16 py-12 flex justify-between items-center sticky top-0 bg-[#010103]/90 backdrop-blur-3xl z-[90] border-b border-white/5">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-7xl font-black italic uppercase tracking-tighter leading-none">NORDEN<span className="text-cyan-400">MC</span></h1>
            <div className="flex items-center gap-4 mt-4">
              <div className={`w-3 h-3 rounded-full ${maint ? 'bg-red-500 shadow-[0_0_15px_red]' : 'bg-green-500 shadow-[0_0_15px_lime] animate-pulse'}`}></div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.6em]">PLAY.NORDENMC.COM // V40_OS</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-10">
             <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="DATABASE_QUERY..." className="bg-white/5 border border-white/10 rounded-full pl-14 pr-8 py-5 text-xs outline-none w-[450px] focus:border-cyan-500/50 font-bold uppercase tracking-widest" />
             </div>
             <button className="bg-white text-black font-black px-12 py-5 rounded-full uppercase text-xs hover:bg-cyan-400 transition-all">CONNECT</button>
          </div>
        </header>

        <div className="p-16 max-w-[2000px] mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD + 3D PODIUM */}
            {activeMenu === 'DASHBOARD' && (
              <motion.div key="dash" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="space-y-24">
                
                {/* THE PODIUM */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {filtered.slice(0, 3).map((p, i) => (
                    <div key={p.name} className={`bg-gradient-to-b ${i===0?'from-cyan-500/20 border-cyan-500/50 shadow-cyan-500/10':'from-white/5 border-white/10'} to-transparent border p-16 rounded-[6rem] text-center relative group`}>
                       <Trophy className="absolute -top-10 -right-10 text-white/5 group-hover:text-cyan-400/10 transition-colors" size={300}/>
                       <img src={p.img} className="w-56 h-56 mx-auto rounded-[4.5rem] mb-10 border-4 border-white/10 shadow-3xl group-hover:border-cyan-400 transition-all" />
                       <h3 className="text-7xl font-black italic uppercase tracking-tighter">{p.name}</h3>
                       <p className="text-cyan-400 font-black tracking-[0.5em] uppercase text-[10px] mt-6 italic">{p.tag}</p>
                       <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 gap-8">
                          <div><p className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2">K/D</p><p className="text-6xl font-black italic">{p.kd}</p></div>
                          <div><p className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2">XP</p><p className="text-6xl font-black italic text-cyan-400">{Math.floor(p.xp/1000)}K</p></div>
                       </div>
                    </div>
                  ))}
                </div>

                {/* THE LIST VIEW (ZERO REMOVAL) */}
                <div className="space-y-8">
                   {filtered.map(p => (
                     <div key={p.name} className="bg-white/5 border border-white/5 p-10 rounded-[3.5rem] flex items-center justify-between hover:border-cyan-500/30 transition-all cursor-pointer group">
                        <div className="flex items-center gap-16">
                           <span className="text-7xl font-black italic text-white/5 w-24 text-center">{p.rank}</span>
                           <img src={p.img} className="w-24 h-24 rounded-[2rem] border-2 border-white/10 group-hover:scale-110 transition-transform" />
                           <div>
                              <h4 className="text-5xl font-black italic uppercase group-hover:text-cyan-400 transition-colors">{p.name}</h4>
                              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mt-3">{p.tag} // {p.kills} KILLS</p>
                           </div>
                        </div>
                        <p className="text-7xl font-black italic text-white/40 group-hover:text-white transition-colors mr-10">{p.kd}</p>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {/* 2. MARKETPLACE */}
            {activeMenu === 'MARKET' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <MarketCard name="VIP" price="5,000 XP" color="text-green-400" icon={<Zap/>} onBuy={() => relayToDiscord("MARKET_REQ", "Utkarsh clicked VIP Rank purchase.", 0x00FF00)} />
                <MarketCard name="ELITE" price="15,000 XP" color="text-cyan-400" icon={<Star/>} onBuy={() => relayToDiscord("MARKET_REQ", "Utkarsh clicked ELITE Rank purchase.", 0x00FFFF)} />
                <MarketCard name="OMEGA" price="₹500" color="text-fuchsia-400" icon={<Shield/>} onBuy={() => relayToDiscord("MARKET_REQ", "Utkarsh clicked OMEGA Rank purchase.", 0xFF00FF)} />
                <MarketCard name="LEGEND" price="₹1,500" color="text-yellow-400" icon={<Crown/>} onBuy={() => relayToDiscord("MARKET_REQ", "Utkarsh clicked LEGEND Rank purchase.", 0xFFFF00)} />
              </motion.div>
            )}

            {/* 3. WAR ROOM (CLANS) */}
            {activeMenu === 'CLANS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                 <div className="bg-gradient-to-r from-indigo-950 via-cyan-900 to-indigo-950 p-20 rounded-[5rem] flex justify-between items-center shadow-3xl">
                    <div>
                       <h2 className="text-9xl font-black italic uppercase tracking-tighter">FACTIONS</h2>
                       <p className="text-white/40 font-black uppercase tracking-[0.6em] mt-6 italic text-lg">Empire Control & Territory Power.</p>
                    </div>
                    <button className="bg-white text-black font-black px-16 py-8 rounded-full uppercase text-xl hover:bg-cyan-400 transition-all shadow-3xl">ESTABLISH_CLAN</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {DB.CLANS.map(c => (
                      <div key={c.name} className="bg-black/60 border border-white/10 p-16 rounded-[5rem] hover:border-cyan-500/50 transition-all shadow-2xl group">
                         <h3 className={`text-6xl font-black italic uppercase ${c.color} mb-12`}>{c.name}</h3>
                         <div className="space-y-4 mb-12">
                            <ClanRow label="LEADER" val={c.leader} />
                            <ClanRow label="TROOPS" val={c.members.toString()} />
                            <ClanRow label="POWER" val={c.power} />
                         </div>
                         <button className="w-full py-10 bg-white/5 border border-white/10 rounded-[4rem] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">DEPLOY_TROOPS</button>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {/* 4. KERNEL LOGS */}
            {activeMenu === 'LOGS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-black/90 border border-white/10 rounded-[5rem] p-16 h-[800px] flex flex-col shadow-inner">
                 <h3 className="text-4xl font-black uppercase text-cyan-400 flex items-center gap-8 mb-12"><Terminal size={40}/> KERNEL_STREAMS</h3>
                 <div className="flex-1 overflow-y-auto font-mono text-sm space-y-6 pr-10 custom-scrollbar text-white/30 uppercase tracking-widest">
                    {logs.map((l, i) => (
                      <p key={i} className="border-l-2 border-white/5 pl-8"><span className="text-cyan-500/50 font-black mr-8">>>></span> {l}</p>
                    ))}
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* 🔐 GOD-MODE PANEL (ADMIN OVERRIDE) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 1200 }} animate={{ x: 0 }} exit={{ x: 1200 }} className="fixed inset-y-0 right-0 w-[950px] bg-[#020205]/98 border-l border-white/10 z-[1000] p-24 shadow-[-100px_0_300px_rgba(0,0,0,1)] backdrop-blur-3xl overflow-y-auto">
             <div className="flex justify-between items-center mb-24">
                <h2 className="text-7xl font-black italic uppercase text-cyan-400 flex items-center gap-10"><Gavel size={70}/> GOD_MODE</h2>
                <button onClick={() => setIsAdminOpen(false)} className="text-white/10 hover:text-red-500"><X size={70}/></button>
             </div>

             {!isAuth ? (
               <div className="py-40 flex flex-col items-center">
                  <Lock size={150} className="text-red-500 mb-16 animate-pulse" />
                  <input type="password" onKeyDown={e => e.key === 'Enter' && ((e.target as any).value === PASSKEY ? setIsAuth(true) : alert("INVALID"))} placeholder="ENTER_LEGION_KEY..." className="w-full bg-white/5 border border-white/10 p-14 rounded-[5rem] text-center text-7xl font-black tracking-widest outline-none mb-16 uppercase" />
                  <button onClick={() => setIsAuth(true)} className="w-full bg-white text-black py-12 rounded-[5rem] font-black text-3xl uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-3xl">AUTHENTICATE</button>
               </div>
             ) : (
               <div className="space-y-24">
                  <div className="grid grid-cols-2 gap-12">
                     <AdminBtn icon={<Trash2/>} label="Clear All Logs" onClick={() => setLogs(["[SYSTEM] KERNEL_PURGED"])} />
                     <AdminBtn icon={<RefreshCcw/>} label="Flush Network" onClick={() => relayToDiscord("NET_FLUSH", "Admin flushed buffers.", 0xFF0000)} />
                     <AdminBtn icon={<CheckCircle2/>} label="Test Relay" onClick={() => relayToDiscord("RELAY_TEST", "Direct hardcoded link stable.", 0x00FF00)} />
                     <AdminBtn icon={<Power/>} label="Maint. Mode" active={maint} onClick={() => setMaint(!maint)} />
                  </div>
                  <div className="bg-white/5 p-16 rounded-[6rem] border border-white/10">
                     <h4 className="text-4xl font-black uppercase mb-10 text-cyan-400 flex items-center gap-8"><Radio size={40}/> DISCORD_BRIDGE</h4>
                     <p className="font-mono text-[11px] text-white/20 break-all bg-black/50 p-8 rounded-3xl border border-white/5 leading-relaxed">{ADMIN_WEBHOOK}</p>
                     <div className="mt-10 flex items-center gap-6 text-green-500">
                        <Cpu className="animate-spin-slow" size={24}/>
                        <span className="font-black uppercase text-xs tracking-[0.5em]">HARDCODED_LINK_ACTIVE</span>
                     </div>
                  </div>
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- SUB-COMPONENTS (FULLY HARDCODED) ---

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-12 w-full py-7 px-8 rounded-[2.5rem] transition-all duration-500 group ${active ? 'bg-cyan-500/10 text-cyan-400 shadow-inner' : 'text-white/15 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'scale-125' : 'scale-100'} transition-transform`}>{icon}</div>
      <span className="text-[16px] font-black tracking-[0.6em] hidden group-hover:block uppercase italic">{label}</span>
    </button>
  );
}

function MarketCard({ name, price, color, icon, onBuy }: any) {
  return (
    <div className="bg-black/60 border border-white/10 p-16 rounded-[6rem] text-center hover:border-cyan-400 transition-all flex flex-col h-full shadow-3xl">
       <div className={`w-24 h-24 mx-auto mb-10 rounded-[3rem] bg-white/5 flex items-center justify-center ${color} shadow-inner`}>{icon}</div>
       <h3 className={`text-6xl font-black italic uppercase mb-8 ${color} tracking-tighter`}>{name}</h3>
       <div className="flex-1 text-white/20 text-[12px] font-black uppercase tracking-widest px-6 mb-12 italic">Premium identity access and network priority status.</div>
       <div className="pt-10 border-t border-white/5">
          <p className="text-5xl font-black italic mb-10">{price}</p>
          <button onClick={onBuy} className="w-full py-10 bg-white text-black font-black rounded-[4rem] uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-2xl text-lg">ACQUIRE</button>
       </div>
    </div>
  );
}

function ClanRow({ label, val }: { label: string, val: string }) {
  return (
    <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/5">
       <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{label}</span>
       <span className="text-lg font-black italic uppercase text-white/80">{val}</span>
    </div>
  );
}

function AdminBtn({ icon, label, onClick, active }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center gap-10 p-16 rounded-[6rem] border transition-all ${active ? 'bg-red-500 border-red-400 text-white shadow-xl' : 'bg-white/5 border-white/10 text-white/30 hover:border-cyan-500/50 hover:text-white'}`}>
      {icon}
      <span className="text-[16px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
