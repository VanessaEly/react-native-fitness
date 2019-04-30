import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import AddEntry from './components/AddEntry';
import ComponentExamples from './components/ComponentExamples';

/**
 *  Expo is a set of tools and services that allow us to build native (iOS and Android) applications with JavaScript
 *  Expo makes it easy to build mobile applications without having to write native code (e.g. Swift, Objective C, Java)
 */
export default class App extends React.Component {
  render() {
    return (
      // providing the app store using our reducers
      <Provider store={createStore(reducer)}>
        <View>
          {
            // Uncomment the following component to see switch, flatList and input components
          }
          {/* <ComponentExamples /> */}
          <AddEntry />
        </View>
      </Provider>
    );
  }
}