import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const meshRef = useRef();
  const [isInteracting, setIsInteracting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleInteraction = () => {
      setIsInteracting(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsInteracting(false), 1000);
    };
    window.addEventListener("mousemove", handleInteraction);
    return () => window.removeEventListener("mousemove", handleInteraction);
  }, []);

  useFrame(({ camera }) => {
    if (!isInteracting) {
      meshRef.current.lookAt(camera.position);
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow ref={meshRef} scale={2.75}>
        <icosahedronGeometry args={[1, 10]} />
        <meshStandardMaterial
          color="#19001E"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          roughness={0.85}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, name }) => {
  return (
    <>
      <Canvas
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
            enableZoom={false}
          />
          <Ball imgUrl={icon} />
        </Suspense>   

        <Preload all />
      </Canvas>
      <div className="flex justify-center text-slate-500">
        {name}
      </div>
    </>
  );
};

export default BallCanvas;