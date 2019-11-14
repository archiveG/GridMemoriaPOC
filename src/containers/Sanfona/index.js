import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { toast } from 'react-toastify';
import { HotKeys } from "react-hotkeys";

import GridMemoria from 'containers/GridMemoria';

import styles from './styles';
import TextoReferencia from '../../components/TextoReferencia';
import Campo from '../../components/Campo';

const useStyles = makeStyles(styles);


function createSummary(item, classes) {
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

const renderPainel = (item) => {
  let classes = useStyles();
  // let cabecalho = item.tipo === 'GRUPO' ? classes.cabecalhoGrupo : item.tipo === 'SUBGRUPO' ? classes.cabecalhoSubGrupo : classes.cabecalhoServico;
  let detalhe = item.tipo === 'GRUPO' ? classes.detalheGrupo : item.tipo === 'SUBGRUPO' ? classes.detalheSubGrupo : classes.detalheServico;
  let focus = item.tipo === 'GRUPO' ? classes.cabecalhoGrupoFocus : item.tipo === 'SUBGRUPO' ? classes.cabecalhoSubGrupoFocus : classes.cabecalhoServicoFocus;

  const handleAtalhosCabecalho = {
    CRIAR_IGUAL_ACIMA: event => {
      event.preventDefault();
      toast.info(`Novo ${item.tipo} adicionado acima`);
    },
    CRIAR_IGUAL_ABAIXO: event => {
      event.preventDefault();
      toast.info(`Novo ${item.tipo} adicionado abaixo`);
    },
    CRIAR_GRUPO_ACIMA: event => {
      event.preventDefault();
      toast.info(`Novo Grupo adicionado acima`);
    },
    CRIAR_GRUPO_ABAIXO: event => {
      event.preventDefault();
      toast.info(`Novo Grupo adicionado abaixo`);
    },

  }

  const keyMap = {
    CRIAR_IGUAL_ACIMA: "ctrl+up",
    CRIAR_IGUAL_ABAIXO: "ctrl+down",

    CRIAR_GRUPO_ACIMA: "ctrl+alt+g",
    CRIAR_GRUPO_ABAIXO: "ctrl+g",

    CRIAR_SUB_GRUPO_ACIMA: "ctrl+alt+a",
    CRIAR_SUB_GRUPO_ABAIXO: "ctrl+a",

    CRIAR_SERVICO_ACIMA: "ctrl+alt+s",
    CRIAR_SERVICO_ABAIXO: "ctrl+s",

    EXCLUIR: "ctrl+del"
  };

  return (
    <ExpansionPanel
      key={item.id}
      classes={{ root: classes.painel }}>

      <HotKeys keyMap={keyMap} handlers={handleAtalhosCabecalho}>
        <ExpansionPanelSummary className={focus} expandIcon={<ExpandMoreIcon />}>
          {createSummary(item, classes)}
        </ExpansionPanelSummary>
      </HotKeys>

      <ExpansionPanelDetails
        className={`${classes.detalheBase} ${detalhe}`}>
        <div className={classes.root}>
          {item.filhos && item.filhos.map(renderPainel)}
          {(!item.filhos || item.filhos === undefined) && <div className={classes.rootMemoria}><GridMemoria /></div>}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default function Sanfona({ valores }) {
  const classes = useStyles();

  const [itens, setItens] = useState(valores);

  const addGroup = () => {
    setItens([
      ...itens,
      {
        id: itens.length,
        tipo: 'GRUPO',
        filhos: [],
      }
    ])
  }

  return (
    <div className={classes.root}>
      {
        itens.map(renderPainel)
      }

    </div>
  );
}
