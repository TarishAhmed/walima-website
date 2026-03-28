import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

export default function WeddingRings() {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={1.5} />
      <pointLight position={[3, 3, 3]} intensity={4} color="#FFD700" />
      <pointLight position={[-3, -2, 2]} intensity={2} color="#C9A84C" />

      <group ref={groupRef}>
        {/* Ring 1 */}
        <mesh position={[-0.35, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.1, 32, 64]} />
          <meshStandardMaterial
            color="#D4A843"
            emissive="#7A5C1A"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>

        {/* Ring 2 — interlinked */}
        <mesh position={[0.35, 0, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.8, 0.1, 32, 64]} />
          <meshStandardMaterial
            color="#D4A843"
            emissive="#7A5C1A"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>
      </group>
    </>
  );
}
