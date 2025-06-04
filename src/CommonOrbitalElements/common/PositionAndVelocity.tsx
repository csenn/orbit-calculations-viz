import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { type VectorThree } from "../calc";

const VELOCITY_SCALE = 200;

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

  const velocityPoints = [
    new Vector3(positionVector.x, positionVector.y, positionVector.z),
    new Vector3(
      positionVector.x + VELOCITY_SCALE * velocityVector.x,
      positionVector.y + VELOCITY_SCALE * velocityVector.y,
      positionVector.z + VELOCITY_SCALE * velocityVector.z,
    ),
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

  return (
    <>
      <Line points={positionPoints} color={"green"} />
      <Line points={velocityPoints} color={"green"} />

      {/* Point towards ascension node */}
      <Line points={nPoints} color={"red"} />
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
          ).length() * VELOCITY_SCALE,
          "green",
        ]}
      />
    </>
  );
}
