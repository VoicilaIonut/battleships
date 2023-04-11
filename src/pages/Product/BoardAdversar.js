import React, {useState, useEffect} from "react";
import BoardInactive from './BoardInactive';
import {boardLoadedWithMoves} from './utils'

const BoardAdversar = ({moves}) => {
    const [board, setBoard] = useState(Array(10).fill(0).map(row => new Array(10).fill(0)));
    
    useEffect(()=> {
      setBoard(boardLoadedWithMoves(board, moves));
    }, [])
  
    return (
      <div className='start-game'>
        <BoardInactive board={board}/>
        </div>
    )
  }

export default BoardAdversar;