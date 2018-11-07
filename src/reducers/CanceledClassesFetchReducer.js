import { CLASSES_CANCELED_FETCH } from "../actions/types";

export default (state=null,action)=>{
    switch(action.type){
        case CLASSES_CANCELED_FETCH:
        return action.payload
        default:return state
    }
}