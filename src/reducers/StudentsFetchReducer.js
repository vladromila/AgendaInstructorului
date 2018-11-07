import { STUDENTS_FETCH, ASTUDENTS_FETCH, ASTUDENTS_FETCH_START } from "../actions/types";

export default (state=null,action)=>{
    switch(action.type){
        case STUDENTS_FETCH:
        return action.payload
        default:return state
    }
}