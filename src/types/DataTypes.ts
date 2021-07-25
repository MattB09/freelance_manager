export interface Client {
  id: number;
  name: string;
}

export interface ProjectPartial {
  id: number;
  clientId: number | null;
  name: string;
  isActive: boolean;
  start: string | null; // for now because data is coming from json file.
  end: string | null;
}

export interface Task {
  id: number;
  projectId: number;
  name: string;
  isComplete: boolean;
  isBillable: boolean;
  duration: number;
}

export interface Project extends ProjectPartial {
  clientName: string | null;
  tasks: Task[];
}
