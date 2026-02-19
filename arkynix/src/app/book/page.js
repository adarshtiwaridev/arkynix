"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

// 1. Define the Validation Schema (Senior Dev approach)
const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(), // Not mandatory
});

export default function ContactValidated() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    setIsSuccess(true);
    
    // Reset form and success state
    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 5000);
  };

  return (
    <section className="bg-background text-foreground transition-colors duration-300 py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT: INFO SECTION */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Get in <span className="text-red-600">touch</span>
            </h1>
            <p className="text-foreground/60 max-w-md leading-relaxed">
              We're here to help you scale your digital infrastructure. 
              Our team usually responds within 2 hours.
            </p>
          </div>

          <div className="space-y-6">
            <ContactInfo icon={<Mail />} title="Email" detail="hello@arkynix.com" />
            <ContactInfo icon={<Phone />} title="Mobile" detail="+91 88813 61999" />
            <ContactInfo icon={<MapPin />} title="Location" detail="Innovation Hub, Tech City" />
          </div>
        </div>

        {/* RIGHT: FORM WITH VALIDATION */}
        <div className="relative bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputGroup 
                    label="Full Name" 
                    placeholder="Arkyn Admin"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                  <InputGroup 
                    label="Mobile Number" 
                    placeholder="9876543210"
                    error={errors.mobile?.message}
                    {...register("mobile")}
                  />
                </div>

                <InputGroup 
                  label="Email Address" 
                  type="email" 
                  placeholder="ops@arkynix.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Operational Domain</label>
                  <select 
                    {...register("service")}
                    className={`w-full bg-background border rounded-xl p-4 text-sm outline-none transition-all appearance-none cursor-pointer ${errors.service ? 'border-red-500' : 'border-border focus:border-red-600'}`}
                  >
                    <option value="">Select Service</option>
                    <option value="ai-agent">AI Agent</option>
                    <option value="chat-agent">Chat Agent</option>
                    <option value="web-dev">Web Development</option>
                    <option value="software">Software Architecture</option>
                  </select>
                  {errors.service && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.service.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Project Brief (Optional)</label>
                  <textarea 
                    {...register("message")}
                    rows={3} 
                    className="w-full bg-background border border-border rounded-xl p-4 text-sm outline-none focus:border-red-600 transition-all resize-none"
                    placeholder="Tell us what you're building..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? "Initializing..." : "Execute Transmission"}
                  <Send size={16} />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Handshake Verified</h3>
                <p className="text-foreground/60 text-sm">Your inquiry has been logged. Resetting in 5s...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* REUSABLE INPUT COMPONENT */
const InputGroup = React.forwardRef(({ label, error, ...props }, ref) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">{label}</label>
    <div className="relative">
      <input 
        ref={ref}
        {...props}
        className={`w-full bg-background border rounded-xl p-4 text-sm outline-none transition-all ${error ? 'border-red-500' : 'border-border focus:border-red-600'}`}
      />
      {error && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
          <AlertCircle size={16} />
        </div>
      )}
    </div>
    {error && <p className="text-[10px] text-red-500 font-bold uppercase">{error}</p>}
  </div>
));

function ContactInfo({ icon, title, detail }) {
  return (
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-xl bg-red-600/5 text-red-600 flex items-center justify-center">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">{title}</p>
        <p className="font-bold">{detail}</p>
      </div>
    </div>
  );
}