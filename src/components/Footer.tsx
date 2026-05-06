import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/10 mt-20 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-blue/5 blur-[100px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold font-display">N</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tight">
                NeuroGen <span className="text-neon-blue">AI</span>
              </span>
            </div>
            <p className="text-white/40 text-sm max-w-sm mb-8 leading-relaxed">
              Empowering creators worldwide with state-of-the-art neural generation tools. The future of creative expression is here.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-neon-blue transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Showcase</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">API Keys</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-neon-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-white/30 gap-4">
          <p>© 2026 NeuroGen AI. Built with precision for the AI age.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Status</a>
            <a href="#" className="hover:text-white">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
