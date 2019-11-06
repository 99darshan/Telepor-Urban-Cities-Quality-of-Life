import React, { Component } from "react";
export default class QualityIndicator extends Component {
  render() {
    return (
      <div
        style={{
          //border: "1px solid red",
          borderRadius: "8px",
          background: "#333",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "12px",
          minWidth: "300px",
          marginLeft: "16px",
          marginBottom: "16px"
        }}
      >
        {/* TOOD: add icon */}
        {/* <div>
          <FontAwesomeIcon icon={faHome} />
        </div> */}
        <div>
          <h6 style={{ margin: 0 }}>{this.props.indicatorName}</h6>
          <div style={{ height: "8px" }} />
          <p
            style={
              this.props.score > 5
                ? { color: "#76ff03", margin: 0 }
                : { color: "#ff8a65", margin: 0 }
            }
          >
            {this.props.score}
          </p>
        </div>
      </div>
    );
  }
}
