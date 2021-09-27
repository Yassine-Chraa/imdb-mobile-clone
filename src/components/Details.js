import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import {black, darkBlue,white} from '../helpers/Color'
import PlayButton from './PlayButton';

export default function Details({navigation,type,genres, overview, cast, images,recommendations,id}) {
  const [textShown, setTextShown] = useState(false);
  return (
    <View style={styles.movieDetailWrapper}>
      <View style={styles.movieDetail}>
        <View style={styles.tags}>
          {genres.map((genre, id) => {
            return (
              <View key={id} style={styles.genre}>
                <Text style={styles.text}>{genre.name}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.section}>
          <Text style={styles.Title}>Overview</Text>
          <TouchableWithoutFeedback onPress={() => setTextShown(!textShown)}>
            <Text
              numberOfLines={textShown ? 0 : 3}
              style={{fontFamily: 'Montserrat-Regular'}}>
              {overview}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.section}>
          <Text style={styles.Title}>Cast</Text>
          <FlatList
            data={cast}
            renderItem={ele => {
              return (
                <View>
                  <Image
                    source={{
                      uri:
                        'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                        ele.item.profile_path,
                    }}
                    style={styles.castImage}
                    resizeMode={'cover'}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                  <Text
                    numberOfLines={2}
                    style={{
                      width: 75,
                      fontFamily: 'Montserrat-Light',
                      fontSize: 14,
                      marginTop: 4,
                    }}>
                    {ele.item.name}
                  </Text>
                </View>
              );
            }}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.Title}>Images</Text>
          <FlatList
            data={images}
            renderItem={ele => {
              return (
                <View>
                  <Image
                    source={{
                      uri:
                        'https://www.themoviedb.org/t/p/w500/' +
                        ele.item.file_path,
                    }}
                    style={{
                      height: 100,
                      width: 100 * ele.item.aspect_ratio,
                      marginRight: 8,
                      borderRadius: 10,
                    }}
                    resizeMode={'cover'}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.Title}>Recommendations</Text>
          <FlatList
            data={recommendations}
            renderItem={ele => {
              return (
                <View>
                  <Image
                    source={{
                      uri:
                        'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                        ele.item.poster_path,
                    }}
                    style={styles.moviePoster}
                    resizeMode={'cover'}
                    PlaceholderContent={<ActivityIndicator />}
                    onPress={()=>{
                      navigation.push('MovieDetails',{id: ele.item.id,type})
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={{
                      width: 75,
                      fontFamily: 'Montserrat-Light',
                      fontSize: 14,
                      marginTop: 4,
                    }}>
                    {ele.item.title}
                  </Text>
                </View>
              );
            }}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <PlayButton id={id} type={type} navigation={navigation}/>
    </View>
  );
}

Details.propTypes = {
  navigation: PropTypes.object,
  route:PropTypes.object,
  genres: PropTypes.array,
  overview: PropTypes.string,
  cast: PropTypes.array,
  images: PropTypes.array,
  recommendations: PropTypes.array
};

Details.defaultProps = {
  genres: [],
  overview: '',
};

const styles = StyleSheet.create({
  movieDetailWrapper: {
    backgroundColor: black,
  },
  movieDetail: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: white,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '70%',
  },
  genre: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 0.75,
    borderColor: darkBlue,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  text: {
    color: '#444',
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
  },
  section: {
    marginTop: 32,
  },
  castImage: {
    width: 75,
    height: 100,
    borderRadius: 10,
    marginRight: 8,
  },
  moviePoster: {
    height:150,
    width:100,
    marginRight: 8,
    borderRadius: 10,
  },
  Title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginBottom: 4
  },
});
