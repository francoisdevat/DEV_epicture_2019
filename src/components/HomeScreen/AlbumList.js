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
  ActivityIndicator,
  Button,
  Title
} from 'react-native-paper';

import { getImage } from 'common/networking/imgur';

class AlbumListItem extends Component {
  constructor(props) {
    super(props);
    const screenWidth = Dimensions.get("window").width;
    const scaleFactor = this.props.album.cover_width / screenWidth;
    this.state = { height: this.props.album.cover_height / scaleFactor };
  }

  componentDidMount() {
    getImage(this.props.loginfo, this.props.album.cover)
    .then((cover) => {
      this.setState({ cover: cover });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _checkAlbum() {
    this.props.navigation.navigate(
      "Album",
      {
        "album": this.props.album,
        "loginfo": this.props.loginfo
      });
  }

  render() {
    return (
      <View style={ style.listItemContainer } >
        <Title style={ style.listItemTitle }>{ this.props.album.title }</Title>
        <TouchableOpacity activeOpacity={ .75 } onPress={ () => this._checkAlbum() } style={[ style.listItemImageContainer, { height: this.state.height } ]}>
          <ActivityIndicator animating={ !this.state.cover } />
          <Image resizeMode="contain" source={{ uri: this.state.cover && this.state.cover.link || null }} style={ style.listItemImage } />
        </TouchableOpacity>
        <View style={ style.listItemBottomContainer }>
            <Button icon="image">
              { this.props.album.images_count || 0 }
            </Button>
            <Button icon="eye">
              { this.props.album.views || 0 }
            </Button>
        </View>
      </View>
    );
  }
};

export default class AlbumList extends Component {
  render() {
    console.log(this.props.items);
    return (
      <FlatList
        data={ this.props.items }
        keyExtractor={ (items) => items.link }
        ListEmptyComponent={
          () => {
            return (
              <Text style={ style.empty }>Such emptiness :'(</Text>
            );
          }
        }
        renderItem={({ item }) => {
          return (
            <AlbumListItem album={ item } loginfo={ this.props.loginfo } navigation={ this.props.navigation } />
          );
        }}
        style={ style.list }
        />
    )
  }
};

const style = StyleSheet.create({
  empty: {
    marginTop: "50%",
    textAlign: "center",
    textAlignVertical: "center"
  },
  list: {
    flex: 1
  },
  listItemBottomContainer: {
    borderTopColor: "black",
    borderTopWidth: .5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: "5%",
    marginRight: "5%",
    padding: 10
  },
  listItemContainer: {
    backgroundColor: "#fff",
    marginBottom: 10
  },
  listItemImage: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  listItemImageContainer: {
    alignContent: "center",
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    width: "90%"

  },
  listItemTitle: {
    borderBottomColor: "black",
    borderBottomWidth: .5,
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 10,
    padding: 5
  }
});
