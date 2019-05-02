import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Switch, KeyboardAvoidingView } from 'react-native';

export default class ComponentExample extends Component {
  state = {
    users: [
      {
          "name": "Proxima Midnight",
          "email": "proxima@appdividend.com"
      },
      {
          "name": "Ebony Maw",
          "email": "ebony@appdividend.com"
      },
    ],
    input: 'example input',
    showInput: false,
  }
  renderItem = ({item}) => {
    return <Text>A - {item.name}</Text>;
  }
  handleToggleSwitch = () => {
    this.setState(({ showInput }) => ({
      showInput: !showInput,
    }));
  }
  handleTextChange = (input) => {
    this.setState(() => ({ input }));
  }
  render() {
    const { input, showInput } = this.state;

    return (
      // KeyboardAvoidingView is used to avoid input view blocks when the keyboard is expanded
      // behavior padding defines that the way that the view will handle it is by adding padding
      <View behavior='padding' style={styles.container}>
        <Text>Show components</Text>
        <Switch value={showInput} onValueChange={this.handleToggleSwitch} />
        {showInput && (
            <KeyboardAvoidingView>
            {
              // Flatlist is the right way to render scrollable list, only loading the itens that are
              // currently visible to the user. We
              // If we simply use map, the list won't be scrollable, and if we use ScrollView, all
              // components will be loaded
              // SectionList - similar to flatlist, but also includes headers
            }
            <FlatList
              data={this.state.users}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <TextInput value={input} onChangeText={this.handleTextChange} style={styles.input} />
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}

// By moving styles away from the render function, you're making the code easier to understand.
// Naming the styles is a good way to add meaning to the low-level components in the render function.
// Making a stylesheet from a style object makes it possible to refer to it by ID instead
// of creating a new style object every time.
// It also allows to send the style only once through the bridge.
// All subsequent uses are going to refer to an id (not implemented yet).

// Another benefit is that StyleSheet validates the content within the style object as well.
// This means that should there be any errors in any properties or values in your style objects,
// the console will throw an error during compilation instead of at runtime.

// If you wanted to implement more than one style to a component, the style prop can accept styles as an array:
// <Text style={[styles.red, styles.greenLarge]}></Text>
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    
  },
  container: {
    marginTop: 20,
  },
});