/* eslint-disable arrow-body-style */

import numeral from 'numeral';
import './css/style.css';

const tableContainer = document.getElementById('table');
let sortColumn = null;

const tableJson = [
  {
    id: 26,
    title: 'Побег из Шоушенка',
    imdb: 9.30,
    year: 1994,
  },
  {
    id: 25,
    title: 'Крёстный отец',
    imdb: 9.20,
    year: 1972,
  },
  {
    id: 27,
    title: 'Крёстный отец 2',
    imdb: 9.00,
    year: 1974,
  },
  {
    id: 1047,
    title: 'Тёмный рыцарь',
    imdb: 9.00,
    year: 2008,
  },
  {
    id: 223,
    title: 'Криминальное чтиво',
    imdb: 8.90,
    year: 1994,
  },
];

function setSortColumn() {
  if (sortColumn === null || sortColumn === 'imdb') {
    sortColumn = 'id';
  } else if (sortColumn === 'id') {
    sortColumn = 'title';
  } else if (sortColumn === 'title') {
    sortColumn = 'year';
  } else if (sortColumn === 'year') {
    sortColumn = 'imdb';
  }
}

function rowInnerHtml(
  {
    id, title, year, imdb,
  },
) {
  return `<td>#${id}</td>
    <td>${title}</td>
    <td>(${year})</td>
    <td>imdb: ${numeral(imdb).format('0.00')}</td>`;
}

function renderTable(tableData) {
  tableContainer.innerHTML = `
  <tr>
      <th>${sortColumn === 'id' ? `${String.fromCodePoint(0x2193)} ` : ''}id</th>
      <th>${sortColumn === 'title' ? `${String.fromCodePoint(0x2193)} ` : ''}Название</th>
      <th>${sortColumn === 'year' ? `${String.fromCodePoint(0x2193)} ` : ''}Год</th>
      <th>${sortColumn === 'imdb' ? `${String.fromCodePoint(0x2193)} ` : ''}imdb</th>
    </tr>
    `;

  tableData.forEach((rowData) => {
    const row = document.createElement('tr');
    row.dataset.id = rowData.id;
    row.dataset.title = rowData.title;
    row.dataset.year = rowData.year;
    row.dataset.imdb = rowData.imdb;
    row.className = 'dataRow';
    row.innerHTML = rowInnerHtml(rowData);

    tableContainer.appendChild(row);
  });
}

function sortData() {
  const rowsArray = [...document.querySelectorAll('tr.dataRow')].map((i) => {
    return { ...i.dataset };
  });

  rowsArray.sort((a, b) => {
    const aValue = sortColumn === 'id' ? Number(a[sortColumn]) : a[sortColumn];
    const bValue = sortColumn === 'id' ? Number(b[sortColumn]) : b[sortColumn];
    let res;
    if (aValue > bValue) res = 1;
    else if (aValue < bValue) res = -1;
    else if (aValue === bValue) res = 0;

    return res;
  });

  renderTable(rowsArray);
}

function initialRenderTable() {
  renderTable(tableJson);
}

initialRenderTable();

setInterval(() => {
  setSortColumn();
  sortData();
}, 2000);
