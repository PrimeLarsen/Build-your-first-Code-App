import type { NewTaskInput, Task } from '../models/Task';

export interface TaskService {
  getTasks(): Promise<Task[]>;
  createTask(input: NewTaskInput): Promise<Task>;
  completeTask(id: string): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}
