import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SootSprite() {
  const groupRef = useRef()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Maus-Position tracken
  useState(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animation pro Frame
  useFrame(() => {
    if (groupRef.current) {
      // Smooth follow
      groupRef.current.position.x += (mousePos.x * 2 - groupRef.current.position.x) * 0.1
      groupRef.current.position.y += (mousePos.y * 2 - groupRef.current.position.y) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Körper aus vielen kleinen Pixeln */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.2
          ]}
        >
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Linkes Auge */}
      <mesh position={[-0.15, 0.1, 0.15]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.15, 0.1, 0.2]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Rechtes Auge */}
      <mesh position={[0.15, 0.1, 0.15]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.15, 0.1, 0.2]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  )
}