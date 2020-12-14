import React from "react";

const Code = (props) => {
    let line = 0;
  const { code, current } = props;
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
                <div style={{ padding: "0 30px" }} >
                  <h5 style={{ margin: 0 }}>
                    {current === line && (
                      <strong
                        style={{
                          paddingRight: "10px",
                          color: "orange",
                        }}
                      >
                        {line}
                      </strong>
                    )}
                    {current !== line && (
                      <strong
                        style={{
                          paddingRight: "10px",
                        }}
                      >
                        {line}
                      </strong>
                    )}
                    {l}
                  </h5>
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
