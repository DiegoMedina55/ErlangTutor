import React from "react";
import "./components.css";

const CustomNode = (props) => {
  const { inputs, outputs, data } = props;
  const params = data.params;
  const functionVars = data.functionVariables;
  const vars = data.variables;
  const objectVariables = data.objectVariables;
  const objectsData = data.objects;
  return (
    <div className="node_base">
      <div className="node_title  ">{data.name}</div>
      <div className="node_params">
        {Object.keys(params).map((k, v) => (
          <div className="node_param">
            <div>{k}</div>
            <div>{params[k]}</div>
          </div>
        ))}
      </div>
      <div className="node_variables">
        {Object.keys(vars).map((k, v) => (
          <div className="node_var">
            <div>{k}</div>
            <div>{vars[k]}</div>
          </div>
        ))}
        {Object.keys(objectVariables).map((k, v) => (
          <div className="node_var">
            <div>{k}</div>
            <div>.</div>
          </div>
        ))}
        {Object.keys(functionVars).map((k, v) => (
          <div className="node_var">
            <div>{k}</div>
            <div>{functionVars[k]}()</div>
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

export default CustomNode;
