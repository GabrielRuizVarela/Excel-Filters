import * as XLSX from 'xlsx';
import { useAppSelector } from '../app/hooks';

// const resolveRange(range: string): string[] {
//   const [start, end] = range.split(':');
//   const [startCol, startRow] = start.split(/(\d+)/);
//   const [endCol, endRow] = end.split(/(\d+)/);
//   return
// }
function fillEmptySlotsWithNull(arr) {
  return Array.from(arr, (_, i) => {
    if (!(i in arr)) return null;
    return arr[i];
  });
}

interface FilterInterface {
  type: string;
  value: string;
  range: string;
  sheet: string;
}

function splitSheetAtRange(
  rows: XLSX.CellObject[][],
  range: XLSX.Range,
): XLSX.WorkSheet {
  console.log(range);
  const startColNum = range.s.c;
  const endColNum = range.e.c;
  const startRowNum = range.s.r;
  const endRowNum = range.e.r;
  // split rows begining at startRowNum and ending at endRowNum
  const rowsSplit = rows
    .slice(startRowNum, endRowNum + 1)
    .map((row) => fillEmptySlotsWithNull(row));
  // split columns begining at startColNum and ending at endColNum
  console.log(rowsSplit);
  const columnsSplit = rowsSplit.map((row) => {
    const rowSplit = row as XLSX.CellObject[];
    return rowSplit.slice(startColNum, endColNum + 1);
  });
  // const colSplit = rowsSplit.slice(startColNum, endColNum + 1);

  // for (let i = startColNum; i <= endColNum; i += 1) {
  //   for (let j = startRowNum; j <= endRowNum; j += 1) {

  //   }
  // }
  const result = XLSX.utils.aoa_to_sheet(columnsSplit, { skipHeader: true });
  return result;
}
export default function filterData(wb: XLSX.WorkBook, filter: FilterInterface) {
  // export default function filterData() {
  // const { type='contains', value='', range, sheet='Sheet1' } = filter;
  // const sheetName = sheet || 'Sheet1';
  // const rangeName = range || 'A1:ZZZ1000';
  // const filterValue = value || '';
  // const filterType = type || 'contains';
  // const wb = useAppSelector((state) => state.file.workbook);
  // const range = XLSX.utils.decode_range(filter.range || 'A1:ZZZ1000');
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, {
    header: 1,
  });

  /* column objects are generated based on the worksheet range */
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
  const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({
    /* for an array of arrays, the keys are "0", "1", "2", ... */
    key: String(i),
    /* column labels: encode_col translates 0 -> "A", 1 -> "B", 2 -> "C", ... */
    name: XLSX.utils.encode_col(i),
  }));
  console.log('columns', columns);
  console.log(range);
  // if(range) range=XLSX.utils.decode_range('A1');

  // console.log(rows, range, ws);
  // const wb = XLSX.utils.book_new();
  // const ws = XLSX.utils.aoa_to_sheet(data);
  // XLSX.utils.book_append_sheet(wb, ws, sheetName);
  // const wsFiltered = XLSX.utils.sheet_filter_ws(
  //   ws,
  //   filterValue,
  //   rangeName,
  //   filterType,
  // );
  // const wbFiltered = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(wbFiltered, wsFiltered, sheetName);
  // const dataFiltered = XLSX.utils.sheet_to_json(wsFiltered, { header: 1 });
  // return dataFiltered;
  return splitSheetAtRange(rows, range) || ws;
}
