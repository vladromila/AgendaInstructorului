import firebase from 'firebase';
import { INFO_FETCH } from './types';

export const infoFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/info`)
            .on('value', snapshot => {
                dispatch({ type: INFO_FETCH, payload: snapshot.val() })
            })
    }
}