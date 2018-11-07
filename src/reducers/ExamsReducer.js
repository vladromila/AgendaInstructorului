import { EXAM_DELETE, EXAM_DELETE_SUCCESS, EXAM_DELETE_FAIL, EXAM_SHOW_DELETE_MODAL1, EXAM_SHOW_DELETE_MODAL2, EXAM_SHOW_DELETE_MODAL3, EXAM_TOTAL_DELETE_START, EXAM_TOTAL_DELETE_SUCCESS } from "../actions/types";

const INITIAL_STATE = { loading: false, deleteExamTotalLoading: false, success: false, isExamDeleteModalVisible1: false, isExamDeleteModalVisible2: false, isExamDeleteModalVisible3: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXAM_DELETE:
            return { ...state, loading: true }
        case EXAM_DELETE_SUCCESS:
            return { ...state, loading: false, success: true }
        case EXAM_DELETE_FAIL:
            return { ...state, loading: false }
        case EXAM_SHOW_DELETE_MODAL1:
            return { ...state, isExamDeleteModalVisible1: !state.isExamDeleteModalVisible1 }
        case EXAM_SHOW_DELETE_MODAL2:
            return { ...state, isExamDeleteModalVisible2: !state.isExamDeleteModalVisible2 }
        case EXAM_SHOW_DELETE_MODAL3:
            return { ...state, isExamDeleteModalVisible3: !state.isExamDeleteModalVisible3 }
        case EXAM_TOTAL_DELETE_START:
            return { ...state, deleteExamTotalLoading: true }
        case EXAM_TOTAL_DELETE_SUCCESS:
            return { ...state, deleteExamTotalLoading: false, isExamDeleteModalVisible1: false, isExamDeleteModalVisible2: false, isExamDeleteModalVisible3: false }
        default:
            return state;
    }
}