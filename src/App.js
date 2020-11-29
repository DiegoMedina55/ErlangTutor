import React from "react";
import Diagram, { useSchema, createSchema } from "beautiful-react-diagrams";
import "beautiful-react-diagrams/styles.css";
import "./App.css";

import CustomNode from "./componentes/customNode";
import ListNode from "./componentes/listNode";
import DictNode from "./componentes/dictNode";

import json from "./api/structure.json";

const genObjNodes = (objsvars, objsdata, funname, funpos) => {
  const nodes = [];
  let i = 0;
  for (var objname in objsvars) {
    const data = objsdata[objsvars[objname]];
    const node = {
      id: objname  + funname,
      render: Array.isArray(data) ? ListNode : DictNode,
      disableDrag: false,
      data: {
        name: objname,
        data: data,
      },
      coordinates: [funpos, 200 * i + 200],
      inputs: [{ id: objname + funname + "iport", alignment: "left" }],
      outputs: [],
    };
    nodes.push(node);
    i = i + 1;
  }
  return nodes;
};

const generateNodes = (step) => {
  const nodes = [];
  let objNodes = [];
  const sf = step.functions;
  for (let i = 0; i < sf.length; i++) {
    const node = {
      id: sf[i].name,
      render: CustomNode,
      disableDrag: false,
      data: sf[i],
      coordinates: [200 * i + 200 * i, 50],
      outputs: [],
      inputs: [],
    };
    if (i > 0) {
      node.inputs.push({ id: sf[i].name + "iport", alignment: "left" });
    }
    if (i < sf.length - 1) {
      node.outputs.push({ id: sf[i].name + "oport", alignment: "right" });
    }
    for (let key in sf[i].objectVariables) {
      node.outputs.push({
        id: sf[i].name + key + "oport",
        alignment: "right",
      });
    }
    nodes.push(node);
    const nt = genObjNodes(sf[i].objectVariables, step.objects, sf[i].name, i);
    objNodes = [...objNodes, ...nt];
  }
  const k = [...nodes, ...objNodes];
  return k;
};

const generateObjectLinks = (nodes,n) => {
  const links = [];
  for (let i = 0; i < n; i++) {
    for (let key in nodes[i].data.objectVariables) {
      const link = {
        input: nodes[i].id   ,
        output: key + nodes[i].id ,
        readonly: true,
        label: key,
        className: "my-custom-link-class",
      };
      links.push(link);
    }
  }
  console.log(links);
  return links;
};

const generateNodeLinks = (nodes,n) => {
  let links = [];
  for (let i = 1; i < n; i++) {
    const link = {
      input: nodes[i - 1].id ,
      output: nodes[i].id ,
      readonly: true,
      label: "Function called",
      className: "my-custom-link-class",
    };
    links.push(link);
  }
  const ol = generateObjectLinks(nodes,n);
  links = [...links, ...ol];
  return links;
};

const nodes = generateNodes(json.steps[0]);
const fnodes = json.steps[0].functions.length
const nodesLinks = generateNodeLinks(nodes,fnodes);

const initialSchema = createSchema({
  nodes: nodes,
  links: nodesLinks,
});

const UncontrolledDiagram = () => {
  const [schema, { onChange }] = useSchema(initialSchema);
  return (
    <div style={{ height: "50.5rem" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

function App() {
  return (
    <div c>
      <div style={{ height: 600 }}>
        <UncontrolledDiagram />
      </div>
    </div>
  );
}

export default App;
