import { Canvas } from '@react-three/fiber'
import SootSprite from './SootSprite'

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: '#f0f0f0' }}
    >
      <ambientLight intensity={0.5} />
      <SootSprite />
    </Canvas>
  )
}