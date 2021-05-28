import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slider from '@material-ui/core/Slider';

// import MaterialUIPickers from './modal-calendar.js';
import DateAndTimePickers from './modal-calendar.js';
// import MaterialUIPickers from './modal-date.js'

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

// ==============================================

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'lightgray',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

// ==============================================

export default function ModalContents({endpoint}) {
  const classes = useStyles();

  // --------------------------------------------

  // state variables corresponding to the id of the class we want to delete
  const [input_val_1, setInputVal1] = useState('');  // [input-field: Integer]    Instructor Name
  const handleInputVal1 = (e)         => { console.log('input_val_1: ', input_val_1); setInputVal1(e.target.value); }

  // --------------------------------------------

  const onPost = (event) => {
    event.preventDefault();
    console.log('posted');

    // TODO: Get the real ID from the form:
    const ID = input_val_1;
    const formData = {
      name: 'test',
      instructor_name: 'test',
      type: 'test',
      intensity: 'test',
      location: 'test', 
      date: 'test', 
      max_size: 'test', 
      duration: 'test', 
      signedUp: 'test'
    };

    axios.post(`https://anywhere-fitness-ptbw.herokuapp.com/api/auth/instructor/classes${ID}`, formData)
         .then(res => {
           console.log('response: ', res);

         })
         .catch(err => console.log(err));
  };


  // (1) instructor_name,     Text Input Field
  // (2) duration,            Slider
  // (3) type,                Dropdown
  // (4) intensity,           Dropdown
  // (5) location,            Dropdown
  // (6) max_size,            Slider
  // (7) date,                Calendar              (Start Time)


  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={onPost}>

      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '200px'}}>

        {/* (1):  instructor_name,     Text Input Field */}
        <TextField label="ID for class to delete" value={input_val_1} onChange={handleInputVal1}/>
      </div>

      <div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </div>

    </form>
  );
}