import firebase from 'firebase';
import {  EXAMS_FETCH } from './types';


export const examsFetch = () => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/exams`)
        .on('value', snapshot => {
          dispatch({ type: EXAMS_FETCH, payload: snapshot.val() });
        });
    };
  };