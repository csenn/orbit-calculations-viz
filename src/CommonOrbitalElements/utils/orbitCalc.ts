import { Euler, Vector3 } from "three";
import type { ClassicalOrbitalElements } from "./commonOrbitalElementsCalc";

export function sampleOrbitInPlane(
  semiMajorAxis: number,
  eccentricity: number,
  numPoints: number = 360,
): Vector3[] {
  const points: Vector3[] = [];

  for (let i = 0; i <= numPoints; i++) {
    const theta = (i / numPoints) * 2 * Math.PI; // true anomaly

    // Equation for radius
    const r =
      (semiMajorAxis * (1 - eccentricity ** 2)) /
      (1 + eccentricity * Math.cos(theta));

    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    points.push(new Vector3(x, y, 0)); // z=0, in orbital plane
  }

  return points;
}

export function rotatePoints(
  classicalOrbitElements: ClassicalOrbitalElements,
  rawPoints: Vector3[],
) {
  const { inclination, rightAscension, argumentOfPerigee } =
    classicalOrbitElements;

  const ω = argumentOfPerigee;
  const i = inclination;
  const Ω = rightAscension;

  const inPlaneSpin = new Euler(0, 0, ω, "XYZ"); // spin periapsis into place
  const inclinationTilt = new Euler(i, 0, 0, "XYZ"); // tilt orbit plane
  const raanTwist = new Euler(0, 0, Ω, "XYZ"); // rotate plane around Z (K)

  return rawPoints.map((p) => {
    const point = p.clone();
    point.applyEuler(inPlaneSpin); // ω — in orbital plane
    point.applyEuler(inclinationTilt); // i — tilt plane
    point.applyEuler(raanTwist); // Ω — align ascending node
    return point;
  });
}

export function findAscendingNodePosition(
  classicalOrbitElements: ClassicalOrbitalElements,
  rawOrbitPoints: Vector3[],
): Vector3 | null {
  const { inclination, rightAscension, argumentOfPerigee } =
    classicalOrbitElements;

  const ω = argumentOfPerigee;
  const i = inclination;
  const Ω = rightAscension;

  const inPlaneSpin = new Euler(0, 0, ω, "XYZ");
  const inclinationTilt = new Euler(i, 0, 0, "XYZ");
  const raanTwist = new Euler(0, 0, Ω, "XYZ");

  for (let j = 0; j < rawOrbitPoints.length - 1; j++) {
    const p1 = rawOrbitPoints[j]
      .clone()
      .applyEuler(inPlaneSpin)
      .applyEuler(inclinationTilt)
      .applyEuler(raanTwist);

    const p2 = rawOrbitPoints[j + 1]
      .clone()
      .applyEuler(inPlaneSpin)
      .applyEuler(inclinationTilt)
      .applyEuler(raanTwist);

    if (p1.z < 0 && p2.z > 0) {
      // Linear interpolation to estimate Z=0 crossing point
      const t = -p1.z / (p2.z - p1.z);
      const ascendingNode = new Vector3().lerpVectors(p1, p2, t);
      return ascendingNode;
    }
  }

  return null; // Shouldn't happen if orbit is elliptical and samples are dense
}

export function findPerigee(
  classicalOrbitElements: ClassicalOrbitalElements,
): Vector3 {
  const {
    inclination,
    rightAscension,
    argumentOfPerigee,
    semiMajorAxis,
    eccentricity,
  } = classicalOrbitElements;

  const ω = argumentOfPerigee;
  const i = inclination;
  const Ω = rightAscension;

  // Orbital ellipse: r = a(1 - e), along +X in orbital plane
  const periapsisRaw = new Vector3(semiMajorAxis * (1 - eccentricity), 0, 0);

  // Build rotation steps
  const inPlaneSpin = new Euler(0, 0, ω, "XYZ");
  const inclinationTilt = new Euler(i, 0, 0, "XYZ");
  const raanTwist = new Euler(0, 0, Ω, "XYZ");

  // Periapsis: spin first, then tilt, then twist
  const periapsis = periapsisRaw
    .clone()
    .applyEuler(inPlaneSpin)
    .applyEuler(inclinationTilt)
    .applyEuler(raanTwist);

  return periapsis;
}
