import React, { Component } from "react";
import "./RecipeList.scss";
//custom components
import Recipe from "../Recipe/Recipe";
import Loader from "../Loader";

export default class RecipeList extends Component {
  state = {
    recipes: [],
    isLoading: false
  };

  componentDidMount() {
    //sending a default value "Beef"
    this.executeQuery("Beef");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //udpdate recipes based on selected categorie in selected Input
    if (this.props.categorie !== prevProps.categorie) {
      this.executeQuery(this.props.categorie);
    }
    if (this.props.search !== prevProps.search) {
      this.executeSearch(this.props.search);
    }
  }
  //get Meals by Category
  executeQuery = categorie => {
    this.setState({ isLoading: true });
    this.url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`;
    fetch(this.url)
      .then(res => res.json())
      .then(json => this.setState({ recipes: json.meals, isLoading: false }))
      .catch(error => console.error(error));
  };

  executeSearch = search => {
    this.setState({ isLoading: true });
    this.url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(this.url)
      .then(res => res.json())
      .then(json => this.setState({ recipes: json.meals, isLoading: false }))
      .catch(error => console.error(error));
  };

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    const { recipes } = this.state;
    return (
      <div>
        <section className="recipe-list">
          {recipes &&
            recipes.map(recipe => (
              <Recipe key={recipe.idMeal} recipe={recipe} />
            ))}
          {recipes === null && (
            <h1 style={{ gridRow: 1 }}>No coincidences found</h1>
          )}
        </section>
      </div>
    );
  }
}
