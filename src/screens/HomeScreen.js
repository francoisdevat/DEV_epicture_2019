import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  FAB,
  Portal,
  Provider as PaperProvider,
} from 'react-native-paper';

import { getUserAlbums, getUserImages } from 'common/networking/imgur';
import Header from 'components/HomeScreen/Header';
import AlbumList from 'components/HomeScreen/AlbumList';

export default class HomeScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = { fabOpen: false };
  }

  componentDidMount() {
    getUserImages(this.props.navigation.getParam("loginfo"))
    .then((images) => {
      this.setState({ images: images });
    })
    .catch((error) => {
      console.log(error);
    });
    getUserAlbums(this.props.navigation.getParam("loginfo"))
    .then((albums) => {
      this.setState({ albums: albums });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <PaperProvider>
          <Portal.Host style={{ width: "100%" }}>
            <Header navigation={ this.props.navigation } />
            <AlbumList items={ this.state.albums } loginfo={ this.props.navigation.getParam("loginfo") } navigation={ this.props.navigation } />
            <Portal>
              <FAB.Group
                open={ this.state.fabOpen }
                icon={ 'dots-vertical' }
                actions={[
                  { icon: 'filter', onPress: () => console.log('Pressed filter') },
                  { icon: 'settings', onPress: () => console.log('Pressed settings') }
                ]}
                onStateChange={ ({ open }) => this.setState({ fabOpen: open }) }
                />
            </Portal>
          </Portal.Host>
        </PaperProvider>
      </>
      );
    }
};
