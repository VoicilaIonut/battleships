import React, { useState } from "react";
import ListShips from "./ListShips";
import BoardActive from "./BoardActive";
import {
  AVAILABLE_SHIPS,
  createEmptyBoard,
  createBoardWithShip,
  mutarePermisa,
} from "./utils";

const ChooseShipsConfigurator = ({ ships, setShips }) => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [selected, setSelected] = useState(null);
  const [placeOnGameTable, setPlaceOnGameTable] = useState(null);

  const handlePlaceShip = (e) => {
    e.preventDefault();
    console.log("PlaceShip", placeOnGameTable);
    const shipsCopie = ships.slice();
    const shipCopie = shipsCopie.find((ship) => ship.name === selected);
    shipCopie.placed = true;
    shipCopie.x = placeOnGameTable[0];
    shipCopie.y = placeOnGameTable[1];
    setShips(shipsCopie);
    setBoard(
      createBoardWithShip(
        board,
        shipCopie,
        shipsCopie.indexOf(shipCopie) + 1,
        placeOnGameTable
      )
    );
    setSelected(null);
    console.log(ships);
  };

  const handleRestartConfigurator = (e) => {
    e.preventDefault();
    console.log(AVAILABLE_SHIPS, ships);
    setShips(JSON.parse(JSON.stringify(AVAILABLE_SHIPS)));
    setBoard(createEmptyBoard());
    setSelected(null);
    setPlaceOnGameTable(null);
  };

  return (
    <div className="start-game">
      <BoardActive board={board} setPlaceOnGameTable={setPlaceOnGameTable} />
      {mutarePermisa(board, ships, selected, placeOnGameTable) && (
        <button onClick={handlePlaceShip}>PUNE</button>
      )}
      <ListShips ships={ships} setSelected={setSelected} />
      <button onClick={handleRestartConfigurator}>Restart</button>
    </div>
  );
};

export default ChooseShipsConfigurator;
