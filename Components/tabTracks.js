import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
  Button,
  FlatList,
  Linking,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {View, Text} from 'react-native-picasso';

export default class tabTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      randomUserTrack: [],
      data: [],
      LoadingExtraData: false,
      page: 1,
    };
  }

  componentDidMount() {
    this.loadRandomTrack();
  }

  loadRandomTrack = async () => {
    const arr = [];

    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=829751643419a7128b7ada50de590067&format=json&page=${this.state.page}`,
    )
      .then((response) => response.json())

      .then((responseJson) => {
        this.setState({
          randomUserTrack:
            this.state.page === 1
              ? responseJson.tracks.track
              : [...this.state.randomUserTrack, ...responseJson.tracks.track],
        });
      })
      .catch((error) => {
        console.log('Error selecting ramdom data: ' + error);
      });
  };

  renderCustomItem = ({item, index}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Card>
          <CardTitle
            title={item.name}
            subtitle={'duration: ' + item.duration}
          />
          <CardContent>
            <Text className="mt-sm">{'Listeners: ' + item.listeners}</Text>
            <Text className="mt-sm">{'MBID: ' + item.mbid}</Text>
            <Text className="mt-sm">
              {'FULLTRACK: ' + item.streamable.fulltrack}
            </Text>
            <Text className="mt-sm">More information: </Text>
          </CardContent>
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => Linking.openURL(item.artist.url)}
              title={item.artist.name}
              color="blue"
            />
            <CardButton
              onPress={() => Linking.openURL(item.url)}
              title="Song"
              color="blue"
            />
          </CardAction>
        </Card>
      </View>
    );
  };

  keyExtractor = (item, index) => item.name;

  LoadMoreRandomData = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => this.loadRandomTrack(),
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.randomUserTrack}
          renderItem={this.renderCustomItem}
          keyExtractor={this.keyExtractor}
          onEndReachedThreshold={0.5}
          onEndReached={this.LoadMoreRandomData}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    marginTop: 20,
  },
});
