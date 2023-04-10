import {
  useParams,
  // useNavigate,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import React, {useEffect, useState} from 'react';
// import { Routes } from "../../utils/routes-definition";


const url = "https://react-labs.softbinator.com/game"


export const loader = async ({ params }) => {
  const accessToken = localStorage["accessToken"];
  const res = await fetch(`${url}/${params.productId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return await res.json();
};


function Square({indexX, indexY, value, setPlaceOnGameTable}) {
  return (
    <>
    <button className="square" onClick={() => setPlaceOnGameTable([indexX, indexY])}
    > {value}</button>
    </>
  );
}



// function GenerateShip({ship}) {
//   console.log(ship);
//   return (
//     <>
//       <h5>Nume: {ship.name}</h5>
//       <h5>Lungime: {ship.length}</h5>
//       <h5>Folosita: {ship.placed ? "da" : "nu"}</h5>
//       <h5>Orientare: {ship.vertical ? "vertical" : "orizontal"}</h5>
//     </>
//   )
// }

function Ship({ship, setSelected}) {
  const [vertical, setVertical] = useState(false);

  const handleSwitchButton = (e) => {
    e.preventDefault();
    ship.vertical = !vertical;
    setVertical(!vertical);
  }

  const handleSelectButton = (e) => {
    e.preventDefault();
    console.log(ship.name);
    setSelected(ship.name);
  }

  return (
    <>
      <h5>Nume: {ship.name}</h5>
      <h5>Lungime: {ship.length}</h5>
      <h5>Folosita: {ship.placed ? "da" : "nu"}</h5>
      <h5>Orientare: {ship.vertical ? "vertical" : "orizontal"}</h5>
      {/* <button onClick={handleSwitchButton}> Press to switch orientation</button> <br></br> */}
      {!ship.placed && (
        <>
          <button onClick={handleSwitchButton}> Press to switch orientation</button>
          <br></br>
          <button onClick={handleSelectButton}> Press to place</button>
        </>
        )
      }
    </>
  )


}


function ChooseShips({ships, setSelected}) {

  return (
    <div className="available ships">
      {ships.map((ship) => !ship.placed && (<Ship ship={ship} setSelected={setSelected}/>))}
    </div>
  )
}


// const board = Array(10).fill(0).map(row => new Array(10).fill(0))
const Game = ({board, setPlaceOnGameTable}) => {
  const rowhtml = (row, indexX) => row.map((value, indexY) => <Square indexX={indexX} indexY={indexY} value={value}setPlaceOnGameTable={setPlaceOnGameTable}/>);
  const boardhtml = board.map((row, indexX) => <div className='board-row'>{rowhtml(row, indexX)}</div>);
  // console.log(boardhtml);
  return (
    <div className='game'>
      {boardhtml}
    </div>
  )
} 


const AVAILABLE_SHIPS = [
  {
    name: 'carrier',
    length: 6,
    placed: null,
    vertical: true,
  },
  {
    name: 'battleship',
    length: 4,
    placed: null,
    vertical: false,
  },
  {
    name: 'battleship1',
    length: 4,
    placed: null,
    vertical: false,
  },
  {
    name: 'submarine',
    length: 3,
    placed: null,
    vertical: false,
  },
  {
    name: 'submarine1',
    length: 3,
    placed: null,
    vertical: false,
  },
  {
    name: 'submarine2',
    length: 3,
    placed: null,
    vertical: false,
  },
  {
    name: 'destroyer',
    length: 2,
    placed: null,
    vertical: false,
  },
  {
    name: 'destroyer1',
    length: 2,
    placed: null,
    vertical: false,
  },
  {
    name: 'destroyer2',
    length: 2,
    placed: null,
    vertical: false,
  },
  {
    name: 'destroyer3',
    length: 2,
    placed: null,
    vertical: false,
  },
];



const createBoardWithShip = (board, ship, indexX, indexY, value) => {
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
}

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
}

const StartGame = ({gameStatus}) => {
  const [selected, setSelected] = useState(null);
  const [placeOnGameTable, setPlaceOnGameTable] = useState(null);
  const [board, setBoard] = useState(Array(10).fill(0).map(row => new Array(10).fill(0)));
  const [ships, setShip] = useState(AVAILABLE_SHIPS);
  const [shipsPlaced, setShipsPlaced] = useState([]);
  let { productId } = useParams();
  console.log(selected, "hei from parent");
  console.log(placeOnGameTable, 'hei from parent');

  const mutarePermisa = ([indexX, indexY]) => {
      const ship = ships.find(ship => ship.name === selected);
      
      if (!ship.vertical) {
        console.log((indexY + ship.length) <= 9 && checkOtherShips(board, ship, indexX, indexY));
        return (indexY + ship.length) <= 9 && checkOtherShips(board, ship, indexX, indexY);
      } 
      console.log((indexX + ship.length) <= 9 && checkOtherShips(board, ship, indexX, indexY))
      return (indexX + ship.length) <= 9 && checkOtherShips(board, ship, indexX, indexY);
  }

  const handlePlaceShip = (e) => {
    e.preventDefault();
    console.log('PlaceShip', placeOnGameTable);
    const ship = ships.find(ship => ship.name === selected);
    const indexX = placeOnGameTable[0];
    const indexY = placeOnGameTable[1];
    ship.placed=true

    const shipConfigation = {
      "x": String.fromCharCode(65 + indexY + 1),
      "y": indexX + 1,
      "size": ship.length,
      "direction": (ship.vertical ? "VERTICAL" : "HORIZONTAL")
    } 
    console.log(shipConfigation);
    setShipsPlaced([...shipsPlaced, shipConfigation]);
    console.log(shipsPlaced, 'heeeeeeeeeeeeere');
    setBoard(createBoardWithShip(board, ship, indexX, indexY, shipsPlaced.length + 1));
    setSelected(null);
  }

  const handleSendMapToApi = (e) => {
    e.preventDefault();
    console.log(shipsPlaced, 'to api ----------------------------------------------------------------');
    const accessToken = localStorage["accessToken"];
    fetch(`${url}/${productId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json",},
      body: JSON.stringify({'ships':shipsPlaced})
    }).then((response) => response.json())
      .then((json) => console.log(json)); // 
  }

  const handleSendAttack = (e) => {
    e.preventDefault();
    console.log(placeOnGameTable);
  }
  console.log(gameStatus);
  return (
    <>
      <div className='start-game'>
        <Game board={board} setPlaceOnGameTable={setPlaceOnGameTable}/>
        {gameStatus==="MAP_CONFIG" && (
          <>
          <ChooseShips ships={ships} setSelected={setSelected}/><br></br>
          <button onClick={handleSendMapToApi}>send to api</button> <br></br>
          {selected && placeOnGameTable && mutarePermisa(placeOnGameTable) && (<button onClick={handlePlaceShip}>PUNE</button>)}
          </>
        )}
        {gameStatus==="ACTIVE" && (
            <>
              <button onClick={handleSendAttack}>ATAC</button>
            </>
        )}
      </div>
    </>
  )
}

const Product = () => {
  let { productId } = useParams();
  // const params = useParams();
  // const navigate = useNavigate();
  const data = useLoaderData();
  const navigationState = useNavigation();

  if (navigationState.state === "loading") {
    return <h1 className="title">Loading....</h1>;
  }

  const createDataHtml = (game) => (
    <div className="game">
        <h1>Id joc: {game.id}</h1>
        <h5>Status {game.status}</h5>
        <h5>Player 1 {game.player1Id}</h5>
        <h5>Player 2 {game.player2Id}</h5>
        <h5>Play care trebuie sa atace: {game.playerToMoveId}</h5>
        <StartGame gameStatus={game.status}/>
        {/* {game.status === 'ACTIVE' && (<StartGame/>)} */}
    </div>
  )

  const handleJoinGame = (e) => {
    e.preventDefault();
    const accessToken = localStorage["accessToken"];
    fetch(`${url}/join/${productId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({id: productId})
    }).then((response) => response.json())
      .then((json) => console.log(json)); // redirect to game
  }
  console.log(data, "product");
  return (
    <>
      <h1>works</h1>
      <button onClick={handleJoinGame}> Join the game </button>
      <div>
        {createDataHtml(data)}
      </div>
    </>
    // <div style={{ border: "1px solid grey" }}>
    //   <h2 className="title" style={{ marginTop: 0 }}>
    //     Product wtkfk? {params.productId}
    //   </h2>
      
    //   <button
    //     onClick={() => navigate(Routes.ProductsRoute)}
    //     style={{ display: "block", marginTop: "70px" }}
    //   >
    //     Navigate back to products page
    //   </button>
    // </div>
  );
};

export default Product;
