import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { white } from '../utils/colors';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';
import { AppLoading } from 'expo';

class History extends Component {
  state ={
    ready: false,
  }
  componentDidMount () {
    const { dispatch } = this.props
    //receiving our entries
    fetchCalendarResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        // if we haven't entered any entry for today
        if (!entries[timeToString()]) {
          // we add the reminder to not forget to log data as the initial value
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })
      .then(() => this.setState(() => ({ready: true})))
  }
  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today
        ? <View>
          <DateHeader date={formattedDate} />
          <Text style={styles.noDataText}>
            {today}
          </Text>
        </View>
        // navigating to entry detail component and passing the key as entryId
        : <TouchableOpacity onPress={() => this.props.navigation.navigate(
          'EntryDetail',
          { entryId: key }
        )}>
          <MetricCard metrics={metrics} date={formattedDate} />
        </TouchableOpacity>
      }
    </View>
  )
  // rendered if the item is null
  // arrow functions are only required if we are using the this keyword
  renderEmptyDate(formattedDate) {
    return (
      <View style={styles.item}>
        <DateHeader date={formattedDate} />
        <Text style={styles.noDataText}>
          You didn't log any data on this day.
        </Text>
      </View>
    )
  }
  render() {
    const { entries } = this.props;
    const { ready } = this.state;
    
    if (ready === false) {
      return <AppLoading />
    }

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center', // align main axis into the center
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  }
});
// receive redux entries as props
function mapStateToProps (entries) {
  return {
    entries
  }
}
// connecting to get access to dispatch
export default connect(
  mapStateToProps,
)(History)