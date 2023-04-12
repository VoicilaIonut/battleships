import React, { useState } from "react";

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
      <h5>Orientare: {ship.vertical ? "vertical" : "orizontal"}</h5>
      <button onClick={handleSwitchButton}>Press to switch orientation</button>
      <br></br>
      <button onClick={handleSelectButton}> Press to place</button>
    </>
  );
}

export default ShipActive;
