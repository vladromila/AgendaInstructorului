import firebase from 'firebase';
import { CLASSES_FETCH, STUDENTS_FETCH } from './types';


export const fetchClasses = () => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/classes`)
        .on('value', snapshot => {
          dispatch({ type: CLASSES_FETCH, payload: snapshot.val() });
        });
    };
  };