import React from 'react';
import './App.css';
import styled from 'styled-components';
import Filter from './components/Filter';
import { useAppSelector } from './app/hooks';
import FileDisplay from './components/FileDisplay';
import LoadFile from './components/LoadFile';
import Merge from './components/Merge';

const FilterContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 10px;
`;

function App() {
  const filtersState = useAppSelector((state) => state.filter);

  return (
    <div className="App">
      <LoadFile />
      <FilterContainer>
        {filtersState.map((filter,index) =>
          // add style to Filter, grid-column: filter.branch
          filter.merge ? (
            <Merge index={index} key={filter.id} branch={filter.branch} />
          ) : (
            <Filter index={index} key={filter.id} branch={filter.branch} />
          ),
        )}
      </FilterContainer>
      <FileDisplay index={0} />
    </div>
  );
}

export default App;
