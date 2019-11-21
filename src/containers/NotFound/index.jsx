import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Sanfona from 'containers/Sanfona';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NotFound() {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#005B95',
      },
      secondary: {
        main: '#474747',
      },
    },
  });

  const itens = [
    {
      id: '1',
      descricao: 'Grupo 01',
      tipo: 'GRUPO',
      codigoReferencia: '01',
      filhos: [
        {
          id: '2',
          descricao: 'Serviço 01.01',
          tipo: 'SERVICO',
          codigoReferencia: '01.01',
          referencial: 'ORSE',
          codigoAuxiliar: '345678',
          unidade: 'UN',
          quantidade: 25.50
        }, {
          id: '3',
          descricao: 'Serviço 01.02',
          tipo: 'SERVICO',
          codigoReferencia: '01.02',
          referencial: 'SICRO',
          codigoAuxiliar: '456789',
          unidade: 'H',
          quantidade: 1276.15
        },
      ]
    },

    {
      id: '4',
      descricao: 'Grupo 02',
      tipo: 'GRUPO',
      codigoReferencia: '02',
      filhos: [
        {
          id: '5',
          descricao: 'Serviço 02.01',
          tipo: 'SERVICO',
          codigoReferencia: '02.01',
          referencial: 'ORSE',
          codigoAuxiliar: '345678',
          unidade: 'UN',
          quantidade: 25.50
        }, {
          id: '6',
          descricao: 'Serviço 02.02',
          tipo: 'SERVICO',
          codigoReferencia: '02.02',
          referencial: 'SICRO',
          codigoAuxiliar: '456789',
          unidade: 'H',
          quantidade: 1276.15
        },
      ]
    }
  ]

  return (
    <div>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Sanfona valores={itens} />
      </ThemeProvider>
    </div>
  );
}
