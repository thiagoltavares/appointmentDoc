import React from 'react';

import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import AppointmentsList from '../../Components/AppointmentList';
import AppointmentForm from '../../Components/AppointmentForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    listWrapper: {
      margin: '24px',
    },
  }),
);
const Main: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item container className={classes.container}>
      <Grid item className={classes.listWrapper}>
        <AppointmentsList />
      </Grid>
      <Grid item className={classes.listWrapper}>
        <AppointmentForm />
      </Grid>
    </Grid>
  );
};

export default Main;
