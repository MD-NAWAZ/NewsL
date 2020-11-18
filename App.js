import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from "./src/screens/Home";
import Business from "./src/screens/Business";
import Health from "./src/screens/Health";
import Entertainment from "./src/screens/Entertainment";
import Sports from "./src/screens/Sports";
import Technology from "./src/screens/Technology";
import NewsDetailScreen from "./src/screens/NewsDetailScreen";
import SearchScreen from "./src/screens/SearchScreen";
import {View,StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {Provider as NewsProvider} from "./src/context/NewsContext";
import {navigate, setNavigator} from "./src/Navigation/NavigationRef";

  const tab = createMaterialTopTabNavigator({
    TopNews:{
      screen:Home,
      navigationOptions:{
        title : "Top News",
        headerTitleStyle : {
          fontWeight: "bold",
          fontSize: 200
        }
      }
    },
    Business:Business,
    Health:Health,
    Sports:Sports,
    Entertainment:Entertainment,
    Technology:Technology,
    SearchBar:SearchScreen
    
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: false,
    tabBarOptions: {
      scrollEnabled :true,
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: 'black',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 3,
      },
    },
  }

  );
  
const Homestack = createStackNavigator({
  Tab : {
    screen : tab,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#e60000',
      },
      headerTintColor: '#FFFFFF',
      title: 'News Laundry',
      headerRight: 
        <View>
          <Icon
          raised
          name='search'
          type='font-awesome'
          color='#f50'
          onPress={() => navigate("SearchBar")} />
          </View>
    },
  },
  NewsDetail : {
    screen :  NewsDetailScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#e60000',
      },
      headerTintColor: '#FFFFFF',
      title: 'News Laundry',
    },  
  }
})

const App = createAppContainer(Homestack);

export default () => {
  return (
    <NewsProvider>
      <App
      ref = {(navigator)=>{setNavigator(navigator)}}
      />
    </NewsProvider>
  )
}

