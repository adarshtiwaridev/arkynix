"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  User,
  MessageSquare,
  Sparkles,
  Calendar
} from "lucide-react";

/* ================= VALIDATION ================= */

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

/* ================= SERVICE DATA ================= */

const services = [
  {
    category: "AI Solutions",
    options: [
      { label: "AI Automation Agent", value: "ai-agent" },
      { label: "AI Chat Agent", value: "chat-agent" },
      { label: "AI Voice Agent", value: "voice-agent" },
      { label: "Custom AI Model", value: "custom-ai" },
    ],
  },
  {
    category: "Web Development",
    options: [
      { label: "Portfolio Website", value: "portfolio" },
      { label: "Business Website", value: "business" },
      { label: "E-Commerce Platform", value: "ecommerce" },
      { label: "SaaS Application", value: "saas" },
    ],
  },
  {
    category: "Mobile Development",
    options: [
      { label: "Android Application", value: "android" },
      { label: "iOS Application", value: "ios" },
      { label: "Cross Platform App", value: "cross" },
    ],
  },
  {
    category: "Cloud & DevOps",
    options: [
      { label: "Cloud Infrastructure", value: "cloud" },
      { label: "System Design", value: "system-design" },
      { label: "DevOps Setup", value: "devops" },
    ],
  },
];

/* ================= MAIN COMPONENT ================= */

export default function BookingPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      setError(null);
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          mobile: data.mobile,
          service: data.service,
          message: data.message,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit booking");
      
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 5000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 px-6 border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Let's Build Something
              <br />
              <span className="gradient-text">Amazing Together</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we'll get back to you within 2 hours
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section-padding px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">

            {/* LEFT SIDE - INFO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Why Choose <span className="gradient-text">Arkynix</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We help you build scalable digital systems with cutting-edge technology 
                  and proven methodologies. Expect a response within 2 hours.
                </p>
              </div>

              <div className="space-y-4">
                <ContactInfo 
                  icon={<Mail className="w-5 h-5" />} 
                  title="Email" 
                  detail="hello@arkynix.com" 
                  href="mailto:hello@arkynix.com"
                />
                <ContactInfo 
                  icon={<Phone className="w-5 h-5" />} 
                  title="Mobile" 
                  detail="+91 88813 61999" 
                  href="tel:+918881361999"
                />
                <ContactInfo 
                  icon={<MapPin className="w-5 h-5" />} 
                  title="Location" 
                  detail="Innovation Hub, Tech City" 
                />
              </div>

              {/* Features */}
              <div className="pt-8 border-t border-border">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  What to Expect
                </h3>
                <div className="space-y-3">
                  {[
                    "Response within 2 hours",
                    "Free consultation call",
                    "Custom project proposal",
                    "Transparent pricing"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - FORM */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="premium-card relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        {/* Name & Mobile */}
                        <div className="grid sm:grid-cols-2 gap-6">
                          <InputGroup
                            label="Full Name"
                            icon={<User className="w-4 h-4" />}
                            placeholder="John Doe"
                            error={errors.fullName?.message}
                            {...register("fullName")}
                          />
                          <InputGroup
                            label="Mobile Number"
                            icon={<Phone className="w-4 h-4" />}
                            placeholder="9876543210"
                            error={errors.mobile?.message}
                            {...register("mobile")}
                          />
                        </div>

                        {/* Email */}
                        <InputGroup
                          label="Email Address"
                          type="email"
                          icon={<Mail className="w-4 h-4" />}
                          placeholder="john@example.com"
                          error={errors.email?.message}
                          {...register("email")}
                        />

                        {/* Service Dropdown */}
                        <ServiceDropdown
                          setValue={setValue}
                          error={errors.service?.message}
                        />

                        {/* Message */}
                        <TextareaGroup
                          label="Project Brief (Optional)"
                          icon={<MessageSquare className="w-4 h-4" />}
                          placeholder="Tell us about your project..."
                          {...register("message")}
                        />

                        {/* Error Message */}
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                          >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-medium">{error}</span>
                          </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Request</span>
                              <Send className="w-5 h-5" />
                            </>
                          )}
                        </button>

                        <p className="text-xs text-center text-muted-foreground">
                          By submitting, you agree to our Terms of Service and Privacy Policy
                        </p>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16 space-y-6"
                      >
                        <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/20 flex items-center justify-center mx-auto">
                          <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black mb-2">
                            Request Submitted!
                          </h3>
                          <p className="text-muted-foreground">
                            Thank you for reaching out. We'll get back to you within 2 hours.
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <Sparkles className="w-4 h-4 text-accent" />
                          <span>Check your email for confirmation</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="py-16 px-6 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2 Hours", label: "Response Time" },
              { value: "50+", label: "Happy Clients" },
              { value: "99.9%", label: "Success Rate" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-black gradient-text mb-2">
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
    </main>
  );
}

/* ================= CUSTOM DROPDOWN ================= */

function ServiceDropdown({ setValue, error }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const ref = useRef();

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSelect = (value, label) => {
    setSelected(label);
    setValue("service", value);
    setOpen(false);
  };

  return (
    <div className="space-y-2 relative" ref={ref}>
      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-accent" />
        Service Required
      </label>

      <div
        onClick={() => setOpen(!open)}
        className={`input-modern cursor-pointer flex justify-between items-center ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
        }`}
      >
        <span className={selected ? "text-foreground" : "text-muted-foreground"}>
          {selected || "Select a service"}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full bg-card border border-border rounded-xl mt-2 max-h-80 overflow-y-auto shadow-xl z-50 scrollbar-thin"
          >
            {services.map((group, idx) => (
              <div key={idx} className="p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-2">
                  {group.category}
                </p>
                {group.options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value, option.label)}
                    className="p-3 rounded-lg text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all font-medium"
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ================= INPUT COMPONENTS ================= */

const InputGroup = React.forwardRef(({ label, icon, error, ...props }, ref) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
      {icon && <span className="text-accent">{icon}</span>}
      {label}
    </label>
    <input
      ref={ref}
      {...props}
      className={`input-modern ${
        error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
      }`}
    />
    {error && (
      <p className="text-xs text-red-500 font-medium flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
));

InputGroup.displayName = "InputGroup";

const TextareaGroup = React.forwardRef(({ label, icon, ...props }, ref) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
      {icon && <span className="text-accent">{icon}</span>}
      {label}
    </label>
    <textarea
      ref={ref}
      rows={4}
      {...props}
      className="input-modern resize-none"
    />
  </div>
));

TextareaGroup.displayName = "TextareaGroup";

function ContactInfo({ icon, title, detail, href }) {
  const content = (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all group">
      <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">
          {title}
        </p>
        <p className="font-semibold text-foreground">{detail}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}
