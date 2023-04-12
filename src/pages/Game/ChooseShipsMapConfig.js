import React, { useState } from "react";
import {
    useParams,
  } from "react-router-dom";
import ChooseShipsConfigurator from "./ChooseShipsConfigurator";
import { AVAILABLE_SHIPS, shipConfigationForApi, handleErrors } from "./utils";

const url = "https://react-labs.softbinator.com/game";

const ChooseShipsMapConfig = () => {
  const [ships, setShips] = useState(JSON.parse(JSON.stringify(AVAILABLE_SHIPS)));
  const [message, setMessage] = useState(null);
  let { productId } = useParams();

  const handleSendMapToApi = (e) => {
    e.preventDefault();
    let shipsPlaced = ships.filter((ship) => ship.placed);
    shipsPlaced = shipsPlaced.map((ship) =>
      shipConfigationForApi([ship.x, ship.y], ship.length, ship.vertical)
    );
    console.log(shipsPlaced, "to api");

    const accessToken = localStorage["accessToken"];
    fetch(`${url}/${productId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ships: shipsPlaced }),
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((json) => setMessage("Configurarea a fost efectuata cu succes! Asteapta ca si celalalt player sa isi configureze harta"))
      .catch((error) => setShips(JSON.parse(JSON.stringify(AVAILABLE_SHIPS))) || setMessage(error));
  };

  return (
    <>
      {message !==null && <h5>{message}</h5>}
      <ChooseShipsConfigurator ships={ships} setShips={setShips} />
      <button onClick={handleSendMapToApi}>send to api</button>
    </>
  );
};

export default ChooseShipsMapConfig;
