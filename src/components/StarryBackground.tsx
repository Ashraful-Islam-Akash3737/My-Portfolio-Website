"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    type Star = { x: number; y: number; r: number; opacity: number; twinkle: number; twinkleSpeed: number };
    let stars: Star[] = [];

    // Accent color blobs
    const blobs = [
      { x: 0.12, y: 0.22, r: 0.48, color: "34,211,238", phase: 0 },        // cyan
      { x: 0.88, y: 0.68, r: 0.42, color: "129,140,248", phase: Math.PI }, // indigo
      { x: 0.5,  y: 0.08, r: 0.32, color: "129,140,248", phase: 1.8 },
      { x: 0.22, y: 0.78, r: 0.3,  color: "34,211,238",  phase: 4.2 },
    ];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const n = Math.min(Math.floor(canvas.width * canvas.height / 9000), 140);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.1 + 0.2,
          opacity: Math.random() * 0.5 + 0.1,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.012 + 0.004,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.003;

      // Draw soft aurora blobs
      blobs.forEach((b) => {
        const scale = 0.9 + Math.sin(time * 0.1 + b.phase) * 0.1;
        const x = b.x * canvas.width  + Math.sin(time * 0.07 + b.phase) * 0.025 * canvas.width;
        const y = b.y * canvas.height + Math.cos(time * 0.06 + b.phase) * 0.03  * canvas.height;
        const r = b.r * Math.min(canvas.width, canvas.height) * scale;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0,   `rgba(${b.color}, 0.045)`);
        g.addColorStop(0.5, `rgba(${b.color}, 0.015)`);
        g.addColorStop(1,   `rgba(${b.color}, 0)`);
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

       // Draw twinkling stars
      const starColor = theme === "light" ? "99, 102, 241" : "226, 232, 240";
      stars.forEach((s) => {
        s.twinkle += s.twinkleSpeed;
        const op = s.opacity * (0.6 + Math.sin(s.twinkle) * 0.4);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor},${op})`;
        ctx.shadowBlur = theme === "light" ? 1 : 3;
        ctx.shadowColor = `rgba(${starColor},${op * 0.6})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 0, opacity: theme === "light" ? 0.18 : 0.5 }}
    />
  );
}
