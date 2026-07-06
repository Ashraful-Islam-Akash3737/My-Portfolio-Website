"use client";

import { motion, type Variants } from "framer-motion";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tech: string[];
}

const experiences: Experience[] = [
  {
    company: "Softvence Agency",
    role: "Frontend UI Developer (Part-time)",
    period: "Jan 2024 – Present",
    location: "Dhaka, Bangladesh",
    description:
      "Leading frontend UI/UX development deliverables. Building modern React/Next.js web applications, coordinating with design teams, and delivering pixel-perfect interfaces.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    company: "Freelance Developer",
    role: "React & MERN Stack Developer",
    period: "2022 – Present",
    location: "Remote",
    description:
      "Delivering custom web applications for international clients. Specializing in React dashboards, MERN stack systems, and responsive landing pages with premium animations.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    company: "Personal Projects",
    role: "Full Stack Developer",
    period: "2021 – 2022",
    location: "Self-directed",
    description:
      "Built 10+ full-stack applications to sharpen React, Node, and database skills. Focused on clean architecture, reusable components, and scalable patterns.",
    tech: ["React", "Node.js", "MongoDB"],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-background">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-block">Work History</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Work{" "}
            <span className="text-gradient">Experience</span>
          </h2>
          <p className="mt-4 text-secondary max-w-xl mx-auto text-base">
            A journey through my professional roles, freelance work, and
            hands-on project experience.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative"
        >
          {/* Vertical spine line */}
          <div
            className="absolute left-[7.5rem] top-3 bottom-3 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(34,211,238,0.25) 10%, rgba(34,211,238,0.25) 90%, transparent)",
            }}
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-0"
              >
                {/* Left: Date badge */}
                <div className="w-32 flex-shrink-0 pt-6 pr-4 text-right">
                  <span
                    className="inline-block text-xs font-semibold px-2 py-1 rounded-lg"
                    style={{
                      background: "rgba(34,211,238,0.08)",
                      color: "var(--accent)",
                      border: "1px solid rgba(34,211,238,0.2)",
                      lineHeight: 1.4,
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Center: dot */}
                <div className="flex-shrink-0 flex flex-col items-center pt-6 relative">
                  <div
                    className="w-4 h-4 rounded-full border-2 z-10 relative flex-shrink-0"
                    style={{
                      borderColor: "var(--accent)",
                      background: "var(--background)",
                      boxShadow: "0 0 10px rgba(34,211,238,0.4)",
                    }}
                  >
                    <div
                      className="absolute inset-[3px] rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                  </div>
                </div>

                {/* Horizontal connector */}
                <div
                  className="flex-shrink-0 self-start mt-[26px]"
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "rgba(34,211,238,0.35)",
                  }}
                />

                {/* Right: Card */}
                <div className="flex-1 ml-2">
                  <div className="card p-6 group hover:-translate-y-1 transition-all duration-300">
                    {/* Card header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                          {exp.role}
                        </h3>
                        <p
                          className="text-sm font-semibold mt-0.5"
                          style={{ color: "var(--accent)" }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-secondary flex items-center gap-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          className="w-3.5 h-3.5 flex-shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                        {exp.location}
                      </span>
                    </div>

                    {/* Divider */}
                    <div
                      className="w-full h-px mb-3"
                      style={{ background: "var(--border)" }}
                    />

                    {/* Description */}
                    <p className="text-secondary text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{
                            background: "rgba(34,211,238,0.08)",
                            color: "var(--accent)",
                            border: "1px solid rgba(34,211,238,0.18)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
