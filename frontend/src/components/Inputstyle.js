import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({

  
  root: {
    

    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

export const Inputstyle = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="username" variant="outlined" />
    </div>
  );
};
