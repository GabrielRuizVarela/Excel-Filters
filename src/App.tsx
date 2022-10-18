import React from 'react';
import './App.css';
import styled from 'styled-components';
import Filter from './components/Filter';
import { useAppSelector } from './app/hooks';
import FileDisplay from './components/FileDisplay';
import LoadFile from './components/LoadFile';

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
        {filtersState.map((filter) => (
          // add style to Filter, grid-column: filter.branch
          <Filter index={filter.id} key={filter.id} branch={filter.branch} />
        ))}
      </FilterContainer>
      <FileDisplay index={0} />
    </div>
  );
}

export default App;
