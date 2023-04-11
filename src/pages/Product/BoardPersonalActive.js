import React, { useEffect, useState } from "react";
import {handleErrors, boardLoadedWithMoves, convertIndexesToApi, convertIndexesFromApi} from './utils';
import BoardActive from "./BoardActive";

import { useParams } from "react-router-dom";
const url = "https://react-labs.softbinator.com/game"


const BoardPersonalActive = ({ moves }) => {
  const [board, setBoard] = useState(
    Array(10)
      .fill(0)
      .map((row) => new Array(10).fill(0))
  );
  const [placeOnGameTable, setPlaceOnGameTable] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  let { productId } = useParams();

  useEffect(() => {
    console.log("personal");
    setBoard(boardLoadedWithMoves(board, moves));
  }, []);

  const handleSendAttack = (e) => {
    e.preventDefault();
    console.log(placeOnGameTable, productId, "send attack to api");
    const accessToken = localStorage["accessToken"];

    fetch(`${url}/strike/${productId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(convertIndexesToApi(placeOnGameTable)),
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then(
        (json) =>
          setBoard(boardLoadedWithMoves(board, [json])) || setErrorMessage(null)
      )
      .catch(
        (error) =>
          console.log(error) ||
          setPlaceOnGameTable(null) ||
          setErrorMessage(error)
      );
  };

  return (
    <>
      {errorMessage && <h5>{errorMessage}</h5>}
      <div className="start-game">
        <BoardActive board={board} setPlaceOnGameTable={setPlaceOnGameTable} />
        {placeOnGameTable !== null && (
          <button onClick={handleSendAttack}>ATAC</button>
        )}
      </div>
    </>
  );
};

export default BoardPersonalActive;
