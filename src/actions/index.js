export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const AUTH_UPDATE = 'AUTH_UPDATE';
export const AUTH_REMOVE = 'AUTH_REMOVE';

export const ADD_BLOGS = 'ADD_BLOGS';
export const ADD_BLOG = 'ADD_BLOG';
export const REMOVE_BLOG = 'REMOVE_BLOG';
export const EDIT_BLOG = 'EDIT_BLOG';
export const LIKE_BLOG = 'LIKE_BLOG';
export const UNLIKE_BLOG = 'UNLIKE_BLOG';

export const emptyAction = (type) => ({ type });

export const action = (type, payload) => ({ type, payload });

export const login = (formData, resolve, reject) =>
  action(LOGIN, { formData, resolve, reject });

export const logout = () => emptyAction(LOGOUT);

export const updateAuth = (auth) => action(AUTH_UPDATE, auth);
export const removeAuth = () => emptyAction(AUTH_REMOVE);

export const addBlog = (blog) => action(ADD_BLOG, blog);
export const addBlogs = (blogs) => action(ADD_BLOGS, blogs);
export const removeBlog = (id) => action(REMOVE_BLOG, id);
export const editBlog = (id, blog) => action(EDIT_BLOG, { id, blog });
export const likeBlog = (id, user) => action(LIKE_BLOG, { id, user });
export const unlikeBlog = (id, user) => action(UNLIKE_BLOG, { id, user });
