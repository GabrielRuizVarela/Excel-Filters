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
import filterData from '../utils/filterFunctions';

const FilterDiv = styled.div<{ branch: number }>`
  display: grid;
  grid-auto-flow: row;
  grid-column: ${(props) => props.branch + 1};
  max-width: fit-content;
  max-height: fit-content;
`;

function Filter({ index, branch }: { index: number; branch: number }) {
  const filterType = useAppSelector((state) => state.filter[index].type);
  const filterValue = useAppSelector((state) => state.filter[index].value);
  const filterRange = useAppSelector((state) => state.filter[index].range);
  const filterSheet = useAppSelector((state) => state.file.sheet);
  const filterSpec = useAppSelector((state) => state.filter[index]);
  const wb = useAppSelector((state) => state.file.workbook);
  const filterState = useAppSelector((state) => state.filter);
  const prev = useAppSelector((state) => state.filter[index].prev);
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
    <FilterDiv className="Filter" branch={branch}>
      <h1>{useAppSelector((state) => state.filter[index].id)}</h1>
      <p>{prev}</p>
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
      <button
        type="button"
        onClick={() => dispatch(addFilter({ index, branch }))}
      >
        Add Filter
      </button>
      <button type="button" onClick={() => dispatch(removeFilter(index))}>
        Remove Filter
      </button>
      <button
        type="button"
        onClick={() => dispatch(addFilter({ index, branch: branch + 1 }))}
      >
        Add Filter in new branch
      </button>
      <input
        type="checkbox"
        name="display"
        id="display"
        checked={useAppSelector((state) => state.filter[index].display)}
        onChange={(e) =>
          dispatch(updateDisplay({ display: e.target.checked, index }))
        }
      />
      {/* addMerge button */}
      <button
        type="button"
        onClick={() => dispatch(addFilter({ index, merge: true }))}
      >
        Add Merge
      </button>
    </FilterDiv>
  );
}

export default Filter;
