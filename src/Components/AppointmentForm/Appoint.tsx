import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

const AppointmentForm: React.FC = () => {
  const classes = useStyles();
  const [doctor, setDoctor] = React.useState<string | number>('');
  const [reason, setReason] = React.useState<string | number>('');
  const [openDoc, setOpenDoc] = React.useState(false);
  const [openReason, setOpenReason] = React.useState(false);

  const handleChangeDoc = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDoctor(event.target.value as number);
  };

  const handleChangeReason = (event: React.ChangeEvent<{ value: unknown }>) => {
    setReason(event.target.value as number);
  };

  const handleCloseDoc = () => {
    setOpenDoc(false);
  };

  const handleOpenDoc = () => {
    setOpenDoc(true);
  };

  const handleCloseReason = () => {
    setOpenReason(false);
  };

  const handleOpenReason = () => {
    setOpenReason(true);
  };

  return (
    <Grid>
      <Grid container>
        <Grid>
          <Button className={classes.button}>Choose Doctor</Button>
          <FormControl className={classes.formControl}>
            <InputLabel id="doc-label">Doctor</InputLabel>
            <Select
              labelId="doc-label"
              id="doc"
              open={openDoc}
              onClose={handleCloseDoc}
              onOpen={handleOpenDoc}
              value={doctor}
              onChange={handleChangeDoc}
            >
              <MenuItem value="Miguel Silva">Miguel Silva</MenuItem>
              <MenuItem value="Rafael Duarte">Rafael Duarte</MenuItem>
              <MenuItem value="João Manoel">João Manoel</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <Button className={classes.button}>Choose Reason</Button>
          <FormControl className={classes.formControl}>
            <InputLabel id="reason-label">Reason</InputLabel>
            <Select
              labelId="reason-label"
              id="reason"
              open={openReason}
              onClose={handleCloseReason}
              onOpen={handleOpenReason}
              value={reason}
              onChange={handleChangeReason}
            >
              <MenuItem value="Fever">Fever</MenuItem>
              <MenuItem value="Headache">Headache</MenuItem>
              <MenuItem value="Flu">Flu</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AppointmentForm;
