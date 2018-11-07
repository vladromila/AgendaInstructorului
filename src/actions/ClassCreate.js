import { CLASS_INFO_UPDATE, CLASS_CREATE, CLASS_CREATE_SUCCESSFULL, CLASS_CREATE_FAIL, CLASS_RESET, CLASSES_DELETE, CLASSES_DELETE_SUCCESS, CLASS_UPDATE, CLASS_UPDATE_FAIL, CLASS_UPDATE_SUCCESS, CLASSES_DELETE1, CLASS_SECOND_MODAL_SHOW, CLASSES_SECOND_DELETE, CLASSES_SECOND_DELETE1, CLASS_SECOND_MODAL_SHOW1, CLASS_DELETE_START, CLASS_DELETE_WITHOUTCOUNT_START } from "./types";
import firebase from 'firebase';

export const classInfoUpdate = ({ prop, value }) => {
    return {
        type: CLASS_INFO_UPDATE,
        payload: { prop, value }
    }
}
export const classCreate = ({ year, month, day, hour, minutes, studentUid, tip, examedStudents, id, location }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({
            type: CLASS_CREATE
        })

        if (tip === 'examen') {
            if (year !== null && month !== null && day !== null && examedStudents !== [] || null) {
                firebase.database().ref(`/users/${currentUser.uid}/exams`)
                    .push({
                        day, month, year, tip, examedStudents
                    })
                    .then(() => {

                        dispatch({
                            type: CLASS_CREATE_SUCCESSFULL
                        })
                        dispatch({
                            type: CLASS_RESET
                        })

                    })
                    .catch(e => {
                        dispatch({
                            type: CLASS_CREATE_FAIL,
                            payload: e.message
                        })
                    })
            }
        }
        else {
            if (year !== null && month !== null && day !== null && hour !== null && minutes !== null && studentUid !== null) {
                firebase.database().ref(`/users/${currentUser.uid}/classes`)
                    .push({ year, month, day, hour, minutes, studentUid, tip, id, location })
                    .then(() => {

                        dispatch({
                            type: CLASS_CREATE_SUCCESSFULL
                        })
                        dispatch({
                            type: CLASS_RESET
                        })

                    })
                    .catch(e => {
                        dispatch({
                            type: CLASS_CREATE_FAIL,
                            payload: e.message
                        })
                    })
            }
            else
                dispatch({
                    type: CLASS_CREATE_FAIL,
                    payload: 'Trebuie sa selectati o data si o ora!'
                })
        }
    }
}
export const classUpdate = ({ year, month, day, hour, minutes, studentUid, uid, tip, examedStudents, id, location }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({
            type: CLASS_UPDATE
        })
        if (tip === 'examen') {
            if (year !== null && month !== null && day !== null && studentUid !== null && examedStudents) {
                firebase.database().ref(`/users/${currentUser.uid}/exams/${uid}`)
                    .set({ year, month, day, tip, examedStudents })
                    .then(() => {

                        dispatch({
                            type: CLASS_UPDATE_SUCCESS
                        })
                        dispatch({
                            type: CLASS_RESET
                        })

                    })
                    .catch(e => {
                        dispatch({
                            type: CLASS_UPDATE_FAIL,
                            payload: e.message
                        })
                    })
            }
            else
                dispatch({
                    type: CLASS_UPDATE_FAIL,
                    payload: 'Trebuie sa selectati o data si o ora!'
                })
        }
        else {
            if (year !== null && month !== null && day !== null && hour !== null && minutes !== null && studentUid !== null) {
                firebase.database().ref(`/users/${currentUser.uid}/classes/${uid}`)
                    .set({ year, month, day, hour, minutes, studentUid, tip, id, location })
                    .then(() => {

                        dispatch({
                            type: CLASS_UPDATE_SUCCESS
                        })
                        dispatch({
                            type: CLASS_RESET
                        })

                    })
                    .catch(e => {
                        dispatch({
                            type: CLASS_UPDATE_FAIL,
                            payload: e.message
                        })
                    })
            }
            else
                dispatch({
                    type: CLASS_UPDATE_FAIL,
                    payload: 'Trebuie sa selectati o data si o ora!'
                })
        }

    }
}
export const classDeleteModalShowUp = () => {
    return {
        type: CLASSES_DELETE
    }
}
export const classDeleteModalShowUp1 = () => {
    return {
        type: CLASSES_DELETE1
    }
}
export const classShowSecondModal = () => {
    return {
        type: CLASS_SECOND_MODAL_SHOW
    }
}
export const classShowSecondModal1 = () => {
    return {
        type: CLASS_SECOND_MODAL_SHOW1
    }
}
export const classSecondDeleteModalShowUp = () => {
    return {
        type: CLASSES_SECOND_DELETE
    }
}
export const classSecondDeleteModalShowUp1 = () => {
    return {
        type: CLASSES_SECOND_DELETE1
    }
}
export const classDelete = ({ uid, uids, year, month, day, hour, minutes, studentUid, tip }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({type:CLASS_DELETE_START})
        firebase.database().ref(`/users/${currentUser.uid}/classes/${uid}`)
            .remove()
            .then(() => {
                if (tip === 'normala') {
                    firebase.database().ref(`/users/${currentUser.uid}/students/${uids}/nrn`).transaction(function (currentClicks) {
                        return (currentClicks || 0) + 1;
                    })
                        .then(() => {
                            firebase.database().ref(`/users/${currentUser.uid}/students/${studentUid}/doneClasses`)
                                .push({ year, month, day, hour, minutes, studentUid, tip })
                                .then(() => dispatch({ type: CLASSES_DELETE_SUCCESS }))
                        })
                }
                else
                    firebase.database().ref(`/users/${currentUser.uid}/students/${uids}/nrs`).transaction(function (currentClicks) {
                        return (currentClicks || 0) + 1;
                    })
                        .then(() => {
                            firebase.database().ref(`/users/${currentUser.uid}/students/${studentUid}/extraClasses`)
                                .push({ year, month, day, hour, minutes, studentUid, tip })
                                .then(() => dispatch({ type: CLASSES_DELETE_SUCCESS }))
                        })

            }
            )
    }
}
export const classDeleteWithoutCount = ({ uid, year, month, day, hour, minutes, studentUid, tip }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({type:CLASS_DELETE_WITHOUTCOUNT_START})
        firebase.database().ref(`/users/${currentUser.uid}/classes/${uid}`)
            .remove()
            .then(() => {
                firebase.database().ref(`/users/${currentUser.uid}/canceledClasses`)
                    .push({ year, month, day, hour, minutes, studentUid, tip })
                dispatch({ type: CLASSES_DELETE_SUCCESS })

            }
            )
    }
}