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

  const onPost = (event) => {
    event.preventDefault();
    console.log('posted');

    // TODO: Get the real ID from the form:
    const ID = 0;
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

  const [input_val_1, setInputVal1] = useState('');  // [input-field: Integer]    Instructor Name
  const [input_val_2, setInputVal2] = useState(0);  // [slider:      Integer]    Class Duration
  const [input_val_3, setInputVal3] = useState(''); // [dropdown:    String]     Class Type
  const [input_val_4, setInputVal4] = useState(''); // [dropdown:    String]     Class Intensity
  const [input_val_5, setInputVal5] = useState(''); // [dropdown:    String]     Class Location
  const [input_val_6, setInputVal6] = useState(0);  // [slider:      Integer]    Class Size
  const handleInputVal1 = (e)         => { console.log('input_val_1: ', input_val_1); setInputVal1(e.target.value); }
  const handleInputVal2 = (e, newVal) => { console.log('input_val_2: ', input_val_2); setInputVal2(newVal);         }
  const handleInputVal3 = (e)         => { console.log('input_val_3: ', input_val_3); setInputVal3(e.target.value); }
  const handleInputVal4 = (e)         => { console.log('input_val_4: ', input_val_4); setInputVal4(e.target.value); }
  const handleInputVal5 = (e)         => { console.log('input_val_5: ', input_val_5); setInputVal5(e.target.value); }
  const handleInputVal6 = (e, newVal) => { console.log('input_val_6: ', input_val_6); setInputVal6(newVal);         }


  // TODO
  // -Logic to enable button once one of the form input fields are non-empty
  // -Additional logic to disable all other form input fields => we only want to update one field at a time

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={onPost}>

      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '80vh'}}>

        {/* (1):  instructor_name,     Text Input Field */}
        <TextField label="Instructor Name" value={input_val_1} onChange={handleInputVal1}/>

        {/* (2) type,                Dropdown */}
        <div>
          <FormControl className={classes.formControl} style={{width: '100%'}}>
            <InputLabel id="client-classType-dropdown">Exercise Type</InputLabel>
            <Select
              labelId="client-classType-dropdown"
              value={input_val_3}
              onChange={handleInputVal3}
            >
              <MenuItem value={'aerobic'}>Aerobic</MenuItem>
              <MenuItem value={'weights'}>Weight Training</MenuItem>
              <MenuItem value={'yoga'}>Yoga</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* (3) intensity,           Dropdown              --- */}
        <div>
          <FormControl className={classes.formControl} style={{width: '100%'}}>
            <InputLabel id="instructor-classIntensity-dropdown">Intensity</InputLabel>
            <Select
              labelId="instructor-classIntensity-dropdown"
              value={input_val_4}
              onChange={handleInputVal4}
              style={{width: '100%'}}
            >
              <MenuItem value={'low'}>low</MenuItem>
              <MenuItem value={'medium'}>medium</MenuItem>
              <MenuItem value={'high'}>High</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* (4) location,            Dropdown              --- */}
        <div>
          <FormControl className={classes.formControl} style={{width: '100%'}}>
            <InputLabel id="instructor-classLocation-dropdown">Location</InputLabel>
            <Select
              labelId="instructor-classLocation-dropdown"
              value={input_val_5}
              onChange={handleInputVal5}
              style={{width: '100%'}}
            >
              <MenuItem value={'nebraska'}>Nebraska</MenuItem>
              <MenuItem value={'texas'}>Texas</MenuItem>
              <MenuItem value={'oklahoma'}>Oklahoma</MenuItem>
              <MenuItem value={'south-dakota'}>South Dakota</MenuItem>
              <MenuItem value={'north-dakota'}>North Dakota</MenuItem>
              <MenuItem value={'kansas'}>Kansas</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* (2) duration            Slider */}
        <div>
          <Typography gutterBottom>
            Duration
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs>
              <Slider
                color='secondary'
                value={input_val_2}
                onChange={handleInputVal2}
              />
            </Grid>
            <Grid item>{input_val_2}</Grid>
          </Grid>
        </div>

        {/* (6) max_size            Slider */}
        <div>
          <Typography gutterBottom>
            Class Size
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs>
              <Slider
                color='secondary'
                value={input_val_6}
                onChange={handleInputVal6}
              />
            </Grid>
            <Grid item>{input_val_6}</Grid>
          </Grid>
        </div>
          {/* <MaterialUIPickers /> */}
          <DateAndTimePickers />


        <div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </div>

    </form>
  );
}