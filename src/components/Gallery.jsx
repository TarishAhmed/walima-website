import { memo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { fetchGalleryImages } from '../firebase/storage.js';

const placeholders = Array.from({ length: 6 }, (_, i) => ({
  id: `placeholder-${i}`,
  isPlaceholder: true,
}));

function PlaceholderCard() {
  return (
    <div
      className="ornate-border rounded-lg overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: 'var(--color-surface)',
        aspectRatio: Math.random() > 0.5 ? '3/4' : '4/3',
        minHeight: '200px',
      }}
    >
      <div className="text-center p-6">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mx-auto mb-3 opacity-30">
          <polygon
            points="30,5 35,20 50,20 38,28 42,43 30,35 18,43 22,28 10,20 25,20"
            stroke="var(--color-accent)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="30" cy="30" r="25" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.5" />
        </svg>
        <p className="font-display italic text-2xl" style={{ color: 'var(--color-accent)', opacity: 0.4 }}>
          T & Z
        </p>
      </div>
    </div>
  );
}

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchGalleryImages()
      .then((imgs) => {
        if (!cancelled) setImages(imgs);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  const allItems = images.length > 0 ? images : placeholders;

  return (
    <section
      id="gallery"
      className="py-20 md:py-32 px-4"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-2xl md:text-4xl text-center mb-12 tracking-wider"
          style={{ color: 'var(--color-accent)' }}
        >
          Gallery
        </h2>

        {/* Masonry grid */}
        <div
          className="gap-4"
          style={{
            columns: 'var(--gallery-cols, 3)',
            columnGap: '1rem',
          }}
        >
          <style>{`
            @media (max-width: 1024px) { #gallery .gap-4 { --gallery-cols: 2; } }
            @media (max-width: 640px) { #gallery .gap-4 { --gallery-cols: 1; } }
          `}</style>

          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton rounded-lg mb-4"
                  style={{
                    height: `${200 + Math.random() * 150}px`,
                    breakInside: 'avoid',
                  }}
                />
              ))
            : allItems.map((item, i) => (
                <div key={item.id || item.name || i} className="mb-4" style={{ breakInside: 'avoid' }}>
                  {item.isPlaceholder ? (
                    <PlaceholderCard />
                  ) : (
                    <Tilt
                      tiltMaxAngleX={8}
                      tiltMaxAngleY={8}
                      glareEnable
                      glareMaxOpacity={0.15}
                      glareColor="var(--color-accent)"
                      glareBorderRadius="0.5rem"
                    >
                      <div
                        className="relative overflow-hidden rounded-lg cursor-pointer gold-shimmer"
                        onClick={() => setLightboxImage(item.url)}
                      >
                        <img
                          src={item.url}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-auto block rounded-lg"
                          style={{ backgroundColor: 'var(--color-surface)' }}
                        />
                      </div>
                    </Tilt>
                  )}
                </div>
              ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
            onClick={closeLightbox}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightboxImage}
              alt="Gallery photo"
              className="max-w-full max-h-[90vh] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-3xl font-light cursor-pointer"
              style={{ color: 'var(--color-text)' }}
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default memo(Gallery);
