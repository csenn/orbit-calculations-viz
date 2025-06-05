import { Canvas } from "@react-three/fiber";
import { Earth } from "./SceneElements/Earth";
import { EarthCoords } from "./SceneElements/EarthCoords";
import { CameraController } from "./SceneElements/CameraController";
import { CameraPanel } from "./SceneElements/CameraPanel";
import { PositionAndVelocity } from "./SceneElements/PositionAndVelocity";
import {
  type ClassicalOrbitalElements,
  type VectorThree,
} from "./utils/commonOrbitalElementsCalc";
import { OrbitPoints } from "./SceneElements/OrbitPoints";
import { EquatorPlane } from "./SceneElements/EquatorPlane";
import { useRef, type ReactNode } from "react";
import * as THREE from "three";
import { SatelliteModel } from "./SceneElements/SatelliteModel";
import { OrbitAnimated } from "./SceneElements/OrbitAnimated";
import { RichAscension } from "./SceneElements/RighAscension";
import { InclinationAngle } from "./SceneElements/InclinationAngle";

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

export function EarthScene({
  positionVector,
  velocityVector,
  classicalOrbitElements,
}: EarthDiagramProps) {
  const positionThree = positionVector;
  const velocityThree = velocityVector;

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
          />
          <OrbitPoints classicalOrbitElements={classicalOrbitElements} />
          <OrbitAnimated classicalOrbitElements={classicalOrbitElements} />
          <EquatorPlane size={classicalOrbitElements.semiMajorAxis * 3} />
          <SatelliteModel classicalOrbitElements={classicalOrbitElements} />

          <RichAscension classicalOrbitElements={classicalOrbitElements} />
          <InclinationAngle classicalOrbitElements={classicalOrbitElements} />
        </ECIFrame>
      </Canvas>

      <CameraPanel />
    </>
  );
}
