import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { black } from '../helpers/Color';

export default function Backdrop({children,backdrop}){
  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${backdrop}`,
        }}
        style={{
          flex: 1,
          height: Dimensions.get('window').width * 1.7777,
          width: Dimensions.get('window').width,
        }}
        resizeMode={'cover'}
      />
      <LinearGradient
        colors={['transparent', black]}
        locations={[0.45, 0.9]}
        style={styles.gradientImage}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          margin: 16,
          borderTopLeftRadius: 16,
        }}></View>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, margin: 16, borderTopLeftRadius: 16 }}>{children}</View>
    </View>
  );
};

Backdrop.propTypes = {
  children:PropTypes.any,
  backdrop:PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 2.5,
    backgroundColor: black,
  },
  gradientImage: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

