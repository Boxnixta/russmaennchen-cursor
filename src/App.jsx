import React from 'react'  // ← Diese Zeile fehlte!
import { Canvas } from '@react-three/fiber'
import SootSprite from './SootSprite'
import Star from './Star'

export default function App() {
  return (
<Canvas
  gl={{ 
    antialias: true, 
    toneMapping: 0, // 0 steht für NoToneMapping (ballert!)
  }}
>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={5} />
      <SootSprite />
      <Star />
    </Canvas>
  )
}