import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import ModalContents from './modal-contents-add.js';

import {buttonStylesOrange} from '../../../../global-styles/form-styles.js';

// ==============================================
// ==============================================

// https://github.com/lambda-build-anywhere-fitness/backend#endpoints-for-the-users

// Description              Method  Endpoint                           Body (required)                                                                      Body (optional)    Notes
// -----------              ------  --------                           ---------------  ---------------                                                     ---------------    -----
// Add class                POST    /api/auth/instructor/classes       name, instructor_name, type, intensity,location, date, max_size, duration, signedUp  N/A                Creates a new class object in the database. Date has to string in "04/19/2020" format. Duration is a float and signedUp is a boolean(false as a default)

// ==============================================
// ==============================================

const Modal_AddClasses = () => {

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

  // --------------------------------------------

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // --------------------------------------------

  const buttonClasses = buttonStylesOrange();

  // --------------------------------------------  

  return (

    <div>
      <Button variant='contained' onClick={handleOpen} className={buttonClasses.root}>
        Add Class
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add Class</h2>
            <p id="transition-modal-description">For Instructor</p>

            <ModalContents />

          </div>
        </Fade>
      </Modal>
    </div>

  ); // return
}; // Modal_AddClasses

// ==============================================
// ==============================================

export default Modal_AddClasses;