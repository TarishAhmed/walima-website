<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(
      footerRef.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.value,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, footerRef.value);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <footer
    ref="footerRef"
    class="py-20 md:py-32 px-4 text-center"
    style="background-color: var(--color-secondary); opacity: 0"
  >
    <!-- Gold divider -->
    <div
      class="max-w-xs mx-auto mb-10 h-px"
      style="background: linear-gradient(90deg, transparent, var(--color-accent), transparent)"
    />

    <!-- Decorative crescent SVG -->
    <div class="mb-8 flex justify-center" aria-hidden="true">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" class="opacity-50">
        <circle cx="25" cy="30" r="20" stroke="var(--color-accent)" stroke-width="1" />
        <circle cx="33" cy="30" r="17" fill="var(--color-secondary)" stroke="none" />
        <polygon
          points="48,18 50,23 55,23 51,26 52,31 48,28 44,31 45,26 41,23 46,23"
          fill="var(--color-accent)"
          opacity="0.6"
        />
      </svg>
    </div>

    <!-- Closing dua — Arabic -->
    <div dir="rtl" class="mb-4">
      <p class="font-arabic text-lg md:text-2xl leading-relaxed" style="color: var(--color-accent)">
        بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
      </p>
    </div>

    <!-- Transliteration -->
    <p class="font-body italic text-sm md:text-base mb-8" style="color: var(--color-muted)">
      &ldquo;Barakallahu lakuma wa baraka alaykuma wa jama&apos;a baynakuma fi khayr&rdquo;
    </p>

    <!-- Names -->
    <p class="font-display italic text-xl md:text-2xl mb-2" style="color: var(--color-text)">
      Tarish &amp; Zujaja
    </p>
    <p class="font-body text-sm tracking-widest" style="color: var(--color-muted)">
      2026
    </p>
  </footer>
</template>
