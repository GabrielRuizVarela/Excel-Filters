import React from 'react';
import * as XLSX from 'xlsx';
import { useAppSelector } from '../app/hooks';
import filter from '../utils/filterFunctions';

export default function FileDisplay({ index }: { index: number }) {
  const [fileName, setFileName] = React.useState('Filtered Data');
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
  const ws = useAppSelector(
    (state) =>
      // find the sheet with display set to true
      state.filter.find((f) => f.display)?.filteredSheet,
  );

  const filteredData = filter(ws || null, filterSpec);
  const newWb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWb, filteredData || {}, 'filtered');
  try {
    if (filteredData?.['!ref']) {
      dataHtml = XLSX.utils.sheet_to_html(filteredData);
    }
  } catch (e) {
    console.log(e);
  }
  return (
    <div>
      {ws ? (
        <>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: dataHtml,
            }}
          />
          <button
            type="button"
            onClick={() => XLSX.writeFile(newWb, `${fileName}.xlsx`)}
          >
            Download
          </button>
          <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />

        </>
      ) : (
        // XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]])
        <div>Not Loaded</div>
      )}
    </div>
  );
}
