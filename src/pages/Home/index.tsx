import React from 'react';
import AppointmentsList from '../../Components/AppointmentList';
import AppointmentForm from '../../Components/AppointmentForm';

const Main: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <AppointmentsList />
      <AppointmentForm />
    </div>
  );
};

export default Main;
