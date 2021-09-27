import React, {Component} from 'react';
import PropTypes from "prop-types";
import {View,StyleSheet,Text} from 'react-native';
import {normalize} from '../helpers/fontSize';
import MoviesRow from '../components/MoviesRow';
import Screen from '../components/Screen';
class TvShows extends Component {
  state = {
    popular: [],
    topRated: [],
    trending: [],
    isRefreshing: false,
  };
  componentDidMount = () => {
    fetch(
      'https://api.themoviedb.org/3/tv/popular?api_key=dcc997409325c8732c5e7c4a287a4536',
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          popular: responseJson.results,
        });
      })
      .catch(error => {
        console.error(error);
      });
    fetch(
      'https://api.themoviedb.org/3/tv/top_rated?api_key=dcc997409325c8732c5e7c4a287a4536',
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          topRated: responseJson.results,
        });
      })
      .catch(error => {
        console.error(error);
      });
      fetch(
        'https://api.themoviedb.org/3/trending/tv/week?api_key=dcc997409325c8732c5e7c4a287a4536',
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            trending: responseJson.results,
          });
        })
        .catch(error => {
          console.error(error);
        });
  };
  render() {
    return (
      <Screen navigation={this.props.navigation} type={'tv'}>
        <View>
          <Text style={styles.screenTitle}>Tv Shows</Text>
          <View style={styles.titleBar} />
        </View>
        <View>
          <MoviesRow navigation={this.props.navigation} data={this.state.popular} title={'Popular'} type={'tv'} />
          <MoviesRow navigation={this.props.navigation} data={this.state.topRated} title={'Top Rated'} type={'tv'} />
          <MoviesRow navigation={this.props.navigation} data={this.state.trending} title={'Trending'} type={'tv'} />
        </View>
      </Screen>
    );
  }
}
const styles = StyleSheet.create({
  screenTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: normalize(30),
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 16,
    marginBottom: 0,
  },

  titleBar: {
    width: 30,
    height: 5,
    backgroundColor: 'red',
    marginTop: 2,
    marginBottom: 12,
    marginLeft: 10,
  },
});
TvShows.propTypes = {
  navigation: PropTypes.object,
};
export default TvShows;
