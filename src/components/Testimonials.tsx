import { motion } from "motion/react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Alex Rivera",
    role: "Concept Artist",
    content: "NeuroGen has completely shifted my workflow. The cinematic lighting in the generated images is miles ahead of other tools.",
    stars: 5
  },
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    content: "The video generation feature is a game-changer for our social media teasers. Fast, reliable, and stunning quality.",
    stars: 5
  },
  {
    name: "Marcus Thorne",
    role: "Indie Game Dev",
    content: "Unlimited image credits on the Pro plan is insane value. I generated all my world concept art in a weekend.",
    stars: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Loved by Creators</h2>
        <p className="text-white/60">Join thousands of visionaries who choose NeuroGen AI.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-8 border-white/5 hover:border-neon-purple/30 transition-all"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(review.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-neon-purple text-neon-purple" />
              ))}
            </div>
            <p className="text-white/70 italic mb-6 leading-relaxed">"{review.content}"</p>
            <div>
              <div className="font-bold">{review.name}</div>
              <div className="text-xs text-white/30 uppercase tracking-widest">{review.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
