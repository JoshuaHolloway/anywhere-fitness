import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import InputAdornment from '@material-ui/core/InputAdornment';
import Slider from '@material-ui/core/Slider';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import ControlledAccordions from './accordian-controlled-1.js';

import {buttonStylesLogout} from '../../../../global-styles/form-styles.js';

// ==============================================
// ==============================================

// https://github.com/lambda-build-anywhere-fitness/backend#endpoints-for-the-users

// Description              Method  Endpoint                           Body (required)	Body (optional)    Notes
// -----------              ------  --------                           ---------------  ---------------    -----
// get all classes          GET     /api/auth/users/classes            N/A              N/A                Fetches all the classes from the database
// get classes by Id        GET     /api/auth/users/classes/:id        id               N/A                Fetches the class with given Id.
// get classes by Location  GET     /api/auth/users/classes/location   location         N/A                Gets all the class in that location
// get classes by intensity GET     /api/auth/users/classes/intensity  intensity        N/A                Gets all the class in that intensity. "low", "medium", or "high"
// get classes by duration  GET     /api/auth/users/classes/duration   duration         N/A                Gets all the class of that duration. Has to be double.
// get classes by type      GET     /api/auth/users/classes/type       type             N/A                Gets all the class of that type.

// ==============================================
// ==============================================

const ClientHomePage = ({setLoggedIn}) => {

  // --------------------------------------------

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }));

  // --------------------------------------------

  const classes = useStyles();

  // --------------------------------------------

  const [input_val_1, setInputVal1] = useState(0);  // [input-field: Integer]    Class ID
  const [input_val_2, setInputVal2] = useState(0);  // [slider:      Integer]    Class Duration
  const [input_val_3, setInputVal3] = useState(''); // [dropdown:    String]     Class Type
  const [input_val_4, setInputVal4] = useState(''); // [dropdown:    String]     Class Location
  const [input_val_5, setInputVal5] = useState(''); // [dropdown:    String]     Class Intensity
  const handleInputVal1 = (e)         => { console.log('input_val_1: ', input_val_1); setInputVal1(e.target.value); }
  const handleInputVal2 = (e, newVal) => { console.log('input_val_2: ', input_val_2); setInputVal2(newVal);         }
  const handleInputVal3 = (e)         => { console.log('input_val_3: ', input_val_3); setInputVal3(e.target.value); }
  const handleInputVal4 = (e)         => { console.log('input_val_4: ', input_val_4); setInputVal4(e.target.value); }
  const handleInputVal5 = (e)         => { console.log('input_val_5: ', input_val_5); setInputVal5(e.target.value); }

  // --------------------------------------------

  const [accordian_state_1, setAccordianState1] = useState(false);
  const [sessions, setSessions]                 = useState([]);
  const [num_rows, setNumRows]                  = useState(1);
  const [josh, setJosh]                         = useState(0);

  // --------------------------------------------

  const initially_disable = (input_val) => input_val ? false : true;

  // --------------------------------------------

  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("ourToken");
    setLoggedIn(false);
    history.push('/');
  };

  // --------------------------------------------

  const buttonStyleLogout = buttonStylesLogout();

  // --------------------------------------------

  return (
    <div className="homepage homepage-client" style={{position: 'relative'}}>
      <Button variant="outlined" color="secondary" onClick={logout} className={buttonStyleLogout.root}>Log Out</Button>
      <div className="container">
        <h1>Client Home Page</h1>

        {/* - - - - - - - - - - - - - - - - - - */}
        <div className="card">

          <Button variant="outlined" color="secondary" style={{width: '100%'}} onClick={() => 
            {
              setAccordianState1(!accordian_state_1);

              // Client API-Call (1/6): Get all classes
              axios.get('http://localhost:4000/classes')
                    .then(response => {
                      console.log('response.data: ', response.data);
                      const numRows = Math.ceil(classes.length / 3);
                      setNumRows(numRows);
                      setSessions(response.data);
                      console.log('sessions.length: ', sessions.length, 'Math.ceil(sessions.length / 3): ', numRows ,' num_rows: ', num_rows);
                    })
                    .catch(error => console.log('error: ', error));
            }}
          >
            Get All Classes
          </Button>

          <ControlledAccordions josh={josh} sessions={sessions} num_rows={num_rows} accordian_state_1={accordian_state_1} setAccordianState1={setAccordianState1} />
          
        </div>
        {/* - - - - - - - - - - - - - - - - - - */}

        <div className="card">
          <TextField
            label="Enter Class ID Number"
            id="standard-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: <InputAdornment position="start">ID#</InputAdornment>,
            }}
            value={input_val_1}
            onChange={handleInputVal1}
          />

          <Button variant="outlined" color="secondary" style={{width: '100%'}} onClick={() => {

            // NOTE: Uses index of sessions array
            //       => Should probably load the classes on page load...
            const id = sessions[input_val_1]._id; // input field

            // Client API-Call (2/6): Get specific class
            axios.get(`http://localhost:4000/classes/${id}`)
                .then(response => {
                  console.log('response.data: ', response.data);
                })
                .catch(error => console.log('error: ', error));

            }}
            disabled={initially_disable(input_val_1)}
          >
            Get Classes by ID
          </Button>

        </div>

        {/* - - - - - - - - - - - - - - - - - - */}

        <div className="card">

          <FormControl className={classes.formControl}>
            <InputLabel id="client-classLocation-dropdown">Location</InputLabel>
            <Select
              labelId="client-classLocation-dropdown"
              value={input_val_4}
              onChange={handleInputVal4}
            >
              <MenuItem value={'nebraska'}>Nebraska</MenuItem>
              <MenuItem value={'texas'}>Texas</MenuItem>
              <MenuItem value={'oklahoma'}>Oklahoma</MenuItem>
              <MenuItem value={'south-dakota'}>South Dakota</MenuItem>
              <MenuItem value={'north-dakota'}>North Dakota</MenuItem>
              <MenuItem value={'kansas'}>Kansas</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" color="secondary" onClick={() => {

            const location = input_val_4; // dropdown
            console.log('location: ', location);

            // Client API-Call (2/6): Get specific class
            axios.get(`http://localhost:4000/classes/location/${location}`)
                .then(response => {
                  console.log('response.data: ', response.data);
                })
                .catch(error => console.log('error: ', error));
            }}
            disabled={initially_disable(input_val_4)}
          >
            Get Classes by Location
          </Button>
        </div>
        
        {/* - - - - - - - - - - - - - - - - - - */}

        <div className="card">

          <FormControl className={classes.formControl}>
            <InputLabel id="client-classIntensity-dropdown">Intensity</InputLabel>
            <Select
              labelId="client-classIntensity-dropdown"
              value={input_val_5}
              onChange={handleInputVal5}
            >
              <MenuItem value={'low'}>Low</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'high'}>High</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" color="secondary" style={{width: '100%'}} onClick={() => {

            const intensity = input_val_5; // dropdown

            // -Orlando TODO (4/6): Drop API-call here
            // get classes by intensity GET     /api/auth/users/classes/intensity  intensity        N/A                Gets all the class in that intensity. "low", "medium", or "high"
            const endpoint = `/api/auth/users/classes/${intensity}`;
            axios.get(`https://anywhere-fitness-ptbw.herokuapp.com${endpoint}`)
                .then(res => console.log('response: ', res))
                .catch(err => console.log(err));
            }}
            disabled={initially_disable(input_val_5)}
          >
            Get Classes by Intensity
          </Button>
        </div>

        {/* - - - - - - - - - - - - - - - - - - */}

        <div className="card">

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


          <Button variant="outlined" color="secondary" onClick={() => {

            const duration = input_val_2; // slider

            // -Orlando TODO (5/6): Drop API-call here
            // get classes by duration  GET     /api/auth/users/classes/duration   duration         N/A                Gets all the class of that duration. Has to be double.
            const endpoint = `/api/auth/users/classes/${duration}`;
            axios.get(`https://anywhere-fitness-ptbw.herokuapp.com${endpoint}`)
                .then(res => console.log('response: ', res))
                .catch(err => console.log(err));
            }}
            disabled={initially_disable(input_val_2)}
          >
            Get Classes by Duration
          </Button>
        </div>
        
        {/* - - - - - - - - - - - - - - - - - - */}

        <div className="card">
  
          <FormControl className={classes.formControl}>
            <InputLabel id="client-classType-dropdown">Type</InputLabel>
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

          <Button variant="outlined" color="secondary" onClick={() => {

            // -Josh TODO (5/5): Get <duration>
            const type = input_val_3; // Checkboxes

            // -Orlando TODO (6/6): Drop API-call here
            // get classes by type      GET     /api/auth/users/classes/type       type             N/A                Gets all the class of that type.
            const endpoint = `/api/auth/users/classes/${type}`;
            axios.get(`https://anywhere-fitness-ptbw.herokuapp.com${endpoint}`)
                .then(res => console.log('response: ', res))
                .catch(err => console.log(err));          
            }}
            disabled={initially_disable(input_val_3)}
          >
            Get Classes by Type
          </Button>
        </div>
        
        {/* - - - - - - - - - - - - - - - - - - */}

      </div>
    </div>
  ); // return
}; // ClientHomePage

// ==============================================
// ==============================================

export default ClientHomePage;