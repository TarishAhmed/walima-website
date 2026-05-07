<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = canvasRef.value!

  // ─── Scene setup ───────────────────────────────────────────────
  const scene    = new THREE.Scene()
  const W        = canvas.offsetWidth
  const H        = canvas.offsetHeight
  const camera   = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
  camera.position.set(0, 0, 8)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(W, H)
  renderer.setClearColor(0x000000, 0)

  // ─── Materials ─────────────────────────────────────────────────
  const goldMat = new THREE.MeshStandardMaterial({
    color:     new THREE.Color('#C5A028'),
    metalness: 0.95,
    roughness: 0.15,
    envMapIntensity: 1.2,
  })

  // ─── Torus rings (wedding bands) ───────────────────────────────
  const torusGeo = new THREE.TorusGeometry(1.4, 0.18, 64, 128)

  const ring1 = new THREE.Mesh(torusGeo, goldMat)
  ring1.rotation.x = Math.PI / 2.8
  ring1.position.set(-0.8, 0, 0)
  scene.add(ring1)

  const ring2 = new THREE.Mesh(torusGeo, goldMat)
  ring2.rotation.x = Math.PI / 2.8
  ring2.position.set(0.8, 0, 0)
  scene.add(ring2)

  // Subtle diamond sparkle on ring1
  const gemGeo  = new THREE.OctahedronGeometry(0.18, 0)
  const gemMat  = new THREE.MeshStandardMaterial({
    color:     new THREE.Color('#E8D5EC'),
    metalness: 0.1,
    roughness: 0.0,
    transparent: true,
    opacity: 0.88,
  })
  const gem = new THREE.Mesh(gemGeo, gemMat)
  gem.position.set(-0.8, 1.4, 0)
  scene.add(gem)

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

  // ─── Entrance animation ────────────────────────────────────────
  gsap.from([ring1.position, ring2.position], {
    y: -4,
    duration: 1.6,
    ease: 'elastic.out(1, 0.55)',
    stagger: 0.2,
  })
  gsap.from(gem.position, { y: -4, duration: 1.8, ease: 'elastic.out(1, 0.5)', delay: 0.25 })

  // Floating oscillation
  const t0 = Date.now()

  // ─── Mouse parallax ────────────────────────────────────────────
  let mx = 0, my = 0
  const handleMouseMove = (e: MouseEvent) => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2
    my = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', handleMouseMove)

  // ─── Resize ────────────────────────────────────────────────────
  const handleResize = () => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', handleResize)

  // ─── Render loop ───────────────────────────────────────────────
  let raf = 0
  const animate = () => {
    raf = requestAnimationFrame(animate)
    const elapsed = (Date.now() - t0) / 1000

    // Slow auto-rotate
    ring1.rotation.y = elapsed * 0.35
    ring2.rotation.y = -elapsed * 0.35

    // Floating bob
    ring1.position.y = Math.sin(elapsed * 0.7) * 0.12
    ring2.position.y = Math.sin(elapsed * 0.7 + 0.8) * 0.12
    gem.position.y   = 1.4 + Math.sin(elapsed * 0.7) * 0.1

    // Gem sparkle rotation
    gem.rotation.y   = elapsed * 1.5
    gem.rotation.x   = elapsed * 0.6

    // Mouse tilt
    scene.rotation.y = mx * 0.12
    scene.rotation.x = my * -0.06

    // Pulsing rim light
    rim.intensity = 2.5 + Math.sin(elapsed * 1.8) * 0.8

    renderer.render(scene, camera)
  }
  animate()

  onUnmounted(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    renderer.dispose()
  })
})
</script>

<template>
  <section class="section rings-section">
    <canvas ref="canvasRef" class="rings-canvas" aria-label="3D rotating wedding rings" />
  </section>
</template>

<style scoped>
.rings-section {
  background: linear-gradient(160deg, var(--color-cream) 0%, #ede3f0 60%, var(--color-cream) 100%);
  text-align: center;
  padding-bottom: 2rem;
}

.rings-canvas {
  display: block;
  width: 100%;
  max-width: 640px;
  height: 380px;
  margin: 0 auto;
}

.rings-caption {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-plum-lt);
  text-align: center;
  margin-top: 1rem;
  letter-spacing: 0.04em;
}
</style>
