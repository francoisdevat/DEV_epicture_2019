import React, { Component } from 'react';

import {
  Appbar,
  Divider,
  Menu
} from 'react-native-paper';

import { revokeToken } from 'common/networking/imgur';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { loginfo: this.props.navigation.getParam("loginfo"), visibleMenu: false };
  }

  _closeMenu() {
    this.setState({ visibleMenu: false });
  }

  _disconnect() {
    // revokeToken();
    this.props.navigation.navigate("Log");
  }

  _openMenu() {
    this.setState({ visibleMenu: true });
  }

  _search() {
    this.props.navigation.navigate("Search");
  }

  render() {
    return (
      <Appbar.Header>
        <Appbar.Action icon="logout" onPress={ () => this._disconnect() } />
        <Appbar.Content title="My Albums" />
        <Appbar.Action icon="magnify" onPress={ () => this._search() } />
      </Appbar.Header>
    );
  }
};
