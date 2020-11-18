import React, { useContext, useEffect, useState } from "react";
import {View,StyleSheet,FlatList,TouchableOpacity,ActivityIndicator,ScrollView,Text,Alert} from "react-native";
import {TextInput} from "react-native-paper";
import {Card,Icon,Button,SearchBar } from "react-native-elements";
import {Context as NewsContext} from "../context/NewsContext";
import SearchResultScreen from "./SearchResultScreen";
import { NavigationEvents } from 'react-navigation';


const SearchScreen = ({navigation}) => {
    const [search,setSearch] = useState("");
    const {searching,clearState,state:{Result,searchShow}} = useContext(NewsContext);
    const [load,setLoad] = useState(false);  
    const [error, setError] = useState("");
    
    const createTwoButtonAlert = () =>
    Alert.alert(
      "Oops! Search Key is too small",
      "Please search with word length of more than 3!",
      [
        { text: "OK", onPress: () => {setSearch("")} }
      ],
      { cancelable: true, onDismiss: () => {setSearch("") }}
    );
   
    const show = () => {
        if (search.length>2){
            setError("");
            searching(search);
            setLoad(true);
            setSearch("");
        }
        else{
            createTwoButtonAlert();
        }
        
    }
    const clear = () => {
        setSearch("");
        setError("");
    }
    return (<>
        <ScrollView
        keyboardShouldPersistTaps={'handled'}
        >
        <NavigationEvents
        onWillBlur={()=>{clear()}}
        />
        <View style={{
            flexDirection: 'column',
            justifyContent: "space-between",
            padding:20,
            
            }}>
                
                <SearchBar
                placeholder="Type Here..."
                onChangeText={setSearch}
                value={search}
                lightTheme={true}
                />
            <View style={{marginTop:5}}>
            <Button
            icon={
             <Icon
            name="search"
            size={30}
            color="white"
            />}
            onPress={()=>{show()}}
            raised={true}
            />
            </View>
        </View>
        {searchShow?
        <View style={styles.search}>
            <FlatList
            data={Result}
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
            
        </View>:null}
        {error?
        <View style={styles.search}>
        <Text style={styles.error}>{error}</Text>
        </View>:null}
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    search : {
        flex:2,
        margin:5
    },
    error : {
        flex:2,
        margin:5,
        fontSize:20,
        fontWeight:"bold",
        justifyContent:"center",
        color:"red"

    }
}    
)


export default SearchScreen;