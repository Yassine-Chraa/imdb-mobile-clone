import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements/';

/***** Components *****/
import Backdrop from '../components/Backdrop';
import Details from '../components/Details';
import {white} from '../helpers/Color';
import {TransitioningView} from 'react-native-reanimated';

class MovieDetails extends Component {
  state = {
    movieData: [],
    movieCast: [],
    movieImages: [],
    movieRecommendations: [],
    isLoaded: false,
  };
  getMovieData() {
    const {type, id} = this.props.route.params;
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=dcc997409325c8732c5e7c4a287a4536`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          movieData: responseJson,
        });
        this.getMovieCredits();
      })
      .catch(error => {
        console.error(error);
      });
  }
  getMovieCredits() {
    const {type, id} = this.props.route.params;
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=dcc997409325c8732c5e7c4a287a4536`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          movieCast: responseJson.cast,
        });
        this.getMovieImages();
      })
      .catch(error => {
        console.error(error);
      });
  }
  getMovieImages() {
    const {type, id} = this.props.route.params;
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/images?api_key=dcc997409325c8732c5e7c4a287a4536`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          movieImages: responseJson.backdrops,
        });
        this.getMovieRecommendations();
      })
      .catch(error => {
        console.error(error);
      });
  }
  getMovieRecommendations() {
    const {type, id} = this.props.route.params;
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=dcc997409325c8732c5e7c4a287a4536`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          movieRecommendations: responseJson.results,
          isLoaded: true,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentDidMount = () => {
    this.getMovieData();
  };
  render() {
    const {type} = this.props.route.params;
    const {movieData, movieCast, movieImages, movieRecommendations} =
      this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={{flexGrow: 1}}
          bounces={false}>
          <StatusBar translucent backgroundColor={'transparent'} />
          <Backdrop backdrop={this.state.movieData.backdrop_path}>
            {this.state.isLoaded ? (
              <>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: white,
                    }}>
                    {this.state.movieData.title}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 16,
                  }}>
                  <Icon name="star" size={20} color={'gold'} />
                  <Text style={styles.ratingText}>
                    {movieData.vote_average.toFixed(2)}/10
                  </Text>
                </View>
              </>
            ) : null}
          </Backdrop>
          {this.state.isLoaded ? (
            <Details
              navigation={this.props.navigation}
              genres={movieData.genres}
              overview={movieData.overview}
              cast={movieCast}
              images={movieImages}
              recommendations={movieRecommendations}
              type={type}
              id={this.props.route.params.id}
            />
          ) : null}
        </ScrollView>
        <View style={{marginLeft: 5, position: 'absolute', top: 40}}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <Icon name="chevron-left" size={32} color={white} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  ratingText: {
    color: white,
    marginLeft: 10,
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
});
MovieDetails.propTypes = {
  navigation: PropTypes.object,
  id: PropTypes.number,
  type: PropTypes.string,
};
export default MovieDetails;
