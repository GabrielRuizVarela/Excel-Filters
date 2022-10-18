import React from 'react';
// import excelJS from 'exceljs';
import * as XLSX from 'xlsx';
import { updateFile } from '../features/counter/fileSlice';
import { useAppDispatch } from '../app/hooks';

export default function LoadFile() {
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
    <input
      type="file"
      onChange={(e) => handleFileAsync(e)}
      id="input_dom_element"
    />
  );
}
