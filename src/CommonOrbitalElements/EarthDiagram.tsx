import { Canvas } from "@react-three/fiber";
import { Earth } from "./common/Earth";
import { EarthCoords } from "./common/EarthCoords";
import { CameraController } from "./common/CameraController";
import { CameraPanel } from "./CameraPanel";
import { PositionAndVelocity } from "./common/PositionAndVelocity";
import {
  convertCoordEciToThree,
  multiplyVectorByScalar,
  type ClassicalOrbitalElements,
  type VectorThree,
} from "./calc";
import { Orbit } from "./Orbit";
import { EquatorPlane } from "./EquatorPlane";
import { useRef, type ReactNode } from "react";
import * as THREE from "three";

function ECIFrame({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null!);

  // Rotate -90° around X to align ECI +Z (North Pole) to R3F +Y
  return (
    <group ref={group} rotation={[-Math.PI / 2, 0, 0]}>
      {children}
    </group>
  );
}

interface EarthDiagramProps {
  positionVector: VectorThree;
  velocityVector: VectorThree;
  classicalOrbitElements: ClassicalOrbitalElements;
}

export function EarthDiagram({
  positionVector,
  velocityVector,
  classicalOrbitElements,
}: EarthDiagramProps) {
  const positionThree = positionVector;
  const velocityThree = velocityVector;
  const nThree = classicalOrbitElements.nVector;
  // const nThree = classicalOrbitElements.nVector
  const eccentricityThree = multiplyVectorByScalar(
    100000,
    convertCoordEciToThree(classicalOrbitElements.eccentricityVector),
  );

  return (
    <>
      <Canvas
        camera={{
          position: [20000, 0, 0],
          fov: 75,
          far: 500000,
        }}
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
        }}
      >
        <ECIFrame>
          <ambientLight intensity={Math.PI / 2} />

          <Earth />
          <EarthCoords />
          <CameraController />
          <PositionAndVelocity
            positionVector={positionThree}
            velocityVector={velocityThree}
            nVector={nThree}
            eccentricityVector={eccentricityThree}
          />
          <Orbit classicalOrbitElements={classicalOrbitElements} />
          <EquatorPlane size={classicalOrbitElements.semiMajorAxis * 3} />
        </ECIFrame>
      </Canvas>

      <CameraPanel />
    </>
  );
}
