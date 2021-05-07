import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeAuth } from '../actions';
import { logout } from '../services/authServices';
import { Routes } from '../utils';

const NavBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          BlogVita
        </Link>
        {auth ? (
          <div className="ml-auto">
            <Link
              className="btn btn-link btn-outline-success mx-3 text-white"
              to={Routes.newBlog.path}
            >
              Add Blog
            </Link>
            <button
              className="btn btn-link btn-danger mx-3 text-white"
              onClick={async () => {
                const { successful, error } = await logout();
                if (successful) {
                  dispatch(removeAuth());
                } else {
                  console.log('Logout data', error);
                }
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="ml-auto">
            <Link
              to={Routes.login.path}
              className="btn btn-link btn-outline-secondary mx-3 text-white"
            >
              Login
            </Link>
            <Link
              to={Routes.signup.path}
              className="btn btn-link btn-primary mx-3 text-white"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
