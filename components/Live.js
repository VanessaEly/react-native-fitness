import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { purple, white } from '../utils/colors';
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';

export default class Live extends Component {
  state = {
    coords: null,
    status: 'denied',
    direction: '',
    // setting initial animation value
    bounceValue: new Animated.Value(1),
  }
  componentDidMount () {
    // getting current device's location permission
    Permissions.getAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === 'granted') {
          return this.setLocation();
        }

        this.setState(() => ({ status }));
      })
      .catch((error) => {
        console.ward('Error getting location permission: ', error);

        this.setState(() => ({ status: 'undetermined'}));
      });
  }
  askPermission = () => {
    // request permission to use device location
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === 'granted') {
          return this.setLocation();
        }
        this.setState(() => ({ status }));
      })
      .catch((error) => {
        console.ward('Error asking location permission: ', error);

        this.setState(() => ({ status: 'undetermined'}));
      });;
  }
  setLocation = () => {
    // watchPositionAsync will get the current location of the device, and it will check location updates
    Location.watchPositionAsync({
      enableHighAccuracy: true, // watch even for small lotation changes
      timeInterval: 1, // how ofter it updates
      distanceInterval: 1, // in which distance it updates
    // whenever the position changes, this function is called receiving the new coordinates
    }, ({ coords }) => {
      // returns the current direction
      const newDirection = calculateDirection(coords.heading);
      const { direction, bounceValue } = this.state;

      if (newDirection !== direction) {
        // sequence of animations that are executed in order
        Animated.sequence([
          // timely animate from its initial value (1) to 'toValue' during 200 miliseconds
          Animated.timing(bounceValue, { duration: 400, toValue: 1.4 }),
          //spring (little jumps) with a friction of 4
          Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
        ]).start(); // starting the animation
      }

      this.setState(() => ({
        coords,
        status: 'granted',
        direction: newDirection,
      }));
    });
  }
  render() {
    const { coords, bounceValue, status, direction } = this.state;

    if (status === null) {
      // This component renders a spinner
      return <ActivityIndicator style={{marginTop: 30}} />
    }

    if (status === 'denied') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You denied your location. You can fix this by visiting your settings and enabling
            location services for this app.
          </Text>
          <TouchableOpacity onPress={this.askPermission} style={styles.button}>
            <Text style={styles.buttonText}>
              Enable
            </Text>
          </TouchableOpacity>
        </View>
      )
    }

    if (status === 'undetermined') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You need to enable location services for this app.
          </Text>
          <TouchableOpacity onPress={this.askPermission} style={styles.button}>
            <Text style={styles.buttonText}>
              Enable
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
    // if granted
    return (
      <View style={styles.container}>
        <View style={styles.directionContainer}>
          <Text style={styles.header}>You're heading</Text>
          <Animated.Text
            // as bounceValue changes, we are going to scale and transform this specific text
            style={[styles.direction, { transform: [{ scale: bounceValue }] }]}
          >
            {direction}
          </Animated.Text>
        </View>
        <View style={styles.metricContainer}>
          <View style={styles.metric}>
            <Text style={[styles.header, {color: white}]}>
              Altitude
            </Text>
            <Text style={[styles.subHeader, {color: white}]}>
            {Math.round(coords.altitude * 3.2808)} feet
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.header, {color: white}]}>
              Speed
            </Text>
            <Text style={[styles.subHeader, {color: white}]}>
            {(coords.speed * 2.2369).toFixed(1)} MPH
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: white,
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: 'center',
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: purple,
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
});