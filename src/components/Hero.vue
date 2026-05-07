<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import * as THREE from 'three';

const bismillah = 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

const canvasContainer = ref(null);
const bismillahRef = ref(null);
const namesRef = ref(null);
const subtitleRef = ref(null);
const scrollRef = ref(null);

let renderer, scene, camera, particles, speeds, particleCount, animFrameId;

function initThree() {
  if (!canvasContainer.value) return;
  const isMobile = window.innerWidth < 768;
  particleCount = isMobile ? 500 : 3000;

  scene = new THREE.Scene();
  const w = canvasContainer.value.clientWidth;
  const h = canvasContainer.value.clientHeight;
  camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
  camera.position.set(0, 0, 5);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  canvasContainer.value.appendChild(renderer.domElement);

  const positions = new Float32Array(particleCount * 3);
  speeds = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    speeds[i] = 0.002 + Math.random() * 0.008;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    size: 0.02,
    color: '#C9A84C',
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    depthWrite: false,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const animate = () => {
    animFrameId = requestAnimationFrame(animate);
    const pos = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  };
  animate();
}

function handleResize() {
  if (!canvasContainer.value || !renderer) return;
  const w = canvasContainer.value.clientWidth;
  const h = canvasContainer.value.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

onMounted(() => {
  initThree();
  window.addEventListener('resize', handleResize);
  gsap.fromTo(bismillahRef.value, { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 0.5, duration: 0.8 });
  gsap.fromTo(namesRef.value, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, delay: 1.2, duration: 0.8, ease: 'power2.out' });
  gsap.fromTo(subtitleRef.value, { opacity: 0 }, { opacity: 1, delay: 1.8, duration: 0.8 });
  gsap.fromTo(scrollRef.value, { opacity: 0 }, { opacity: 1, delay: 2.5, duration: 0.8 });
});

onUnmounted(() => {
  cancelAnimationFrame(animFrameId);
  window.removeEventListener('resize', handleResize);
  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
  }
});
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden islamic-pattern-bg"
  >
    <!-- 3D Particle Canvas -->
    <div
      ref="canvasContainer"
      class="absolute inset-0 z-0"
      style="pointer-events: none"
      aria-hidden="true"
    />

    <!-- Content overlay -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <!-- Bismillah -->
      <div ref="bismillahRef" class="mb-8" style="opacity: 0" dir="rtl">
        <span class="font-arabic text-2xl md:text-4xl" style="color: var(--color-accent)">
          {{ bismillah }}
        </span>
      </div>

      <!-- Names -->
      <div ref="namesRef" class="mb-6" style="opacity: 0">
        <h1
          class="font-display italic font-light leading-tight"
          style="font-size: clamp(2rem, 6vw, 5rem); color: var(--color-text)"
        >
          Tarish Ahmed B
        </h1>
        <span class="inline-block my-2 text-xl md:text-2xl" style="color: var(--color-accent)">♦</span>
        <h1
          class="font-display italic font-light leading-tight"
          style="font-size: clamp(2rem, 6vw, 5rem); color: var(--color-text)"
        >
          Zujaja K
        </h1>
      </div>

      <!-- Subtitle -->
      <p
        ref="subtitleRef"
        class="font-display tracking-widest uppercase text-sm md:text-lg"
        style="color: var(--color-accent); opacity: 0"
      >
        Walima ul-Urs
      </p>

      <!-- Scroll indicator -->
      <div ref="scrollRef" class="mt-16 scroll-bounce" style="opacity: 0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-accent)"
          stroke-width="2"
          class="mx-auto"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  </section>
</template>
