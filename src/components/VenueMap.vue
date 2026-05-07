<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=Anugraha+Hall+Kathrikadav+Kaloor+Ernakulam&output=embed';
const MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Anugraha+Hall+Kathrikadav+Kaloor+Ernakulam';

const sectionRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(
      sectionRef.value,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, sectionRef.value);
});

onUnmounted(() => ctx?.revert());

function onBtnEnter(e) {
  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
  e.currentTarget.style.color = 'var(--color-secondary)';
}
function onBtnLeave(e) {
  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
  e.currentTarget.style.color = 'var(--color-accent)';
}
</script>

<template>
  <section
    id="venue"
    ref="sectionRef"
    class="py-20 md:py-32 px-4"
    style="background-color: var(--color-secondary); opacity: 0"
  >
    <div class="max-w-4xl mx-auto">
      <h2
        class="font-display text-2xl md:text-4xl text-center mb-10 tracking-wider"
        style="color: var(--color-accent)"
      >
        Venue
      </h2>

      <!-- Map -->
      <div class="ornate-border rounded-lg overflow-hidden">
        <div class="h-[260px] md:h-[450px]">
          <iframe
            :src="MAPS_EMBED_URL"
            width="100%"
            height="100%"
            style="border: 0; display: block"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Venue location"
          />
        </div>
      </div>

      <!-- Address + Directions -->
      <div class="mt-8 text-center">
        <div class="flex items-center justify-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--color-accent)">
            <path d="M10 0C6.13 0 3 3.13 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S8.62 4.5 10 4.5s2.5 1.12 2.5 2.5S11.38 9.5 10 9.5z" />
          </svg>
          <p class="font-body text-base md:text-lg" style="color: var(--color-text)">
            Anugraha Hall, Kathrikadav, Kaloor, Ernakulam
          </p>
        </div>

        <a
          :href="MAPS_DIRECTIONS_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block px-8 py-3 rounded-lg font-body text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-90"
          style="background-color: var(--color-primary); color: var(--color-accent); border: 1px solid var(--color-accent)"
          @mouseenter="onBtnEnter"
          @mouseleave="onBtnLeave"
        >
          Get Directions
        </a>
      </div>
    </div>
  </section>
</template>
