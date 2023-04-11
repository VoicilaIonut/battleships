import React from "react";
import SquareInactive from './SquareInactive';

const BoardInactive = ({board}) => {
  const generateRow = (row) => row.map((value) => (<SquareInactive value={value}/>));
  const generate2DBoard = board.map((row) => <div className='board-row'>{generateRow(row)}</div>);
  return (
    <div className='game'>
      {generate2DBoard}
    </div>
  )
} 

export default BoardInactive;