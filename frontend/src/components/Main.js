import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ReactDOM from 'react-dom'

import{ API_URL } from '../reusable/urls'

import symptoms from '../reducers/symptoms'


const Main = () => {
    const accessToken = useSelector(store => store.user.accessToken)
    const symptomsItems = useSelector(store => store.symptoms.items)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')

    const Checkbox = ({ type = "checkbox", name, checked=false, onChange }) => {
        console.log("Checkbox: ", name, checked)

        return (
            <input type={type} name={name} checked={checked} onChange={onChange} />

        )
    }


    const CheckboxGroup = () => {
        const [checkedItems, setCheckedItems] = useState({})

        const handleChange = (e) => {
            setCheckedItems({...checkedItems, [e.target.name] : e.target.checked })

        }
        useEffect(() => {
            console.log("checkedItems: ", checkedItems)
        }, [checkedItems])

        const checkboxes = [
            {
                name: 'polyuria',
                key: 'polyuria',
                label: 'polyuria',
            },
            {
                name: 'polydipsia',
                key: 'polydipsia',
                label: 'polydipsia',
            },
            {
                name: 'weakness',
                key: 'weakness',
                label: 'weakness',
            },
            {
                name: 'genital-thrush',
                key: 'genital-thrush',
                label: 'genital thrush',
            },
            {
                name: 'itching',
                key: 'itching',
                label: 'itching',
            },
            {
                name: 'irritability',
                key: 'irritability',
                label: 'irritability',
            },
            {
                name: 'delayed-healing',
                key: 'delayed-healing',
                label: 'delayed healing',
            },
            {
                name: 'alopecia',
                key: 'alopecia',
                label: 'alopecia',
            },
            {
                name: 'obesity',
                key: 'obesity',
                label: 'obesity',
            }

        ]
    }


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

                <div>
                    <label>Checked item name : {checkedItems["polyuria"]}</label> <br/>
                    {checkboxes.map(item => (
                            <label key={item.key}>
                                {item.name}
                                <Checkbox 
                                    name={item.name} 
                                    checked={checkedItems[item.name]} 
                                    onChange={handleChange} 
                                />

                            </label>
                        ))
                    }
                </div>
               
                



                <button type="submit">Submit</button>

            </form>

        </div>
    )
}

export default Main