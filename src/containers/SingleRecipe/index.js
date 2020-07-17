import React, { Component } from "react";
import Loader from "../../components/Loader";
import "./SingleRecipe.scss";

export default class SingleRecipe extends Component {
  state = {
    meals: {},
    isLoading: true
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(json => this.setState({ meals: json.meals[0], isLoading: false }))
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  getUrlImageForIngredient(ingredient) {
    return `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    const meals = this.state.meals;
    const stepsInstructions = meals.strInstructions.split("\r\n");
    const ingredients = Object.keys(meals).filter(
      ingredient =>
        /strIngredient\d+/.test(ingredient) && meals[ingredient] !== ""
    );
    const measures = Object.keys(meals).filter(
      measure => /strMeasure\d+/.test(measure) && meals[measure] !== ""
    );

    return (
      <div className="container">
        <h1 className="recipe__title">{meals.strMeal}</h1>
        <div className="box-above">
          <img src={meals.strMealThumb} alt="" className="recipe__img" />
          <ul className="ingredients">
            {ingredients.map((ingredient, index) => (
              <div className="card-ingredients" key={index}>
                <img
                  className="card-ingredients__img"
                  src={this.getUrlImageForIngredient(meals[ingredient])}
                  alt=""
                />
                <li className="card-ingredients__measure">
                  {meals[measures[index]]}
                </li>
                <li className="card-ingredients__title">{meals[ingredient]}</li>
              </div>
            ))}
          </ul>
        </div>
        <div className="steps-box">
          <ol>
            {stepsInstructions.map((step, index) => (
              <li className="steps__title" key={index}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
