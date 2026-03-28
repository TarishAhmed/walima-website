import { memo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { text: 'In the name of Allah, the Most Gracious, the Most Merciful', className: 'font-arabic text-lg md:text-xl', style: { color: 'var(--color-accent)' } },
  { text: '', spacer: true },
  { text: 'With hearts full of gratitude and joy,', className: 'font-body text-base md:text-lg', style: { color: 'var(--color-muted)' } },
  { text: '', spacer: true },
  { text: 'BB Ahmed Kabeer & Subaida TP', className: 'font-display text-xl md:text-2xl font-semibold', style: { color: 'var(--color-text)' } },
  { text: '— parents of the groom —', className: 'font-body text-sm', style: { color: 'var(--color-muted)' } },
  { text: '', spacer: true },
  { text: 'joyfully invite you to the Walima celebration', className: 'font-body text-base md:text-lg', style: { color: 'var(--color-muted)' } },
  { text: 'of their beloved son', className: 'font-body text-base md:text-lg', style: { color: 'var(--color-muted)' } },
  { text: '', spacer: true },
  { text: 'Tarish Ahmed B & Zujaja K', className: 'font-display italic text-2xl md:text-4xl font-light', style: { color: 'var(--color-text)' } },
  { text: '', spacer: true },
  { text: 'Daughter of K Nasir Ahmed & PM Khadeeja', className: 'font-body text-sm md:text-base', style: { color: 'var(--color-muted)' } },
  { text: '', spacer: true },
  { text: '"And among His signs is that He created for you mates from among yourselves,', className: 'font-body italic text-sm md:text-base', style: { color: 'var(--color-accent)' } },
  { text: 'that you may dwell in tranquility with them..."', className: 'font-body italic text-sm md:text-base', style: { color: 'var(--color-accent)' } },
  { text: '— Surah Ar-Rum 30:21', className: 'font-body text-xs tracking-widest uppercase', style: { color: 'var(--color-muted)' } },
];

function Invitation() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
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
      id="invitation"
      ref={sectionRef}
      className="py-20 md:py-32 px-4"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-[700px] mx-auto ornate-border rounded-lg p-8 md:p-14 text-center">
        {lines.map((line, i) => {
          if (line.spacer) {
            return <div key={i} className="h-4 md:h-6" />;
          }
          return (
            <p
              key={i}
              ref={(el) => (lineRefs.current[i] = el)}
              className={line.className}
              style={{ ...line.style, opacity: 0 }}
            >
              {line.text}
            </p>
          );
        })}
      </div>

      {/* Islamic geometric star divider */}
      <div className="star-divider mt-12">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <polygon
            points="20,2 24,14 37,14 27,22 31,35 20,27 9,35 13,22 3,14 16,14"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1"
          />
          <polygon
            points="20,8 23,16 31,16 25,21 27,29 20,24 13,29 15,21 9,16 17,16"
            fill="var(--color-accent)"
            opacity="0.3"
          />
        </svg>
      </div>
    </section>
  );
}

export default memo(Invitation);
