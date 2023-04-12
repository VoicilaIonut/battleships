import { useParams, useLoaderData, useNavigation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import JoinGameButton from "./JoinGameButton";
import BoardPersonalActive from "./BoardPersonalActive";
import BoardAdversar from "./BoardAdversar";
import {
  boardLoadedWithMoves,
  createEmptyBoard,
  boardLoadedWithShips,
  checkWinnerWithMoves,
} from "./utils";
import BoardInactive from "./BoardInactive";
import ChooseShipsMapConfig from "./ChooseShipsMapConfig";

const url = "https://react-labs.softbinator.com/game";

export const loaderGame = async ({ params }) => {
  const accessToken = localStorage["accessToken"];
  const res = await fetch(`${url}/${params.productId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }

  return await res.json();
};

const Game = () => {
  const [gameState, setGameState] = useState(useLoaderData());
  const navigationState = useNavigation();
  let { productId } = useParams();
  let params = useParams();
  const personalId = localStorage.getItem("id");

  if (navigationState.state === "loading") {
    return <h1 className="title">Loading....</h1>;
  }

  useEffect(() => {
    let interval = setInterval(async () => {
      const newGameState = await loaderGame({ params });
      if (JSON.stringify(newGameState) !== JSON.stringify(gameState)) {
        console.log("Change game state.");
        setGameState(newGameState);
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [gameState]);

  const movesPlayer1 = gameState.moves.filter(
    (move) => move.playerId === gameState.player1Id
  );
  const movesPlayer2 = gameState.moves.filter(
    (move) => move.playerId === gameState.player2Id
  );

  return (
    <div className="game">
      <h1>Id joc: {gameState.id}</h1>
      <h5>Status {gameState.status}</h5>
      <h5>Player 1 {gameState.player1Id}</h5>
      {gameState.player2Id !== null && <h5>Player 2 {gameState.player2Id}</h5>}
      {gameState.status === "ACTIVE" && (
        <h5>PlayerID care trebuie sa mute: {gameState.playerToMoveId}</h5>
      )}
      {gameState.status === "CREATED" &&
        gameState.player1Id !== localStorage.getItem("id") &&
        gameState.player2Id === null && (
          <JoinGameButton productId={productId} />
        )}
      {gameState.status === "MAP_CONFIG" &&
        gameState.shipsCoord.length === 0 && <ChooseShipsMapConfig />}
      {gameState.status === "MAP_CONFIG" &&
        gameState.shipsCoord.length !== 0 && (
          <BoardInactive board={boardLoadedWithShips(gameState.shipsCoord)} />
        )}
      {gameState.status === "ACTIVE" && gameState.player1Id === personalId && (
        <>
          <BoardPersonalActive moves={movesPlayer1} />
          <BoardAdversar
            moves={movesPlayer2}
            shipsCoord={gameState.shipsCoord}
          />
        </>
      )}
      {gameState.status === "ACTIVE" && gameState.player2Id === personalId && (
        <>
          <BoardPersonalActive moves={movesPlayer2} />
          <BoardAdversar
            moves={movesPlayer1}
            shipsCoord={gameState.shipsCoord}
          />
        </>
      )}
      {gameState.status === "FINISHED" && (
        <>
          <h1>
            WINNER:{" "}
            {checkWinnerWithMoves(movesPlayer1, gameState.shipsCoord.length)
              ? gameState.player1Id
              : gameState.player2Id}
          </h1>
          <div className="start-game">
            <BoardInactive
              board={boardLoadedWithMoves(createEmptyBoard(), movesPlayer1)}
            />
            <BoardInactive
              board={boardLoadedWithMoves(createEmptyBoard(), movesPlayer2)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
