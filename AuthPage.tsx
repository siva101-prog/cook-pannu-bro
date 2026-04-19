import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingBasket, MapPin, TrendingUp, Tags } from 'lucide-react';
import { useState, useEffect } from "react";
import { getRealTimePrices, PriceIntel } from "../services/priceService";

const savingsData = [
  { day: 'Mon', saved: 150 },
  { day: 'Tue', saved: 220 },
  { day: 'Wed', saved: 180 },
  { day: 'Thu', saved: 250 },
  { day: 'Fri', saved: 400 },
  { day: 'Sat', saved: 120 },
  { day: 'Sun', saved: 300 },
];

export default function DashboardPage() {
  const [prices, setPrices] = useState<PriceIntel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRealTimePrices().then((data) => {
      setPrices(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 pb-20 bg-pattern">
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 pt-10">
        <div>
          <h1 className="text-5xl font-extrabold tracking-[-2px] mb-2 uppercase">THE STUDENT <span className="text-electric-lime">HUB.</span></h1>
          <p className="text-slate-400">Real-time scene check available below, Bro.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-slate-900 border border-electric-lime/15 rounded-2xl text-sm font-medium">
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-widest mb-1">Status</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-electric-lime rounded-full animate-pulse"></span>
              Live Price Intel
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Widget A: Price Intel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-8 p-8 glass rounded-[24px]"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <ShoppingBasket className="text-electric-lime" /> PRICE INTEL
            </h2>
            <div className="flex gap-2">
              {['Zepto', 'Blinkit', 'Mandi'].map(p => (
                <span key={p} className="px-3 py-1 bg-slate-800 border border-white/5 rounded-full text-[10px] uppercase font-bold tracking-widest text-slate-400">{p}</span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-10 text-slate-400">Checking mandi rates, Bro...</div>
            ) : prices.map((item) => (
              <div key={item.item} className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-black/20 rounded-2xl border border-white/5 hover:border-electric-lime/20 transition-all">
                <div className="mb-4 md:mb-0">
                  <span className="text-lg font-bold block">{item.item}</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase tracking-[1px] font-extrabold mt-1">
                    <MapPin className="w-3 h-3" /> Cheapest: {item.lastCheapest === 'mandi' ? 'Local Mandi' : item.lastCheapest}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="text-center px-5 py-3 bg-slate-900 rounded-xl border border-white/5">
                      <span className="text-[9px] block text-slate-500 uppercase font-black tracking-wider">Mandi</span>
                      <span className="text-electric-lime font-bold">₹{item.mandi}</span>
                   </div>
                   <div className="text-center px-5 py-3 bg-slate-900 rounded-xl border border-white/5 opacity-40">
                      <span className="text-[9px] block text-slate-500 uppercase font-black tracking-wider">Blinkit</span>
                      <span className="font-bold">₹{item.blinkit}</span>
                   </div>
                   <div className="text-center px-5 py-3 bg-slate-900 rounded-xl border border-white/5 opacity-40">
                      <span className="text-[9px] block text-slate-500 uppercase font-black tracking-wider">Zepto</span>
                      <span className="font-bold">₹{item.zepto}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Widget B: Pantry Tracker */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 p-8 glass rounded-[24px] flex flex-col"
        >
          <h2 className="text-xl font-bold flex items-center gap-3 mb-8">
            <Tags className="text-electric-lime" /> PANTRY CHECK
          </h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {['Maggi', 'Eggs', 'Rice', 'Potatoes', 'Bread'].map(tag => (
              <span key={tag} className="px-5 py-2.5 bg-electric-lime/10 border border-electric-lime/20 text-electric-lime rounded-xl text-xs font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
            <button className="px-5 py-2.5 bg-slate-800 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all">
              + Add
            </button>
          </div>
          <div className="mt-auto p-5 bg-slate-900 rounded-2xl border-l-4 border-l-electric-lime">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 font-mono">Bro's Observation</p>
            <p className="text-sm italic text-slate-300 leading-relaxed">"Scene looks good, Bro. You can make amazing Fried Rice with these."</p>
          </div>
        </motion.div>

        {/* Widget C: Budget Saved */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-12 p-10 glass rounded-[32px]"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 uppercase tracking-tighter">
                <TrendingUp className="text-electric-lime" /> SAVINGS SCENE
              </h2>
              <p className="text-slate-400 text-base mt-2">Cash you didn't donate to the delivery apps this week.</p>
            </div>
            <div className="bg-slate-900 border border-electric-lime/20 p-6 rounded-3xl text-right">
              <span className="text-5xl font-black text-electric-lime tracking-tighter">₹1,620</span>
              <span className="block text-xs text-slate-500 uppercase font-black tracking-[0.2em] mt-2">Total Saved</span>
            </div>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsData}>
                <defs>
                  <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#CCFF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#020617', 
                    borderRadius: '20px', 
                    border: '1px solid rgba(204, 255, 0, 0.2)',
                    color: '#fff',
                    padding: '16px'
                  }}
                  itemStyle={{ color: '#CCFF00', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="saved" 
                  stroke="#CCFF00" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSaved)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
