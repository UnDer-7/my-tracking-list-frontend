import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Routes } from './Routes';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () => createTheme({
            palette: { mode: prefersDarkMode ? 'dark' : 'light' }
        }),
        [prefersDarkMode]
    );

  return (
      <ThemeProvider theme={theme}>
          <GoogleOAuthProvider clientId="1028347055014-csos23ertvrdq38cmjg9h1bk5avl4ocv.apps.googleusercontent.com">
              <CssBaseline />
              <Routes/>
          </GoogleOAuthProvider>
      </ThemeProvider>
  );
}

export default App;
