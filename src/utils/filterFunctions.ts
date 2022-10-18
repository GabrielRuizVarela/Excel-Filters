import * as XLSX from 'xlsx';

function fillEmptySlotsWithNull(arr: XLSX.CellObject[]) {
  return Array.from(arr, (_, i) => {
    if (!(i in arr)) return null;
    return arr[i];
  });
}

interface FilterInterface {
  type: string;
  value: string;
  range: string;
}

function splitSheetAtRange(
  rows: XLSX.CellObject[][],
  range: XLSX.Range,
): XLSX.WorkSheet {
  const startColNum = range.s.c;
  const endColNum = range.e.c;
  const startRowNum = range.s.r;
  const endRowNum = range.e.r;
  // split rows begining at startRowNum and ending at endRowNum
  const rowsSplit = rows
    .slice(startRowNum, endRowNum + 1)
    .map((row) => fillEmptySlotsWithNull(row));
  // split columns begining at startColNum and ending at endColNum
  const columnsSplit = rowsSplit.map((row) => {
    const rowSplit = row as XLSX.CellObject[];
    return rowSplit.slice(startColNum, endColNum + 1);
  });
  const result = XLSX.utils.aoa_to_sheet(columnsSplit);
  return result;
}

function filteredSheet(ws: XLSX.WorkSheet, filterProp: FilterInterface) {
  // type rowType =  string[];
  type FilterSheet = string[][];

  // find if splitedSheet has a row that contains the value of filter.value
  const filtered: FilterSheet = XLSX.utils.sheet_to_json(ws, {
    header: 1,
  });
  return filtered.filter((row) => {
    const rowString = row.join(' ');
    // console.log(row)
    if (filterProp.type === 'contains') {
      return rowString.includes(filterProp.value);
    }
    if (filterProp.type === 'does not contain') {
      return !rowString.includes(filterProp.value);
    }
    if (filterProp.type === 'match') {
      if (filterProp.value === '') return true;
      // return true if some cell in row is equal to filter.value
      return row.some((cell) => cell === filterProp.value);
    }
    if (filterProp.type === 'regex') {
      if (filterProp.value === '') return true;
      const regex = new RegExp(filterProp.value);
      return rowString.match(regex);
    }
    return row;
  });
}

export default function filterData(
  ws: XLSX.WorkSheet | null,
  filter: FilterInterface,
) {
  if (!ws) return null;
  // const ws = wb.Sheets[wb.SheetNames[parseInt(filter.sheet, 10)]];
  // const ws = wb
  const rows: XLSX.CellObject[][] = XLSX.utils.sheet_to_json(ws, {
    header: 1,
  });

  let range = XLSX.utils.decode_range(filter.range);
  const maxRange = XLSX.utils.decode_range(ws['!ref'] || 'A1');
  // if some value of key is -1, then it is not a valid range
  if (
    !range ||
    range.e.c === -1 ||
    range.e.r === -1 ||
    range.s.c === -1 ||
    range.s.r === -1 ||
    range.e.c > maxRange.e.c ||
    range.e.r > maxRange.e.r ||
    range.s.c > maxRange.e.c ||
    range.s.r > maxRange.e.r
  ) {
    range = maxRange;
  }
  const splitedSheet = splitSheetAtRange(rows, range) || ws;

  const newWs = XLSX.utils.aoa_to_sheet(filteredSheet(splitedSheet, filter));
  return newWs || ws;
}
