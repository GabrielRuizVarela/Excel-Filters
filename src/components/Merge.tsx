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


const StyledDiv = styled.div<{ branch: number }>`
  display: grid;
  grid-auto-flow: row;
  grid-column: ${(props) => props.branch + 1};
`;

function handleMerge(filterState: FilterState[], index: number) {
  const filter = filterState[index];
  const prev = structuredClone(filterState.find((f) => f.id === filter.prev));
  const mergeInto = filterState.find((f) => f.id === filter.mergeInto);
  if (!prev || !mergeInto) {
    return null;
  }
  console.log(mergeInto);
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

function Merge({ index, branch }: { index: number; branch: number }) {
  const id = useAppSelector((state) => state.filter[index].id);
  const filterState = useAppSelector((state) => state.filter);
  const mergeInto = useAppSelector((state) => state.filter[index].mergeInto);
  // const options = useAppSelector((state) => state.filter[index].options);
  const prev = useAppSelector((state) => state.filter[index].prev);
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
    <StyledDiv branch={branch}>
      <h1>Merge {id}</h1>
      <p>{prev}</p>
      <span>Merge Into Filter</span>

      <input
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
      <span>Options</span>

      <select
        name="merge-options"
        id="merge-options"
        onChange={(e) =>
          dispatch(updateOptions({ action: e.target.value, index }))
        }
      >
        <option value="stacked">Stacked</option>
        <option value="sideways">Side by Side</option>
      </select>
      <span>Display</span>
      <input
        type="checkbox"
        name="display"
        id="display"
        checked={useAppSelector((state) => state.filter[index].display)}
        onChange={(e) =>
          dispatch(updateDisplay({ display: e.target.checked, index }))
        }
      />
      <button
        type="button"
        onClick={() => {
          dispatch(incrementIdCounter());
          dispatch(addFilter({ index, branch, idCounter }))
        }}
      >
        Add Filter
      </button>
      <button type="button" onClick={() => dispatch(removeFilter(index))}>
        Remove Filter
      </button>
    </StyledDiv>
  );
}

export default Merge;
