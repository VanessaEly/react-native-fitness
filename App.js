import React from 'react';
import { View, Text, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import reducer from './reducers';
import AddEntry from './components/AddEntry';
import ComponentExamples from './components/ComponentExamples';
import FlexboxExamples from './components/FlexboxExamples';
import History from './components/History';
import EntryDetail from './components/EntryDetail';
import Live from './components/Live';
import ImgPicker from './components/ImgPicker';
import { purple, white } from './utils/colors';
import { setLocalNotification } from './utils/helpers';

// START DRAWER NAVIGATION EXAMPLE
// const Home = ({ navigation }) => (
//   <View>
//     <Text>Home view</Text>
//     <TouchableOpacity onPress={() => navigation.openDrawer()}>
//       <Text>Press here to open the drawer!</Text>
//     </TouchableOpacity>
//   </View>
// );

// const Dashboard = ({ navigation }) => (
//   <View>
//     <Text>Dashboard view</Text>
//     <TouchableOpacity onPress={() => navigation.openDrawer()}>
//       <Text>Press here to open the drawer!</Text>
//     </TouchableOpacity>
//   </View>
// );

// const Drawer = createAppContainer(
//   createDrawerNavigator({
//     History: {
//       screen: Home
//     },
//     AddEntry: {
//       screen: Dashboard
//     }
//   })
// );
// END NAVIGATION EXAMPLE

// adding a header status bar to the app
const FitnessStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const Tabs = createBottomTabNavigator({
  History: {
    // which component will be rendered
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />,
    }
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />,
    }
  },
  FlexboxExamples: {
    screen: FlexboxExamples,
    navigationOptions: {
      tabBarLabel: 'Flexbox',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='columns' size={30} color={tintColor} />,
    }
  },
  ComponentExamples: {
    screen: ComponentExamples,
    navigationOptions: {
      tabBarLabel: 'Components',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='th-list' size={30} color={tintColor} />,
    }
  },
  ImgPicker: {
    screen: ImgPicker,
    navigationOptions: {
      tabBarLabel: 'Camera',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='camera' size={30} color={tintColor} />,
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
});

const MainNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Tabs,
    },
    EntryDetail: {
      screen: EntryDetail,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }
    }
  }),
);
/**
 *  Expo is a set of tools and services that allow us to build native (iOS and Android) applications with JavaScript
 *  Expo makes it easy to build mobile applications without having to write native code (e.g. Swift, Objective C, Java)
 */
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      // providing the app store using our reducers
      <Provider store={createStore(reducer)}>
        {
          // flex one means that we are giving this component all available space, allowing
          // the child components to expend until the full size of the phone
        }
        <View style={{flex: 1}}>
          <FitnessStatusBar backgroundColor={purple} barStyle='light-content' />
          {
            // uncomment the drawer line and the components in the start of this file to
            // test drawer navigation (side menu triggered by click)
          }
          {/* <Drawer /> */}
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}