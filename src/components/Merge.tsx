import React, { useEffect } from 'react';
import { utils } from 'xlsx';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  updateDisplay,
  updateOptions,
  updateMergeInto,
  addFilter,
  removeFilter,
  FilterState,
  updateFilteredSheet,
} from '../features/filterSlice';
import { incrementIdCounter } from '../features/fileSlice';

const StyledDiv = styled.div<{ branch: number; row: number }>`
  display: grid;
  grid-auto-flow: row;
  grid-column: ${(props) => props.branch + 1};
  grid-row: ${(props) => props.row + 2};

  width: 160px;
  .btn {
    width: 100%;
    height: min-content;
  }
`;

function handleMerge(filterState: FilterState[], index: number) {
  const filter = filterState[index];
  const prev = structuredClone(filterState.find((f) => f.id === filter.prev));
  const mergeInto = filterState.find((f) => f.id === filter.mergeInto);
  if (!prev || !mergeInto) {
    return null;
  }
  // const end = utils.decode_range(mergeInto?.filteredSheet?.['!ref']?.split(':')?.[1] || '');
  if (filter.mergeOptions === 'stacked') {
    const newWorksheet = utils.sheet_add_json(
      prev.filteredSheet || {},
      utils.sheet_to_json(mergeInto.filteredSheet || {}, { header: 1 }),
      // { origin: end.e.r + 1 || -1 },
      { origin: -1 },
    );
    return newWorksheet;
  }
  if (filter.mergeOptions === 'sideways') {
    const newWorksheet = utils.sheet_add_json(
      prev.filteredSheet || {},
      utils.sheet_to_json(mergeInto.filteredSheet || {}, { header: 1 }),
      { origin: -1 },
    );
    return newWorksheet;
  }
  return prev.filteredSheet || {};
}

function Merge({
  index,
  branch,
  row,
}: {
  index: number;
  branch: number;
  row: number;
}) {
  const id = useAppSelector((state) => state.filter[index].id);
  const filterState = useAppSelector((state) => state.filter);
  const mergeInto = useAppSelector((state) => state.filter[index].mergeInto);
  const idCounter = useAppSelector((state) => state.file.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateFilteredSheet({
        sheet: handleMerge(filterState, index),
        index,
      }),
    );
  }, [
    filterState.find((f) => f.id === filterState[index].prev)?.filteredSheet,
    mergeInto,
    id,
  ]);

  return (
    <StyledDiv branch={branch} row={row}>
      <div className="card bg-gray-900 p-4 grip gap-1 border border-secondary justify-center">
        <p className="self-center">ID: {id}</p>
        {/* <p>{prev}</p> */}
        <div className="flex gap-2 justify-center">
          <span>Show</span>
          <input
            type="checkbox"
            name="display"
            id="display"
            className="checkbox checkbox-accent self-center m-0"
            checked={useAppSelector((state) => state.filter[index].display)}
            onChange={(e) =>
              dispatch(updateDisplay({ display: e.target.checked, index }))
            }
          />
        </div>
        <div className="flex items-center justify-center">
          <span>Merge with:</span>
          <input
            className="input input-ghost input-xs input-bordered w-8 ml-1"
            type="text"
            id="merge-into"
            name="merge-into"
            placeholder="id"
            value={mergeInto}
            onChange={(e) =>
              dispatch(
                updateMergeInto({
                  mergeInto: parseInt(e.target.value, 10) || 0,
                  index,
                }),
              )
            }
          />
        </div>
        <span>Options</span>

        <select
          className="select select-xs select-accent w-full max-w-xs"
          name="merge-options"
          id="merge-options"
          onChange={(e) =>
            dispatch(updateOptions({ action: e.target.value, index }))
          }
        >
          <option value="stacked">Stacked</option>
          {/* <option value="sideways">Side by Side</option> */}
        </select>

        <div className="container grid grid-cols-2 gap-1">
          <button
            type="button"
            className="btn btn-xs text-white bg-primary text-xl p-0"
            onClick={() => {
              dispatch(incrementIdCounter());
              dispatch(addFilter({ index, branch, idCounter }));
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
        </div>
      </div>
    </StyledDiv>
  );
}

export default Merge;
