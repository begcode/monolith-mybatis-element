export interface WorkplaceTotal {
  project: number;
  access: number;
  todo: number;
}

export interface Project {
  name: string;
  icon: string;
  message: string;
  personal: string;
  time: Date | number | string;
}

export interface Dynamic {
  keys: string[];
  time: Date | number | string;
}

export interface Team {
  name: string;
  icon: string;
}

export type RadarData = {
  personal: number;
  team: number;
  max: number;
  name: string;
};
