import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Modal_AddClasses from './modal-add.js';
import Modal_UpdateClasses from './modal-update.js';
import Modal_DeleteClasses from './modal-delete.js';
import Button from '@material-ui/core/Button';

import NestedGrid from './grid.js';
import axios from 'axios';

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

  const [classes, setClasses] = useState([]);

  // --------------------------------------------

  useEffect(() => {
    
    axios.get('http://localhost:4000/classes')
          .then(response => {
            console.log('response.data: ', response.data);
          })
          .catch(error => console.log('error: ', error));

  }, []);

  // --------------------------------------------

  return (
    <div className="homepage homepage-client">
      <div className="container" style={{position: 'relative'}}>
        <div style={{position: 'absolute', display: 'grid', placeItems: 'center', top: '0', width: '100%', height: '200px'}}>
          <h3 >Instructor Home Page</h3>
        </div>
        <Button variant="outlined" color="secondary" onClick={logout}>Log Out</Button>

        <div className="card" style={{display: 'flex', justifyContent: 'space-evenly'}}>

          {/* /api/auth/instructor/classes */}
          <Modal_AddClasses endpoint={'add'}/>

          {/* /api/auth/instructor/classes/:id	 */}
          <Modal_UpdateClasses endpoint={'update'} />

          {/* /api/auth/instructor/classes/:id */}
          <Modal_DeleteClasses endpoint={'delete'}/>

        </div>
      
      </div>
    
      <NestedGrid />
    </div>
  ); // return
}; // InstructorHomePage

// ==============================================
// ==============================================

export default InstructorHomePage;