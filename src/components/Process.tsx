"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery & Scope",
    desc: "Deep dive into your requirements, audience, and goals. We define the tech stack, timeline, and deliverables with full clarity before a single line is written.",
  },
  {
    num: "02",
    title: "Design & Prototype",
    desc: "Wireframes, component architecture, and UI design decisions. You see exactly what will be built before development begins.",
  },
  {
    num: "03",
    title: "Development",
    desc: "Iterative, milestone-based development with regular demos. Clean code, proper TypeScript types, and documented components throughout.",
  },
  {
    num: "04",
    title: "Testing & Launch",
    desc: "Cross-browser testing, performance optimization, accessibility review, and smooth deployment to production with zero downtime.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="dot-grid absolute inset-0 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-14">
          <span className="section-tag">How I Work</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-1">
            My <span className="text-gradient">Process</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 80, damping: 18 }}
              className="card p-6 flex flex-col gap-4 group">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black font-mono opacity-[0.07] text-foreground">{s.num}</span>
                <div className="w-8 h-8 rounded-lg bg-gradient-neon flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="text-background font-black text-xs font-mono">{s.num.slice(-1)}</span>
                </div>
              </div>
              <h4 className="text-foreground font-bold text-base">{s.title}</h4>
              <p className="text-secondary text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
