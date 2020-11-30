import React,{useState} from "react";
import Routes from "./routes/routes";
import "./App.css";

import { stepsContext } from "./context/stepsContext";


const App = () => {
  const [steps,setSteps] = useState({});
  return (
    <stepsContext.Provider value={{steps,setSteps}}>
      <Routes />
    </stepsContext.Provider>
  );
};

export default App;
