import { useEffect, useState } from 'react';
import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Spinner,
  Subtitle2,
  Title1,
  createTableColumn,
  makeStyles,
} from '@fluentui/react-components';
import type { TableColumnDefinition } from '@fluentui/react-components';
import type { Task } from '../../models/Task';
import type { TaskService } from '../../services';

export interface HomeProps {
  taskService: TaskService;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '32px',
    maxWidth: '960px',
    margin: '0 auto',
  },
});

function formatDate(isoDate?: string): string {
  if (!isoDate) return '—';
  return new Date(isoDate).toLocaleDateString();
}

const columns: TableColumnDefinition<Task>[] = [
  createTableColumn<Task>({
    columnId: 'title',
    renderHeaderCell: () => 'Title',
    renderCell: (item) => <DataGridCell>{item.title}</DataGridCell>,
  }),
  createTableColumn<Task>({
    columnId: 'status',
    renderHeaderCell: () => 'Status',
    renderCell: (item) => <DataGridCell>{item.status}</DataGridCell>,
  }),
  createTableColumn<Task>({
    columnId: 'dueDate',
    renderHeaderCell: () => 'Due date',
    renderCell: (item) => <DataGridCell>{formatDate(item.dueDate)}</DataGridCell>,
  }),
];

export function Home({ taskService }: HomeProps) {
  const styles = useStyles();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    taskService.getTasks().then((result) => {
      if (!cancelled) {
        setTasks(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [taskService]);

  return (
    <main className={styles.root}>
      <Title1 as="h1">My tasks</Title1>
      <Subtitle2>
        Placeholder screen — you will replace it with the Task List from
        docs/design.md §2.1 in Lab 2.
      </Subtitle2>
      {loading ? (
        <Spinner label="Loading tasks…" />
      ) : (
        <DataGrid
          aria-label="Tasks"
          items={tasks}
          columns={columns}
          getRowId={(item) => item.id}
        >
          <DataGridHeader>
            <DataGridRow>
              {(column) => (
                <DataGridHeaderCell key={column.columnId}>
                  {column.renderHeaderCell()}
                </DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<Task>>
            {({ item, rowId }) => (
              <DataGridRow key={rowId}>
                {(column) => column.renderCell(item)}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      )}
    </main>
  );
}
