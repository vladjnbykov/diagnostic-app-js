import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import "./prognosis.css";

//
{/*const Background = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background-color: ${props => props.color};
    border: 1px solid navy;
    margin: 50px 40px 50px 40px;
  `;
*/}

  //
const Prognosis = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const results = Math.round(useSelector((store) => store.symptoms.risk));
  const history = useHistory();

  

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
    // return <Background color={props.color} />
    return (color)
  };

  const Background = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background-color: ${isBackgroundColor()};
    border: 1px solid navy;
    margin: 50px 40px 50px 40px;
  `;




  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, [accessToken, history]);

  return (
    <>
      <div className="prognosis">
        <h2>Results</h2>
        <Background>
          <h5>Your risk of developing diabetes is {results}%</h5>
        </Background>
      </div>
    </>
  );
};

export default Prognosis;
