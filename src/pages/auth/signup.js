import React from 'react';
import { useFormReducer } from '../../hooks';
import {
  confirmPasswordValidator,
  required,
  validateEmail,
  validatePassword,
} from '../../utils';
import { Input } from '../../components';
import { signup } from '../../services/authServices';

const validators = {
  email: [required('Email is required'), validateEmail],
  name: [required('Name is required')],
  confirmPassword: [
    required('Confirm Password is required', confirmPasswordValidator),
  ],
  password: [required('Password is required'), validatePassword],
};

const Signup = () => {
  const { connectField, handleSubmit } = useFormReducer(validators);
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(async (data) => {
          const { successful, error } = await signup(data);
          if (!successful) {
            console.log('Error aa gyi', error);
          }
        })}
      >
        <h1>Signup</h1>
        {connectField('name', {
          placeholder: 'Name',
          className: 'form-control',
        })(Input)}
        {connectField('email', {
          placeholder: 'Email',
          className: 'form-control',
        })(Input)}
        {connectField('password', {
          placeholder: 'Password',
          className: 'form-control',
        })(Input)}
        {connectField('confirmPassword', {
          placeholder: 'Confirm Password',
          className: 'form-control',
        })(Input)}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
