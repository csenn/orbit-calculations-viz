import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import EarthMapJpg from "../../assets/earth-realistic-8k.webp";
import * as THREE from "three";
export const EARTH_RADIUS = 6378; // Radius of the Earth in your 3D model units
const EARTH_ROTATION_SPEED = (360 / 86164) * (Math.PI / 180); // Radians per second
// export const TILT_ANGLE = 23.5 * (Math.PI / 180); // Earth's axial tilt in radians
export const TILT_ANGLE = 0;

// earth's axial tilt is 23.5 degrees
// https://franky-arkon-digital.medium.com/make-your-own-earth-in-three-js-8b875e281b1e
// this.group.rotation.z = 23.5 / 360 * 2 * Math.PI

export function Earth() {
  const earthRef = useRef<Mesh>(null);

  const colorMap = useLoader(TextureLoader, EarthMapJpg);
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;

  return (
    <mesh ref={earthRef} rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );

  // colorMap.offset.set(0.25, 0);

  // Animate Earth's rotation
  // useFrame(() => {
  //   if (earthRef.current) {
  //     // Current UTC time
  //     const now = new Date();
  //     const utcMidnight = Date.UTC(
  //       now.getUTCFullYear(),
  //       now.getUTCMonth(),
  //       now.getUTCDate(),
  //     );
  //     const secondsSinceMidnightUTC = (now.getTime() - utcMidnight) / 1000;

  //     // Calculate the Earth's rotation angle based on time
  //     const earthRotationAngle =
  //       (secondsSinceMidnightUTC * EARTH_ROTATION_SPEED) % (2 * Math.PI);

  //     // Apply the rotation around the Y-axis
  //     earthRef.current.rotation.y = earthRotationAngle;
  //   }
  // });

  // <group rotation={[TILT_ANGLE, 0, 0]}>
  // rotation={[Math.PI / 2, 0, 0]}

  // </group>
}
