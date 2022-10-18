import React from 'react';
import * as XLSX from 'xlsx';
import { useAppSelector } from '../app/hooks';
import filter from '../utils/filterFunctions';

export default function FileDisplay({ index }: { index: number }) {
  const filterType = useAppSelector((state) => state.filter[index].type);
  const filterValue = useAppSelector((state) => state.filter[index].value);
  const filterRange = useAppSelector((state) => state.filter[index].range);
  const filterSheet = useAppSelector((state) => state.filter[index].sheet);
  const filterSpec = {
    type: filterType,
    value: filterValue,
    range: filterRange,
    sheet: filterSheet,
  };
  let dataHtml = '<div></div>';
  const ws = useAppSelector((state) =>
    // find the sheet with display set to true
    state.filter.find((f) => f.display)?.filteredSheet,
  );
  
  try {
    // const ws = wb[wb.length-1].filteredSheet;
    const filteredData = filter(ws||null, filterSpec);
    // if filteredData is empty
    if (filteredData?.['!ref']) {
      dataHtml = XLSX.utils.sheet_to_html(filteredData);
    }
  } catch (e) {
    console.log(e);
  }
  return (
    <div>
      {ws ? (
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
