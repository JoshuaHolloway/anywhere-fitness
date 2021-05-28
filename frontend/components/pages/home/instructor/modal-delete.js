import React, {useState, useEffect} from 'react';
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

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import ModalContents from './modal-contents-delete.js';

import {buttonStylesPurple} from '../../../../global-styles/form-styles.js';

// ==============================================
// ==============================================

// https://github.com/lambda-build-anywhere-fitness/backend#endpoints-for-the-users

// Description              Method  Endpoint                           Body (required)                                                                      Body (optional)    Notes
// -----------              ------  --------                           ---------------  ---------------                                                     ---------------    -----
// Removes Class            DELETE  /api/auth/instructor/classes/:id   any of the field                                                                     N/A	               Deletes the class with given Id

// ==============================================
// ==============================================

const Modal_DeleteClasses = () => {

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
  };

  const handleClose = () => {
    setOpen(false);
  };

  // --------------------------------------------

  return (

    <div>
      <Button variant='contained' onClick={handleOpen} className={buttonClasses.root}>
        Delete Class
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
            <h2 id="transition-modal-title">Delete Class</h2>
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

export default Modal_DeleteClasses;