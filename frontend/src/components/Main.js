import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import{ API_URL } from '../reusable/urls'

import symptoms from '../reducers/symptoms'


const Main = () => {
    const accessToken = useSelector(store => store.user.accessToken)
    const symptomsItems = useSelector(store => store.symptoms.items)
    
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!accessToken) {
            history.push('/login')
        }
    }, [accessToken, history]) 
    
    // render all symptoms
    useEffect(() => { 
        if(accessToken) {
            const options = {
                method: 'GET',
                headers: {
                    Authorization: accessToken
                }

            }
            fetch(API_URL('symptoms'), options)
            .then(res => res.json())
            .then(data => dispatch(symptoms.actions.setSymptoms(data)))
        }
    }, [accessToken, dispatch])
        
        
    

    return (
        <div>
            <div>Main</div>
            <Link to="/login">To Login</Link>
            {symptomsItems.map(symptom => (
                <div key={symptoms._id}>{symptom.message}</div>
            ))}


        </div>
    )
}

export default Main