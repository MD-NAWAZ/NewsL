import CreateDataContext from "./CreateDataContext";
import NewsAPI from "../API/NewsAPI";
import {navigate} from "../Navigation/NavigationRef";

const newsReducer = (state,action) => {
    switch(action.type) {
        case "get_news":
            return action.payload;
        case "search_result":
            console.log(action.payload.length);
            return action.payload;
        default:
            return state;
    }
}

const getNews = (dispatch) => {
    
    return async (category) => {
        const response = await NewsAPI.get(`top-headlines?country=in&category=${category}`);

        if (response){
            dispatch({type:"get_news",payload:response.data.articles});
        }
    }
}

const searching = (dispatch) => {
    return async (search) => {
        const response = await NewsAPI.get(`everything?q=${search}`);
        console.log(response.data.articles.length);
        if(response){
            dispatch({type:"search_result",payload:response.data.articles});
        }
    }
}

export const {Provider,Context} = CreateDataContext(
    newsReducer,
    {getNews,searching},
    {Refreshing:true,Response:""}
)