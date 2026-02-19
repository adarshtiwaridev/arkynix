"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Facebook, Twitter, Instagram, Linkedin, Send, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: ['Solutions', 'Features', 'Security', 'Pricing'],
    Resources: ['Documentation', 'API Reference', 'Community', 'Status'],
    Company: ['About Arkynix', 'Our Vision', 'Contact', 'Blog'],
  };

  return (
    <footer className="w-full bg-background text-foreground border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2.5 bg-red-600 rounded-xl shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform">
                <Rocket className="text-white" size={24} />
              </div>
              <span className="font-black text-2xl tracking-tighter uppercase">
                ARKYN<span className="text-red-600">IX</span>
              </span>
            </div>
            
            <p className="text-foreground/60 max-w-sm text-sm leading-relaxed">
              Arkynix is a premium digital infrastructure platform designed for speed, security, and bold visual identity. 
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-card border border-border text-foreground/50 hover:text-red-600 hover:border-red-600/50 transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-red-600">
                  {title}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-foreground/60 hover:text-red-600 transition-colors text-sm font-medium">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Premium Newsletter Card */}
          <div className="lg:col-span-3">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck size={80} className="text-red-600" />
              </div>
              
              <h3 className="font-bold text-sm uppercase tracking-widest text-foreground">
                Stay Ahead
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Get the latest tech updates from the Arkynix engineering team.
              </p>
              
              <div className="relative mt-4">
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full bg-background border border-border rounded-lg py-2.5 px-4 outline-none focus:border-red-600 transition-all text-xs"
                />
                <button className="absolute right-1.5 top-1.5 p-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
            <a href="#" className="hover:text-red-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-red-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-red-600 transition-colors">Cookies</a>
          </div>
          
          <p className="text-xs text-foreground/40 font-medium">
            © {currentYear} <span className="text-foreground">Arkynix</span> Labs. All rights reserved.
          </p>
        </div>
      </div>

      {/* Modern Gradient Floor */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-600/40 to-transparent"></div>
    </footer>
  );
};

export default Footer;