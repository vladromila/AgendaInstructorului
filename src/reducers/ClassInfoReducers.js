import { CLASS_INFO_UPDATE, CLASS_CREATE, CLASS_CREATE_SUCCESSFULL, CLASS_CREATE_FAIL, CLASS_RESET, CLASSES_DELETE, CLASSES_DELETE_SUCCESS, CLASS_UPDATE, CLASS_UPDATE_SUCCESS, CLASS_UPDATE_FAIL, CLASSES_DELETE1, CLASS_SECOND_MODAL_SHOW, CLASSES_SECOND_DELETE, CLASSES_SECOND_DELETE1, CLASS_SECOND_MODAL_SHOW1, CLASS_DELETE_START, CLASS_DELETE_WITHOUTCOUNT_START } from "../actions/types";

const INITIAL_STATE = { year: null, month: null, day: null, hour: null, minutes: null, studentUid: null, loading: false, error: '', success: false, isDeleteModalVisible: false, isDeleteModalVisible2: false, isDeleteModalVisible1: false, isDeleteModalVisible12: false, editSuccess: false };
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLASS_INFO_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value }
        case CLASS_CREATE:
            return { ...state, error: '', loading: true }
        case CLASS_CREATE_SUCCESSFULL:
            return { INITIAL_STATE, success: true }
        case CLASS_CREATE_FAIL:
            return { ...state, error: action.payload, loading: false }
        case CLASS_UPDATE:
            return { ...state, error: '', loading: true }
        case CLASS_UPDATE_SUCCESS:
            return { INITIAL_STATE, success: true }
        case CLASS_UPDATE_FAIL:
            return { ...state, error: action.payload, loading: false }
        case CLASS_RESET:
            return { INITIAL_STATE }
        case CLASS_DELETE_START:
            return { ...state, deleteLoading: true }
        case CLASS_DELETE_WITHOUTCOUNT_START:
            return { ...state, deleteWithoutCountLoading: true }
        case CLASS_SECOND_MODAL_SHOW:
            return { ...state, isDeleteModalVisible: false, isDeleteModalVisible1: false, isDeleteModalVisible2: true }
        case CLASS_SECOND_MODAL_SHOW1:
            return { ...state, isDeleteModalVisible: false, isDeleteModalVisible1: false, isDeleteModalVisible12: true }
        case CLASSES_SECOND_DELETE:
            return { ...state, isDeleteModalVisible2: false }
        case CLASSES_SECOND_DELETE1:
            return { ...state, isDeleteModalVisible12: false }
        case CLASSES_DELETE:
            return { ...state, isDeleteModalVisible: !state.isDeleteModalVisible }
        case CLASSES_DELETE1:
            return { ...state, isDeleteModalVisible1: !state.isDeleteModalVisible1 }
        case CLASSES_DELETE_SUCCESS:
            return { ...state, isDeleteModalVisible: false, isDeleteModalVisible1: false, isDeleteModalVisible2: false, isDeleteModalVisible12: false, deleteLoading: false, deleteWithoutCountLoading: false }
        default:
            return state;
    }
}