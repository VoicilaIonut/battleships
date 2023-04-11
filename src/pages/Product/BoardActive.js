import React from "react";
import SquareActive from "./SquareActive";

const BoardActive = ({board, setPlaceOnGameTable}) => {
    const generateRow = (row, indexX) => row.map((value, indexY) => <SquareActive indexX={indexX} indexY={indexY} value={value} setPlaceOnGameTable={setPlaceOnGameTable}/>);
    const generate2DBoard = board.map((row, indexX) => <div className='board-row'>{generateRow(row, indexX)}</div>);
    return (
      <div className='game'>
        {generate2DBoard}
      </div>
    )
  } 

export default BoardActive;