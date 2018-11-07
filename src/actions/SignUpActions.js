import { INFO_UPDATE_REGISTER, REGISTER_TRY, REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation'

export const SignUpInfoUpdate = ({ prop, value }) => {
    return {
        type: INFO_UPDATE_REGISTER,
        payload: { prop, value }
    }
}
export const SignUp = ({ email, password, nume, prenume }) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_TRY
        });
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const { currentUser } = firebase.auth();
                firebase.database().ref(`/users/${currentUser.uid}/information`)
                    .set({ nume, prenume })
                    .then(() => {
                        dispatch({
                            type: REGISTER_SUCCESS,
                            payload: user
                        }
                        )
                    })
                    .catch(
                        e => dispatch({
                            type: REGISTER_FAIL,
                            payload: e.message
                        })
                    )
            })
            .catch(
                e => dispatch({
                    type: REGISTER_FAIL,
                    payload: e.message
                })
            )
    }
}