import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'



import{ API_URL } from '../reusable/urls'

import symptoms from '../reducers/symptoms'

import { checkboxes } from "../utils/checkboxes"
import Checkbox from "./Checkbox"

const Main = () => {
    const accessToken = useSelector(store => store.user.accessToken)
    const symptomsItems = useSelector(store => store.symptoms.items)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')


    
      
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
                {item.name}
                <Checkbox
                  name={item.name}
                  checked={checkedItems[item.name]}
                  onChange={handleChange}
                />
              </label>
            ))}
          </div>
        );
      };
    

    


    useEffect(() => {
        if (!accessToken) {
            history.push('/login')
        }
    }, [accessToken, history]) 
    
    const onFormSubmit = (e) => {
        e.preventDefault()
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
                    {CheckboxRender()}
                <div>
                    
                </div>
               
                



                <button type="submit">Submit</button>

            </form>

        </div>
    )
}

export default Main