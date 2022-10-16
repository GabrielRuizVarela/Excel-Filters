import React from 'react';
import * as XLSX from 'xlsx';
import { useAppSelector } from '../app/hooks';
import filter from '../utils/filterFunctions';

export default function FileDisplay() {
  const wb = useAppSelector((state) => state.file.workbook);
  const filterType = useAppSelector((state) => state.counter.type);
  const filterValue = useAppSelector((state) => state.counter.value);
  const filterRange = useAppSelector((state) => state.counter.range);
  const filterSheet = useAppSelector((state) => state.counter.sheet);
  const filterSpec = {
    type: filterType,
    value: filterValue,
    range: filterRange,
    sheet: filterSheet,
  };
  const filteredData = filter(wb, filterSpec);
  let dataHtml = '<div></div>';
  try {
    // if filteredData is empty
    if (filteredData?.['!ref']) {
      dataHtml = XLSX.utils.sheet_to_html(filteredData);
    }
  } catch (e) {
    console.log(e);
  }
  return (
    <div>
      {wb ? (
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: dataHtml,
          }}
        />
      ) : (
        // XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]])
        <div>Not Loaded</div>
      )}
    </div>
  );
}
