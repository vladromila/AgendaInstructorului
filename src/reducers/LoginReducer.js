import { INFO_UPDATE_LOGIN, LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";
import {NavigationActions} from 'react-navigation';

const INITIAL_STATE={email:'', password:'', user:null,error:'',loading:false}
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case INFO_UPDATE_LOGIN:
        return {...state,[action.payload.prop]:action.payload.value};
        case LOGIN:
        return{...state,loading:true}
        case LOGIN_SUCCESS:
        return{...INITIAL_STATE,loading:false}
        case LOGIN_FAIL:
        return{...state,error:action.payload,loading:false}
        default:
        return state
       
    }
}