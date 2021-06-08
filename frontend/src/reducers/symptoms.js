import { createSlice } from '@reduxjs/toolkit'

const symptoms = createSlice({
    name: 'symptoms',
    initialState: {
        items: []
    },
    reducers: {
        setSymptoms: (store, action) => {
            store.items = action.payload
        }
        
    }
})

export default symptoms