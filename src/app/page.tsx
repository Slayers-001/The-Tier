"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, Trophy, ChevronRight, Zap, ExternalLink, 
  Activity, LayoutDashboard, ShieldCheck, Users, Settings, 
  BarChart3, Swords, Target, Flame, Database, Lock, Unlock, 
  AlertTriangle, Terminal, Cpu, HardDrive, Network, Globe, 
  UserPlus, ShieldAlert, Radio, Hash, Play, Pause, SkipForward, Volume2, ShoppingCart
} from 'lucide-react';

// --- TITAN DATA STRUCTURES ---
interface Player {
  rank: string; name: string; tag: string; discipline: string; 
  status: string; statType: "HT1" | "LT1"; kd: string; 
  ping: string; winRate: string; level: number;
}

interface Clan {
  rank: string; name: string; power: string; members: string; status: "DOMINANT" | "RISING" | "STABLE";
}

export default function NordenNexus() {
  // --- CORE SYSTEM STATE ---
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [activeTab, setActiveTab] = useState('OVERALL');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  
  // --- MUSIC STATE ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("CYBERPUNK_EXTREME.MP3");

  // --- LOGGING SYSTEM ---
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] NORDEN_NEXUS_V7.0_ULTIMATE ONLINE",
    "[KERNEL] LOADED_ALL_MODULES: MUSIC, MARKET, CLANS, ADMIN",
    "[NETWORK] TUNNELING TO NORDENMC_PRO_NODES..."
  ]);

  const ACCESS_KEY = "PVP_PROPLE";
  const tabs = ['OVERALL', 'CRYSTAL', 'LUDO', 'UHC', 'AXE', 'NETHERITE', 'SMP', 'TANK', 'ARCHER', 'BOXING'];

  const players: Player[] = [
    { rank: "01", name: "UTKARSH", tag: "GLOBAL LEGEND #1", discipline: "CRYSTAL", status: "ONLINE", statType: "HT1", kd: "4.8", ping: "12ms", winRate: "94%", level: 120 },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL LEGEND #2", discipline: "CRYSTAL", status: "ONLINE", statType: "HT1", kd: "4.2", ping: "24ms", winRate: "89%", level: 115 },
    { rank: "03", name: "SHIVAM", tag: "GLOBAL LEGEND #3", discipline: "CRYSTAL", status: "AWAY", statType: "HT1", kd: "3.9", ping: "18ms", winRate: "85%", level: 108 },
    { rank: "04", name: "NORDEN_PRO", tag: "ELITE RANKED", discipline: "SWORD", status: "ONLINE", statType: "LT1", kd: "2.5", ping: "30ms", winRate: "72%", level: 95 },
  ];

  const clans: Clan[] = [
    { rank: "01", name: "TEAM_GLACIERZ", power: "98.4", members: "42/50", status: "DOMINANT" },
    { rank: "02", name: "THE_SLAYERS", power: "92.1", members: "38/50", status: "RISING" },
    { rank: "03", name: "VOID_WALKERS", power: "85.6", members: "45/50", status: "STABLE" },
  ];

  // --- ACTION HANDLERS ---
  const handleAuth = () => {
    if (passwordInput === ACCESS_KEY) {
      setIsAuthorized(true);
      setAuthError(false);
      addLog("[SUCCESS] ELEVATED_PRIVILEGES_GRANTED");
    } else {
      setAuthError(true);
      addLog("[CRITICAL] AUTH_FAILURE: ATTEMPT_LOGGED");
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 8));
  };

  return (
    <div className="flex min-h-screen bg-[#020205] text-white font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* --- SIDEBAR NAV: TITAN EDITION --- */}
      <aside className="w-20 hover:w-64 transition-all duration-500 border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col items-center py-8 z-50 group">
        <div className="mb-12 cursor-pointer transition-transform active:scale-95" onClick={() => setActiveMenu('DASHBOARD')}>
          <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] relative overflow-hidden">
            <Zap size={24} className="text-black fill-black z-10" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
          </div>
        </div>

        <nav className="flex flex-col gap-6 flex-1 w-full px-4">
          <MenuIcon icon={<LayoutDashboard size={20} />} label="DASHBOARD" active={activeMenu === 'DASHBOARD'} onClick={() => setActiveMenu('DASHBOARD')} />
          <MenuIcon icon={<Swords size={20} />} label="PVP_LOBBY_CORE" active={activeMenu === 'PVP'} onClick={() => setActiveMenu('PVP')} />
          <MenuIcon icon={<Users size={20} />} label="CLAN_DATABASE" active={activeMenu === 'CLANS'} onClick={() => setActiveMenu('CLANS')} />
          <MenuIcon icon={<ShoppingCart size={20} />} label="GLOBAL_MARKET" active={activeMenu === 'MARKET'} onClick={() => setActiveMenu('MARKET')} />
          <MenuIcon icon={<BarChart3 size={20} />} label="ANALYTICS" active={activeMenu === 'STATS'} onClick={() => setActiveMenu('STATS')} />
          
          <div className="h-px bg-white/5 my-4 mx-2" />
          <MenuIcon icon={<ShieldCheck size={20} className={isAuthorized ? "text-green-500" : "text-red-500"} />} label={isAuthorized ? "ROOT_ACTIVE" : "LOCKDOWN"} onClick={() => setIsAdminOpen(true)} />
        </nav>

        {/* --- MINI MUSIC PLAYER (NEW) --- */}
        <div className="mt-auto px-4 w-full group/music">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex flex-col items-center gap-4 transition-all group-hover/music:p-4">
             <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                <Radio className={`text-cyan-400 ${isPlaying ? 'animate-pulse' : ''}`} size={16} />
             </div>
             <div className="hidden group-hover:flex flex-col items-center w-full">
                <p className="text-[7px] font-black text-cyan-400/60 tracking-[0.3em] mb-1">NOW_PLAYING</p>
                <p className="text-[9px] font-bold text-white/40 truncate w-full text-center mb-3">CYBER_NEXUS_BASS.WAV</p>
                <div className="flex items-center gap-4">
                   <Pause size={14} className="text-white/20 hover:text-white cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} />
                   <div onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-cyan-400 transition-colors">
                      {isPlaying ? <Pause size={14} className="text-black" /> : <Play size={14} className="text-black ml-0.5" />}
                   </div>
                   <SkipForward size={14} className="text-white/20 hover:text-white cursor-pointer" />
                </div>
             </div>
          </div>
          <div className="h-8" />
          <MenuIcon icon={<Settings size={20} />} label="CORE_SETTINGS" onClick={() => setActiveMenu('SETTINGS')} />
        </div>
      </aside>

      {/* --- MAIN ENGINE STAGE --- */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative">
        <header className="flex items-center justify-between px-10 py-8 sticky top-0 bg-[#020205]/80 backdrop-blur-xl z-40 border-b border-white/5">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
              NORDEN<span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">MC</span>
            </h1>
            <div className="flex gap-4 mt-2">
              <span className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-white/20 uppercase"><Activity size={10} className="text-green-500" /> STATUS: ONLINE</span>
              <span className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-white/20 uppercase"><Hash size={10} className="text-cyan-500" /> V7.0_ULTRA</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input type="text" placeholder="DATABASE_SEARCH..." className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-[10px] tracking-widest focus:outline-none focus:border-cyan-500/50 w-64 font-mono" />
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-[11px] px-10 py-3.5 rounded-lg tracking-tighter shadow-[0_0_50px_rgba(6,182,212,0.25)] transition-all hover:scale-105 active:scale-95 uppercase">
              JOIN: PLAY.NORDENMC.COM
            </button>
          </div>
        </header>

        <main className="p-12 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeMenu === 'DASHBOARD' && (
              <motion.div key="dash" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                  <StatCard icon={<Flame className="text-orange-500" />} label="DUELS_ACTIVE" value="1,492" trend="+12%" />
                  <StatCard icon={<Target className="text-red-500" />} label="GLOBAL_KILLS" value="8.4M" trend="+0.8%" />
                  <StatCard icon={<Trophy className="text-yellow-500" />} label="PRO_TOURNAMENTS" value="04_LIVE" trend="HOT" />
                  <StatCard icon={<Database className="text-cyan-500" />} label="UPLINK_SPEED" value="1.2ms" trend="STABLE" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
                  {players.slice(0, 3).map((player, idx) => (
                    <PodiumCard key={player.name} player={player} idx={idx} />
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mb-10 bg-white/5 p-2 rounded-2xl border border-white/5 w-fit mx-auto backdrop-blur-md">
                  {tabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all duration-300 ${activeTab === tab ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'text-white/20 hover:text-white'}`}>{tab}</button>
                  ))}
                </div>

                <div className="space-y-4">
                  {players.map((p) => <PlayerRow key={p.name} player={p} />)}
                </div>
              </motion.div>
            )}

            {activeMenu === 'MARKET' && (
              <motion.div key="market" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "ULTIMATE_CRATE", price: "5000 XP", rarity: "LEGENDARY", color: "text-yellow-500" },
                  { name: "NEXUS_RANK", price: "$25.00", rarity: "EXCLUSIVE", color: "text-cyan-500" },
                  { name: "ELITE_TAG_PACK", price: "1200 XP", rarity: "RARE", color: "text-purple-500" }
                ].map(item => (
                  <div key={item.name} className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group">
                     <div className="w-16 h-16 bg-white/5 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ShoppingCart className={item.color} />
                     </div>
                     <h3 className="text-2xl font-black italic mb-2 uppercase tracking-tighter">{item.name}</h3>
                     <p className={`text-[10px] font-black tracking-widest mb-6 ${item.color}`}>{item.rarity}</p>
                     <div className="flex items-center justify-between border-t border-white/5 pt-6">
                        <span className="text-xl font-black italic">{item.price}</span>
                        <button className="bg-white text-black text-[9px] font-black px-6 py-2 rounded-lg hover:bg-cyan-400">PURCHASE</button>
                     </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeMenu === 'CLANS' && (
              <motion.div key="clans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                 {clans.map(clan => (
                    <div key={clan.name} className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] flex items-center justify-between">
                       <div className="flex items-center gap-10">
                          <span className="text-5xl font-black italic text-white/5">{clan.rank}</span>
                          <div>
                             <h3 className="text-3xl font-black italic uppercase tracking-tighter">{clan.name}</h3>
                             <p className="text-[10px] font-black text-white/20 tracking-widest mt-2 uppercase">STABILITY_PROTOCOL: {clan.status}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-white/20 tracking-widest uppercase mb-1">POWER_INDEX</p>
                          <p className="text-4xl font-black italic text-cyan-400">{clan.power}</p>
                       </div>
                    </div>
                 ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* --- ADMIN TITAN OVERLAY --- */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ x: 600 }} animate={{ x: 0 }} exit={{ x: 600 }} className="fixed right-0 top-0 h-full w-[500px] bg-[#050508] border-l border-white/10 z-[60] p-12 shadow-[-100px_0_150px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isAuthorized ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                  {isAuthorized ? <Unlock className="text-green-500" /> : <Lock className="text-red-500" />}
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">NEXUS_KERNEL</h3>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="text-white/20 font-bold hover:text-white">CLOSE [X]</button>
            </div>

            {!isAuthorized ? (
              <div className="flex flex-col items-center justify-center h-[70%]">
                <ShieldAlert size={80} className="text-red-500/20 mb-8 animate-pulse" />
                <h4 className="text-2xl font-black italic mb-10 uppercase tracking-widest">SYSTEM_LOCKED</h4>
                <input type="password" placeholder="ENTER_PASSKEY..." value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAuth()} className={`w-full bg-white/5 border ${authError ? 'border-red-500 animate-pulse' : 'border-white/10'} rounded-2xl px-6 py-5 text-center tracking-[0.5em] focus:outline-none focus:border-cyan-500 font-mono mb-4`} />
                <button onClick={handleAuth} className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-cyan-400 tracking-widest text-xs uppercase">AUTHORIZE_SESSION</button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-black border border-white/10 rounded-2xl p-6 font-mono text-[10px] h-48 overflow-y-auto mb-8 pr-2">
                  <div className="flex items-center gap-2 text-white/20 mb-4 border-b border-white/5 pb-2 uppercase tracking-widest"><Terminal size={12}/> <span>CORE_OUTPUT</span></div>
                  {logs.map((log, i) => <div key={i} className={`mb-1 ${log.includes('SUCCESS') ? 'text-green-400' : log.includes('CRITICAL') ? 'text-red-500' : 'text-white/40'}`}>{log}</div>)}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <p className="text-[8px] font-black text-white/20 tracking-widest mb-2 uppercase">CPU_USAGE</p>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden"><div className="w-[42%] h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" /></div>
                   </div>
                   <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <p className="text-[8px] font-black text-white/20 tracking-widest mb-2 uppercase">MEMORY_POOL</p>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden"><div className="w-[78%] h-full bg-orange-500 shadow-[0_0_10px_#f97316]" /></div>
                   </div>
                </div>

                <AdminAction icon={<Radio size={16}/>} label="GLOBAL_MUTE" color="text-red-500" onClick={() => addLog("[CMD] GLOBAL_MUTE_INIT")} />
                <AdminAction icon={<Cpu size={16}/>} label="TPS_OVERRIDE" color="text-yellow-500" onClick={() => addLog("[CMD] TPS_FORCED_20.0")} />
                <AdminAction icon={<HardDrive size={16}/>} label="DATABASE_SYNC" color="text-cyan-500" onClick={() => addLog("[CMD] SYNCING_EXTERNAL_CORES")} />
                
                <button onClick={() => {setIsAuthorized(false); setPasswordInput(''); addLog("[INFO] ROOT_DISCONNECTED")}} className="w-full mt-10 border border-white/5 py-4 rounded-xl text-[10px] font-black text-white/20 hover:text-red-500 transition-all tracking-[0.4em] uppercase">TERMINATE_ROOT_ACCESS</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS (MAX DENSITY) ---

function MenuIcon({ icon, label, active = false, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-5 cursor-pointer group py-3 px-3 rounded-2xl transition-all ${active ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'text-white/20 hover:text-white hover:bg-white/5 border border-transparent'}`}>
      <div className={`transition-transform group-hover:scale-110 ${active ? 'drop-shadow-[0_0_8px_#06b6d4]' : ''}`}>{icon}</div>
      <span className="text-[10px] font-black tracking-[0.3em] hidden group-hover:block whitespace-nowrap uppercase">{label}</span>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-white/20 hover:bg-white/[0.04] transition-all group overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity">{icon}<span className="text-[9px] font-black tracking-widest uppercase">{label}</span></div>
        <span className={`text-[9px] font-black px-2 py-1 rounded bg-white/5 ${trend === 'HOT' ? 'text-orange-500 animate-pulse' : 'text-green-400'}`}>{trend}</span>
      </div>
      <p className="text-4xl font-black italic tracking-tighter group-hover:text-cyan-400 transition-colors">{value}</p>
    </div>
  );
}

function PodiumCard({ player, idx }: { player: Player, idx: number }) {
  const isW = idx === 0;
  return (
    <motion.div whileHover={{ y: -10 }} className={`bg-gradient-to-b ${isW ? 'from-cyan-500/30' : 'from-white/10'} to-transparent p-[1.5px] rounded-[3rem]`}>
      <div className="bg-[#08080a] rounded-[3rem] p-10 flex flex-col items-center h-full border border-white/5 relative overflow-hidden">
        {isW ? <Crown className="absolute top-8 right-8 text-yellow-500" size={40} /> : <Trophy className="absolute top-8 right-8 text-white/10" size={32} />}
        <div className={`w-36 h-36 bg-[#121216] rounded-[2.5rem] mb-8 border ${isW ? 'border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.2)]' : 'border-white/5'} flex items-center justify-center`}>
          <span className={`text-6xl font-black italic ${isW ? 'text-cyan-400' : 'text-white/5'}`}>{player.rank}</span>
        </div>
        <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">{player.name}</h2>
        <p className="text-[10px] tracking-[0.3em] text-cyan-400/60 mb-8 font-black uppercase">{player.tag}</p>
        <div className={`w-full py-3 rounded-2xl font-black text-center border ${player.statType === 'HT1' ? 'text-red-500 border-red-500/30 bg-red-500/10' : 'text-cyan-500 border-cyan-500/20 bg-cyan-500/10'}`}>{player.statType}_IDENTIFIED</div>
      </div>
    </motion.div>
  );
}

function PlayerRow({ player }: { player: Player }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:border-cyan-500/30 transition-all relative overflow-hidden">
      <div className="flex items-center gap-10">
        <span className="text-4xl font-black italic text-white/[0.03] group-hover:text-cyan-500/10 w-12">{player.rank}</span>
        <div>
          <h4 className="font-black italic text-2xl uppercase group-hover:text-cyan-400 transition-colors">{player.name}</h4>
          <div className="flex gap-4 mt-2 text-[10px] font-bold tracking-widest text-white/20 uppercase">
             <span className="flex items-center gap-1.5"><Zap size={10} className="text-cyan-500" /> {player.discipline}</span>
             <span className="flex items-center gap-1.5"><Network size={10} /> {player.ping}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10">
         <div className="text-center"><p className="text-[9px] font-black text-white/10 tracking-widest mb-1 uppercase">ELIM_RATIO</p><p className="text-xl font-black italic">{player.kd}</p></div>
         <div className={`w-24 py-3 rounded-2xl font-black text-center text-xs border ${player.statType === 'HT1' ? 'text-red-500 border-red-500/30 bg-red-500/5' : 'text-cyan-500 border-cyan-500/20 bg-cyan-500/5'}`}>{player.statType}</div>
         <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-cyan-400 transition-all"><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}

function AdminAction({ icon, label, color, onClick }: any) {
  return (
    <div onClick={onClick} className="p-6 border border-white/5 rounded-2xl bg-white/[0.02] flex items-center justify-between group cursor-pointer hover:border-white/20 transition-all">
      <div className="flex items-center gap-5">
        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
        <span className={`text-[11px] font-black tracking-widest uppercase ${color}`}>{label}</span>
      </div>
      <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-cyan-400 transition-all shadow-cyan-400" />
    </div>
  );
}
