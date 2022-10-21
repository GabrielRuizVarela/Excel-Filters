import React, { useEffect } from 'react';
import {
  getFirestore,
  addDoc,
  collection,
  query,
  getDocs,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { nanoid } from '@reduxjs/toolkit';
import { FirebaseContext } from './UserSection';
import { FilterState, loadPreset } from '../features/filterSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

export default function UserPresets({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  const auth = React.useContext(FirebaseContext);
  const db = getFirestore(auth.app);
  const [presets, setPresets] = React.useState<FilterState[]>([]);
  const filterState = useAppSelector((state) => state.filter);
  const docRef = collection(db, 'users', user.uid, 'presets');
  const document = query(docRef);
  const getPresets = async () => {
    const querySnapshot = await getDocs(document);
    const data = querySnapshot.docs.map((d) => d.data().filters);
    setPresets(data as FilterState[]);
  };
  useEffect(() => {
    getPresets();
  }, []);
  // getPresets();
  // console.log(querySnapshot)

  // const snapshot = getDoc(docRef)
  // console.log(document);
  // console.log(snapshot);

  const handleSave = async () => {
    await addDoc(docRef, {
      filters: filterState.map((filter) => ({
        ...filter,
        filteredSheet: null,
      })),
    });
  };

  return (
    <div>
      <h1>Presets</h1>

      <button type="button" onClick={handleSave}>
        Save
      </button>
      {/* dropdown with presets */}
      <select
        name="presets"
        id="presets"
        defaultValue="presets"
        onChange={(e) => {
          if (e.target.value !== 'presets') {
            console.log(e.target.value);
            dispatch(loadPreset(presets[parseInt(e.target.value, 10)]));
          }
        }}
      >
        <option value="presets">Presets</option>
        {presets.map((preset, index) => (
          <option value={index} key={nanoid()}>
            {index}
          </option>
        ))}
      </select>
    </div>
  );
}
