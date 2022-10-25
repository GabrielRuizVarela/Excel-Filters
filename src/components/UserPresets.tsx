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
import { WorkSheet } from 'xlsx';
import { FirebaseContext } from './UserSection';
import { FilterState, loadPreset } from '../features/filterSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

export default function UserPresets({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  const auth = React.useContext(FirebaseContext);
  const db = getFirestore(auth.app);
  const [presets, setPresets] = React.useState<FilterState[][]>([]);
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
    setPresets(data as FilterState[][]);
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

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    ws: WorkSheet,
  ) => {
    setPresetSelected(e.target.value);
    if (e.target.value !== '') {
      setPresets(
        presets.map((preset, i) => {
          if (i === presetList.indexOf(e.target.value) - 1) {
            preset.map((filter) => {
              // eslint-disable-next-line no-param-reassign
              if (filter.filteredSheet) filter.filteredSheet = ws;
              return filter;
            });
            return preset;
          }
          return preset;
        }),
      );
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
  const wb = useAppSelector((state) => state.file.workbook);
  const sheet = useAppSelector((state) => state.file.sheet);

  return (
    <div className="card w-40 border border-secondary p-4 h-min">
      <h1
      className='text-2xl font-bold text-center'
      >Presets</h1>
      <div
        id="save-preset"
        className="flex flex-col items-center justify-center   "
      >
        <input
          className="input input-ghost input-xs input-bordered w-full max-w-xs text-accent"
          type="text"
          name="preset-name"
          id="preset-name"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-xs text-white bg-primary text-xs px-2"
        >
          Save
        </button>
      </div>
      {/* <span>Presets:</span> */}
      <select
        className="btn btn-xs text-white bg-primary text-xs p-0 h-2"
        name="presets"
        id="presets"
        value={presetSelected}
        onChange={(e) =>
          handleSelect(e, wb?.Sheets[wb.SheetNames[sheet]] || {})
        }
      >
        {presetList.map((preset) => (
          <option value={preset} key={nanoid()}>
            {preset=== ''?'Presets':preset}
          </option>
        ))}
      </select>
      {presetSelected !== '' ? (
        <button
          className="btn btn-xs text-white bg-accent self-center items-center text-xs w-20"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      ) : null}
    </div>
  );
}
