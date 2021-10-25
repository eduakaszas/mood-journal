export const SET_ENTRIES = 'SET_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const EDIT_ENTRY = 'EDIT_ENTRY';

export function setEntries(entries) {
  return {
    type: SET_ENTRIES,
    payload: entries,
  };
}

export function addEntry(entry) {
  return {
    type: ADD_ENTRY,
    payload: entry,
  };
}

export function deleteEntry(entry) {
  return {
    type: DELETE_ENTRY,
    payload: entry,
  };
}

export function editEntry(entry) {
  return {
    type: EDIT_ENTRY,
    payload: entry,
  };
}
