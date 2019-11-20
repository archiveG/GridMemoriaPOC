import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import GridMemoria from 'containers/GridMemoria';

import styles from './styles';
import Cabecalho from '../../components/Cabecalho';

const useStyles = makeStyles(styles);

const Painel = ({ itens, item, updateItens }) => {

  const addGroup = (tipo, novo) => {
    console.log('add Group');

    if(tipo === 'GRUPO') {
      updateItens([
        ...itens,
        {
          id: itens.length,
          tipo: 'GRUPO',
          codigoReferencia: '00',
          descricao: 'Novo Grupo',
          filhos: [
            {
              id: itens.length++,
              codigoReferencia: '00.00',
              descricao: 'Novo Serviço',
              tipo: 'SERVICO',
            }
          ],
        }
      ])
    } else if (tipo === 'SERVICO') {
      itens.forEach(a => {
        if(a.id === novo.id) {
          a.filhos.push({
            id: novo.filhos.length,
            codigoReferencia: '00.00',
            descricao: 'Novo Serviço',
            tipo: 'SERVICO',
          });
        }
      });

      updateItens([...itens]);
    }

  };


  console.log(`${item.codigoReferencia} - ${item.descricao}`)
  let classes = useStyles();
  let detalhe = item.tipo === 'GRUPO' ? classes.detalheGrupo : item.tipo === 'SUBGRUPO' ? classes.detalheSubGrupo : classes.detalheServico;

  return (
    <ExpansionPanel
      key={item.id}
      classes={{ root: classes.painel }}>

      <Cabecalho item={item} funcaoAdd={addGroup} />

      <ExpansionPanelDetails
        className={`${classes.detalheBase} ${detalhe}`}>
        <div className={classes.root}>
          {item.filhos && item.filhos.map(itemFilho => <Painel item={itemFilho} itens={itens} updateItens={updateItens} />)}

          {(!item.filhos || item.filhos === undefined) &&
            <div className={classes.rootMemoria}>
              <GridMemoria />
            </div>}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default function Sanfona({ valores }) {
  const classes = useStyles();

  const [itens, setItens] = useState(valores);

  return (
    <div className={classes.root}>
      {itens.map(item => <Painel itens={itens} item={item} updateItens={setItens} />)}
    </div>
  );
}
