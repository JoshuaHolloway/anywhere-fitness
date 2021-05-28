import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Grid, LinearProgress } from "@material-ui/core";
import {buttonStyles, inputStyles} from '../../../global-styles/form-styles.js';

// ==============================================
// ==============================================

const RegisterPage = () => {

  // --------------------------------------------

  const [text_value_1, setTextValue1] = useState('');
  const [text_value_2, setTextValue2] = useState('');
  const [text_value_3, setTextValue3] = useState('');
  const [text_value_4, setTextValue4] = useState('');
  const [radio_value,  setRadioValue] = useState('client');
  
  const handleTextChange1 = e => setTextValue1(e.target.value);
  const handleTextChange2 = e => setTextValue2(e.target.value);
  const handleTextChange3 = e => setTextValue3(e.target.value);
  const handleTextChange4 = e => setTextValue4(e.target.value);
  const handleRadioChange = e => setRadioValue(e.target.value);
  
  // --------------------------------------------

  const init_form = {name: '', email: '', username: '', password: '', role: 'client'};
  const [form_values, setFormValues] = useState(init_form);

  useEffect(() => {
    setFormValues({
      name:     text_value_1,
      username: text_value_2,
      email:    text_value_3, 
      password: text_value_4, 
      role:     radio_value
    });

    console.log('form values: ', form_values);

  }, [text_value_1, text_value_2, text_value_3, text_value_4, radio_value]);

  // --------------------------------------------

  const history = useHistory();
  const onPost = (event) => {
    console.log('onPost() in registration form component');
    event.preventDefault();

    const formData = {
      "name":      form_values.name,
      "email":     form_values.email,
      "username":  form_values.username,
      "password":  form_values.password,
      "user-type": form_values.role,
    };

    const login_link   = document.querySelector('#register__login-link');
    const progress_bar = document.querySelector('#register__LinearProgress');
    progress_bar.classList.remove('hide-visibility');
    login_link.classList.add('hide-visibility');

    // axios.post('https://anywhere-fitness-ptbw.herokuapp.com/api/auth/register', formData)
    //      .then(res => {
    //        console.log('response: ', res);
    //        history.push('/login');
    //      })
    //      .catch(err => console.log(err));
    setFormValues(init_form);

    // Do this in 'fulfilled' .then() callback for above Promise resulting from POST request to API-URL/api/auth/register:
    history.push('/login')
  };

  // --------------------------------------------

  const buttonClasses = buttonStyles();
  const inputClasses = inputStyles();

  // --------------------------------------------

  return (
    <form onSubmit={onPost} style={{display: 'grid', placeItems: 'center', height: '100vh', width: '100vw', background: 'linear-gradient(90deg, var(--gradient-orange-starting), var(--gradient-orange-ending))'}}>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent:'space-evenly', alignItems: 'center', height: '85%', minHeight: '600px', maxHeight: '700px', width: '70vw', maxWidth: '500px', color: 'var(--text-primary)'}}>
        <h3>CREATE YOUR ACCOUNT</h3>
        <FormControl style={{display: 'flex', flexDriction: 'column', justifyContent: 'space-evenly', minHeight: '250px', width: '100%'}}>
          <TextField name="name"     label="name"     onChange={handleTextChange1} className={inputClasses.root}/>
          <TextField name="username" label="username" onChange={handleTextChange2} className={inputClasses.root}/>
          <TextField name="email"    label="email"    onChange={handleTextChange3} className={inputClasses.root}/>
          <TextField name="password" label="password" onChange={handleTextChange4} className={inputClasses.root}/>
        </FormControl>

        <FormControl component="fieldset">
          {/* <FormLabel component="legend" className={inputClasses.root}>Role</FormLabel> */}
          <RadioGroup aria-label="role" name="role" value={radio_value} onChange={handleRadioChange}>
            <FormControlLabel value="client"     control={<Radio />} label="Client" className={inputClasses.root}/>

            <div style={{display: 'flex'}}>
              <FormControlLabel value="instructor" control={<Radio />} label="Instructor" className={inputClasses.root}/>
              {radio_value == 'instructor' ? 
                <TextField name="auth-code" label="Auth Code" className={inputClasses.root} /> :
                <TextField name="auth-code" label="Auth Code" className={inputClasses.root} style={{visibility: 'hidden'}}/>
              }
            </div>
            
          </RadioGroup>
        </FormControl>

        <Button variant="contained" type="submit" className={buttonClasses.root}>
          REGISTER
        </Button>

        <div style={{position: 'relative', height: '60px', width: '100%'}}>
          <div id="register__login-link" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '100%', width: '100%'}}>
            <p>Already have an account?</p>
            <Link to="/login">Log In</Link>
          </div>
          <Grid spacing={1} container style={{position: 'absolute', top: '50%'}}>
            <Grid xs item>
              <LinearProgress color="secondary" className="hide-visibility" id="register__LinearProgress"></LinearProgress>
            </Grid>
          </Grid>
        </div>
      
      
      </div>
    </form>
  ); // return
}; // RegisterForm

// ==============================================
// ==============================================

export default RegisterPage;