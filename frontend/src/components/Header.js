import React from "react";
import { useDispatch, useSelector, batch } from "react-redux";

import user from "../reducers/user";

const Header = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem("user");
    });
  };

  return (
    <header>
      {accessToken && <button onClick={onButtonClick}>Logout</button>}
    </header>
  );
};

export default Header;
