import { PlaneGeometry } from "three";
import { useMemo } from "react";
// import { Mesh } from '@react-three/fiber';

export function EquatorPlane({
  size = 30000, // width and height in scene units (e.g., km)
  opacity = 0.3, // transparency level
  color = "skyblue",
}: {
  size?: number;
  opacity?: number;
  color?: string;
}) {
  // Optional: memoize geometry and material
  const geometry = useMemo(() => new PlaneGeometry(size, size), [size]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        side={2} // DoubleSide to see it from both sides
      />
    </mesh>
  );
}
