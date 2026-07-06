"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
  category: "Full Stack" | "Frontend";
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "PH-Tube",
    description: "A dynamic video streaming and media player platform. Users can browse video contents by tags, search by video title, sort dynamically by total views, and experience a fully responsive media player dashboard.",
    tags: ["JavaScript", "HTML5", "CSS3", "REST API"],
    github: "https://github.com/Ashraful-Islam-Akash3737/PH-Tube",
    live: "https://ashraful-islam-akash3737.github.io/PH-Tube/",
    image: "/projects/ph-tube.png",
    featured: false,
    category: "Frontend",
    color: "var(--accent)",
  },
  {
    id: 2,
    title: "Bistro Boss Restaurant",
    description: "A comprehensive restaurant platform with food menus catalog. Features cart order management, dynamic filter systems, user profile tracking, and smooth Client-side routing.",
    tags: ["React", "Express.js", "MongoDB", "Firebase Auth"],
    github: "https://github.com/Ashraful-Islam-Akash3737/bistro-boss-client",
    live: "https://ashraful-islam-akash3737.github.io/bistro-boss-client/",
    image: "/projects/bistro-boss.png",
    featured: true,
    category: "Full Stack",
    color: "var(--accent-purple)",
  },
  {
    id: 3,
    title: "Car Doctor Services",
    description: "An online automotive maintenance booking dashboard. Features secure user logins, JWT session token generation, reservation schedules management, and transactional logs.",
    tags: ["React", "Node.js", "MongoDB", "JWT Session"],
    github: "https://github.com/Ashraful-Islam-Akash3737/car-doctor-client",
    live: "https://ashraful-islam-akash3737.github.io/car-doctor-client/",
    image: "/projects/car-doctor.png",
    featured: false,
    category: "Full Stack",
    color: "var(--accent)",
  },
  {
    id: 4,
    title: "Baap-Er-Bank",
    description: "A simulated mock online banking console. Users can simulate money deposit and withdrawal transactions, tracking instant total balance calculations and account logs.",
    tags: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    github: "https://github.com/Ashraful-Islam-Akash3737/Baap-Er-Bank",
    live: "https://ashraful-islam-akash3737.github.io/Baap-Er-Bank/",
    image: "/projects/baap-er-bank.png",
    featured: false,
    category: "Frontend",
    color: "var(--accent-purple)",
  },
  {
    id: 5,
    title: "Coffee Store Catalog",
    description: "An e-commerce product database CRUD dashboard. Admins can create, read, update, and delete menu items, dynamically managing coffee prices, names, and inventory stocks.",
    tags: ["React", "Node.js", "MongoDB", "CRUD API"],
    github: "https://github.com/Ashraful-Islam-Akash3737/coffee-store-client",
    live: "https://ashraful-islam-akash3737.github.io/coffee-store-client/",
    image: "/projects/coffee-store.png",
    featured: false,
    category: "Full Stack",
    color: "var(--accent)",
  },
  {
    id: 6,
    title: "Career Hub Finder",
    description: "A responsive job portal and vacancy discovery catalog utilizing React Router. Features custom filter lists, bookmark items trackers, and detailed job profile specs.",
    tags: ["React.js", "React Router", "Tailwind CSS"],
    github: "https://github.com/Ashraful-Islam-Akash3737/react-router-career-hub",
    live: "https://ashraful-islam-akash3737.github.io/react-router-career-hub/",
    image: "/projects/career-hub.png",
    featured: false,
    category: "Frontend",
    color: "var(--accent-purple)",
  },
];

const filters = ["All", "Full Stack", "Frontend"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);
  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-tag">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mt-1">
              Selected <span className="text-gradient">Projects</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <button key={f} onClick={() => setActive(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                  active === f
                    ? "text-background bg-gradient-neon"
                    : "text-secondary border hover:text-foreground"
                }`}
                style={active !== f ? { borderColor: "var(--border)", background: "var(--card)" } : {}}>
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>

            {/* Featured project (large card) */}
            {featured && (
              <div className="card p-6 md:p-8 mb-6 group relative overflow-hidden">
                {/* Background accent glow */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
                  style={{ background: "var(--accent)", transform: "translate(30%, -30%)" }} />

                <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                  {/* Preview Image Box */}
                  <div className="lg:w-1/2 h-52 sm:h-64 lg:h-80 rounded-xl relative overflow-hidden shrink-0 border border-border bg-surface">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold text-background bg-gradient-neon">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-5 justify-center lg:w-1/2">
                    <div>
                      <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">{featured.category}</p>
                      <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">{featured.title}</h3>
                      <p className="text-secondary text-sm leading-relaxed">{featured.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {featured.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium border"
                          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--secondary)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <a href={featured.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold border text-secondary hover:text-accent hover:border-accent/40 transition-all duration-200 cursor-pointer"
                        style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                        <Github size={13} /> GitHub
                      </a>
                      <a href={featured.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-background bg-gradient-neon hover:opacity-90 transition-all duration-200 cursor-pointer">
                        <ExternalLink size={13} /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of other projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 80, damping: 18 }}
                  className="card p-5 flex flex-col gap-4 group relative overflow-hidden"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-neon" />

                  {/* Project image header */}
                  <div className="relative h-44 w-full rounded-lg overflow-hidden border border-border bg-surface shrink-0">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-md"
                      style={{ color: "var(--accent)", background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.15)" }}>
                      {p.category}
                    </span>
                    <div className="flex gap-3">
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="text-secondary hover:text-accent transition-colors cursor-pointer"><Github size={15} /></a>
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                        className="text-secondary hover:text-accent transition-colors cursor-pointer"><ExternalLink size={15} /></a>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-foreground font-bold text-base group-hover:text-accent transition-colors">{p.title}</h4>
                    <p className="text-secondary text-xs leading-relaxed line-clamp-3">{p.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[9px] font-mono"
                        style={{ color: "var(--secondary)", background: "var(--surface)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
