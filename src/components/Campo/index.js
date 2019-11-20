import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import { toast } from 'react-toastify';
import teclas from '../../core/utils/teclas';

export default function Campo({ id, label, item, funcaoAdd }) {

  const keyPressed = e => {
    let tecla = e.keyCode;
    let control = e.ctrlKey;
    let alt = e.altKey;

    if (control && isTeclaValida(tecla)) {
      e.preventDefault();

      if (tecla === teclas.SETA_CIMA) {
        toast.info(`Novo ${item.tipo} adicionado acima`);
      } else if (tecla === teclas.SETA_BAIXO) {
        toast.info(`Novo ${item.tipo} adicionado abaixo`);
      } else if (alt && tecla === teclas.G) {
        funcaoAdd();
        toast.info(`Novo Grupo adicionado acima`);
      } else if (tecla === teclas.G) {
        funcaoAdd();
        toast.info(`Novo Grupo adicionado abaixo`);
      } else if (alt && tecla === teclas.S) {
        toast.info(`Novo Serviço adicionado acima`);
      } else if (tecla === teclas.S) {
        toast.info(`Novo Serviço adicionado abaixo`);
      } else if (alt && tecla === teclas.I) {
        toast.info(`Novo SubGrupo adicionado acima`);
      } else if (tecla === teclas.I) {
        toast.info(`Novo SubGrupo adicionado abaixo`);
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
    <TextField
      id={id}
      label={label}
      margin="normal"
      variant="outlined"
      onClick={e => e.stopPropagation()}
      onKeyDown={keyPressed}
    />
  );
}

Campo.propsTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  item: PropTypes.object,
  funcaoAdd: PropTypes.func,
};
