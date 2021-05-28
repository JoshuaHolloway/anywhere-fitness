import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Grid, LinearProgress } from "@material-ui/core";
import {buttonStyles, inputStyles} from '../../../global-styles/form-styles.js';

// ==============================================
// ==============================================

const LoginPage = ({setLoggedIn, setRole}) => {

  // --------------------------------------------

  const [text_value_1, setTextValue1] = useState('');
  const [text_value_2, setTextValue2] = useState('');
  
  const handleTextChange1 = e => setTextValue1(e.target.value);
  const handleTextChange2 = e => setTextValue2(e.target.value);
  
  // --------------------------------------------

  const init_form = {username: '', password: ''};
  const [form_values, setFormValues] = useState(init_form);

  useEffect(() => {
    setFormValues({
      username: text_value_1,
      password: text_value_2,
    });

    console.log('form values: ', form_values);

  }, [text_value_1, text_value_2]);

  // --------------------------------------------

  const history = useHistory();
  const onPost = (event) => {
    console.log('onPost() in login form component');
    event.preventDefault();

    const formData = {
      "username":  form_values.username,
      "password":  form_values.password,
    };

    const register_link   = document.querySelector('#login__register-link');
    const progress_bar = document.querySelector('#register__LinearProgress');
    progress_bar.classList.remove('hide-visibility');
    register_link.classList.add('hide-visibility');

    // axios.post('https://anywhere-fitness-ptbw.herokuapp.com/api/auth/login', formData)
    //      .then(res => {
    //        console.log('response: ', res);
    //        setLoggedIn(true);
    //        history.push('/');
    //      })
    //      .catch(err => console.log(err));
    setFormValues(init_form);

    // Do this in 'fulfilled' .then() callback for above Promise resulting from POST request to API-URL/api/auth/login:
    setLoggedIn(true);
    const role_property_in_reponse_object_returned_from_post_request_to_api_login_endpoint = 'instructor';
    setRole(role_property_in_reponse_object_returned_from_post_request_to_api_login_endpoint);
    history.push('/');
  };

  // --------------------------------------------

  const buttonClasses = buttonStyles();
  const inputClasses = inputStyles();

  // --------------------------------------------

  return (
    <form onSubmit={onPost} style={{display: 'grid', placeItems: 'center', height: '100vh', width: '100vw', background: 'linear-gradient(90deg, var(--gradient-green-starting), var(--gradient-green-ending))'}}>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent:'space-evenly', alignItems: 'center', height: '80%', width: '70vw', maxWidth: '500px', color: 'var(--text-primary)'}}>
        <h3>LOG IN TO YOUR ACCOUNT</h3>
        <FormControl style={{display: 'flex', flexDriction: 'column', justifyContent: 'space-evenly', minHeight: '170px', width: '100%'}}>
          <TextField name="username" label="username" onChange={handleTextChange1} className={inputClasses.root}/>
          <TextField name="password" label="password" onChange={handleTextChange2} className={inputClasses.root}/>
        </FormControl>

        <Button variant="contained" type="submit" className={buttonClasses.root}>
          LOG IN
        </Button>
        
        <div style={{position: 'relative', height: '60px', width: '100%'}}>
          <div id="login__register-link" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '100%', width: '100%'}}>
            <p>Need to sign up?</p>
            <Link to="/register">Register</Link>
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
}; // LoginForm

// ==============================================
// ==============================================

export default LoginPage;