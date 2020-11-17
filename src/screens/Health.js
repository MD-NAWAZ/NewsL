import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GetNews from "../components/GetNews";

const Health = ({navigation}) => {

  return (
    <GetNews
    category="health"
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

export default Health;