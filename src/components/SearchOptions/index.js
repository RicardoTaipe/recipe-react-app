import React, { Component } from "react";
import "./SearchOptions.scss";

export default class SearchOptions extends Component {
  url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categorieSelected: "",
      search: ""
    };
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(this.url)
      .then(res => res.json())
      .then(json => this.setState({ categories: json.meals }))
      .catch(error => console.error(error));
  }

  handleChange(e) {
    this.setState({ categorieSelected: e.target.value });
    //reset value
    this.setState({ search: "" });
    this.props.onCategorieSelected(e.target.value);
  }

  handleOnSearch(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        {categories !== "" && (
          <div className="container-search">
            <select
              value={this.state.categorieSelected}
              onChange={this.handleChange}
            >
              {categories.map((categorie, index) => (
                <option key={index} value={categorie.strCategory}>
                  {categorie.strCategory}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={this.state.search}
              placeholder="Recipe search"
              onChange={this.handleOnSearch}
            />
            <input
              type="submit"
              value="Search"
              onClick={() => {
                this.state.search !== "" &&
                  this.props.onSearch(this.state.search);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
