/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue, animate } from 'motion/react';
import { 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  Globe, 
  BarChart3, 
  Menu, 
  X, 
  Droplets,
  Zap,
  CheckCircle2,
  Lock,
  Star,
  Quote
} from 'lucide-react';

// --- Assets ---
const ASSETS = {
  DURATECH_LOGO: "https://i.ibb.co/JWN5rSqj/Dura-Tech-logo.png",
  MAXBLUE_LOGO: "https://i.ibb.co/9k9gtMbW/Max-Blue-logo.png",
  MAIN_BANNER: "https://i.ibb.co/3mDgHBWT/Banner-1.png",
  PRODUCTS: [
    "https://i.ibb.co/jqzwqdB/Product-Image-1.png",
    "https://i.ibb.co/spT3nFPV/Product-Image-2.png",
    "https://i.ibb.co/twSNX1Xb/Product-Image-3.png",
    "https://i.ibb.co/d0hQJTbn/Product-Image-Back-1.png",
    "https://i.ibb.co/qLz5KbbK/Product-Image-Back-2.png"
  ]
};

// --- Animation Components ---

const Counter = ({ value, duration = 2, suffix = "", decimals = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, parseFloat(value), {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = `${latest.toFixed(decimals)}${suffix}`;
          }
        },
      });
      return controls.stop;
    }
  }, [isInView, value, duration, count, decimals, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const Reveal = ({ children, width = "fit-content", delay = 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.4, delay: delay, ease: "easeOut" }}
        className="will-change-[transform,opacity]"
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sustainability', href: '#sustainability' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-dark/95 backdrop-blur-lg py-2 md:py-3 shadow-2xl' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Parent Company Logo - Light Translucent Container */}
        <div className="mb-2 md:mb-4 px-6 md:px-10 py-2 md:py-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/20 transition-all hover:bg-white/90">
          <img src={ASSETS.DURATECH_LOGO} alt="DuraTech" className="h-5 md:h-10 object-contain mx-auto" referrerPolicy="no-referrer" />
          <p className="text-[8px] md:text-[10px] text-center uppercase tracking-[0.2em] mt-0.5 md:mt-1 text-brand-dark/80 font-black">Parent Company</p>
        </div>

        <div className="w-full flex justify-between items-center md:border-t md:border-white/10 pt-0 md:pt-4">
          <a href="#" className="flex items-center gap-3 group">
            <img src={ASSETS.MAXBLUE_LOGO} alt="MAXBlue" className="h-7 md:h-10 object-contain group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold tracking-widest uppercase text-white hover:text-brand-red transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#order" 
              className="bg-brand-red hover:bg-brand-red/80 text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-red/20"
            >
              Bulk Order
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-dark border-t border-white/10 p-8 md:hidden flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold tracking-widest uppercase text-white"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#order" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand-red text-white px-8 py-4 rounded-full text-center font-bold tracking-widest uppercase"
            >
              Bulk Order
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-dark/60 z-10"></div>
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={ASSETS.MAIN_BANNER} 
          alt="Hero Background" 
          className="w-full h-full object-cover will-change-transform" 
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          <Reveal delay={0.2}>
            <span className="inline-block px-4 py-1 border border-brand-red text-brand-red text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-6 rounded-full">
              Prime Diesel Technology
            </span>
          </Reveal>
          
          <Reveal delay={0.4} width="100%">
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.1] md:leading-none">
              MAXBlue <span className="text-brand-red">Elite</span> Fleet.
            </h1>
          </Reveal>

          <Reveal delay={0.6} width="100%">
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-10 font-light leading-relaxed">
              High-purity urea solutions specifically balanced for the extreme demands of heavy-duty trucks and diesel coasters. Now available in precision 10L bottles.
            </p>
          </Reveal>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
          >
            <a href="#order" className="group flex items-center gap-3 bg-white text-brand-dark px-10 py-5 rounded-full font-bold tracking-widest uppercase transition-all hover:bg-brand-red hover:text-white">
              Secure Bulk Order
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 text-white/50 text-sm font-medium">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-brand-blue flex items-center justify-center text-[10px]">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Trusted by 12k+ Carriers</span>
            </div>
          </motion.div>

          {/* Status Bar - Moved into flow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 will-change-[transform,opacity]"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">SCR Status: Operational</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TechnologySection = () => {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12 will-change-[transform,opacity]"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Built for Heavy Machinery.
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-blue/30 flex items-center justify-center text-brand-red">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Coaster & Coach Specialized</h3>
                    <p className="text-white/60 leading-relaxed">Ensuring smooth transit for municipal fleets and long-haul coaster services with maximum catalyst protection.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-blue/30 flex items-center justify-center text-brand-red">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Logistics Gold Standard</h3>
                    <p className="text-white/60 leading-relaxed">The preferred choice for cross-border freight fleets requiring absolute urea consistency.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Certification</p>
                <p className="font-bold text-sm">ISO 22241 COMPLIANT</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Technical Note</p>
                <p className="font-bold text-sm">Advanced Urea Distillation</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden group will-change-[transform,opacity]"
          >
            <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-transparent transition-colors duration-700"></div>
            <img 
              src={ASSETS.PRODUCTS[0]} 
              alt="Industrial Performance" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 glass-card p-6 md:p-8 rounded-2xl">
              <h4 className="text-xl md:text-2xl font-bold mb-2">THE NEW STANDARD.</h4>
              <p className="text-xs md:text-sm text-white/70">Engineered for maximum efficiency and zero crystallization. Experience the elite performance of MAXBlue.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { label: "Purity Grade", value: "99.9", suffix: "%", icon: <Droplets />, decimals: 1 },
    { label: "Mineral Residue", value: "0.01", suffix: "%", icon: <Zap />, decimals: 2 },
    { label: "Euro 6 Ready", value: "Certified", icon: <CheckCircle2 /> },
  ];

  return (
    <section className="py-24 bg-brand-blue/10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <Reveal width="100%">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Designed for those who keep the world moving.</h2>
        </Reveal>
        <Reveal width="100%" delay={0.4}>
          <p className="text-white/60 max-w-2xl mx-auto mb-16">MAXBlue prime solution eliminates urea crystallization, keeping your trucks on the road longer and your coasters running cleaner.</p>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-10 rounded-2xl md:rounded-3xl hover:border-brand-red/50 transition-colors duration-500 group will-change-[transform,opacity]"
            >
              <div className="text-brand-red mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(stat.icon as React.ReactElement, { size: 40 })}
              </div>
              <div className="text-5xl font-black mb-2 tracking-tighter">
                {isNaN(parseFloat(stat.value || "")) ? (
                  stat.value
                ) : (
                  <Counter value={stat.value || "0"} suffix={stat.suffix} decimals={stat.decimals} />
                )}
              </div>
              <div className="text-sm uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Showcase = () => {
  return (
    <section id="showcase" className="py-32 bg-brand-blue/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal width="100%">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">Our Product.</h2>
          </Reveal>
          <Reveal width="100%" delay={0.4}>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">Discover the quality of MAXBlue™. See our premium 10L solutions designed for the most demanding diesel engines.</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ASSETS.PRODUCTS.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src={img} 
                alt={`Showcase ${i}`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="bg-white/10 backdrop-blur-xl p-4 rounded-full border border-white/20">
                  <Zap className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Sustainability = () => {
  const pillars = [
    { title: "90% NOx Neutral", desc: "Pure ammonia conversion that turns harmful emissions into harmless nitrogen and water vapor for industrial fleets.", icon: <Leaf /> },
    { title: "Zero Waste Pure", desc: "Our de-ionization plants utilize high-efficiency solar energy to produce the purest bottle-grade solutions available.", icon: <Zap /> },
    { title: "Eco-Friendly Packaging", desc: "Our 10L bottles are designed for sustainability, helping you reduce waste while maintaining peak performance.", icon: <Globe /> },
  ];

  return (
    <section id="sustainability" className="py-32 bg-brand-dark relative overflow-hidden">
      {/* Optimized background - radial gradient is cheaper than blur filter */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,43,91,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="will-change-[transform,opacity]"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Clean Air Logistics.</h2>
            <p className="text-xl text-white/60 mb-12 leading-relaxed">Ensuring the heavy-duty vehicles of today don't compromise the air of tomorrow. 90% NOx reduction for every mile.</p>
            
            <div className="space-y-8">
              {pillars.map((p, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                    {React.cloneElement(p.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight">{p.title}</h3>
                    <p className="text-white/50 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute -inset-10 bg-brand-red/5 rounded-full z-0 pointer-events-none"></div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white/[0.04] border border-white/10 p-6 md:p-12 rounded-[24px] md:rounded-[40px] relative z-10 will-change-transform transform-gpu"
            >
              <div className="mb-8">
                <div className="text-brand-red mb-4"><BarChart3 size={48} /></div>
                <h4 className="text-3xl font-bold mb-4">Impact Metrics</h4>
                <p className="text-white/60 text-sm">Real-time environmental contribution tracking across our global carrier network.</p>
              </div>
              <div className="space-y-6">
                {[
                  { label: "NOx Reduction", val: "90", suffix: "%" },
                  { label: "Solar Energy Usage", val: "100", suffix: "%" },
                  { label: "Recycled Packaging", val: "85", suffix: "%" },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                      <span>{m.label}</span>
                      <span className="text-brand-red">
                        <Counter value={m.val} suffix={m.suffix} />
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden transform-gpu">
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        style={{ originX: 0, width: `${m.val}%` }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                        viewport={{ once: true }}
                        className="h-full bg-brand-red will-change-transform"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marcus Thorne",
      role: "Logistics Director, EuroTrans",
      image: "https://picsum.photos/seed/face1/400/400",
      quote: "MAXBlue has completely transformed our fleet's maintenance cycle. The purity levels are unmatched, and we've seen a 15% reduction in SCR-related downtime since switching."
    },
    {
      name: "Sarah Jenkins",
      role: "Operations Manager, Jenkins Freight",
      image: "https://picsum.photos/seed/face2/400/400",
      quote: "The 10L precision bottles are a game-changer for our regional drivers. Easy to handle, zero waste, and the quality is consistently top-tier. Highly recommended."
    },
    {
      name: "David Chen",
      role: "Fleet Supervisor, Metro Transit",
      image: "https://picsum.photos/seed/face3/400/400",
      quote: "Switching to MAXBlue was the best decision for our municipal fleet. The technical support and bulk delivery reliability have been outstanding."
    },
    {
      name: "Elena Rodriguez",
      role: "Sustainability Lead, GreenPath Logistics",
      image: "https://picsum.photos/seed/face4/400/400",
      quote: "We prioritize environmental impact, and MAXBlue's commitment to high-purity urea solutions aligns perfectly with our green initiatives. Clean air, clean engines."
    },
    {
      name: "Robert Miller",
      role: "Owner, Miller Heavy Haulage",
      image: "https://picsum.photos/seed/face5/400/400",
      quote: "In this business, reliability is everything. MAXBlue delivers on that promise every single time. Our engines run smoother and cleaner than ever before."
    },
    {
      name: "Aisha Khan",
      role: "Supply Chain Manager, Global Carriers",
      image: "https://picsum.photos/seed/face6/400/400",
      quote: "The bulk logistics portal makes procurement seamless. We can track our orders and manage our supply chain with absolute precision. A truly professional partner."
    }
  ];

  return (
    <section id="testimonials" className="py-32 bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal>
            <span className="inline-block px-4 py-1 border border-brand-red text-brand-red text-[10px] font-bold tracking-[0.3em] uppercase mb-6 rounded-full">
              Industry Trust
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Voice of the <span className="text-brand-red">Fleet</span>.</h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="max-w-2xl mx-auto text-white/50 text-lg">Leading logistics networks and independent carriers trust MAXBlue for precision SCR performance.</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-[24px] md:rounded-[32px] hover:border-brand-red/30 transition-all group will-change-[transform,opacity]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-red/20 group-hover:border-brand-red/50 transition-colors">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-xs text-brand-red font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} size={14} className="fill-brand-red text-brand-red" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 text-white/5 w-12 h-12 -z-10" />
                <p className="text-white/70 leading-relaxed italic">"{t.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderPortal = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    volume: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(formData);
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
    setFormData({ name: '', company: '', email: '', volume: '', requirements: '' });
  };

  return (
    <section id="order" className="py-32 bg-brand-blue/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <Reveal width="100%">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Premium Product Store.</h2>
            </Reveal>
            <Reveal width="100%" delay={0.4}>
              <p className="text-xl text-white/60 mb-12">High-purity urea solutions delivered to your business. Order our precision 10L bottles and ensure your fleet stays compliant and efficient.</p>
            </Reveal>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: "Priority Dispatch", desc: "Bulk orders receive dedicated logistics priority with 24/7 tracking.", icon: <Zap /> },
                { title: "Quality Guarantee", desc: "Every bulk shipment includes a batch-specific ISO 22241 certificate.", icon: <ShieldCheck /> },
                { title: "Direct Delivery", desc: "Fast and secure delivery for all orders, from single cases to bulk pallets, right to your location.", icon: <Globe /> },
              ].map((b, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <div className="text-brand-red">{React.cloneElement(b.icon as React.ReactElement, { size: 24 })}</div>
                  <h4 className="font-bold text-lg">{b.title}</h4>
                  <p className="text-sm text-white/50">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-brand-dark p-8 md:p-16 rounded-[24px] md:rounded-[40px] shadow-2xl border border-white/5"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 bg-brand-red/20 rounded-full flex items-center justify-center text-brand-red mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Inquiry Received.</h3>
                <p className="text-white/60">Our logistics team will contact you within 24 business hours to finalize your procurement schedule.</p>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-red transition-colors" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Company Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-red transition-colors" 
                      placeholder="Logistics Inc." 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Corporate Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-red transition-colors" 
                    placeholder="john@company.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Estimated Monthly Volume (10L Bottles)</label>
                  <div className="relative group">
                    <input 
                      required
                      type="number" 
                      min="1"
                      value={formData.volume}
                      onChange={e => setFormData({...formData, volume: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-red transition-all hover:bg-white/10 hover:border-white/20 text-white/80 font-medium placeholder:text-white/20" 
                      placeholder="Enter units (e.g. 1500)"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 group-hover:text-brand-red transition-colors">
                      <Truck size={16} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Additional Requirements</label>
                  <textarea 
                    value={formData.requirements}
                    onChange={e => setFormData({...formData, requirements: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-red transition-colors h-32 resize-none" 
                    placeholder="Special delivery instructions..."
                  ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white py-5 rounded-xl font-bold tracking-[0.2em] uppercase transition-all shadow-xl shadow-brand-red/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Initialize Procurement'}
                  {!isSubmitting && <ChevronRight size={20} />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => {
  return (
    <footer className="bg-brand-dark pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <img src={ASSETS.MAXBLUE_LOGO} alt="MAXBlue" className="h-10 mb-8" referrerPolicy="no-referrer" />
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Driving industrial excellence through high-purity urea solutions. The trusted choice for long-haul carriers and municipal coasters.
            </p>
            <div className="flex gap-4">
              <span className="text-[10px] font-bold tracking-widest px-3 py-1 border border-white/10 rounded uppercase">DIN 70070</span>
              <span className="text-[10px] font-bold tracking-widest px-3 py-1 border border-white/10 rounded uppercase">EURO 6 READY</span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-brand-red">Carrier Ops</h5>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#order" className="hover:text-white transition-colors">Elite Solutions</a></li>
              <li><a href="#sustainability" className="hover:text-white transition-colors">Sustainability Hub</a></li>
              <li><a href="#order" className="hover:text-white transition-colors">Partner Network</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-brand-red">Technical Hub</h5>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#showcase" className="hover:text-white transition-colors">Visual Showcase</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Fleet Testimonials</a></li>
              <li><a href="#order" className="hover:text-white transition-colors">SDS Library</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-brand-red">Company</h5>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#sustainability" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#order" className="hover:text-white transition-colors">Contact Center</a></li>
              <li><a href="#sustainability" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6 md:gap-8">
          <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase text-center md:text-left">
            © 2026 MAXBlue™. A POWERFUL DURATECH BRAND.
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={onAdminClick}
              className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/30 uppercase hover:text-brand-red transition-all group relative px-4 py-2 border border-white/5 rounded-lg hover:border-brand-red/20 hover:bg-brand-red/5"
            >
              <Lock size={12} className="group-hover:scale-110 transition-transform group-hover:text-brand-red" />
              <span className="pb-0.5">Admin Portal</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            </button>
            <div className="flex gap-6 text-white/30">
              <Globe size={18} />
              <Zap size={18} />
              <ShieldCheck size={18} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Admin Components ---

interface Query {
  id: string;
  name: string;
  company: string;
  email: string;
  volume: string;
  requirements: string;
  timestamp: number;
}

const AdminLogin = ({ onAccess, onClose }: { onAccess: () => void, onClose: () => void }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '1214') {
      onAccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/90 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-brand-dark border border-white/10 p-6 md:p-10 rounded-[24px] md:rounded-[32px] w-full max-w-md relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-red/20 rounded-full flex items-center justify-center text-brand-red mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Secure Access</h3>
          <p className="text-white/40 text-sm">Enter administrative authorization code.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input 
              autoFocus
              type="password" 
              value={code}
              onChange={e => setCode(e.target.value)}
              className={`w-full bg-white/5 border ${error ? 'border-brand-red' : 'border-white/10'} rounded-xl px-6 py-4 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-brand-red transition-all`}
              placeholder="••••"
            />
            {error && <p className="text-brand-red text-[10px] font-bold uppercase text-center tracking-widest">Invalid Authorization Code</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button type="button" onClick={onClose} className="py-4 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-colors">Cancel</button>
            <button type="submit" className="py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-brand-red text-white hover:bg-brand-red/90 transition-colors">Authorize</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const AdminPortalView = ({ queries, onBack }: { queries: Query[], onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-red selection:text-white">
      <nav className="border-b border-white/5 py-6 px-10 flex justify-between items-center sticky top-0 bg-brand-dark/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4">
          <img src={ASSETS.MAXBLUE_LOGO} alt="MAXBlue" className="h-6" referrerPolicy="no-referrer" />
          <div className="h-4 w-px bg-white/10"></div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">Admin Console</span>
        </div>
        <button 
          onClick={onBack}
          className="text-[10px] font-bold tracking-widest uppercase px-6 py-2 border border-white/10 rounded-full hover:bg-white hover:text-brand-dark transition-all"
        >
          Exit Console
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Logistics Queries.</h1>
            <p className="text-white/40">Real-time procurement inquiries from the global carrier network.</p>
          </div>
          <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-center w-full md:w-auto">
            <div className="text-brand-red text-2xl font-bold">{queries.length}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Total Active</div>
          </div>
        </div>

        {queries.length === 0 ? (
          <div className="py-40 text-center border border-dashed border-white/10 rounded-[40px]">
            <div className="text-white/20 mb-6"><Globe size={48} className="mx-auto" /></div>
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">No active inquiries detected in the system.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {queries.map(q => (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-brand-red/30 transition-colors group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        {q.volume} Units
                      </span>
                      <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                        {new Date(q.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-brand-red transition-colors">{q.name}</h3>
                      <p className="text-white/60 font-medium">{q.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-brand-red text-sm font-bold">
                      <Globe size={14} />
                      {q.email}
                    </div>
                  </div>
                  <div className="md:max-w-md w-full">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Requirements</div>
                    <div className="bg-brand-dark/50 p-6 rounded-2xl border border-white/5 text-sm text-white/70 leading-relaxed italic">
                      "{q.requirements || 'No additional requirements specified.'}"
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'site' | 'admin'>('site');
  const [queries, setQueries] = useState<Query[]>([]);
  const [showLogin, setShowLogin] = useState(false);

  const addQuery = (data: any) => {
    const newQuery: Query = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setQueries(prev => [newQuery, ...prev]);
  };

  if (view === 'admin') {
    return <AdminPortalView queries={queries} onBack={() => setView('site')} />;
  }

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <TechnologySection />
        <StatsSection />
        <Showcase />
        <Sustainability />
        <Testimonials />
        <OrderPortal onSubmit={addQuery} />
      </main>
      <Footer onAdminClick={() => setShowLogin(true)} />
      {showLogin && <AdminLogin onAccess={() => { setView('admin'); setShowLogin(false); }} onClose={() => setShowLogin(false)} />}
    </div>
  );
}
