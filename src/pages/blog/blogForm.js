import React from 'react';
import { useFormReducer } from '../../hooks';
import { Input, TextArea } from '../../components';
import { required } from '../../utils';

const validators = {
  title: [required('Title is required')],
  subTitle: [required('Subtitle is required')],
  content: [required('Description is required')],
};

const BlogForm = ({ heading, initialData = {}, onSubmit }) => {
  const { connectField, handleSubmit } = useFormReducer(
    validators,
    initialData,
  );
  return (
    <div className="row align-items-center justify-content-center m-0 min-vh-100">
      <div className="col-12 col-md-9">
        <div className="card shadow-lg">
          <div className="card-header bg-white">
            <h4 className="text-center mb-0">{heading}</h4>
          </div>
          <div className="card-body px-3 px-md-5 m-0">
            <form
              onSubmit={handleSubmit((data) => {
                onSubmit(data);
              })}
            >
              <div className="form-group">
                <label className="text-muted" htmlFor="title">
                  Title
                </label>
                {connectField('title', {
                  className: 'form-control',
                  id: 'title',
                })(Input)}
              </div>
              <div className="form-group">
                <label className="text-muted" htmlFor="sub-title">
                  Sub Title
                </label>
                {connectField('subTitle', {
                  className: 'form-control',
                  id: 'sub-title',
                })(Input)}
              </div>
              <div className="form-group">
                <label className="text-muted" htmlFor="description">
                  Description
                </label>
                {connectField('content', {
                  className: 'form-control',
                  id: 'description',
                  rows: '5',
                })(TextArea)}
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
