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

class ImageListItem extends Component {
  constructor(props) {
    super(props);
    const screenWidth = Dimensions.get("window").width;
    const scaleFactor = this.props.image.width / screenWidth;
    this.state = { height: this.props.image.height / scaleFactor };
  }

  render() {
    return (
      <View style={ style.listItemContainer } >
        <Title style={ style.listItemTitle }>{ this.props.image.name }</Title>
        <TouchableOpacity activeOpacity={ .75 } style={[ style.listItemImageContainer, { height: this.state.height } ]}>
          <Image resizeMode="contain" source={{ uri: this.props.image.link }} style={ style.listItemImage } />
        </TouchableOpacity>
        <View style={ style.listItemBottomContainer }>
            <Button icon="eye">
              { this.props.image.views || 0 }
            </Button>
            <Button icon="arrow-up-bold">
              { this.props.image.vote || 0 }
            </Button>
        </View>
        <Text style={{ marginBottom: "5%", textAlign: "center", display: this.props.image.description ? "flex" : "none" }}>{ this.props.image.description }</Text>
      </View>
    );
  }
};

export default class ImageList extends Component {
  render() {
    console.log(this.props.items);
    return (
      <FlatList
        data={ this.props.items }
        keyExtractor={ (items) => items.link }
        ListEmptyComponent={
          () => {
            return (
              <Text>Such emptiness :'(</Text>
            );
          }
        }
        renderItem={({ item }) => {
          return (
            <ImageListItem navigation={ this.props.navigation } image={ item } />
          );
        }}
        style={ style.list }
        />
    )
  }
};

const style = StyleSheet.create({
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
