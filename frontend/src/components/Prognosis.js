import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import "./prognosis.css";



const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: ${(props) => (props.color ? props.color : "white")};
  border: 1px solid navy;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px rgba(2, 58, 80, 0.4);
  margin: 50px 40px 50px 40px;
`;

//
const Prognosis = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const results = Math.round(useSelector((store) => store.symptoms.risk));
  const history = useHistory();
  //

  const isBackgroundColor = () => {
    let color;
    if (results >= 0 && results < 15) {
      color = "#CCCCFF";
    } else if (results >= 15 && results < 40) {
      color = "#D0FFCD";
    } else if (results >= 40 && results < 70) {
      color = "#FFFFCD";
    } else if (results >= 70) {
      color = "#FFCDCD";
    }

    return color;
  };

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, [accessToken, history]);

  return (
    <>
      <div className="prognosis">
        <h2 className="prognosis-title">Results</h2>
        <Background color={isBackgroundColor()}>
          <h5>Your risk of developing diabetes is {results}%</h5>
        </Background>
      </div>

    </>
  );
};

export default Prognosis;
