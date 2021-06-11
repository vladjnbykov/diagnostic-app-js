import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { checkboxes } from "../utils/checkboxes"
import Checkbox from "./Checkbox"


const CheckboxRender = () => {
    const [checkedItems, setCheckedItems] = useState({})
  
    const handleChange = event => {
      setCheckedItems({
        ...checkedItems,
        [event.target.name]: event.target.checked
      })
    }  
    useEffect(() => {
    console.log("checkedItems: ", checkedItems);
    }, [checkedItems])
 
    return (
      <div>
        <h4>Check if you suffer from :</h4>  
        {checkboxes.map(item => (
          <label key={item.key}>
            {/*{item.name}*/}  
            {item.label}
            <Checkbox
              name={item.name}
              checked={checkedItems[item.name]}
              onChange={handleChange}
            />
          </label>
        ))}
      </div>
    )
  }

export default CheckboxRender
