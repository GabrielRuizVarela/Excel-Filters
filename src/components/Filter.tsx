import React, { useEffect } from 'react';
import { read } from 'xlsx';
import styled from 'styled-components';

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
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = read(data);

  /* DO SOMETHING WITH workbook HERE */
  console.log(workbook);
  /* DO SOMETHING WITH workbook HERE */
}

async function handleDropAsync(e) {
  console.log('!!');
  e.stopPropagation();
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  /* f is a File */
  const data = await f.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = read(data);

  /* DO SOMETHING WITH workbook HERE */
  console.log(workbook);
}

function Filter() {
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

  return (
    <div className="Filter">
      <input type="file" id="input_dom_element" />
      <DropFileDiv id="drop_dom_element" />
      <h1>Filter</h1>
    </div>
  );
}

export default Filter;
