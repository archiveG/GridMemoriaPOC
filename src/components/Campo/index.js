import React from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import teclas from '../../core/utils/teclas';

import './style.css';

export default function Campo({ id, label, item }) {

  const keyPressed = e => {
    let tecla = e.keyCode;
    let control = e.ctrlKey;
    let alt = e.altKey;

    console.log(`ctrl: ${control} - alt: ${e.altKey} - key: ${e.key} - code: ${tecla}`);
    if (control && isTeclaValida(tecla)) {
      e.preventDefault();

      if (tecla === teclas.SETA_CIMA) {
        toast.info(`Novo ${item.tipo} adicionado acima FIELD`);
      } else if (tecla === teclas.SETA_BAIXO) {
        toast.info(`Novo ${item.tipo} adicionado abaixo FIELD`);
      } else if (alt && tecla === teclas.G) {
        toast.info(`Novo Grupo adicionado acima FIELD`);
      } else if (tecla === teclas.G) {
        toast.info(`Novo Grupo adicionado abaixo FIELD`);
      } else if (alt && tecla === teclas.S) {
        toast.info(`Novo Serviço adicionado acima FIELD`);
      } else if (tecla === teclas.S) {
        toast.info(`Novo Serviço adicionado abaixo FIELD`);
      }

    }
  };

  const isTeclaValida = codigoTecla => {
    return codigoTecla !== teclas.C
      && codigoTecla !== teclas.V
      && codigoTecla !== teclas.A
      && codigoTecla !== teclas.X
  };

  return (
    <div id={`${id}-group`} className="sds-form-group">
      <input id={id}
        className="sds-input"
        type="text"
        placeholder={label}
        onClick={e => e.stopPropagation()}
        onKeyDown={keyPressed} />
    </div>
  );
}

Campo.propsTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  item: PropTypes.object,
};
