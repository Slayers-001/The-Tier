"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, Trophy, Zap, LayoutDashboard, ShieldCheck, Swords, 
  Terminal, Radio, ShoppingCart, X, Trash2, RefreshCcw, Gavel, 
  Shield, VolumeX, Star, Power, CheckCircle2, Flame, Users, Activity, Lock, Cpu
} from 'lucide-react';

/**
 * ============================================================
 * NORDEN_NEXUS_OS // VERSION 35.0.0 (ULTIMA)
 * DEVELOPER: UTKARSH PANDEY
 * AUTH_KEY: PVP_PROPLE
 * WEBHOOK: HARDCODED_ADMIN_RELAY (ACTIVE)
 * ============================================================
 */

const PASSKEY = "PVP_PROPLE";
const SERVER_IP = "PLAY.NORDENMC.COM";
const ADMIN_WEBHOOK = "https://discord.com/api/webhooks/1487157795169243236/7KlEaV40W3BPxlU0K276i8VO6gu5mk9Hu-hdmEBplKDSmagLIvuxDfMnhK8THr3FmdhV";

// --- THE HARDCODED GLOBAL DATABASE ---
const DB = {
  LEADERBOARD: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 125000, kills: "15,400", deaths: "1,241" },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 112000, kills: "12,000", deaths: "1,081" },
    { rank: "03", name: "SHIVAM", tag: "MASTER_DUELIST #3", kd: "9.8", img: "https://mc-heads.net/avatar/Shivam/100", xp: 98000, kills: "9,800", deaths: "1,000" },
    { rank: "04", name: "PVP_GOD", tag: "DIAMOND_V", kd: "7.2", img: "https://mc-heads.net/avatar/Steve/100", xp: 85000, kills: "7,200", deaths: "1,000" },
    { rank: "05", name: "NEXUS_X", tag: "PLATINUM_I", kd: "6.5", img: "https://mc-heads.net/avatar/Alex/100", xp: 72000, kills: "6,500", deaths: "1,000" },
    { rank: "06", name: "DRAGON_H", tag: "GOLD_III", kd: "5.9", img: "https://mc-heads.net/avatar/Dragon/100", xp: 64000, kills: "5,900", deaths: "1,000" },
    { rank: "07", name: "ACE_KILLER", tag: "SILVER_IV", kd: "4.1", img: "https://mc-heads.net/avatar/Ace/100", xp: 52000, kills: "4,100", deaths: "1,000" },
    { rank: "08", name: "VOID_WALKER", tag: "BRONZE_I", kd: "3.5", img: "https://mc-heads.net/avatar/Void/100", xp: 41000, kills: "3,500", deaths: "1,000" },
  ],
  CLANS: [
    { name: "GLACIERZ", leader: "UTKARSH", members: 42, power: "98%", color: "text-cyan-400" },
    { name: "DEMON_SQUAD", leader: "SATYARTH", members: 28, power: "85%", color: "text-red-500" },
    { name: "BLISS_LEGION", leader: "SHIVAM", members: 35, power: "91%", color: "text-fuchsia-500" },
  ]
};

export default function NordenNexusV35() {
  const [menu, setMenu] = useState('DASHBOARD');
  const [query, setQuery] = useState('');
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] BOOT_OS_V35", "[DEP] FRAMER_MOTION_LOADED", "[RELAY] WEBHOOK_READY", "[AUTH] DEVELOPER_UTKARSH_CONNECTED"
  ]);
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [maint, setMaint] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // --- 📡 DISCORD WEBHOOK RELAY ENGINE ---
  const pushToDiscord = async (title: string, desc: string, color: number = 0x00FFFF) => {
    try {
      await fetch(ADMIN_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: `🛡️ NORDEN_NEXUS | ${title}`,
            description: desc,
            color: color,
            footer: { text: "Norden OS v35.0.0 | Developer: Utkarsh Pandey" },
            timestamp: new Date().toISOString(),
            thumbnail: { url: "https://mc-heads.net/avatar/Utkarsh/100" }
          }]
        })
      });
      addLog(`RELAY_SUCCESS: ${title}`);
    } catch (e) {
      addLog("RELAY_CRITICAL_ERROR");
    }
  };

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 50));
  };

  const buyRank = (rank: string) => {
    setLoadingAction(rank);
    addLog(`INIT_PURCHASE: ${rank}`);
    setTimeout(() => {
      setLoadingAction(null);
      pushToDiscord("MARKET_EVENT", `**Utkarsh** is requesting access to **${rank}** Rank.`, 0x00FF00);
      alert(`TRANSACTION_PENDING: Admin has been notified of your ${rank} request.`);
    }, 1200);
  };

  const runAdminCmd = (cmd: string) => {
    addLog(`GOD_MODE_EXEC: ${cmd}`);
    pushToDiscord("SECURITY_ALERT", `God-Mode Power Triggered: **${cmd}**\nExecuted by User: Utkarsh`, 0xFF0000);
    if (cmd === "CLEAR") setLogs(["[SYSTEM] KERNEL_PURGED"]);
    if (cmd === "MAINT") setMaint(!maint);
  };

  const filteredList = useMemo(() => {
    return DB.LEADERBOARD.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="min-h-screen bg-[#010103] text-white font-sans overflow-hidden flex selection:bg-cyan-500">
      
      {/* 🌌 VISUAL ENGINE: BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.18)_0%,_transparent_50%)]"></div>
        <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-cyan-600/5 blur-[160px] rounded-full animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* 🚀 SIDEBAR: NAVIGATION */}
      <aside className="w-24 hover:w-80 transition-all duration-700 border-r border-white/5 bg-black/60 backdrop-blur-3xl flex flex-col items-center py-12 z-[100] group shadow-2xl">
        <div className="mb-24 cursor-pointer" onClick={() => setMenu('DASHBOARD')}>
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] group-hover:rotate-180 transition-all duration-1000">
            <Flame size={32} className="text-white fill-white" />
          </div>
        </div>
        <nav className="flex flex-col gap-10 w-full px-7 flex-1">
          <SideBtn icon={<LayoutDashboard/>} label="DASHBOARD" active={menu === 'DASHBOARD'} onClick={() => setMenu('DASHBOARD')} />
          <SideBtn icon={<ShoppingCart/>} label="MARKETPLACE" active={menu === 'MARKET'} onClick={() => setMenu('MARKET')} />
          <SideBtn icon={<Swords/>} label="WAR_ROOM" active={menu === 'CLANS'} onClick={() => setMenu('CLANS')} />
          <SideBtn icon={<Terminal/>} label="KERNEL_LOGS" active={menu === 'LOGS'} onClick={() => setMenu('LOGS')} />
          <div className="h-px bg-white/5 my-8 mx-4" />
          <SideBtn icon={<ShieldCheck className={isAuth ? "text-green-400" : "text-red-500"}/>} label="GOD_MODE" active={menu === 'ADMIN'} onClick={() => setIsAdminOpen(true)} />
        </nav>
      </aside>

      {/* 🖥️ VIEWPORT: CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative z-10">
        
        {/* 🛰️ STICKY HEADER */}
        <header className="px-20 py-20 flex justify-between items-center sticky top-0 bg-[#010103]/90 backdrop-blur-3xl z-[90] border-b border-white/5">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-8xl font-black italic uppercase tracking-tighter leading-none select-none">NORDEN<span className="text-cyan-400">MC</span></h1>
            <div className="flex items-center gap-6 mt-6">
               <div className={`w-3 h-3 rounded-full ${maint ? 'bg-red-500 shadow-[0_0_15px_red]' : 'bg-green-500 shadow-[0_0_15px_lime] animate-pulse'}`}></div>
               <p className="text-[12px] font-black text-white/30 uppercase tracking-[0.7em]">{SERVER_IP} // FINAL_V35</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-12">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={24} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="DATABASE_SCAN..." className="bg-white/5 border border-white/10 rounded-full pl-16 pr-8 py-7 text-sm outline-none w-[550px] focus:border-cyan-500/50 transition-all font-bold tracking-widest uppercase" />
            </div>
            <button className="bg-white text-black font-black px-16 py-7 rounded-full uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all shadow-2xl active:scale-95 text-sm">PLAY</button>
          </div>
        </header>

        <div className="p-24 max-w-[2100px] mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* 📊 1. DASHBOARD: THE TOP PODIUM & LIST */}
            {menu === 'DASHBOARD' && (
              <motion.div key="dash" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-32">
                
                {/* 3D STYLE PODIUM */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                  {filteredList.slice(0, 3).map((p, i) => (
                    <motion.div whileHover={{ y: -25 }} key={p.name} className={`bg-gradient-to-b ${i===0?'from-cyan-500/25 border-cyan-500/50 shadow-cyan-500/10':'from-white/5 border-white/10'} to-transparent border p-20 rounded-[7rem] text-center shadow-3xl relative group`}>
                       <div className="absolute -top-10 -right-10 text-white/5 group-hover:text-cyan-500/10 transition-colors"><Trophy size={350}/></div>
                       <img src={p.img} className="w-60 h-60 mx-auto rounded-[5rem] mb-14 border-4 border-white/10 group-hover:border-cyan-400 shadow-3xl transition-all" />
                       <h3 className="text-7xl font-black italic uppercase tracking-tighter">{p.name}</h3>
                       <p className="text-cyan-400 font-black tracking-[0.8em] uppercase text-xs mt-8 italic">{p.tag}</p>
                       <div className="mt-20 pt-16 border-t border-white/5 grid grid-cols-2 gap-12">
                          <div><p className="text-[11px] text-white/20 uppercase font-black tracking-widest mb-4">K/D RATIO</p><p className="text-7xl font-black italic">{p.kd}</p></div>
                          <div><p className="text-[11px] text-white/20 uppercase font-black tracking-widest mb-4">LEGACY XP</p><p className="text-7xl font-black italic text-cyan-400">{Math.floor(p.xp/1000)}K</p></div>
                       </div>
                    </motion.div>
                  ))}
                </div>

                {/* THE FULL LIST VIEW */}
                <div className="space-y-10 pb-20">
                  {filteredList.map((p) => (
                    <motion.div whileHover={{ x: 15 }} key={p.name} className="bg-white/5 border border-white/5 p-14 rounded-[4.5rem] flex items-center justify-between hover:border-cyan-500/40 transition-all cursor-pointer group">
                       <div className="flex items-center gap-20">
                          <span className="text-8xl font-black italic text-white/5 w-24 text-center">{p.rank}</span>
                          <img src={p.img} className="w-28 h-28 rounded-[2.5rem] border-2 border-white/10" />
                          <div>
                             <h4 className="text-5xl font-black italic uppercase group-hover:text-cyan-400 transition-colors">{p.name}</h4>
                             <p className="text-[12px] font-black text-white/20 uppercase tracking-[0.6em] mt-4">{p.tag} // {p.kills} KILLS</p>
                          </div>
                       </div>
                       <div className="mr-16 text-right">
                          <p className="text-7xl font-black italic text-white/40 group-hover:text-white transition-colors">{p.kd}</p>
                       </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 🛒 2. MARKETPLACE: HARDCODED CARDS */}
            {menu === 'MARKET' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-4 gap-16">
                <ShopItem name="VIP_RANK" price="5000 XP" color="text-green-400" icon={<Zap/>} onBuy={() => buyRank("VIP")} loading={loadingAction === "VIP"} />
                <ShopItem name="ELITE_RANK" price="15000 XP" color="text-cyan-400" icon={<Star/>} onBuy={() => buyRank("ELITE")} loading={loadingAction === "ELITE"} />
                <ShopItem name="OMEGA_RANK" price="₹500" color="text-fuchsia-400" icon={<Shield/>} onBuy={() => buyRank("OMEGA")} loading={loadingAction === "OMEGA"} />
                <ShopItem name="LEGEND_RANK" price="₹1500" color="text-yellow-400" icon={<Crown/>} onBuy={() => buyRank("LEGEND")} loading={loadingAction === "LEGEND"} />
              </motion.div>
            )}

            {/* ⚔️ 3. WAR ROOM: FACTION DATABASE */}
            {menu === 'CLANS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24">
                 <div className="bg-gradient-to-r from-indigo-950 via-cyan-900 to-indigo-950 p-24 rounded-[7rem] flex justify-between items-center shadow-3xl relative overflow-hidden group">
                    <div className="z-10">
                       <h2 className="text-9xl font-black italic uppercase tracking-tighter">FACTIONS</h2>
                       <p className="text-white/50 font-black uppercase tracking-[0.6em] mt-8 text-xl italic">Territory Control & Network Alliances.</p>
                    </div>
                    <button className="z-10 bg-white text-black font-black px-24 py-10 rounded-full uppercase text-2xl hover:bg-cyan-400 transition-all">ESTABLISH</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {DB.CLANS.map(c => (
                      <div key={c.name} className="bg-black/60 border border-white/10 p-20 rounded-[6rem] hover:border-cyan-500/50 transition-all shadow-2xl group">
                         <h3 className={`text-7xl font-black italic uppercase ${c.color} leading-tight mb-16`}>{c.name}</h3>
                         <div className="space-y-6 mb-16">
                            <ClanRow label="LEADER" val={c.leader} />
                            <ClanRow label="TROOPS" val={c.members.toString()} />
                            <ClanRow label="DOMINANCE" val={c.power} />
                         </div>
                         <button className="w-full py-10 bg-white/5 border border-white/10 rounded-[4rem] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">DEPLOY</button>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {/* 📟 4. KERNEL LOGS: SYSTEM STREAMS */}
            {menu === 'LOGS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-black/90 border border-white/10 rounded-[6rem] p-24 h-[850px] flex flex-col shadow-inner">
                 <h3 className="text-5xl font-black uppercase text-cyan-400 flex items-center gap-10 mb-16"><Terminal size={50}/> KERNEL_LOGS</h3>
                 <div className="flex-1 overflow-y-auto font-mono text-sm space-y-8 pr-12 custom-scrollbar">
                    {logs.map((l, i) => (
                      <p key={i} className="text-white/30 uppercase tracking-[0.1em] border-l-2 border-white/5 pl-10"><span className="text-cyan-500/50 mr-12 font-black">STUB_0x{i}</span> {l}</p>
                    ))}
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* 🔐 GOD-MODE OVERLAY: ADMIN PANEL */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 1200 }} animate={{ x: 0 }} exit={{ x: 1200 }} className="fixed inset-y-0 right-0 w-[950px] bg-[#020205]/98 border-l border-white/10 z-[1000] p-28 shadow-[-100px_0_250px_rgba(0,0,0,1)] backdrop-blur-3xl overflow-y-auto">
             <div className="flex justify-between items-center mb-32">
                <h2 className="text-8xl font-black italic uppercase text-cyan-400 flex items-center gap-12"><Gavel size={80}/> GOD_MODE</h2>
                <button onClick={() => setIsAdminOpen(false)} className="text-white/10 hover:text-red-500"><X size={80}/></button>
             </div>

             {!isAuth ? (
               <div className="py-56 flex flex-col items-center">
                  <Lock size={150} className="text-red-500 mb-20 animate-pulse" />
                  <input type="password" value={passInput} onChange={(e) => setPassInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (passInput === PASSKEY ? setIsAuth(true) : alert("INVALID"))} placeholder="ENTER_LEGION_KEY..." className="w-full bg-white/5 border border-white/10 p-16 rounded-[6rem] text-center text-7xl font-black tracking-widest outline-none mb-20 uppercase" />
                  <button onClick={() => passInput === PASSKEY ? setIsAuth(true) : alert("INVALID")} className="w-full bg-white text-black py-16 rounded-[6rem] font-black text-4xl uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-3xl">AUTHORIZE</button>
               </div>
             ) : (
               <div className="space-y-28">
                  <div className="grid grid-cols-2 gap-16">
                     <AdminActionBtn icon={<Trash2/>} label="Clear Stream" onClick={() => runAdminCmd("CLEAR")} />
                     <AdminActionBtn icon={<VolumeX/>} label="Global Mute" onClick={() => runAdminCmd("GLOBAL_MUTE")} />
                     <AdminActionBtn icon={<RefreshCcw/>} label="Flush Network" onClick={() => runAdminCmd("NETWORK_FLUSH")} />
                     <AdminActionBtn icon={<CheckCircle2/>} label="Test Webhook" onClick={() => pushToDiscord("SYSTEM_TEST", "Direct hardcoded relay to NordenMC Admin Channel confirmed.")} />
                     <AdminActionBtn icon={<Power/>} label="Maint. Mode" active={maint} onClick={() => runAdminCmd("MAINT")} />
                     <AdminActionBtn icon={<Users/>} label="Sync Database" onClick={() => addLog("DB_SYNC_COMPLETE")} />
                  </div>
                  <div className="bg-white/5 p-20 rounded-[7rem] border border-white/10">
                     <h4 className="text-4xl font-black uppercase mb-12 text-cyan-400 flex items-center gap-8"><Radio size={40}/> DISCORD_BRIDGE</h4>
                     <p className="font-mono text-[12px] text-white/20 break-all bg-black/50 p-10 rounded-3xl border border-white/5 leading-relaxed">{ADMIN_WEBHOOK}</p>
                     <div className="mt-12 flex items-center gap-6 text-green-500">
                        <Cpu className="animate-spin-slow" size={24}/>
                        <span className="font-black uppercase text-sm tracking-[0.5em]">HARDCODED_LINK_STABLE</span>
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

// --- DENSED SUB-COMPONENTS ---

function SideBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-14 w-full py-8 px-10 rounded-[3rem] transition-all duration-500 group ${active ? 'bg-cyan-500/10 text-cyan-400 shadow-inner' : 'text-white/15 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'scale-150' : 'scale-100'} transition-transform`}>{icon}</div>
      <span className="text-[18px] font-black tracking-[0.6em] hidden group-hover:block uppercase italic">{label}</span>
    </button>
  );
}

function ShopItem({ name, price, color, icon, onBuy, loading }: any) {
  return (
    <div className="bg-black/60 border border-white/10 p-24 rounded-[8rem] text-center hover:border-cyan-400 transition-all flex flex-col h-full shadow-3xl">
       <div className={`w-32 h-32 mx-auto mb-14 rounded-[4rem] bg-white/5 flex items-center justify-center ${color} shadow-inner`}>{icon}</div>
       <h3 className={`text-7xl font-black italic uppercase mb-10 ${color} tracking-tighter`}>{name}</h3>
       <div className="flex-1 text-white/30 text-[15px] font-black uppercase tracking-widest px-10 mb-16 italic">Premium identity perks and high-priority access.</div>
       <div className="pt-16 border-t border-white/5">
          <p className="text-6xl font-black italic mb-14">{price}</p>
          <button onClick={onBuy} disabled={loading} className="w-full py-12 bg-white text-black font-black rounded-[5rem] uppercase tracking-widest hover:bg-cyan-400 active:scale-95 disabled:opacity-50 text-xl shadow-2xl">
             {loading ? "PENDING..." : "ACQUIRE"}
          </button>
       </div>
    </div>
  );
}

function ClanRow({ label, val }: { label: string, val: string }) {
  return (
    <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/5">
       <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">{label}</span>
       <span className="text-lg font-black italic uppercase text-white/80">{val}</span>
    </div>
  );
}

function AdminActionBtn({ icon, label, onClick, active }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center gap-10 p-20 rounded-[6rem] border transition-all ${active ? 'bg-red-500 border-red-400 text-white shadow-xl' : 'bg-white/5 border-white/10 text-white/30 hover:border-cyan-500/50 hover:text-white'}`}>
      {icon}
      <span className="text-[16px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
