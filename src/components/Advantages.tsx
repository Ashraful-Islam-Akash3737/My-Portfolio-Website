"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Code2, MessageCircle, Timer, Star } from "lucide-react";

const items = [
  { icon: <Code2 size={20} />, title: "Clean Code", desc: "Well-structured, documented, and maintainable code following SOLID principles and modern best practices." },
  { icon: <Timer size={20} />, title: "On-Time Delivery", desc: "Milestone-based planning with clear deadlines. Projects delivered when promised, without compromise on quality." },
  { icon: <MessageCircle size={20} />, title: "Clear Communication", desc: "Regular updates, quick responses, and transparent progress tracking throughout the entire project lifecycle." },
  { icon: <Star size={20} />, title: "Premium Quality", desc: "Every project receives the same level of attention — pixel-perfect UI, smooth animations, and thorough testing." },
  { icon: <Users size={20} />, title: "Client-Centered", desc: "Your business goals come first. I adapt to your workflow, tools, and preferred communication style." },
  { icon: <Trophy size={20} />, title: "Results Driven", desc: "Not just code — solutions that perform. Fast load times, accessible markup, and measurable user impact." },
];

export default function Advantages() {
  return (
    <section id="advantages" className="py-24 relative overflow-hidden">
      <div className="dot-grid absolute inset-0 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-14">
          <span className="section-tag">Why Choose Me</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-1">
            What sets me <span className="text-gradient">apart</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, type: "spring", stiffness: 80, damping: 18 }}
              className="card p-6 flex gap-4 items-start group">
              <div className="p-2.5 rounded-xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: "rgba(34,211,238,0.08)", color: "var(--accent)" }}>
                {it.icon}
              </div>
              <div>
                <h4 className="text-foreground font-bold text-base mb-1.5">{it.title}</h4>
                <p className="text-secondary text-sm leading-relaxed">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
