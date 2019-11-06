import React, { Component } from "react";
import DropdownSelect from "react-dropdown-select";
import styled from "styled-components";
import QualityIndicator from "../components/QualityIndicator";

export default class Home extends Component {
  state = {
    urbanCities: [],
    qualityScores: [],
    summary: "",
    teleportCityScore: 0,
    cityName: ""
  };

  async componentDidMount() {
    //TODO: move to services, remove hard coded string
    // TODO: on error ??

    try {
      let res = await fetch("https://api.teleport.org/api/urban_areas/");
      let response = await res.json();
      console.log(response.count);
      //   console.log(response._links.curies[0].href);
      //   console.log(response._links["ua:item"][0]);
      let urbanAreasArr = response._links["ua:item"];
      console.log(urbanAreasArr.length);
      urbanAreasArr.forEach(item => {
        console.log("for each yo");
        this.setState({
          urbanCities: [
            ...this.state.urbanCities,
            {
              name: item.name,
              href: item.href,
              label: item.name
            }
          ]
        });
      });

      console.log(this.state.urbanCities);
    } catch (error) {}

    console.info("result fetched");
  }

  async onCitySelect(values) {
    console.table(values);
    console.log("selected value: " + JSON.stringify(values));
    if (values.length === 0) return;
    let res = await fetch(`${values[0].href}scores`);
    let response = await res.json();
    console.log(response);
    //console.table(response.categories);
    this.setState({
      qualityScores: [...response.categories],
      summary: response.summary,
      teleportCityScore: response.teleport_city_score,
      cityName: values[0].name
    });
    console.table(this.state.qualityScores);

    console.log("summary: " + this.state.summary);
    console.log("overall score: " + this.state.teleportCityScore);
  }

  onClear() {
    this.setState({
      qualityScores: [],
      summary: "",
      teleportCityScore: 0,
      cityName: ""
    });
    console.log("onClear");
  }

  render() {
    const StyledDropdownSelect = styled(DropdownSelect)`
      background: #333;
      border: #333 !important;
      color: #fff;
      .react-dropdown-select-input {
        color: #fff;
      }
      .react-dropdown-select-dropdown {
        position: absolute;
        left: 0;
        border: none;
        width: 300px;
        padding: 0;
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        max-height: 300px;
        overflow: auto;
        z-index: 9;
        background: #333;
        box-shadow: none;
        color: #fff !important;
      }
      .react-dropdown-select-item {
        color: #f2f2f2;
        border-bottom: 1px solid #333;

        :hover {
          color: #ffffff80;
        }
      }
    `;

    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "#282c34",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //justifyContent: "center",
            fontSize: "calc(10px + 2vmin)",
            color: "white"
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              color: "#fff59d",
              margin: "16px",
              textAlign: "center"
            }}
          >
            <h1>
              {" "}
              Urban Cities <br /> Quality of Life Metrics{" "}
            </h1>
          </div>
          <StyledDropdownSelect
            closeOnSelect={true}
            options={this.state.urbanCities}
            // values={
            //   this.state.urbanCities.length > 0 ? [this.state.urbanCities[0]] : []
            // }
            // selected values is array of  items of options i.e. elements of this.state.urbanCitites
            onChange={values => this.onCitySelect(values)}
            onClearAll={() => this.onClear()}
            valueField="name"
            clearable={true}
            placeholder="Select a Urban City"
          />

          {this.state.qualityScores.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "24px"
                //border: "1px solid green"
              }}
            >
              <h2 style={{ margin: 0 }}>{this.state.cityName}</h2>
              <div style={{ height: "8px" }} />
              <h6 style={{ margin: 0 }}>
                Overall Score:{" "}
                <span
                  style={
                    this.state.teleportCityScore > 5
                      ? { color: "#76ff03" }
                      : { color: "#ff8a65" }
                  }
                >
                  {this.state.teleportCityScore.toFixed(3)}
                </span>
              </h6>
              {/* <p>{this.state.summary}</p> */}
              <div
                style={{
                  maxWidth: "500px",
                  //border: "1px solid yellow",
                  background: "#333",
                  borderRadius: "8px",
                  margin: "24px",
                  textAlign: "center",
                  padding: "12px"
                }}
                dangerouslySetInnerHTML={{ __html: this.state.summary }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center"
                }}
              >
                {this.state.qualityScores.map(item => (
                  <QualityIndicator
                    indicatorName={item.name}
                    score={item.score_out_of_10.toFixed(2)}
                  />
                ))}
              </div>
            </div>
          )}
          <p
            style={{
              textAlign: "end",
              color: "white",
              fontSize: "12px",
              fontStyle: "italic"
            }}
          >
            <a
              href="https://teleport.org/"
              style={{ textDecoration: "none", color: "white" }}
            >
              Powered By: Teleport
            </a>
          </p>
        </div>
      </React.Fragment>
    );
  }
}
