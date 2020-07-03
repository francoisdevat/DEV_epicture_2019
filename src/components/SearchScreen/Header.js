import React, { Component } from 'react';

import {
  Appbar,
  Divider,
  Menu
} from 'react-native-paper';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleMenu: false };
  }

  _back() {
    this.props.navigation.goBack();
  }

  _closeMenu() {
    this.setState({ visibleMenu: false });
  }

  _openMenu() {
    this.setState({ visibleMenu: true });
  }

  render() {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={ () => this._back() } />
        <Appbar.Content title="Search" />
        <Menu
          anchor={
            <Appbar.Action icon="dots-vertical" onPress={ () => this._openMenu() }/>
          }
          onDismiss={ () => this._closeMenu() }
          visible={ this.state.visibleMenu }>
          <Menu.Item icon="upload" title="Upload" />
          <Menu.Item icon="filter" title="Filter" />
          <Divider />
          <Menu.Item icon="settings" title="Settings" />
        </Menu>
      </Appbar.Header>
    );
  }
};
