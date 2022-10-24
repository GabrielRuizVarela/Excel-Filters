import React from 'react';
import { utils, writeFile } from 'xlsx';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import filter from '../utils/filterFunctions';

const StyledFileDisplay = styled.div`
  /* max-width: 100%; */
  overflow: scroll;
  max-width: 70vw;
  border: 2px solid black;
  padding: 1em;
`;

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
      dataHtml = utils.sheet_to_html(filteredData, { editable: true });
    }
  } catch (e) {
    console.log(e);
  }
  return (
    <div>
      {dataHtml ? (
        <>
          <StyledFileDisplay
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
