"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const nav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    window.scrollTo({ top: href === "#home" ? 0 : (el as HTMLElement).offsetTop - 72, behavior: "smooth" });
    window.history.pushState(null, "", href);
    setActive(href.slice(1));
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/85 backdrop-blur-md border-b border-border"
          : "py-5 bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">
        {/* Logo */}
        <a href="#home" onClick={(e) => { e.preventDefault(); nav("#home"); }}
          className="flex items-center gap-2 shrink-0 group">
          <span className="w-8 h-8 rounded-lg bg-gradient-neon flex items-center justify-center text-background font-black text-sm font-mono">
            A
          </span>
          <span className="font-mono font-bold text-sm text-foreground group-hover:text-accent transition-colors">
            akash<span className="text-accent">.</span>dev
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {links.map(({ label, href }) => {
            const isActive = active === href.slice(1);
            return (
              <a key={href} href={href}
                onClick={(e) => { e.preventDefault(); nav(href); }}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-accent bg-accent/8"
                    : "text-secondary hover:text-foreground hover:bg-white/[0.04]"
                }`}>
                {label}
              </a>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="hidden lg:flex items-center gap-2 ml-auto shrink-0">
          <button onClick={toggleTheme} aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 hover:border-accent/40 hover:text-accent text-secondary"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <AnimatePresence mode="wait">
              {theme === "dark"
                ? <motion.div key="sun" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}><Sun size={15} /></motion.div>
                : <motion.div key="moon" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}><Moon size={15} /></motion.div>
              }
            </AnimatePresence>
          </button>

          <a href="#contact" onClick={(e) => { e.preventDefault(); nav("#contact"); }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-background bg-gradient-neon hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5"
            style={{ boxShadow: "0 4px 16px rgba(34,211,238,0.2)" }}>
            <Briefcase size={14} />
            Hire Me
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 ml-auto lg:hidden">
          <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl border text-secondary"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button onClick={() => setOpen(!open)} className="w-9 h-9 flex items-center justify-center rounded-xl text-secondary hover:text-foreground">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full inset-x-0 border-b p-4 bg-background/95 backdrop-blur-md border-border"
          >
            <div className="flex flex-col gap-1">
              {links.map(({ label, href }) => (
                <a key={href} href={href}
                  onClick={(e) => { e.preventDefault(); nav(href); }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    active === href.slice(1) ? "text-accent bg-accent/8" : "text-secondary hover:text-foreground"
                  }`}>
                  {label}
                </a>
              ))}
              <a href="#contact" onClick={(e) => { e.preventDefault(); nav("#contact"); }}
                className="mt-2 text-center py-3 rounded-xl text-sm font-semibold text-background bg-gradient-neon">
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
