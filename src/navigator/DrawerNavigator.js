import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {createDrawerNavigator, DrawerToggleButton} from '@react-navigation/drawer';
import TvShows from '../screens/TvShows';
import Movies from '../screens/Movies';
import {black, transparent,orange,white} from '../helpers/Color';

const CustomDrawerStyle = (color, focused, title) => {
  return (
    <Text
      style={{
        fontSize: focused ? 20 : 16,
        fontWeight: null,
        color: color,
        fontFamily: focused ? "Montserrat-Bold" : "Montserrat-Light",
      }}
    >
      {title}
    </Text>
  );
};
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveBackgroundColor: transparent,
        headerShown: false,
        drawerActiveTintColor:orange,
        drawerInactiveTintColor:white,
        drawerType:'slide',
        drawerStyle:{
          backgroundColor:black,
          width: '50%',
        },
      }}
      >
      
      <Drawer.Screen
        name="Movies"
        component={Movies}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "Movies"),
        }}
      />
      <Drawer.Screen
        name="TvShows"
        component={TvShows}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "TV Shows"),
        }}
      />
    </Drawer.Navigator>
  );
}
