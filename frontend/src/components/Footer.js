import React from "react"
import { useDispatch, useSelector, batch } from "react-redux"

import user from "../reducers/user"

import "./footer.css"

const Footer = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const dispatch = useDispatch()

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))

      localStorage.removeItem("user")
      localStorage.removeItem("symptoms")
    })
  }

  return (
    <>
      <footer>
        <div className="footer">
          <h5>Adress: Stockholm, Sweden</h5>

          <a href="mailto: vlad.jnbykov@gmail.com">
            <h5>Contact</h5>
          </a>
          {accessToken && (
            <button className="btn-logout" onClick={onButtonClick}>
              Logout
            </button>
          )}
        </div>
      </footer>
    </>
  )
}

export default Footer
