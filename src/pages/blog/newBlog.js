import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewBlog } from '../../services/blogServices';
import { addBlog } from '../../actions';
import BlogForm from './blogForm';
import { useHistory } from 'react-router';

const NewBlog = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onNewBlogAdd = async (blog) => {
    const { successful, data, error } = await addNewBlog(blog);
    if (successful) {
      dispatch(addBlog(data));
      history.goBack();
    } else {
      console.log('Adding blog failed', error);
    }
  };
  return <BlogForm heading="New Blog" {...props} onSubmit={onNewBlogAdd} />;
};

export default NewBlog;
