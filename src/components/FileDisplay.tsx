import React from 'react';
import { utils, writeFile } from 'xlsx';
import { useAppSelector } from '../app/hooks';
import filter from '../utils/filterFunctions';

export default function FileDisplay({ index }: { index: number }) {
  const [fileName, setFileName] = React.useState('Filtered Data');
  const filterType = useAppSelector((state) => state.filter[index].type);
  const filterValue = useAppSelector((state) => state.filter[index].value);
  const filterRange = useAppSelector((state) => state.filter[index].range);
  const filterSheet = useAppSelector((state) => state.file.sheet);
  const filterSpec = {
    type: filterType,
    value: filterValue,
    range: filterRange,
    sheet: filterSheet,
  };
  let dataHtml = '<div></div>';
  const ws = useAppSelector(
    (state) => state.filter.find((f) => f.display)?.filteredSheet,
  );

  const filteredData = filter(ws || null, filterSpec);
  const newWb = utils.book_new();
  utils.book_append_sheet(newWb, filteredData || {}, 'filtered');
  try {
    if (filteredData?.['!ref']) {
      dataHtml = utils.sheet_to_html(filteredData);
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
            onClick={() => writeFile(newWb, `${fileName}.xlsx`)}
          >
            Download
          </button>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </>
      ) : (
        <div>Not Loaded</div>
      )}
    </div>
  );
}
