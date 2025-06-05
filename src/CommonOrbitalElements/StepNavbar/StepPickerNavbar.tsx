import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useAppStore } from "../../store";

const STEPS = [
  {
    label: "Circular Orbit",
    description: "First draw a circular orbit using the semi-major axis",
  },
  {
    label: "Add Eccentricity",
    description: "Add eccentricity to the circle creating an ellipse",
  },
  {
    label: "Add Inclination/Tilt",
    description:
      "Incline the orbit around the i-axis using the inclination angle",
  },
  {
    label: "Twist to Right Ascension",
    description:
      "Twist the orbit around the k-axis by the right ascension angle starting at x-axis",
  },
  {
    label: "Rotate Perigee",
    description:
      "Rotate the orbit by the argument of perigee on orbital plane from the right ascension node",
  },
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
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ paddingLeft: "15px" }}>
          <Button onClick={onNextStep} variant="contained">
            {step < 4 ? "Next" : "Reset"}
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1, paddingTop: "20px", paddingBottom: "10px" }}>
          <Stepper activeStep={step} alternativeLabel>
            {STEPS.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid rgb(230,230,230)",
          padding: "5px",
          color: "rgb(100,100,100)",
        }}
      >
        STEP {step + 1}: {STEPS[step]?.description}
      </Box>
    </Box>
  );
}
