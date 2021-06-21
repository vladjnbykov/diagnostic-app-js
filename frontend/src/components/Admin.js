import React, { useEffect } from "react"

import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import "./admin.css"
import "./prognosis.css"

const Admin = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const listItems = useSelector((store) => store.symptoms.items)

  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push("/login")
    }
  }, [accessToken, history])

  return (
    <div>
      <h2 className="patient-title">Patients</h2>

      {listItems.map((item) => (
        <div className="patients" key={item._id}>
          <div>username: {item.username}</div>
          <div>age: {item.age}</div>
          <div>gender: {item.gender}</div>
          <div>risk of diabetes: {item.risk}%</div>
        </div>
      ))}
      <h2 className="patient-placeholder">PLACEHOLDER</h2>
    </div>
  )
}

export default Admin
