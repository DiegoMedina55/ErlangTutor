import React from "react";

const Code = (props) => {
    let line = 0;
  const { code, current,next } = props;
  return (
    <>
      <h2>Tu código</h2>
      <div
        style={{
          height: "60vh",
          backgroundColor: "#fff",
          padding: "2px",
          borderRadius: "10px",
          overflow: "auto",
        }}
      >
        <div style={{}}>
          {code.map((l) => {
            line += 1;
            return (
              <>
                <div style={{ padding: "0 30px" }}>
                  <h3 style={{ margin: 0 }}>
                    {current === line && current !== next && (
                      <strong
                        style={{
                          paddingRight: "10px",
                          color: "orange",
                        }}
                      >
                        {line}
                      </strong>
                    )}
                    {next === line && current !== next && (
                      <strong
                        style={{
                          paddingRight: "10px",
                          color: "#18DBAC",
                        }}
                      >
                        {line}
                      </strong>
                    )}
                    {current === next && current === line && (
                      <strong
                        style={{
                          paddingRight: "10px",
                          color: "red",
                        }}
                      >
                        {line}
                      </strong>
                    )}
                    {current !== line && next !== line && (
                      <strong
                        style={{
                          paddingRight: "10px",
                        }}
                      >
                        {line}
                      </strong>
                    )}
                    {l}
                  </h3>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Code;
