import React from "react";

const url = "https://react-labs.softbinator.com/game";

const JoinGameButton = ({ productId }) => {
  const handleJoinGame = (e) => {
    e.preventDefault();
    const accessToken = localStorage["accessToken"];
    fetch(`${url}/join/${productId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ id: productId }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json)); // redirect to game
  };
  return <button onClick={handleJoinGame}> Join the game </button>;
};

export default JoinGameButton;
