import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

const App = () => {

  const content = useRoutes(routes);

  const getLibrary = (provider) => {
    return new Web3(provider)
  }

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <CssBaseline />
            {content}
          </Web3ReactProvider>
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default App;
