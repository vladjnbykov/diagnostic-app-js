import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import user from "../reducers/user";



import symptoms from "../reducers/symptoms";

import { API_URL } from "../reusable/urls";

import "./login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "20ch",
    },
  },
}));

const Login = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("")
  const [mode, setMode] = useState(null);

  const accessToken = useSelector((store) => store.user.accessToken);
  const errors = useSelector((store) => store.user.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // redirect user to '/' path
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username));
            dispatch(symptoms.actions.setUsername(data.username));
            dispatch(user.actions.setRole(data.role));


            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setErrors(null));

            localStorage.setItem(
              "user",
              JSON.stringify({
                username: data.username,
                role: data.role,
                accessToken: data.accessToken,
              })
            );
          });
        } else {
          dispatch(user.actions.setErrors(data));
        }
      });
  };

  return (
    <div className="login-template">
      <h1 className="login-title">Diabetes early prediction</h1>

      <div className={classes.root} autoComplete="off">
        <form className="login-form" onSubmit={onFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="username"
            autoFocus
            /*type="text" */
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="password"
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="btn-signin"
            onClick={() => setMode("signin")}
          >
            Log in
          </button>
          <button
            type="submit"
            className="btn-signup"
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </form>
        {errors && <div className="errors">{errors.message}</div>}

      </div>
    </div>
  );
};

export default Login;
