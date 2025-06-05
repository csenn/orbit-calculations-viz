import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { type ClassicalOrbitalElements } from "../utils/commonOrbitalElementsCalc";
import { useAppStore } from "../../store";
import { RightAscensionAngle } from "./RightAscensionAngle";
import { InclinationAngle } from "./InclinationAngle";

interface RichAscensionProps {
  classicalOrbitElements: ClassicalOrbitalElements;
}

export function RichAscension({ classicalOrbitElements }: RichAscensionProps) {
  const { step, isAnimating } = useAppStore();

  const { nVector } = classicalOrbitElements;

  const nPoints = [
    new Vector3(0, 0, 0),
    new Vector3(nVector.x, nVector.y, nVector.z),
  ];

  const red = "#f44336";

  const shouldRenderAscension = step === 4 || (step === 3 && !isAnimating);
  const shouldRenderInclination = step === 4;

  if (!shouldRenderAscension) {
    return;
  }

  return (
    <>
      <Line points={nPoints} color={red} />

      <RightAscensionAngle classicalOrbitElements={classicalOrbitElements} />

      {shouldRenderInclination && (
        <InclinationAngle classicalOrbitElements={classicalOrbitElements} />
      )}
    </>
  );
}
