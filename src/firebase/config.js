import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCl15YB6EGUVouZZK1UD_h-5sNSM0lcPXw',
  authDomain: 'blogvita-445a6.firebaseapp.com',
  projectId: 'blogvita-445a6',
  storageBucket: 'blogvita-445a6.appspot.com',
  messagingSenderId: '223895220541',
  appId: '1:223895220541:web:2cc03158fddfee89329554',
  measurementId: 'G-5RPETWNPZH',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
