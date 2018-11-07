import { STUDENTS_INFO_UPDATE, STUDENTS_CREATE, STUDENTS_CREATE_SUCCESSFULL, STUDENTS_CREATE_FAIL, STUDENT_RESET, STUDENT_DELETE_SUCCESS, STUDENT_DELETE, STUDENT_UPDATE, STUDENT_UPDATE_SUCCESS, STUDENT_UPDATE_FAIL, STUDENT_DELETE_MODAL_CLOSE, STUDENT_DELETE1, STUDENT_RESTORE_START, STUDENT_RESTORE_END, STUDENT_DELETE_START, STUDENT_TO_INACTIVE_MODAL_SHOW, STUDENT_SETTO_INACTIVE_START, STUDENT_SETTO_INACTIVE_SUCCESS, STUDENT_TO_ACTIVE_MODAL_SHOW, STUDENT_SETTO_ACTIVE_START, STUDENT_SETTO_ACTIVE_SUCCESS } from "../actions/types";

const INITIAL_STATE = { nume: '', phone: '', cnp: '', registru: '', serie: '', studentUid: '', isSetToActiveModalVisible: false, setToActiveLoading: false, setToInactiveLoading: false, deleteLoading: false, loading: false, error: '', isSetToInactiveModalVisible: false, isModalVisible1: false, isModalVisible: false, success: false };
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STUDENTS_INFO_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value }
        case STUDENTS_CREATE:
            return { ...state, error: '', loading: true };
        case STUDENTS_CREATE_SUCCESSFULL:
            return { ...INITIAL_STATE, success: true }
        case STUDENTS_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case STUDENT_UPDATE:
            return { ...state, error: '', loading: true };
        case STUDENT_UPDATE_SUCCESS:
            return { ...INITIAL_STATE, success: true }
        case STUDENT_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case STUDENT_RESET:
            return { ...INITIAL_STATE }
        case STUDENT_DELETE_START:
            return { ...state, deleteLoading: true }
        case STUDENT_DELETE_MODAL_CLOSE:
            return { ...state, isModalVisible: false, isModalVisible1: false }
        case STUDENT_DELETE:
            return { ...state, isModalVisible: true }
        case STUDENT_DELETE1:
            return { ...state, isModalVisible1: true }
        case STUDENT_DELETE_SUCCESS:
            return { ...state, isModalVisible: false, isModalVisible1: false, success: true, deleteLoading: false }
        case STUDENT_RESTORE_START:
            return { ...state, loading: true }
        case STUDENT_RESTORE_END:
            return { ...state, loading: false }
        case STUDENT_TO_ACTIVE_MODAL_SHOW:
            return { ...state, isSetToActiveModalVisible: !state.isSetToActiveModalVisible }
            case STUDENT_SETTO_ACTIVE_START:
            return {...state,setToActiveLoading:true}
            case STUDENT_SETTO_ACTIVE_SUCCESS:
            return {...state,setToActiveLoading:false,isSetToActiveModalVisible:false}
        case STUDENT_TO_INACTIVE_MODAL_SHOW:
            return { ...state, isSetToInactiveModalVisible: !state.isSetToInactiveModalVisible }
        case STUDENT_SETTO_INACTIVE_START:
            return { ...state, setToInactiveLoading: true }
        case STUDENT_SETTO_INACTIVE_SUCCESS:
            return { ...state, setToInactiveLoading: false, isSetToInactiveModalVisible: false }
        default:
            return state;
    }
}