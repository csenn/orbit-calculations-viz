import { useRef } from "react";
import { Group, Vector3 } from "three";
import type { ClassicalOrbitalElements } from "../utils/commonOrbitalElementsCalc";
// import { useFrame } from '@react-three/fiber';

export function SatelliteModel({
  classicalOrbitElements,
  scale = 300,
}: {
  classicalOrbitElements: ClassicalOrbitalElements;
  scale?: number;
}) {
  const groupRef = useRef<Group>(null);

  // useFrame(() => {
  //   if (groupRef.current) {
  //     groupRef.current.rotation.y += 0.01; // optional slow spin
  //   }
  // });

  const position = new Vector3(
    classicalOrbitElements.position.x,
    classicalOrbitElements.position.y,
    classicalOrbitElements.position.z,
  );

  const green = "#4caf50";

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Central body */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="silver" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Solar panels */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[2, 0.2, 1]} />
        <meshStandardMaterial color={green} />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[2, 0.2, 1]} />
        <meshStandardMaterial color={green} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}
