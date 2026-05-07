<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import FlipDigit from './FlipDigit.vue';

const TARGET_DATE = new Date('2026-06-21T12:00:00+05:30').getTime();

function calculateTimeLeft() {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const timeLeft = ref(calculateTimeLeft());
const units = ['days', 'hours', 'minutes', 'seconds'];
const labels = { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' };
let timer;

onMounted(() => {
  timer = setInterval(() => {
    timeLeft.value = calculateTimeLeft();
  }, 1000);
});

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <section
    id="countdown"
    class="py-20 md:py-32 px-4"
    style="background-color: var(--color-secondary)"
  >
    <div class="max-w-3xl mx-auto text-center">
      <h2
        class="font-display text-2xl md:text-3xl mb-10 tracking-wider"
        style="color: var(--color-accent)"
      >
        Counting Down To Our Celebration
      </h2>
      <div class="flex justify-center gap-2 md:gap-6">
        <FlipDigit
          v-for="unit in units"
          :key="unit"
          :value="timeLeft[unit]"
          :label="labels[unit]"
        />
      </div>
    </div>
  </section>
</template>
