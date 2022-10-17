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

function Filter({ index }: { index: number }) {
  const filterType = useAppSelector((state) => state.filter[index].type);
  const filterValue = useAppSelector((state) => state.filter[index].value);
  const filterRange = useAppSelector((state) => state.filter[index].range);
  const filterSheet = useAppSelector((state) => state.filter[index].sheet);

  const dispatch = useAppDispatch();

  return (
    <div className="Filter">
      <h1>Filter</h1>
      <label htmlFor="filter-options-select">
        <select
          name="filter-options"
          id="filter-options-select"
          defaultValue={filterType}
          onChange={(e) => {
            dispatch(updateType({ action: e.target.value, index }));
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
            dispatch(updateValue({ action: e.target.value, index }));
          }}
        />
        <div id="filter-range">Range</div>
        <input
          type="text"
          name="filter-range"
          id="filter-range-select"
          value={filterRange}
          onChange={(e) =>
            dispatch(updateRange({ action: e.target.value, index }))
          }
        />
        <div id="filter-sheet">Sheet</div>
        <input
          type="text"
          name="filter-sheet"
          id="filter-sheet-select"
          value={filterSheet}
          onChange={(e) =>
            dispatch(updateSheet({ action: e.target.value, index }))
          }
        />
      </label>
    </div>
  );
}

export default Filter;
