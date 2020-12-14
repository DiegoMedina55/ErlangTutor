import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { Layout, Menu, Row, Col, Button } from "antd";
import "antd/dist/antd.css";
import "beautiful-react-diagrams/styles.css";
import { UncontrolledDiagram } from "./diagramLogic";

import json from "../../api/structure.json";
import "./diagramScreen.css";
import { sourceCodeContext, responseContext } from "../../context/stepsContext";
import Output from "./components/output";
import Code from "./components/code";
import DiagramDrawer from "./components/drawer";

const { Header, Content, Footer } = Layout;

const DiagramScreen = () => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const { response } = useContext(responseContext);
  const { code } = useContext(sourceCodeContext);
  const steps = response;
  const [currentStep, setCurrentStep] = useState(0);
  const [currentLine, setCurrentLine] = useState(
    steps.steps[0].currentLine
  );
  const [consoleOutput, setConsoleOutput] = useState([
    steps.steps[0].output,
  ]);
  const [visible, setVisible] = useState(false);

  const history = useHistory();
  const returnCode = () => history.replace("/code");

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const onNextClick = () => {
    if (currentStep < response.steps.length - 1) {
      const cs = currentStep + 1;
      if (steps.steps[cs].output != null) {
        let x = consoleOutput;
        x.push(steps.steps[cs].output);
        setConsoleOutput(x);
      }
      setCurrentStep(currentStep + 1);
      setCurrentLine(steps.steps[cs].currentLine);
      forceUpdate();
    }
  };

  const onBeforeClick = () => {
    if (currentStep > 0) {
      const cs = currentStep - 1;
      if (steps.steps[cs].output != null) {
        let x = consoleOutput;
        x.pop();
        setConsoleOutput(x);
      }
      setCurrentStep(currentStep - 1);
      setCurrentLine(steps.steps[cs].currentLine);
      forceUpdate();
    }
  };

  return (
    <>
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
                {<Code code={code} current={currentLine} />}
                {<Output output={consoleOutput} />}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 10,
                  }}
                >
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
            <Col span={19}>
              <Content style={{ paddingLeft: "25px", marginTop: 64 }}>
                <UncontrolledDiagram
                  key={`diagram ${currentStep}`}
                  step={response.steps[currentStep]}
                />
              </Content>
            </Col>
          </Row>
        </div>
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
      <DiagramDrawer
        onClose={onClose}
        visible={visible}
        functions={response.principalFunctions || []}
      />
    </>
  );
};

export default DiagramScreen;
