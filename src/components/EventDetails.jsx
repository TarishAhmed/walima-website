import { memo, useRef, useEffect, Suspense, lazy, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

const WeddingRings = lazy(() => import('../three/WeddingRings.jsx'));

const cards = [
  {
    icon: '📅',
    label: 'Date',
    value: 'Saturday, June 21, 2026',
  },
  {
    icon: '🕛',
    label: 'Time',
    value: '12:00 PM IST',
  },
  {
    icon: '📍',
    label: 'Venue',
    value: 'Anugraha Hall, Kathrikadav, Kaloor, Ernakulam',
  },
];

function EventDetails() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { rotateY: -90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="event-details"
      ref={sectionRef}
      className="py-20 md:py-32 px-4"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-2xl md:text-4xl text-center mb-10 tracking-wider"
          style={{ color: 'var(--color-accent)' }}
        >
          Event Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" style={{ perspective: '1000px' }}>
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="ornate-border rounded-xl p-6 md:p-8 text-center"
              style={{
                backgroundColor: 'var(--color-surface)',
                opacity: 0,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3
                className="font-display text-lg tracking-widest uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                {card.label}
              </h3>
              <p className="font-body text-base md:text-lg" style={{ color: 'var(--color-text)' }}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Wedding Rings 3D */}
        <div className="mt-12 flex justify-center">
          {!isMobile ? (
            <div className="w-64 h-48" aria-hidden="true" style={{ pointerEvents: 'none' }}>
              <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <Suspense fallback={null}>
                  <WeddingRings />
                </Suspense>
              </Canvas>
            </div>
          ) : (
            <div aria-hidden="true" style={{ color: 'var(--color-accent)' }} className="opacity-30">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
                <circle cx="35" cy="30" r="20" stroke="currentColor" strokeWidth="2" />
                <circle cx="65" cy="30" r="20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(EventDetails);
