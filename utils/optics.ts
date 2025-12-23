import { Point, Ray, OpticalSurface } from '../types';

// Constants for SVG Canvas
export const CENTER_X = 400;
export const CENTER_Y = 250;
export const OPTICAL_AXIS_Y = 250;

/**
 * Calculates the image distance using the thin lens equation: 1/f = 1/v - 1/u
 * Note: Uses sign convention where object distance u is negative if to the left.
 */
export const calculateImageDistance = (f: number, u: number): number => {
  // u is typically negative in Cartesian coordinates relative to lens center
  // 1/v = 1/f + 1/u
  const val = (1 / f) + (1 / u);
  if (val === 0) return Infinity;
  return 1 / val;
};

/**
 * Generates the 3 standard principal rays for a thin lens diagram
 */
export const generatePrincipalRays = (
  f: number,
  u: number, // object distance (negative)
  h: number  // object height
): Ray[] => {
  const v = calculateImageDistance(f, u);
  const m = v / u; // Magnification
  const h_image = h * m;

  const objectX = CENTER_X + u;
  const objectTopY = CENTER_Y - h;
  const imageX = CENTER_X + v;
  const imageTopY = CENTER_Y - h_image;

  // 1. Parallel to axis, then through focal point
  const ray1_1: Ray = { x1: objectX, y1: objectTopY, x2: CENTER_X, y2: objectTopY, color: '#FCD34D', type: 'parallel' };
  const ray1_2: Ray = { x1: CENTER_X, y1: objectTopY, x2: imageX, y2: imageTopY, color: '#FCD34D', type: 'parallel' };
  
  // Extend ray 1 past image
  const ray1_3: Ray = { x1: imageX, y1: imageTopY, x2: imageX + 100, y2: imageTopY + (imageTopY - objectTopY)/(imageX - CENTER_X) * 100, color: '#FCD34D', type: 'parallel' };


  // 2. Through optical center (straight line)
  const ray2_1: Ray = { x1: objectX, y1: objectTopY, x2: CENTER_X, y2: CENTER_Y, color: '#38BDF8', type: 'center' };
  const ray2_2: Ray = { x1: CENTER_X, y1: CENTER_Y, x2: imageX, y2: imageTopY, color: '#38BDF8', type: 'center' };

  // 3. Through front focal point, then parallel
  // Front focal point is at CENTER_X + f (if light comes from left, F is on left... wait. 
  // Standard convention: Light L->R. Front focus is at -f.
  const ray3_1: Ray = { x1: objectX, y1: objectTopY, x2: CENTER_X, y2: imageTopY, color: '#F87171', type: 'focal' };
  const ray3_2: Ray = { x1: CENTER_X, y1: imageTopY, x2: imageX, y2: imageTopY, color: '#F87171', type: 'focal' };

  return [ray1_1, ray1_2, ray2_1, ray2_2, ray3_1, ray3_2];
};

/**
 * Simulate Aspherical vs Spherical Ray Convergence
 */
export const calculateSphericalAberration = (
  isAspherical: boolean,
  lensRadius: number,
  focalLength: number
): { rays: Ray[], focalPoints: number[] } => {
  const rays: Ray[] = [];
  const focalPoints: number[] = [];
  const numRays = 10;
  
  for (let i = 0; i <= numRays; i++) {
    // Top half only for clarity
    const h = (i / numRays) * lensRadius; 
    if (h === 0) continue;

    const startX = 50;
    const lensX = CENTER_X;
    
    // Simple model: Spherical aberration increases with height squared
    // Aspherical corrects this to be constant
    let effectiveFocalLength = focalLength;
    if (!isAspherical) {
      // Aberration factor
      effectiveFocalLength = focalLength - (Math.pow(h, 2) / 150);
    }

    const focalX = lensX + effectiveFocalLength;
    focalPoints.push(focalX);

    // Incoming Parallel Ray
    rays.push({
      x1: startX,
      y1: CENTER_Y - h,
      x2: lensX,
      y2: CENTER_Y - h,
      color: isAspherical ? '#34D399' : '#F472B6',
      type: 'parallel'
    });

    // Refracted Ray
    rays.push({
      x1: lensX,
      y1: CENTER_Y - h,
      x2: focalX,
      y2: CENTER_Y,
      color: isAspherical ? '#34D399' : '#F472B6',
      type: 'parallel'
    });
    
    // Extend past focus
    rays.push({
      x1: focalX,
      y1: CENTER_Y,
      x2: focalX + 100,
      y2: CENTER_Y + (h / effectiveFocalLength) * 100,
      color: isAspherical ? '#34D399' : '#F472B6',
      type: 'parallel'
    });
  }

  return { rays, focalPoints };
};

/**
 * Multi-element Paraxial Ray Tracing
 */
export const traceRayThroughSystem = (
  rayOrigin: { x: number, y: number },
  rayAngle: number, // radians relative to optical axis
  surfaces: OpticalSurface[],
  limitX: number // Max X to trace to
) => {
  const path: { x: number, y: number }[] = [{ x: rayOrigin.x, y: rayOrigin.y }];
  let currentY = rayOrigin.y;
  let currentAngle = rayAngle;
  let currentX = rayOrigin.x;

  // Sort surfaces by X position
  const sortedSurfaces = [...surfaces].sort((a, b) => a.x - b.x);

  for (const surf of sortedSurfaces) {
    if (surf.x <= currentX) continue; 
    if (surf.x > limitX) break;

    // 1. Propagate to surface
    const d = surf.x - currentX;
    currentY += d * Math.tan(currentAngle);
    currentX = surf.x;

    // Check Aperture / Lens Height
    if (Math.abs(currentY - OPTICAL_AXIS_Y) > surf.h) {
      path.push({ x: currentX, y: currentY });
      return { path, blocked: true, finalY: currentY };
    }

    path.push({ x: currentX, y: currentY });

    // 2. Refract
    // Paraxial approximation: theta_out = theta_in - y / f
    // Note: y is height relative to optical axis. 
    const relativeY = currentY - OPTICAL_AXIS_Y;
    currentAngle = currentAngle - (relativeY / surf.f);
  }

  // Propagate to limit/sensor
  if (currentX < limitX) {
    const d = limitX - currentX;
    currentY += d * Math.tan(currentAngle);
    path.push({ x: limitX, y: currentY });
  }

  return { path, blocked: false, finalY: currentY };
};