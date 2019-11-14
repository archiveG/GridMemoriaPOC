import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { HotKeys } from 'react-hotkeys';
import { toast } from 'react-toastify';

import styles from './styles';
import TextoReferencia from '../TextoReferencia';
import Campo from '../Campo';
import atalhos from '../../core/utils/atalhos';

const useStyles = makeStyles(styles);

export default function Cabecalho({ item }) {

  const classes = useStyles();
  let focus = item.tipo === 'GRUPO' ? classes.cabecalhoGrupoFocus : item.tipo === 'SUBGRUPO' ? classes.cabecalhoSubGrupoFocus : classes.cabecalhoServicoFocus;

  const handleAtalhos = {
    CRIAR_IGUAL_ACIMA: event => {
      event.preventDefault();
      toast.info(`Novo ${item.tipo} adicionado acima HEAD`);
    },
    CRIAR_IGUAL_ABAIXO: event => {
      event.preventDefault();
      toast.info(`Novo ${item.tipo} adicionado abaixo HEAD`);
    },

    CRIAR_GRUPO_ACIMA: event => {
      event.preventDefault();
      toast.info(`Novo Grupo adicionado acima HEAD`);
    },
    CRIAR_GRUPO_ABAIXO: event => {
      event.preventDefault();
      toast.info(`Novo Grupo adicionado abaixo HEAD`);
    },

    CRIAR_SUB_GRUPO_ACIMA: event => {
      event.preventDefault();
      toast.info(`Novo Sub-grupo adicionado acima HEAD`);
    },
    CRIAR_SUB_GRUPO_ABAIXO: event => {
      event.preventDefault();
      toast.info(`Novo Sub-grupo adicionado abaixo HEAD`);
    },

    CRIAR_SERVICO_ACIMA: event => {
      event.preventDefault();
      toast.info(`Novo Serviço adicionado acima HEAD`);
    },
    CRIAR_SERVICO_ABAIXO: event => {
      event.preventDefault();
      toast.info(`Novo Serviço adicionado abaixo HEAD`);
    },

    EXCLUIR: event => {
      event.preventDefault();
      toast.info(`item excluido HEAD`);
    },
  }

  const createSummary = (item) => {
    if (item.tipo === 'GRUPO' || item.tipo === 'SUBGRUPO') {
      let id = item.tipo === 'GRUPO' ? `grup_desc_${item.id}` : `sub_desc_${item.id}`;

      return (
        <div className={classes.conteudoCabecalho}>
          <TextoReferencia id={`grup_codref_${item.id}`} texto={item.codigoReferencia} />
          <Campo id={id} label="Descrição" />
        </div>
      );
    } else {
      return (
        <div className={classes.conteudoCabecalho}>
          <TextoReferencia id={`serv_codref_${item.id}`} texto={item.codigoReferencia} />

          <Campo id={`serv_ref_${item.id}`} label="Referencial" />
          <Campo id={`serv_codaux_${item.id}`} label="Codigo Auxiliar" />
          <Campo id={`serv_desc_${item.id}`} label="Descrição" />
          <Campo id={`serv_qtd_${item.id}`} label="Quantidade" />
          <Campo id={`serv_unid_${item.id}`} label="Unidade Medida" />
        </div>
      );
    }
  };

  return (
    <HotKeys keyMap={atalhos} handlers={handleAtalhos}>
      <ExpansionPanelSummary className={focus} expandIcon={<ExpandMoreIcon />}>
        {createSummary(item)}
      </ExpansionPanelSummary>
    </HotKeys>
  );
}

Cabecalho.propsTypes = {
  item: PropTypes.object.isRequired
}
