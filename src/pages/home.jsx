import React, { Component } from "react";

export default class Home extends Component {
  componentDidMount() {
    //TODO: move to services, remove hard coded string
    fetch("https://api.teleport.org/api/urban_areas/").then(value => {
      console.info("result fetched");
    });
  }
  render() {
    return (
      <div>
        <h1> Teleport Quality of Life Metrics in Urban Cities</h1>
      </div>
    );
  }
}
