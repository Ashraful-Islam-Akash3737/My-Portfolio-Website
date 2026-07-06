"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Github, Linkedin, Mail, Download, ArrowUpRight } from "lucide-react";

const stack = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Express.js"];

export default function About() {
  const fade = {
    hidden: { opacity: 0, y: 16 },
    show: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.08, type: "spring" as const, stiffness: 75, damping: 18 },
    }),
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Very faint ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[120px] opacity-[0.04] pointer-events-none rounded-full"
        style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-purple))" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section label */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-14">
          <span className="section-tag">About Me</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-1">
            The developer <span className="text-gradient">behind the code</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Photo column ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ type: "spring", stiffness: 55, damping: 18 }}
            className="lg:col-span-4"
          >
            <div className="relative max-w-xs mx-auto lg:mx-0">
              {/* Outer glow */}
              <div className="absolute -inset-4 blur-2xl opacity-[0.12] rounded-2xl"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-purple))" }} />

              {/* Photo with gradient border */}
              <div className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(34,211,238,0.15)" }}>
                <Image
                  src="/profile-v3.jpg"
                  alt="Ashraful Islam Akash"
                  width={360}
                  height={420}
                  className="w-full h-auto object-cover object-top"
                  priority
                />
                {/* Name overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 px-5 py-4 bg-gradient-to-t from-background/95 to-transparent">
                  <p className="font-bold text-sm text-foreground font-mono">Ashraful Islam Akash</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-gradient">Frontend Engineer</p>
                    <span className="ml-auto flex items-center gap-1.5">
                      <span className="ping-dot scale-75" />
                      <span className="text-[8px] text-accent font-mono uppercase tracking-wide">Open to work</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Description below photo */}
              <div className="mt-4 p-4 rounded-xl border space-y-2"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                <p className="text-secondary text-xs leading-relaxed font-mono">
                  Based in <span className="text-foreground">Dhaka, Bangladesh 🇧🇩</span> — crafting web experiences that are fast, beautiful, and accessible.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-secondary font-mono pt-1">
                  <MapPin size={10} className="text-accent shrink-0" />
                  <span>Dhaka, Bangladesh (GMT+6)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Content column ── */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Bio */}
            <motion.div custom={0} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-4">
                Building interfaces that <span className="text-gradient">feel alive</span>
              </h3>
              <div className="space-y-3 text-secondary text-[15px] leading-[1.8]">
                <p>
                  I&apos;m a Frontend Engineer with 3+ years of experience building premium web applications.
                  My focus is on writing clean, maintainable code that creates genuinely delightful user experiences.
                </p>
                <p>
                  From pixel-perfect React components to full-stack MERN applications — I care deeply about every
                  detail, from smooth animations to accessible markup and performant rendering.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div custom={1} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid grid-cols-3 gap-3">
              {[
                { value: "3+", label: "Years active" },
                { value: "18+", label: "Projects shipped" },
                { value: "100%", label: "Client satisfaction" },
              ].map((s, i) => (
                <div key={i} className="card py-5 px-4 text-center">
                  <p className="text-2xl font-black font-mono text-gradient">{s.value}</p>
                  <p className="text-[9px] text-secondary font-mono uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Stack chips */}
            <motion.div custom={2} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-secondary mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {stack.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 cursor-default"
                    style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--secondary)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div custom={3} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
              {[
                { icon: <Github size={15} />, href: "https://github.com", label: "GitHub" },
                { icon: <Linkedin size={15} />, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: <Mail size={15} />, href: "mailto:abirashrafulislamabir@gmail.com", label: "Email" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border text-secondary hover:text-accent hover:border-accent/40 transition-all duration-200"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  {s.icon}
                </a>
              ))}
              <div className="ml-auto flex gap-2">
                <a href="/resume.pdf" target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold border text-secondary hover:text-accent hover:border-accent/40 transition-all duration-200"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <Download size={12} />
                  Resume
                </a>
                <a href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-background bg-gradient-neon hover:opacity-90 transition-all duration-200">
                  Let&apos;s Talk
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
