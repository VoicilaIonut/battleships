import React from 'react';
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/routes-definition";

export const Product = ({ product, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${Routes.ProductsRoute}/${id}`)}
      style={{
        height: "100px",
        width: "100px",
        marginRight: "10px",
        border: "1px solid #000",
      }}
    >
      {product}
    </div>
  );
};