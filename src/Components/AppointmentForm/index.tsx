/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';
import { useAppointments } from '../../context/appointment';

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
    textField: {
      width: '100%',
      padding: '8px',
    },
    selectField: {
      width: '100%',
      marginTop: '8px',
    },
    textAreaField: {
      width: '100%',
      marginTop: '8px',
      padding: '8px',
      resize: 'none',
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  }),
);

const initialValues: AppointmentValues = {
  doctor: '',
  reason: '',
  notes: '',
  dateTime: DateTime.local().toJSDate(),
};

interface AppointmentValues {
  id?: string;
  doctor: string;
  reason: string;
  notes: string;
  dateTime: Date;
}

interface AppointmentFormProps {
  closeForm: () => void;
  appointmentToEdit?: AppointmentValues | null;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  closeForm,
  appointmentToEdit,
}) => {
  const classes = useStyles();
  const { createAppointment, updateAppointment } = useAppointments();
  const [values, setValues] = useState<AppointmentValues>(initialValues);

  useEffect(() => {
    if (appointmentToEdit) {
      const { id, dateTime, doctor, notes, reason } = appointmentToEdit;
      setValues({
        ...values,
        dateTime,
        id,
        doctor,
        notes,
        reason,
      });
    }
  }, [appointmentToEdit]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'dateTime') {
      const newDate = DateTime.fromISO(value);
      setValues({
        ...values,
        [name]: newDate.toJSDate(),
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmitAppointment = (event: FormEvent) => {
    event.preventDefault();

    if (appointmentToEdit) {
      const { id, dateTime, doctor, notes, reason } = values;
      // eslint-disable-next-line no-unused-expressions
      id && updateAppointment({ id, dateTime, doctor, notes, reason });
    } else {
      createAppointment(values);
    }

    setValues(initialValues);
    closeForm();
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmitAppointment}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <InputLabel id="doctor">Appointment Date:</InputLabel>
            <TextField
              id="datetime-local"
              type="datetime-local"
              defaultValue="2020-10-29T09:00:00"
              className={classes.textField}
              name="dateTime"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel id="doctor">Select your doctor:</InputLabel>
            <Select
              value={values.doctor}
              name="doctor"
              onChange={handleInputChange}
              className={classes.selectField}
            >
              <MenuItem value="Miguel Tavares">Miguel Tavares</MenuItem>
              <MenuItem value="Raphael Coentrão">Raphael Coentrão</MenuItem>
              <MenuItem value="Antonio Gadelha">Antonio Gadelha</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={4}>
            <InputLabel id="reason">Select your Reason:</InputLabel>
            <Select
              name="reason"
              value={values.reason}
              onChange={handleInputChange}
              className={classes.selectField}
            >
              <MenuItem value="Fever">Fever</MenuItem>
              <MenuItem value="Headache">Headache</MenuItem>
              <MenuItem value="Flu">Flu</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="reason">Notes:</InputLabel>
            <TextareaAutosize
              value={values.notes}
              name="notes"
              onChange={handleInputChange}
              className={classes.textAreaField}
              aria-label="minimum height"
              rowsMin={6}
              placeholder="Write some notes..."
            />
          </Grid>
        </Grid>
        <Grid>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.button}
            onClick={closeForm}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            size="small"
            className={classes.button}
          >
            {appointmentToEdit ? 'Save' : 'Create'}
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default AppointmentForm;
