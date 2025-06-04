const MU = 398600.4418; // Earth's gravitational parameter in km^3/s^2
// const R_EARTH = 6378.137; // Earth's radius in km
// const G = 6.67259e-11; // Gravitational constant in m^3 kg^-1 s^-2

export interface VectorThree {
  x: number;
  y: number;
  z: number;
}

export const convertCoordEciToThree = (coords: VectorThree): VectorThree => {
  return {
    x: coords.y, // ECI Y to three.js X
    y: coords.z, // ECI Z to three.js Y
    z: coords.x, // ECI X to three.js Z
  };
};

export interface ClassicalOrbitalElements {
  positionX: number;
  positionY: number;
  positionZ: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
  energy: number;
  semiMajorAxis: number; // semi-major axis
  eccentricity: number; // eccentricity
  inclination: number; // inclination
  rightAscension: number; // right ascension of ascending node
  argumentOfPerigee: number; // argument of perigee
  trueAnomaly: number; // true anomaly
  nVector: VectorThree;
  eccentricityVector: VectorThree;
}

export function calcClassicalOrbitalElements(
  position: VectorThree,
  velocity: VectorThree,
): ClassicalOrbitalElements {
  const energy = calcEnergy(position, velocity);
  const semiMajorAxis = calculateSemiMajorAxis(energy);
  const eccentricityVector = calcEccentricity(position, velocity);
  const eccentricity = getVectorMagnitude(eccentricityVector);
  const inclination = calcInclination(position, velocity);
  const rightAscension = calcRightAscension(position, velocity);
  const argumentOfPerigee = calcArgumentOfPerigree(
    position,
    velocity,
    eccentricityVector,
  );
  const trueAnomaly = calcTrueAnomaly(position, eccentricityVector);

  const angularMomentum = calcAngularMomentum(position, velocity);
  const nVector = calcNVector(angularMomentum);

  // Placeholder for actual calculation logic
  return {
    positionX: position.x,
    positionY: position.y,
    positionZ: position.z,
    velocityX: velocity.x,
    velocityY: velocity.y,
    velocityZ: velocity.z,
    energy,
    semiMajorAxis,
    eccentricity,
    inclination, // Placeholder value
    rightAscension, // Placeholder value
    argumentOfPerigee, // Placeholder value
    trueAnomaly, // Placeholder value
    nVector,
    eccentricityVector,
  };
}

function getVectorMagnitude(vector: VectorThree): number {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
}

function getVectorCrossProduct(a: VectorThree, b: VectorThree): VectorThree {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function getVectorDotProduct(a: VectorThree, b: VectorThree): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function subtractVector(a: VectorThree, b: VectorThree): VectorThree {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
  };
}

export function multiplyVectorByScalar(
  scalar: number,
  vector: VectorThree,
): VectorThree {
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: vector.z * scalar,
  };
}

function calcEnergy(position: VectorThree, velocity: VectorThree): number {
  const r = getVectorMagnitude(position);
  const v = getVectorMagnitude(velocity);
  return v ** 2 / 2 - MU / r;
}

function calculateSemiMajorAxis(energy: number) {
  return -(MU / (2 * energy));
}

function calcAngularMomentum(position: VectorThree, velocity: VectorThree) {
  return getVectorCrossProduct(position, velocity);
}

// From center of earth to ascending node
function calcNVector(angularMomentum: VectorThree) {
  const kVector: VectorThree = { x: 0, y: 0, z: 1 };
  return getVectorCrossProduct(kVector, angularMomentum);
}

function radiansToDegrees(radians: number): number {
  // Multiply radians by 180 divided by pi to convert to degrees.

  return radians;
  // return radians * (180 / Math.PI);
}

function calcEccentricity(
  position: VectorThree,
  velocity: VectorThree,
): VectorThree {
  const velocityMagnitude = getVectorMagnitude(velocity);
  const positionMagnitude = getVectorMagnitude(position);

  const firstTerm = multiplyVectorByScalar(
    velocityMagnitude ** 2 - MU / positionMagnitude,
    position,
  );

  const secondTerm = multiplyVectorByScalar(
    getVectorDotProduct(position, velocity),
    velocity,
  );

  const eccentricityVector = multiplyVectorByScalar(
    1 / MU,
    subtractVector(firstTerm, secondTerm),
  );

  return eccentricityVector;
}

function calcInclination(position: VectorThree, velocity: VectorThree) {
  const kVector: VectorThree = { x: 0, y: 0, z: 1 };
  const angularMomentum = calcAngularMomentum(position, velocity);
  const denom =
    getVectorMagnitude(angularMomentum) * getVectorMagnitude(kVector);

  let result = Math.acos(getVectorDotProduct(angularMomentum, kVector) / denom);

  if (result < 0 || result > 180) {
    result = 2 * Math.PI - result;
  }

  return radiansToDegrees(result);
}

function calcRightAscension(position: VectorThree, velocity: VectorThree) {
  const iVector: VectorThree = { x: 1, y: 0, z: 0 };

  const angularMomentum = calcAngularMomentum(position, velocity);
  const nVector = calcNVector(angularMomentum);

  const denom = getVectorMagnitude(iVector) * getVectorMagnitude(nVector);

  let result = Math.acos(getVectorDotProduct(iVector, nVector) / denom);

  if (nVector.y < 0) {
    result = 2 * Math.PI - result;
  }

  return radiansToDegrees(result);
}

function calcArgumentOfPerigree(
  position: VectorThree,
  velocity: VectorThree,
  eccentricityVector: VectorThree,
) {
  const angularMomentum = calcAngularMomentum(position, velocity);
  const nVector = calcNVector(angularMomentum);

  const denom =
    getVectorMagnitude(nVector) * getVectorMagnitude(eccentricityVector);

  let result = Math.acos(
    getVectorDotProduct(nVector, eccentricityVector) / denom,
  );

  // result = 2 * Math.PI - result;

  return radiansToDegrees(result);
}

function calcTrueAnomaly(
  position: VectorThree,
  eccentricityVector: VectorThree,
) {
  const denom =
    getVectorMagnitude(eccentricityVector) * getVectorMagnitude(position);

  let result = Math.acos(
    getVectorDotProduct(eccentricityVector, position) / denom,
  );

  // if ()

  return radiansToDegrees(result);
}
