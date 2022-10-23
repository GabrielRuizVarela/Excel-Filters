import React from 'react';
// import excelJS from 'exceljs';
import { read } from 'xlsx';
import styled from 'styled-components';
import { updateFile, updateSheet } from '../features/fileSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const StyledLoadFile = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  max-height: 4rem;
  max-width: min-content;
  .sheet-field {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 1fr 1fr;
  }
`;

export default function LoadFile() {
  const filterSheet = useAppSelector((state) => state.file.sheet);
  const dispatch = useAppDispatch();

  async function handleFileAsync(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const data = await file.arrayBuffer();
      const workbook = read(data);
      dispatch(updateFile(workbook));
    }
  }
  return (
    <StyledLoadFile>
      <input
        type="file"
        onChange={(e) => handleFileAsync(e)}
        id="input_dom_element"
      />
      <div className="sheet-field">
        <div id="filter-sheet">Sheet</div>
        <input
          type="text"
          name="filter-sheet"
          id="filter-sheet-select"
          value={filterSheet}
          onChange={(e) =>
            dispatch(updateSheet(parseInt(e.target.value, 10) || 0))
          }
        />
      </div>
    </StyledLoadFile>
  );
}
