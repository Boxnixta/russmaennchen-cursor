import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Star() {
  const groupRef = useRef()
  // die Kamera und die Größe des Viewports von Three.js
  const { viewport, camera, mouse } = useThree()
  
  const colors = ['#FFB7C5', '#98FB98', '#FDFD96', '#AEC6CF', '#FFDAC1']
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    document.body.style.cursor = 'none'
    const handleClick = () => setColorIndex((prev) => (prev + 1) % colors.length) // wechselt die Farbe bei jedem Klick
    window.addEventListener('mousedown', handleClick)
    return () => {
      window.removeEventListener('mousedown', handleClick)
      document.body.style.cursor = 'auto'
    }
  }, [])

  const spikes = useMemo(() => {
    const tempGeo = new THREE.IcosahedronGeometry(0.1, 0) // Einfache Geometrie, um die Positionen der Spitzen zu erhalten
    const posAttr = tempGeo.attributes.position
    const spikeData = []
    for (let i = 0; i < posAttr.count; i++) {
      const position = new THREE.Vector3().fromBufferAttribute(posAttr, i)
      const quaternion = new THREE.Quaternion()
      const up = new THREE.Vector3(0, 1, 0)
      quaternion.setFromUnitVectors(up, position.clone().normalize())
      spikeData.push({ position, quaternion })
    }
    return spikeData
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // die exakte Position im 3D-Raum basierend auf dem Viewport
      // mouse.x/y geht von -1 bis 1. viewport.width/height sagt: wie groß das Feld in 3D ist.
      const x = (mouse.x * viewport.width) / 2
      const y = (mouse.y * viewport.height) / 2
      
      // Sofortiges Folgen ohne Verzögerung und mit einem festen Z-Wert für die Tiefe
      groupRef.current.position.set(x, y, 1.5)
      
      // Rotation bleibt für den 3D-Look konstant
      groupRef.current.rotation.x += 0.01
      groupRef.current.rotation.y += 0.015
    }
  })

  return (
    <group ref={groupRef} scale={[0.6, 0.6, 0.6]}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={colors[colorIndex]} toneMapped={false} />
      </mesh>
      {spikes.map((spike, i) => (
        <mesh key={i} position={spike.position} quaternion={spike.quaternion}>
          <coneGeometry args={[0.07, 0.1, 4]} />
          <meshBasicMaterial color={colors[colorIndex]} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}