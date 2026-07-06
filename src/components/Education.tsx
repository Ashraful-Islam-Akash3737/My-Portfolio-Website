"use client";

import { motion, type Variants } from "framer-motion";
import { GraduationCap, MapPin, Award } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  detail: string;
  grade: string;
  gradeLabel: string;
  current?: boolean;
}

const educations: EducationItem[] = [
  {
    degree: "Bachelor of Science in Computer Science & Engineering",
    institution: "Uttara University",
    period: "2023 – Present",
    location: "Dhaka, Bangladesh",
    detail:
      "Currently pursuing BSc in CSE, deepening expertise in software engineering, algorithms, data structures, and full-stack web development.",
    grade: "Ongoing",
    gradeLabel: "Status",
    current: true,
  },
  {
    degree: "Diploma in Engineering — Computer Science & Engineering",
    institution: "Narsingdi Polytechnic Institute",
    period: "2019 – 2023",
    location: "Narsingdi, Bangladesh",
    detail:
      "Completed a 4-year Diploma in Engineering focused on computer science fundamentals, programming, networking, and project-based learning.",
    grade: "3.90 / 4.00",
    gradeLabel: "CGPA",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Atashia High School",
    period: "2019",
    location: "Bangladesh",
    detail:
      "Completed secondary education with an outstanding result, specializing in a science-focused curriculum.",
    grade: "4.50 / 5.00",
    gradeLabel: "GPA",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } },
};

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)", transform: "translate(-30%,30%)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-14">
          <span className="section-tag">Education</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-1">
            Academic <span className="text-gradient">Background</span>
          </h2>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }} className="space-y-5">
          {educations.map((edu, index) => (
            <motion.div key={index} variants={cardVariants}>
              <div className={`card p-6 md:p-7 flex flex-col sm:flex-row gap-5 items-start group relative overflow-hidden
                ${edu.current ? "card-accent-left" : ""}`}>

                {/* Current badge glow */}
                {edu.current && (
                  <div className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)", transform: "translate(-30%,-30%)" }} />
                )}

                {/* Left: Icon + Period + Grade */}
                <div className="shrink-0 flex flex-col items-center gap-3 sm:w-28 text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: edu.current ? "rgba(34,211,238,0.1)" : "rgba(129,140,248,0.08)",
                      color: edu.current ? "var(--accent)" : "var(--accent-purple)",
                    }}>
                    <GraduationCap size={22} />
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] font-mono font-bold text-secondary uppercase tracking-wider">{edu.period}</p>
                  </div>

                  {/* Grade badge */}
                  <div className="px-3 py-2 rounded-xl border text-center w-full"
                    style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Award size={10} style={{ color: edu.current ? "var(--accent)" : "var(--accent-purple)" }} />
                    </div>
                    <p className="text-xs font-black font-mono text-foreground leading-tight">{edu.grade}</p>
                    <p className="text-[9px] text-secondary font-mono uppercase tracking-wide">{edu.gradeLabel}</p>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 flex-wrap mb-2">
                    <h3 className="text-base md:text-lg font-bold text-foreground leading-snug flex-1">{edu.degree}</h3>
                    {edu.current && (
                      <span className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold"
                        style={{ background: "rgba(34,211,238,0.1)", color: "var(--accent)", border: "1px solid rgba(34,211,238,0.2)" }}>
                        <span className="ping-dot scale-75" />
                        Currently Enrolled
                      </span>
                    )}
                  </div>

                  <p className="font-semibold text-sm mb-1" style={{ color: "var(--accent)" }}>
                    {edu.institution}
                  </p>

                  <div className="flex items-center gap-1.5 text-secondary text-xs font-mono mb-3">
                    <MapPin size={10} />
                    {edu.location}
                  </div>

                  <p className="text-secondary text-sm leading-relaxed">{edu.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}