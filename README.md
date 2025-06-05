# Orbit Calculations Visualizer

This project is an educational tool for learning how the **Classical Orbital Elements** (COEs) describe a satellite's trajectory.  It allows you to start with a position and velocity vector and watch how each element contributes to the final orbit.

## Getting Started

1. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
   Then open the provided local URL in your browser.

2. Choose one of the predefined orbit examples or enter custom **position** and **velocity** vectors (in kilometers and km/s).  The app will calculate the COEs for the selected state vector.

## What are the COEs?

Given an inertial position \(\mathbf{r}\) and velocity \(\mathbf{v}\) of a satellite, the following elements uniquely describe its orbit:

- **Semi&#8209;major axis (a)** – size of the orbit.
- **Eccentricity (e)** – shape of the orbit (0 is circular).
- **Inclination (i)** – tilt of the orbit with respect to the equatorial plane.
- **Right ascension of the ascending node (RAAN)** – rotation of the orbital plane around the Earth's axis.
- **Argument of perigee (ω)** – orientation of the orbit within the plane.
- **True anomaly (ν)** – spacecraft's location on the orbit at a given time.

These are computed in `src/CommonOrbitalElements/utils/commonOrbitalElementsCalc.ts` using classical orbital mechanics formulas.

## Visualizing the Elements

The application uses React Three Fiber to animate the orbit construction:

1. Draw a circular orbit using the semi&#8209;major axis.
2. Apply eccentricity to create an ellipse.
3. Tilt the orbit using the inclination.
4. Twist around the Earth's axis by the right ascension.
5. Rotate within the plane by the argument of perigee.

Each step builds on the previous one, helping visualize how the COEs transform a simple circle into the final orbit.  The **Step** navigation bar in `src/CommonOrbitalElements/StepNavbar/StepPickerNavbar.tsx` controls the animation sequence.

You can find a live demo at [https://csenn.github.io/orbit-calculations-viz/](https://csenn.github.io/orbit-calculations-viz/).

## License

This code is provided for educational purposes.
