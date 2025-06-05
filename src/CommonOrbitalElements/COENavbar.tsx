import { Box } from "@mui/material";
import {
  PositionVelocitySelector,
  type IPositionAndVelocity,
} from "./OrbitDialog/PositionVelocitySelector";
import {
  radiansToDegrees,
  type ClassicalOrbitalElements,
  type VectorThree,
} from "./utils/commonOrbitalElementsCalc";
import type { ReactNode } from "react";

function LabelView({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", gap: "5px", paddingTop: "4px" }}>
      <Box sx={{ fontWeight: "bold" }}>{label}:</Box>
      <Box>{children}</Box>
    </Box>
  );
}

function VectorView({ vector }: { vector: VectorThree }) {
  const x = Math.round(vector.x * 1000) / 1000;
  const y = Math.round(vector.y * 1000) / 1000;
  const z = Math.round(vector.z * 1000) / 1000;
  return (
    <Box>
      [{x}i ,{y}j, {z}k]
    </Box>
  );
}

function DegreesView({ val }: { val: number }) {
  const degrees = Math.round(radiansToDegrees(val) * 100) / 100;
  const degreeSymbol = String.fromCharCode(176);
  return (
    <Box>
      {degrees}
      {degreeSymbol}
    </Box>
  );
}

function RoundView({ val }: { val: number }) {
  const rounded = Math.round(val * 1000) / 1000;
  return <Box>{rounded}</Box>;
}

interface COENavbarProps {
  modelLabel: string;
  setModelLabel: (label: string) => void;
  classicalOrbitElements: ClassicalOrbitalElements;
  onUpdatePositionAndVelocity: (posAndVel: IPositionAndVelocity) => void;
}

export function COENavbar({
  modelLabel,
  setModelLabel,
  onUpdatePositionAndVelocity,
  classicalOrbitElements,
}: COENavbarProps) {
  return (
    <Box>
      <PositionVelocitySelector
        onUpdatePositionAndVelocity={onUpdatePositionAndVelocity}
        setModelLabel={setModelLabel}
      />

      <Box sx={{ paddingLeft: "10px", paddingTop: "5px" }}>
        {/* <Box sx={{marginTop: '10px',  color: 'primary.main'}}>
          Given Values
        </Box> */}

        <LabelView label="Name">{modelLabel}</LabelView>

        <LabelView label="Position">
          <VectorView vector={classicalOrbitElements.position} />
        </LabelView>

        <LabelView label="Velocity">
          <VectorView vector={classicalOrbitElements.velocity} />
        </LabelView>

        <Box sx={{ marginTop: "20px", color: "primary.main" }}>
          Common Orbital Elements
        </Box>
        <LabelView label="Energy">
          <RoundView val={classicalOrbitElements.energy} />
        </LabelView>

        <LabelView label="Semi Major Axis (a)">
          <RoundView val={classicalOrbitElements.semiMajorAxis} />
        </LabelView>

        <LabelView label="Eccentricity (e)">
          <RoundView val={classicalOrbitElements.eccentricity} />
        </LabelView>

        <LabelView label="Inclination (i)">
          <DegreesView val={classicalOrbitElements.inclination} />
        </LabelView>
        <LabelView label="Right Ascension (Ω)">
          <DegreesView val={classicalOrbitElements.rightAscension} />
        </LabelView>

        <LabelView label="Argument of Perigee (ω)">
          <DegreesView val={classicalOrbitElements.argumentOfPerigee} />
        </LabelView>

        <LabelView label="True Anomaly">
          <DegreesView val={classicalOrbitElements.trueAnomaly} />
        </LabelView>
        {/* {coeViews} */}
      </Box>
    </Box>
  );
}
