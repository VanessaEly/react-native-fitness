import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import {
  getDailyReminderValue,
  getMetricMetaInfo,
  timeToString,
  clearLocalNotification,
  setLocalNotification,
} from '../utils/helpers';
import FitnessSlider from './FitnessSlider';
import FitnessSteppers from './FitnessSteppers';
import DateHeader from './DateHeader';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { addEntry } from '../actions';
import { white, purple } from '../utils/colors';

const SubmitBtn = ({ onPress }) => {
  return (
    /**
     * TouchableOpacity is one of the react-native's components that handles 'tapping gestures',
     * also called 'Touchables'.
     * Available handlers are: Button, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
     * and TouchableWithoutFeedback
     */

     // Platform: used to check which Operational System is currently running
     // In this case, we use it to set custom styles for each platform
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  );
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }
  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState((state) => {
      // adding the object step (got by getMetricMetaInfo) to the current value
      const count = state[metric] + step;
      // adding the step to the current state metric
      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    })
  }
  decrement = (metric) => {
    this.setState((state) => {
      // adding the object step (got by getMetricMetaInfo) to the current value
      const count = state[metric] - getMetricMetaInfo(metric).step;
      // adding the step to the current state metric
      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value,
    }));
  }
  submit = () => {
    const key = timeToString();
    const entry = this.state;
    
    // adding the new entry to the store by dispatching its add action, which will fire the reducer
    // that updates the state
    this.props.dispatch(addEntry({
      [key]: entry
    }));

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));

    this.toHome();

    // adding entry into AsyncStorage
    submitEntry({ key, entry });
    // clearing today's notification and setting a new one fro tomorrow
    clearLocalNotification()
      .then(setLocalNotification);
  }
  reset = () => {
    const key = timeToString();

    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue(),
    }));

    this.toHome();

    // removing entry from AsyncStorage
    removeEntry(key);
  }
  // going back to the previous screen
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddEntry', // passing were we want to go back from (current component)
    }))
  }
  render() {
    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          {
            /** 
              Icons -> Create-react-native app comes with Vector Icons by default.
              Directory of icons available can be found at https://expo.github.io/vector-icons/
            */
          }
          <Ionicons name='md-happy' size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton style={{padding: 10}} onPress={this.reset}>Reset</TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {
          // creating a new date and using toLocaleDateString to make it more readable, while passing
          // it to the DateHeader component
        }
        <DateHeader date={(new Date()).toLocaleDateString()} />
        {/* <Text>{JSON.stringify(this.state)}</Text> */}
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === 'slider'
                ? <FitnessSlider
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <FitnessSteppers
                    value={value}
                    onIncrement={() => this.increment(key)}
                    onDecrement={() => this.decrement(key)}
                    {...rest}
                  />
              }
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex 1 is used to garantee that the container's children will take all of it space
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    // changing the main axis from vertical (column) to horizontal (row)
    flexDirection: 'row',
    flex: 1,
    // aligning the cross axis, which in row is vertical
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
});

const mapStateToProps = (state) => {
  const key = timeToString();

  return {
    // today will only be available if the object is resetted (see getDailyReminderValue at helpers.js)
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

// connecting the component to the store provided by App.js provider
export default connect(mapStateToProps)(AddEntry);