import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { BlogDetail, EditBlog, Home, NewBlog } from './blog';
import { Login, Signup } from './auth';
import { addBlogs, updateAuth } from '../actions';
import { firebase } from '../firebase';
import {
  AuthenticatedRoute,
  NavBar,
  UnauthenticatedRoute,
} from '../components';
import { getAllBlogs } from '../services/blogServices';
import { Routes } from '../utils';

const AppNavigator = () => {
  const dispatch = useDispatch();

  const fetchAllBlogs = useCallback(async () => {
    const { successful, data, error } = await getAllBlogs();
    if (successful) {
      dispatch(addBlogs(data));
    } else {
      console.log('Failed to get all blogs', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAllBlogs();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { email, displayName } = user;
        dispatch(updateAuth({ email, name: displayName }));
      } else {
      }
    });
  }, [dispatch, fetchAllBlogs]);

  const BlogWithId = ({ match }) => {
    const { blogs } = useSelector((state) => state.blog);
    const blog = blogs.filter((blog) => blog.id === match.params.blogId);
    if (blog.length === 1) {
      return <BlogDetail blog={blog[0]} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return (
    <Router>
      <NavBar />
      <Switch>
        <AuthenticatedRoute
          path={Routes.editBlog.path}
          component={EditBlog}
          redirectTo={Routes.home.path}
        />

        <AuthenticatedRoute
          path={Routes.newBlog.path}
          component={NewBlog}
          redirectTo={Routes.home.path}
        />

        <Route path={Routes.blogDetail.path} component={BlogWithId} />
        <Route path={Routes.home.path} component={Home} exact />
        <UnauthenticatedRoute
          path={Routes.login.path}
          component={Login}
          redirectTo={Routes.home.path}
          exact
        />
        <UnauthenticatedRoute
          path={Routes.signup.path}
          component={Signup}
          redirectTo={Routes.home.path}
          exact
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppNavigator;
