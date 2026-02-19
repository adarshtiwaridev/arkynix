"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ArkynixHome() {
  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      
      {/* --- HERO SECTION: TEXT OVER VIDEO --- */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Simple Overlapping Text */}
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white"
          >
            ARKYN<span className="text-red-600">IX</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 mt-4 text-lg md:text-xl font-medium max-w-xl mx-auto"
          >
            A simple agency building powerful AI agents and modern websites.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/contact">
              <button className="mt-8 bg-red-600 text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition-all flex items-center gap-2 mx-auto uppercase text-sm shadow-lg shadow-red-600/20">
                Get Connected <ArrowRight size={16} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- WHY CHOOSE US: MINIMALIST TEXT GRID --- */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <header className="mb-16">
          <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">Our Advantage</span>
          <h2 className="text-4xl font-black uppercase tracking-tight mt-2">
            Why Choose <span className="text-red-600">Us</span>
          </h2>
        </header>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          <ReasonItem 
            num="01" 
            title="AI Agent Building" 
            text="We build smart AI agents that help automate your business tasks and chat with customers 24/7." 
          />
          <ReasonItem 
            num="02" 
            title="Modern Websites" 
            text="Simple, fast, and clean websites built to work perfectly on mobile and desktop." 
          />
          <ReasonItem 
            num="03" 
            title="Custom Software" 
            text="Tools and software designed specifically for your team to make work easier." 
          />
          <ReasonItem 
            num="04" 
            title="Constant Support" 
            text="We stay with you after the project is done to make sure everything runs smoothly." 
          />
        </div>
      </section>

      {/* --- SIMPLE IMAGE SECTION --- */}
      <section className="py-20 bg-card/20 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-2xl">
            <Image 
              src="/agency-work.jpg" 
              alt="Arkynix Projects" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
              We build with <br /> <span className="text-red-600">Purpose.</span>
            </h2>
            <p className="opacity-70 text-lg leading-relaxed">
              Arkynix focuses on delivering clean results. No fluff, just code and design that helps your business grow in the digital age.
            </p>
            <ul className="space-y-3">
              {['Fast Delivery', 'High Performance', 'Scalable Code'].map((item) => (
                <li key={item} className="flex items-center gap-2 font-bold uppercase text-xs">
                  <CheckCircle2 size={16} className="text-red-600" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="py-32 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
            Ready to <span className="text-red-600">Work?</span>
          </h2>
          <Link href="/contact">
            <button className="bg-foreground text-background px-12 py-5 rounded-md font-bold uppercase text-sm hover:opacity-90 transition-all shadow-xl">
              Contact Us Now
            </button>
          </Link>
        </motion.div>
      </section>

    </div>
  );
}

/* --- REUSABLE HELPER COMPONENTS --- */

function ReasonItem({ num, title, text }) {
  return (
    <div className="group space-y-3">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono font-bold text-red-600 bg-red-600/10 px-2 py-1 rounded">
          {num}
        </span>
        <h3 className="text-xl font-bold uppercase tracking-tight">{title}</h3>
      </div>
      <p className="opacity-60 text-sm leading-relaxed group-hover:opacity-100 transition-opacity">
        {text}
      </p>
    </div>
  );
}