import React, { useCallback, useState } from 'react';
import { Box, createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import AppointmentsList from '../../components/AppointmentList';
import AppointmentForm from '../../components/AppointmentForm';
import { useAppointments } from '../../context/appointment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    content: {
      maxWidth: '1000px',
      padding: '12px',
      margin: ' 24px auto',
    },
    listWrapper: {},
    formWrapper: {},
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

interface Appointments {
  id: string;
  dateTime: Date;
  notes: string;
  doctor: string;
  reason: string;
  formattedDate?: string;
}

const Main: React.FC = () => {
  const classes = useStyles();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [
    appointmentToEdit,
    setAppointmentToEdit,
  ] = useState<Appointments | null>(null);

  const { getAppointmentById } = useAppointments();

  const openForm = useCallback(
    (id?: string) => {
      if (id) {
        const appointment = getAppointmentById(id);
        setAppointmentToEdit(appointment);
      }
      setShowAppointmentForm(true);
    },
    [getAppointmentById],
  );

  const closeForm = useCallback(() => {
    setShowAppointmentForm(false);
    setAppointmentToEdit(null);
  }, []);

  const renderForm = useCallback(() => {
    return (
      <Box className={`${classes.formWrapper} ${classes.content}`}>
        <Paper className={classes.paper}>
          <AppointmentForm
            closeForm={closeForm}
            appointmentToEdit={appointmentToEdit}
          />
        </Paper>
      </Box>
    );
  }, [
    appointmentToEdit,
    classes.content,
    classes.formWrapper,
    classes.paper,
    closeForm,
  ]);

  return (
    <Box className={classes.container}>
      <Box className={`${classes.listWrapper} ${classes.content}`}>
        <Paper className={classes.paper}>
          <AppointmentsList openForm={openForm} />
        </Paper>
      </Box>
      {showAppointmentForm && renderForm()}
    </Box>
  );
};

export default Main;
