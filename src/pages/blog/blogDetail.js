import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FavIcon } from '.';
import { removeBlog } from '../../services/blogServices';
import { removeBlog as removeBlogAction } from '../../actions';
import { useDispatch } from 'react-redux';

const BlogDetail = ({ blog }) => {
  return (
    <div className="h-100" style={{ backgroundColor: '#f2f6fc' }}>
      <div className="container py-4">
        <BlogDetailManipulators {...blog} />
        <BlogDetailPageContent {...blog} />
      </div>
    </div>
  );
};

const BlogDetailManipulators = ({ id, likedBy, author: { email } }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const deleteBlog = async () => {
    const { successful, error } = await removeBlog(id);
    if (successful) {
      dispatch(removeBlogAction(id));
    } else {
      console.log('Falied to delete blog', error);
    }
  };
  return (
    auth && (
      <div className="d-flex justify-content-between">
        <FavIcon likedBy={likedBy} id={id} />
        <Modal
          cancelText="Cancel"
          confirmText="Delete"
          onConfirm={deleteBlog}
          title="Delete this blog"
          body="Are you sure to delete the blog?"
        />
        {email === auth.email && (
          <div className="row d-flex justify-content-end">
            <div className="col-auto">
              <Link to={`/blog/edit/${id}`} className="btn btn-outline-info">
                Edit
              </Link>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

const BlogDetailPageContent = ({
  title,
  author: { name, email },
  subTitle,
  description,
  createdOn,
  content,
}) => (
  <div className="min-vh-100">
    <div className="row p-3 d-flex justify-content-center">
      <div className="col-12 col-sm-8 col-md-6">
        <div className="row my-2 d-flex justify-content-center">
          <h1 className="font-weight-bold text-capitalize">{title}</h1>
        </div>
        <div className="row my-2 d-flex justify-content-center">
          <h5>{subTitle}</h5>
        </div>
        <hr />
        <div className="row d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <span className="material-icons">assignment</span>&nbsp;Written by
            :&nbsp;
            {name}
          </div>
          <div className="d-flex align-items-center">
            <span className="material-icons">schedule</span>&nbsp;{createdOn}
          </div>
        </div>
      </div>
    </div>
    <section className="row d-flex justify-content-center mt-5">
      <p className="col-12 col-sm-10 col-md-8">{content}</p>
    </section>
  </div>
);

const Modal = ({ onConfirm, cancelText, confirmText, title, body }) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
