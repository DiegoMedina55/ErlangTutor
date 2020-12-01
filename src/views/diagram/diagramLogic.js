import CustomNode from "../../componentes/customNode";
import ListNode from "../../componentes/listNode";
import DictNode from "../../componentes/dictNode";
import Diagram, { useSchema, createSchema } from "beautiful-react-diagrams";

 const genObjNodes = (objsvars, objsdata, funname, funpos) => {
  const nodes = [];
  let i = 0;
  for (var objname in objsvars) {
    const data = objsdata[objsvars[objname]];
    const node = {
      id: objname + funname,
      render: Array.isArray(data) ? ListNode : DictNode,
      disableDrag: false,
      data: {
        name: objname,
        data: data,
      },
      coordinates: [funpos + (100 * i ), 400],
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
      coordinates: [275 * i , 25],
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
    const nt = genObjNodes(
      sf[i].objectVariables,
      step.objects,
      sf[i].name,
      275 * i 
    );
    objNodes = [...objNodes, ...nt];
  }
  const k = [...nodes, ...objNodes];
  return k;
};

 const generateObjectLinks = (nodes, n) => {
  const links = [];
  for (let i = 0; i < n; i++) {
    for (let key in nodes[i].data.objectVariables) {
      const link = {
        input: nodes[i].id,
        output: key + nodes[i].id,
        readonly: true,
        // label: key,
        className: "my-custom-link-class",
      };
      links.push(link);
    }
  }
  return links;
};

 const generateNodeLinks = (nodes, n) => {
  let links = [];
  for (let i = 1; i < n; i++) {
    const link = {
      input: nodes[i - 1].id,
      output: nodes[i].id,
      readonly: true,
      label: "FC",
      className: "my-custom-link-class",
    };
    links.push(link);
  }
  const ol = generateObjectLinks(nodes, n);
  links = [...links, ...ol];
  return links;
};



const generateSchema = (json) => {
  const nodes = generateNodes(json);
  const fnodes = json.functions.length;
  const nodesLinks = generateNodeLinks(nodes, fnodes);
  const initialSchema = createSchema({
    nodes: nodes,
    links: nodesLinks,
  });
  return initialSchema;

}


export const UncontrolledDiagram = ({step}) => {
  const initialSchema = generateSchema(step)
  const [schema, { onChange }] = useSchema(initialSchema);
  return (
    <div style={{ height: "80vh", width: "100%", padding: "50px 20px 0" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};



