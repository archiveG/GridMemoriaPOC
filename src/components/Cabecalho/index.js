import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { toast } from 'react-toastify';

import styles from './styles';
import TextoReferencia from '../TextoReferencia';
import Campo from '../Campo';
import teclas from 'core/utils/teclas';

const useStyles = makeStyles(styles);

export default function Cabecalho({ item, funcaoAdd }) {

  const classes = useStyles();
  let focus = item.tipo === 'GRUPO' ? classes.cabecalhoGrupoFocus : item.tipo === 'SUBGRUPO' ? classes.cabecalhoSubGrupoFocus : classes.cabecalhoServicoFocus;

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

  const createSummary = (item) => {
    if (item.tipo === 'GRUPO' || item.tipo === 'SUBGRUPO') {
      let id = item.tipo === 'GRUPO' ? `grup_desc_${item.id}` : `sub_desc_${item.id}`;

      return (
        <div className={classes.conteudoCabecalho}>
          <TextoReferencia id={`grup_codref_${item.id}`} texto={item.codigoReferencia} />
          <Campo id={id} label={`Descrição do ${item.tipo === 'GRUPO' ? 'grupo' : 'sub grupo'}`} item={item} funcaoAdd={funcaoAdd} />
        </div>
      );
    } else {
      return (
        <div className={classes.conteudoCabecalho}>
          <TextoReferencia id={`serv_codref_${item.id}`} texto={item.codigoReferencia} />

          <Campo id={`serv_ref_${item.id}`} label="Referencial" item={item} funcaoAdd={funcaoAdd} />
          <Campo id={`serv_codaux_${item.id}`} label="Codigo Auxiliar" item={item} funcaoAdd={funcaoAdd} />
          <Campo id={`serv_desc_${item.id}`} label="Descrição do serviço" item={item} funcaoAdd={funcaoAdd} />
          <Campo id={`serv_unid_${item.id}`} label="Unidade Medida" item={item} funcaoAdd={funcaoAdd} />
          <Campo id={`serv_qtd_${item.id}`} label="Quantidade" item={item} funcaoAdd={funcaoAdd} />
        </div>
      );
    }
  };

  return (

      <ExpansionPanelSummary className={focus} expandIcon={<ExpandMoreIcon />} onKeyDown={keyPressed}>
        {createSummary(item)}
      </ExpansionPanelSummary>
  );
}

Cabecalho.propsTypes = {
  item: PropTypes.object.isRequired,
  funcaoAdd: PropTypes.func.isRequired,
}
