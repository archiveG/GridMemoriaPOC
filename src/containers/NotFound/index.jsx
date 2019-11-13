import React from 'react';
import PropTypes from 'prop-types';

import Sanfona from 'containers/Sanfona'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ShortcutManager } from 'react-shortcuts';

const keymap = {
  CABECALHO: {
    CRIAR_IGUAL_ACIMA: ["ctrl+up"],
    CRIAR_IGUAL_ABAIXO: ["ctrl+down"],

    CRIAR_GRUPO_ACIMA: ["ctrl+alt+g"],
    CRIAR_GRUPO_ABAIXO: ["ctrl+g"],

    CRIAR_SUB_GRUPO_ACIMA: ["ctrl+alt+a"],
    CRIAR_SUB_GRUPO_ABAIXO: ["ctrl+a"],

    CRIAR_SERVICO_ACIMA: ["ctrl+alt+s"],
    CRIAR_SERVICO_ABAIXO: ["ctrl+s"],

    EXCLUIR: ["ctrl+del"]
  }
};

const shortcutManager = new ShortcutManager(keymap);

export default function NotFound() {

  function getChildContext() {
    return { shortcuts: shortcutManager }
  }

  const itens = [
    {
      id: '1',
      descricao: 'Grupo 01',
      tipo: 'GRUPO',
      codigoReferencia: '01',
      filhos: [
        {
          id: '2',
          descricao: 'SubGrupo 01.01',
          tipo: 'SUBGRUPO',
          codigoReferencia: '01.01',
          filhos: [
            {
              id: '3',
              descricao: 'Serviço 01.01.01',
              tipo: 'SERVICO',
              codigoReferencia: '01.01.01',
              referencial: 'SICRO',
              codigoAuxiliar: '123456',
              unidade: 'M²',
              quantidade: 120.00
            },
            {
              id: '4',
              descricao: 'Serviço 01.01.02',
              tipo: 'SERVICO',
              codigoReferencia: '01.01.02',
              referencial: 'SINAPI',
              codigoAuxiliar: '234567',
              unidade: 'M³',
              quantidade: 32.00
            }
          ]
        }, {
          id: '5',
          descricao: 'Serviço 01.02',
          tipo: 'SERVICO',
          codigoReferencia: '01.02',
          referencial: 'ORSE',
          codigoAuxiliar: '345678',
          unidade: 'UN',
          quantidade: 25.50
        }, {
          id: '6',
          descricao: 'Serviço 01.03',
          tipo: 'SERVICO',
          codigoReferencia: '01.03',
          referencial: 'SICRO',
          codigoAuxiliar: '456789',
          unidade: 'H',
          quantidade: 1276.15
        }, {
          id: '7',
          descricao: 'SubGrupo 01.04',
          tipo: 'SUBGRUPO',
          codigoReferencia: '01.04',
          filhos: [
            {
              id: '8',
              descricao: 'Serviço 01.04.01',
              tipo: 'SERVICO',
              codigoReferencia: '01.04.01',
              referencial: 'SINAPI',
              codigoAuxiliar: '567890',
              unidade: 'KM',
              quantidade: 11.00
            }, {
              id: '9',
              descricao: 'SubGrupo 01.04.02',
              tipo: 'SUBGRUPO',
              codigoReferencia: '01.04.02',
              filhos: [
                {
                  id: '10',
                  descricao: 'Serviço 01.04.02.01',
                  tipo: 'SERVICO',
                  codigoReferencia: '01.04.02.01',
                  referencial: 'NOVO_SICRO',
                  codigoAuxiliar: '678901',
                  unidade: 'KG',
                  quantidade: 400.00
                }
              ],
            }
          ]
        }
      ]
    },
    {
      id: '11',
      descricao: 'Grupo 02',
      tipo: 'GRUPO',
      codigoReferencia: '02',
      filhos: [
        {
          id: '12',
          descricao: 'SubGrupo 02.01',
          tipo: 'SUBGRUPO',
          codigoReferencia: '02.01',
          filhos: [
            {
              id: '13',
              descricao: 'Serviço 02.01.01',
              tipo: 'SERVICO',
              codigoReferencia: '02.01.01',
              referencial: 'SICRO',
              codigoAuxiliar: '123456',
              unidade: 'M²',
              quantidade: 120.00
            },
            {
              id: '14',
              descricao: 'Serviço 02.01.02',
              tipo: 'SERVICO',
              codigoReferencia: '02.01.02',
              referencial: 'SINAPI',
              codigoAuxiliar: '234567',
              unidade: 'M³',
              quantidade: 32.00
            }
          ]
        }, {
          id: '15',
          descricao: 'Serviço 02.02',
          tipo: 'SERVICO',
          codigoReferencia: '02.02',
          referencial: 'ORSE',
          codigoAuxiliar: '345678',
          unidade: 'UN',
          quantidade: 25.50
        }, {
          id: '16',
          descricao: 'Serviço 02.03',
          tipo: 'SERVICO',
          codigoReferencia: '02.03',
          referencial: 'SICRO',
          codigoAuxiliar: '456789',
          unidade: 'H',
          quantidade: 1276.15
        }, {
          id: '17',
          descricao: 'SubGrupo 02.04',
          tipo: 'SUBGRUPO',
          codigoReferencia: '02.04',
          filhos: [
            {
              id: '18',
              descricao: 'Serviço 02.04.01',
              tipo: 'SERVICO',
              codigoReferencia: '02.04.01',
              referencial: 'SINAPI',
              codigoAuxiliar: '567890',
              unidade: 'KM',
              quantidade: 11.00
            }, {
              id: '19',
              descricao: 'SubGrupo 02.04.02',
              tipo: 'SUBGRUPO',
              codigoReferencia: '02.04.02',
              filhos: [
                {
                  id: '20',
                  descricao: 'Serviço 02.04.02.01',
                  tipo: 'SERVICO',
                  codigoReferencia: '01.04.02.01',
                  referencial: 'NOVO_SICRO',
                  codigoAuxiliar: '678901',
                  unidade: 'KG',
                  quantidade: 400.00
                }
              ],
            }
          ]
        }
      ]
    }
  ]

  return (
    <div>
      <ToastContainer />
      <Sanfona valores={itens} />
    </div>
  );
}

NotFound.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
};
