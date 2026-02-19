"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Rocket, Calendar } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!mounted) return <div className="h-20 bg-background" />;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
   
    { name: "Contact", href: "/contact" },
    { name: " Our Team", href: "/team" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="p-2 bg-red-600 rounded-xl shadow-lg shadow-red-600/20"
            >
              <Rocket className="text-white" size={20} />
            </motion.div>
            <span className="text-xl font-black tracking-tighter text-foreground uppercase">
              Arkyn<span className="text-red-600">ix</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-red-600 dark:hover:text-red-500 transition-colors rounded-lg hover:bg-foreground/5"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-border bg-card text-foreground hover:border-red-500/50 transition-all active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} />}
            </button>

            {/* Desktop Book Button */}
            <Link href="/book" className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-600/20 active:scale-95">
              <Calendar size={16} />
              <span>Book Now</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-foreground hover:bg-foreground/5 rounded-lg" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-semibold text-foreground hover:text-red-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-border" />
              <Link 
                href="/book"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-red-600 text-white font-bold rounded-xl"
              >
                <Calendar size={20} />
                Book an Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}