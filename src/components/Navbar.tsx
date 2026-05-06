import { motion } from "motion/react";
import { Sparkles, Video, User, LogOut, LayoutDashboard, Home } from "lucide-react";
import { auth, signInWithGoogle } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface NavbarProps {
  onShowDashboard: (show: boolean) => void;
  showDashboard: boolean;
}

export default function Navbar({ onShowDashboard, showDashboard }: NavbarProps) {
  const [user] = useAuthState(auth);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => onShowDashboard(false)}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center neon-glow">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-display font-bold tracking-tight">
          NeuroGen <span className="text-neon-blue">AI</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <button onClick={() => onShowDashboard(false)} className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
          <Home className="w-4 h-4" /> Home
        </button>
        <button className="hover:text-white transition-colors cursor-pointer">Pricing</button>
        <button className="hover:text-white transition-colors cursor-pointer">Showcase</button>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onShowDashboard(!showDashboard)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-medium transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-neon-blue" />
              Dashboard
            </button>
            <button 
              onClick={() => auth.signOut()}
              className="p-2 text-white/50 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full border border-neon-blue p-0.5 overflow-hidden">
              <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        ) : (
          <button 
            onClick={() => signInWithGoogle()}
            className="px-6 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-full hover:scale-105 transition-transform active:scale-95"
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
}
