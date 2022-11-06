import React from 'react';
import PropTypes from "prop-types";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  ActivityIndicator
} from 'react-native';
import {Image} from 'react-native-elements';
import {normalize} from '../../src/helpers/fontSize';
import Colors from '../helpers/Colors';

const MoviesRow = ({data, title,type,navigation}) => {
  return (
    <View style={{paddingTop:12}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',marginBottom:4}}>
        <Text style={styles.text}>{title}</Text>
        <TouchableNativeFeedback onPress={()=>navigation.navigate('ItemsList',{data,title,type})}>
          <Text style={styles.textMore}>More</Text>
        </TouchableNativeFeedback>
      </View>
      <FlatList
        data={data}
        renderItem={movie =>{ 
          return(
            <View key={movie.item.id}>
              <Image
                source={{
                  uri:
                    'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                     movie.item.poster_path,
                }}
                style={{
                  height: 180,
                  width: 120,
                  marginHorizontal: 4,
                  borderRadius: 12,
                }}
                resizeMode={'cover'}
                PlaceholderContent={<ActivityIndicator />}
                onPress={()=>navigation.navigate('MovieDetails',{id: movie.item.id,type})}
              />
            </View>
        )}}
        keyExtractor={movie => movie.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{margin: 8, marginTop: 4}}
      />
    </View>
  );
};
MoviesRow.propTypes = {
  navigation: PropTypes.object,
};
export default MoviesRow;

const styles = StyleSheet.create({
  text: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 0,
    fontFamily: 'Montserrat-SemiBold',
  },

  textMore: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    margin: 16,
    marginBottom: 0,
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'flex-end',
    color: Colors.blue,
  },
});
