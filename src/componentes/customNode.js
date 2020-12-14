import React from "react";
import "./components.css";

const CustomNode = (props) => {
  const { inputs, outputs, data } = props;
  const params = data.function.params || {};
  const functionVars = data.function.functionVariables || {};
  const vars = data.function.variables || {};
  const objectVariables = data.function.objectVariables || {};
  const objectsData = data.function.objects || {};
  const objectReturn = data.function.returnValue || {};
  return (
    <>
      <div className={`node_base ${data.active ? "active_node" : ""}`}>
        <div className="node_title  ">{data.function.name}</div>
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
        {objectReturn !== null && (
          <div className="node_return">{objectReturn}</div>
        )}
      </div>
    </>
  );
};

export default CustomNode;
