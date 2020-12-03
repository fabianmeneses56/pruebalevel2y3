import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';

export default class tabTracks extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      url:
        'http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=829751643419a7128b7ada50de590067&format=json&limit=10&page=2',
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({loading: true});

    fetch(this.state.url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res.tracks.track,
          loading: false,
        });
      });
  };
  render() {
   
   
    return (
      <View>
        <ScrollView>
        {this.state.data.map((item) => (
           <Text>{item.name}</Text>
         ))}
        </ScrollView>
         
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