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
  border-right: 2px solid white;
  justify-items: center;
  width: 100%;
  /* max-width:  */
  /* padding: 2rem; */
  grid-row: 1/3;
  align-self: start;
  max-height: fit-content;
`;

const StyledApp = styled.div`
  display: grid;
  justify-content: start;
  grid-gap: 2rem;
  justify-items: center;
  max-width: 100vw;

  .fileDispay {
    grid-column: 2/3;
    grid-row: 2/3;
    max-width: 80vw;
  }
  .UserSection {
    grid-column: 2/3;
  }
`;


function App() {
  const filtersState = useAppSelector((state) => state.filter);
  return (
    <StyledApp className="App">
      <FilterContainer>
        <LoadFile />
          {filtersState.map((filter, index) =>
            // add style to Filter, grid-column: filter.branch
            filter.merge ? (
              <Merge index={index} key={filter.id} branch={filter.branch} />
            ) : (
              <Filter
                index={index}
                key={filter.id}
                branch={filter.branch}
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
