import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Card from './card.js';

// ==============================================

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

// ==============================================

export default function ControlledAccordions({josh, sessions, num_rows, accordian_state_1, setAccordianState1}) {

  // --------------------------------------------

  const classes = useStyles();
  
  // --------------------------------------------

  return (
    <div className={classes.root}>


      <Accordion expanded={accordian_state_1}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
        >
        </AccordionSummary>
        <AccordionDetails>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: `repeat(${num_rows}, 275px)`, gap: '10px', margin: '20px 0'}}>
            {sessions && sessions.map((session, idx) => {
              return (
                <Card key={session._id} session={session} />
              );
            })}
          </div>


        </AccordionDetails>
      </Accordion>
    
    </div>
  );
}