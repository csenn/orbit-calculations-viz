import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { type VectorThree } from "../utils/commonOrbitalElementsCalc";

const VELOCITY_LENGTH = 200;

interface PositionAndVelocityProps {
  positionVector: VectorThree;
  velocityVector: VectorThree;
  nVector: VectorThree;
  eccentricityVector: VectorThree;
}

export function PositionAndVelocity({
  positionVector,
  velocityVector,
  nVector,
  eccentricityVector,
}: PositionAndVelocityProps) {
  const positionPoints = [
    new Vector3(0, 0, 0),
    new Vector3(positionVector.x, positionVector.y, positionVector.z),
  ];

  const velocityDir = new Vector3(
    velocityVector.x,
    velocityVector.y,
    velocityVector.z,
  ).normalize(); // now a unit vector

  const velocityTip = new Vector3(
    positionVector.x,
    positionVector.y,
    positionVector.z,
  ).addScaledVector(velocityDir, VELOCITY_LENGTH);

  const velocityPoints = [
    new Vector3(positionVector.x, positionVector.y, positionVector.z),
    velocityTip,
  ];

  const nPoints = [
    new Vector3(0, 0, 0),
    new Vector3(nVector.x, nVector.y, nVector.z),
  ];

  // const eccentricityPoints = [
  //   new Vector3(0, 0, 0),
  //   new Vector3(
  //     eccentricityVector.x,
  //     eccentricityVector.y,
  //     eccentricityVector.z,
  //   ),
  // ];

  const green = "#4caf50";

  return (
    <>
      <Line points={positionPoints} color={green} />
      {/* <Line points={velocityPoints} color={green} /> */}

      {/* Point towards ascension node */}
      <Line points={nPoints} color={"#f44336"} />
      {/* Should point towards perigree */}
      {/* <Line points={eccentricityPoints} color={"orange"} /> */}

      <arrowHelper
        args={[
          new Vector3(
            velocityVector.x,
            velocityVector.y,
            velocityVector.z,
          ).normalize(),
          new Vector3(positionVector.x, positionVector.y, positionVector.z),
          new Vector3(
            velocityVector.x,
            velocityVector.y,
            velocityVector.z,
          ).length() * VELOCITY_LENGTH,
          green,
        ]}
      />
    </>
  );
}
