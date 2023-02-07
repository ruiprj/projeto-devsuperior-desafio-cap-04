import { AuthContext } from 'AuthContext';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { getTokenData } from 'util/auth';
import { requestBackendLogin } from 'util/requests';
import { savaAuthData } from 'util/storage';

import './styles.css';

type FormData = {
  username: string;
  password: string;
}

const Login = () => {
  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const history = useHistory();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then(response => {
        savaAuthData(response.data);

        setHasError(false);

        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData()
        });

        history.push('/movies');
      })
      .catch(error => {
        setHasError(true);

        console.log('ERRO', error);
      });
  }


  return (
    <div className="base-card  login-card">
      <h1>LOGIN</h1>

      { hasError && (
        <div className="alert  alert-danger">
          Login inválido
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-login-custom-container">
          <input
            {...register("username", {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido'
              }
            })}
            type="text"
            className={`form-control  base-input  ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="invalid-feedback  d-block  invalid-feedback-custom">
          { errors.username?.message }
        </div>

        <div className="input-password-custom-container">
          <input
            {...register("password", {
              required: 'Campo obrigatório'
            })}
            type="password"
            className={`form-control  base-input  ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="invalid-feedback  d-block  invalid-feedback-custom">
          { errors.password?.message }
        </div>

        <div className="btn-container">
          <button
            className="btn  btn-primary  btn-custom"
          >
            <h6>FAZER LOGIN</h6>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
