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

const FilterDiv = styled.div<{ branch: number }>`
  /* display: grid; */
  /* grid-auto-flow: row; */
  grid-column: ${(props) => props.branch + 1};
  width: 150px;
  /* max-width: fit-content; */
  /* max-width: min-content; */
  /* gap: 0.25rem; */
  /* justify-items: center; */
  max-height: fit-content;
  /* padding: 0.5rem; */
  /* .filter-title {
    font-size: 1.2rem;
    font-weight: bold;
  } */
  .btn {
    width: 100%;
    height: min-content;
  }
`;

function Filter({ index, branch }: { index: number; branch: number }) {
  const filterType = useAppSelector((state) => state.filter[index].type);
  const filterValue = useAppSelector((state) => state.filter[index].value);
  const filterRange = useAppSelector((state) => state.filter[index].range);
  const filterSheet = useAppSelector((state) => state.file.sheet);
  const filterSpec = useAppSelector((state) => state.filter[index]);
  const wb = useAppSelector((state) => state.file.workbook);
  const filterState = useAppSelector((state) => state.filter);
  // const prev = useAppSelector((state) => state.filter[index].prev);
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

  const displayPrev = filterState.findIndex((f) => f.id === filterSpec.prev);
  return (
    <FilterDiv className="Filter" branch={branch}>
      <div className="card bg-gray-900 p-4 grid gap-1">
        <div className="flex gap-2 border border-primary px-1">
          <p>
            Prev:{' '}
            {
              // find the previous filter index in the filterState array
              displayPrev === -1 ? 'File' : displayPrev
            }
          </p>
          <p className="filter-title">ID: {index}</p>
        </div>
        <div className="flex justify-center items-center">
          {/* <div className="text-black"> */}
          <span className="pr-2 font-xs">Show</span>
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
        <div className="container grid grid-cols-2 gap-2">
          <button
            className="btn btn-xs btn-outline btn-primary text-xl p-0"
            type="button"
            onClick={() => {
              dispatch(incrementIdCounter());
              dispatch(addFilter({ index, branch, idCounter }));
            }}
          >
            +
          </button>
          <button
            className="btn btn-xs btn-outline btn-secondary text-xl p-0"
            type="button"
            onClick={() => dispatch(removeFilter(index))}
          >
            -
          </button>
          <button
            className="btn btn-xs btn-outline btn-primary px-2"
            type="button"
            onClick={() => {
              dispatch(incrementIdCounter());
              dispatch(addFilter({ index, branch: branch + 1, idCounter }));
            }}
          >
            +branch
          </button>
          <button
            className="btn btn-xs btn-outline btn-secondary px-2"
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
