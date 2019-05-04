import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'

class History extends Component {
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
    <View>
      {today
        ? <Text>{JSON.stringify(today)}</Text>
        : <Text>{JSON.stringify(metrics)}</Text>}
    </View>
  )
  // rendered if the item is null
  // arrow functions are only required if we are using the this keyword
  renderEmptyDate(formattedDate) {
    return (
      <View>
        <Text>No Data for this day</Text>
      </View>
    )
  }
  render() {
    const { entries } = this.props;

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}
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