import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  likeBlog as likeBlogAction,
  unlikeBlog as unlikeBlogAction,
} from '../../actions';
import { likeBlog, unlikeBlog } from '../../services/blogServices';

const FavIcon = ({ likedBy, id }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let isBlogLiked = false;
  if (auth) {
    isBlogLiked = likedBy.includes(auth.email);
  }
  const doUnlike = async () => {
    const { successful, error } = await unlikeBlog(id, auth.email);
    if (successful) {
      dispatch(unlikeBlogAction(id, auth.email));
    } else {
      console.log('Failed to unlike', error);
    }
  };
  const doLike = async () => {
    const { successful, error } = await likeBlog(id, auth.email);
    if (successful) {
      dispatch(likeBlogAction(id, auth.email));
    } else {
      console.log('Failed to like ', error);
    }
  };
  return (
    auth && (
      <div className="d-flex align-items-center">
        <span
          className="material-icons"
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={isBlogLiked ? doUnlike : doLike}
        >
          {isBlogLiked ? 'favorite' : 'favorite_border'}
        </span>
      </div>
    )
  );
};

export default FavIcon;
