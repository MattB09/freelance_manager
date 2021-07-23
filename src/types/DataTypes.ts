export interface Client {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  clientId?: number;
  name: string;
  isActive: boolean;
  start?: string; // for now because data is coming from json file.
  end?: string;
}

export interface Task {
  id: number;
  projectId: number;
  name: string;
  isComplete: boolean;
  isBillable: boolean;
  duration: number;
}
