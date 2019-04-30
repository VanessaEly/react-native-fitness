// AsyncStorage is a simple, unencrypted, asynchronous, persistent,
// key-value storage system that is global to the app. It should be used instead of LocalStorage.


import { AsyncStorage } from 'react-native'
import { CALENDAR_STORAGE_KEY } from './calendar'

export const submitEntry = ({ entry, key }) => {
  // merge the entry received into the asyncStorage key that was passed
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }));
}

export const removeEntry = (key) => {
  // search for and remove item with that key from the asyncStorage
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
} 