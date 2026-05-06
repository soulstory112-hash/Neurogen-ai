import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "./lib/firebase";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [user, loading] = useAuthState(auth);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleStart = () => {
    if (user) {
      setShowDashboard(true);
    } else {
      signInWithGoogle();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Navbar onShowDashboard={setShowDashboard} showDashboard={showDashboard} />
      
      <AnimatePresence mode="wait">
        {showDashboard && user ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onStartClick={handleStart} />
            <Features />
            <Testimonials />
            <Pricing />
            <FAQ />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Global Background Image Overlay (Landing Only) */}
      {!showDashboard && (
        <div className="fixed inset-0 -z-[45] pointer-events-none opacity-5">
          <img 
            src="/src/assets/images/futuristic_city_landscape_1777964777381.png" 
            alt="" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
      )}

      {/* Subtle particle effect or noise overlay could be added here */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] -z-50" />
    </div>
  );
}
