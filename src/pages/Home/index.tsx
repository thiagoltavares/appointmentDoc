import React from 'react';
import { Box, createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import AppointmentsList from '../../components/AppointmentList';
import AppointmentForm from '../../components/AppointmentForm';

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
const Main: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={`${classes.listWrapper} ${classes.content}`}>
        <Paper className={classes.paper}>
          <AppointmentsList />
        </Paper>
      </Box>

      <Box className={`${classes.formWrapper} ${classes.content}`}>
        <Paper className={classes.paper}>
          <AppointmentForm />
        </Paper>
      </Box>
    </Box>
  );
};

export default Main;
