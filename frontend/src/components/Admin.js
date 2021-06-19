import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./admin.css";
import "./prognosis.css";

const Admin = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const listItems = useSelector((store) => store.symptoms.items);

  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, [accessToken, history]);

  return (
    <div>
      <h2 className="patient-title">Patients</h2>
      {console.log("list", listItems)}
      {console.log("individ", Object.entries(listItems[0].checkedItems))}

      {listItems.map((item) => (
        <div className="patients" key={item._id}>
          <div>username: {item.username}</div>
          <div>age: {item.age}</div>
          <div>gender: {item.gender}</div>

          <div>
            noted:{" "}
            {Object.entries(item.checkedItems).map((item) => (
              <div>{item}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
