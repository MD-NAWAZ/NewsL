import React, { useContext, useState } from "react";
import {View,StyleSheet,FlatList,TouchableOpacity,ActivityIndicator,ScrollView} from "react-native";
import {Button,TextInput} from "react-native-paper";
import {Card} from "react-native-elements";
import {Context as NewsContext} from "../context/NewsContext";
import SearchResultScreen from "./SearchResultScreen";

const SearchBar = ({navigation}) => {
    const [search,setSearch] = useState("");
    const {searching,state} = useContext(NewsContext);
    console.log(state.length);
    return (<>
        <ScrollView>
        <View style={{
            flexDirection: 'column',
            justifyContent: "flex-start",
            padding:20}}>
                
            <TextInput
            mode = "outlined"
            label = "Type Here"
            selectionColor = "#e60000"
            onChangeText = {setSearch}
            value = {search}
            />
            <Button
            dark = {true}
            mode = "contained"
            onPress={()=>{searching(search)}}>
                SEARCH!
            </Button>
        </View>
        <View style={{flex:2}}>
            <FlatList
            data={state}
            keyExtractor={(item)=>item.title}
            renderItem={({item})=>{
                return (
                    <View>
                        <TouchableOpacity onPress={()=>{navigation.navigate("NewsDetail",{title:item.title})}}>
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
            />
            
        </View>
        </ScrollView>
        </>
    )
}


export default SearchBar;