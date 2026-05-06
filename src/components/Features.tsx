import { motion } from "motion/react";
import { Zap, Image as ImageIcon, Video, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <ImageIcon className="w-8 h-8 text-neon-blue" />,
    title: "AI Image Generator",
    description: "Generate photorealistic images and digital art from text prompts. 10 free daily credits.",
    label: "Free Daily Credits"
  },
  {
    icon: <Video className="w-8 h-8 text-neon-purple" />,
    title: "AI Video Generator",
    description: "Bring your ideas to life with high-fidelity cinematic video generation.",
    label: "Premium Feature"
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Fast Processing",
    description: "Powered by advanced neural clusters for results in under 10 seconds.",
    label: "Supercharged"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
    title: "No Experience Needed",
    description: "Intuitive interface designed for creators, marketers, and visionaries.",
    label: "Pro Tools"
  }
];

export default function Features() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Precision Engineered AI</h2>
        <p className="text-white/60 max-w-xl mx-auto">Everything you need to create the future of digital content today.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -10 }}
            className="glass-card p-8 group hover:border-white/20 transition-all flex flex-col items-start"
          >
            <div className="mb-6 p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <div className="text-xs font-mono text-neon-blue uppercase tracking-widest mb-2 opacity-70">
              {feature.label}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
