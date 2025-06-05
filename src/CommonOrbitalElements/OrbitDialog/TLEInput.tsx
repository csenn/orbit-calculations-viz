import { twoline2satrec, propagate } from "satellite.js";

export function TLEInput() {
  // Sample TLE
  const tleLine1 =
      "1 25847U 99036A   25155.14931678  .00000069  00000-0 -56800-1 0  9996",
    tleLine2 =
      "2 25847  63.5164 194.5524 6821286 280.1520  14.9298  2.00635161189830";

  // Initialize a satellite record
  const satrec = twoline2satrec(tleLine1, tleLine2);

  const positionAndVelocity = propagate(satrec, new Date());

  console.log(positionAndVelocity);

  return null;
}
