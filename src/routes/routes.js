import React from "react";
import { BrowserRouter as Routes, Switch, Route } from "react-router-dom";
import CodeScreen from "../views/code/codeScreen";
import DiagramScreen from "../views/diagram/diagramScreen";


const routes = () => {
  return (
    <Routes>
      <Switch>
        <Route exact path="/code" component={CodeScreen} />
        <Route exact path="/diagram" component={DiagramScreen} />
      </Switch>
    </Routes>
  );
};

export default routes;
