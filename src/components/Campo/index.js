import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { HotKeys } from 'react-hotkeys';
import { toast } from 'react-toastify';

import atalhos from '../../core/utils/atalhos';

const useStyles = makeStyles({
  estiloCampo: {
    padding: '0',
    margin: '0 6px',
    alignItems: 'center',
  },
});

export default function Campo({ id, label, item }) {
  let classes = useStyles();

  const handleAtalhos = {
    CRIAR_IGUAL_ACIMA: event => {
      event.preventDefault();
      toast.info(`Novo ${item.tipo} adicionado acima CAMPO`);
    },
    CRIAR_IGUAL_ABAIXO: event => {
      event.preventDefault();
      toast.info(`Novo ${item.tipo} adicionado abaixo CAMPO`);
    },
    CRIAR_GRUPO_ACIMA: event => {
      event.preventDefault();
      toast.info(`Novo Grupo adicionado acima CAMPO`);
    },
    CRIAR_GRUPO_ABAIXO: event => {
      event.preventDefault();
      toast.info(`Novo Grupo adicionado abaixo CAMPO`);
    },

    CRIAR_SUB_GRUPO_ACIMA: event => {
      event.preventDefault();
      toast.info(`Novo Sub-grupo adicionado acima CAMPO`);
    },
    CRIAR_SUB_GRUPO_ABAIXO: event => {
      event.preventDefault();
      toast.info(`Novo Sub-grupo adicionado abaixo CAMPO`);
    },

    CRIAR_SERVICO_ACIMA: event => {
      event.preventDefault();
      toast.info(`Novo Serviço adicionado acima CAMPO`);
    },
    CRIAR_SERVICO_ABAIXO: event => {
      event.preventDefault();
      toast.info(`Novo Serviço adicionado abaixo CAMPO`);
    },

    EXCLUIR: event => {
      event.preventDefault();
      toast.info(`item excluido CAMPO`);
    },
  }

  return (
    <HotKeys keyMap={atalhos} handlers={handleAtalhos}>
      <TextField
        id={id}
        classes={{ root: classes.estiloCampo }}
        label={label}
        margin="normal"
        variant="outlined"
        onClick={e => e.stopPropagation()}
      />
    </HotKeys>
  );
}

Campo.propsTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
