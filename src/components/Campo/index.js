import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { toast } from 'react-toastify';
import teclas from 'core/utils/teclas';

const useStyles = makeStyles({
  campo: {
    margin: '0px 4px 0 4px',
  }
});

export default function Campo({ id, label, item, funcaoAdd }) {

  const classes = useStyles();

  const keyPressed = e => {
    let tecla = e.keyCode;
    let control = e.ctrlKey;
    let alt = e.altKey;

    if (control && isTeclaValida(tecla)) {
      e.preventDefault();
      e.stopPropagation();

      if (tecla === teclas.SETA_CIMA) {
        toast.info(`Novo ${item.tipo} adicionado acima`);
      } else if (tecla === teclas.SETA_BAIXO) {
        toast.info(`Novo ${item.tipo} adicionado abaixo`);
      } else if (alt && tecla === teclas.G) {
        funcaoAdd('GRUPO', item, `Novo Grupo adicionado acima`);
      } else if (tecla === teclas.G) {
        funcaoAdd('GRUPO', item, `Novo Grupo adicionado abaixo`);
      } else if (alt && tecla === teclas.S) {
        toast.info(`Novo Serviço adicionado acima`);
      } else if (tecla === teclas.S) {
        funcaoAdd('SERVICO', item, `Novo Serviço adicionado abaixo`);
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
    <div className={classes.campo}>
      <TextField
        id={id}
        label={label}
        margin="none"
        variant="outlined"
        onClick={e => e.stopPropagation()}
        onKeyDown={keyPressed}
      />
    </div>
  );
}

Campo.propsTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  item: PropTypes.object,
  funcaoAdd: PropTypes.func,
};
