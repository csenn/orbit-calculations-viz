import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import type { ClassicalOrbitalElements } from "../utils/commonOrbitalElementsCalc";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Euler } from "three";
import { useAppStore } from "../../store";
import { sampleOrbitInPlane } from "../utils/orbitCalc";

interface OrbitAnimatedProps {
  classicalOrbitElements: ClassicalOrbitalElements;
}

export function OrbitAnimated({ classicalOrbitElements }: OrbitAnimatedProps) {
  const { step, isAnimating, setIsAnimating } = useAppStore();

  const durationPerStep = 5;

  // const [step, setStep] = useState(0)
  const [stepProgress, setStepProgress] = useState(0);
  const animationTime = useRef(0);

  useEffect(() => {
    setStepProgress(0);
    animationTime.current = 0;
  }, [step]);

  useFrame((_, delta) => {
    if (stepProgress < 1) {
      if (!isAnimating) {
        setIsAnimating(true);
      }
      animationTime.current += delta;
      const progress = Math.min(animationTime.current / durationPerStep, 1);
      setStepProgress(progress);
    } else {
      if (isAnimating) {
        setIsAnimating(false);
      }
    }
  });

  const circularOrbit = sampleOrbitInPlane(
    classicalOrbitElements.semiMajorAxis,
    0,
  );

  const ellipticalOrbit = sampleOrbitInPlane(
    classicalOrbitElements.semiMajorAxis,
    classicalOrbitElements.eccentricity,
  );

  const normal = new Vector3(0, 0, 1)
    .applyEuler(new Euler(classicalOrbitElements.inclination, 0, 0, "XYZ"))
    .applyEuler(new Euler(0, 0, classicalOrbitElements.rightAscension, "XYZ"))
    .normalize();

  const points = circularOrbit.map((point, i) => {
    const end = (() => {
      const finalPoint = ellipticalOrbit[i].clone();

      if (step === 2) {
        finalPoint.applyEuler(
          new Euler(
            stepProgress * classicalOrbitElements.inclination,
            0,
            0,
            "XYZ",
          ),
        );
      } else if (step > 2) {
        finalPoint.applyEuler(
          new Euler(classicalOrbitElements.inclination, 0, 0, "XYZ"),
        );
      }

      if (step === 3) {
        finalPoint.applyEuler(
          new Euler(
            0,
            0,
            stepProgress * classicalOrbitElements.rightAscension,
            "XYZ",
          ),
        );
      } else if (step > 3) {
        finalPoint.applyEuler(
          new Euler(0, 0, classicalOrbitElements.rightAscension, "XYZ"),
        );
      }

      if (step === 4) {
        const spinAngle =
          stepProgress * classicalOrbitElements.argumentOfPerigee;
        finalPoint.applyAxisAngle(normal, spinAngle);
      }

      return finalPoint;
    })();

    if (step === 0) {
      return point;
    }

    if (step === 1) {
      return point.clone().lerp(end, stepProgress);
    }

    // Step 4: Rotate around orbital plane

    return end;
  });

  return <Line points={points} color={"white"} />;
}
