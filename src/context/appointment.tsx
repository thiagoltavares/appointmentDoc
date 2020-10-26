import React, { createContext, useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';

interface Appointments {
  id: string;
  dateTime: Date;
  notes: string;
  doctor: string;
  reason: string;
}

interface AppointmentsContextData {
  appointments: Appointments[];
  createAppointment(appointmentData: Omit<Appointments, 'id'>): void;
  deleteAppointment(id: string): void;
  updateAppointment(appointmentData: Appointments): void;
}

const AppointmentsContext = createContext<AppointmentsContextData>(
  {} as AppointmentsContextData,
);

const AppointmentsProvider: React.FC = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointments[]>(() => {
    const storageAppointment = localStorage.getItem(
      '@AppointMaster:Appointments',
    );

    if (storageAppointment) {
      return JSON.parse(storageAppointment);
    }

    return [];
  });

  const saveInLocalStorage = (collection: Appointments[]): void => {
    localStorage.setItem(
      '@AppointMaster:Appointments',
      JSON.stringify(collection),
    );
  };

  const createAppointment = (
    appointmentData: Omit<Appointments, 'id'>,
  ): void => {
    const { dateTime, doctor, notes, reason } = appointmentData;
    const newAppointment: Appointments = {
      id: uuid(),
      dateTime,
      doctor,
      notes,
      reason,
    };
    setAppointments([...appointments, newAppointment]);
    saveInLocalStorage([...appointments, newAppointment]);
  };

  const deleteAppointment = (id: string): void => {
    const filteredAppointments = appointments.filter(
      appointment => appointment.id !== id,
    );
    setAppointments(filteredAppointments);
    saveInLocalStorage(filteredAppointments);
  };

  const updateAppointment = (receivedAppointment: Appointments) => {
    const changedAppointments = appointments.map(appointment =>
      appointment.id === receivedAppointment.id
        ? receivedAppointment
        : appointment,
    );
    setAppointments(changedAppointments);
    saveInLocalStorage(changedAppointments);
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        createAppointment,
        deleteAppointment,
        updateAppointment,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

function useAppointments(): AppointmentsContextData {
  const context = useContext(AppointmentsContext);

  if (!context) {
    throw new Error('useAuth must be used within an AiuthProvider');
  }

  return context;
}

export { AppointmentsProvider, useAppointments };
