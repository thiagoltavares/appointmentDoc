/* eslint-disable prettier/prettier */
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
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



const AppointmentsList: React.FC = () => {
  const classes = useStyles();
  const { appointments, createAppointment, deleteAppointment } = useAppointments();

  function createData(id: string, dateTime: Date, doctor: string, reason: string, notes: string) {
    return { id, dateTime, doctor, reason, notes};
  }

  const appointmentRows = appointments.map(({id, dateTime, doctor, reason, notes}) => createData(id, dateTime, doctor, reason, notes))

  return (

    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            Appointments
          </Typography>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            size="small"
            className={classes.button}
            onClick={()=>createAppointment({
                      dateTime: new Date(),
                      doctor:"Thiago Tavares",
                      notes: "no notes",
                      reason: "no Reason"
                    })}
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
              {appointmentRows.map((appointmentRow) => (
                <TableRow key={appointmentRow.id}>
                  <TableCell component="th" scope="row">
                    {appointmentRow.dateTime.toString()}
                  </TableCell>
                  <TableCell align="right">{appointmentRow.doctor}</TableCell>
                  <TableCell align="right">{appointmentRow.reason}</TableCell>
                  <TableCell align="right">{appointmentRow.notes}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      edge="end"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={()=>deleteAppointment(appointmentRow.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <List>
          {appointments.map(appointment => (
            <ListItem key={appointment.id}>
              <ListItemText
                primary="DATE"
              />
              <ListItemText
                primary={appointment.reason}
              />
              <ListItemText
                primary={appointment.doctor}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={()=>deleteAppointment(appointment.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
                ))}
        </List> */}
      </Grid>
    </Grid>

  );
};

export default AppointmentsList;
