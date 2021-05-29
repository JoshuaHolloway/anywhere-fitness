import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { gsap } from "gsap";

const useStyles = makeStyles({
  root: {
    // minHeight: '200px',
    // maxHeight: '300px',
    minWidth: '275px',
    // margin: '10px 0'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// ==============================================

export default function SimpleCard({session, idx, card_selected, setCardSelected, is_selected}) {
  const classes = useStyles();
  // --------------------------------------------

  const inputRef = useRef(null);

  // --------------------------------------------

  useEffect(() => {

    const elem = inputRef.current;
    console.log('card.js, elem: ', elem);

    if (card_selected == idx)
      gsap.to(elem, {scale: 1.2, duration: 0.5});
    else
      gsap.to(elem, {scale: 1,   duration: 0.5});

  }, [card_selected]);

  // --------------------------------------------

  const onClick = () => {
    console.log('clicked card #: ', idx);
    setCardSelected(idx);

    console.log('idx: ', idx);
    console.log('card_selected: ', card_selected);

    const elem = inputRef.current;
    console.log('card.js, elem: ', elem);
    gsap.to(elem, {scale: 1.2, duration: 0.5});
  };

  // --------------------------------------------
  
  return (
    <Card ref={inputRef} id={`card-${idx}`} className={classes.root} onClick={onClick}>
      <CardContent>
        
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <strong>Instructor:</strong> {session.instructor_name}
        </Typography>
        
        <Typography variant="h5" component="h2">
          {session.exercise_type}
        </Typography>
        
        <Typography className={classes.pos} color="textSecondary">
          <strong>Intensity:</strong> {session.intensity}
        </Typography>
        
        <Typography variant="body2" component="p">
          <strong>Location:</strong> {session.location}
        </Typography>
        
        <Typography variant="body2" component="p">
          <strong>Duration:</strong> {session.duration}
        </Typography>

        <Typography variant="body2" component="p">
          <strong>Class Size:</strong> {session.class_size}
        </Typography>


      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}