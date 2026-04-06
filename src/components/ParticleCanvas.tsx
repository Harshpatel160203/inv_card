import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  isGold: boolean;

  reset: (width: number, height: number) => void;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

function createParticle(width: number, height: number): Particle {
  const particle: Particle = {
    x: 0,
    y: 0,
    size: 0,
    speedY: 0,
    speedX: 0,
    opacity: 0,
    maxOpacity: 0,
    life: 0,
    maxLife: 0,
    isGold: false,

    reset(w: number, h: number) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 1.8 + 0.3;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.35 + 0.05;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 200;
      this.isGold = Math.random() > 0.6;
    },

    update() {
      this.life++;
      if (this.life < 40) {
        this.opacity = (this.life / 40) * this.maxOpacity;
      } else if (this.life > this.maxLife - 40) {
        this.opacity = ((this.maxLife - this.life) / 40) * this.maxOpacity;
      } else {
        this.opacity = this.maxOpacity;
      }
      this.x += this.speedX + Math.sin(this.life * 0.02) * 0.15;
      this.y += this.speedY;
      if (this.life >= this.maxLife) {
        this.reset(window.innerWidth, window.innerHeight);
      }
    },

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.isGold ? '#C4A882' : '#8A9E8C';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  particle.reset(width, height);
  return particle;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 80; i++) {
        const p = createParticle(canvas.width, canvas.height);
        p.life = Math.random() * p.maxLife;
        particlesRef.current.push(p);
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}
