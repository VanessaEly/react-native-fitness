import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions';

const entries = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_ENTRIES:
      // when entries are received, merge the current state with the entries returned
      return { ...state, ...action.entries };
    case ADD_ENTRY:
      // since we'll only have entries, we can merge the entry directly
      return { ...state, ...action.entry };
    default:
      return state;
  }
};

export default entries;