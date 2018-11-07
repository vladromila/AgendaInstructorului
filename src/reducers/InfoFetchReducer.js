import { INFO_FETCH } from "../actions/types";


export default (state=null,action)=>{
    switch(action.type){
        case INFO_FETCH:
        return action.payload;
        default:return state
    }
}