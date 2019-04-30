import React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import ComponentExamples from './components/ComponentExamples';

/**
 *  Expo is a set of tools and services that allow us to build native (iOS and Android) applications with JavaScript
 *  Expo makes it easy to build mobile applications without having to write native code (e.g. Swift, Objective C, Java)
 */
export default class App extends React.Component {
  render() {
    return (
      <View>
        {
          // Uncomment the following component to see switch, flatList and input components
        }
        {/* <ComponentExamples /> */}
        <AddEntry />
      </View>
    );
  }
}