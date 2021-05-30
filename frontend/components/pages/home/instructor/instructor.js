import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Modal_AddClasses from './modal-add.js';
import Modal_UpdateClasses from './modal-update.js';
import Modal_DeleteClasses from './modal-delete.js';
import Button from '@material-ui/core/Button';

// import NestedGrid from './grid.js';
import Card from './card.js';
import axios from 'axios';

import {buttonStylesLogout} from '../../../../global-styles/form-styles.js';

// ==============================================
// ==============================================

// https://github.com/lambda-build-anywhere-fitness/backend#endpoints-for-the-users

// Description              Method  Endpoint                           Body (required)                                                                      Body (optional)    Notes
// -----------              ------  --------                           ---------------  ---------------                                                     ---------------    -----
// Add class                POST    /api/auth/instructor/classes       name, instructor_name, type, intensity,location, date, max_size, duration, signedUp  N/A                Creates a new class object in the database. Date has to string in "04/19/2020" format. Duration is a float and signedUp is a boolean(false as a default)
// Update Class             PUT     /api/auth/instructor/classes/:id   any of the field                                                                     N/A	               Updates the class with given Id
// Removes Class            DELETE  /api/auth/instructor/classes/:id   any of the field                                                                     N/A	               Deletes the class with given Id
// ==============================================
// ==============================================

const InstructorHomePage = ({setLoggedIn}) => {

  // --------------------------------------------

  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("ourToken");
    setLoggedIn(false);
    history.push('/');
  };

  // --------------------------------------------

  const [classes, setClasses]            = useState([]);
  const [num_rows, setNumRows]           = useState(1);
  const [card_selected, setCardSelected] = useState(-1);

  // --------------------------------------------

  const buttonStyleLogout = buttonStylesLogout();

  // --------------------------------------------

  useEffect(() => {
    
    axios.get('http://localhost:4000/classes')
          .then(response => {
            const classes = response.data;
            console.log('response.data: ', response.data);
            const numRows = Math.ceil(classes.length / 3);
            setNumRows(numRows);
            setClasses(classes);
            console.log('classes.length: ', classes.length, 'Math.ceil(classes.length / 3): ', numRows ,' num_rows: ', num_rows, 'classes: ', classes);
          })
          .catch(error => console.log('error: ', error));

  }, []);

  // --------------------------------------------

  useEffect(() => {

  }, [card_selected]);

  // --------------------------------------------

  return (
    <div className="homepage homepage-client" style={{position: 'relative'}}>
      <Button variant="outlined" color="secondary" onClick={logout} className={buttonStyleLogout.root}>Log Out</Button>
      <div className="container" style={{position: 'relative'}}>
        <div style={{display: 'grid', placeItems: 'center', width: '100%', height: '100px', border: 'solid red 0px'}}>
          <h3 >Instructor Home Page</h3>
        </div>

        <div className="card" style={{display: 'flex', justifyContent: 'space-evenly'}}>

          {/* /api/auth/instructor/classes */}
          <Modal_AddClasses card_selected={card_selected} sessions={classes} setClasses={setClasses}/>

          {/* /api/auth/instructor/classes/:id	 */}
          <Modal_UpdateClasses card_selected={card_selected} sessions={classes} setSessions={setClasses}/>

          {/* /api/auth/instructor/classes/:id */}
          <Modal_DeleteClasses card_selected={card_selected} sessions={classes} setSessions={setClasses}/>

        </div>
      
      </div>
    
      {/* <NestedGrid sessions={classes}/> */}
      {/* <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}> */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: `repeat(${num_rows}, 275px)`, gap: '10px', margin: '20px 0'}}>
        {classes && classes.map((session, idx) => {
          return (
            <Card key={session._id} session={session} card_selected={card_selected} setCardSelected={setCardSelected} idx={idx} />
          );
        })}
      </div>

    </div>
  ); // return
}; // InstructorHomePage

// ==============================================
// ==============================================

export default InstructorHomePage;