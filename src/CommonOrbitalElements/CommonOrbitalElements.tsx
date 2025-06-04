import { useMemo, useState } from "react";
import { calcClassicalOrbitalElements, type VectorThree } from "./calc";
import { EarthDiagram } from "./EarthDiagram";
import { Box } from "@mui/material";
import {
  PositionVelocitySelector,
  type IPositionAndVelocity,
} from "./PositionVelocitySelector";
import { COENavbar } from "./COENavbar";

export function CommonOrbitalElements() {
  const [positionVector, setPositionVector] = useState<VectorThree>({
    x: 8228,
    y: 389,
    z: 6888,
    // x: 0,
    // y: 0,
    // z: 8000,
  });

  const [velocityVector, setVelocityVector] = useState<VectorThree>({
    x: -0.7,
    y: 6.6,
    z: -0.6,
    // x: 0,
    // y: -4.5,
    // z: 0,
  });

  const onUpdatePositionAndVelocity = (posAndVel: IPositionAndVelocity) => {
    setPositionVector(posAndVel.positionVector);
    setVelocityVector(posAndVel.velocityVector);
  };

  const classicalOrbitElements = useMemo(() => {
    return calcClassicalOrbitalElements(positionVector, velocityVector);
  }, [positionVector, velocityVector]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          width: "350px",
          borderRight: "1px solid #ccc",
          color: "black",
        }}
      >
        {/* <PositionVelocitySelector /> */}
        {/* {JSON.stringify(classicalOrbitElements, null, 2)} */}
        <COENavbar
          onUpdatePositionAndVelocity={onUpdatePositionAndVelocity}
          classicalOrbitElements={classicalOrbitElements}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <EarthDiagram
          positionVector={positionVector}
          velocityVector={velocityVector}
          classicalOrbitElements={classicalOrbitElements}
        />
      </Box>
    </Box>
  );
}
