import firebase from 'firebase';
import { STUDENTS_FETCH, STUDENT_DELETE, ASTUDENTS_FETCH, ASTUDENTS_FETCH_START, RSTUDENTS_FETCH, INACTIVE_STUDENTS_FETCH } from './types';
import _ from 'lodash';

export const fetchStudents = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/students`)
      .on('value', snapshot => {
        dispatch({ type: STUDENTS_FETCH, payload: snapshot.val()})
      })
  };
};

export const AStudentsFetch=()=>{
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/finishedStudents`)
  .on('value',snapshot=>{
    dispatch({ type: ASTUDENTS_FETCH, payload: snapshot.val()})
  })
}
}
export const RStudentsFetch=()=>{
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/rStudents`)
  .on('value',snapshot=>{
    dispatch({ type: RSTUDENTS_FETCH, payload: snapshot.val()})
  })
}
}
export const inactiveStudentsFetch=()=>{
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/instudents`)
  .on('value',snapshot=>{
    dispatch({ type: INACTIVE_STUDENTS_FETCH, payload: snapshot.val()})
  })
}
}
