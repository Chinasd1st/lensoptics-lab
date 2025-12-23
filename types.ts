
export enum ModuleType {
  GEOMETRIC_OPTICS = 'GEOMETRIC_OPTICS', 
  ZOOM_SYSTEM = 'ZOOM_SYSTEM',
  OPTICAL_FILTERS = 'OPTICAL_FILTERS',
  LENS_ADVANCED = 'LENS_ADVANCED', // 像差/镀膜/电影镜对比
  MECHANICS = 'MECHANICS', 
  CINEMATOGRAPHY = 'CINEMATOGRAPHY',
  SENSOR_EXPOSURE = 'SENSOR_EXPOSURE', 
  DIGITAL_ISP = 'DIGITAL_ISP', 
  VIDEO_ENGINEERING = 'VIDEO_ENGINEERING',
  POST_PRODUCTION = 'POST_PRODUCTION', // 影视后期调色
  GEAR_SHOWCASE = 'GEAR_SHOWCASE', // 2025 新品发布
}

export enum MotorType {
  STM = 'STM',
  USM = 'USM',
  LINEAR = 'LINEAR',
}

export interface Point {
  x: number;
  y: number;
}

export interface Ray {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  type: 'parallel' | 'focal' | 'center' | 'marginal';
}

export interface OpticalSurface {
  x: number;
  f: number;
  h: number;
  name?: string;
}