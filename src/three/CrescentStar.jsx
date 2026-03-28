import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CrescentMoon() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const outerR = 1.2;
    const innerR = 0.95;
    const offsetX = 0.35;

    // Outer circle
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      const x = Math.cos(angle) * outerR;
      const y = Math.sin(angle) * outerR;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }

    // Inner circle (subtracted via hole)
    const hole = new THREE.Path();
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      const x = Math.cos(angle) * innerR + offsetX;
      const y = Math.sin(angle) * innerR;
      if (i === 0) hole.moveTo(x, y);
      else hole.lineTo(x, y);
    }
    s.holes.push(hole);
    return s;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    });
  }, [shape]);

  return (
    <mesh geometry={geometry} position={[-0.3, 0, 0]}>
      <meshStandardMaterial
        color="#C9A84C"
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
}

function Star({ position = [1.2, 0.5, 0], scale = 0.3 }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const points = 5;
    const outerR = 1;
    const innerR = 0.4;

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();
    return s;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    });
  }, [shape]);

  return (
    <mesh geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial
        color="#C9A84C"
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
}

export default function CrescentStar() {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      <CrescentMoon />
      <Star />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#C9A84C" />
    </group>
  );
}
