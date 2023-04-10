// import logo from './logo.svg';
import './App.css';
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import React from 'react';

// const AVAILABLE_SHIPS = [
//   {
//     name: 'carrier',
//     length: 6,
//     placed: null,
//     vertical: true,
//   },
//   {
//     name: 'battleship',
//     length: 4,
//     placed: null,
//     vertical: false,
//   },
//   {
//     name: 'submarine',
//     length: 3,
//     placed: null,
//     vertical: false,
//   },
//   {
//     name: 'destroyer',
//     length: 2,
//     placed: null,
//     vertical: false,
//   },
// ];

// const ChooseShips = () => {
//   const generateShip = (length) => Array(length).fill(0).map(()=> <Square></Square>)
//   const shipshtml = AVAILABLE_SHIPS.map((ship) => {
//     return (
//       <div className='ship'>
//         <h4 className='ship-name'>{ship.name}</h4>
//         {ship.vertical === true ? <div className='ship-row vertical'>{generateShip(ship.length)}</div> :  <div className='ship-row orizontal'>{generateShip(ship.length)}</div>}
//       </div>
//     )
//   })
//   return (
//     <div className="available ships">
//       {shipshtml}
//     </div>
//   )
// }



// function Square() {
//   return (
//     <button className="square" >
//       0
//     </button>
//   );
// }


// const board = Array(10).fill(0).map(row => new Array(10).fill(0))
// const Game = () => {
//   const rowhtml = (row) => row.map((box) => <Square></Square>);
//   const boardhtml = board.map((row) => <div className='board-row'>{rowhtml(row)}</div>);
//   // console.log(boardhtml);
//   return (
//     <div className='game'>
//       {boardhtml}
//     </div>
//   )
// } 


// const StartGame = () => {


//   return (
//     <div className='start-game'>
//       <Game/>
//       <ChooseShips/>
//     </div>
//   )
// }


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <h1>hei</h1> */}
      {/* <StartGame></StartGame> */}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
