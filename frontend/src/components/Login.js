import React, { useState } from 'react'

import { API_URL } from '../reusable/urls'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState(null)

    const onFormSubmit = (e) => {
        e.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }

        fetch(API_URL(mode), options)
            .then(res => console.log(res))
    }

    return (
         <form onSubmit={onFormSubmit}>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit" onClick={() => setMode('signin')}>Sign in</button>
            <button type="submit" onClick={() => setMode('signup')}>Sign up</button>

        </form>
    )
}

export default Login