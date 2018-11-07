import { STUDENTS_FETCH, ASTUDENTS_FETCH, ASTUDENTS_FETCH_START, INACTIVE_STUDENTS_FETCH } from "../actions/types";

export default (state=null,action)=>{
    switch(action.type){
        case INACTIVE_STUDENTS_FETCH:
        return action.payload
        default:return state
    }
}