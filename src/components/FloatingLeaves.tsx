import { useEffect } from 'react';

export default function FloatingLeaves() {
  useEffect(() => {
    const createLeaf = () => {
      const leaf = document.createElement('div');
      leaf.className = 'floating-leaf';
      const size = Math.random() * 18 + 8;
      const startX = Math.random() * window.innerWidth;
      const duration = Math.random() * 15 + 12;
      const delay = Math.random() * 8;
      const isGold = Math.random() > 0.7;

      leaf.style.cssText = `
        left: ${startX}px;
        width: ${size}px;
        height: ${size * 0.4}px;
        border-radius: 50% 50% 50% 0;
        background: ${isGold ? 'rgba(196,168,130,0.35)' : 'rgba(138,158,140,0.3)'};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;

      const page1 = document.getElementById('page1');
      if (page1) {
        page1.appendChild(leaf);
        setTimeout(() => leaf.remove(), (duration + delay) * 1000);
      }
    };

    for (let i = 0; i < 12; i++) {
      setTimeout(createLeaf, i * 1200);
    }

    const interval = setInterval(createLeaf, 3000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
