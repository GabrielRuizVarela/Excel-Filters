import React from 'react';
import './App.css';
import styled from 'styled-components';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import Filter from './components/Filter';
import { useAppSelector } from './app/hooks';
import FileDisplay from './components/FileDisplay';
import LoadFile from './components/LoadFile';
import Merge from './components/Merge';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCHWxVIoSzooEmj2szF3P2nk1hoG1NSPA8',
  authDomain: 'excel-filters.firebaseapp.com',
  projectId: 'excel-filters',
  storageBucket: 'excel-filters.appspot.com',
  messagingSenderId: '842563428660',
  appId: '1:842563428660:web:89a86c24caa2c6ccb84561',
  measurementId: 'G-V6PY6PTFL1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
        {filtersState.map((filter, index) =>
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
