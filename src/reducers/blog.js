import {
  ADD_BLOG,
  ADD_BLOGS,
  EDIT_BLOG,
  LIKE_BLOG,
  REMOVE_BLOG,
  UNLIKE_BLOG,
} from '../actions';

const initalState = {
  isLoading: true,
  blogs: [],
  errmess: null,
};

const blog = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_BLOG:
      return { ...state, blogs: [...state.blogs, payload], isLoading: false };
    case ADD_BLOGS:
      return {
        ...state,
        blogs: [...state.blogs, ...payload],
        isLoading: false,
      };
    case LIKE_BLOG: {
      const { id, user } = payload;
      const { blogs } = state;
      blogs.forEach((blog) => {
        if (blog.id === id) {
          blog.likedBy.push(user);
        }
      });
      return { ...state };
    }
    case EDIT_BLOG: {
      const { id, blog } = payload;
      const { title, subTitle, content } = blog;
      const { blogs } = state;
      blogs.forEach((item) => {
        if (item.id === id) {
          item.title = title;
          item.subTitle = subTitle;
          item.content = content;
          item.likedBy = [];
        }
      });
      return { ...state };
    }
    case REMOVE_BLOG: {
      const { blogs } = state;
      const tempBlogs = blogs.filter((blog) => blog.id !== payload);
      return { ...state, blogs: tempBlogs };
    }
    case UNLIKE_BLOG: {
      const { id, user } = payload;
      const { blogs } = state;

      blogs.forEach((blog) => {
        if (blog.id === id) {
          const arr = blog.likedBy.filter((email) => email !== user);
          blog.likedBy = arr;
        }
      });
      return { ...state };
    }

    default:
      return state;
  }
};

export default blog;
