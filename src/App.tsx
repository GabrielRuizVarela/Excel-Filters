import React from 'react';
import './App.css';
import Filter from './components/Filter';
import { useAppDispatch } from './app/hooks';
import { addFilter } from './features/counter/filterSlice';
import FileDisplay from './components/FileDisplay';
import LoadFile from './components/LoadFile';

function App() {
  const [numberOfFilters] = React.useState(1);
  const filters = [];
  const dispatch = useAppDispatch();
  for (let i = 0; i < numberOfFilters; i += 1) {
    filters.push(<Filter index={i} key={i} />);
    dispatch(addFilter());
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
