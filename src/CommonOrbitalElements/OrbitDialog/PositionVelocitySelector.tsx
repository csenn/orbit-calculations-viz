import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { VectorUpdate } from "./VectorUpdate";
import { type VectorThree } from "../utils/commonOrbitalElementsCalc";

interface OrbitOption {
  label: string;
  position: VectorThree;
  velocity: VectorThree;
}

export interface IPositionAndVelocity {
  positionVector: VectorThree;
  velocityVector: VectorThree;
}

// Preset orbit examples for quick selection
const options: OrbitOption[] = [
  {
    label: "LEO Prograde",
    position: { x: 8228, y: 389, z: 6888 },
    velocity: { x: -0.7, y: 6.6, z: -0.6 },
  },
  {
    label: "HEO Example",
    position: { x: 0, y: 0, z: 16000 },
    velocity: { x: 0, y: -4.5, z: 0 },
  },
  {
    label: "GEO Circular",
    position: { x: 0, y: 0, z: 42164 },
    velocity: { x: 3.1, y: 0, z: 0 },
  },
  {
    label: "Polar LEO",
    position: { x: 0, y: 7078, z: 0 },
    velocity: { x: -7.5, y: 0, z: 0 },
  },
  {
    label: "Retrograde LEO",
    position: { x: 7000, y: 0, z: 0 },
    velocity: { x: 0, y: -7.8, z: 0 },
  },
];

interface PositionVelocitySelectorProps {
  onUpdatePositionAndVelocity: (posAndVel: IPositionAndVelocity) => void;
}

export function PositionVelocitySelector({
  onUpdatePositionAndVelocity,
}: PositionVelocitySelectorProps) {
  const [open, setOpen] = useState(false);

  const [positionVector, setPositionVector] = useState<VectorThree>({
    x: 0,
    y: 0,
    z: 0,
  });

  const [velocityVector, setVelocityVector] = useState<VectorThree>({
    x: 0,
    y: 0,
    z: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateData = () => {
    onUpdatePositionAndVelocity({
      positionVector,
      velocityVector,
    });
    handleClose();
  };

  const onSelectOption = (option: OrbitOption) => {
    setPositionVector(option.position);
    setVelocityVector(option.velocity);
    onUpdatePositionAndVelocity({
      positionVector: option.position,
      velocityVector: option.velocity,
    });
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ padding: "10px" }}>
        <Button onClick={handleClickOpen} variant="outlined">
          Update Position and Velocity
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Position And Velocity</DialogTitle>
        <DialogContent sx={{ minWidth: "600px" }}>
          <DialogContentText>
            Choose an orbit below or enter a custom vector.
          </DialogContentText>

          <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Orbit</TableCell>
                  <TableCell>Position [km]</TableCell>
                  <TableCell>Velocity [km/s]</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {options.map((opt) => (
                  <TableRow
                    key={opt.label}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => onSelectOption(opt)}
                  >
                    <TableCell>{opt.label}</TableCell>
                    <TableCell>
                      [{opt.position.x}, {opt.position.y}, {opt.position.z}]
                    </TableCell>
                    <TableCell>
                      [{opt.velocity.x}, {opt.velocity.y}, {opt.velocity.z}]
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ paddingTop: "20px" }}>
            <VectorUpdate
              label="Position"
              vector={positionVector}
              onUpdateVector={setPositionVector}
            />
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <VectorUpdate
              label="Velocity"
              vector={velocityVector}
              onUpdateVector={setVelocityVector}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateData}>Add Data</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
