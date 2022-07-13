import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

// BaseRegistrar deployed to: 0xF7D495f4bA8d019a4f63Ff9b9272CAA0E36B3867

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
