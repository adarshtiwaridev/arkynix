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
    ],
  },
  {
    category: "Web Development",
    options: [
      { label: "Portfolio Website", value: "portfolio" },
      { label: "Business Website", value: "business" },
      { label: "E-Commerce Platform", value: "ecommerce" },
    ],
  },
  {
    category: "App Development",
    options: [
      { label: "Android Application", value: "android" },
      { label: "iOS Application", value: "ios" },
      { label: "Cross Platform App", value: "cross" },
    ],
  },
  {
    category: "Software Architecture",
    options: [
      { label: "System Design", value: "system-design" },
      { label: "Cloud Infrastructure", value: "cloud" },
      { label: "DevOps Setup", value: "devops" },
    ],
  },
];

/* ================= MAIN COMPONENT ================= */

export default function ContactValidated() {
  const [isSuccess, setIsSuccess] = useState(false);

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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    const contact = await fetch("/api/booking", {
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
    
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 4000);
  };

  return (
    <section className="bg-background text-foreground py-20 px-5 md:px-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">

        {/* LEFT SIDE */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              Get in <span className="text-red-600">Touch</span>
            </h1>
            <p className="text-sm md:text-base text-foreground/60 mt-3 max-w-md">
              We help you build scalable digital systems. Expect response within 2 hours.
            </p>
          </div>

          <div className="space-y-5">
            <ContactInfo icon={<Mail />} title="Email" detail="hello@arkynix.com" />
            <ContactInfo icon={<Phone />} title="Mobile" detail="+91 88813 61999" />
            <ContactInfo icon={<MapPin />} title="Location" detail="Innovation Hub, Tech City" />
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputGroup
                    label="Full Name"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                  <InputGroup
                    label="Mobile Number"
                    error={errors.mobile?.message}
                    {...register("mobile")}
                  />
                </div>

                <InputGroup
                  label="Email Address"
                  type="email"
                  error={errors.email?.message}
                  {...register("email")}
                />

                {/* CUSTOM DROPDOWN */}
                <ServiceDropdown
                  setValue={setValue}
                  error={errors.service?.message}
                />

                <TextareaGroup
                  label="Project Brief (Optional)"
                  {...register("message")}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
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
                className="text-center py-12 space-y-4"
              >
                <CheckCircle size={40} className="mx-auto text-green-500" />
                <h3 className="text-xl font-black uppercase">
                  Handshake Verified
                </h3>
                <p className="text-sm text-foreground/60">
                  Your inquiry has been logged successfully.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
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
      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">
        Operational Domain
      </label>

      <div
        onClick={() => setOpen(!open)}
        className={`w-full border rounded-xl p-4 text-sm flex justify-between items-center cursor-pointer ${
          error ? "border-red-500" : "border-border"
        }`}
      >
        {selected || "Select Service"}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute w-full bg-background border border-border rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg z-50"
          >
            {services.map((group, idx) => (
              <div key={idx} className="p-3">
                <p className="text-xs font-bold opacity-50 uppercase mb-2">
                  {group.category}
                </p>
                {group.options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() =>
                      handleSelect(option.value, option.label)
                    }
                    className="p-2 rounded-lg text-sm hover:bg-red-600 hover:text-white cursor-pointer transition-all"
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
        <p className="text-[10px] text-red-500 font-bold uppercase">
          {error}
        </p>
      )}
    </div>
  );
}

/* ================= INPUT COMPONENTS ================= */

const InputGroup = React.forwardRef(({ label, error, ...props }, ref) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">
      {label}
    </label>
    <input
      ref={ref}
      {...props}
      className={`w-full border rounded-xl p-4 text-sm outline-none ${
        error ? "border-red-500" : "border-border focus:border-red-600"
      }`}
    />
    {error && (
      <p className="text-[10px] text-red-500 font-bold uppercase">
        {error}
      </p>
    )}
  </div>
));

function TextareaGroup({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">
        {label}
      </label>
      <textarea
        rows={3}
        {...props}
        className="w-full border border-border rounded-xl p-4 text-sm outline-none focus:border-red-600 resize-none"
      />
    </div>
  );
}

function ContactInfo({ icon, title, detail }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
          {title}
        </p>
        <p className="font-semibold">{detail}</p>
      </div>
    </div>
  );
}