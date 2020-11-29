import React from 'react'
import "./components.css"

const ExportNode = ({data}) => {
  console.log(data)
  return (
    <>
      <div className="node_body">
          <h3 className="node_title">Principal</h3>
        {data.map((fun) => (
          <p key={fun}>{fun}</p>
        ))}
      </div>
    </>
  );

}

export default ExportNode;