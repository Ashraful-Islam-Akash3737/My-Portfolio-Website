"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 300, mass: 0.4 };
  const cursorRingX = useSpring(cursorX, springConfig);
  const cursorRingY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    // Check if pointer is fine (mouse) and not a touch-only device
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleHoverStart = () => setHovered(true);
    const handleHoverEnd = () => setHovered(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const attachHoverEvents = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], input, select, textarea, .interactive-hover"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    // Attach initial events
    attachHoverEvents();

    // Re-attach when children change dynamically
    const observer = new MutationObserver(attachHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, visible]);

  if (!mounted || !visible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border border-accent rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorRingX,
          y: cursorRingY,
          translateX: -13,
          translateY: -13,
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          backgroundColor: hovered ? "rgba(6, 182, 212, 0.2)" : "rgba(6, 182, 212, 0)",
          borderColor: hovered ? "var(--accent-purple)" : "var(--accent)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </>
  );
}
