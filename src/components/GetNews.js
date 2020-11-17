import React, { useEffect,useContext,useState } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import {Context as NewsContext} from "../context/NewsContext";
import {Dimensions} from "react-native";
import {withNavigation} from "react-navigation";
import { NavigationEvents } from 'react-navigation';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const GetNews = ({category,navigation}) => {
    const {state,getNews} = useContext(NewsContext);
    const [refreshing,setrefreshing] = useState(false);
    
    
    const onRefreshing = async () => {
        setrefreshing(true);
        await getNews(category);
        setrefreshing(false);
      }
  return (
    <View style={styles.container}>
        <NavigationEvents        
        onDidFocus={()=>{onRefreshing()}}        
        />
        {!refreshing?
        <FlatList
        data={state}
        keyExtractor = {(item)=>{item.title}}
        onRefresh = {()=>onRefreshing()}
        refreshing = {refreshing}
        renderItem = {({item})=>{
          return (
          <View>
            <TouchableOpacity onPress={()=>{navigation.navigate("NewsDetail",{title:item.title,category})}}>
            <Card 
            containerStyle={{borderRadius:20}} >
          <Card.Title >{item.title}</Card.Title>
          <Card.Image
          source={{uri : item.urlToImage}}
          PlaceholderContent={<ActivityIndicator />}
          />
            </Card>
            </TouchableOpacity>
            
          </View>
          )
        }}
        />:<ActivityIndicator size="large" color="#ff3333"/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage:{
    height : height*0.15, 
    borderRadius:20
  }
});

export default withNavigation(GetNews);