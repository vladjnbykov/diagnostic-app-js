import { createSlice } from "@reduxjs/toolkit";

const symptoms = createSlice({
  name: "symptoms",
  initialState: {
    age: null,
    gender: null,
    loading: false,
    checkedItems: {}
    
  },

  reducers: {
    setAge: (store, action) => {
      store.age = action.payload;
    },
    setGender: (store, action) => {
      store.gender = action.payload;
    },
    setCheckedItems: (store, action) => {
      store.checkedItems = action.payload;
    },
    setSymptoms: (store, action) => {
      store.items = action.payload;
    },

    setParameters: (store, action) => {
      store.parameters = action.payload;
    },

    setRisk: (store, action) => {
      store.risk = action.payload;
    },

    

    setErrors: (store, action) => {
      store.errors = action.payload;
    },

    setLoading: (store, action) => {
      store.loading = action.payload
    }

    
  }
});

export default symptoms;
