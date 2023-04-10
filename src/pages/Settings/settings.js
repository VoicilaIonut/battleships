import React, { useState, useEffect } from "react";


const url = "https://react-labs.softbinator.com/user/details/me";

const Settings = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const accessToken = localStorage["accessToken"];
    fetch(`${url}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <>
      <h1 className="title">Settings pages</h1>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};
export default Settings;
