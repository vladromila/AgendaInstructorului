import { INFO_UPDATE_REGISTER, REGISTER_TRY, REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";


const INITIAL_STATE={email:'', password:'',nume:'',prenume:'', user:null,error:'',loading:false}
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case INFO_UPDATE_REGISTER:
        return {...state,[action.payload.prop]:action.payload.value};
        case REGISTER_TRY:
        return {...state,error:'',loading:true}
        case REGISTER_SUCCESS:
        return{...state,loading:false}
        case REGISTER_FAIL:
        return {...state,loading:false,error:action.payload}
        default:
        return state
       
    }
}