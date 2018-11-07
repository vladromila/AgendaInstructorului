import { EXAMS_FETCH } from "../actions/types";

export default (state=null,action)=>{
    switch(action.type){
        case EXAMS_FETCH:
        return action.payload;
        default:return state
    }
}