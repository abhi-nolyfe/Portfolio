import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const meshRef = useRef();
  const [isInteracting, setIsInteracting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = () => {
      setIsInteracting(true);
    };
    const handlePointerUp = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsInteracting(false), 1000); // Set isInteracting to false with a delay
    };
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  useFrame(({ camera }) => {
    if (!isInteracting) {
      // Calculate target rotation
      const targetRotation = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromRotationMatrix(
          new THREE.Matrix4().lookAt(
            meshRef.current.position,
            camera.position,
            new THREE.Vector3(0, 1, 0)
          )
        ).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI))
      );
      // Interpolate between current rotation and target rotation
      meshRef.current.quaternion.slerp(
        new THREE.Quaternion().setFromEuler(targetRotation),
        0.1
      );
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