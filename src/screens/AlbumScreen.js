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

import { getAlbumImages } from 'common/networking/imgur';
import Header from 'components/AlbumScreen/Header';
import ImageList from 'components/ImageList';

export default class AlbumScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = { fabOpen: false };
    this.album = this.props.navigation.getParam("album");
  }

  componentDidMount() {
    getAlbumImages(this.props.navigation.getParam("loginfo"), this.album.id)
    .then((images) => {
      this.setState({ images: images });
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
            <Header albumTitle={ this.album.title } navigation={ this.props.navigation } />
            <ImageList items={ this.state.images } loginfo={ this.props.navigation.getParam("loginfo") } navigation={ this.props.navigation } />
            <Portal>
              <FAB.Group
                open={ this.state.fabOpen }
                icon={ 'dots-vertical' }
                actions={[
                  { icon: 'upload', onPress: () => console.log('Pressed upload') },
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
