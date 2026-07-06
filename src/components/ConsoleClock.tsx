"use client";

import { useState, useEffect } from "react";

export default function ConsoleClock() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      // Format as HH:MM:SS AM/PM
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minStr = minutes < 10 ? "0" + minutes : minutes;
      const secStr = seconds < 10 ? "0" + seconds : seconds;
      const hrStr = hours < 10 ? "0" + hours : hours;
      setTimeStr(`${hrStr}:${minStr}:${secStr} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2 text-[10px] text-secondary font-mono">
      <div className="flex justify-between border-b border-border/20 pb-1">
        <span>Location:</span>
        <span className="text-foreground font-bold">Dhaka, BD (GMT+6)</span>
      </div>
      <div className="flex justify-between border-b border-border/20 pb-1">
        <span>Local Time:</span>
        <span className="text-accent font-bold">{timeStr || "Loading..."}</span>
      </div>
      <div className="flex justify-between">
        <span>Network:</span>
        <span className="text-accent font-bold uppercase tracking-wider">HTTPS // SECURE</span>
      </div>
    </div>
  );
}
