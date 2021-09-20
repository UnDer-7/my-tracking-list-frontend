import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Routes } from './Routes';
import { CssBaseline } from '@mui/material';

function App() {
  return (
      <>
        <CssBaseline />
        <Routes/>
      </>
  );
}

export default App;
