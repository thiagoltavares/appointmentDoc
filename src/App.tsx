import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';
import Routes from './routes';
import { AppointmentsProvider } from './context/appointment';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppointmentsProvider>
        <Routes />
      </AppointmentsProvider>
      <GlobalStyles />
    </BrowserRouter>
  );
};

export default App;
