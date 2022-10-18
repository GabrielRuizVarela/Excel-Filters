import React from 'react';
import './App.css';
import Filter from './components/Filter';
import { useAppSelector } from './app/hooks';
import FileDisplay from './components/FileDisplay';
import LoadFile from './components/LoadFile';

function App() {
  const numberOfFilters =(useAppSelector((state) => state.filter.length));
  const filters = [];
  // const dispatch = useAppDispatch();
  for (let i = 0; i < numberOfFilters; i += 1) {
    filters.push(<Filter index={i} key={i} />);
  }

  return (
    <div className="App">
      <LoadFile />
      {filters.map((filter) => filter)}
      
      <FileDisplay index={0} />
    </div>
  );
}

export default App;
