import { CommonOrbitalElements } from "./CommonOrbitalElements/CommonOrbitalElements";
import { Box } from "@mui/material";
import "./App.css";

export function App() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: "15px",
          fontSize: "18px",
          fontWeight: "bold",
          borderBottom: "1px solid rgb(230,230,230)",
        }}
      >
        Common Orbital Elements
      </Box>

      <CommonOrbitalElements />
    </Box>
  );
}
