import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  Provider as PaperProvider,
  Searchbar
} from 'react-native-paper';

import Header from 'components/SearchScreen/Header';

export default class SearchScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  render() {
    return (
      <>
        <PaperProvider>
          <Header navigation={ this.props.navigation } />
          <Searchbar placeholder="search" />
        </PaperProvider>
      </>
      );
    }
};
