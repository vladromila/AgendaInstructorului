import { CLASSES_FETCH, STUDENTS_FETCH } from "../actions/types";

export default (state=null,action)=>{
    switch(action.type){
        case CLASSES_FETCH:
        return action.payload;
        default:return state
    }
}