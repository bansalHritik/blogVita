import { firebase } from '../firebase';

const blogCollection = firebase.firestore().collection('Blogs');

const successResult = (data) => ({
  successful: true,
  data,
});

const failureResult = (error) => ({
  successful: false,
  error,
});

export const addNewBlog = async (blog) => {
  const { title, subTitle, content } = blog;
  const { email, displayName } = firebase.auth().currentUser;
  // validation karna hai yha
  let result;
  const newBlog = {
    title,
    subTitle,
    content,
    likedBy: [],
    createdOn: firebase.firestore.Timestamp.now(),
    author: {
      email,
      name: displayName,
    },
  };
  try {
    const { id } = await blogCollection.add(newBlog);
    result = successResult({
      ...newBlog,
      id,
      createdOn: new Date(newBlog.createdOn.toDate()).toLocaleDateString(),
    });
  } catch (error) {
    result = failureResult();
  }
  return result;
};

export const removeBlog = async (id) => {
  let result;
  try {
    await blogCollection.doc(id).delete();
    result = successResult();
  } catch (error) {
    result = failureResult(error.message);
  }
  return result;
};

export const editBlog = async (id, blog) => {
  let result;
  const { title, subTitle, content } = blog;
  try {
    await blogCollection.doc(id).update({
      title,
      subTitle,
      content,
    });
    result = successResult();
  } catch (error) {
    result = failureResult(error.message);
  }
  return result;
};

export const likeBlog = async (id, userEmail) => {
  let result;
  const {
    firestore: { FieldValue },
  } = firebase;
  try {
    await blogCollection
      .doc(id)
      .update({ likedBy: FieldValue.arrayUnion(userEmail) });
    result = successResult();
  } catch (error) {
    result = failureResult(error.message);
  }
  return result;
};

export const unlikeBlog = async (id, userEmail) => {
  let result;
  const {
    firestore: { FieldValue },
  } = firebase;
  try {
    await blogCollection
      .doc(id)
      .update({ likedBy: FieldValue.arrayRemove(userEmail) });
    result = successResult();
  } catch (error) {
    result = failureResult(error.message);
  }
  return result;
};

export const getAllBlogs = async () => {
  let result;
  try {
    const blogs = await blogCollection.get();
    const arr = [];
    blogs.forEach((doc) => {
      let blog = doc.data();
      let { createdOn } = blog;
      createdOn = new Date(createdOn.toDate()).toLocaleDateString();
      blog = { ...blog, id: doc.id, createdOn };
      arr.push(blog);
    });
    result = successResult(arr);
  } catch (error) {
    result = failureResult(error.message);
  }
  return result;
};
