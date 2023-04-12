import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleErrors } from "../Game/utils";
import CreateGameButton from "./CreateGameButton";

const url = "https://react-labs.softbinator.com/game";

const Games = () => {
  const [games, setGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const accessToken = localStorage["accessToken"];
  const personalId = localStorage.getItem("id");

  const putPersonalGamesFirst = (gameA, gameB) => {
    if (gameA.player1Id === personalId) {
      return -1;
    } 
    if (gameB.player2Id === personalId) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    fetch(`${url}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((json) => json.games)
      .then((games) =>
        games.filter(
          (games) =>
            games.player1Id === personalId ||
            games.player2Id === personalId ||
            games.player2Id === null
        )
      )
      .then((games) => setGames(games.sort(putPersonalGamesFirst)) || console.log(games) || console.log(games.sort(putPersonalGamesFirst) ))
      .catch((error) => console.log(error) || setErrorMessage(error));
    setErrorMessage(null);
  }, []);

  return (
    <div>
      {errorMessage && <h1>{errorMessage}</h1>}
      <CreateGameButton navigate={navigate} setErrorMessage={setErrorMessage} />
      <h1 className="title"> Games</h1>
      <div style={{ display: "flex", flexDirection: "column", margin:"10px"}}>
        {games.map((game) => (
          <div className={game.id}>
            <h5 className="id">Joc ID: {game.id}</h5>
            <h5 className="status">Status joc: {game.status}</h5>
            <h5 className="player1 email"> Player 1 email: {game.player1.email}</h5>
            <h5 className="player1">Player 1 ID: {game.player1Id}</h5>
            {game.player2Id !== null && (
              <>
              <h5 className="player2 email"> Player 2 email: {game.player2.email}</h5>
              <h5 className="player2">Player 2 ID: {game.player2Id}</h5>
              </>
            )}
            <button
              className="gotobutton"
              onClick={() => navigate(game.id)}
    
            >
              To the game
            </button>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Games;
