import React from 'react';
// import excelJS from 'exceljs';
import * as XLSX from 'xlsx';
import { updateFile, updateSheet } from '../features/counter/fileSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export default function LoadFile() {
  const filterSheet = useAppSelector((state) => state.file.sheet);
  const dispatch = useAppDispatch();

  async function handleFileAsync(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      dispatch(updateFile(workbook));
    }
  }
  return (
    <>
      <input
        type="file"
        onChange={(e) => handleFileAsync(e)}
        id="input_dom_element"
      />
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
    </>
  );
}
