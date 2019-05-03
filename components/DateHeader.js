import React from 'react';
import { Text } from 'react-native';
import { purple } from '../utils/colors';

export default DateHeader = ({ date }) => {
  return (
    // Texts always needs to be written inside of the <Text> native component, or it'll cause 
    // a render error.
    <Text style={{color: purple, fontSize: 25}}>
      {date}
    </Text>
  );
}