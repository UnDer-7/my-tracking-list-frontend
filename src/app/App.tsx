import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Routes } from './Routes';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from './config/Store';
import { SnackbarProvider } from 'notistack';
import { useIsMobile } from './utils/hooks/useIsMobile';
import { useThemeConfiguration } from './utils/hooks/useThemeConfiguration';

function App() {
    const isMobile = useIsMobile();
    const theme = useThemeConfiguration();

    return (
        <Provider store={ store }>
            <ThemeProvider theme={ theme }>
                <SnackbarProvider maxSnack={ 3 } preventDuplicate={ false } dense={ isMobile }>
                    <GoogleOAuthProvider clientId={ `${ process.env['REACT_APP_OAUTH_GOOGLE_CLIENT_ID'] }` }>
                        <CssBaseline/>
                        <Routes/>
                    </GoogleOAuthProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
