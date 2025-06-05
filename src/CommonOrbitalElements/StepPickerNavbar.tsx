import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useAppStore } from "../store";

const STEPS = [
  "Circular Orbit",
  "Add Eccentricity",
  "Add Tilt",
  "Twist to Right Ascension",
  "Rotate from Argument of Perigree",
];

export function StepPickerNavbar() {
  const { step, setCurrentStep } = useAppStore();

  const onNextStep = () => {
    if (step >= 4) {
      setCurrentStep(0);
    } else {
      setCurrentStep(step + 1);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ paddingLeft: "15px" }}>
        <Button onClick={onNextStep} variant="contained">
          {step < 4 ? "Next" : "Reset"}
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, paddingTop: "20px", paddingBottom: "10px" }}>
        <Stepper activeStep={step} alternativeLabel>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}
