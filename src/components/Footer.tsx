"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import ConsoleClock from "./ConsoleClock";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:abirashrafulislamabir@gmail.com",
  },
];

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className="pt-20 pb-10 border-t bg-background relative overflow-hidden"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute bottom-0 left-[8%] w-72 h-72 bg-accent/4 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-[12%] w-64 h-64 bg-accent-purple/4 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Main three-column grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b"
          style={{ borderColor: "var(--border)" }}
        >

          {/* ── Col 1 — Brand (col-span-4) ── */}
          <div className="md:col-span-4 space-y-5">
            {/* Logo */}
            <a
              href="#home"
              className="inline-flex items-center gap-0.5 font-mono font-black tracking-widest text-lg hover:opacity-90 transition-opacity"
            >
              <span className="text-foreground">&lt;&nbsp;AKASH</span>
              <span className="text-accent">&nbsp;/&gt;</span>
            </a>

            {/* Tagline */}
            <p className="text-xs text-secondary leading-relaxed max-w-xs font-mono">
              Frontend Engineer &amp; React Developer. Building premium web
              experiences from Dhaka, Bangladesh.
            </p>

            {/* Online status */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-accent font-mono">
                Available for contracts
              </span>
            </div>
          </div>

          {/* ── Col 2 — Navigation (col-span-3) ── */}
          <div className="md:col-span-3 space-y-5">
            <h5 className="text-[10px] font-bold font-mono tracking-widest text-foreground uppercase">
              Navigation
            </h5>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-mono text-secondary">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 3 — Console Status (col-span-5) ── */}
          <div className="md:col-span-5 space-y-5">
            <h5 className="text-[10px] font-bold font-mono tracking-widest text-foreground uppercase">
              Console Status
            </h5>

            {/* Terminal-style wrapper */}
            <div className="bg-card/60 border border-white/[0.06] rounded-xl overflow-hidden">
              {/* Traffic-light bar */}
              <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/[0.04]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-auto text-[9px] font-mono text-secondary/50 tracking-wider">
                  terminal — akash@portfolio
                </span>
              </div>
              {/* Clock content */}
              <div className="p-4">
                <ConsoleClock />
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-secondary font-mono">

          {/* Copyright */}
          <p>
            &copy; {year} Ashraful Islam Akash. All rights reserved.
          </p>

          {/* Socials + Scroll-to-top */}
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="text-secondary hover:text-accent transition-colors duration-200"
              >
                <Icon size={14} />
              </a>
            ))}

            {/* Divider */}
            <span className="w-px h-4 bg-border" />

            {/* Scroll to top */}
            <button
              onClick={handleScrollToTop}
              aria-label="Scroll to top"
              className="flex items-center justify-center w-7 h-7 rounded border border-border text-secondary hover:text-accent hover:border-accent/30 transition-all duration-200 cursor-pointer"
            >
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}