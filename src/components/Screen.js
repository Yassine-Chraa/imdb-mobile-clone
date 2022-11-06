import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  StatusBar,
  SafeAreaView,
  Platform,
  Text
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {black, white} from '../helpers/Color';

import MenuIcon from '../assets/open-menu.png';

const Container = ({children}) => {
  const isDarkMode = useColorScheme() === 'dark';
  if (Platform.OS === 'ios') {
    return (
      <View style={{flex: 1}}>
        {children}
      </View>
    );
  } else {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: isDarkMode ? black : white}}>
        {children}
      </SafeAreaView>
    );
  }
};
class Screen extends Component {
  render() {
    const {children, type,navigation} = this.props
    return (
      <Container>
        <StatusBar barStyle="dark-content" translucent />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}>
          <Header
            leftComponent={
              <TouchableWithoutFeedback
                onPress={() => navigation.toggleDrawer()}>
                <FastImage source={MenuIcon} style={{width: 20, height: 20}} />
              </TouchableWithoutFeedback>
            }
            centerComponent={
              <Text style={{fontFamily: 'Montserrat-Bold',fontSize: 18,fontWeight: 'bold'}}>Stream+</Text>
            }
            rightComponent={
              <Icon
                name={'search'}
                size={20}
                onPress={() => navigation.navigate('Search', {type})}
              />
            }
            containerStyle={{
              backgroundColor: 'transparent',
              marginTop: 12,
            }}
          />
          {children}
        </ScrollView>
      </Container>
    );
  }
}
Screen.propTypes = {
  navigation: PropTypes.object,
  children: PropTypes.any.isRequired,
};
const styles = StyleSheet.create({});

export default Screen
