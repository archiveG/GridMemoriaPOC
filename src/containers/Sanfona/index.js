import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GridMemoria from 'containers/GridMemoria';

import styles from './styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(styles);

function createSummary(item, classes) {

  if (item.tipo === 'GRUPO' || item.tipo === 'SUBGRUPO') {
    let id = item.tipo === 'GRUPO' ? `grup_desc_${item.id}` : `sub_desc_${item.id}`;

    return (
      <div className={classes.conteudoCabecalho}>
        <Typography
          id={`grup_codref_${item.id}`}
          component="div">
          <Box fontWeight="fontWeightBold" m={1}>
            {item.codigoReferencia}
          </Box>
        </Typography>
        <TextField
          id={id}
          classes={{ root: classes.textField }}
          label="Descrição"
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  } else {
    return (
      <div className={classes.conteudoCabecalho}>
        <Typography
          id={`serv_codref_${item.id}`}
          component="div">
          <Box fontWeight="fontWeightBold" m={1}>
            {item.codigoReferencia}
          </Box>
        </Typography>
        <TextField
          id={`serv_ref_${item.id}`}
          classes={{ root: classes.textField }}
          label="Referencial"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id={`serv_codaux_${item.id}`}
          classes={{ root: classes.textField }}
          label="Codigo Auxiliar"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id={`serv_desc_${item.id}`}
          classes={{ root: classes.textField }}
          label="Descrição"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id={`serv_qtd_${item.id}`}
          classes={{ root: classes.textField }}
          label="Quantidade"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id={`serv_unid_${item.id}`}
          classes={{ root: classes.textField }}
          label="Unidade Medida"
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }

};

function renderPainel(item) {
  let classes = useStyles();
 // let cabecalho = item.tipo === 'GRUPO' ? classes.cabecalhoGrupo : item.tipo === 'SUBGRUPO' ? classes.cabecalhoSubGrupo : classes.cabecalhoServico;
  let detalhe = item.tipo === 'GRUPO' ? classes.detalheGrupo : item.tipo === 'SUBGRUPO' ? classes.detalheSubGrupo : classes.detalheServico;
  let focus = item.tipo === 'GRUPO' ? classes.cabecalhoGrupoFocus : item.tipo === 'SUBGRUPO' ? classes.cabecalhoSubGrupoFocus : classes.cabecalhoServicoFocus;

  return (
    <div>
      <ExpansionPanel
        key={item.id}
        classes={{
          root: classes.painel,
        }}>
        <ExpansionPanelSummary
          className={focus}
          expandIcon={<ExpandMoreIcon />}
          // classes={{
          //   root: focus,
          // }}
        >
          {createSummary(item, classes)}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          className={`${classes.detalheBase} ${detalhe}`}>
          <div className={classes.root}>
            {item.filhos && item.filhos.map(renderPainel)}
            {(!item.filhos || item.filhos === undefined) && <div className={classes.rootMemoria}><GridMemoria /></div>}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default function Sanfona(props) {
  const classes = useStyles();

  console.log({ props });

  return (
    <div className={classes.root}>

      {
        props.itens.map(renderPainel)
      }

    </div>
  );
}
