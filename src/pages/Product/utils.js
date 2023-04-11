import React from "react";

async function handleErrors(response) {
  if (!response.ok) {
    const json = await response.json();
    throw json.message;
  }
  return response;
}

const boardLoadedWithMoves = (board, moves) => {
  console.log("Board load games moves", moves);
  let copie = board.slice();
  for (const move of moves) {
    let [indexX, indexY] = convertIndexesFromApi(move.x, move.y);
    copie[indexX][indexY] = move.result ? "Y" : "N";
    console.log(indexX, indexY);
  }
  return copie;
};

// same as below ;)
function convertIndexesToApi([indexX, indexY]) {
  return { x: String.fromCharCode(65 + indexY), y: indexX + 1 };
}

// weird behavior but works well with my js knowledge :))
function convertIndexesFromApi(x, y) {
  return [y - 1, x.charCodeAt() - 65];
}

const shipConfigationForApi = (placeOnGameTable, shipLength, shipVertical) => {
  return {
    ...convertIndexesToApi(placeOnGameTable),
    size: shipLength,
    direction: shipVertical ? "VERTICAL" : "HORIZONTAL",
  };
};

const createEmptyBoard = () =>
  Array(10)
    .fill(0)
    .map((row) => new Array(10).fill(0));


// check also is selected and placeOnGameTable is a valid input (aka not null)
const mutarePermisa = (board, ships, selected, placeOnGameTable) => {
    if (selected === null) {
        return false;
    }
    if (!placeOnGameTable) {
        return false;
    }        
    const indexX = placeOnGameTable[0], indexY = placeOnGameTable[1];
    const ship = ships.find((ship) => ship.name === selected);

  if (!ship.vertical) {
    console.log(
      indexY + ship.length <= 9 && checkOtherShips(board, ship, indexX, indexY)
    );
    return (
      indexY + ship.length <= 9 && checkOtherShips(board, ship, indexX, indexY)
    );
  }
  return (
    indexX + ship.length <= 9 && checkOtherShips(board, ship, indexX, indexY)
  );
};

const createBoardWithShip = (board, ship, value, [indexX, indexY]) => {
    let copie = board.slice();
    if (ship.vertical) {
      for (let i = indexX; i < indexX + ship.length; i++) {
        copie[i][indexY] = value;
      }
    } else {
      for (let i = indexY; i < indexY + ship.length; i++) {
        copie[indexX][i] = value;
      }
    }
    console.log(copie);
    return copie;
  };
  
  const checkOtherShips = (board, ship, indexX, indexY) => {
    if (ship.vertical) {
      for (let i = indexX; i < indexX + ship.length; i++) {
        if (board[i][indexY] !== 0) {
          return false;
        }
      }
    } else {
      for (let i = indexY; i < indexY + ship.length; i++) {
        if (board[indexX][i] !== 0) {
          return false;
        }
      }
    }
    return true;
  };


const AVAILABLE_SHIPS = [
  {
    name: "carrier",
    length: 6,
    placed: null,
    vertical: true,
    x:null,
    y:null,
  },
  {
    name: "battleship",
    length: 4,
    placed: null,
    vertical: false,
    x:null,
    y:null,
  },
  {
    name: "battleship1",
    length: 4,
    placed: null,
    vertical: false,
    x:null,
    y:null,
  },
  {
    name: "submarine",
    length: 3,
    placed: null,
    vertical: false,
    x:null,
    y:null,
},
  {
    name: "submarine1",
    length: 3,
    placed: null,
    vertical: false,
    x:null,
    y:null,
  },
  {
    name: "submarine2",
    length: 3,
    placed: null,
    vertical: false,
    x:null,
    y:null,
  },
  {
    name: "destroyer",
    length: 2,
    placed: null,
    vertical: false,
    x:null,
    y:null,
  },
  {
    name: "destroyer1",
    length: 2,
    placed: null,
    vertical: false,
    x:null,
    y:null,
  },
  {
    name: "destroyer2",
    length: 2,
    placed: null,
    vertical: false,
    x:null,
    y:null,
  },
  {
    name: "destroyer3",
    length: 2,
    placed: null,
    vertical: false,
    x:null,
    y:null,
  },
]

export {
  AVAILABLE_SHIPS,
  createEmptyBoard,
  checkOtherShips, 
  mutarePermisa,
  createBoardWithShip,
  shipConfigationForApi,
  handleErrors,
  boardLoadedWithMoves,
  convertIndexesFromApi,
  convertIndexesToApi,
};
