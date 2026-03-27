"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, Trophy, ChevronRight, Zap, ExternalLink, 
  Activity, LayoutDashboard, ShieldCheck, Users, Settings, 
  BarChart3, Swords, Target, Flame, Database, Lock, Unlock, AlertTriangle
} from 'lucide-react';

// --- ENHANCED DATA TYPES ---
interface Player {
  rank: string;
  name: string;
  tag: string;
  discipline: string;
  status: string;
  statType: "HT1" | "LT1";
  kd: string;
  ping: string;
}

export default function NordenNexus() {
  const [activeTab, setActiveTab] = useState('OVERALL');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const ACCESS_KEY = "PVP_PROPLE";

  const tabs = ['OVERALL', 'CRYSTAL', 'LUDO', 'UHC', 'AXE', 'NETHERITE', 'SMP', 'TANK', 'ARCHER', 'BOXING'];

  const players: Player[] = [
    { rank: "01", name: "UTKARSH", tag: "GLOBAL LEGEND #1", discipline: "CRYSTAL DISCIPLINE", status: "ACTIVE", statType: "HT1", kd: "4.8", ping: "12ms" },
    { rank: "02", name: "SATYARTH", tag: "GLOBAL LEGEND #2", discipline: "CRYSTAL DISCIPLINE", status: "ACTIVE", statType: "HT1", kd: "4.2", ping: "24ms" },
    { rank: "03", name: "SHIVAM", tag: "GLOBAL LEGEND #3", discipline: "CRYSTAL DISCIPLINE", status: "ACTIVE", statType: "HT1", kd: "3.9", ping: "18ms" },
    { rank: "04", name: "NORDEN_PRO", tag: "PRO RANKED", discipline: "SWORD DISCIPLINE", status: "ACTIVE", statType: "LT1", kd: "2.5", ping: "30ms" },
  ];

  const handleAuth = () => {
    if (passwordInput === ACCESS_KEY) {
      setIsAuthorized(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020205] text-white font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* --- LEFT NAVIGATION MENU --- */}
      <aside className="w-20 hover:w-64 transition-all duration-300 border-r border-white/5 bg-black/40 backdrop-blur-2xl flex flex-col items-center py-8 z-50 group">
        <div className="mb-12">
          <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Zap size={24} className="text-black fill-black" />
          </div>
        </div>

        <nav className="flex flex-col gap-8 flex-1 w-full px-4">
          <MenuIcon icon={<LayoutDashboard size={20} />} label="DASHBOARD" active />
          <MenuIcon icon={<Swords size={20} />} label="PVP LOBBY" />
          <MenuIcon icon={<Users size={20} />} label="CLANS" />
          <MenuIcon icon={<BarChart3 size={20} />} label="ANALYTICS" />
          <div className="h-px bg-white/5 my-4" />
          <MenuIcon 
            icon={<ShieldCheck size={20} className={isAuthorized ? "text-green-500" : "text-red-500"} />} 
            label={isAuthorized ? "ADMIN ACTIVE" : "LOCKDOWN"} 
            onClick={() => setIsAdminOpen(true)}
          />
        </nav>

        <div className="mt-auto flex flex-col gap-6">
          <MenuIcon icon={<Settings size={20} />} label="SETTINGS" />
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar">
        
        {/* --- TOP HEADER --- */}
        <header className="flex items-center justify-between px-10 py-6 sticky top-0 bg-[#020205]/80 backdrop-blur-md z-40">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
              NORDEN<span className="text-cyan-400">MC</span>
            </h1>
            <p className="text-[9px] tracking-[0.4em] text-white/20 mt-1 uppercase font-bold">Nexus OS // v6.2.0</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
              <div className="flex flex-col items-end">
                <span className="text-[8px] text-white/40 font-black tracking-widest">TPS_STABILITY</span>
                <span className="text-[10px] text-green-400 font-bold">20.0 / 20.0</span>
              </div>
              <Activity size={16} className="text-cyan-400 animate-pulse" />
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-[10px] px-8 py-3 rounded-md tracking-tighter shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all">
              PLAY.NORDENMC.COM
            </button>
          </div>
        </header>

        {/* --- CONTENT --- */}
        <main className="p-10 max-w-7xl mx-auto w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <StatCard icon={<Flame className="text-orange-500" />} label="ACTIVE DUELS" value="142" />
            <StatCard icon={<Target className="text-red-500" />} label="TOTAL KILLS" value="1.2M" />
            <StatCard icon={<Trophy className="text-yellow-500" />} label="TOURNAMENTS" value="3 LIVE" />
            <StatCard icon={<Database className="text-cyan-500" />} label="DB_UPTIME" value="99.9%" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {players.slice(0, 3).map((player, idx) => (
              <motion.div 
                key={player.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-b from-white/10 to-transparent p-[1px] rounded-[2.5rem]"
              >
                <div className="bg-[#08080a] rounded-[2.5rem] p-8 flex flex-col items-center relative overflow-hidden">
                  <div className="absolute top-6 right-6">
                    {idx === 0 ? <Crown className="text-yellow-500" size={32} /> : <Trophy className="text-white/20" size={24} />}
                  </div>
                  <div className="w-28 h-28 bg-[#121216] rounded-3xl mb-6 border border-white/5 flex items-center justify-center group-hover:border-cyan-500/50 transition-all">
                     <div className="w-16 h-16 bg-cyan-500/10 rounded-full blur-xl absolute" />
                     <span className="text-4xl font-black italic text-cyan-500/20">{player.rank}</span>
                  </div>
                  <h2 className="text-2xl font-black italic tracking-tighter">{player.name}</h2>
                  <p className="text-[9px] tracking-[0.2em] text-cyan-400/60 mb-4 font-bold">{player.tag}</p>
                  <div className="flex gap-2">
                    <span className="bg-red-500/10 text-red-500 text-[10px] font-black px-4 py-1.5 rounded-lg border border-red-500/20">{player.statType}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8 bg-white/5 p-1.5 rounded-xl border border-white/5 w-fit mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-[9px] font-black tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {players.map((player) => (
              <div key={player.name} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                <div className="flex items-center gap-6">
                  <span className="text-2xl font-black italic text-white/5 group-hover:text-cyan-500/20 transition-colors w-10">{player.rank}</span>
                  <div className="w-10 h-10 bg-[#121216] rounded-lg border border-white/5" />
                  <div>
                    <h4 className="font-black italic tracking-tighter text-lg">{player.name}</h4>
                    <div className="flex items-center gap-3 text-[8px] font-bold tracking-widest text-white/20">
                      <span className="text-cyan-400/50">DISCIPLINE: {player.discipline}</span>
                      <span>LATENCY: {player.ping}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="text-right">
                      <p className="text-[8px] font-black text-white/20 tracking-widest">K/D_RATIO</p>
                      <p className="text-sm font-black text-white italic">{player.kd}</p>
                   </div>
                   <div className={`w-16 py-2 rounded-lg font-black text-center text-xs border ${player.statType === 'HT1' ? 'text-red-500 border-red-500/20 bg-red-500/5' : 'text-cyan-500 border-cyan-500/20 bg-cyan-500/5'}`}>
                      {player.statType}
                   </div>
                   <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-cyan-400 transition-all">
                      <ChevronRight size={16} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* --- SECURE ADMIN OVERLAY PANEL --- */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div 
            initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }}
            className="fixed right-0 top-0 h-full w-[450px] bg-[#08080a] border-l border-white/10 z-[60] p-10 shadow-[-50px_0_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                {isAuthorized ? <Unlock className="text-green-500" /> : <Lock className="text-red-500" />}
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">NEXUS_ADMIN</h3>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="text-white/20 hover:text-white font-bold text-xs">CLOSE [ESC]</button>
            </div>

            {!isAuthorized ? (
              <div className="flex flex-col items-center justify-center h-[60%] text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                  <ShieldCheck size={40} className="text-red-500" />
                </div>
                <h4 className="text-xl font-bold mb-2">RESTRICTED ACCESS</h4>
                <p className="text-[10px] text-white/30 tracking-widest mb-8 px-10">ENTER AUTHORIZATION KEY TO UNLOCK SYSTEM COMMANDS</p>
                
                <div className="w-full space-y-4">
                  <input 
                    type="password" 
                    placeholder="ENTER_PASSKEY..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className={`w-full bg-white/5 border ${authError ? 'border-red-500 animate-shake' : 'border-white/10'} rounded-xl px-6 py-4 text-center tracking-[0.5em] focus:outline-none focus:border-cyan-500 transition-all font-mono`}
                  />
                  <button 
                    onClick={handleAuth}
                    className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all tracking-widest text-xs shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  >
                    AUTHORIZE_UPLINK
                  </button>
                  {authError && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-black tracking-widest flex items-center justify-center gap-2 mt-2">
                      <AlertTriangle size={12} /> INVALID_ACCESS_KEY_DETECTION
                    </motion.p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl mb-8">
                  <p className="text-[8px] font-black text-green-500 tracking-[0.3em] mb-1">SESSION_STATUS</p>
                  <p className="text-xs font-bold text-white tracking-widest uppercase">AUTHORIZATION_GRANTED: PVP_PROPLE</p>
                </div>
                
                <AdminAction label="GLOBAL_MUTE" color="text-red-500" sub="SILENCE ALL CHANNELS" />
                <AdminAction label="TPS_OVERRIDE" color="text-yellow-500" sub="FORCE 20.0 STABILITY" />
                <AdminAction label="DATABASE_WIPE" color="text-red-600" sub="PERMANENT DATA PURGE" />
                <AdminAction label="RESTART_PROXY" color="text-cyan-500" sub="RELOAD VELOCITY/BUNGEE" />
                
                <button 
                  onClick={() => {setIsAuthorized(false); setPasswordInput('')}}
                  className="w-full mt-12 border border-white/5 py-3 rounded-xl text-[9px] font-black text-white/20 hover:text-red-500 hover:border-red-500/20 transition-all tracking-widest"
                >
                  TERMINATE_SESSION
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function MenuIcon({ icon, label, active = false, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 cursor-pointer group/item py-2 px-2 rounded-xl transition-all ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
      <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
      <span className="text-[10px] font-black tracking-[0.2em] hidden group-hover:block whitespace-nowrap">{label}</span>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-2 opacity-50">
        {icon}
        <span className="text-[9px] font-black tracking-widest">{label}</span>
      </div>
      <p className="text-2xl font-black italic tracking-tighter">{value}</p>
    </div>
  );
}

function AdminAction({ label, color, sub }: any) {
  return (
    <div className="p-5 border border-white/5 rounded-xl bg-white/[0.02] flex items-center justify-between group cursor-pointer hover:border-white/20 hover:bg-white/[0.04] transition-all">
      <div>
        <span className={`text-[10px] font-black tracking-widest ${color}`}>{label}</span>
        <p className="text-[8px] text-white/20 font-bold mt-1 tracking-widest">{sub}</p>
      </div>
      <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-cyan-400 transition-all shadow-[0_0_10px_transparent] group-hover:shadow-cyan-400" />
    </div>
  );
}
