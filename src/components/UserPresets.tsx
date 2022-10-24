import React, { useEffect } from 'react';
import {
  getFirestore,
  addDoc,
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
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
  const [presetName, setPresetName] = React.useState('Preset Name');
  const [presetList, setPresetList] = React.useState<string[]>([]);
  const [presetSelected, setPresetSelected] = React.useState<string>('');
  const [presetUuid, setPresetUuid] = React.useState<string[]>([]);
  const filterState = useAppSelector((state) => state.filter);
  const docRef = collection(db, 'users', user.uid, 'presets');
  const document = query(docRef);
  const getPresets = async () => {
    const querySnapshot = await getDocs(document);
    const data = querySnapshot.docs.map((d) => d.data().filters);
    const uuids = querySnapshot.docs.map((d) => d.id);
    setPresetUuid(uuids);
    setPresets(data as FilterState[]);
    setPresetList(['', ...querySnapshot.docs.map((d) => d.data().presetName)]);
  };
  useEffect(() => {
    getPresets();
  }, []);

  const handleSave = async () => {
    await addDoc(docRef, {
      presetName,
      filters: filterState.map((filter) => ({
        ...filter,
        filteredSheet: null,
      })),
    });
    getPresets();
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPresetSelected(e.target.value);
    if (e.target.value !== '') {
      dispatch(loadPreset(presets[presetList.indexOf(e.target.value) - 1]));
    }
  };

  const handleDelete = async () => {
    if (presetSelected !== '') {
      const index = presetList.findIndex((preset) => preset === presetSelected);
      const ref = doc(docRef, presetUuid[index - 1]);
      await deleteDoc(ref);

      getPresets();
    }
  };

  return (
    <div>
      <h1>Presets</h1>
      <div id="save-preset">
        <input
          type="text"
          name="preset-name"
          id="preset-name"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
        />
        <button type="button" onClick={handleSave}>
          Save as Preset
        </button>
      </div>
      <span>Presets:</span>
      <select
        name="presets"
        id="presets"
        value={presetSelected}
        onChange={(e) => handleSelect(e)}
      >
        {presetList.map((preset) => (
          <option value={preset} key={nanoid()}>
            {preset}
          </option>
        ))}
      </select>
      {presetSelected !== '' ? (
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      ) : null}
    </div>
  );
}
