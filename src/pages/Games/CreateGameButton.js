import React from "react";
import { handleErrors } from "../Game/utils";

const url = "https://react-labs.softbinator.com/game";

const CreateGameButton = ({ navigate, setErrorMessage }) => {
  const handleCreateGame = (e) => {
    e.preventDefault();
    const accessToken = localStorage["accessToken"];
    fetch(`${url}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((json) => console.log(json) || navigate(json.id))
      .catch((error) => console.log(error) || setErrorMessage(error));

    setErrorMessage(null);
  };

  return (
    <>
      <button type="button" onClick={handleCreateGame}>
        Create new game
      </button>
    </>
  );
};

export default CreateGameButton;
