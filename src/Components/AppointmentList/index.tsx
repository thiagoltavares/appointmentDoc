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

import { useAppointments } from '../../context/appointment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1052,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);


const AppointmentsList: React.FC = () => {
  const classes = useStyles();
  const { appointments, createAppointment, deleteAppointment } = useAppointments();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid>
            <Typography variant="h6" className={classes.title}>
              Appointments
            </Typography>
            <button
              type="button"
              onClick={()=>createAppointment({
                      dateTime: new Date(),
                      doctor:"Thiago Tavares",
                      notes: "no notes",
                      reason: "no Reason"
                    })}
            >
              create
            </button>
          </Grid>

          <div className={classes.demo}>
            <List>
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
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppointmentsList;
