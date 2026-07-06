"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Product Manager",
    company: "TechFlow Inc.",
    text: "Akash delivered our dashboard rewrite in record time. The attention to detail in the UI was exceptional — our users noticed immediately. Would hire again without hesitation.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "Founder & CEO",
    company: "LaunchPad SaaS",
    text: "Working with Akash was seamless. He asked the right questions, built exactly what we needed, and delivered ahead of schedule. The code quality is outstanding.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Tech Lead",
    company: "CloudBridge Systems",
    text: "Exceptional React skills and a strong sense for design. Akash doesn't just write code — he thinks about the end user, which makes all the difference in the final product.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Co-founder",
    company: "Pixel Labs",
    text: "We hired Akash for a complex Next.js project with tight deadlines. He delivered flawlessly — clean code, great component architecture, and zero bugs in production. Highly recommended.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Design Director",
    company: "CreativeStack",
    text: "Akash has a rare combination of technical skill and design sensibility. He took our Figma mockups and turned them into beautifully animated, pixel-perfect React components.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update layout sizes dynamically
  useEffect(() => {
    const handleLayout = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }

      const card = containerRef.current?.querySelector(".testimonial-card");
      if (card) {
        setCardWidth(card.getBoundingClientRect().width);
      }
    };

    handleLayout();
    window.addEventListener("resize", handleLayout);
    // Timeout to ensure elements are fully painted before reading sizes
    const timer = setTimeout(handleLayout, 100);

    return () => {
      window.removeEventListener("resize", handleLayout);
      clearTimeout(timer);
    };
  }, []);

  const maxIndex = testimonials.length - visibleCards;

  const next = () => {
    if (index < maxIndex) setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-surface">
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] blur-[150px] opacity-[0.04] pointer-events-none rounded-full"
        style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-purple))" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="text-center sm:text-left">
            <span className="section-tag">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mt-1">
              Client <span className="text-gradient">Feedback</span>
            </h2>
            <p className="text-secondary text-sm mt-3 max-w-md leading-relaxed">
              Here is what clients say about my delivery speed, responsiveness, and code quality.
            </p>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-3 shrink-0">
            <button 
              onClick={prev}
              disabled={index === 0}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                index === 0 ? "opacity-30 cursor-not-allowed text-secondary/40" : "text-secondary hover:text-accent hover:border-accent/40 hover:-translate-y-0.5"
              }`}
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={next}
              disabled={index >= maxIndex}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                index >= maxIndex ? "opacity-30 cursor-not-allowed text-secondary/40" : "text-secondary hover:text-accent hover:border-accent/40 hover:-translate-y-0.5"
              }`}
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
              aria-label="Next testimonials"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel viewport */}
        <div className="relative overflow-hidden w-full" ref={containerRef}>
          <motion.div 
            className="flex gap-6"
            animate={{ x: -index * (cardWidth + 24) }} // 24px represents the gap-6
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
          >
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="testimonial-card w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 card p-6 md:p-8 flex flex-col justify-between group hover:border-border-accent/40"
              >
                <div className="space-y-4">
                  <Quote size={28} className="opacity-[0.12] text-accent" />
                  
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-current text-accent" />
                    ))}
                  </div>

                  <blockquote className="text-xs md:text-sm leading-relaxed text-foreground/80 italic">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                </div>

                {/* Client Info at bottom */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center text-white font-black text-sm shrink-0">
                    <span>{t.name[0]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-foreground font-bold text-xs truncate">{t.name}</p>
                    <p className="text-[10px] text-secondary font-mono truncate">{t.role}</p>
                    <p className="text-[9px] font-mono text-accent truncate">{t.company}</p>
                  </div>
                </div>

              </div>
            ))}
          </motion.div>
        </div>

        {/* Bullet indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="h-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === index ? "24px" : "8px",
                background: i === index ? "var(--accent)" : "var(--border)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
