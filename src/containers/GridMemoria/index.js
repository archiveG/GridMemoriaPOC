import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';
import { formatNumberCell, validateFormula } from './helper.js';

const WIDTH_COLLUMN_NUMBERS = 100;

const CASAS_DECIMAIS = 3;

const columns = [
  { key: 'descricao', name: 'Descrição', editable: true, frozen: true, width: 400 },
  { key: 'a', name: 'Comp. (a)', editable: true, },
  { key: 'b', name: 'Largura (b)', editable: true, },
  { key: 'c', name: 'Altura (c)', editable: true, },
  { key: 'd', name: '(d)', editable: true, },
  { key: 'e', name: '(e)', editable: true, },
  { key: 'f', name: '(f)', editable: true, },
  { key: 'equacao', name: 'Equação', editable: true, width: 200 },
  { key: 'resultado', name: 'Resultado', editable: false, width: WIDTH_COLLUMN_NUMBERS }
];

const rows = [
  {
    'id': 'C6D3DADE-78FA-DB0E-1720-8FD97213387D',
    'descricao': 'Suporte apoio caixa d agua barrotes madeira de 1',
    'a': 2,
    'b': 2,
    'c': 12,
    'equacao': '((A^2) * B) + C',
    'resultado': 20
  }, {
    'id': 'D83454F3-FAED-608A-9379-667903A1A4C6',
    'descricao': 'Caixa d\'agua de polietileno',
    'a': 5,
    'b': 10,
    'c': 15,
    'd': 70,
    'equacao': 'A+B+C+D',
    'resultado': 100
  }, {
    'id': '65ECC976-0E52-2161-BC65-81EB7FC5AD8C',
    'descricao': 'Assento plastico, branco, para vaso sanitario',
    'a': 10,
    'b': 20,
    'c': 10,
    'd': 10,
    'e': 5,
    'f': 2,
    'equacao': '((A+B+C+D) * E) / F',
    'resultado': 125
  },{
    'id': 'C6D3DADE-78FA-DB0E-1720-8FD97213387D',
    'descricao': 'Suporte apoio caixa d agua barrotes madeira de 1',
    'a': 2,
    'b': 2,
    'c': 12,
    'equacao': '((A^2) * B) + C',
    'resultado': 20
  }, {
    'id': 'D83454F3-FAED-608A-9379-667903A1A4C6',
    'descricao': 'Caixa d\'agua de polietileno',
    'a': 5,
    'b': 10,
    'c': 15,
    'd': 70,
    'equacao': 'A+B+C+D',
    'resultado': 100
  }, {
    'id': '65ECC976-0E52-2161-BC65-81EB7FC5AD8C',
    'descricao': 'Assento plastico, branco, para vaso sanitario',
    'a': 10,
    'b': 20,
    'c': 10,
    'd': 10,
    'e': 5,
    'f': 2,
    'equacao': '((A+B+C+D) * E) / F',
    'resultado': 125
  },
];

class GridMemoria extends PureComponent {

  state = { rows };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    console.log('from Row ' + fromRow + ' to Row ' + toRow + ' Updated value: ', updated);

    let keyUpdated = '';
    for (let key in updated) {
      keyUpdated = key;
    }

    // if (keyUpdated !== 'descricao' && keyUpdated !== 'equacao') {
    //   updated[keyUpdated] = formatNumberCell(updated[keyUpdated], CASAS_DECIMAIS);
    // }


    let updatedRow = { ...this.state.rows[toRow] };

    const expr = [...updatedRow.equacao];
    const clearExpr = expr.filter(item => item !== ' ');

    const values = clearExpr.map(item => {
      const col = item.toLowerCase();
      let updatedRowElement = keyUpdated !== col ? updatedRow[col] : updated[keyUpdated];

      return undefined === updatedRowElement ? item : updatedRowElement;
    });

    const totalExpr = validateFormula(values, CASAS_DECIMAIS);
    updatedRow.resultado = totalExpr;

    this.setState(prevState => {
      const linhas = prevState.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        linhas[i] = { ...linhas[i], ...updated };
        linhas[i].resultado = totalExpr;
      }

      return { rows: linhas };
    });
  };

  render() {
    return (
      <ReactDataGrid
        columns={columns}
        width={100}
        rowGetter={i => this.state.rows[i]}
        rowsCount={this.getRowsCount()}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
      />
    );
  }

  getRowsCount = () => this.state.rows !== undefined ? this.state.rows.length : 0;

}

export default GridMemoria;
