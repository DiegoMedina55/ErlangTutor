import React from "react";

const Output = (props) => {
  const { output } = props;
  return (
    <>
      <h2>Output</h2>
      <div
        style={{
          height: "20vh",
          overflow: "auto",
          padding: "5px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <div>
          {output.map((o) => {
            return (
              <div style={{ padding: "0 30px" }}>
                <h4 style={{ margin: 0 }}>{o}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Output;
