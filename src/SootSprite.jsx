import React, { useRef, useState, useEffect } from 'react'  
import { useFrame } from '@react-three/fiber'

export default function SootSprite() {
  const groupRef = useRef()
  const leftPupilRef = useRef()   // Referenz für linke Pupille
  const rightPupilRef = useRef()  // Referenz für rechte Pupille
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Körper folgt der Maus
      groupRef.current.position.x += (mousePos.x * 3 - groupRef.current.position.x) * 0.1
      groupRef.current.position.y += (mousePos.y * 3 - groupRef.current.position.y) * 0.1
    }

    // Pupillen schauen zur Maus
    if (leftPupilRef.current && rightPupilRef.current) {
      // Berechne Richtung zur Maus (begrenzt, damit Pupillen im Auge bleiben)
      const pupilRange = 0.03  // Wie weit Pupillen sich bewegen können
      
      // Linke Pupille
      const leftEyeX = -0.15  // Position des linken Auges
      const leftEyeY = 0.1
      const leftDx = (mousePos.x * 3) - leftEyeX
      const leftDy = (mousePos.y * 3) - leftEyeY
      const leftDist = Math.sqrt(leftDx * leftDx + leftDy * leftDy)
      
      leftPupilRef.current.position.x = leftEyeX + (leftDx / leftDist) * Math.min(leftDist, pupilRange)
      leftPupilRef.current.position.y = leftEyeY + (leftDy / leftDist) * Math.min(leftDist, pupilRange)
      
      // Rechte Pupille
      const rightEyeX = 0.15  // Position des rechten Auges
      const rightEyeY = 0.1
      const rightDx = (mousePos.x * 3) - rightEyeX
      const rightDy = (mousePos.y * 3) - rightEyeY
      const rightDist = Math.sqrt(rightDx * rightDx + rightDy * rightDy)
      
      rightPupilRef.current.position.x = rightEyeX + (rightDx / rightDist) * Math.min(rightDist, pupilRange)
      rightPupilRef.current.position.y = rightEyeY + (rightDy / rightDist) * Math.min(rightDist, pupilRange)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Körper aus vielen kleinen Pixeln */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.4) * 0.4,
            (Math.random() - 0.4) * 0.4,
            (Math.random() - 0.4) * 0.1
          ]}
        >
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial 
            color="#0000ff" 
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Linkes Auge - Weißer Teil (bleibt fix) */}
      <mesh position={[-0.15, 0.1, 0.2]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color="white" side={2} />
      </mesh>

      {/* Linke Pupille (bewegt sich) */}
      <mesh ref={leftPupilRef} position={[-0.15, 0.1, 0.21]}>
        <circleGeometry args={[0.04, 32]} />
        <meshStandardMaterial color="black" side={2} />
      </mesh>

      {/* Rechtes Auge - Weißer Teil (bleibt fix) */}
      <mesh position={[0.15, 0.1, 0.2]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color="white" side={2} />
      </mesh>

      {/* Rechte Pupille (bewegt sich) */}
      <mesh ref={rightPupilRef} position={[0.15, 0.1, 0.21]}>
        <circleGeometry args={[0.04, 32]} />
        <meshStandardMaterial color="black" side={2} />
      </mesh>
    </group>
  )
}