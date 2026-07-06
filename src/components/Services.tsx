"use client";

import { motion, type Variants } from "framer-motion";
import { Code2, Globe, Database, LayoutDashboard, Link2, Sparkles } from "lucide-react";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "React.js Development",
    description:
      "Component-driven interfaces with strict state controls and pixel-perfect responsiveness.",
  },
  {
    number: "02",
    icon: Globe,
    title: "Next.js Applications",
    description:
      "Server-rendered pages with dynamic routing, Suspense loading, and edge optimization.",
  },
  {
    number: "03",
    icon: Database,
    title: "MERN Stack Integration",
    description:
      "Full-stack systems with Express.js, Node.js controllers, and MongoDB Atlas databases.",
  },
  {
    number: "04",
    icon: LayoutDashboard,
    title: "Custom Dashboards & UI",
    description:
      "Admin panels, analytics dashboards, and monitoring portals with optimized grid layouts.",
  },
  {
    number: "05",
    icon: Link2,
    title: "API Integration",
    description:
      "Secure third-party API configs, JWT auth, webhook pipelines, and RESTful CRUD controllers.",
  },
  {
    number: "06",
    icon: Sparkles,
    title: "UI Engineering & Animations",
    description:
      "Fluid micro-interactions, design systems, and spring physics powered by Framer Motion.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Dot-grid overlay */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          <span className="section-tag">What I Do</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-1">
            Services <span className="text-gradient">&amp; Expertise</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map(({ number, icon: Icon, title, description }) => (
            <motion.div
              key={number}
              variants={cardVariants}
              className="card p-6 group flex flex-col gap-4 rounded-2xl"
            >
              {/* Top row: icon + number badge */}
              <div className="flex items-start justify-between">
                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: "rgba(34,211,238,0.08)",
                    color: "var(--accent)",
                  }}
                >
                  <Icon size={20} />
                </div>
                <span className="text-5xl font-black opacity-[0.06] text-foreground font-mono select-none">
                  {number}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-foreground font-bold text-base">{title}</h4>

              {/* Description */}
              <p className="text-secondary text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
