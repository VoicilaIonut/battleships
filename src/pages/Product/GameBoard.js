const GameBoard = ({board, setPlaceOnGameTable}) => {
    const rowhtml = (row, indexX) => row.map((value, indexY) => <Square indexX={indexX} indexY={indexY} value={value}setPlaceOnGameTable={setPlaceOnGameTable}/>);
    const boardhtml = board.map((row, indexX) => <div className='board-row'>{rowhtml(row, indexX)}</div>);
    // console.log(boardhtml);
    return (
      <div className='game'>
        {boardhtml}
      </div>
    )
  } 



  export default GameBoard;

  // const mutarePermisa = ([indexX, indexY], ships, selectedName, board) => {
//   const ship = ships.find((ship) => ship.name === selectedName);

//   if (!ship.vertical) {
//     console.log(
//       indexY + ship.length <= 9 &&
//         checkOtherShips(board, ship, indexX, indexY)
//     );
//     return (
//       indexY + ship.length <= 9 &&
//       checkOtherShips(board, ship, indexX, indexY)
//     );
//   }
//   console.log(
//     indexX + ship.length <= 9 && checkOtherShips(board, ship, indexX, indexY)
//   );
//   return (
//     indexX + ship.length <= 9 && checkOtherShips(board, ship, indexX, indexY)
//   );
// };

// const GameBoardConfigurator = ({board, setBoard, shipsPlaced, setShipsPlaced}) => {
//   const [selected, setSelected] = useState(null);
//   const [placeOnGameTable, setPlaceOnGameTable] = useState(null);
//   const [ships, setShip] = useState(AVAILABLE_SHIPS);

//   const handlePlaceShip = (e) => {
//     e.preventDefault();
//     console.log("PlaceShip", placeOnGameTable);
    
//     const ship = ships.find((ship) => ship.name === selected);
//     ship.placed = true;
//     const shipConfigation = {
//       ...convertIndexesToApi(placeOnGameTable),
//       size: ship.length,
//       direction: ship.vertical ? "VERTICAL" : "HORIZONTAL",
//     };
//     setShipsPlaced([...shipsPlaced, shipConfigation]);
//     setBoard(
//       createBoardWithShip(board, ship, shipsPlaced.length + 1, placeOnGameTable)
//     );
//     setSelected(null);
//   };

//   return (
//     <>
//       {/* <ChooseShips ships={ships} setSelected={setSelected} />
//       <br></br>
//       <button onClick={handleSendMapToApi}>send to api</button> <br></br>
//       {selected && placeOnGameTable && mutarePermisa(placeOnGameTable, ships) && (
//         <button onClick={handlePlaceShip}>PUNE</button>
//       )} */}
//     </>
//   );
// };


// const GameBoardSetter = (board, setBoard) => {
//   const [shipsPlaced, setShipsPlaced] = useState([]);
//   let { productId } = useParams();

//   const handleSendMapToApi = (e) => {
//     e.preventDefault();
//     console.log(shipsPlaced,"to api -");
//     const accessToken = localStorage["accessToken"];
//     fetch(`${url}/${productId}`, {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ships: shipsPlaced }),
//     })
//       .then((response) => response.json())
//       .then((json) => console.log(json)); //
//   };
//   return (
//     <>
//       {shipsPlaced.length === AVAILABLE_SHIPS.length && (<button onClick={handleSendMapToApi}>send to api</button>)}
//       <GameBoardConfigurator shipsPlaced={shipsPlaced} setShipsPlaced={setShipsPlaced}/>
//     </>
//   )
// }