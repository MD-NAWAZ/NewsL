import {AsyncStorage} from "@react-native-community/async-storage";
import CreateDataContext from "./CreateDataContext";
import trackerApi from "../Api/trackerApi";
import {navigate} from "../Navigation/navigationRef";

const authReducer = (state, action) => {
    switch(action.type) {
        case "add_error":
            return{...state,errorMessage:action.payload};
        case "signin":
            return{errorMessage:"",token:action.payload}
        case "clear_error_message":
            return{...state,errorMessage:""}
        case "signout":
            return{errorMessage:"", token:null}
        default:
            return state;
    }
};
const tryLocalSingin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        if(token){
            dispatch({type:"signin",
        payload:token});
        navigate("trackList");
    }
    else {
        navigate("signup");
    }
}
}
const clearErrorMessage = (dispatch) => {
    return ()=> {
        dispatch({type:"clear_error_message"})
    }
}
const signup = (dispatch)=> {
    return async ({Email,Name,Password}) => {
        try {
            const response = await trackerApi.post("/Signup", {Email,Name,Password});
            dispatch({type:"signin",
            payload:response.data.Token});

            console.log(response.data)
            await AsyncStorage.setItem("token",response.data.Token)
            navigate("trackList");
            
        }
        catch(e){
            dispatch({type:"add_error",payload:"Something went wrong with Signup"})

        }
    };
};

const signin = (dispatch)=> {
    return async ({Email, Password}) => {
        try{
            const response = await trackerApi.post("/Login",{Email,Password});
            await AsyncStorage.setItem("token",response.data.Token)
            dispatch({
                type:"signin",
                payload:response.data.token
            });
            navigate("trackList");
            console.log(state);
        }  
        catch(e){
            
            dispatch({type:"add_error",payload:"Something went wrong with Signin"})                        
        }      
    };
};

const signout = (dispatch)=> {
    return async () => {
            const res = await AsyncStorage.removeItem("token");
            dispatch({type:"signout"}); 
            navigate("signin");               
    };
};

export const {Provider, Context} = CreateDataContext(
    authReducer,
    {signup,signin,signout,clearErrorMessage,tryLocalSingin},
    {token:null,errorMessage:""}
    );