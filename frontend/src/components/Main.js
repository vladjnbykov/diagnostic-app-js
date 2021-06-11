import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { checkboxes } from "../utils/checkboxes"
import Checkbox from "./Checkbox"

import{ API_URL } from '../reusable/urls'

import symptoms from '../reducers/symptoms'


const Main = () => {

    const accessToken = useSelector(store => store.user.accessToken)
    const items = useSelector(store => store.symptoms.items)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
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
 
    useEffect(() => {
        if (!accessToken) {
            history.push('/login')
        }
    }, [accessToken, history]) 

    useEffect(() => {
        if (accessToken) {
          const options = {
            method: "GET",
            headers: {
              Authorization: accessToken
            }
          }

          fetch(API_URL('symptoms'), options)
            .then((res) => res.json())
            .then((data) => dispatch(symptoms.actions.setSymptoms(data)))
        }
    }, [accessToken, dispatch]) 
    
    const onFormSubmit = (e) => {
        e.preventDefault()
        
        const options = {
            method: 'POST',
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ age, gender, checkedItems, items })
          }
      
          fetch(API_URL('symptoms'), options)
            .then((res) => res.json())
            .then((data) => {
               
                batch(() => {
                  dispatch(symptoms.actions.setAge(data.age))
                  dispatch(symptoms.actions.setGender(data.gender))
                  dispatch(symptoms.actions.setCheckedItems(data.checkedItems))
                  dispatch(symptoms.actions.setErrors(null))
                 })
              
            })
}

    return (
        <div>
            <div>Main</div>
            

            <form onSubmit={onFormSubmit}>
                <div>
                    <p>input your age</p>
                    <input 
                        type="number" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                />

                </div>
                <div>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value={gender}
                        onChange={() => setGender('male')}
                    />
                    <label htmlFor="male">male</label>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value={gender}
                        onChange={() => setGender('female')}
                    />
                    <label htmlFor="female">female</label>
                </div>

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
               
                <button type="submit">Submit</button>

            </form>

        </div>
    )
}

export default Main