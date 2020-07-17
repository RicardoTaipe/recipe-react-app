import React from "react";
import { Link } from "react-router-dom";

import "./Recipe.scss";

export default function Recipe({ recipe }) {
  const { strMeal, strMealThumb } = recipe;
  return (
    <Link style={{ textDecoration: "none" }} to={`/recipe/${recipe.idMeal}`}>
      <article className="recipe">
        <div className="img-container">
          <img src={strMealThumb} alt="" />
        </div>
        <div className="recipe-info">
          <h3>{strMeal}</h3>
        </div>
      </article>
    </Link>
  );
}
