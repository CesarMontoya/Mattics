import React, { useEffect, useRef, useState } from 'react';

interface Symbol {
  id: number;
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
  vr: number;
}

const MATH_SYMBOLS = ['∑', '√', 'π', '∞', '∫', '∆', '≈', '≠', '±', '÷', '×', 'θ', 'λ', 'Ω', 'μ', 'σ', 'φ', 'δ', '∈', '∀', '∃', '∠', '⊥', '⊂'];

export const MathSymbolsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbolsRef = useRef<Symbol[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize symbols
    const initialSymbols: Symbol[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      char: MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 20 + 15,
      opacity: Math.random() * 0.4 + 0.1,
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.05,
    }));
    symbolsRef.current = initialSymbols;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let animationId: number;
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      symbolsRef.current.forEach((s) => {
        // --- Physics Logic ---
        
        // 1. Attraction to cursor (with a "sluggish" feel)
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - s.x;
          const dy = mouseRef.current.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Only attract if within range, but keep a minimum distance (don't collapse)
          const attractionRange = 500;
          const minDistance = 100;

          if (dist < attractionRange && dist > minDistance) {
            // Lower force makes it feel like it "costs" to move (sluggish)
            const strength = 0.0005; 
            s.vx += dx * strength;
            s.vy += dy * strength;
          } else if (dist <= minDistance) {
            // Repulsion from cursor if too close
            const repulsionStrength = 0.001;
            s.vx -= dx * repulsionStrength;
            s.vy -= dy * repulsionStrength;
          }
        }

        // 2. Separation/Repulsion between symbols (to avoid clumping)
        symbolsRef.current.forEach((other) => {
          if (s.id === other.id) return;
          const dx = other.x - s.x;
          const dy = other.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minSep = 60;

          if (dist < minSep) {
            const force = (minSep - dist) * 0.0001;
            s.vx -= dx * force;
            s.vy -= dy * force;
          }
        });

        // 3. Natural Drift
        s.vx += (Math.random() - 0.5) * 0.05;
        s.vy += (Math.random() - 0.5) * 0.05;

        // 4. Friction/Damping (High damping makes it feel heavy/smooth)
        s.vx *= 0.95;
        s.vy *= 0.95;

        // 5. Update position
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vr;

        // Boundary check (wrap around with padding)
        const pad = 100;
        if (s.x < -pad) s.x = canvas.width + pad;
        if (s.x > canvas.width + pad) s.x = -pad;
        if (s.y < -pad) s.y = canvas.height + pad;
        if (s.y > canvas.height + pad) s.y = -pad;

        // --- Rendering Logic ---
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.font = `${s.size}px "Outfit", sans-serif`; // Using a cleaner font
        
        let color = 'rgba(0, 0, 0,';
        if (document.documentElement.classList.contains('dark')) {
          color = 'rgba(255, 255, 255,';
        }
        
        ctx.fillStyle = `${color} ${s.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.char, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};
