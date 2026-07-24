import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Film, Baby, BookOpen, Newspaper, ImageIcon, Megaphone,
  ArrowRight, Play, CheckCircle, Zap, Shield, Globe, Star,
  Clapperboard, Cpu, Mic, Users, Sparkles
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";

const studios = [
  { icon: <Film className="w-7 h-7" />, name: "Movie Studio", desc: "Create full AI movies with scripts, voices, and cinematic scenes", color: "from-purple-500/20 to-purple-900/10", border: "border-purple-500/20", iconBg: "bg-purple-500/15 text-purple-300", href: "/studio/movie" },
  { icon: <Baby className="w-7 h-7" />, name: "Cartoon Studio", desc: "Educational children\u2019s cartoons with child-safe AI filtering", color: "from-pink-500/20 to-pink-900/10", border: "border-pink-500/20", iconBg: "bg-pink-500/15 text-pink-300", href: "/studio/cartoon" },
  { icon: <BookOpen className="w-7 h-7" />, name: "Explainer Studio", desc: "Professional explainer and tutorial videos for any topic", color: "from-blue-500/20 to-blue-900/10", border: "border-blue-500/20", iconBg: "bg-blue-500/15 text-blue-300", href: "/studio/explainer" },
  { icon: <Newspaper className="w-7 h-7" />, name: "News Studio", desc: "Turn news articles into anchor-led video summaries instantly", color: "from-cyan-500/20 to-cyan-900/10", border: "border-cyan-500/20", iconBg: "bg-cyan-500/15 text-cyan-300", href: "/studio/news" },
  { icon: <ImageIcon className="w-7 h-7" />, name: "Image to Video", desc: "Animate photos with AI motion, voices, and cinematic cameras", color: "from-orange-500/20 to-orange-900/10", border: "border-orange-500/20", iconBg: "bg-orange-500/15 text-orange-300", href: "/studio/image-to-video" },
  { icon: <Megaphone className="w-7 h-7" />, name: "Ad Studio", desc: "Create platform-specific product advertisements in minutes", color: "from-green-500/20 to-green-900/10", border: "border-green-500/20", iconBg: "bg-green-500/15 text-green-300", href: "/studio/ads" },
];

const steps = [
  { n: "01", title: "Describe Your Idea", desc: "Enter a movie title, story concept, and style preferences" },
  { n: "02", title: "AI Generates Everything", desc: "Script, characters, scenes, voices, and visual prompts created automatically" },
  { n: "03", title: "Review & Customize", desc: "Edit scenes, swap voices, adjust characters, and approve your content" },
  { n: "04", title: "Render & Publish", desc: "GPU-accelerated rendering then direct publish to YouTube, TikTok, Instagram" },
];

const features = [
  { icon: <Sparkles className="w-5 h-5" />, title: "AI Script Generation", desc: "Full screenplays with dialogue, camera directions, and visual prompts" },
  { icon: <Users className="w-5 h-5" />, title: "Character Consistency", desc: "Upload a photo and maintain identity across every scene" },
  { icon: <Mic className="w-5 h-5" />, title: "ElevenLabs Voice Sync", desc: "Professional voices with lip-sync accuracy for every character" },
  { icon: <Cpu className="w-5 h-5" />, title: "RunPod GPU Rendering", desc: "Auto-scale GPU workers that shut down when done to save costs" },
  { icon: <Globe className="w-5 h-5" />, title: "Multi-Platform Publishing", desc: "Publish to YouTube, TikTok, Instagram, LinkedIn, and X directly" },
  { icon: <Zap className="w-5 h-5" />, title: "Model Router AI", desc: "Works with any AI model \u2014 OpenAI, Llama, FLUX, WanVideo, and more" },
];

const stats = [
  { value: "10,000+", label: "Videos Created" },
  { value: "50+", label: "AI Models Supported" },
  { value: "30+", label: "Languages" },
  { value: "99.2%", label: "Uptime" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(220,25%,4%)" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold tracking-wide"
            style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "hsl(44,96%,65%)" }}>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            AI Movie Production Studio \u2014 Now Live
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            Create <span className="text-gold-gradient">AI Movies</span>,
            <br className="hidden md:block" /> Cartoons & Ads
            <br />
            <span className="text-white/80">in Minutes</span>
          </h1>

          <p className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            From a simple idea to a fully rendered video \u2014 complete with AI scripts, consistent characters,
            voice synthesis, lip-sync, and GPU rendering on RunPod. No technical skills required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register" className="px-8 py-4 rounded-2xl text-base font-bold btn-gold flex items-center justify-center gap-2 shadow-xl">
              Start Creating Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="px-8 py-4 rounded-2xl text-base font-semibold btn-ghost flex items-center justify-center gap-2">
              <Play className="w-5 h-5 text-amber-400" /> Watch Demo
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            {["No credit card required", "GDPR compliant", "Auto-shutdown GPU billing"].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" /> {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Studios Grid */}
      <section id="studios" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Six Professional <span className="text-gold-gradient">AI Studios</span></h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Every content type covered \u2014 from Hollywood-style movies to 30-second social ads</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio, i) => (
              <motion.div key={studio.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={studio.href}
                  className={`block glass-card bg-gradient-to-br ${studio.color} border ${studio.border} h-full group`}>
                  <div className={`w-14 h-14 rounded-2xl ${studio.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {studio.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{studio.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{studio.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Studio <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">How It <span className="text-gold-gradient">Works</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="glass-card text-center">
                <div className="text-5xl font-black text-gold-gradient mb-4">{step.n}</div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-gold rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-black text-gold-gradient mb-1">{s.value}</div>
                <div className="text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Everything You <span className="text-gold-gradient">Need</span></h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Professional-grade AI tools, all in one platform</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card flex gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-400"
                  style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="glass-gold rounded-3xl p-12">
            <Clapperboard className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h2 className="text-4xl font-black mb-4">Ready to Create Your <span className="text-gold-gradient">First AI Movie?</span></h2>
            <p className="text-white/55 text-lg mb-8">Join creators who are already producing professional AI content with Iyke Content Studio</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-lg font-bold btn-gold shadow-xl">
              Start for Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)" }}>
              <Clapperboard className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm font-black tracking-widest text-gold-gradient">IYKE CONTENT STUDIO</span>
          </div>
          <p className="text-sm text-white/30">&copy; {new Date().getFullYear()} Iyke Content Studio. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            {["Privacy", "Terms", "Contact"].map(l => (
              <a key={l} href="#" className="hover:text-white/70 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
