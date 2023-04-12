import React from "react";
import ShipActive from "./ShipActive";

function ListShips({ ships, setSelected }) {
  return (
    <>
      <div className="available-ships">
        {ships.map(
          (ship) =>
            !ship.placed && <ShipActive ship={ship} setSelected={setSelected} />
        )}
      </div>
    </>
  );
}

export default ListShips;
