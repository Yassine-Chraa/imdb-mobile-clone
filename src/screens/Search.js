import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  useColorScheme,
  TextInput,
  StatusBar,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {white, orange, yellow, black, lightGray} from '../helpers/Color';
import {Icon, Image} from 'react-native-elements/';
import {genres} from '../helpers/Genres';
import Colors from '../helpers/Colors';

const Container = ({children}) => {
  const isDarkMode = useColorScheme() === 'dark';
  if (Platform.OS === 'ios') {
    return (
      <View style={{flex: 1, backgroundColor: this.isDark() ? black : white}}>
        {children}
      </View>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? black : white,
          marginTop:
            Platform.OS === 'ios'
              ? getStatusBarHeight()
              : StatusBar.currentHeight,
        }}>
        {children}
      </SafeAreaView>
    );
  }
};
class Search extends Component {
  state = {
    data: [],
  };
  getData = text => {
    const {type} = this.props.route.params;

    fetch(
      `https://api.themoviedb.org/3/search/${type}?api_key=dcc997409325c8732c5e7c4a287a4536&query=${text}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({data: responseJson.results});
      })
      .catch(error => {
        console.error(error);
      });
  };
  isDark = () => {
    return useColorScheme() === 'dark';
  };
  render() {
    const {type} = this.props.route.params;
    const navigation = this.props.navigation;
    return (
      <Container>
        <StatusBar barStyle="dark-content" translucent />
        <View style={{marginTop: 16}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, paddingLeft: 10, alignSelf: 'flex-start'}}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="chevron-left"
                  size={32}
                  color={this.isdark ? white : black}
                />
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.headerTitle}>{`Search ${
              type === 'tv' ? 'TV Show' : 'Movies'
            }`}</Text>
            <View style={{flex: 1, paddingRight: 12}}></View>
          </View>
          <View style={styles.titleBar} />
          <Text style={styles.subTitle}>
            {`We'll help you find your favorite ${type.toLowerCase()}. Discover wonderful ${type.toLowerCase()}.`}
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <Icon name={'search'} size={20} style={{margin: 12}} />
          <View style={{alignSelf: 'center', flex: 1}}>
            <TextInput
              style={styles.searchInput}
              placeholder={type === 'tv' ?'Game of Thrones':'Avengers: End Game'}
              onChangeText={text => {
                this.getData(text);
              }}
              returnKeyType={'search'}
              autoCorrect={false}
            />
          </View>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={movie => (
            <View
            key={movie.item.id}
              style={{
                marginHorizontal: 16,
                marginBottom: 8,
                flexDirection: 'row',
              }}>
              <View style={{marginVertical: 8}}>
                <Image
                  source={{
                    uri:
                      'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                      movie.item.poster_path,
                  }}
                  style={{
                    height: 150,
                    width: 100,
                    borderRadius: 12,
                  }}
                  resizeMode={'cover'}
                  PlaceholderContent={<ActivityIndicator />}
                  onPress={() =>
                    navigation.navigate('MovieDetails', {id: movie.item.id,type})
                  }
                />
              </View>
              <View
                style={{
                  margin: 16,
                  marginTop: 32,
                  justifyContent: 'flex-start',
                  marginBottom: 24,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 8,
                  }}
                  numberOfLines={2}>
                  {movie.item.title}
                  {movie.item.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <Icon name="star" size={20} color={yellow} />
                  <Text style={{marginLeft: 4}}>
                    {movie.item.vote_average}/10
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', flexWrap: 'wrap'}}
                  numberOfLines={2}>
                  {movie.item.genre_ids.map((item, i) => {
                    if (i !== movie.item.genre_ids.length - 1) {
                      return <Text>{genres[item].name + ', '}</Text>;
                    } else {
                      return <Text>{genres[item].name}</Text>;
                    }
                  })}
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{
            marginHorizontal: 8,
            marginTop: 24,
            marginBottom: 8,
          }}
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    flex: 8,
    textAlign: 'center',
    alignSelf: 'center',
  },

  titleBar: {
    width: 40,
    height: 5,
    backgroundColor: Colors.blue,
    marginTop: 4,
    alignSelf: 'center',
  },
  subTitle: {
    margin: 16,
    marginTop: 12,
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    width: "70%",
  },
  searchContainer: {
    marginHorizontal: 16,
    backgroundColor: lightGray,
    borderRadius: 24,
    flexDirection: 'row',
  },
  searchInput: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    flex: 1,
    marginRight: 12,
  },
});
Search.propTypes = {
  navigation: PropTypes.object,
  type: PropTypes.oneOf(['tv', 'movie']),
};

export default Search;
