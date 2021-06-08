import React from 'react'
import { useDispatch, batch } from 'react-redux'

import user from '../reducers/user'

const Header = () => {
    const dispatch = useDispatch()

    const onButtonClick = () => {
        batch(() => {
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
        })
        

    }

    return (
        <header>
            <button onClick={onButtonClick}>Logout</button>
        </header>
    )
}

export default Header