import React from "react";

const SquareActive = ({indexX, indexY, value, setPlaceOnGameTable}) => {
    return (
      <>
      <button className="square" onClick={() => setPlaceOnGameTable([indexX, indexY])}
      > {value}</button>
      </>
    );
  }

  export default SquareActive;