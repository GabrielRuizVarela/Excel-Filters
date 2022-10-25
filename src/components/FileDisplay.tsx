import React from 'react';
import { utils, writeFile } from 'xlsx';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import filter from '../utils/filterFunctions';

const StyledFileDisplay = styled.div`
  /* max-width: 100%; */
  overflow: scroll;
  max-width: 70vw;
  /* border: 2px solid black; */
  padding: 1em;
  table {
  }
  tr:nth-child(even) {
    /* padding: 2rem; */
    background-color: #0000006a;
  }
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
  let dataHtml = '';
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
    <div className="flex flex-col border p-2">
      {dataHtml ? (
        <>
          <StyledFileDisplay
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: dataHtml,
            }}
          />
          <div className='self-center'>
            <input
              type="text"
              value={fileName}
              className="input input-ghost input-xs input-bordered w-full max-w-xs w-fit text-accent"
              onChange={(e) => setFileName(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-xs text-white bg-accent px-2 py-1 w-fit "
              onClick={() => writeFile(newWb, `${fileName}.xlsx`)}
            >
              Download
            </button>
          </div>
        </>
      ) : (
        <div>Not Loaded</div>
      )}
    </div>
  );
}
