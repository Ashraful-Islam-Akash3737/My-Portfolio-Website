"use client";

import { motion } from "framer-motion";
import { Users, CheckCircle2, ArrowUpRight } from "lucide-react";

const responsibilities = [
  "Lead frontend UI/UX development deliverables for client web applications",
  "Coordinate layout coding tasks and review team member pull requests",
  "Mentor junior developers on React best practices and component architecture",
  "Bridge communication between design and engineering for project execution",
  "Maintain code quality standards through reviews, linting, and documentation",
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="dot-grid absolute inset-0 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-14">
          <span className="section-tag">Leadership</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-1">
            Team <span className="text-gradient">& Agency Role</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Role card */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 60, damping: 18 }}>
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
                style={{ background: "var(--accent)", transform: "translate(30%,-30%)" }} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl" style={{ background: "rgba(34,211,238,0.08)", color: "var(--accent)" }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-base">Frontend Team Lead</p>
                    <p className="text-accent text-xs font-mono font-bold uppercase tracking-widest">Softvence Agency</p>
                  </div>
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-6">
                  At Softvence Agency, I lead frontend development deliverables and help manage layout coding tasks,
                  team coordination, and project execution. I collaborate with designers and backend engineers to
                  ship modern web applications on schedule.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(34,211,238,0.08)", color: "var(--accent)", border: "1px solid rgba(34,211,238,0.2)" }}>
                    Jan 2024 – Present
                  </span>
                  <a href="https://softvence.com" target="_blank" rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 text-xs text-secondary hover:text-accent transition-colors font-mono">
                    softvence.com <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Responsibilities */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.1 }}>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-secondary mb-4">Key Responsibilities</p>
            <div className="space-y-3">
              {responsibilities.map((r, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="flex items-start gap-3 p-4 rounded-xl border"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-secondary text-sm leading-relaxed">{r}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
