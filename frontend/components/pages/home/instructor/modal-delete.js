import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {buttonStylesPurple} from '../../../../global-styles/form-styles.js';

// ==============================================
// ==============================================

// https://github.com/lambda-build-anywhere-fitness/backend#endpoints-for-the-users

// Description              Method  Endpoint                           Body (required)                                                                      Body (optional)    Notes
// -----------              ------  --------                           ---------------  ---------------                                                     ---------------    -----
// Removes Class            DELETE  /api/auth/instructor/classes/:id   any of the field                                                                     N/A	               Deletes the class with given Id

// ==============================================
// ==============================================

const Modal_DeleteClasses = ({card_selected, sessions, setSessions}) => {

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
  
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  // --------------------------------------------

  const classes = useStyles();
  const buttonClasses = buttonStylesPurple();

  // --------------------------------------------  

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);

    const _id = sessions[card_selected]._id;
    console.log('_id: ', _id);

    axios.get(`http://localhost:4000/classes/delete/${_id}`)
        .then( () => {
          console.log(`successful deletion of class ${_id}`);

          // Update classes rendered to screen...
          const filtered = sessions.filter((session, idx) => {
            console.log('session._id: ', session._id, ',  _id: ', _id);
            return session._id != _id;
          });
          
          console.log('filtered: ', filtered);
          setSessions([...filtered]);
        })
        .catch((e) => console.log('error during deleting class from database, error: ', e));
  };

  const handleClose = () => {
    setOpen(false);
  };

  // --------------------------------------------

  return (

    <div>
      <Button disabled={card_selected > -1 ? false : true} variant='contained' onClick={handleOpen} className={buttonClasses.root}>
        Delete Class
      </Button>
    </div>

  ); // return
}; // Modal_AddClasses

// ==============================================
// ==============================================

export default Modal_DeleteClasses;