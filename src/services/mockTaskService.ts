import type { NewTaskInput, Task } from '../models/Task';
import type { TaskService } from './TaskService';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Read docs/design.md',
    status: 'done',
    createdAt: '2025-01-06T09:00:00Z',
  },
  {
    id: '2',
    title: 'Clone the golden repo',
    status: 'done',
    createdAt: '2025-01-06T09:05:00Z',
  },
  {
    id: '3',
    title: 'Build the task list screen',
    status: 'open',
    dueDate: '2025-01-10T00:00:00Z',
    notes: 'Use Fluent UI v9, see design section 2.1',
    createdAt: '2025-01-06T09:10:00Z',
  },
  {
    id: '4',
    title: 'Write Playwright tests',
    status: 'open',
    dueDate: '2025-01-12T00:00:00Z',
    createdAt: '2025-01-06T09:15:00Z',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class MockTaskService implements TaskService {
  private tasks: Task[] = [...initialTasks];

  async getTasks(): Promise<Task[]> {
    await delay(200);
    return [...this.tasks];
  }

  async createTask(input: NewTaskInput): Promise<Task> {
    await delay(200);
    const task: Task = {
      id: crypto.randomUUID(),
      title: input.title,
      status: 'open',
      dueDate: input.dueDate,
      notes: input.notes,
      createdAt: new Date().toISOString(),
    };
    this.tasks = [task, ...this.tasks];
    return task;
  }

  async completeTask(id: string): Promise<Task> {
    await delay(200);
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new Error(`Task ${id} not found`);
    }
    task.status = 'done';
    return { ...task };
  }

  async deleteTask(id: string): Promise<void> {
    await delay(200);
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}

export const mockTaskService: TaskService = new MockTaskService();
