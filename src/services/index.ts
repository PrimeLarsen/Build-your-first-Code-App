import type { TaskService } from './TaskService';
import { mockTaskService } from './mockTaskService';

export type { TaskService } from './TaskService';

// Mock mode is the default so the app, and CI, run without a Power Platform login.
// Lab 3 (docs/labs/lab-3-add-data.md) swaps this export for a Dataverse-backed
// implementation — screens and tests never change.
export const taskService: TaskService = mockTaskService;
