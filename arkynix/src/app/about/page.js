"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const AboutPage = () => {
  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const sections = [
    {
      tag: "01. Vision",
      title: "Architecting the future of digital speed.",
      description: "At Arkynix, we don't just develop; we engineer. Our mission is to bridge the gap between complex infrastructure and seamless user experiences."
    },
    {
      tag: "02. Strategy",
      title: "Data-driven design meets bold aesthetics.",
      description: "Every pixel serves a purpose. We combine high-frequency performance with a visual identity that commands attention and builds trust."
    },
    {
      tag: "03. Growth",
      title: "Scalability is not an option—it's a core requirement.",
      description: "We build systems that grow with you. From startup prototypes to enterprise-grade deployments, Arkynix is built for the long game."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-red-600 selection:text-white">
      
      {/* --- HERO: BOLD TYPOGRAPHY --- */}
      <section className="px-6 pt-32 pb-20 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-[12vw] md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase">
            ARKYN<span className="text-red-600">IX</span><br />
            <span className="text-foreground/20 italic">SYSTEMS</span>
          </h1>
          
          <div className="mt-12 flex flex-col md:flex-row justify-between items-start gap-8">
            <p className="text-xl md:text-2xl font-medium max-w-xl leading-relaxed">
              We provide the digital backbone for modern innovators. 
              High-performance infrastructure wrapped in a bold, 
              minimalist interface.
            </p>
            <div className="text-red-600 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-12 h-[2px] bg-red-600"></span>
              Est. 2026
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- CLEAN CONTENT: NO CARDS --- */}
      <section className="px-6 py-32 border-t border-border">
        <div className="max-w-7xl mx-auto">
          {sections.map((item, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="group flex flex-col md:grid md:grid-cols-12 py-16 border-b border-border last:border-0 hover:bg-red-600/[0.02] transition-colors px-4"
            >
              {/* Index Tag */}
              <div className="md:col-span-2 text-red-600 font-mono text-sm mb-4 md:mb-0">
                {item.tag}
              </div>

              {/* Title */}
              <div className="md:col-span-6">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {item.title}
                </h2>
              </div>

              {/* Description */}
              <div className="md:col-span-4 flex flex-col justify-between">
                <p className="text-foreground/60 leading-relaxed mb-8">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- BIG CALL TO ACTION --- */}
      <section className="px-6 py-40 bg-foreground text-background dark:bg-red-600 dark:text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10">
            Ready to <br />Build with us?
          </h2>
          <button className="px-12 py-5 bg-background text-foreground dark:bg-white dark:text-red-600 rounded-full font-black text-lg uppercase hover:scale-105 transition-transform shadow-2xl">
            Initialize Project
          </button>
        </div>
        
        {/* Decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black opacity-[0.03] select-none pointer-events-none">
          ARKYNIX
        </div>
      </section>
    </main>
  );
};

export default memo(AboutPage);