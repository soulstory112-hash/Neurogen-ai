import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do credits work?",
    answer: "Free users get 10 image credits and 1 video credit every 24 hours. Credits reset daily at UTC 00:00. Pro users get unlimited images and 20 video credits per month."
  },
  {
    question: "Can I use generated images commercially?",
    answer: "Yes, all generations on the Pro plan include a full commercial usage license. Free plan generations are for personal, non-commercial use only."
  },
  {
    question: "How long does generation take?",
    answer: "Images typically take 5-10 seconds. Video generation is more intensive and can take between 1-3 minutes depending on complexity."
  },
  {
    question: "What AI models do you use?",
    answer: "We use a combination of proprietary neural networks and state-of-the-art models like Stability AI, Runway Gen-2, and our own Neuro-Diffusion Pro."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 container mx-auto px-6 max-w-3xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-white/60">Everything you need to know about NeuroGen AI.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass-card overflow-hidden">
            <button 
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <span className="font-bold">{faq.question}</span>
              {openIdx === idx ? <ChevronUp className="w-5 h-5 text-neon-blue" /> : <ChevronDown className="w-5 h-5 text-white/30" />}
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-white/50 text-sm leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
