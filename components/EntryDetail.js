import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import TextButton from './TextButton';

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    // getting the entryId that is passed along with the navigation.navigate function
    const { entryId } = navigation.state.params;

    const year = entryId.slice(0, 4); // from 0 to 3, 4th not included (-)
    const month = entryId.slice(5, 7); // from 5 to 7, 7 not included (-)
    const day = entryId.slice(8); // everything after 8th position

    return {
      title: `${month}/${day}/${year}`,
    };
  }
  shouldComponentUpdate (nextProps) {
    // entryDetails is still in the route stack even after we go back to another tab,
    // this line is to avoid rerender errors, because MetricCard would render passing undefined metrics
    // only render if the day has current information
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }
  reset = () => {
    const { remove, goBack, entryId } = this.props;
    // calling functions defined on mapDispatchToProps
    remove(); // removing entryId from the app state
    goBack(); // going back to the last tab
    // removing item from the AsyncStorage
    removeEntry(entryId);
  }
  render() {
    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton style={{margin: 20}} onPress={this.reset}>RESET</TextButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  }
});

const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    entryId,
    metrics: state[entryId], // getting the metrics details for that specific id
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    remove: () => dispatch(addEntry({
      // if today, initialize the object with the today value, else, empty the id
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : null
    })),
    // going back to the last tab
    goBack: () => navigation.goBack(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);