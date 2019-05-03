import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { white, gray, purple } from '../utils/colors';

export default Steppers = ({ max, unit, step, value, onIncrement, onDecrement }) => {
  return (
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
      {Platform.OS === 'ios'
        ? <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
            // TouchableOpacity is used to give a opaque effect when the button is touched (or clicked)
            // bordertopRightRadius 0 is used to remove the redius of only this specific side
            style={[styles.iosBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}
            onPress={onDecrement}>
              <Entypo name='minus' size={30} color={purple} />
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.iosBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}
            onPress={onIncrement}>
              <Entypo name='plus' size={30} color={purple} />
            </TouchableOpacity>
          </View>
        : <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
          // TouchableOpacity is used to give a opaque effect when the button is touched (or clicked)
          // bordertopRightRadius 0 is used to remove the redius of only this specific side
          style={[styles.androidBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}
          onPress={onDecrement}>
            <FontAwesome name='minus' size={30} color={white} />
          </TouchableOpacity>
          <TouchableOpacity
          style={[styles.androidBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}
          onPress={onIncrement}>
            <FontAwesome name='plus' size={30} color={white} />
          </TouchableOpacity>
        </View>
      }
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', // horizontal main axis
    flex: 1,
    alignItems: 'center', // aligning cross axis (vertical) center
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',

  }
});