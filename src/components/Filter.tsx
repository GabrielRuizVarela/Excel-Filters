import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  updateRange,
  updateValue,
  updateType,
  removeFilter,
  addFilter,
  updateFilteredSheet,
  updateDisplay,
} from '../features/filterSlice';
import { incrementIdCounter } from '../features/fileSlice';
import filterData from '../utils/filterFunctions';

const FilterDiv = styled.div<{ branch: number; row: number }>`
  grid-column: ${(props) => props.branch + 1};
  grid-row: ${(props) => props.row + 2};
  width: 160px;
  max-height: fit-content;
  .btn {
    width: 100%;
    height: min-content;
  }
`;

function Filter({
  index,
  branch,
  row,
}: {
  index: number;
  branch: number;
  row: number;
}) {
  const filterType = useAppSelector((state) => state.filter[index].type);
  const filterValue = useAppSelector((state) => state.filter[index].value);
  const filterRange = useAppSelector((state) => state.filter[index].range);
  const filterSheet = useAppSelector((state) => state.file.sheet);
  const filterSpec = useAppSelector((state) => state.filter[index]);
  const wb = useAppSelector((state) => state.file.workbook);
  const filterState = useAppSelector((state) => state.filter);
  const idCounter = useAppSelector((state) => state.file.id);
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

  // const displayPrev = filterState.findIndex((f) => f.id === filterSpec.prev);
  return (
    <FilterDiv className="Filter" branch={branch} row={row}>
      <div className="card bg-gray-900 p-4 grid gap-1 border border-secondary">
        <div className="flex justify-center items-center">
          <span className='text-primary pr-2'>id:{filterSpec.id}</span>
          <span className="pr-2 font-xs"> Show</span>
          <input
            className="checkbox checkbox-accent self-center m-0"
            type="checkbox"
            name="display"
            id="display"
            checked={useAppSelector((state) => state.filter[index].display)}
            onChange={(e) =>
              dispatch(updateDisplay({ display: e.target.checked, index }))
            }
          />
        </div>
        <label htmlFor="filter-options-select">
          <select
            className="select select-xs select-accent w-full max-w-xs"
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
            className="input input-ghost input-xs input-bordered w-full max-w-xs"
            type="text"
            value={filterValue}
            onChange={(e) => {
              dispatch(updateValue({ action: e.target.value, index }));
            }}
          />
          <div id="filter-range">Range</div>
          <input
            className="input input-ghost input-xs input-bordered w-full max-w-xs"
            type="text"
            name="filter-range"
            id="filter-range-select"
            value={filterRange}
            onChange={(e) =>
              dispatch(updateRange({ action: e.target.value, index }))
            }
          />
        </label>
        <div className="container grid grid-cols-2 gap-1">
          <button
            className="btn btn-xs text-white bg-primary text-xl p-0"
            type="button"
            onClick={(e) => {
              if (
                filterState.some(
                  (f) =>
                    f.branch === filterSpec.branch && f.prev === filterSpec.id,
                )
              ) {
                e.currentTarget.classList.add('shake');
                return;
              }
              dispatch(incrementIdCounter());
              dispatch(addFilter({ index, branch, idCounter, row: row + 1 }));
            }}
          >
            +
          </button>
          <button
            className="btn btn-xs btn-outline text-white bg-secondary text-xl p-0"
            type="button"
            onClick={() => dispatch(removeFilter(index))}
          >
            -
          </button>
          <button
            className="btn btn-xs  text-white bg-primary px-2"
            type="button"
            onClick={(e) => {
              if (
                filterState.findIndex(
                  (f) => filterSpec.id === f.prev && f.branch === branch + 1,
                ) !== -1
              ) {
                e.currentTarget.classList.add('shake');
                return;
              }
              dispatch(incrementIdCounter());
              dispatch(addFilter({ index, branch: branch + 1, idCounter }));
            }}
          >
            +branch
          </button>
          <button
            className="btn btn-xs  text-white bg-secondary px-2"
            type="button"
            onClick={() => dispatch(addFilter({ index, merge: true, branch }))}
          >
            Merge
          </button>
        </div>
      </div>
    </FilterDiv>
  );
}

export default Filter;
