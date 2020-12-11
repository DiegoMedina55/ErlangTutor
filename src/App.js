import React,{useState} from "react";
import Routes from "./routes/routes";
import "./App.css";

import { responseContext, sourceCodeContext } from "./context/stepsContext";


const App = () => {
  const [response,setResponse] = useState({});
  const [code,setCode] = useState([]);
  return (
    <responseContext.Provider value={{ response, setResponse }}>
      <sourceCodeContext.Provider value={{ code, setCode }}>
        <Routes />
      </sourceCodeContext.Provider>
    </responseContext.Provider>
  );
};

export default App;
