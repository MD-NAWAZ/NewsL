import React, { useContext } from "react";
import {View,StyleSheet,Text} from "react-native";
import NewsDetail from "../components/NewsDetail";
import {Context as NewsContext} from "../context/NewsContext";

const NewsDetailScreen = ({navigation}) => {
    const {state:{Result}} = useContext(NewsContext);
    const title = navigation.getParam("title");
    const Detail = Result.find((ele)=> {
        return ele.title === title;
    })

    return (
        <NewsDetail
        Detail={Detail}
        />
    )
}

const styles = StyleSheet.create({

})

export default NewsDetailScreen;