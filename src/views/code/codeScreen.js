import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getSteps } from "../../api/api";
import { responseContext, sourceCodeContext } from "../../context/stepsContext";
import "./codeScreen.css";

import { Layout, Input, Button, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

const CodeScreen = (props) => {
  const history = useHistory();
  const { response, setResponse } = useContext(responseContext);
  const { code, setCode } = useContext(sourceCodeContext);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Context = React.createContext({ name: "Mensaje de error" });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, error) => {
    // const s = ;
    notification.open({
      message: "Hay un error con tu codigo",
      // description: `Linea ${error.line} Columna ${error.column}. ${error.message}`,
      description: error,
      icon: <ExclamationCircleOutlined  style={{ color: "#108ee9" }} />,
      // placement,
    });
  };

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
    const res = await getSteps(codeData);
    // console.log(res)
    if (res.error === false) {
      setResponse(res.response);
      setCode(inputValue.split("\n"));
      setIsLoading(false);
      setInputValue("");
      history.push("/diagram");
    } else {
      openNotification("topRight", res.response);
      setIsLoading(false);
    }
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
        style={{ padding: "0 20%", marginTop: 64 }}
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
