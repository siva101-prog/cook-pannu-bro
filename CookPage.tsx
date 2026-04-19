import { motion } from "motion/react";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 bg-pattern">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 glass rounded-[32px] shadow-2xl relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-electric-lime/5 blur-3xl rounded-full" />
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold mb-3 tracking-tighter text-white uppercase leading-none">WELCOME, BRO.</h2>
          <p className="text-slate-400 text-sm">Login to start saving some major cash.</p>
        </div>
        
        <div className="space-y-4">
          <button className="w-full py-4 bg-slate-800 border border-white/5 text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-slate-700 transition-all text-xs uppercase tracking-widest">
            <img src="https://picsum.photos/seed/google/24/24" alt="Google" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
            Continue with Google
          </button>
          
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-slate-950 px-3 text-slate-500 tracking-[0.2em]">Or with email</span></div>
          </div>
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[1px] font-bold text-electric-lime block ml-1">Bro's Identity</span>
            <input 
              type="email" 
              placeholder="Email ID" 
              className="w-full px-5 py-4 bg-slate-900 border border-white/10 rounded-xl outline-none focus:border-electric-lime/30 transition-all text-white text-sm" 
            />
          </div>
          
          <button className="w-full py-4 bg-electric-lime text-black font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-xs uppercase tracking-widest mt-4 shadow-[0_0_20px_rgba(204,255,0,0.1)]">
            Enter the Hub
          </button>
        </div>

        <p className="text-center text-[10px] text-slate-600 uppercase font-bold tracking-widest mt-10">
          Scene heavy, da. Join the elite.
        </p>
      </motion.div>
    </div>
  );
}
