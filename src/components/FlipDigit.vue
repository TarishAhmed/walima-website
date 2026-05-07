<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  value: { type: Number, required: true },
  label: { type: String, required: true },
});

const displayVal = ref(props.value);
const flipping = ref(false);
let flipTimer;

watch(
  () => props.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      flipping.value = true;
      clearTimeout(flipTimer);
      flipTimer = setTimeout(() => {
        displayVal.value = newVal;
        flipping.value = false;
      }, 300);
    }
  }
);

function pad(v) {
  return String(v).padStart(2, '0');
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="relative overflow-hidden rounded-lg w-16 h-20 md:w-28 md:h-32 flex items-center justify-center"
      style="background-color: var(--color-primary); perspective: 300px"
    >
      <div
        class="font-display font-bold text-3xl md:text-5xl transition-transform duration-300"
        :class="{ 'flip-enter': flipping }"
        style="color: var(--color-text); transform-style: preserve-3d"
      >
        {{ pad(displayVal) }}
      </div>
      <div
        class="absolute left-0 right-0 h-px top-1/2"
        style="background-color: rgba(0,0,0,0.3)"
      />
    </div>
    <span
      class="mt-2 font-body text-xs md:text-sm tracking-widest uppercase"
      style="color: var(--color-accent)"
    >
      {{ label }}
    </span>
  </div>
</template>
