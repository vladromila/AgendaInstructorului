import firebase from 'firebase';
import { CLASSES_CANCELED_FETCH } from './types';

export const fetchCanceledClasses= () => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/canceledClasses`)
        .on('value', snapshot => {
          dispatch({ type: CLASSES_CANCELED_FETCH, payload: snapshot.val() });
        });
    };
  };