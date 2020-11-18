import React,{useContext, useEffect} from "react";
import {View,Text,StyleSheet,Image,Button,ScrollView} from "react-native";
import {Context as NewsContext} from "../context/NewsContext";
import {Dimensions} from "react-native"

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const NewsDetail = ({navigation,Detail}) => {

  return (
    <View style={styles.container}>
        <Image
        source = {{uri:Detail.urlToImage}}
        style = {{height : height*0.30}}        
        />
        <ScrollView>
        <View style={{flex:1,marginHorizontal:width*0.02,marginVertical:height*0.02}}>
        <Text style={{fontWeight:"bold",fontSize:height*0.03}}>{Detail.title}</Text>
        <Text style={{fontSize:height*0.02}}>{Detail.description}</Text>
        <Text style={{fontSize:height*0.02}}>{Detail.content}</Text>
        <Text style={{fontSize:height*0.02}}>{Detail.description}</Text>
        <Text style={{fontSize:height*0.02}}>{Detail.content}</Text>
        <Text style={{fontSize:height*0.02}}>{Detail.description}</Text>
        <Text style={{fontSize:height*0.02}}>{Detail.content}</Text>
        <Text style={{fontSize:height*0.02}}>{Detail.description}</Text>
        <Text style={{fontSize:height*0.02}}>{Detail.content}</Text>
        </View>
        
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  titleText: {
    marginHorizontal:width*0.02,
    fontWeight:"200",
    fontSize:height*0.02
  }
});

export default NewsDetail;
