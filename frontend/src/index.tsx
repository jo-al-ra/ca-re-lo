import App from './App';
import ReactDOM from 'react-dom';
import 'src/utils/chart';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import { SidebarProvider } from './contexts/SidebarContext';
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import { ethers } from 'ethers';
import { getEthConnectionDetails } from './config/eth';

const Web3Wrapper = () => {
  const Web3ReactProviderWithWallet = createWeb3ReactRoot('withWallet')
  const connectionDetails = getEthConnectionDetails(window.location.hostname)
  console.log(connectionDetails)
  console.log(window.location)
  const network = {
    chainId: connectionDetails.chainId,
    name: "careloChain",
    ensAddress: process.env.REACT_APP_ENS_ADDRESS ?? "0x587e32dB64b9095607B3266D3Abf5748307fF621"
  }

  return (
    <Web3ReactProvider getLibrary={(provider) => {
      return new ethers.providers.JsonRpcProvider(provider, network)
    }}>
      <Web3ReactProviderWithWallet getLibrary={(provider) => {
        return new ethers.providers.Web3Provider(
          provider, network)
      }}>
        <HelmetProvider>
          <SidebarProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SidebarProvider>
        </HelmetProvider>
      </Web3ReactProviderWithWallet>
    </Web3ReactProvider>
  );
}

ReactDOM.render(
  <Web3Wrapper />,
  document.getElementById('root')
);

serviceWorker.unregister();
