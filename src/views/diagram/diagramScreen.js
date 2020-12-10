import React, { useContext ,useState,useEffect  } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { Layout, Menu, Row, Col, Button } from "antd";
import "antd/dist/antd.css";
import "beautiful-react-diagrams/styles.css";
import { UncontrolledDiagram } from "./diagramLogic";

import json from "../../api/structure.json";
import "./diagramScreen.css";
import { stepsContext } from "../../context/stepsContext";
import Output from "./components/output"
import Code from "./components/code"
import DiagramDrawer from "./components/drawer";

const { Header, Content, Footer } = Layout;

let code = `juan
diego
medina
naranjo
diego
medina
naranjo
diego
medina
naranjo
`;
let output = `juan
diego
medina
naranjo
diego
medina
naranjo
diego
medina
naranjo
`;
code = code.split("\n");
output = output.split("\n");


const DiagramScreen = (props) => {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  let currentLine = 2;
  const [currentStep,setCurrentStep] = useState(0);
  const history = useHistory();
  const { steps, setSteps } = useContext(stepsContext);
  console.log(json);
  
  const returnCode = () => {
    history.replace("/code")
  }

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onNextClick = () => {
    if (currentStep < json.steps.length-1) {
      setCurrentStep(currentStep + 1);
      forceUpdate();
    }
  }
  const onBeforeClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      forceUpdate();
    }
  }

  return (
    <Layout className="layout">
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1" onClick={returnCode}>
            Nuevo código
          </Menu.Item>
          <Menu.Item key="2" onClick={showDrawer}>
            Información Adicional
          </Menu.Item>
        </Menu>
      </Header>
      <div
        className="site-layout-background"
        style={{ backgroundColor: "#dadada" }}
      >
        <Row>
          <Col
            span={5}
            className="site-layout"
            style={{ backgroundColor: "#dadada" }}
          >
            <Content
              style={{ padding: "0 15px", marginTop: 64, height: "100%" }}
            >
              {<Code code={code} />}
              {<Output output={output} currentLine={currentLine} />}
            </Content>
          </Col>
          <Col span={19}>
            <Content style={{ paddingLeft: "25px", marginTop: 64 }}>
              <UncontrolledDiagram
                key={`diagram ${currentStep}`}
                step={json.steps[currentStep]}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="primary"
                  onClick={onBeforeClick}
                  style={{
                    backgroundColor: "#5C6CFC",
                    border: "none",
                    margin: "5px 10px",
                  }}
                >
                  Anterior
                </Button>
                <Button
                  type="primary"
                  onClick={onNextClick}
                  style={{
                    backgroundColor: "#5C6CFC",
                    border: "none",
                    margin: "5px 10px",
                  }}
                >
                  Siguiente
                </Button>
              </div>
            </Content>
          </Col>
        </Row>
      </div>
      <DiagramDrawer onClose={onClose} visible={visible} />
      <Footer
        className="footer"
        style={{
          backgroundColor: "#2D304E",
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        ErlangTutor | Lenguajes de programación 2020-2
      </Footer>
    </Layout>
  );
};

export default DiagramScreen;
