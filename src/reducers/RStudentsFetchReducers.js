import { STUDENTS_FETCH, ASTUDENTS_FETCH, ASTUDENTS_FETCH_START, RSTUDENTS_FETCH } from "../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case RSTUDENTS_FETCH:
            return action.payload
        default: return state
    }
}