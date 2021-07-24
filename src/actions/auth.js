import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2'
import { eventLogout } from "./events";


export const startLogin = (email, password) => {

    return async (dispatch) => {

        const response = await fetchWithoutToken('auth', { email, password }, 'POST');
        const body = await response.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const { uid, name } = body;
            dispatch(login({ uid, name }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = (email, password, name) => {

    return async (dispatch) => {
        const response = await fetchWithoutToken('auth/new', { email, password, name }, 'POST');
        const body = await response.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            const { uid, name } = body;
            dispatch(login({ uid, name }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const response = await fetchWithToken('auth/renew');
        const body = await response.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            const { uid, name } = body;
            dispatch(login({ uid, name }));
        } else {
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = (user) => ({
    type: types.authLogin,
    payload: user
})
const logout = () => ({
    type: types.authLogout
})

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
        dispatch(eventLogout());
    }
}