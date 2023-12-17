import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserDataProvider } from './Contexts/UserDataContext.tsx';
import { ObsWebsocketProvider } from './Contexts/ObsWebsocketContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <UserDataProvider>
      <ObsWebsocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ObsWebsocketProvider>
    </UserDataProvider>
    ,
  </ThemeProvider>,
);
