import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const history = useHistory();
  const handleClose = () => {
    onClose(selectedValue);
    history.push('/register');
  };


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        User not in database.  
        <br />
        Please <Link to="/register" style={{color: 'black'}}>Register</Link>
      </DialogTitle>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({open, setOpen}) {

  const history = useHistory();
  const handleClose = (value) => {
    setOpen(false);
    history.push('/register');
  };

  return (
    <div>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}