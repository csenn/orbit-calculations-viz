import { Box, Button } from "@mui/material";
import { useAppStore } from "../../store";
import { Vector3 } from "three";
// import { convertCoordEciToThree } from "../utils/commonOrbitalElementsCalc";

export function CameraPanel() {
  const { setCameraPosition } = useAppStore();
  const handleMoveCamera = (value: [number, number, number]) => {
    setCameraPosition(new Vector3(...value));
  };

  // Need to do weird conversions here? The ECI frame for everything else
  // is handled by the wrapper around Canvas
  const xVector = {
    x: 20000,
    y: 0,
    z: 0,
  };

  const yVector = {
    x: 0,
    y: 0,
    z: -20000,
  };

  const zVector = {
    x: 0,
    y: 20000,
    z: 0,
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 10,
        right: 10,
        background: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Button
        onClick={() => handleMoveCamera([xVector.x, xVector.y, xVector.z])}
      >
        i-axis
      </Button>
      <Button
        onClick={() => handleMoveCamera([yVector.x, yVector.y, yVector.z])}
      >
        j-axis
      </Button>
      <Button
        onClick={() => handleMoveCamera([zVector.x, zVector.y, zVector.z])}
      >
        k-axis
      </Button>
    </Box>
  );
}
