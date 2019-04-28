import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// this library is added by default to create-react-native-app
import { Ionicons } from '@expo/vector-icons';

/**
 *  Expo is a set of tools and services that allow us to build native (iOS and Android) applications with JavaScript
 *  Expo makes it easy to build mobile applications without having to write native code (e.g. Swift, Objective C, Java)
 */
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {
          /** Texts always needs to be written inside of the <Text> native component, or it'll cause 
            a render error.
            Icons -> Create-react-native app comes with Vector Icons by default.
            Directory of icons available can be found at https://expo.github.io/vector-icons/
          */
        }
        <Ionicons name='ios-pizza' color='red' size={100} />
        <Text>Open up App.js to start working on your app! Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
