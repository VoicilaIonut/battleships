import {
  useParams,
  // useNavigate,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import JoinGameButton from "./JoinGameButton";
import BoardPersonalActive from "./BoardPersonalActive";
import SquareInactive from "./SquareInactive";
import SquareActive from "./SquareActive";
import BoardAdversar from "./BoardAdversar";
import BoardActive from "./BoardActive";
import {
  AVAILABLE_SHIPS,
  handleErrors,
  boardLoadedWithMoves,
  createEmptyBoard,
  convertIndexesToApi,
  convertIndexesFromApi,
  shipConfigationForApi,
  createBoardWithShip,
  mutarePermisa,
} from "./utils";
// import { Routes } from "../../utils/routes-definition";

const url = "https://react-labs.softbinator.com/game";

export const loader = async ({ params }) => {
  const accessToken = localStorage["accessToken"];
  const res = await fetch(`${url}/${params.productId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }

  return await res.json();
};


function ShipActive({ ship, setSelected }) {
  const [vertical, setVertical] = useState(ship.vertical);

  const handleSwitchButton = (e) => {
    e.preventDefault();
    ship.vertical = !vertical;
    setVertical(!vertical);
  };

  const handleSelectButton = (e) => {
    e.preventDefault();
    console.log(ship.name);
    setSelected(ship.name);
  };

  return (
    <>
      <h5>Nume: {ship.name}</h5>
      <h5>Lungime: {ship.length}</h5>
      {/* <h5>Folosita: {ship.placed ? "da" : "nu"}</h5> */}
      <h5>Orientare: {ship.vertical ? "vertical" : "orizontal"}</h5>
      <button onClick={handleSwitchButton}>Press to switch orientation</button>
      <br></br>
      <button onClick={handleSelectButton}> Press to place</button>
    </>
  );
}

function ListShips({ ships, setSelected }) {
  return (
    <>
      <div className="available-ships">
        {ships.map(
          (ship) => !ship.placed && <ShipActive ship={ship} setSelected={setSelected} />
        )}
      </div>
    </>
  );
}

const ChooseShipsConfigurator = ({ ships, setShips}) => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [selected, setSelected] = useState(null);
  const [placeOnGameTable, setPlaceOnGameTable] = useState(null);
  // let ships = AVAILABLE_SHIPS;

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
      createBoardWithShip(board, shipCopie, shipsCopie.indexOf(shipCopie) + 1, placeOnGameTable)
    );
    setSelected(null);
    console.log(ships);
  };

  const handleRestartConfigurator = (e) => {
    e.preventDefault();
    setBoard(createEmptyBoard());
    setSelected(null);
    setPlaceOnGameTable(null);
    setShips(AVAILABLE_SHIPS);
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

const ChooseShipsMapConfig = () => {
  const [ships, setShips] = useState(AVAILABLE_SHIPS);
  const [message, setMessage] = useState(null);
  let { productId } = useParams();

  const handleSendMapToApi = (e) => {
    e.preventDefault();
    let shipsPlaced = ships.filter(ship => ship.placed);
    shipsPlaced = shipsPlaced.map(ship => shipConfigationForApi([ship.x, ship.y], ship.length, ship.vertical));
    console.log(
      shipsPlaced,
      "to api ----------------------------------------------------------------"
    );
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
      .then((json) => console.log(json) || setMessage('Configurarea a fost efectuata cu succes!'))
      .catch(
        (error) =>
          console.log(error) || setShips(AVAILABLE_SHIPS) || setMessage(error)
      );
  };

  return (
    <>
      {message && <h5>{message}</h5>}
      <ChooseShipsConfigurator
        ships={ships}
        setShips={setShips}
      />
      <button onClick={handleSendMapToApi}>send to api</button>
    </>
  );
};

// const BoardInactive = ({board}) => {
//   const generateRow = (row) => row.map((value) => (<SquareInactive value={value}/>));
//   const generate2DBoard = board.map((row) => <div className='board-row'>{generateRow(row)}</div>);
//   return (
//     <div className='game'>
//       {generate2DBoard}
//     </div>
//   )
// }

// const BoardActive = ({board, setPlaceOnGameTable}) => {
//   const generateRow = (row, indexX) => row.map((value, indexY) => <SquareActive indexX={indexX} indexY={indexY} value={value} setPlaceOnGameTable={setPlaceOnGameTable}/>);
//   const generate2DBoard = board.map((row, indexX) => <div className='board-row'>{generateRow(row, indexX)}</div>);
//   return (
//     <div className='game'>
//       {generate2DBoard}
//     </div>
//   )
// }

// const boardLoadedWithMoves = (board, moves) => {
//   console.log("Board load games moves", moves);
//   let copie = board.slice();
//   for (const move of moves) {
//     let [indexX, indexY] = convertIndexesFromApi(move.x, move.y)
//     copie[indexX][indexY] = move.result ? 'Y' : 'N';
//     console.log(indexX, indexY);
//   }
//   return copie;
// }

// const BoardAdversar = ({moves}) => {
//   const [board, setBoard] = useState(Array(10).fill(0).map(row => new Array(10).fill(0)));

//   useEffect(()=> {
//     setBoard(boardLoadedWithMoves(board, moves));
//   }, [])

//   return (
//     <div className='start-game'>
//       <BoardInactive board={board}/>
//       </div>
//   )
// }

// async function handleErrors(response) {
//   if (!response.ok) {
//       const json = await response.json();
//       throw json.message;
//   }
//   return response;
// }

// const BoardPersonalActive = ({moves}) => {
//   const [board, setBoard] = useState(Array(10).fill(0).map(row => new Array(10).fill(0)));
//   const [placeOnGameTable, setPlaceOnGameTable] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);
//   let { productId } = useParams();

//   useEffect(()=> {
//     console.log('personal');
//     setBoard(boardLoadedWithMoves(board, moves));
//   }, [])

//   const handleSendAttack = (e) => {
//     e.preventDefault();
//     console.log(placeOnGameTable, productId, "send attack to api");
//     const accessToken = localStorage["accessToken"];

//     fetch(`${url}/strike/${productId}`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json",},
//       body: JSON.stringify(convertIndexesToApi(placeOnGameTable))
//     }).then(handleErrors)
//       .then((response) => response.json())
//       .then((json) => setBoard(boardLoadedWithMoves(board, [json])) || setErrorMessage(null) )
//       .catch(error => console.log(error) || setPlaceOnGameTable(null) || setErrorMessage(error));

//   }

//   return (
//     <>
//       {errorMessage && (<h5 color="red">{errorMessage}</h5>)}
//       <div className='start-game'>
//         <BoardActive board={board} setPlaceOnGameTable={setPlaceOnGameTable}/>
//         {placeOnGameTable !== null && (<button onClick={handleSendAttack}>ATAC</button>)}
//       </div>
//     </>
//   )
// }

// const JoinGameButton = ({productId}) => {
//   const handleJoinGame = (e) => {
//     e.preventDefault();
//     const accessToken = localStorage["accessToken"];
//     fetch(`${url}/join/${productId}`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${accessToken}` },
//       body: JSON.stringify({id: productId})
//     }).then((response) => response.json())
//       .then((json) => console.log(json)); // redirect to game
//   }
//   return (
//     <button onClick={handleJoinGame}> Join the game </button>
//   )
// }

const Product = () => {
  // const params = useParams();
  // const navigate = useNavigate();
  const gameState = useLoaderData();
  const navigationState = useNavigation();
  let { productId } = useParams();

  if (navigationState.state === "loading") {
    return <h1 className="title">Loading....</h1>;
  }

  const createGameDetails = (game) => (
    <div className="game">
      <h1>Id joc: {game.id}</h1>
      <h5>Status {game.status}</h5>
      <h5>Player 1 {game.player1Id}</h5>
      <h5>Player 2 {game.player2Id}</h5>
      <h5>Play care trebuie sa atace: {game.playerToMoveId}</h5>
      {gameState.status === "CREATED" &&
        gameState.player1Id !== localStorage.getItem("id") && (
          <JoinGameButton productId={productId} />
        )}
      {gameState.status === "MAP_CONFIG" && <ChooseShipsMapConfig />}

      {game.status === "ACTIVE" && (
        <>
          <BoardPersonalActive
            moves={game.moves.filter(
              (move) => move.playerId === localStorage.getItem("id")
            )}
          />
          <BoardAdversar
            moves={game.moves.filter(
              (move) => move.playerId !== localStorage.getItem("id")
            )}
          />
        </>
      )}
    </div>
  );

  return (
    <>
      <div>{createGameDetails(gameState)}</div>
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
