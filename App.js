import React, {useEffect} from 'react';
import {
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Movies from './src/screens/Movies';
import TvShows from './src/screens/TvShows';
import HomeDrawerNavigator from './src/navigator/DrawerNavigator';
import MovieDetails from './src/screens/MovieDetails';
import ItemsList from './src/screens/ItemsList';
import Search from './src/screens/Search';
import WebView from './src/screens/WebView';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: false,
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerShown: false,
        }} >
        <Stack.Screen
          name="Home"
          component={HomeDrawerNavigator}
        />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="TvShows" component={TvShows} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        <Stack.Screen name="ItemsList" component={ItemsList} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="WebView" component={WebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
