import React from 'react';
import './App.css';
import styled from 'styled-components';
import Filter from './components/Filter';
import { useAppSelector } from './app/hooks';
import FileDisplay from './components/FileDisplay';
import LoadFile from './components/LoadFile';
import Merge from './components/Merge';
import UserSection from './components/UserSection';

const FilterContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-column-gap: 0.5rem;
  grid-gap: 0.5rem;
  justify-items: center;
  width: 100%;
  min-width: 20vw;
  max-width: 30vw;
  overflow-x: scroll;
  grid-row: 1/3;
  align-self: start;
  max-height: fit-content;
  padding-top: 4rem;

  @media (max-width: 768px) {
    grid-row: 2;
    grid-column: 1;
    border-right: none;
    border-bottom: 2px solid white;
    max-width: fit-content;
    justify-content: center;
    overflow-y: scroll;
    padding-top: 0;
  }
`;

const StyledApp = styled.div`
  display: grid;
  justify-content: start;
  grid-gap: 2rem;
  justify-items: center;
  grid-template-columns: auto 1fr;

  .fileDispay {
    grid-column: 2/3;
    grid-row: 2/3;
  }
  .UserSection {
    grid-column: 2/3;
    width: 100%;
    height: min-content;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    .fileDispay {
      grid-column: 1/1;
      grid-row: 3;
    }
    .UserSection {
      grid-column: 1;
      grid-row: 1;
    }
  }
`;

function App() {
  const filtersState = useAppSelector((state) => state.filter);
  return (
    <StyledApp className="App">
      <FilterContainer>
        <LoadFile />
        {filtersState
          .map((filter, index) =>
            filter.merge ? (
              <Merge
                index={index}
                key={filter.id}
                branch={filter.branch}
                row={filter.row}
              />
            ) : (
              <Filter
                index={index}
                key={filter.id}
                branch={filter.branch}
                row={filter.row}
              />
            ),
          )}
      </FilterContainer>
      <UserSection />
      <div className="fileDispay">
        <FileDisplay index={0} />
      </div>
    </StyledApp>
  );
}

export default App;
