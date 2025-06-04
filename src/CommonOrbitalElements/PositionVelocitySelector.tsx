import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { VectorUpdate } from "./VectorUpdate";
import { type VectorThree } from "./calc";

export interface IPositionAndVelocity {
  positionVector: VectorThree;
  velocityVector: VectorThree;
}

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

  return (
    <Box>
      <Box sx={{ padding: "5px" }}>
        <Button onClick={handleClickOpen}>Update Position and Velocity</Button>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Position And Velocity</DialogTitle>
        <DialogContent sx={{ minWidth: "600px" }}>
          <DialogContentText></DialogContentText>
          <VectorUpdate
            label="Position"
            vector={positionVector}
            onUpdateVector={setPositionVector}
          />
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
