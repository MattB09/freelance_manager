export interface Client {
  id: number; 
  name: string;
}

export interface Project {
  id: number;
  clientId?: number;
  name: string;
  isActive: Boolean;
  start?: string; // for now because data is coming from json file. 
  end?: string;
}

export interface Task {
  id: number; 
  projectId: number;
  name: string;
  isComplete: Boolean;
  isBillable: Boolean;
  duration: number;
}