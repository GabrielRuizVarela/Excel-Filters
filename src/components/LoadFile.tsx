import React, { useEffect } from 'react';
import excelJS from 'exceljs';
// import { useAppSelector } from '../app/hooks';

async function handleFileAsync(e: React.FormEvent<HTMLInputElement> ) {
  console.log('??');
  const workbook = new excelJS.Workbook();
  const file = e.target.files[0];
  await workbook.xlsx.load(file);
  // const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  // const workbook = read(data);

  /* DO SOMETHING WITH workbook HERE */
  console.log(workbook.worksheets[0].getColumn('A').values);
  /* DO SOMETHING WITH workbook HERE */
}

export default function LoadFile() {
  return (
    <div>
      <input type="file" id="input_dom_element" onInput={(e)=>handleFileAsync(e)}/>
    </div>
  );
}
