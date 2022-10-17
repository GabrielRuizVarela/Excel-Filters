import React from 'react';
// import styled from 'styled-components';
// import excelJS from 'exceljs';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  updateRange,
  updateValue,
  updateType,
  updateSheet,
} from '../features/counter/filterSlice';
import LoadFile from './LoadFile';
import FileDisplay from './FileDisplay';

// const DropFileDiv = styled.div`
//   width: 100vw;
//   height: 100vh;
//   position: fixed;
//   top: 0px;
//   left: 0px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   opacity: 0;
//   z-index: -1;
// `;

function Filter() {
  const filterType = useAppSelector((state) => state.counter.type);
  const filterValue = useAppSelector((state) => state.counter.value);
  const filterRange = useAppSelector((state) => state.counter.range);
  const filterSheet = useAppSelector((state) => state.counter.sheet);

  const dispatch = useAppDispatch();

  return (
    <div className="Filter">
      <LoadFile />
      <h1>Filter</h1>
      <label htmlFor="filter-options-select">
        <select
          name="filter-options"
          id="filter-options-select"
          defaultValue={filterType}
          onChange={(e) => {
            dispatch(updateType(e.target.value));
          }}
        >
          <option value="contains">Contains</option>
          <option value="does not contain">Does not contain</option>
          <option value="match">Match</option>
          <option value="regex">Regex</option>
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => {
            dispatch(updateValue(e.target.value));
          }}
        />
        <div id="filter-range">Range</div>
        <input
          type="text"
          name="filter-range"
          id="filter-range-select"
          value={filterRange}
          onChange={(e) => dispatch(updateRange(e.target.value))}
        />
        <div id="filter-sheet">Sheet</div>
        <input
          type="text"
          name="filter-sheet"
          id="filter-sheet-select"
          value={filterSheet}
          onChange={(e) => dispatch(updateSheet(e.target.value))}
        />
      </label>
      <FileDisplay />
    </div>
  );
}

export default Filter;
