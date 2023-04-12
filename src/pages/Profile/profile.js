import React, { useState, useEffect } from "react";
import { handleErrors } from "../Game/utils";

const url = "https://react-labs.softbinator.com/user/details/me";

const Profile = () => {
  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const accessToken = localStorage["accessToken"];
    fetch(`${url}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then(
        (json) => setData(json) || localStorage.setItem("id", json.user.id)
      )
      .catch((error) => console.log(error) || setErrorMessage(error));
  }, []);

  return (
    <>
      <h1 className="title">Profilul vostru</h1>
      {errorMessage && <h1>{errorMessage}</h1>}
      {data && (
        <>
          <h5> ID user: {data.user.id} </h5>
          <h5> Email: {data.user.email} </h5>
          <h5> Jocuri jucate {data.gamesPlayed} </h5>
          <h5> Jocuri pierdute {data.gamesLost} </h5>
          <h5> Jocuri castigate {data.gamesWon} </h5>
          <h5>
            {" "}
            Jocuri in care sunteti inscris: {data.currentlyGamesPlaying}{" "}
          </h5>
        </>
      )}
    </>
  );
};
export default Profile;
