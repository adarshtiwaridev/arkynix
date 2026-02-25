"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Sparkles, 
  Code, 
  Smartphone, 
  Cloud, 
  Brain,
  Zap,
  Shield,
  ArrowRight,
  Check
} from 'lucide-react';

const PremiumServices = () => {
  const [activeTier, setActiveTier] = useState(1);
  const [openService, setOpenService] = useState(null);

  const tiers = ["Startup", "Business", "Enterprise"];

  const services = [
    {
      id: "ai-solutions",
      icon: <Brain className="w-6 h-6" />,
      title: "AI Solutions",
      tag: "Intelligence",
      shortDesc: "Transform your business with intelligent automation and AI-powered workflows",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      details: {
        description: "Moving beyond simple chatbots into fully autonomous agentic workflows that integrate with your core business logic. Our AI solutions learn, adapt, and scale with your organization.",
        features: [
          { name: "Voice Synthesis", desc: "Human-grade auditory engagement with natural language processing" },
          { name: "Logic Automation", desc: "Cross-platform task execution with intelligent decision making" },
          { name: "Predictive Analytics", desc: "Data-driven foresight powered by machine learning" },
          { name: "Custom AI Models", desc: "Tailored solutions trained on your specific data" }
        ],
        benefits: [
          "Reduce operational costs by up to 60%",
          "24/7 automated customer support",
          "Real-time data insights and predictions",
          "Seamless integration with existing systems"
        ]
      }
    },
    {
      id: "web-development",
      icon: <Code className="w-6 h-6" />,
      title: "Web Development",
      tag: "Development",
      shortDesc: "High-performance web applications built for scale and speed",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
      details: {
        description: "Engineered for performance. We build high-load systems that feel weightless to the end user. From landing pages to complex SaaS platforms, we deliver excellence.",
        features: [
          { name: "Full-Stack SaaS", desc: "Scalable cloud-native applications with modern architecture" },
          { name: "E-Commerce Platforms", desc: "High-converting online stores with seamless checkout" },
          { name: "Performance SEO", desc: "Dominate search rankings with lightning-fast load times" },
          { name: "Progressive Web Apps", desc: "App-like experiences that work offline" }
        ],
        benefits: [
          "99.9% uptime guarantee",
          "Sub-second page load times",
          "Mobile-first responsive design",
          "SEO optimized from day one"
        ]
      }
    },
    {
      id: "mobile-apps",
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Applications",
      tag: "Mobile",
      shortDesc: "Native and cross-platform apps that users love",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
      details: {
        description: "Create stunning mobile experiences that engage users and drive conversions. We build for iOS, Android, and cross-platform using the latest technologies.",
        features: [
          { name: "Native iOS & Android", desc: "Platform-specific apps for optimal performance" },
          { name: "Cross-Platform", desc: "React Native & Flutter for faster deployment" },
          { name: "App Store Optimization", desc: "Maximize visibility and downloads" },
          { name: "Push Notifications", desc: "Re-engage users with targeted messaging" }
        ],
        benefits: [
          "Faster time to market",
          "Consistent UX across platforms",
          "Offline functionality",
          "App store submission support"
        ]
      }
    },
    {
      id: "cloud-infrastructure",
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Infrastructure",
      tag: "DevOps",
      shortDesc: "Scalable, secure cloud solutions that grow with your business",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      details: {
        description: "Build on a foundation that scales. We architect cloud infrastructure that's secure, reliable, and cost-effective using AWS, Azure, and Google Cloud.",
        features: [
          { name: "Cloud Migration", desc: "Seamless transition from on-premise to cloud" },
          { name: "Auto-Scaling", desc: "Handle traffic spikes without manual intervention" },
          { name: "Security & Compliance", desc: "Enterprise-grade security with SOC 2 compliance" },
          { name: "CI/CD Pipelines", desc: "Automated deployment and testing workflows" }
        ],
        benefits: [
          "Reduce infrastructure costs by 40%",
          "99.99% availability SLA",
          "Automated backups and disaster recovery",
          "24/7 monitoring and support"
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* HEADER SECTION */}
      <section className="section-padding px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Premium Services</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                End-to-end digital solutions designed for scale, security, and speed
              </p>
            </motion.div>
            
            {/* TIER SELECTOR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex bg-card border border-border p-1.5 rounded-2xl shadow-sm"
            >
              {tiers.map((tier, i) => (
                <button
                  key={tier}
                  onClick={() => setActiveTier(i)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                    activeTier === i 
                      ? "bg-accent text-accent-foreground shadow-md" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID - PREMIUM CARDS */}
      <section className="section-padding px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="premium-card h-full cursor-pointer" onClick={() => setOpenService(openService === service.id ? null : service.id)}>
                  {/* Card Header with Image */}
                  <div className="relative h-48 -m-6 mb-6 rounded-t-2xl overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute bottom-4 left-4 w-14 h-14 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shadow-lg">
                      {service.icon}
                    </div>
                    
                    {/* Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-border text-xs font-bold uppercase tracking-wider">
                        {service.tag}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Expand Button */}
                    <button 
                      className="flex items-center gap-2 text-accent font-semibold text-sm group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenService(openService === service.id ? null : service.id);
                      }}
                    >
                      <span>{openService === service.id ? 'Show Less' : 'Learn More'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openService === service.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* EXPANDED CONTENT */}
                  <AnimatePresence>
                    {openService === service.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-border space-y-6">
                          <p className="text-foreground/80 leading-relaxed">
                            {service.details.description}
                          </p>

                          {/* Features */}
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                              Key Features
                            </h4>
                            <div className="grid gap-3">
                              {service.details.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                  <Zap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                  <div>
                                    <div className="font-semibold text-sm mb-1">{feature.name}</div>
                                    <div className="text-xs text-muted-foreground">{feature.desc}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Benefits */}
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                              Benefits
                            </h4>
                            <div className="grid gap-2">
                              {service.details.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="pt-4">
                            <a 
                              href="/book"
                              className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                              Request Pricing for {tiers[activeTier]}
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BANNER */}
      <section className="py-16 px-6 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield />, title: "Enterprise Security", desc: "Bank-grade encryption & compliance" },
              { icon: <Zap />, title: "Lightning Fast", desc: "Optimized for peak performance" },
              { icon: <Sparkles />, title: "Future-Proof", desc: "Built with latest technologies" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                  {React.cloneElement(item.icon, { className: "w-7 h-7" })}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Ready to Get <span className="gradient-text">Started?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss your project and create a custom solution that fits your needs
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/book" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/contact" className="btn-secondary text-lg px-8 py-4">
                  Contact Sales
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PremiumServices;
