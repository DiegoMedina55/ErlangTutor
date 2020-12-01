import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getSteps } from "../api/api";
import { stepsContext } from "../context/stepsContext";
import "./codeScreen.css";

import { Layout, Input, Button } from "antd";
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

const CodeScreen = (props) => {
  const history = useHistory();
  const { steps, setSteps } = useContext(stepsContext);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const onStartClick = () => {
    setIsLoading(true);
    makeRequest(inputValue);
  };

  const onRestartClick = () => {
    setIsLoading(false);
    setInputValue("");
  };

  const makeRequest = async (codeData) => {
    const s = await getSteps(codeData);
    setSteps(s);
    setIsLoading(false);
    setInputValue("");
    history.push("/diagram");
  };

  return (
    <Layout className="layout">
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "#5C6CFC",
        }}
      >
        <div className="logo" />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 400px", marginTop: 64 }}
      >
        <div className="layout-background" style={{ padding: 24 }}>
          <h2>
            Bienvenido a Erlang Tutor, ingrese el código que quiere visualizar
          </h2>
          <TextArea
            value={inputValue}
            onChange={onChange}
            placeholder="Ingrese el codigo aqui"
            autoSize={{ minRows: 25, maxRows: 25 }}
          />
          <div className="buttons">
            <Button
              type="primary"
              loading={isLoading}
              onClick={onStartClick}
              style={{
                backgroundColor: "#5C6CFC",
                border: "none",
              }}
            >
              Comenzar
            </Button>
            <Button
              onClick={onRestartClick}
              style={{
                borderColor: "#5C6CFC",
                color: "#5C6CFC",
              }}
            >
              Reiniciar
            </Button>
          </div>
        </div>
      </Content>
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

export default CodeScreen;
