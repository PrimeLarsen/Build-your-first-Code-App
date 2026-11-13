export type TaskStatus = 'open' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate?: string;
  notes?: string;
  createdAt: string;
}

export interface NewTaskInput {
  title: string;
  dueDate?: string;
  notes?: string;
}

export const MAX_TITLE_LENGTH = 80;
export const MAX_NOTES_LENGTH = 200;
