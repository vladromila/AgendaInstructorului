import { STUDENTS_INFO_UPDATE, STUDENTS_CREATE, STUDENTS_CREATE_SUCCESSFULL, STUDENTS_CREATE_FAIL, STUDENT_RESET, STUDENT_DELETE_SUCCESS, STUDENT_DELETE, STUDENT_UPDATE, STUDENT_UPDATE_SUCCESS, STUDENT_UPDATE_FAIL, STUDENT_DELETE_MODAL_CLOSE, STUDENT_DELETE1, STUDENT_RESTORE_START, STUDENT_RESTORE_END, STUDENT_DELETE_START, STUDENT_SETTO_INACTIVE_START, STUDENT_SETTO_INACTIVE_SUCCESS, STUDENT_TO_INACTIVE_MODAL_SHOW, STUDENT_SETTO_ACTIVE_START, STUDENT_TO_ACTIVE_MODAL_SHOW, STUDENT_SETTO_ACTIVE_SUCCESS } from "./types";
import firebase from 'firebase';


export const studentInfoUpdate = ({ prop, value }) => {
    return {
        type: STUDENTS_INFO_UPDATE,
        payload: { prop, value }
    }
}
export const studentCreate = ({ nume, phone, cnp, registru, serie }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({
            type: STUDENTS_CREATE
        })
        if (nume && phone && cnp && registru && serie) {
            firebase.database().ref(`users/${currentUser.uid}/students`)
                .push({ nume, phone, cnp, registru, serie, nrn: 0, nrs: 0, nre: 0 })
                .then(() => {
                    dispatch({
                        type: STUDENTS_CREATE_SUCCESSFULL
                    })
                    dispatch({
                        type: STUDENT_RESET
                    })
                }
                )
                .catch(e => {
                    dispatch({
                        type: STUDENTS_CREATE_FAIL,
                        payload: e.message
                    })
                })
        }
        else {
            dispatch({
                type: STUDENTS_CREATE_FAIL,
                payload: 'Fiecare bucata trebuie completate!'
            })
        }
    }
}

export const studentUpdate = ({ nume, phone, cnp, registru, serie, nrn, nrs, nre, uid, doneClasses, extraClasses }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({
            type: STUDENT_UPDATE
        })
        if (nume && phone && cnp && registru && serie) {
            firebase.database().ref(`users/${currentUser.uid}/students/${uid}`)
                .set({ nume, phone, cnp, registru, serie, nrn, nrs, nre, doneClasses, extraClasses })
                .then(() => {
                    dispatch({
                        type: STUDENT_UPDATE_SUCCESS
                    })
                    dispatch({
                        type: STUDENT_RESET
                    })
                }
                )
                .catch(e => {
                    dispatch({
                        type: STUDENT_UPDATE_FAIL,
                        payload: e.message
                    })
                })
        }
        else {
            dispatch({
                type: STUDENT_UPDATE_FAIL,
                payload: 'Fiecare bucata trebuie completata!'
            })
        }
    }
}

export const closeModal = () => {
    return {
        type: STUDENT_DELETE_MODAL_CLOSE
    }
}

export const studentDeleteModalShowUp = () => {
    return {
        type: STUDENT_DELETE
    }
}
export const studentDeleteModalShowUp1 = () => {
    return {
        type: STUDENT_DELETE1
    }
}
export const studentDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: STUDENT_DELETE_START })
        firebase.database().ref(`users/${currentUser.uid}/students/${uid}`)
            .remove().then(() => {
                dispatch({
                    type: STUDENT_DELETE_SUCCESS
                })
                dispatch({
                    type: STUDENT_RESET
                })
            })
    }
}
export const studentToInactiveModalShow = () => {
    return ({ type: STUDENT_TO_INACTIVE_MODAL_SHOW })
}
export const studentToActiveModalShow = () => {
    return ({ type: STUDENT_TO_ACTIVE_MODAL_SHOW })
}
export const setToInactive = (student) => {
    return (dispatch) => {
        dispatch({ type: STUDENT_SETTO_INACTIVE_START })
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/instudents/${student.uid}`)
            .set(student)
            .then(() => {
                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${student.uid}`)
                    .remove()
                    .then(() => {
                        dispatch({ type: STUDENT_SETTO_INACTIVE_SUCCESS })
                    })

            })
    }
}
export const setToActive = (student) => {
    return (dispatch) => {
        dispatch({ type: STUDENT_SETTO_ACTIVE_START })
        delete student.nrn;
        delete student.nrs;
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${student.uid}`)
            .set({...student,nrn:15,nrs:0})
            .then(() => {
                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/instudents/${student.uid}`)
                    .remove()
                    .then(() => {
                        dispatch({ type: STUDENT_SETTO_ACTIVE_SUCCESS })
                    })

            })
    }
}


export const studentRestore = ({ cnp, doneClasses, extraClasses, nume, phone, registru, serie, uid, nre, nrs, nrn }) => {
    return (dispatch) => {
        dispatch({ type: STUDENT_RESTORE_START })
        if (doneClasses !== undefined && extraClasses !== undefined)
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                .set({ cnp, doneClasses, extraClasses, nume, phone, registru, serie, nre: nre - 1, nrs, nrn })
                .then(() => {
                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                        .remove()
                        .then(() => {
                            dispatch({ type: STUDENT_RESTORE_END })
                        })
                })
        else
            if (doneClasses !== undefined)
                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                    .set({ cnp, doneClasses, nume, phone, registru, serie, nre: nre - 1, nrs, nrn })
                    .then(() => {
                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                            .remove()
                            .then(() => {
                                dispatch({ type: STUDENT_RESTORE_END })
                            })
                    })
            else
                if (extraClasses !== undefined)
                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                        .set({ cnp, extraClasses, nume, phone, registru, serie, nre: nre - 1, nrs, nrn })
                        .then(() => {
                            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                                .remove()
                                .then(() => {
                                    dispatch({ type: STUDENT_RESTORE_END })
                                })
                        })
                else
                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                        .set({ cnp, nume, phone, registru, serie, nre: nre - 1, nrs, nrn })
                        .then(() => {
                            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                                .remove()
                                .then(() => {
                                    dispatch({ type: STUDENT_RESTORE_END })
                                })
                        })
    }

}