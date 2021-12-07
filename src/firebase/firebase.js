import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    
  };

  firebase.initializeApp(firebaseConfig);

  
  export const createUserProfileDocument= async (userAuth,additionalData)=>{
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef
  }

  export const addUserPost =  (post,userId,author) =>{
    const postDocRef = firestore.collection(`posts`).doc();
     postDocRef.set({...post,userId,author});
    return postDocRef.id;
  
  }
  export const addUserComment =(comment)=>{
    const commentDocRef = firestore.collection(`comments`).doc();
    commentDocRef.set({...comment})
    return commentDocRef.id;
  }
  export const addUserBookmark =(postId,userId)=>{
    const bmRef = firestore.collection('users').doc(`${userId}`).collection('bookmarks').doc();
    bmRef.set({postId});
    return bmRef.id;
  }
  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

  export const convertPostsSnapshotToMap = posts => {
    const transformedPost = posts.docs.map((doc)=>{
    
      return {
        id:doc.id,
        ...doc.data()
      }
    })
   return  transformedPost;
  };
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  googleAuthProvider.setCustomParameters({ prompt: 'select_account' });





  export default firebase;