"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Clock, X, Search } from "lucide-react";

interface Post {
  title: string;
  category: "React.js" | "Next.js" | "TypeScript" | "UI Engineering";
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

const posts: Post[] = [
  {
    title: "Mastering React Render Cycles & Performance Optimization",
    category: "React.js",
    date: "Jun 12, 2026",
    readTime: "5 min read",
    excerpt: "Learn how to use useMemo, useCallback, and React.memo effectively to keep your user interfaces rendering at a fluid 60fps.",
    content: `React render cycles determine when your components paint. However, unnecessary re-renders can quickly degrade page responsiveness.

### 1. Leverage useMemo & useCallback
Memoize complex calculation objects using \`useMemo\` and function handlers using \`useCallback\`. This guarantees child components do not trigger update cycles unless parameter variables change.

### 2. Wrap components in React.memo
For high-density dashboard layouts, wrap child components in \`React.memo\` to halt re-renders if input states remain identical.`,
  },
  {
    title: "Transitioning to Next.js App Router: Static vs Dynamic Rendering",
    category: "Next.js",
    date: "May 28, 2026",
    readTime: "8 min read",
    excerpt: "An engineering deep dive into Next.js Server Components, static generation, dynamic routing headers, and caching mechanisms.",
    content: `Next.js App Router utilizes React Server Components to load code blocks on the server first.

### 1. Leverage Streaming and Suspense
Instead of waiting for the entire page data to resolve, wrap slow query components in React \`<Suspense>\`. This streams HTML chunks immediately.

### 2. Static vs. Dynamic Caching
Prerender static content at the edge network to serve pages in under 50ms, while routing dynamic data to separate API nodes.`,
  },
  {
    title: "Why TypeScript makes you a Better Product Engineer",
    category: "TypeScript",
    date: "May 10, 2026",
    readTime: "5 min read",
    excerpt: "Type safety is not just about catching syntax errors—it is a powerful tool for designing clean software architectures.",
    content: `TypeScript protects your code quality during compiling.

### 1. Define Strict Schemas
Declare data interfaces explicitly to guarantee that database payloads and client-side UI states share identical properties.

### 2. Safer Refactoring
Change properties confidently knowing that type checks flag immediately if any references require modification.`,
  },
  {
    title: "Building Micro-Animations with Framer Motion & GSAP",
    category: "UI Engineering",
    date: "Apr 20, 2026",
    readTime: "7 min read",
    excerpt: "How to blend GSAP's scroll timelines with Framer Motion's layout transitions to build fluid, premium web experiences.",
    content: `Web animations serve as crucial interface indicators.

### 1. Spring Physics
Use mass, stiffness, and damping to configure realistic spring responses in Framer Motion.

### 2. Scroll scrubbing with GSAP
Chain scroll trigger timelines in GSAP to scroll-animate typography elements and canvas models.`,
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 22 },
    },
  };

  return (
    <section id="blog" className="py-24 border-t border-border/40 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
            KNOWLEDGE_LOG
          </span>
          <h3 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mt-1">
            Technical Insights
          </h3>
        </div>

        {/* Monospace Search Bar */}
        <div className="max-w-xl mx-auto lg:mx-0 mb-12">
          <div className="relative rounded border border-border bg-card/60 backdrop-blur-sm overflow-hidden flex items-center px-4 py-3">
            <Search size={14} className="text-secondary/70 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search posts, topics, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-foreground placeholder:text-secondary/70 font-mono text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {filteredPosts.map((post) => (
            <motion.article
              variants={itemVariants}
              key={post.title}
              className="group rounded-xl border border-border bg-card/35 hover:bg-card/75 backdrop-blur-sm p-6 flex flex-col justify-between shadow-neon-hover transition-all duration-300 h-full"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-[10px] font-mono text-secondary mb-4">
                  <span className="text-accent font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-extrabold text-foreground mb-3 leading-snug group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h4>

                {/* Excerpt */}
                <p className="text-xs text-secondary leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between border-t border-border/40 pt-4">
                <span className="flex items-center gap-1 text-[10px] text-secondary font-mono">
                  <Clock size={11} />
                  {post.readTime}
                </span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-[10px] font-bold font-mono text-accent hover:text-accent-purple transition-colors cursor-pointer uppercase tracking-widest flex items-center gap-1 group/btn"
                >
                  READ LOG
                  <span className="group-hover/btn:translate-x-1 transition-transform">&gt;</span>
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Article Reader */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-background/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-3xl rounded-2xl border border-border bg-card shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto space-y-6"
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-full border border-border bg-background/80 text-foreground hover:border-accent/40 transition-colors cursor-pointer"
                  aria-label="Close Article"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Article Header */}
              <div className="space-y-3 pb-6 border-b border-border/60">
                <span className="px-2.5 py-1 rounded bg-accent/15 border border-accent/30 text-[10px] font-bold font-mono text-accent uppercase tracking-wider inline-block">
                  {selectedPost.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                  {selectedPost.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-secondary font-mono pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {selectedPost.readTime}
                  </span>
                </div>
              </div>

              {/* Article Body */}
              <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed text-sm md:text-base space-y-6">
                {selectedPost.content.split("\n\n").map((para, pIdx) => {
                  if (para.startsWith("###")) {
                    return (
                      <h4 key={pIdx} className="text-base md:text-lg font-extrabold text-foreground pt-4 flex items-center gap-2">
                        <BookOpen size={16} className="text-accent" />
                        {para.replace("### ", "")}
                      </h4>
                    );
                  }
                  if (para.startsWith("```")) {
                    const lines = para.split("\n");
                    const code = lines.slice(1, lines.length - 1).join("\n");
                    return (
                      <pre key={pIdx} className="p-4 rounded-xl border border-border bg-surface font-mono text-xs overflow-x-auto text-foreground">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return <p key={pIdx}>{para}</p>;
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
