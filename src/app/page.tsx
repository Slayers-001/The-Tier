"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Skull, Target, Crown, Terminal, X, Database, Cpu 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- TITAN UTILITIES ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Player {
  uuid: string;
  name: string;
  rank: string;
  kills: number;
  deaths: number;
  tier: string;
  online: boolean;
  kd: string;
  playtime: string;
}

const StatMiniNode = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
  <div className="flex flex-col gap-1 p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-all">
    <div className="flex items-center gap-2">
      <Icon className={cn("w-3 h-3", color)} />
      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-lg font-black tracking-tight">{value}</span>
  </div>
);

export default function NordenNexusUltra() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPlayers([
      { uuid: "1", name: "Dragon_Hunter001", rank: "OWNER", kills: 2450, deaths: 102, tier: "HT1", online: true, kd: "24.0", playtime: "1,240h" },
      { uuid: "2", name: "GlacierZ_01", rank: "ADMIN", kills: 1840, deaths: 240, tier: "HT1", online: true, kd: "7.6", playtime: "890h" },
      { uuid: "3", name: "Utkarsh_Dev", rank: "DEVELOPER", kills: 9999, deaths: 0, tier: "GOD", online: true, kd: "∞", playtime: "Active" }
    ]);
  }, []);

  const filtered = useMemo(() => 
    players.filter(p => p.name.toLowerCase().includes(search.toLowerCase())), 
  [players, search]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-x-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-cyan-500/[0.07] blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32">
        <header className="text-center mb-24 space-y-8">
          <h1 className="text-8xl md:text-9xl font-black italic uppercase">NORDEN<span className="text-cyan-500">MC</span></h1>
          <input 
            type="text"
            className="w-full max-w-xl bg-white/5 border border-white/10 rounded-full py-6 px-10 font-mono focus:border-cyan-500/50 outline-none"
            placeholder="SCAN_PLAYER..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((player) => (
            <motion.div
              key={player.uuid}
              onClick={() => setSelectedPlayer(player)}
              className="bg-white/[0.02] border border-white/5 p-10 rounded-[40px] hover:border-cyan-500/40 cursor-pointer"
            >
              <h3 className="text-3xl font-black">{player.name}</h3>
              <p className="text-[10px] font-mono text-cyan-500 uppercase mt-2">{player.rank}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* THE FIX: Correctly Wrapped Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-8"
          >
            <div className="max-w-4xl w-full bg-[#080808] border border-white/10 rounded-[3rem] p-16 relative">
              <button onClick={() => setSelectedPlayer(null)} className="absolute top-10 right-10 text-gray-500 hover:text-white"><X /></button>
              <h2 className="text-6xl font-black uppercase italic mb-8">{selectedPlayer.name}</h2>
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-4 font-mono text-sm tracking-widest text-cyan-500">
                   <p>RANK: {selectedPlayer.rank}</p>
                   <p className="text-gray-400">PLAYTIME: {selectedPlayer.playtime}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}