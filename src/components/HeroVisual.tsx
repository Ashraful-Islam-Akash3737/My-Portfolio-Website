"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; opacity: number; color: string;
  life: number; maxLife: number;
}

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let time = 0;

    // Refined sky-blue + violet palette (NOT harsh neon)
    const colors = [
      "56, 189, 248",   // sky-400
      "125, 211, 252",  // sky-300
      "167, 139, 250",  // violet-400
      "196, 181, 253",  // violet-300
      "226, 232, 240",  // slate-200 (star-like)
      "99, 102, 241",   // indigo-500
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const spawn = () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.85,
        vy: (Math.random() - 0.5) * 0.85,
        radius: Math.random() * 1.8 + 0.4,
        opacity: 0, color,
        life: 0,
        maxLife: Math.random() * 200 + 160,
      });
    };

    for (let i = 0; i < 130; i++) {
      spawn();
      if (particles[i]) particles[i].life = Math.random() * particles[i].maxLife;
    }

    const blobs = [
      { bx: 0.15, by: 0.4, br: 0.5, color: "56, 189, 248", phase: 0 },
      { bx: 0.8, by: 0.58, br: 0.42, color: "167, 139, 250", phase: Math.PI },
      { bx: 0.5, by: 0.15, br: 0.3, color: "99, 102, 241", phase: Math.PI * 0.5 },
      { bx: 0.85, by: 0.2, br: 0.25, color: "196, 181, 253", phase: Math.PI * 1.5 },
    ];

    const drawAurora = () => {
      blobs.forEach((b) => {
        const scale = 0.84 + Math.sin(time * 0.5 + b.phase) * 0.16;
        const x = b.bx * canvas.width + Math.sin(time * 0.35 + b.phase) * 0.05 * canvas.width;
        const y = b.by * canvas.height + Math.cos(time * 0.3 + b.phase) * 0.06 * canvas.height;
        const r = b.br * Math.min(canvas.width, canvas.height) * scale;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${b.color}, 0.16)`);
        g.addColorStop(0.5, `rgba(${b.color}, 0.05)`);
        g.addColorStop(1, `rgba(${b.color}, 0)`);
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawRing = () => {
      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.5;
      const r1 = Math.min(canvas.width, canvas.height) * 0.26;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.12);
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        i === 0 ? ctx.moveTo(r1 * Math.cos(a), r1 * Math.sin(a)) : ctx.lineTo(r1 * Math.cos(a), r1 * Math.sin(a));
      }
      ctx.strokeStyle = "rgba(56,189,248,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.rotate(-time * 0.2);
      const r2 = r1 * 0.6;
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const a = (Math.PI * 2 * i) / 6;
        i === 0 ? ctx.moveTo(r2 * Math.cos(a), r2 * Math.sin(a)) : ctx.lineTo(r2 * Math.cos(a), r2 * Math.sin(a));
      }
      ctx.strokeStyle = "rgba(167,139,250,0.09)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (p1.opacity < 0.06) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x, dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p1.color}, ${(1 - dist / 110) * p1.opacity * 0.22})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        const md = Math.sqrt((p1.x - mx) ** 2 + (p1.y - my) ** 2);
        if (md < 180) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(56,189,248,${(1 - md / 180) * p1.opacity * 0.45})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;
      drawAurora();
      drawRing();

      const toRemove: number[] = [];
      particles.forEach((p, idx) => {
        p.life++;
        if (p.life >= p.maxLife) { toRemove.push(idx); return; }
        const prog = p.life / p.maxLife;
        p.opacity = prog < 0.1 ? prog * 10 : prog > 0.85 ? (1 - prog) / 0.15 : 1;

        const mx = mouseRef.current.x, my = mouseRef.current.y;
        const md = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2);
        if (md < 200) { p.vx += ((mx - p.x) / md) * 0.01; p.vy += ((my - p.y) / md) * 0.01; }
        p.vx *= 0.994; p.vy *= 0.994;
        p.x += p.vx; p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity * 0.82})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${p.color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      for (let i = toRemove.length - 1; i >= 0; i--) { particles.splice(toRemove[i], 1); spawn(); }
      drawConnections();
      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize(); draw();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };
    canvas.parentElement?.addEventListener("mousemove", onMove);
    canvas.parentElement?.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full select-none pointer-events-none" style={{ zIndex: 1 }} />
  );
}
