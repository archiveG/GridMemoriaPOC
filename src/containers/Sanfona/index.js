import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { toast } from 'react-toastify';
import { Shortcuts} from 'react-shortcuts'

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

  const handleAtalhosCabecalho = (action, e) => {
    e.preventDefault();

    if (action === 'CRIAR_IGUAL_ACIMA') {
      toast.info(`Novo ${item.tipo} adicionado acima`);
    } else if (action === 'CRIAR_IGUAL_ABAIXO') {
      toast.info(`Novo ${item.tipo} adicionado abaixo`);
    } else {
      toast.info(`deafult`);
    }
  }

  return (
    <ExpansionPanel
      key={item.id}
      classes={{ root: classes.painel }}>

      <Shortcuts name="CABECALHO" handler={handleAtalhosCabecalho}>
        <ExpansionPanelSummary className={focus} expandIcon={<ExpandMoreIcon />}>
          {createSummary(item, classes)}
        </ExpansionPanelSummary>
      </Shortcuts>

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
