import React, { useEffect } from "react"

import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import styled from 'styled-components'
import './prognosis.css'


const Prognosis = () => {
  const accessToken = useSelector((store) => store.user.accessToken)

  const results = useSelector((store) => store.symptoms.risk)
  const history = useHistory()

  const Block = styled.div`
  background-color: white;
  color: ${({ color }) => color || "blue"};
  padding: 10px;
  border: 1px solid ${({ color }) => color || "blue"};
  display: inline-block;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: lightblue;
  }
`;

const Background = styled.div`
  background-color: blue;
  `



  const isBackgroundColor = () => {
    let color
    if (results >= 0 && results < 30) {
      color = "blue"
    } else if (results > 30) {
      color = "red"
    }
    return color
  }

  useEffect(() => {
    if (!accessToken) {
      history.push("/login")
    }
  }, [accessToken, history])

  return (
    <>
      <div className="prognosis">
        <Block/>
      
        Your risk of developing diabetes is {results}%

      </div>

    
    </>


    
    
  )
};

export default Prognosis
