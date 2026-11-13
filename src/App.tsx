import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Home } from './screens/Home/Home';
import { taskService } from './services';

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Home taskService={taskService} />
    </FluentProvider>
  );
}
