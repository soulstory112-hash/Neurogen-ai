import { motion } from "motion/react";
import { Image as ImageIcon, Video, ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onStartClick: () => void;
}

export default function Hero({ onStartClick }: HeroProps) {
  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col items-center">
      {/* Immersive Background Image */}
      <div className="absolute inset-0 -z-20">
        <img 
          src="/src/assets/images/neurogen_hero_cinematic_1777964730497.png" 
          alt="" 
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
      </div>

      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/20 blur-[120px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 text-center max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neon-blue text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Next-Gen AI Generation Engine</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-6 leading-tight">
          Create Stunning <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">AI Visuals</span> in Seconds
        </h1>

        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          No skills needed. Generate high-quality cinematic images and professional videos instantly with our advanced neural networks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStartClick}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-neon-blue hover:text-white transition-all group active:scale-95"
          >
            <ImageIcon className="w-5 h-5" />
            Generate Image
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onStartClick}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95"
          >
            <Video className="w-5 h-5 text-neon-purple" />
            Create Video
          </button>
        </div>
      </motion.div>

      {/* Hero Showcase Grid */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="container mx-auto px-6 mt-20 relative"
      >
        <div className="grid grid-cols-12 gap-4 h-[400px] md:h-[600px]">
          <div className="col-span-8 overflow-hidden rounded-3xl border border-white/10 group">
             <img 
               src="/src/assets/images/neurogen_hero_cinematic_1777964730497.png" 
               alt="AI Generated Landscape" 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            <div className="h-1/2 overflow-hidden rounded-3xl border border-white/10 group">
              <img 
               src="/src/assets/images/ai_portrait_realistic_1777964755068.png" 
               alt="AI Generated Portrait" 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
               referrerPolicy="no-referrer"
              />
            </div>
            <div className="h-1/2 overflow-hidden rounded-3xl border border-white/10 group">
              <img 
               src="/src/assets/images/futuristic_city_landscape_1777964777381.png" 
               alt="AI Generated City" 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
               referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
        
        {/* Floating cards for techy feel */}
        <div className="absolute top-10 -right-10 glass-card p-6 border-neon-blue/30 hidden lg:block rotate-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-mono opacity-50">Processing</span>
          </div>
          <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-neon-blue w-2/3 animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
