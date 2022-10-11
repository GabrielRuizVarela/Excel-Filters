import React, { useEffect } from 'react';
import styled from 'styled-components';
import excelJS from 'exceljs';

const DropFileDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: -1;
`;

async function handleFileAsync(e) {
  console.log('??');
  const workbook = new excelJS.Workbook();
  const file = e.target.files[0];
  await workbook.xlsx.load(file);
  // const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  // const workbook = read(data);

  /* DO SOMETHING WITH workbook HERE */
  console.log(workbook);
  /* DO SOMETHING WITH workbook HERE */
}

// TODO: handle drop event is not working
async function handleDropAsync(e) {
  console.log('!!');
  e.stopPropagation();
  e.preventDefault();
  const workbook = new excelJS.Workbook();
  const file = e.dataTransfer.files[0];
  await workbook.xlsx.load(file);
  /* f is a File */
  // const data = await f.arrayBuffer();
  /* data is an ArrayBuffer */
  // const workbook = read(data);

  /* DO SOMETHING WITH workbook HERE */
  console.log(workbook);
}

function Filter() {
  const [filterType, setFilterType] = React.useState('contains');
  const [filterValue, setFilterValue] = React.useState('');
    // "xlsx": "https://cdn.sheetjs.com/xlsx-0.18.12/xlsx-0.18.12.tgz"
  useEffect(() => {
    const inputDomElement = document.getElementById('input_dom_element');
    const dropDomElement = document.getElementById('drop_dom_element');
    inputDomElement?.addEventListener('change', handleFileAsync, false);
    dropDomElement?.addEventListener('drop', handleDropAsync, false);
    return () => {
      inputDomElement?.removeEventListener('change', handleFileAsync, false);
      dropDomElement?.removeEventListener('drop', handleDropAsync, false);
    };
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };
  return (
    <div className="Filter">
      <input type="file" id="input_dom_element" />
      <DropFileDiv id="drop_dom_element" />
      <h1>Filter</h1>
      <label htmlFor="filter-options-select" >
        <select name="filter-options" id="filter-options-select" onChange={handleSelectChange} >
          <option value="contains">Contains</option>
          <option value="does not contain">Does not contain</option>
          <option value="match">Match</option>
        </select>
        <input type="text" onChange={handleInputChange} />
        <div id="filter-range">Range</div> 
        <input type="text" name="filter-range" id="filter-range-select" />
        <div id="filter-sheets">Sheets</div>
        <input type="text" name="filter-sheets" id="filter-sheets-select" />
      </label>
    </div>
  );
}

export default Filter;
