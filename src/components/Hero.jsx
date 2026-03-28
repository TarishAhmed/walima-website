import { memo, useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';

const ParticleField = lazy(() => import('../three/ParticleField.jsx'));
const CrescentStar = lazy(() => import('../three/CrescentStar.jsx'));

const bismillah = 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

function Hero() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setShowCanvas(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden islamic-pattern-bg"
    >
      {/* 3D Canvas */}
      {showCanvas && (
        <div
          className="absolute inset-0 z-0"
          style={{ pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <ParticleField count={isMobile ? 500 : 3000} />
              <CrescentStar />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Static SVG fallback for mobile */}
      {/* {isMobile && (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-64 h-64" fill="none">
            <circle cx="90" cy="100" r="60" stroke="var(--color-accent)" strokeWidth="2" />
            <circle cx="110" cy="100" r="50" fill="var(--color-bg)" stroke="var(--color-bg)" strokeWidth="2" />
            <polygon
              points="150,65 156,82 174,82 160,93 165,110 150,100 135,110 140,93 126,82 144,82"
              fill="var(--color-accent)"
            />
          </svg>
        </div>
      )} */}

      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Bismillah */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
          dir="rtl"
        >
          <span className="font-arabic text-2xl md:text-4xl" style={{ color: 'var(--color-accent)' }}>
            {bismillah}
          </span>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <h1
            className="font-display italic font-light leading-tight"
            style={{
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              color: 'var(--color-text)',
            }}
          >
            Tarish Ahmed B
          </h1>
          <span
            className="inline-block my-2 text-xl md:text-2xl"
            style={{ color: 'var(--color-accent)' }}
          >
            ♦
          </span>
          <h1
            className="font-display italic font-light leading-tight"
            style={{
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              color: 'var(--color-text)',
            }}
          >
            Zujaja K
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="font-display tracking-widest uppercase text-sm md:text-lg"
          style={{ color: 'var(--color-accent)' }}
        >
          Walima ul-Urs
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mt-16 scroll-bounce"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            className="mx-auto"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Hero);
