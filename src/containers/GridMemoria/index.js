import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';
import { formatNumberCell, validateFormula } from './helper.js';
import DecimalNumberEditor from './editors/DecimalNumberEditor';

const WIDTH_COLLUMN_NUMBERS = 100;

const CASAS_DECIMAIS = 6;

const columns = [
  { key: 'descricao', name: 'Descrição', editable: true, frozen: true, width: 300 },
  {
    key: 'a', name: 'Comp. (a)', editable: true,
    editor: <DecimalNumberEditor />
  },
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
    'descricao': 'Sodales At Velit Limited',
    'a': 88,
    'b': 67,
    'c': 73,
    'd': 94,
    'e': 21,
    'f': 99,
    'equacao': 'A + B + C + D + E + F',
    'resultado': 93
  },
  {
    'id': 'D83454F3-FAED-608A-9379-667903A1A4C6',
    'descricao': 'Et Ultrices Institute',
    'a': 3,
    'b': 91,
    'c': 70,
    'd': 96,
    'e': 70,
    'f': 90,
    'equacao': 'A+B+C+D+E+F',
    'resultado': 8
  },
  {
    'id': '65ECC976-0E52-2161-BC65-81EB7FC5AD8C',
    'descricao': 'Augue Eu Ltd',
    'a': 46,
    'b': 97,
    'c': 55,
    'd': 8,
    'e': 30,
    'f': 1,
    'equacao': 'A+B+C+D+E+F',
    'resultado': 29
  },
  {
    'id': 'A01185D7-21D8-29EB-639A-49292E6C26CD',
    'descricao': 'Libero Nec Ligula Ltd',
    'a': 25,
    'b': 24,
    'c': 16,
    'd': 30,
    'e': 64,
    'f': 96,
    'equacao': 'A+B+C+D+E+F',
    'resultado': 13
  },
  {
    'id': 'BE494204-9B63-1BCF-6CA5-93D9D6D768D6',
    'descricao': 'Sagittis Nullam Vitae Corporation',
    'a': 82,
    'b': 57,
    'c': 74,
    'd': 45,
    'e': 43,
    'f': 12,
    'equacao': 'A+B+C+D+E+F',
    'resultado': 75
  },
  {
    'id': 'F7FBFF2C-8C09-07A4-510E-02F46CA926BA',
    'descricao': 'Ac PC',
    'a': 8,
    'b': 54,
    'c': 20,
    'd': 47,
    'e': 22,
    'f': 73,
    'equacao': 'A+B+C+D+E+F',
    'resultado': 18
  },
  {
    'id': 'ADB62523-7D10-B1F4-E7E6-34A01C4F5F18',
    'descricao': 'Posuere Cubilia Curae; Institute',
    'a': 92,
    'b': 92,
    'c': 96,
    'd': 58,
    'e': 82,
    'f': 50,
    'equacao': 'A+B+C+D+E+F',
    'resultado': 32
  },
  {
    'id': 'D16767F0-31C6-EEB3-556C-007B38DB468A',
    'descricao': 'Class PC',
    'a': 37,
    'b': 2,
    'c': 28,
    'd': 48,
    'e': 78,
    'f': 91,
    'equacao': 'A+B+C+D+E+F',
    'resultado': 65
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

    if (keyUpdated !== 'descricao' && keyUpdated !== 'equacao') {
      updated[keyUpdated] = formatNumberCell(updated[keyUpdated], CASAS_DECIMAIS);
    }


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
