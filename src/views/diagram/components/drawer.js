import React, { useState } from "react";
import { Drawer, Button } from "antd";

const DiagramDrawer = (props) => {
  const { onClose, visible, functions } = props;

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
          {functions.map((f) => {
            if (f.isExport) {
              return (
                <h3>
                  {f.name} / {f.params}
                </h3>
              );
            }
          })}
        </div>
        <div>
          <div>
            <h1>Funciones disponibles</h1>
          </div>
          {functions.map((f) => {
            return (
              <h3>
                {f.name} / {f.params}
              </h3>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};

export default DiagramDrawer;
