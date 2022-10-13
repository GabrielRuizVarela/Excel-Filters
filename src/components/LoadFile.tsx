import React, { useEffect } from 'react';
import excelJS from 'exceljs';
import * as XLSX from 'xlsx';
import { updateFile } from '../features/counter/fileSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
// import { useAppSelector } from '../app/hooks';

export default function LoadFile() {
  const dispatch = useAppDispatch();
  const wb = useAppSelector((state) => state.file.woorkbook);

  async function handleFileAsync(e: React.FormEvent<HTMLInputElement>) {
    console.log('??');
    // const workbook = new excelJS.Workbook();
    const file = e.target.files[0];
    // await workbook.xlsx.load(file);
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    dispatch(updateFile(workbook));
    console.log(
      XLSX.utils.sheet_to_html(workbook.Sheets[workbook.SheetNames[0]]),
    );
  }
  return (
    <div>
      <input
        type="file"
        id="input_dom_element"
        onChange={(e) => handleFileAsync(e)}
      />
      {wb ? (
        <div dangerouslySetInnerHTML={{__html: XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]])}}/>
        // XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]])
      ) : (
        <div>Not Loaded</div>
      )}
    </div>
  );
}
