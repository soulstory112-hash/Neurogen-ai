import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageIcon, Video, Send, Download, History, CreditCard, Sparkles, Loader2, Trash2 } from "lucide-react";
import { auth, db } from "../lib/firebase";
import { collection, query, where, orderBy, onSnapshot, addDoc, doc, updateDoc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { generateAIImage, generateAIVideo } from "../lib/gemini";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<"image" | "video">("image");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [credits, setCredits] = useState({ image: 0, video: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch user credits
    const userDocRef = doc(db, "users", user.uid);
    const unsubsUser = onSnapshot(userDocRef, (snap) => {
      if (snap.exists()) {
        setCredits({
          image: snap.data().imageCredits || 0,
          video: snap.data().videoCredits || 0
        });
      } else {
        // Initialize user record if not exists
        const newUser = {
          uid: user.uid,
          email: user.email,
          plan: "free",
          imageCredits: 10,
          videoCredits: 1
        };
        // Use setDoc so we can specify the ID
        const setInitialUser = async () => {
          try {
            await setDoc(doc(db, "users", user.uid), newUser);
          } catch (err) {
            console.error("Error creating user profile:", err);
          }
        };
        setInitialUser();
      }
      setLoading(false);
    });

    // Fetch generation history
    const q = query(
      collection(db, "history"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsubsHistory = onSnapshot(q, (snap) => {
      setHistory(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubsUser();
      unsubsHistory();
    };
  }, [user]);

  const handleGenerate = async () => {
    if (!user || !prompt.trim() || isGenerating) return;

    const currentCredits = mode === "image" ? credits.image : credits.video;
    if (currentCredits <= 0) {
      alert("Insufficient credits. Please upgrade to Pro.");
      return;
    }

    setIsGenerating(true);
    try {
      let outputUrl = "";
      if (mode === "image") {
        outputUrl = await generateAIImage(prompt);
      } else {
        outputUrl = await generateAIVideo(prompt);
      }

      // Record generation
      await addDoc(collection(db, "history"), {
        userId: user.uid,
        prompt,
        type: mode,
        outputUrl,
        createdAt: serverTimestamp()
      });

      // Deduct credits
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        [mode === "image" ? "imageCredits" : "videoCredits"]: currentCredits - 1
      });

      setPrompt("");
    } catch (error) {
      console.error(error);
      alert("Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#050505]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Controls */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-2 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-neon-blue" />
                  New Generation
                </h2>
                <div className="flex bg-white/5 rounded-xl p-1 gap-1">
                  <button 
                    onClick={() => setMode("image")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === "image" ? 'bg-neon-blue text-white' : 'text-white/50 hover:text-white'}`}
                  >
                    Image
                  </button>
                  <button 
                    onClick={() => setMode("video")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === "video" ? 'bg-neon-purple text-white' : 'text-white/50 hover:text-white'}`}
                  >
                    Video
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={mode === "image" ? "e.g. A futuristic city at sunset, cinematic lighting, 4k..." : "e.g. A nebula exploding in deep space, hyperrealistic motion..."}
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-neon-blue resize-none leading-relaxed transition-all"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="absolute bottom-4 right-4 px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-neon-blue hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Showcase / History */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <History className="w-5 h-5 text-white/50" />
                  Generation History
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <AnimatePresence>
                  {history.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="glass-card overflow-hidden group border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="aspect-video relative overflow-hidden bg-white/5">
                        {item.type === 'image' ? (
                          <img src={item.outputUrl} alt={item.prompt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <video src={item.outputUrl} className="w-full h-full object-cover" controls />
                        )}
                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded-md text-[10px] uppercase font-bold tracking-widest text-white/70">
                          {item.type}
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <a href={item.outputUrl} download className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                            <Download className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-white/60 line-clamp-2 italic font-mono mb-2">"{item.prompt}"</p>
                        <div className="text-[10px] text-white/30">{new Date(item.createdAt?.seconds * 1000).toLocaleDateString()}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {history.length === 0 && !isGenerating && (
                  <div className="sm:col-span-2 h-64 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-white/20 gap-4">
                    <History className="w-12 h-12" />
                    <p>No history yet. Start creating!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 border-neon-blue/20"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-neon-blue" />
                Credits Balance
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-white/50">Image Credits</span>
                    <span className="text-xl font-bold font-mono">{credits.image} / 10</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-1000" 
                      style={{ width: `${(credits.image / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-white/50">Video Credits</span>
                    <span className="text-xl font-bold font-mono">{credits.video} / 1</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-neon-purple transition-all duration-1000" 
                      style={{ width: `${(credits.video / 1) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/20 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                Upgrade to Pro
              </button>
            </motion.div>

            <div className="glass-card p-8 group">
              <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Tips for better AI</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex gap-2">
                  <span className="text-neon-blue">•</span>
                  Be specific about lighting (e.g. "soft cinematic backlight")
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-blue">•</span>
                  Mention art style (e.g. "oil painting", "3D render")
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-blue">•</span>
                  Avoid ambiguous terms
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
