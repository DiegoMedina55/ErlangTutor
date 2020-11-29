import React from "react";
import "./components.css";

const DictNode = (props) => {
  const { data, inputs,outputs } = props;
  const objectData = data.data;
  return (
    <div className="dict_base">
      <div className="object_title  ">{data.name}</div>
      <div className="dict_container">
        {Object.keys(objectData).map((k, v) => (
          <div className="dict_param">
            <div style={{ fontWeight: "bold" }}>{k} </div>
            <div>{objectData[k]}</div>
            <hr />
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "block",
          justifyContent: "space-between",
        }}
      >
        {inputs.map((port) =>
          React.cloneElement(port, {
            style: { widdiv: "25px", height: "0px", background: "red" },
          })
        )}
        {outputs.map((port) =>
          React.cloneElement(port, {
            style: { widdiv: "25px", height: "0px", background: "blue" },
          })
        )}
      </div>
    </div>
  );
};

export default DictNode;
