import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  noShadow:{
      boxShadow: "none"
  }
  
}));

export default function FloatingButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color={props.color} onClick={() => props.onclick} size={props.size} variant={props.label ? "extended":"round"} {...props} elevation={0} className={clsx({ [classes.noShadow]:!props.hasBoxShadow})}>
        {props.icon} {props.label}
      </Fab>
    </div>
  );
}