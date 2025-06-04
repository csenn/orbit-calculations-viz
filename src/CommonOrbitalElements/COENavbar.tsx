import { Box } from "@mui/material";
import {
  PositionVelocitySelector,
  type IPositionAndVelocity,
} from "./PositionVelocitySelector";
import type { ClassicalOrbitalElements } from "./calc";

interface COENavbarProps {
  classicalOrbitElements: ClassicalOrbitalElements;
  onUpdatePositionAndVelocity: (posAndVel: IPositionAndVelocity) => void;
}

export function COENavbar({
  onUpdatePositionAndVelocity,
  classicalOrbitElements,
}: COENavbarProps) {
  const coeViews = Object.entries(classicalOrbitElements).map(([key, val]) => {
    return (
      <Box sx={{ display: "flex", gap: "5px" }}>
        <Box sx={{ fontWeight: "bold" }}>{key}:</Box>
        <Box>{JSON.stringify(val)}</Box>
      </Box>
    );
  });

  return (
    <Box>
      <PositionVelocitySelector
        onUpdatePositionAndVelocity={onUpdatePositionAndVelocity}
      />

      <Box sx={{ paddingLeft: "10px" }}>{coeViews}</Box>
    </Box>
  );
}
