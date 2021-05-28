import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTimePickers() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log('selectedDate :', selectedDate);
  };

  React.useEffect(() => {
    console.log('state updated');
  }, [selectedDate]);

  return (
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={selectedDate}
        onChange={handleDateChange}
      />
  );
}