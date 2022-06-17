import Spinner from "react-bootstrap/Spinner";

import React from "react";

const Loader = ({ loaderType }) => {
  return (
    <Spinner
      animation="border"
      role="statut"
      size={loaderType === "button" && "sm"}
      className={`mx-auto ${loaderType !== "button" && "my-5"}`}
    >
      <span className="visually-hidden">Chargement en cours...</span>
    </Spinner>
  );
};

export default Loader;
