import React, { useState } from "react";
import { Drawer, Button } from "antd";

const DiagramDrawer = (props) => {
  const { onClose,visible } = props
  
  return (
    <>
      <Drawer
        title="Información Adicional"
        placement="right"
        width="500"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div>
          <div>

          <h1>Exports</h1>
          </div>
          <h4>Funcion6</h4>
          <h4>Funcion4</h4>
          <h4>Funcion4</h4>
          <h4>Funcion3</h4>
          <h4>Funcion2</h4>
        </div>
        <div>
          <div>
          <h1>Funciones disponibles</h1>
          </div>
          <h4>Funcion6</h4>
          <h4>Funcion4</h4>
          <h4>Funcion4</h4>
          <h4>Funcion3</h4>
          <h4>Funcion2</h4>
        </div>

      </Drawer>
    </>
  );
};

export default DiagramDrawer;
