import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import FitnessSlider from './FitnessSlider';
import FitnessSteppers from './FitnessSteppers';
import DateHeader from './DateHeader';
import TextButton from './TextButton';

const SubmitBtn = ({ onPress }) => {
  return (
    /**
     * TouchableOpacity is one of the react-native's components that handles 'tapping gestures',
     * also called 'Touchables'.
     * Available handlers are: Button, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
     * and TouchableWithoutFeedback
     */
    <TouchableOpacity
      onPress={onPress}
    >
      <Text>Submit</Text>
    </TouchableOpacity>
  );
}

export default class AddEntry extends Component {
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

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));
  }
  reset = () => {
    const key = timeToString();

  }
  render() {
    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View>
          {
            /** 
              Icons -> Create-react-native app comes with Vector Icons by default.
              Directory of icons available can be found at https://expo.github.io/vector-icons/
            */
          }
          <Entypo name='emoji-happy' size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      )
    }

    return (
      <View>
        {
          // creating a new date and using toLocaleDateString to make it more readable, while passing
          // it to the DateHeader component
        }
        <DateHeader date={(new Date()).toLocaleDateString()} />
        <Text>{JSON.stringify(this.state)}</Text>
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
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
