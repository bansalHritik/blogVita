import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FavIcon } from '.';

const Home = () => {
  const { blogs } = useSelector((state) => state.blog);
  useEffect(() => {}, [blogs]);
  const auth = useSelector((state) => state.auth);
  return (
    <div className="container">
      <div className="d-flex align-items-center flex-column">
        {blogs?.map((blog) => (
          <BlogCard {...blog} key={blog.id} auth={auth} />
        ))}
      </div>
    </div>
  );
};

const BlogCard = ({ title, subTitle, content, likedBy, id, auth }) => {
  const history = useHistory();
  return (
    <div className="card shadow-lg my-4 col-12 col-md-9">
      <div className="card-body" style={{ cursor: 'pointer' }}>
        <div className="d-flex justify-content-between">
          <div onClick={() => history.push(`/blog/${id}`)}>
            <h3>{title}</h3>
            <span className="text-muted text-justify">{subTitle}</span>
          </div>
          <FavIcon likedBy={likedBy} id={id} />
        </div>
      </div>
    </div>
  );
};

export default Home;
