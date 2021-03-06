import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

const App = () => {

  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider >
  );
}
export default App;
