import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Prognosis = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const results = useSelector((store) => store.symptoms.risk);
  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, [accessToken, history]);

  return <div>{results}</div>;
};

export default Prognosis;
