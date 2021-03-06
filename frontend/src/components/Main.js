import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useHistory } from "react-router-dom"

import { checkboxes } from "../utils/checkboxes"
import Checkbox from "./Checkbox"

import Prognosis from "./Prognosis"

import { API_URL } from "../reusable/urls"
import { API_ML } from "../reusable/urls"

import symptoms from "../reducers/symptoms"

import "./main.css"

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const items = useSelector((store) => store.symptoms.items)
  const username = useSelector((store) => store.user.username)
  const role = useSelector((store) => store.user.role)
  
  const dispatch = useDispatch()
  const history = useHistory()

  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [checkedItems, setCheckedItems] = useState("")
  const [isSubmitted, setIsSubmited] = useState(false)
  let parameters = {}
  const risk = ""

  const isFormComplete = () => {
    if (age === "") {
      return false
    }
    if (gender === "") {
      return false
    }
    return true
  }

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    })
  }

  useEffect(() => {
    if (!accessToken) {
      history.push("/login")
    }
  }, [accessToken, history])

  useEffect(() => {
    // adding && role==='admin'
    if (accessToken && role === "admin") {
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken,
        },
      }

      fetch(API_URL("symptoms"), options)
        .then((res) => res.json())
        .then((data) => dispatch(symptoms.actions.setSymptoms(data)))
    }
  }, [accessToken, role, dispatch])

  useEffect(() => {
    // adding && role==='admin'
    if (accessToken && role === "admin") {
      //
      history.push("/symptoms")

      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken,
        },
      }

      fetch(API_URL("symptoms"), options)
        .then((res) => res.json())
        .then((data) => dispatch(symptoms.actions.setSymptoms(data)))
    }
  }, [accessToken, role, history, dispatch])

  const onFormSubmit = (e) => {
    e.preventDefault()
    
    dispatch(symptoms.actions.setLoading(true))

    const options = {
      // POST
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        age,
        gender,
        risk,
        items,
        checkedItems,
        parameters,
      }),
    }

    fetch(API_URL("symptoms"), options)
      .then((res) => res.json())
      .then((data) => {
        parameters = {
          age: data.age,
          gender: data.gender === "male" ? 1 : 0,

          polyuria:
            data.checkedItems.polyuria === undefined
              ? 0
              : Number(data.checkedItems.polyuria),
          polydipsia:
            data.checkedItems.polydipsia === undefined
              ? 0
              : Number(data.checkedItems.polydipsia),
          weakness:
            data.checkedItems.weakness === undefined
              ? 0
              : Number(data.checkedItems.weakness),
          genital_thrush:
            data.checkedItems.genital_thrush === undefined
              ? 0
              : Number(data.checkedItems.genital_thrush),
          itching:
            data.checkedItems.itching === undefined
              ? 0
              : Number(data.checkedItems.itching),
          irritability:
            data.checkedItems.irritability === undefined
              ? 0
              : Number(data.checkedItems.irritability),
          delayed_healing:
            data.checkedItems.delayed_healing === undefined
              ? 0
              : Number(data.checkedItems.delayed_healing),
          alopecia:
            data.checkedItems.alopecia === undefined
              ? 0
              : Number(data.checkedItems.alopecia),
          obesity:
            data.checkedItems.obesity === undefined
              ? 0
              : Number(data.checkedItems.obesity),
        }

        // ML fetch inside of first fetch
        const options1 = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parameters),
        }

        fetch(API_ML, options1)
          .then((res) => res.json())
          .then((ml_data) => {
            const risk = Object.entries(ml_data)[0][1]

            dispatch(symptoms.actions.setRisk(Math.round(risk)))
          })

        batch(() => {
          dispatch(symptoms.actions.setAge(data.age))
          dispatch(symptoms.actions.setGender(data.gender))
          dispatch(symptoms.actions.setCheckedItems(data.checkedItems))
          dispatch(symptoms.actions.setErrors(null))
          dispatch(symptoms.actions.setParameters(parameters))
          dispatch(symptoms.actions.setId(data._id))
          dispatch(symptoms.actions.setLoading(true))
        })

        setIsSubmited(true)
      })
  }
  if (isSubmitted === false) {
    return (
      <div>
        <form className="main" onSubmit={onFormSubmit}>
          <h3 className="main-title">
            Welcome to diabetes risk estimation test
          </h3>
          <div>
            <h4>input your age</h4>
            <input
              className="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="gender-title">
            <h4>gender:</h4>

            <input
              className="gender"
              type="radio"
              id="male"
              name="gender"
              value={gender}
              onChange={() => setGender("male")}
            />
            <label htmlFor="male">male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value={gender}
              onChange={() => setGender("female")}
            />
            <label htmlFor="female">female</label>
          </div>

          <h4>check if you suffer from:</h4>

          <div className="checkboxes">
            {checkboxes.map((item) => (
              <label key={item.key}>
                {item.label}
                <Checkbox
                  name={item.name}
                  checked={checkedItems[item.name]}
                  onChange={handleChange}
                />
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="form-submit-btn"
            disabled={!isFormComplete()}
          >
            Submit
          </button>
        </form>
      </div>
    )
  } else {
    return (
      <>
        <Prognosis />
      </>
    )
  }
}

export default Main
