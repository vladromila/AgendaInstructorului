import firebase from 'firebase';
import { EXAM_DELETE, EXAM_DELETE_SUCCESS, EXAM_SHOW_DELETE_MODAL1, EXAM_TOTAL_DELETE_START, EXAM_TOTAL_DELETE_SUCCESS, EXAM_SHOW_DELETE_MODAL3, EXAM_SHOW_DELETE_MODAL2 } from './types';

export const deleteExam = ({ index, examuid, exam, nume, uid, calificativ, nre, numePolitist, day, month, year, students }) => {
    let { currentUser } = firebase.auth();
    return (dispatch) => {

        if (calificativ !== 'pending') {
            dispatch({ type: EXAM_DELETE });
            if (calificativ === 'respins') {
                firebase.database().ref(`/users/${currentUser.uid}/students/${uid}/nre`).transaction(function (currentCount) {
                    return (currentCount || 0) + 1;
                })
                    .then(() => {
                        firebase.database().ref(`/users/${currentUser.uid}/exams/${examuid}/examedStudents/${index}`).set({ uid, nume, progress: 'respins', nre, day, month, year })
                            .then(() => {
                                firebase.database().ref(`users/${currentUser.uid}/rStudents/${uid}/name`)
                                    .set(nume)
                                    .then(() => {
                                        firebase.database().ref(`users/${currentUser.uid}/rStudents/${uid}/attempts`)
                                            .push({ numePolitist, calificativ, day, month, year })
                                            .then(() => {
                                                dispatch({
                                                    type: EXAM_DELETE_SUCCESS
                                                })
                                            })
                                    })
                            }
                            )
                    })
            }
            else {
                if (nre === 0)
                    firebase.database().ref(`/users/${currentUser.uid}/info/firstTryA/count`).transaction(function (currentCount) {
                        return (currentCount || 0) + 1;
                    })
                        .then(() => {
                            firebase.database().ref(`/users/${currentUser.uid}/info/firstTryA/list`)
                                .push({ nume, studentUid: uid, incercare: nre + 1, numePolitist, day, month, year })
                                .then(() => {
                                    firebase.database().ref(`/users/${currentUser.uid}/info/ATotal/count`).transaction(function (currentCount) {
                                        return (currentCount || 0) + 1;
                                    })
                                        .then(() => {
                                            firebase.database().ref(`/users/${currentUser.uid}/info/ATotal/list`)
                                                .push({ nume, studentUid: uid, incercare: nre + 1, numePolitist, day, month, year })
                                                .then(() => {
                                                    firebase.database().ref(`/users/${currentUser.uid}/exams/${examuid}/examedStudents/${index}`).set({ uid, nume, progress: 'admis', nre })
                                                        .then(() => {
                                                            let wantedStudent = {};
                                                            students.forEach(student => {
                                                                if (student.uid === uid)
                                                                    wantedStudent = student;
                                                            });
                                                            const { cnp, nre, nume, phone, registru, serie, doneClasses, extraClasses, nrs, nrn } = wantedStudent;
                                                            if (extraClasses !== undefined && doneClasses !== undefined)
                                                                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                                                                    .set({ cnp, nre: nre + 1, nume, phone, registru, serie, numePolitist, year, day, month, doneClasses, extraClasses, nrs, nrn })
                                                                    .then(() => {
                                                                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                                                                            .remove()
                                                                            .then(() => {
                                                                                dispatch({
                                                                                    type: EXAM_DELETE_SUCCESS
                                                                                })
                                                                            })
                                                                    })
                                                            else
                                                                if (doneClasses !== undefined)
                                                                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                                                                        .set({ cnp, nre: nre + 1, nume, phone, registru, serie, numePolitist, year, day, month, doneClasses, nrs, nrn })
                                                                        .then(() => {
                                                                            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                                                                                .remove()
                                                                                .then(() => {
                                                                                    dispatch({
                                                                                        type: EXAM_DELETE_SUCCESS
                                                                                    })
                                                                                })
                                                                        })
                                                                else
                                                                    if (extraClasses !== undefined)
                                                                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                                                                            .set({ cnp, nre: nre + 1, nume, phone, registru, serie, numePolitist, year, day, month, extraClasses, nrs, nrn })
                                                                            .then(() => {
                                                                                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                                                                                    .remove()
                                                                                    .then(() => {
                                                                                        dispatch({
                                                                                            type: EXAM_DELETE_SUCCESS
                                                                                        })
                                                                                    })
                                                                            })
                                                                    else
                                                                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                                                                            .set({ cnp, nre: nre + 1, nume, phone, registru, serie, numePolitist, year, day, month, nrs, nrn })
                                                                            .then(() => {
                                                                                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                                                                                    .remove()
                                                                                    .then(() => {
                                                                                        dispatch({
                                                                                            type: EXAM_DELETE_SUCCESS
                                                                                        })
                                                                                    })
                                                                            })

                                                        }
                                                        )
                                                })
                                        })
                                })


                        })
                else {
                    firebase.database().ref(`/users/${currentUser.uid}/info/ATotal/count`).transaction(function (currentCount) {
                        return (currentCount || 0) + 1;
                    })
                        .then(() => {
                            firebase.database().ref(`/users/${currentUser.uid}/info/ATotal/list`)
                                .push({ nume, studentUid: uid, incercare: nre + 1, numePolitist, day, month, year })
                                .then(() => {
                                    firebase.database().ref(`/users/${currentUser.uid}/exams/${examuid}/examedStudents/${index}`).set({ uid, nume, progress: 'admis', nre, })
                                        .then(() => {
                                            let wantedStudent = {};
                                            students.forEach(student => {
                                                if (student.uid === uid)
                                                    wantedStudent = student;
                                            });
                                            const { cnp, nre, nume, phone, registru, serie, doneClasses, extraClasses, nrs, nrn } = wantedStudent;
                                            if (extraClasses !== undefined && doneClasses !== undefined)
                                                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                                                    .set({ cnp, nre: nre + 1, nume, phone, registru, serie, numePolitist, year, day, month, doneClasses, extraClasses, nrs, nrn })
                                                    .then(() => {
                                                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                                                            .remove()
                                                            .then(() => {
                                                                dispatch({
                                                                    type: EXAM_DELETE_SUCCESS
                                                                })
                                                            })
                                                    })
                                            else
                                                if (doneClasses !== undefined)
                                                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                                                        .set({ cnp, nre: nre + 1, nume, phone, registru, serie, numePolitist, year, day, month, doneClasses, nrs, nrn })
                                                        .then(() => {
                                                            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                                                                .remove()
                                                                .then(() => {
                                                                    dispatch({
                                                                        type: EXAM_DELETE_SUCCESS
                                                                    })
                                                                })
                                                        })
                                                else
                                                    if (extraClasses !== undefined)
                                                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                                                            .set({ cnp, nre: nre + 1, nume, phone, registru, serie, numePolitist, year, day, month, extraClasses, nrs, nrn })
                                                            .then(() => {
                                                                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                                                                    .remove()
                                                                    .then(() => {
                                                                        dispatch({
                                                                            type: EXAM_DELETE_SUCCESS
                                                                        })
                                                                    })
                                                            })
                                                    else
                                                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/finishedStudents/${uid}`)
                                                            .set({ cnp, nre: nre + 1, nume, phone, registru, serie, numePolitist, year, day, month, nrs, nrn })
                                                            .then(() => {
                                                                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/students/${uid}`)
                                                                    .remove()
                                                                    .then(() => {
                                                                        dispatch({
                                                                            type: EXAM_DELETE_SUCCESS
                                                                        })
                                                                    })
                                                            })

                                        }
                                        )
                                })
                        })
                }

            }
        }

    }
}
export const showExamDeleteModal1 = () => {
    return ({ type: EXAM_SHOW_DELETE_MODAL1 })
}
export const showExamDeleteModal2 = () => {
    return ({ type: EXAM_SHOW_DELETE_MODAL2})
}
export const showExamDeleteModal3 = () => {
    return ({ type: EXAM_SHOW_DELETE_MODAL3 })
}
export const deleteExamTotal=(uid)=>{
    return (dispatch)=>{
        dispatch({type:EXAM_TOTAL_DELETE_START})
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/exams/${uid}`)
        .remove()
        .then(()=>{
            dispatch({type:EXAM_TOTAL_DELETE_SUCCESS})
        })
    }
}
