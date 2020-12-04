import React from 'react';
import {StyleSheet, Button, FlatList, Linking} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {View, Text} from 'react-native-picasso';

export default class tabArtists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      randomUserData: [],
      LoadingExtraData: false,
      page: 1,
    };
  }
  componentDidMount() {
    this.LoadRandomData();
  }

  LoadRandomData = async () => {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=829751643419a7128b7ada50de590067&format=json&limit=30&page=${this.state.page}`,
    )
      .then((response) => response.json())

      .then((responseJson) => {
        this.setState({
          randomUserData:
            this.state.page === 1
              ? responseJson.topartists.artist
              : [
                  ...this.state.randomUserData,
                  ...responseJson.topartists.artist,
                ],
        });
      })
      .catch((error) => {
        console.log('Error selecting ramdom data: ' + error);
      });
  };

  renderCustomItem = ({item, index}) => {
    return (
      <View
        className="m-sm"
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <Card>
          <CardImage
            source={{
              uri:
                'https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png',
            }}
            title="Top Artistas"
          />
          <CardTitle
            title={item.name}
            subtitle={'oyentes: ' + item.listeners + ' personas'}
          />
          <CardContent>
            <Text className="mt-sm">{'MBID: ' + item.mbid}</Text>
            <Text className="mt-sm">{'streamable: ' + item.streamable}</Text>
            <Text className="mt-sm">
              para saber mas del artista presiona el siguiente boton:
            </Text>
          </CardContent>
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => Linking.openURL(item.url)}
              title="ver"
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
      () => this.LoadRandomData(),
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.randomUserData}
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
