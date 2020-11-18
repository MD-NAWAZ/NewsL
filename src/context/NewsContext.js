import CreateDataContext from "./CreateDataContext";
import NewsAPI from "../API/NewsAPI";
import {navigate} from "../Navigation/NavigationRef";

const newsReducer = (state,action) => {
    switch(action.type) {
        case "get_news":
            return {Result:[...action.payload]};
        case "search_result":
            console.log(action.payload.length,action.type);
            return {Result:[...action.payload],searchShow:true};
        case "clear_state":
            return {state:null};
        default:
            return ;
    }
}

const clearState = (dispatch)=> {
    return () => {
        dispatch({type:"clear_state"});
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
        if(response){
            dispatch({type:"search_result",payload:response.data.articles});
        }
    }
}

export const {Provider,Context} = CreateDataContext(
    newsReducer,
    {getNews,searching,clearState},
    {Refreshing:true,searchShow:false,Result:[]}
)