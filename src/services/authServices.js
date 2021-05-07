import firebase from '../firebase/config';

const authSuccess = (user) => ({
  successful: true,
  user,
});

const authFailure = (error) => ({
  successful: false,
  error,
});

export const login = async ({ email, password }) => {
  let authResult;
  try {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    authResult = authSuccess({ email: user.email, name: user.displayName });
  } catch (error) {
    authResult = authFailure(error);
  }
  return authResult;
};
// https://stackoverflow.com/questions/40389946/how-do-i-set-the-displayname-of-firebase-user/40429080
export const signup = async ({ email, password, name }) => {
  let authResult;
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;
    await user.updateProfile({ displayName: name });
    authResult = authSuccess({
      email: firebase.auth().currentUser.email,
      name: firebase.auth().currentUser.displayName,
    });
  } catch (error) {
    authResult = authFailure(error?.message);
  }
  return authResult;
};

export const logout = async () => {
  try {
    await firebase.auth().signOut();
    return authSuccess();
  } catch (error) {
    return authFailure(error);
  }
};
