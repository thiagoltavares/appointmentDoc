import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';
import { Grid, InputLabel, MenuItem, Paper, Select } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    selectField: {
      width: '100%',
      marginTop: '8px',
    },
  }),
);

const AppointmentForm: React.FC = () => {
  const classes = useStyles();
  const [doctor, setDoctor] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const handleChangeDoctor = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDoctor(event.target.value as string);
  };

  const handleChangeReason = (event: React.ChangeEvent<{ value: unknown }>) => {
    setReason(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>DateTime</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>HourTime</Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel id="doctor">Select your doctor:</InputLabel>
          <Select
            value={doctor}
            onChange={handleChangeDoctor}
            label="doctor"
            className={classes.selectField}
          >
            <MenuItem value="Miguel Tavares">Miguel Tavares</MenuItem>
            <MenuItem value="Raphael Coentrão">Raphael Coentrão</MenuItem>
            <MenuItem value="Antonio Gadelha">Antonio Gadelha</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel id="reason">Select your Reason:</InputLabel>
          <Select
            value={reason}
            onChange={handleChangeReason}
            label="Reason"
            className={classes.selectField}
          >
            <MenuItem value="Fever">Fever</MenuItem>
            <MenuItem value="Headache">Headache</MenuItem>
            <MenuItem value="Flu">Flu</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>Notes</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppointmentForm;
