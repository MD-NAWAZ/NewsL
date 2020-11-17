import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GetNews from "../components/GetNews";

const Home = ({navigation}) => {

  return (
    <GetNews
    category="general"
    />    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;