import React, { createContext, useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';

interface Appointments {
  id: string;
  dateTime: Date;
  notes: string;
  doctor: string;
  reason: string;
  formattedDate?: string;
}

interface AppointmentsContextData {
  appointments: Appointments[];
  createAppointment(appointmentData: Omit<Appointments, 'id'>): void;
  deleteAppointment(id: string): void;
  updateAppointment(appointmentData: Appointments): void;
  getAppointmentById(id: string): Appointments | null;
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

  const getAppointmentById = (id: string): Appointments | null => {
    const appointment = appointments.find(app => app.id === id);

    return appointment || null;
  };

  const createAppointment = (appointmentData: Appointments): void => {
    const { dateTime, doctor, notes, reason, id } = appointmentData;

    const formattedDate = DateTime.fromJSDate(dateTime).toLocaleString();

    const newAppointment: Appointments = {
      id: id || uuid(),
      dateTime,
      doctor,
      notes,
      reason,
      formattedDate,
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
        ? { ...appointment, ...receivedAppointment }
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
        getAppointmentById,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

function useAppointments(): AppointmentsContextData {
  const context = useContext(AppointmentsContext);

  if (!context) {
    throw new Error(
      'useAppointments must be used within an AppointmentsProvider',
    );
  }

  return context;
}

export { AppointmentsProvider, useAppointments };
