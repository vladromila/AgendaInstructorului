import { INFO_UPDATE_LOGIN, LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "./types";
import firebase from 'firebase';

export const LoginInfoUpdate=({prop,value})=>{
    return{
        type:INFO_UPDATE_LOGIN,
        payload:{prop,value}
    }
}
export const Login=({email,password})=>{
    return (dispatch)=>{
        dispatch({
            type:LOGIN
        });
firebase.auth().signInWithEmailAndPassword(email,password)
.then(user=>
    dispatch({
        type:LOGIN_SUCCESS,
        payload:user
    })
).catch(e=>dispatch({
    type:LOGIN_FAIL,
    payload:e.message
}))
    }
}
