import { useEffect, useRef } from "react";
import topImg from "../assets/images/5dfe54ec67497f83b16b6237ad3b797576889849.jpg";

export default function Billboard() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random(),
      pulse: Math.random() * Math.PI * 2,
    }));

    const streaks = Array.from({ length: 6 }, (_, i) => ({
      x: (W / 6) * i + Math.random() * 60,
      y: -50,
      width: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      length: Math.random() * 80 + 60,
    }));

    function draw(t) {
      timeRef.current = t;
      ctx.clearRect(0, 0, W, H);

      const hue1 = (t * 0.02) % 360;
      const hue2 = (hue1 + 60) % 360;
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, `hsla(${hue1}, 80%, 50%, 0.18)`);
      grad.addColorStop(0.5, `hsla(${hue2}, 90%, 60%, 0.10)`);
      grad.addColorStop(1, `hsla(${(hue2 + 80) % 360}, 70%, 40%, 0.15)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const pulse = Math.sin(t * 0.001) * 0.5 + 0.5;
      const radial = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.6);
      radial.addColorStop(0, `rgba(255,200,100,${0.08 + pulse * 0.07})`);
      radial.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, W, H);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const alpha = (Math.sin(p.pulse) * 0.5 + 0.5) * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

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

      const scanY = (t * 0.08) % (H + 4);
      const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGrad.addColorStop(0, "rgba(255,255,255,0)");
      scanGrad.addColorStop(0.5, "rgba(255,255,255,0.12)");
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
        width: "100%",
        height: 500,
        overflow: "hidden",
        background: "#0a0a0a",
        marginBottom: 0,
      }}
    >
      {/* Background image */}
      <img
      src={topImg}
        alt="Billboard"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          objectFit: "cover",
          opacity: 0.45,
        }}
      />

      {/* AI Effect Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={340}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Dark vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 18,
          fontSize: 9,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.55)",
          fontFamily: "'Instrument Sans', sans-serif",

          fontWeight: 500,
          textTransform: "uppercase",
        }}
      >
      </div>

      {/* Brand name with glitch animation */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: "0.12em",
              color: "#fff",
              fontFamily: "'Instrument Sans', sans-serif",

              textTransform: "uppercase",
              textShadow: "0 0 40px rgba(255,200,80,0.4), 0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            DIESEL
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: "0.12em",
              color: "#f97316",
              fontFamily: "'Instrument Sans', sans-serif",

              textTransform: "uppercase",
              opacity: 0.18,
              transform: "translate(-2px, 1px)",
              mixBlendMode: "screen",
            }}
          >
            DIESEL
          </div>
        </div>

      </div>
    </div>
  );
}
