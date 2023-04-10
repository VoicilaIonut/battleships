import React, { useState, useEffect } from "react";
import { Routes } from "../../utils/routes-definition";
import { Outlet, Link } from "react-router-dom";

import { Product } from "../../components";

import { useNavigate } from "react-router-dom";

const url = "https://react-labs.softbinator.com/game";


const CreateGameButton = () => {

  const handleCreateGame = (e) => {
    e.preventDefault();
    const accessToken = localStorage["accessToken"];
    fetch(`${url}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((response) => response.json())
      .then((json) => console.log(json)); // redirect to game
  }

  return (
    <>
    <button type="button" onClick={handleCreateGame}>Create new game</button>
    </>
  )
}

const Products = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage["accessToken"];
    fetch(`${url}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((json) =>
        json.games.map((game) => (
          <div className={game.id}>
            <h5 className="id">id joc {game.id}</h5>
            <h5 className="status">status {game.status}</h5>
            <h5 className="player1">player 1{game.player1Id}</h5>
            <h5 className="player2">player 2{game.player2Id}</h5>
            <button className="gotobutton"
              onClick={() => navigate(game.id)}
              style={{ display: "block", marginTop: "70px" }}
            >
              To the game
            </button>
          </div>
        ))
      )
      .then((dataHtml) => setData(dataHtml));
  }, []);

  // console.log(data);

  return (
    <div>
      <CreateGameButton/>
      <h1 className="title"> Products</h1>
      <div style={{ display: "flex", marginBottom: "100px" }}>
        {data}
      </div>
      <Outlet />
  </div>
  );
};

export default Products;
