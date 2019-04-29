import React from 'react';
import { Text } from 'react-native';

export default DateHeader = ({ date }) => {
  return (
    // Texts always needs to be written inside of the <Text> native component, or it'll cause 
    // a render error.
    <Text>
      {date}
    </Text>
  );
}