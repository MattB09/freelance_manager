export interface Client {
  id: number;
  name: string;
}

export interface Project {
  clientName?: string;
  name: string;
  isActive?: boolean;
  start?: Date; // for now because data is coming from json file.
  end?: Date;
  tasks?: Task[];
}

export interface Task {
  id?: number;
  name: string;
  isComplete?: boolean;
  isBillable?: boolean;
  timeRecords: TimeRecord[];
}

export interface TimeRecord {
  startTime: Date;
  endTime: Date;
  duration: number;
}