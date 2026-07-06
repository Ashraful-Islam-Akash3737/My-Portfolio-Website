"use client";
import React from "react";
import { motion, type Variants } from "framer-motion";
import { Code, Server, Wrench, ArrowUpRight } from "lucide-react";

interface Skill {
  name: string;
  pct: number;
  icon: string;
}

interface Category {
  label: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const categories: Category[] = [
  {
    label: "Frontend",
    desc: "Crafting fast, accessible, and high-fidelity user interfaces.",
    color: "var(--accent)", // sky-cyan
    icon: <Code size={20} />,
    skills: [
      { name: "React.js",       pct: 90, icon: "⚛️" },
      { name: "Next.js",        pct: 85, icon: "▲" },
      { name: "TypeScript",     pct: 80, icon: "📘" },
      { name: "JavaScript",     pct: 92, icon: "🟨" },
      { name: "Tailwind CSS",   pct: 88, icon: "🎨" },
      { name: "HTML5 / CSS3",   pct: 95, icon: "🌐" },
      { name: "Framer Motion",  pct: 75, icon: "🎞️" },
    ],
  },
  {
    label: "Backend",
    desc: "Developing secure, performant, and scalable server-side systems.",
    color: "var(--accent-purple)", // indigo-purple
    icon: <Server size={20} />,
    skills: [
      { name: "Node.js",    pct: 78, icon: "🟢" },
      { name: "Express.js", pct: 75, icon: "🚂" },
      { name: "MongoDB",    pct: 72, icon: "🍃" },
      { name: "REST API",   pct: 82, icon: "🔌" },
      { name: "JWT Auth",   pct: 80, icon: "🔐" },
      { name: "Firebase",   pct: 65, icon: "🔥" },
    ],
  },
  {
    label: "Tools & DevOps",
    desc: "Using industry-standard workflows, tools, and platforms.",
    color: "#10b981", // emerald
    icon: <Wrench size={20} />,
    skills: [
      { name: "Git & GitHub", pct: 88, icon: "🐙" },
      { name: "VS Code",      pct: 95, icon: "💻" },
      { name: "Figma",        pct: 65, icon: "🖌️" },
      { name: "Postman",      pct: 78, icon: "📮" },
      { name: "Vercel",       pct: 82, icon: "▲" },
      { name: "Linux",        pct: 60, icon: "🐧" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 70, damping: 18 },
  },
};

export default function TechStack() {
  const getProficiencyText = (pct: number) => {
    if (pct >= 90) return "Expert";
    if (pct >= 80) return "Advanced";
    if (pct >= 70) return "Proficient";
    return "Intermediate";
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[150px] opacity-[0.03] pointer-events-none rounded-full"
        style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-purple))" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.4 }} 
          className="mb-16 text-center lg:text-left"
        >
          <span className="section-tag">Skills</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mt-1">
            Tech <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-secondary text-sm mt-3 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            A visual roadmap of my technical expertise, platforms, and utilities built through production releases and client deliverables.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
        >
          {categories.map((cat) => {
            const avgPct = Math.round(
              cat.skills.reduce((sum, skill) => sum + skill.pct, 0) / cat.skills.length
            );

            return (
              <motion.div 
                key={cat.label} 
                variants={cardVariants}
                className="flex"
              >
                <div className="card w-full p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden group hover:border-border-accent/40">
                  {/* Category Accent top border */}
                  <div className="absolute top-0 inset-x-0 h-1 transition-all duration-300 group-hover:h-1.5" 
                    style={{ background: cat.color }} />

                  {/* Header info */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl text-foreground"
                        style={{ background: `${cat.color}15`, color: cat.color }}>
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-foreground">{cat.label}</h3>
                        <p className="text-[10px] text-secondary font-mono uppercase tracking-wider">Avg. {avgPct}%</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-secondary text-xs leading-relaxed font-mono">
                    {cat.desc}
                  </p>

                  <div className="w-full h-px bg-border" />

                  {/* Skills List */}
                  <div className="flex flex-col gap-5 flex-1">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="group/skill flex flex-col gap-2 cursor-default">
                        {/* Name and percentage row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs group-hover/skill:translate-x-0.5 transition-transform duration-200">{skill.icon}</span>
                            <span className="text-xs font-bold text-foreground/90 group-hover/skill:text-foreground transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[8px] font-mono text-secondary uppercase tracking-wider opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                              {getProficiencyText(skill.pct)}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border bg-surface/50 text-foreground transition-colors group-hover/skill:border-transparent group-hover/skill:text-background"
                              style={{ 
                                borderColor: "var(--border)",
                                borderStyle: "solid"
                              }}
                              onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = cat.color;
                              }}
                              onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                              }}
                            >
                              {skill.pct}%
                            </span>
                          </div>
                        </div>

                        {/* Custom thin micro-progress bar */}
                        <div className="h-1 w-full rounded-full overflow-hidden transition-all duration-300 group-hover/skill:h-1.5"
                          style={{ background: "var(--border)" }}>
                          <div className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: `${skill.pct}%`,
                              background: `linear-gradient(90deg, ${cat.color}, ${cat.color}bb)`,
                              boxShadow: `0 0 6px ${cat.color}88`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Category Footer info */}
                  <div className="pt-4 border-t flex items-center justify-between text-[9px] font-mono text-secondary uppercase tracking-wider"
                    style={{ borderColor: "var(--border)" }}>
                    <span>{cat.skills.length} tracked items</span>
                    <span className="flex items-center gap-0.5 text-secondary opacity-60 group-hover:opacity-100 transition-opacity">
                      Focus <ArrowUpRight size={10} style={{ color: cat.color }} />
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
