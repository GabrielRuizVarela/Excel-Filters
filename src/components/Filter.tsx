import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import excelJS from 'exceljs';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  updateRange,
  updateValue,
  updateType,
  removeFilter,
  addFilter,
  updateFilteredSheet,
  updateDisplay,
} from '../features/counter/filterSlice';
import filterData from '../utils/filterFunctions';

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
  const filterSheet = useAppSelector((state) => state.file.sheet);
  const filterSpec = useAppSelector((state) => state.filter[index]);
  const wb = useAppSelector((state) => state.file.workbook);
  const filterState = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      updateFilteredSheet({
        sheet: filterData(
          filterSpec.prev !== null
            ? (
                filterState.find((f) => f.id === filterSpec.prev) || {
                  filteredSheet: null,
                }
              ).filteredSheet
            : wb?.Sheets[wb.SheetNames[filterSheet]] || {},
          {
            type: filterType,
            value: filterValue,
            range: filterRange,
          },
        ),
        index,
      }),
    );
  }, [
    filterType,
    filterValue,
    filterRange,
    filterSheet,
    wb,
    filterState.find((f) => f.id === filterSpec.prev)?.filteredSheet,
  ]);

  return (
    <div className="Filter">
      <h1>{useAppSelector((state) => state.filter[index].id)}</h1>
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
      </label>
      {/* <button type="button" onClick={() => dispatch(push(index))}> */}
      <button type="button" onClick={() => dispatch(addFilter(index))}>
        Add Filter
      </button>
      <button type="button" onClick={() => dispatch(removeFilter(index))}>
        Remove Filter
      </button>
      {/* display checkbox */}
      <input
        type="checkbox"
        name="display"
        id="display"
        checked={useAppSelector((state) => state.filter[index].display)}
        onChange={(e) =>
          dispatch(updateDisplay({ display: e.target.checked, index }))
        }
      />
    </div>
  );
}

export default Filter;
