export interface Client {
  id: number;
  name: string;
}

export interface TimeRecord {
  startTime: Date;
  endTime: Date;
  duration: number;
}

export interface Task {
  id?: number;
  name: string;
  isComplete?: boolean;
  isBillable?: boolean;
  timeRecords?: TimeRecord[];
}

export interface Project {
  id?: string;
  clientName?: string;
  name: string;
  isActive?: boolean;
  start?: Date;
  end?: Date;
  tasks?: Task[];
}
