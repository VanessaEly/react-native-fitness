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

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    
  },
  container: {
    marginTop: 20,
  },
});