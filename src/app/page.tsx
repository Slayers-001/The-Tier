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
  Trello, GitBranch, Terminal as TerminalIcon, Ghost, Skull, Zap as Bolt
} from 'lucide-react';

/**
 * ==========================================
 * NORDEN_NEXUS_OS // VERSION 29.0.0
 * DEVELOPER: UTKARSH PANDEY
 * PROTOCOL: FINAL_ADVANCED_DEPLOYMENT
 * ==========================================
 */

const PASSKEY = "PVP_PROPLE";
const SERVER_IP = "PLAY.NORDENMC.COM";

const MODES = [
  "OVERALL", "LTMs", "Vanilla", "UHC", "Pot", 
  "NethOP", "SMP", "Sword", "Axe", "Mace"
];

const INITIAL_LEADERBOARDS: Record<string, any[]> = {
  OVERALL: [
    { rank: "01", name: "UTKARSH", tag: "NORDEN_LEGEND #1", statType: "HT1", kd: "12.4", img: "https://mc-heads.net/avatar/Utkarsh/100", xp: 125000, ip: "192.168.1.1", banned: false, kills: 15400, deaths: 1241 },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL_ELITE #2", statType: "HT1", kd: "11.1", img: "https://mc-heads.net/avatar/Satyarth/100", xp: 112000, ip: "192.168.1.2", banned: false, kills: 12000, deaths: 1080 },
  ],
};

const INITIAL_CLANS = [
  { id: "CLAN_001", name: "GLACIERZ", leader: "Utkarsh", members: 42, power: "98%", dominance: 45, color: "text-cyan-400", discord: "utkarsh#0001", ign: "Utkarsh", email: "admin@nordenmc.com", requests: [] },
];

export default function NordenNexusV29() {
  // ------------------------------------------
  // --- ENGINE CORE STATES ---
  // ------------------------------------------
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeMode, setActiveMode] = useState('OVERALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data State
  const [leaderboards, setLeaderboards] = useState(INITIAL_LEADERBOARDS);
  const [clans, setClans] = useState(INITIAL_CLANS);
  const [logs, setLogs] = useState<string[]>([]);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  // UI Interaction States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isClanGuiOpen, setIsClanGuiOpen] = useState(false);
  const [isJoinGuiOpen, setIsJoinGuiOpen] = useState(false);
  const [targetClan, setTargetClan] = useState<any>(null);
  const [isPurchasing, setIsPurchasing] = useState<string | null>(null);

  // Form Logic
  const [clanForm, setClanForm] = useState({ teamName: '', discordName: '', ign: '', gmail: '' });
  const [joinForm, setJoinForm] = useState({ ign: '', discord: '', gmail: '', reason: '' });

  // ------------------------------------------
  // --- SYSTEM METHODS ---
  // ------------------------------------------

  const pushLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 50));
  }, []);

  const dispatchWebhook = async (title: string, message: string) => {
    if (!webhookUrl) return;
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{ title, description: message, color: 0x00ffff, timestamp: new Date().toISOString() }]
        })
      });
      pushLog(`WEBHOOK_SENT: ${title}`);
    } catch (e) { pushLog("WEBHOOK_FAILED"); }
  };

  // ------------------------------------------
  // --- SHOP PROTOCOL (FIXED) ---
  // ------------------------------------------
  const handlePurchase = (rankName: string, cost: string) => {
    setIsPurchasing(rankName);
    pushLog(`TRANSACTION_START: Requesting ${rankName}...`);
    
    // Simulate Blockchain/Gateway Handshake
    setTimeout(() => {
      setIsPurchasing(null);
      alert(`PURCHASE SUCCESSFUL: ${rankName} has been bound to your account identity.`);
      pushLog(`TRANSACTION_COMPLETE: ${rankName} deployed via SMTP relay.`);
      dispatchWebhook("RANK_PURCHASED", `Player is attempting to buy ${rankName} for ${cost}`);
    }, 2000);
  };

  // ------------------------------------------
  // --- CLAN COMMANDS ---
  // ------------------------------------------
  const createClan = () => {
    if (!clanForm.teamName || !clanForm.ign) return alert("DATA_MISSING");
    const newClan = {
      ...clanForm,
      id: `CLAN_${Math.floor(Math.random()*999)}`,
      name: clanForm.teamName.toUpperCase(),
      leader: clanForm.ign,
      members: 1,
      power: "10%",
      color: "text-white",
      requests: []
    };
    setClans([...clans, newClan]);
    setIsClanGuiOpen(false);
    pushLog(`DATABASE: NEW_CLAN_INDEXED [${newClan.name}]`);
  };

  const submitEnlistment = () => {
    if (!joinForm.ign || !targetClan) return;
    setClans(clans.map(c => {
      if (c.id === targetClan.id) {
        return { ...c, requests: [...c.requests, { ...joinForm, id: Date.now() }] };
      }
      return c;
    }));
    setIsJoinGuiOpen(false);
    pushLog(`SMTP: ENLISTMENT_RELAY_SENT to ${targetClan.name}`);
    alert("REQUEST SENT: The Clan Leader has been notified via Nexus-Relay.");
  };

  // ------------------------------------------
  // --- ADMIN COMMANDS (NEW POWER COMMANDS) ---
  // ------------------------------------------
  const adminCommand = (type: string) => {
    switch(type) {
      case 'CLEAR_LOGS': setLogs([]); pushLog("ADMIN: KERNEL_LOGS_PURGED"); break;
      case 'GLOBAL_MUTE': pushLog("ADMIN: GLOBAL_CHAT_SILENCED"); dispatchWebhook("MODERATION", "Global mute enabled."); break;
      case 'FLUSH_IPS': pushLog("ADMIN: SESSION_IPS_FLUSHED"); alert("Network security flush complete."); break;
      case 'MAINTENANCE': setMaintenanceMode(!maintenanceMode); break;
    }
  };

  // ------------------------------------------
  // --- RENDER ENGINE ---
  // ------------------------------------------

  return (
    <div className={`min-h-screen bg-[#020205] text-white font-sans overflow-hidden flex selection:bg-cyan-500 selection:text-black`}>
      
      {/* 🧬 SIDEBAR NAVIGATION */}
      <aside className="w-24 hover:w-80 transition-all duration-700 bg-black/80 border-r border-white/5 flex flex-col items-center py-12 z-[100] group backdrop-blur-3xl shadow-[30px_0_60px_rgba(0,0,0,0.5)]">
        <div className="mb-20 cursor-pointer" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:rotate-180 transition-all duration-1000">
            <Bolt size={32} className="fill-white" />
          </div>
        </div>

        <nav className="flex flex-col gap-6 w-full px-6 flex-1">
          <NavBtn icon={<LayoutDashboard/>} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <NavBtn icon={<ShoppingCart/>} label="MARKETPLACE" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <NavBtn icon={<Swords/>} label="WAR_ROOM" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <NavBtn icon={<Terminal/>} label="KERNEL_LOGS" active={activeMenu === 'LOGS'} onClick={() => setActiveMenu('LOGS')} />
          <div className="h-px bg-white/5 my-4" />
          <NavBtn icon={<ShieldCheck className={isAuthorized ? "text-green-400" : "text-red-500"}/>} label="GOD_MODE" active={activeMenu === 'ADMIN'} onClick={() => setIsAdminOpen(true)} />
        </nav>
      </aside>

      {/* 🖥️ VIEWPORT */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative">
        {/* HEADER */}
        <header className="px-20 py-16 flex justify-between items-center sticky top-0 bg-[#020205]/80 backdrop-blur-xl z-[90] border-b border-white/5">
          <div>
            <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-none">NORDEN<span className="text-cyan-400">MC</span></h1>
            <p className="text-[12px] font-black text-white/20 uppercase tracking-[0.8em] mt-4 flex items-center gap-4">
               <span className={`w-3 h-3 rounded-full ${maintenanceMode ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
               SYSTEM_ACTIVE // {SERVER_IP}
            </p>
          </div>

          <div className="flex items-center gap-10">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="DATABASE_QUERY..." className="bg-white/5 border border-white/10 rounded-full pl-16 pr-8 py-5 text-sm outline-none w-[400px] focus:border-cyan-500/50 transition-all font-bold" />
            </div>
            <button className="bg-white text-black font-black px-12 py-5 rounded-full uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-xl">PLAY NOW</button>
          </div>
        </header>

        {/* CONTENT SWITCHER */}
        <div className="p-20 max-w-[1800px] mx-auto">
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD */}
            {activeMenu === 'DASHBOARD' && (
              <motion.div key="dash" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-20">
                <div className="flex justify-center gap-4 bg-white/5 p-3 rounded-full w-fit mx-auto border border-white/10">
                  {MODES.map(m => (
                    <button key={m} onClick={() => setActiveMode(m)} className={`px-10 py-4 rounded-full text-[12px] font-black tracking-widest uppercase transition-all ${activeMode === m ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}>{m}</button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   {(leaderboards[activeMode] || leaderboards['OVERALL']).slice(0, 3).map((p, i) => (
                     <div key={p.name} className="bg-white/5 border border-white/10 p-16 rounded-[5rem] text-center hover:border-cyan-500/50 transition-all group relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 text-white/5 group-hover:text-cyan-500/10 transition-colors"><Trophy size={200}/></div>
                        <img src={p.img} className="w-48 h-48 mx-auto rounded-[3rem] mb-10 border-4 border-white/10 group-hover:scale-110 transition-transform shadow-2xl" />
                        <h3 className="text-5xl font-black italic uppercase tracking-tighter">{p.name}</h3>
                        <p className="text-cyan-400 font-black tracking-[0.4em] uppercase text-xs mt-4">{p.tag}</p>
                        <div className="mt-12 pt-10 border-t border-white/5 grid grid-cols-2">
                           <div><p className="text-[10px] text-white/20 uppercase font-black">K/D Ratio</p><p className="text-4xl font-black italic">{p.kd}</p></div>
                           <div><p className="text-[10px] text-white/20 uppercase font-black">XP Status</p><p className="text-4xl font-black italic text-cyan-400">{Math.floor(p.xp/1000)}K</p></div>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {/* 2. MARKETPLACE (FIXED) */}
            {activeMenu === 'MARKET' && (
              <motion.div key="market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <ShopCard name="VIP_RANK" price="5000 XP" color="text-green-400" icon={<Zap/>} onBuy={() => handlePurchase("VIP", "5000XP")} loading={isPurchasing === "VIP"} />
                <ShopCard name="ELITE_RANK" price="15000 XP" color="text-cyan-400" icon={<Star/>} onBuy={() => handlePurchase("ELITE", "15000XP")} loading={isPurchasing === "ELITE"} />
                <ShopCard name="OMEGA_RANK" price="₹500" color="text-fuchsia-400" icon={<Shield/>} onBuy={() => handlePurchase("OMEGA", "₹500")} loading={isPurchasing === "OMEGA"} />
                <ShopCard name="LEGEND_RANK" price="₹1500" color="text-yellow-400" icon={<Crown/>} onBuy={() => handlePurchase("LEGEND", "₹1500")} loading={isPurchasing === "LEGEND"} />
              </motion.div>
            )}

            {/* 3. WAR_ROOM */}
            {activeMenu === 'CLANS' && (
              <motion.div key="clans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                 <div className="bg-gradient-to-r from-cyan-600 to-indigo-700 p-20 rounded-[4rem] flex justify-between items-center shadow-2xl">
                    <div>
                      <h2 className="text-7xl font-black italic uppercase tracking-tighter">Faction Management</h2>
                      <p className="text-white/60 font-black uppercase tracking-[0.4em] mt-4">Initialize your node or join existing alliances</p>
                    </div>
                    <button onClick={() => setIsClanGuiOpen(true)} className="bg-white text-black font-black px-16 py-8 rounded-full uppercase text-xl hover:scale-105 transition-all shadow-2xl">CREATE CLAN</button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {clans.map(c => (
                      <div key={c.id} className="bg-black/60 border border-white/10 p-12 rounded-[4rem] hover:border-cyan-500/50 transition-all group">
                         <div className="flex justify-between items-center mb-8">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400"><Shield size={32}/></div>
                            <span className="text-[10px] font-mono text-white/20">{c.id}</span>
                         </div>
                         <h3 className={`text-5xl font-black italic uppercase mb-2 ${c.color}`}>{c.name}</h3>
                         <p className="text-white/20 font-black uppercase text-xs tracking-widest mb-10">Leader: {c.leader}</p>
                         <button onClick={() => { setTargetClan(c); setIsJoinGuiOpen(true); }} className="w-full py-6 bg-white/5 border border-white/10 rounded-3xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Request Join</button>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {/* 4. KERNEL LOGS */}
            {activeMenu === 'LOGS' && (
              <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-[700px]">
                 <div className="bg-black border border-white/10 rounded-[4rem] p-12 flex flex-col">
                    <h3 className="text-2xl font-black uppercase mb-8 text-cyan-400 flex items-center gap-4"><Terminal/> LIVE_KERNEL_FEED</h3>
                    <div className="flex-1 overflow-y-auto font-mono text-sm space-y-4 pr-4 custom-scrollbar">
                       {logs.map((l, i) => (
                         <p key={i} className="text-white/40"><span className="text-cyan-500/50 mr-4">>>></span> {l}</p>
                       ))}
                    </div>
                 </div>
                 
                 <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 flex flex-col">
                    <h3 className="text-2xl font-black uppercase mb-8 text-fuchsia-400 flex items-center gap-4"><Inbox/> PENDING_RECRUITS</h3>
                    <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
                       {clans.flatMap(c => c.requests.map((r: any) => (
                         <div key={r.id} className="bg-black/40 p-8 rounded-3xl border border-white/5 flex justify-between items-center group">
                            <div>
                               <h4 className="text-3xl font-black italic text-white uppercase">{r.ign}</h4>
                               <p className="text-[10px] text-white/20 font-black uppercase mt-2">Target: {c.name} | Gmail: {r.gmail}</p>
                            </div>
                            <div className="flex gap-4">
                               <button className="p-4 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-black transition-all"><UserCheck/></button>
                               <button className="p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><UserX/></button>
                            </div>
                         </div>
                       )))}
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* 🔐 GOD-MODE PANEL (FIXED COMMANDS) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 1000 }} animate={{ x: 0 }} exit={{ x: 1000 }} className="fixed inset-y-0 right-0 w-[600px] bg-[#030308] border-l border-white/10 z-[1000] p-16 shadow-[-50px_0_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-y-auto">
             <div className="flex justify-between items-center mb-16">
                <h2 className="text-4xl font-black italic uppercase text-cyan-400 flex items-center gap-6"><ShieldCheck size={40}/> GOD_MODE</h2>
                <button onClick={() => setIsAdminOpen(false)} className="text-white/20 hover:text-red-500 transition-colors"><X size={40}/></button>
             </div>

             {!isAuthorized ? (
               <div className="space-y-10 py-20">
                  <p className="text-center text-white/20 font-black uppercase tracking-[0.5em]">Clearance Required</p>
                  <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (passwordInput === PASSKEY ? setIsAuthorized(true) : alert("INVALID"))} placeholder="PASSKEY..." className="w-full bg-white/5 border border-white/10 p-10 rounded-3xl text-center text-4xl font-black tracking-widest outline-none focus:border-cyan-500" />
                  <button onClick={() => passwordInput === PASSKEY ? setIsAuthorized(true) : alert("INVALID")} className="w-full bg-white text-black py-8 rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-cyan-400 transition-all">AUTHENTICATE</button>
               </div>
             ) : (
               <div className="space-y-16">
                  {/* SYSTEM COMMANDS */}
                  <div className="grid grid-cols-2 gap-6">
                     <AdminBtn icon={<Trash2/>} label="Clear Logs" onClick={() => adminCommand('CLEAR_LOGS')} />
                     <AdminBtn icon={<VolumeX/>} label="Global Mute" onClick={() => adminCommand('GLOBAL_MUTE')} />
                     <AdminBtn icon={<RefreshCcw/>} label="Flush IPs" onClick={() => adminCommand('FLUSH_IPS')} />
                     <AdminBtn icon={<Power/>} label="Maint. Mode" active={maintenanceMode} onClick={() => adminCommand('MAINTENANCE')} />
                  </div>

                  {/* WEBHOOK PANEL */}
                  <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10">
                     <h4 className="text-xl font-black uppercase mb-6 text-fuchsia-400 flex items-center gap-4"><Radio/> Discord Relay</h4>
                     <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="WEBHOOK_URL..." className="w-full bg-black p-6 rounded-2xl text-xs font-mono border border-white/5 mb-6 outline-none focus:border-fuchsia-500" />
                     <button onClick={() => dispatchWebhook("ADMIN_SYNC", "Manual sync triggered by Utkarsh Pandey.")} className="w-full py-4 bg-fuchsia-500 text-white font-black rounded-2xl hover:scale-[1.02] transition-all">TEST CONNECTION</button>
                  </div>

                  {/* CLAN OVERRIDE */}
                  <div className="space-y-6">
                     <h4 className="text-xl font-black uppercase text-indigo-400 flex items-center gap-4"><Gavel/> Faction Override</h4>
                     {clans.map(c => (
                       <div key={c.id} className="bg-black/40 p-6 rounded-2xl border border-white/5 flex justify-between items-center">
                          <p className="font-black italic uppercase">{c.name}</p>
                          <button onClick={() => setClans(clans.filter(x => x.id !== c.id))} className="text-red-500/40 hover:text-red-500"><Trash2 size={20}/></button>
                       </div>
                     ))}
                  </div>
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CLAN MODALS */}
      {isClanGuiOpen && <ClanModal onClose={() => setIsClanGuiOpen(false)} form={clanForm} setForm={setClanForm} onSubmit={createClan} />}
      {isJoinGuiOpen && <JoinModal onClose={() => setIsJoinGuiOpen(false)} form={joinForm} setForm={setJoinForm} onSubmit={submitEnlistment} clanName={targetClan?.name} />}

    </div>
  );
}

// ------------------------------------------
// --- SUB-COMPONENTS ---
// ------------------------------------------

function NavBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-8 w-full py-6 px-6 rounded-2xl transition-all group ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'scale-110' : 'scale-100'}`}>{icon}</div>
      <span className="text-sm font-black tracking-widest hidden group-hover:block uppercase">{label}</span>
    </button>
  );
}

function AdminBtn({ icon, label, onClick, active }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border transition-all ${active ? 'bg-red-500 border-red-400 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:border-cyan-500/50 hover:text-white'}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function ShopCard({ name, price, color, icon, onBuy, loading }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] text-center hover:border-fuchsia-500/40 transition-all group flex flex-col h-full shadow-2xl">
       <div className={`w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/5 flex items-center justify-center ${color} group-hover:scale-125 transition-transform`}>{icon}</div>
       <h3 className={`text-4xl font-black italic uppercase mb-4 ${color}`}>{name}</h3>
       <div className="flex-1 text-white/30 text-xs font-black uppercase tracking-widest px-4 leading-relaxed mt-4">Standard rank perks including server access and kit rewards.</div>
       <div className="mt-10 pt-10 border-t border-white/5">
          <p className="text-3xl font-black italic mb-8">{price}</p>
          <button onClick={onBuy} disabled={loading} className="w-full py-6 bg-white text-black font-black rounded-3xl uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95 disabled:opacity-50">
             {loading ? "TRANSACTING..." : "PURCHASE"}
          </button>
       </div>
    </div>
  );
}

function ClanModal({ onClose, form, setForm, onSubmit }: any) {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-10">
       <div className="bg-[#080808] border border-white/10 w-full max-w-2xl rounded-[4rem] p-16 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-cyan-500" />
          <h2 className="text-5xl font-black italic uppercase text-center">Deploy Alliance</h2>
          <div className="grid grid-cols-1 gap-6">
             <ModalInput label="Team Name" value={form.teamName} onChange={v => setForm({...form, teamName: v})} />
             <ModalInput label="Your IGN" value={form.ign} onChange={v => setForm({...form, ign: v})} />
             <ModalInput label="Discord ID" value={form.discordName} onChange={v => setForm({...form, discordName: v})} />
          </div>
          <button onClick={onSubmit} className="w-full py-8 bg-cyan-500 text-black font-black rounded-3xl text-xl uppercase tracking-widest hover:bg-white transition-all">INITIALIZE</button>
          <button onClick={onClose} className="w-full text-white/10 font-black uppercase text-xs hover:text-red-500 transition-colors">Abort</button>
       </div>
    </div>
  );
}

function JoinModal({ onClose, form, setForm, onSubmit, clanName }: any) {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-10">
       <div className="bg-[#080808] border border-white/10 w-full max-w-2xl rounded-[4rem] p-16 space-y-10 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500" />
          <h2 className="text-5xl font-black italic uppercase text-center">Join {clanName}</h2>
          <div className="grid grid-cols-1 gap-6">
             <ModalInput label="In-Game Name" value={form.ign} onChange={v => setForm({...form, ign: v})} />
             <ModalInput label="Gmail Relay" value={form.gmail} onChange={v => setForm({...form, gmail: v})} />
             <textarea value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} placeholder="REASON FOR JOINING..." className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl h-32 outline-none focus:border-indigo-500 text-sm font-black uppercase tracking-widest" />
          </div>
          <button onClick={onSubmit} className="w-full py-8 bg-indigo-600 text-white font-black rounded-3xl text-xl uppercase tracking-widest hover:bg-white hover:text-black transition-all">SEND SIGNAL</button>
          <button onClick={onClose} className="w-full text-white/10 font-black uppercase text-xs hover:text-red-500 transition-colors">Abort</button>
       </div>
    </div>
  );
}

function ModalInput({ label, value, onChange }: any) {
  return (
    <div className="space-y-2">
       <p className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">{label}</p>
       <input value={value} onChange={e => onChange(e.target.value)} placeholder={`ENTER_${label.toUpperCase()}...`} className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl outline-none focus:border-cyan-500 text-sm font-black uppercase tracking-widest" />
    </div>
  );
}
