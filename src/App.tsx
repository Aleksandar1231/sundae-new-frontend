import React, { Suspense } from "react";
import { routes } from './routing/mainRoutes';

import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom';
// import MetaTags from "react-meta-tags";
import Routing from "./components/Routing";
import Loader from './components/Loader';
import styles from './App.module.scss';
import store from "./state";
import { UseWalletProvider } from "use-wallet";
import config from "./config";
import { RefreshContextProvider } from "./contexts/RefreshContext";
import TombFinanceProvider from "./contexts/TombFinanceProvider";
import ModalsProvider from './contexts/Modals';
import BanksProvider from './contexts/Banks';
import Updaters from "./state/Updaters";
import usePromptNetwork from "./hooks/useNetworkPrompt";
import Page from "./components/Page";


const App = () => {

    // Clear localStorage for mobile users
    if (typeof localStorage.version_app === 'undefined' || localStorage.version_app !== '1.1') {
        localStorage.clear();
        localStorage.setItem('connectorId', '');
        localStorage.setItem('version_app', '1.1');
    }
    usePromptNetwork();

    return (
        <div className={styles.content}>
            {/*// <MetaTags>*/}
            {/*//     <Meta/>*/}
            {/*// </MetaTags>*/}


            <UseWalletProvider
                chainId={config.chainId}
                connectors={{
                    walletconnect: { rpcUrl: config.defaultProvider },
                    walletlink: {
                        url: config.defaultProvider,
                        appName: 'Sundae Finance',
                        appLogoUrl: './sundaelogo.png',
                    },
                }}
            >
                <Provider store={store}>
                    <Updaters />
                    <RefreshContextProvider>
                        <TombFinanceProvider>
                            <ModalsProvider>
                                <BanksProvider>
                                    <Suspense fallback={<Loader />}>
                                        <HashRouter>
                                            <Page>
                                                <Routing {...{ routes }} />
                                            </Page>
                                        </HashRouter>
                                    </Suspense>
                                </BanksProvider>
                            </ModalsProvider>
                        </TombFinanceProvider>
                    </RefreshContextProvider>
                </Provider>
            </UseWalletProvider>
        </div>
    )
}

export default App;
