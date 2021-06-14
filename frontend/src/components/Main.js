import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { checkboxes } from "../utils/checkboxes"
import Checkbox from "./Checkbox"

import Prognosis from "./Prognosis"

import { API_URL } from '../reusable/urls'
import { API_ML} from '../reusable/urls'

import symptoms from '../reducers/symptoms'


const Main = () => {

    const accessToken = useSelector(store => store.user.accessToken)
    const items = useSelector(store => store.symptoms.items)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [checkedItems, setCheckedItems] = useState({})
    let [parameters, setParameters] = useState({})
    
    
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
              parameters = {
                "age": data.age,
                "gender": data.gender === 'male' ? 1 : 0,
                "polyuria": data.checkedItems.polyuria === undefined ? 0 : Number(data.checkedItems.polyuria) ,
                "polydipsia": data.checkedItems.polydipsia === undefined ? 0 :Number(data.checkedItems.polydipsia),
                "weakness": data.checkedItems.weakness === undefined ? 0 :Number(data.checkedItems.weakness),
                "genital_thrush": data.checkedItems.genital_thrush === undefined ? 0 :Number(data.checkedItems.genital_thrush),
                "itching": data.checkedItems.itching === undefined ? 0 :Number(data.checkedItems.itching),
                "irritability": data.checkedItems.irritability === undefined ? 0 :Number(data.checkedItems.irritability),
                "delayed_healing": data.checkedItems.delayed_healing === undefined ? 0 :Number(data.checkedItems.delayed_healing),
                "alopecia": data.checkedItems.alopecia === undefined ? 0 :Number(data.checkedItems.alopecia),
                "obesity": data.checkedItems.obesity === undefined ? 0 :Number(data.checkedItems.obesity) 
              }

              
              // ML fetch inside of first fetch

              const options1 = {
                method: 'POST',
                headers: {
                
                  'Content-Type': 'application/json'
                },
                
                body: JSON.stringify(parameters)
              }
          
              fetch(API_ML, options1)     
                .then((res) => res.json())
                .then((ml_data) => 
                  console.log("ml response", ml_data))



              console.log("multiparameters", parameters)
              console.log("mixtest", parameters.itching)
              console.log("stringify", JSON.stringify(parameters))

              console.log(typeof(parameters))
               
                batch(() => {
                  dispatch(symptoms.actions.setAge(data.age))
                  dispatch(symptoms.actions.setGender(data.gender))
                  dispatch(symptoms.actions.setCheckedItems(data.checkedItems))

                  dispatch(symptoms.actions.setErrors(null))

                  dispatch(symptoms.actions.setParameters(parameters))

                  
                 })

          console.log("params-inside-fun", parameters)

          // ML data posting        
          
        })
        
            // ML data post
            console.log("params", parameters)
             // it is empty for unknown reason


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