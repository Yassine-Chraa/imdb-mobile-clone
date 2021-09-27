import React, {cloneElement, Component} from 'react';
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
} from 'react-native';
import {white, orange, yellow, black} from '../helpers/Color';
import {Icon, Image} from 'react-native-elements/';
import {genres} from '../helpers/Genres';

class ItemsList extends Component {
  state = {
    page: 2,
    data: this.props.route.params.data,
  };
  onReachEnd = () => {
    const page = this.state.page;
    const {type, title} = this.props.route.params;
    fetch(
      `https://api.themoviedb.org/3/${(title === 'Trending')?'trending/':''}${type === 'tv' ? 'tv' : 'movie'}/${title==='Trending'?'week':title.replace(' ', '_')
      .toLowerCase()}?api_key=dcc997409325c8732c5e7c4a287a4536&page=${page}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(prevState => ({
          page: prevState.page + 1,
          data: [...prevState.data, ...responseJson.results],
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  container = ({children}) => {
    if (Platform.OS === 'ios') {
      return <View>{children}</View>;
    } else {
      return <SafeAreaView>{children}</SafeAreaView>;
    }
  };
  isDark = () => {
    return useColorScheme() === 'dark';
  };
  render() {
    const {type, title} = this.props.route.params;
    const navigation = this.props.navigation;
    return (
      <this.container>
        <View style={{marginTop: 48}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, paddingLeft: 12, alignSelf: 'flex-start'}}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="chevron-left"
                  size={32}
                  color={this.isdark ? white : black}
                />
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.headerTitle}>{`${title} ${
              type === 'tv' ? 'TV Show' : 'Movies'
            }`}</Text>
            <View style={{flex: 1, paddingRight: 12}}></View>
          </View>
          <View style={styles.titleBar} />
        </View>
        <FlatList
          data={this.state.data}
          renderItem={(ele) => (
            <View
              key={ele.item.id}
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
                      ele.item.poster_path,
                  }}
                  style={{
                    height: 150,
                    width: 100,
                    borderRadius: 12,
                  }}
                  resizeMode={'cover'}
                  PlaceholderContent={<ActivityIndicator />}
                  onPress={() =>
                    navigation.navigate('MovieDetails', {id: ele.item.id,type})
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
                  {ele.item.title}
                  {ele.item.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <Icon name="star" size={20} color={yellow} />
                  <Text style={{marginLeft: 4}}>
                    {ele.item.vote_average}/10
                  </Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}} numberOfLines={2}>
                  {ele.item.genre_ids.map((item,i) => {
                    if(i !== ele.item.genre_ids.length-1){
                      return <Text>{genres[item].name+', '}</Text>
                    }else{
                      return <Text>{genres[item].name}</Text>
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
          onEndReached={this.onReachEnd()}
          onEndReachedThreshold={0.9}
        />
      </this.container>
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
    backgroundColor: orange,
    marginTop: 4,
    alignSelf: 'center',
  },
});
ItemsList.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object,
  type: PropTypes.oneOf(['tv', 'movie']),
  title: PropTypes.string,
};

export default ItemsList;
