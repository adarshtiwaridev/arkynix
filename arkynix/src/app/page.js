"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Rocket,
  CheckCircle2,
  TrendingUp,
  Users,
  Award
} from "lucide-react";

export default function Home() {
  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Enterprise Security",
      description: "Bank-grade security protocols"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI-Powered",
      description: "Intelligent automation at scale"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "500+", label: "Projects" },
    { value: "50+", label: "Clients" },
    { value: "24/7", label: "Support" }
  ];

  const services = [
    { name: "AI Solutions", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Web Development", icon: <Rocket className="w-4 h-4" /> },
    { name: "Mobile Apps", icon: <Zap className="w-4 h-4" /> },
    { name: "Cloud Infrastructure", icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 50+ Companies Worldwide</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]"
            >
              Build The Future
              <br />
              <span className="gradient-text">With Arkynix</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Premium digital infrastructure for modern innovators. 
              We transform ideas into scalable, high-performance solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link 
                href="/book" 
                className="group btn-primary flex items-center gap-2 text-lg px-8 py-4"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/services" 
                className="btn-secondary text-lg px-8 py-4"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Feature Pills */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm"
                >
                  <span className="text-accent">{feature.icon}</span>
                  <span className="font-medium">{feature.title}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-6 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section-padding px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              What We <span className="gradient-text">Build</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end digital solutions designed for scale, security, and speed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="premium-card group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Professional solutions tailored to your needs
                </p>
                <div className="flex items-center gap-2 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Why Choose <span className="gradient-text">Arkynix</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We combine cutting-edge technology with proven methodologies to deliver 
                exceptional results that drive your business forward.
              </p>
              
              <div className="space-y-4">
                {[
                  "Enterprise-grade infrastructure",
                  "24/7 dedicated support team",
                  "Agile development process",
                  "Transparent pricing & timeline",
                  "Post-launch maintenance included"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: <TrendingUp />, title: "Growth Focused", desc: "Scalable solutions" },
                { icon: <Users />, title: "Expert Team", desc: "10+ years experience" },
                { icon: <Award />, title: "Quality First", desc: "ISO certified" },
                { icon: <Shield />, title: "Secure", desc: "Bank-grade security" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="stat-card text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                    {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                  </div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-padding px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-surface p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Ready to Build Something
                <br />
                <span className="gradient-text">Extraordinary?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss your project and create a solution that exceeds expectations
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/book" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                  Schedule a Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
