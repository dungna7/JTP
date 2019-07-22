/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Routes from './src/config/Routes'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      http: {},
      pushChatAllInfo: [],
    };
  };
  render() {
    return (
      Platform.select({
        ios: <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Routes />
        </KeyboardAvoidingView>,
        android: <Routes />,
      })
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
