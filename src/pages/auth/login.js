import React from 'react';
import { useFormReducer } from '../../hooks';
import { required, validateEmail } from '../../utils';
import { Input } from '../../components';
import { login } from '../../services/authServices';

const validators = {
  email: [required('Email is required'), validateEmail],
  password: [],
};

const Login = () => {
  const { connectField, handleSubmit } = useFormReducer(validators);
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(async (data) => {
          const { successful, error } = await login(data);
          if (!successful) {
            console.log('Login failed', error);
          }
        })}
      >
        <h1>Login</h1>
        {connectField('email', {
          placeholder: 'Email',
          className: 'form-control',
        })(Input)}
        {connectField('password', {
          placeholder: 'Password',
          className: 'form-control',
        })(Input)}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
