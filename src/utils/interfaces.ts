export interface Task {
  name: string;
  startDate: string;
  endDate: string;
}

export interface Week {
  weekNumber: number;
  month: string;
}

export interface TaskTableProps {
  tasks: Task[];
  weeks: Week[];
  year: number;
  onUpdateTask: (index: number, updatedTask: Task) => void;
}

export interface AddTaskFormProps {
  addTask: (task: Task) => void;
}

export {};
