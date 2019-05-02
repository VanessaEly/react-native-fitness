import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';

// Flex
// flex-direction has two values: row and column
// By default, every element in React Native has the flexDirection: column declaration, whoch means its Main Axis is vertical
// and its Cross Axis is horizontal. However, if you give an element a flexDirection: row declaration, the axes switch.

// In order to specify how children align themselves along the Main Axis, use the justifyContent.
// justifyContent has five different values: flex-start, center,flex-end,space-around,space-between


// All containers in React Native are flex containers by default.
// In traditional CSS flexbox, you would normally define a flex container with { display: flex; }
// On the web, the default flex-direction is row, in react native it's column, which lays out items vertically

class FlexboxExamples extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          // flex: used to tell the size of a flex box0-5
          // alignSelf: has the exact same options as alignItems (flex-start, flex-end, center, stretch),
          // used to allow child element override a specific positioning it received from its parent
        }
        <View style={[styles.box, {flex: 1}]}/>
        <View style={[styles.box, {flex: 2, alignSelf: 'flex-end'}]}/>
        <View style={[styles.box, {flex: 1}]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // could be column (default) or row, changes the main axis between vertical and horizontal
    // justifyContent is used to align items inside the main axis
    // justifyContent: 'flex-start', // start of the the Main Axis
    // justifyContent: 'center', // center of the the Main Axis
    // justifyContent: 'flex-end', // end of the the Main Axis
    // justifyContent: 'space-between', // space between each child is even along the Main Axis. ​​
    justifyContent: 'space-around', // even space around each element along the Main Axis. 
    // alignItems is used to align items inside the main axis
    // alignItems: 'flex-start' // start of the the Cross Axis. 
    alignItems: 'center', // center of the Cross Axis. ​
    // alignItems: 'flex-end', // end of the the Cross Axis. 
    // alignItems: 'stretch', // stretch every child element along the Cross Axis
    // as long as the child element does not have a specified height (flexDirection: row) or width (flexDirection: column). ​
  },
  box: {
    height: 50, // comment when align stretch and direction row
    width: 50, // comment when align stretch and direction column
    backgroundColor: '#e76e63',
    margin: 10,
  }
});

export default FlexboxExamples;