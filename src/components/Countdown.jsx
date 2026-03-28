import { memo, useRef, useState, useEffect } from 'react';
import useCountdown from '../hooks/useCountdown.js';

const units = ['days', 'hours', 'minutes', 'seconds'];
const labels = { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' };

function FlipDigit({ value, label }) {
  const [displayVal, setDisplayVal] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlipping(true);
      const timeout = setTimeout(() => {
        setDisplayVal(value);
        setFlipping(false);
        prevRef.current = value;
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [value]);

  const formatted = String(displayVal).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-lg w-16 h-20 md:w-28 md:h-32 flex items-center justify-center"
        style={{
          backgroundColor: 'var(--color-primary)',
          perspective: '300px',
        }}
      >
        <div
          className={`font-display font-bold text-3xl md:text-5xl transition-transform duration-300 ${
            flipping ? 'flip-enter' : ''
          }`}
          style={{ color: 'var(--color-text)', transformStyle: 'preserve-3d' }}
        >
          {formatted}
        </div>
        {/* Center line */}
        <div
          className="absolute left-0 right-0 h-px top-1/2"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        />
      </div>
      <span
        className="mt-2 font-body text-xs md:text-sm tracking-widest uppercase"
        style={{ color: 'var(--color-accent)' }}
      >
        {label}
      </span>
    </div>
  );
}

function Countdown() {
  const timeLeft = useCountdown();

  return (
    <section
      id="countdown"
      className="py-20 md:py-32 px-4"
      style={{ backgroundColor: 'var(--color-secondary)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="font-display text-2xl md:text-3xl mb-10 tracking-wider"
          style={{ color: 'var(--color-accent)' }}
        >
          Counting Down To Our Celebration
        </h2>
        <div className="flex justify-center gap-2 md:gap-6">
          {units.map((unit) => (
            <FlipDigit key={unit} value={timeLeft[unit]} label={labels[unit]} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Countdown);
