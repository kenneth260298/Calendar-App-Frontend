import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: 'k.lopez2698@gmail.com',
        lPassword: '123456'
    });
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: 'Kenneth',
        rEmail: 'k.lopez2698@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });

    const { lEmail, lPassword } = formLoginValues;
    const { rName, rEmail, rPassword1, rPassword2, } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (rPassword1 !== rPassword2) {
            return Swal.fire('Error', 'Passwords must be the same', 'error');
        }
        dispatch(startRegister(rEmail, rPassword1, rName));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contrase??a"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={rName}
                                onChange={handleRegisterInputChange}
                                name="rName"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                                name="rEmail"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contrase??a"
                                value={rPassword1}
                                onChange={handleRegisterInputChange}
                                name="rPassword1"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contrase??a"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                                name="rPassword2"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
