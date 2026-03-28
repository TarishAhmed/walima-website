import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { submitRSVP } from '../firebase/firestore.js';
import emailjs from 'emailjs-com';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function RSVPForm() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const fireConfetti = useCallback(() => {
    const defaults = {
      colors: ['#C9A84C', '#8B0000', '#C0392B', '#F5F0E8'],
      spread: 80,
      ticks: 100,
      gravity: 0.8,
      scalar: 1.2,
    };
    confetti({ ...defaults, particleCount: 60, origin: { y: 0.7, x: 0.3 } });
    confetti({ ...defaults, particleCount: 60, origin: { y: 0.7, x: 0.7 } });
  }, []);

  const handleSubmit = useCallback(async () => {
    setError('');
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    setLoading(true);
    try {
      await submitRSVP({ name: name.trim(), attending, guests: attending ? guests : 0 });

      // EmailJS notification (silent fail if not configured)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (serviceId && templateId && publicKey) {
        emailjs.send(serviceId, templateId, {
          name: name.trim(),
          attending: attending ? 'Yes' : 'No',
          guests: attending ? guests : 0,
        }, publicKey).catch(() => {});
      }

      setSubmitted(true);
      fireConfetti();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [name, attending, guests, fireConfetti]);

  if (submitted) {
    return (
      <section
        id="rsvp"
        className="py-20 md:py-32 px-4"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[560px] mx-auto ornate-border rounded-xl p-10 text-center"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <div className="text-5xl mb-4">✓</div>
          <p className="font-display text-xl md:text-2xl italic" style={{ color: 'var(--color-accent)' }}>
            JazakAllahu Khayran!
          </p>
          <p className="font-body text-sm mt-3" style={{ color: 'var(--color-muted)' }}>
            We look forward to celebrating with you.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="py-20 md:py-32 px-4"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-[560px] mx-auto">
        <h2
          className="font-display text-2xl md:text-4xl text-center mb-10 tracking-wider"
          style={{ color: 'var(--color-accent)' }}
        >
          RSVP
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="ornate-border rounded-xl p-8 md:p-10"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          {/* Name */}
          <motion.div variants={fieldVariants} className="mb-6">
            <label className="block font-body text-sm mb-2 tracking-wider uppercase" style={{ color: 'var(--color-muted)' }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg font-body text-base outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--color-accent)]"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                border: '1px solid rgba(201, 168, 76, 0.3)',
              }}
            />
          </motion.div>

          {/* Attending toggle */}
          <motion.div variants={fieldVariants} className="mb-6">
            <label className="block font-body text-sm mb-2 tracking-wider uppercase" style={{ color: 'var(--color-muted)' }}>
              Attending
            </label>
            <div className="flex gap-0 rounded-lg overflow-hidden" style={{ border: '1px solid rgba(201, 168, 76, 0.3)' }}>
              <button
                type="button"
                onClick={() => setAttending(true)}
                className="flex-1 py-3 font-body text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: attending ? 'var(--color-primary)' : 'var(--color-bg)',
                  color: attending ? 'var(--color-text)' : 'var(--color-muted)',
                }}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className="flex-1 py-3 font-body text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: !attending ? 'var(--color-secondary)' : 'var(--color-bg)',
                  color: !attending ? 'var(--color-text)' : 'var(--color-muted)',
                }}
              >
                No
              </button>
            </div>
          </motion.div>

          {/* Number of Guests */}
          {attending && (
            <motion.div
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <label className="block font-body text-sm mb-2 tracking-wider uppercase" style={{ color: 'var(--color-muted)' }}>
                Number of Guests
              </label>
              <div
                className="flex items-center rounded-lg overflow-hidden font-body text-base"
                style={{ border: '1px solid rgba(201, 168, 76, 0.3)', backgroundColor: 'var(--color-bg)' }}
              >
                <button
                  type="button"
                  onClick={() => setGuests(g => Math.max(1, g - 1))}
                  className="px-4 py-3 transition-colors duration-200 select-none cursor-pointer"
                  style={{ color: 'var(--color-accent)', borderRight: '1px solid rgba(201, 168, 76, 0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => setGuests(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="flex-1 text-center py-3 outline-none bg-transparent font-body text-base"
                  style={{ color: 'var(--color-text)' }}
                />
                <button
                  type="button"
                  onClick={() => setGuests(g => Math.min(10, g + 1))}
                  className="px-4 py-3 transition-colors duration-200 select-none cursor-pointer"
                  style={{ color: 'var(--color-accent)', borderLeft: '1px solid rgba(201, 168, 76, 0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  +
                </button>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <p className="text-sm mb-4" style={{ color: 'var(--color-primary-light)' }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <motion.div variants={fieldVariants}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-lg font-body text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer disabled:opacity-50"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-accent)',
                border: '1px solid var(--color-accent)',
              }}
            >
              {loading ? (
                <span className="inline-block animate-spin">⟳</span>
              ) : (
                'Send RSVP'
              )}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(RSVPForm);
