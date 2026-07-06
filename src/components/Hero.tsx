"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

const HeroVisual = dynamic(() => import("./HeroVisual"), { ssr: false });

const socials = [
  { icon: <Github size={16} />, href: "https://github.com", label: "GitHub" },
  { icon: <Linkedin size={16} />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <Mail size={16} />, href: "mailto:abirashrafulislamabir@gmail.com", label: "Email" },
];

const stats = [
  { value: "3+", label: "Years Exp." },
  { value: "18+", label: "Projects" },
  { value: "100%", label: "Satisfaction" },
];

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 72, behavior: "smooth" });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 18 } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated canvas background */}
      <HeroVisual />

      {/* Dark/Light vignette */}
      <div className="absolute inset-0 pointer-events-none animate-fade-in"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, var(--background) 100%)",
          zIndex: 2,
        }} />

      <div className="relative w-full max-w-7xl mx-auto px-6 pt-24 pb-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── LEFT: Text content ── */}
          <motion.div
            variants={container} initial="hidden" animate="show"
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Status badge */}
            <motion.div variants={item}>
              <span className="section-tag">
                <span className="ping-dot" />
                Available for new projects
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item} className="space-y-1">
              <p className="text-secondary font-mono text-sm font-medium tracking-wide">
                Hi, I&apos;m —
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-shimmer">
                Ashraful Islam<br />Akash
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-8 bg-accent/60" />
                <span className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-accent">
                  Frontend Engineer & React Developer
                </span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p variants={item}
              className="text-secondary text-[15px] leading-[1.8] max-w-xl">
              I build premium, high-performance web applications that blend clean architecture
              with beautiful design. Specialized in React, Next.js, and the MERN stack —
              delivering interfaces that{" "}
              <span className="text-foreground font-medium">feel as good as they look</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <button onClick={() => scrollTo("#projects")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-background bg-gradient-neon hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: "0 8px 24px rgba(34,211,238,0.22)" }}>
                View Projects
                <ArrowRight size={15} />
              </button>
              <button onClick={() => scrollTo("#contact")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground border border-border bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50">
                Contact Me
              </button>
              <a href="/resume.pdf" target="_blank"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-secondary border border-border bg-card/60 backdrop-blur-md transition-all duration-300 hover:text-accent hover:-translate-y-0.5 hover:border-accent/40">
                <Download size={14} />
                Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="flex items-center gap-8 pt-2">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-black font-mono text-gradient">{s.value}</p>
                  <p className="text-[10px] font-mono text-secondary uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              ))}
              <div className="h-8 w-px bg-white/[0.08] mx-2" />
              {/* Social icons */}
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    title={s.label}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border text-secondary hover:text-accent hover:border-accent/40 transition-all duration-200"
                    style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Profile photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 60, damping: 18 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute -inset-8 rounded-3xl blur-3xl opacity-20"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-purple))" }} />

              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-2xl opacity-30"
                style={{
                  background: "conic-gradient(from 0deg, var(--accent), var(--accent-purple), transparent, var(--accent))",
                  borderRadius: "20px",
                }}
              />

              {/* Photo frame */}
              <div className="relative w-72 md:w-80 rounded-2xl overflow-hidden border"
                style={{ borderColor: "rgba(34,211,238,0.15)", background: "var(--card)" }}>
                <Image
                  src="/profile-v3.jpg"
                  alt="Ashraful Islam Akash"
                  width={320}
                  height={400}
                  className="w-full h-auto object-cover object-top"
                  priority
                />

                {/* Bottom name overlay */}
                <div className="absolute bottom-0 inset-x-0 px-5 py-4 bg-gradient-to-t from-background/95 to-transparent">
                  <p className="text-foreground font-bold text-sm font-mono">Ashraful Islam Akash</p>
                  <p className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] mt-0.5 text-gradient">
                    Frontend Engineer
                  </p>
                </div>
              </div>

              {/* Experience badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-6 px-4 py-2.5 rounded-2xl border border-border bg-surface/90 backdrop-blur-md text-center">
                <p className="text-xl font-black font-mono text-gradient leading-none">3+</p>
                <p className="text-[8px] text-secondary font-mono uppercase tracking-wider mt-0.5">Years Exp.</p>
              </motion.div>
 
              {/* Projects badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -right-6 px-4 py-2.5 rounded-2xl border border-border bg-surface/90 backdrop-blur-md text-center">
                <p className="text-xl font-black font-mono text-gradient leading-none">18+</p>
                <p className="text-[8px] text-secondary font-mono uppercase tracking-wider mt-0.5">Projects</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
