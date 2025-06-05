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
import { TLEInput } from "./TLEInput";

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
const ORBIT_EXAMPLES: OrbitOption[] = [
  {
    label: "LEO Prograde",
    position: { x: 8228, y: 389, z: 6888 },
    velocity: { x: -0.7, y: 6.6, z: -0.6 },
  },
  {
    label: "LEO Prograde (ISS-like)",
    position: { x: 6524, y: 686, z: 2290 },
    velocity: { x: -0.231, y: 7.342, z: 6.553 },
  },
  {
    label: "HEO (Molniya-type)",
    position: { x: 24653.97, y: -5454.1997, z: 22915.83 }, // km from Earth center
    velocity: { x: 0.09304, y: 1.3419, z: -2.56 },
  },
  {
    label: "GEO Tilted (3° Inclination)",
    position: { x: 26500, y: 12000, z: 31000 },
    velocity: { x: -2.3, y: 2.85, z: -0.43 }, // ~24-hr orbit, small tilt
  },
  {
    label: "Sun-Synchronous Orbit (SSO)",
    position: { x: 7078, y: -300, z: 0 },
    velocity: { x: 0.1, y: 1.4, z: 7.45 }, // near-polar, retrograde ~98°
  },
  {
    label: "MEO (GPS-like)",
    position: { x: 26560, y: 5200, z: 4900 },
    velocity: { x: -1.2, y: 3.13, z: 0.1 }, // ~12-hour orbit
  },
];

interface PositionVelocitySelectorProps {
  setModelLabel: (label: string) => void;
  onUpdatePositionAndVelocity: (posAndVel: IPositionAndVelocity) => void;
}

export function PositionVelocitySelector({
  onUpdatePositionAndVelocity,
  setModelLabel,
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
    setModelLabel("Custom");
    onUpdatePositionAndVelocity({
      positionVector,
      velocityVector,
    });
    handleClose();
  };

  const onSelectOption = (option: OrbitOption) => {
    setModelLabel(option.label);
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
      <TLEInput />
      <Box sx={{ padding: "10px" }}>
        <Button onClick={handleClickOpen} variant="outlined">
          Update Position and Velocity
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Position And Velocity</DialogTitle>
        <DialogContent sx={{ minWidth: "600px" }}>
          <DialogContentText>Choose an example orbit below</DialogContentText>

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
                {ORBIT_EXAMPLES.map((opt) => (
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

          <DialogContentText sx={{ paddingTop: "30px" }}>
            <strong style={{ color: "black" }}>OR</strong> enter a custom
            vector.
          </DialogContentText>

          <Box sx={{}}>
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
