# 📐 Design — Task Tracker

This is the **single source of truth** for the app you will build in the labs. Copilot should always be pointed at this file when you ask it to build something.

## 1. Product goal

A simple **Task Tracker** that lets a small team manage their daily tasks:

- See all my tasks in a list
- Filter by status (All / Open / Done)
- Add a new task
- Mark a task as done
- Delete a task

Nothing more. A golden repo keeps scope small — juniors ship a complete, tested app in one session.

## 2. Screens

### 2.1 Task List (home screen) — `src/screens/TaskList/`

| Element | Details |
|---|---|
| Page title | "My tasks" (`<H1>` Fluent typography) |
| Command bar | "New task" (primary button), "Refresh" (secondary) |
| Search box | Filters the list by title as you type |
| Filter tabs | `All` · `Open` · `Done` (Fluent `TabList`) — shows count per tab |
| Task list | Fluent `DataGrid`: columns **Title**, **Status** (badge), **Due date**, **Actions** |
| Empty state | When no tasks match: friendly message + "New task" button |
| Error state | When loading fails: `MessageBar` with retry |

### 2.2 New Task (dialog, not a page) — `src/screens/TaskList/NewTaskDialog.tsx`

| Field | Validation |
|---|---|
| Title (`Input`) | Required, max 80 chars |
| Due date (`DatePicker`) | Optional, cannot be in the past |
| Notes (`Textarea`) | Optional, max 200 chars |

Buttons: **Create** (primary, disabled while invalid), **Cancel**. On success the dialog closes and the new task appears at the top of the list.

## 3. Data model — `src/models/Task.ts`

```ts
export type TaskStatus = 'open' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate?: string;   // ISO date, optional
  notes?: string;
  createdAt: string;  // ISO date
}
```

All data access goes through `TaskService` in `src/services/` — screens never fetch directly. Today it returns mock data; in Lab 3 the same interface is backed by a **SharePoint list** (the data source your team uses every day). **Because screens only know the interface, swapping the data source touches one file.**

### 3.1 SharePoint list mapping (used in Lab 3)

| `Task` field | SharePoint column | Type |
|---|---|---|
| `id` | `Id` | built-in |
| `title` | `Title` | built-in first column |
| `status` | `Status` | Choice: `open` / `done` |
| `dueDate` | `DueDate` | Date (optional) |
| `notes` | `Notes` | Multiple lines of text (optional) |
| `createdAt` | `Created` | built-in |

```ts
export interface TaskService {
  getTasks(): Promise<Task[]>;
  createTask(input: NewTaskInput): Promise<Task>;
  completeTask(id: string): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}
```

## 4. UX rules

- Loading states: show a `Spinner` centered in the list area, never a blank screen.
- Every user action gives feedback — a success toast (`Toast`) or an inline update.
- Destructive action (delete) asks for confirmation (`Dialog`).
- The app must be usable with keyboard only; interactive elements need visible focus.

## 5. Out of scope (on purpose)

- Login/auth (the Power Platform runtime handles it in a real Code App)
- Sharing tasks with other users
- Offline support

If a Copilot suggestion adds any of these, reject it and re-prompt.
