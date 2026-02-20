import { useEffect, useRef } from "react";
import adImg from "../assets/images/94416e463e1ad558a6a140eda972d957353c167b.jpg";

export default function InlineAd() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // Particles
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Light streaks
    const streaks = Array.from({ length: 4 }, (_, i) => ({
      x: (W / 4) * i + Math.random() * 40,
      y: -40,
      width: Math.random() * 1 + 0.5,
      speed: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.25 + 0.08,
      length: Math.random() * 60 + 40,
    }));

    function draw(t) {
      ctx.clearRect(0, 0, W, H);

      // Subtle aurora
      const hue = (t * 0.015) % 360;
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, `hsla(${hue}, 70%, 55%, 0.10)`);
      grad.addColorStop(1, `hsla(${(hue + 80) % 360}, 80%, 40%, 0.08)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.025;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const alpha = (Math.sin(p.pulse) * 0.5 + 0.5) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      // Streaks
      streaks.forEach((s) => {
        s.y += s.speed;
        if (s.y > H + s.length) s.y = -s.length;
        const sg = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.length);
        sg.addColorStop(0, `rgba(255,255,255,0)`);
        sg.addColorStop(0.5, `rgba(255,255,255,${s.opacity})`);
        sg.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.strokeStyle = sg;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + s.length);
        ctx.stroke();
      });

      // Scan line
      const scanY = (t * 0.06) % (H + 4);
      const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGrad.addColorStop(0, "rgba(255,255,255,0)");
      scanGrad.addColorStop(0.5, "rgba(255,255,255,0.08)");
      scanGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 2, W, 4);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
<div
  style={{
    position: "relative",
    width: "700",
    borderRadius: 1,
    padding: "20px",
    overflow: "hidden",
    padding:10,
    cursor: "pointer",
    background: "#fff",
  }}
>

      {/* Background photo */}
      <img
        src={adImg}
        alt="Ad"
        style={{
          width: "100%",
          height:"40%",
          display: "block",
          borderRadius:3,
          objectFit: "cover",
          aspectRatio: "3 / 4",
          opacity: 0.92,
        }}
      />

      {/* AI Canvas overlay */}
      <canvas
        ref={canvasRef}
        width={600}
        height={500}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* ── Shop Now button ── */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
        }}
      >
        <button
          style={{
            background: "#fff",
            color: "#111",
            border: "none",
            borderRadius: 4,
            padding: "8px 18px",
            fontSize: 11,
            fontWeight: 800,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
}
