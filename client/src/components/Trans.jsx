import React, { useEffect, useState } from "react";
import axios from "axios";

const Trans = () => {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user-details")
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {userDetails.map((value, key) => {
        return <div key={key}>{value.accounttype}</div>;
      })}
    </div>
  );
};

export default Trans;
