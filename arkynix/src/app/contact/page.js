"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Mail,
  Phone,
  Linkedin,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  Send,
} from "lucide-react";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <span className="text-red-600 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">
            Infrastructure // Communication
          </span>
          <h1 className="text-7xl md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase">
            GET IN <br />
            <span className="text-red-600 italic">TOUCH.</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: FANCY INFO BOX */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] relative overflow-hidden group">
              {/* Decorative Red Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/5 blur-[80px] rounded-full group-hover:bg-red-600/10 transition-colors" />
              
              <h2 className="text-3xl font-bold mb-6">Let's build something <span className="text-red-600">extraordinary.</span></h2>
              <p className="text-foreground/60 leading-relaxed mb-10">
                Whether you're looking to scale your infrastructure or redefine your digital presence, the Arkynix team is ready to deploy.
              </p>

              <div className="space-y-4">
                <a
                  href="https://wa.me/918881361999"
                  className="flex items-center justify-between bg-red-600 hover:bg-red-700 text-white p-6 rounded-2xl font-bold transition-all group/btn shadow-xl shadow-red-600/10"
                >
                  <span className="flex items-center gap-3">
                    <MessageCircle size={20} /> Secure WhatsApp
                  </span>
                  <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
                
                <a
                  href="tel:+918881361999"
                  className="flex items-center justify-center gap-3 bg-foreground text-background dark:bg-white dark:text-black p-6 rounded-2xl font-bold transition-all hover:opacity-90"
                >
                  <Phone size={20} /> Request a Call
                </a>
              </div>
            </div>

            {/* SECONDARY LINKS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactLink icon={<Mail />} label="Email" value="hello@arkynix.com" href="mailto:hello@arkynix.com" />
              <ContactLink icon={<Linkedin />} label="LinkedIn" value="Arkynix Labs" href="#" />
              <ContactLink icon={<Instagram />} label="Instagram" value="@arkynix" href="#" />
              <ContactLink icon={<MapPin />} label="Region" value="Asia Pacific" href="#" />
            </div>
          </motion.div>

          {/* RIGHT: THE FANCY "MAP/INTERFACE" BOX */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 h-full"
          >
            <div className="bg-card border border-border rounded-[2.5rem] p-4 h-[600px] relative shadow-2xl overflow-hidden">
              {/* Interface Elements to make it look fancy */}
              <div className="absolute top-8 left-8 z-10 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-border" />
                <div className="w-3 h-3 rounded-full bg-border" />
              </div>

              {/* MAP IFRAME */}
              <iframe
                title="Arkynix Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8392319277!2d77.0688975472!3d28.5272803437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b71532ad50a!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full rounded-[2rem] grayscale invert-[0.9] dark:invert-0 brightness-90 opacity-80"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>

              {/* OVERLAY INTERFACE BOX */}
              <div className="absolute bottom-8 right-8 bg-background/90 backdrop-blur-xl border border-border p-6 rounded-2xl max-w-xs shadow-2xl">
                <h4 className="font-bold text-xs uppercase tracking-widest text-red-600 mb-2">Global Operations</h4>
                <p className="text-[10px] text-foreground/50 leading-relaxed uppercase">
                  Our distributed engineering team operates across multiple time zones to ensure 24/7 deployment readiness.
                </p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] font-bold">STATUS: ONLINE</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

/* REUSABLE LINK COMPONENT */
const ContactLink = ({ icon, label, value, href }) => (
  <a
    href={href}
    className="p-6 rounded-3xl border border-border bg-card/50 hover:border-red-600/30 transition-all group flex flex-col gap-4"
  >
    <div className="text-red-600 group-hover:scale-110 transition-transform duration-300">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">{label}</p>
      <p className="text-sm font-bold truncate">{value}</p>
    </div>
  </a>
);

export default ContactPage;