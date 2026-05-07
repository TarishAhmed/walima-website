<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { icon: '📅', label: 'Date', value: 'Saturday, June 21, 2026' },
  { icon: '🕛', label: 'Time', value: '12:00 PM' },
  { icon: '📍', label: 'Venue', value: 'Anugraha Hall, Kathrikadav, Kaloor, Ernakulam' },
];

const sectionRef = ref(null);
const cardRefs = ref([]);
const canvasContainer = ref(null);
// const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx, renderer, scene, camera, group, animFrameId;

function initRings() {
  if (!canvasContainer.value) return;

  scene = new THREE.Scene();
  const w = canvasContainer.value.clientWidth;
  const h = canvasContainer.value.clientHeight;
  camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
  camera.position.set(0, 0, 3);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  canvasContainer.value.appendChild(renderer.domElement);

  // ─── Lights ────────────────────────────────────────────────────
  const ambient = new THREE.AmbientLight(0xfff4e0, 1.2)
  scene.add(ambient)

  const key = new THREE.DirectionalLight(0xffeebb, 3.5)
  key.position.set(5, 8, 6)
  scene.add(key)

  const fill = new THREE.DirectionalLight(0xc4a4ca, 2.0)
  fill.position.set(-5, -2, 4)
  scene.add(fill)

  const rim = new THREE.PointLight(0xc5a028, 2.5, 15)
  rim.position.set(0, -3, 4)
  scene.add(rim)

  const ringMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C5A028'),
    metalness: 0.95,
    roughness: 0.15,
    envMapIntensity: 1.2,
  });

  const torusGeo = new THREE.TorusGeometry(0.8, 0.18, 64, 128)

  group = new THREE.Group();
  const ring1 = new THREE.Mesh(torusGeo, ringMat);
  ring1.position.set(-0.35, 0, 0);
  ring1.rotation.x = (Math.PI / 2) * -0.1;
  group.add(ring1);

  const ring2 = new THREE.Mesh(torusGeo, ringMat.clone());
  ring2.position.set(0.45, 0, 0);
  ring2.rotation.x = (Math.PI / 2) * 0.1;
  group.add(ring2);

  scene.add(group);

  let prevTime = performance.now();
  const animate = () => {
    animFrameId = requestAnimationFrame(animate);
    const now = performance.now();
    const delta = (now - prevTime) / 1000;
    prevTime = now;
    group.rotation.y += delta * 0.2;
    group.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    renderer.render(scene, camera);
  };
  animate();
}

onMounted(() => {
  ctx = gsap.context(() => {
    cardRefs.value.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { rotateY: -90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, sectionRef.value);

  initRings();
});

onUnmounted(() => {
  ctx?.revert();
  cancelAnimationFrame(animFrameId);
  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
  }
});
</script>

<template>
  <section
    id="event-details"
    ref="sectionRef"
    class="py-20 md:py-32 px-4"
    style="background-color: var(--color-bg)"
  >
    <div class="max-w-5xl mx-auto">
      <h2
        class="font-display text-2xl md:text-4xl text-center mb-10 tracking-wider"
        style="color: var(--color-accent)"
      >
        Event Details
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" style="perspective: 1000px">
        <div
          v-for="(card, i) in cards"
          :key="i"
          :ref="el => { cardRefs[i] = el }"
          class="ornate-border rounded-xl p-6 md:p-8 text-center"
          style="background-color: var(--color-surface); opacity: 0; transform-style: preserve-3d"
        >
          <div class="text-4xl mb-4">{{ card.icon }}</div>
          <h3
            class="font-display text-lg tracking-widest uppercase mb-3"
            style="color: var(--color-accent)"
          >
            {{ card.label }}
          </h3>
          <p class="font-body text-base md:text-lg" style="color: var(--color-text)">
            {{ card.value }}
          </p>
        </div>
      </div>

      <!-- Wedding Rings 3D -->
      <div class="mt-12 flex justify-center">
        <div
          ref="canvasContainer"
          class="w-64 h-48"
          aria-hidden="true"
          style="pointer-events: none"
        />
      </div>
    </div>
  </section>
</template>
