import React, { ChangeEvent, FormEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';

import { Grid } from '@material-ui/core';
import { doctors, reasons } from './utils/data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      width: '600px',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formWrapper: {
      margin: '24px 0',
    },
    textAreaWrapper: {
      width: '100%',
    },
  }),
);
const AppointmentForm: React.FC = () => {
  const classes = useStyles();
  const [doctor, setDoctor] = React.useState('');
  const [reason, setReason] = React.useState('');

  const handleChangeDoctor = (event: ChangeEvent<{ value: unknown }>) => {
    setDoctor(event.target.value as string);
  };

  const handleChangeReason = (event: ChangeEvent<{ value: unknown }>) => {
    setReason(event.target.value as string);
  };

  return (
    <form className={classes.container} noValidate>
      <Grid container direction="column">
        <Grid item container justify="flex-start">
          <TextField
            id="date"
            label="Date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="time"
            label="Alarm clock"
            type="time"
            defaultValue="07:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <Grid
            className={classes.formWrapper}
            item
            container
            justify="flex-start"
          >
            <Grid>
              <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={doctor}
                onChange={event => handleChangeDoctor(event)}
              >
                {doctors.map(({ label }) => (
                  <MenuItem value={label}>{label}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid>
              <InputLabel id="demo-simple-select-label">Reason</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={reason}
                onChange={event => handleChangeReason(event)}
              >
                {reasons.map(({ label }) => (
                  <MenuItem value={label}>{label}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextareaAutosize
            className={classes.textAreaWrapper}
            aria-label="empty textarea"
            placeholder="Leave notes"
            rows={5}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AppointmentForm;
