import { memo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-20 md:py-32 px-4 text-center"
      style={{ backgroundColor: 'var(--color-secondary)', opacity: 0 }}
    >
      {/* Gold divider */}
      <div
        className="max-w-xs mx-auto mb-10 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
        }}
      />

      {/* Lottie placeholder — decorative crescent SVG */}
      <div className="mb-8 flex justify-center" aria-hidden="true">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="opacity-50">
          <circle cx="25" cy="30" r="20" stroke="var(--color-accent)" strokeWidth="1" />
          <circle cx="33" cy="30" r="17" fill="var(--color-secondary)" stroke="none" />
          <polygon
            points="48,18 50,23 55,23 51,26 52,31 48,28 44,31 45,26 41,23 46,23"
            fill="var(--color-accent)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Closing dua — Arabic */}
      <div dir="rtl" className="mb-4">
        <p className="font-arabic text-lg md:text-2xl leading-relaxed" style={{ color: 'var(--color-accent)' }}>
          بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>
      </div>

      {/* Transliteration */}
      <p className="font-body italic text-sm md:text-base mb-8" style={{ color: 'var(--color-muted)' }}>
        &ldquo;Barakallahu lakuma wa baraka alaykuma wa jama&apos;a baynakuma fi khayr&rdquo;
      </p>

      {/* Names */}
      <p className="font-display italic text-xl md:text-2xl mb-2" style={{ color: 'var(--color-text)' }}>
        Tarish & Zujaja
      </p>
      <p className="font-body text-sm tracking-widest" style={{ color: 'var(--color-muted)' }}>
        2026
      </p>
    </footer>
  );
}

export default memo(Footer);
