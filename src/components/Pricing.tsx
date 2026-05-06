import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for exploring AI possibilities",
    features: [
      "10 image credits / day",
      "1 video credit / day",
      "Standard processing",
      "Community support"
    ],
    cta: "Start for Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$5",
    description: "For serious creators and visionaries",
    features: [
      "Unlimited images",
      "20 videos / month",
      "Priority processing",
      "Commercial usage license",
      "Early access to new models"
    ],
    cta: "Go Pro Now",
    popular: true
  }
];

export default function Pricing() {
  return (
    <section className="py-24 container mx-auto px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-purple/5 blur-[150px] -z-10" />
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Choose Your Plan</h2>
        <p className="text-white/60">Unlock the full power of generative AI for your projects.</p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className={`glass-card p-10 relative flex flex-col ${plan.popular ? 'border-neon-blue/50 ring-1 ring-neon-blue/20 bg-white/[0.07]' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-white/40 text-sm">{plan.description}</p>
            </div>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-bold">{plan.price}</span>
              <span className="text-white/40">/month</span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 text-sm text-white/70">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neon-blue/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-neon-blue" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold transition-all active:scale-95 ${
              plan.popular 
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple hover:scale-[1.02] shadow-lg shadow-neon-blue/20' 
                : 'bg-white/10 hover:bg-white/20'
            }`}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
