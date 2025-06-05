import { Box, TextField } from "@mui/material";
import { type VectorThree } from "../utils/commonOrbitalElementsCalc";

interface VectorUpdateProps {
  label: string;
  vector: VectorThree;
  onUpdateVector: (vector: VectorThree) => void;
}

export function VectorUpdate({
  label,
  vector,
  onUpdateVector,
}: VectorUpdateProps) {
  const onChangeX = (e: any) => {
    const val = e.target.value;
    onUpdateVector({
      ...vector,
      x: val,
    });
  };

  const onChangeY = (e: any) => {
    const val = e.target.value;
    onUpdateVector({
      ...vector,
      y: val,
    });
  };

  const onChangeZ = (e: any) => {
    const val = e.target.value;
    onUpdateVector({
      ...vector,
      z: val,
    });
  };
  return (
    <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <Box sx={{ paddingRight: "10px", fontWeight: "bold" }}>{label}</Box>
      <TextField
        value={vector.x}
        onChange={onChangeX}
        label={"I"}
        autoFocus
        margin="dense"
        id="name"
        type="number"
        fullWidth
        variant="standard"
      />

      <TextField
        value={vector.y}
        onChange={onChangeY}
        autoFocus
        label={"J"}
        margin="dense"
        id="name"
        type="number"
        fullWidth
        variant="standard"
      />

      <TextField
        value={vector.z}
        onChange={onChangeZ}
        autoFocus
        label={"K"}
        margin="dense"
        id="name"
        type="number"
        fullWidth
        variant="standard"
      />
    </Box>
  );
}
