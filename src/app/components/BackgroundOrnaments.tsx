'use client';

import { useEffect, useRef, useState } from "react";

export default function BackgroundOrnaments() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathsRef = useRef<Array<SVGPathElement | null>>([]);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });
  const [ornaments, setOrnaments] = useState<string[]>([]);


  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  useEffect(() => {
    if (windowSize.h === 0) return;
    const paths = Array.from({ length: 25 }, (_, i) => {
      const y = windowSize.h - (i * 60 + Math.random() * 40);
      const c1 = 50 + Math.random() * 150;
      const c2 = 350 + Math.random() * 150;
      return `M10 ${y} C120 ${c1}, 300 ${c2}, 590 ${y}`;
    });
    setOrnaments(paths);
  }, [windowSize.h]);

  
  useEffect(() => {
    pathsRef.current.forEach((path, i) => {
      if (!path) return;
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.style.transition = "none";

      void path.getBoundingClientRect();

      requestAnimationFrame(() => {
        path.style.transition = `stroke-dashoffset 2.3s ease ${i * 0.05}s`;
        path.style.strokeDashoffset = "0";
      });
    });
  }, [ornaments]);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = windowSize.w;
    canvas.height = windowSize.h;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: Math.random() * 0.3 - 0.15,
      dy: Math.random() * 0.3 - 0.15,
    }));

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,215,150,0.3)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [windowSize]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none select-none -z-10">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10" />

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 600 ${windowSize.h}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute top-0 left-0 w-full h-full z-0"
      >
        <defs>
          {ornaments.map((_, i) => (
            <linearGradient key={i} id={`fadeGradient-${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b07a3b" stopOpacity="0.15" />
              <stop offset="90%" stopColor="#b07a3b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#b07a3b" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {ornaments.map((d, i) => (
          <path
            key={i}
            d={d}
            ref={(el) => {(pathsRef.current[i] = el)}}
            fill="none"
            stroke={`url(#fadeGradient-${i})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}
