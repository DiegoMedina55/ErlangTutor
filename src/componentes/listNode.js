import React from "react";
import "./components.css";

const ListNode = (props) => {
  const { data, inputs,outputs } = props;
  const objectData = data.data;
  console.log(objectData);
  return (
    <div className="object_base">
      <div className="object_title  ">{data.name}</div>
      <div className="objects_container">
        {objectData.map((obj) => (
          <div className="object_item">
            {obj}
            <hr/>
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

export default ListNode;
