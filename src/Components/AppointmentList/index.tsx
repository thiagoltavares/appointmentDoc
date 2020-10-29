import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useAppointments } from '../../context/appointment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
    table: {
      minWidth: 650,
    },
  }),
);

interface AppointmentsListProps {
  openForm: (id?: string) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ openForm }) => {
  const classes = useStyles();
  const { appointments, deleteAppointment } = useAppointments();

  function createData(
    id: string,
    dateTime: Date,
    doctor: string,
    reason: string,
    notes: string,
    formattedDate?: string,
  ) {
    return { id, dateTime, doctor, reason, notes, formattedDate };
  }

  const appointmentRows = appointments.map(
    ({ id, dateTime, doctor, reason, notes, formattedDate }) =>
      createData(id, dateTime, doctor, reason, notes, formattedDate),
  );

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            Appointments
          </Typography>
        </Grid>
        <Grid item>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            size="small"
            className={classes.button}
            onClick={() => openForm()}
          >
            Create new Appointment
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Doctor</TableCell>
                <TableCell align="right">Reason</TableCell>
                <TableCell align="right">Notes</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentRows.map(
                ({ id, doctor, reason, notes, formattedDate }) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {formattedDate}
                    </TableCell>
                    <TableCell align="right">{doctor}</TableCell>
                    <TableCell align="right">{reason}</TableCell>
                    <TableCell align="right">{notes}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => openForm(id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteAppointment(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default AppointmentsList;
