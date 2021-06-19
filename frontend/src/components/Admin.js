import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
      SYMPTOMS
      {console.log("list", listItems)}
      {console.log("individ", Object.entries(listItems[0].checkedItems))}

      {listItems.map((item) => (
        <div className="patients" key={item._id}>
          {item.username}
          {item.age}
          {item.gender}


          
          {Object.entries(item.checkedItems).map(item => Object.values(String(item) ))}
            
            


        </div>
      ))}

    </div>
  );
};

export default Admin;

{/*
{Object.entries(item.checkedItems).map(item => item)}
*/}