import React from 'react';
import GlobalStyles from './styles/global';
import { AppointmentsProvider } from './context/appointment';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <>
      <AppointmentsProvider>
        <Home />
      </AppointmentsProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
