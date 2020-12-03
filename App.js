/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tabArtists from './Components/tabArtists';
import tabTracks from './Components/tabTracks';

export default class App extends React.Component {
  render(){
    const Tab = createBottomTabNavigator();
    return (
      <>
       <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="tabArtists" component={tabArtists}/>
            <Tab.Screen name="tabTracks" component={tabTracks}/>
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );
  }

};



