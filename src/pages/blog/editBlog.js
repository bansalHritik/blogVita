import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { editBlog } from '../../services/blogServices';
import { editBlog as editBlogAction } from '../../actions';
import BlogForm from './blogForm';

const EditBlog = (props) => {
  const { blogId } = useParams();
  const { blogs } = useSelector((state) => state.blog);
  const { email } = useSelector((state) => state.auth);
  const history = useHistory();

  const blogWithId = blogs.filter((blog) => blog.id === blogId)[0];

  const canEditBlog = blogWithId && blogWithId.author.email === email;

  const dispatch = useDispatch();

  const onBlogEdit = async (data) => {
    const { successful, error } = await editBlog(blogId, data);
    if (successful) {
      dispatch(editBlogAction(blogId, data));
      history.goBack();
    } else {
      console.log('Error on blog edit', error);
    }
  };

  return (
    canEditBlog && (
      <BlogForm
        heading="Edit Blog"
        {...props}
        initialData={blogWithId}
        onSubmit={onBlogEdit}
      />
    )
  );
};

export default EditBlog;
