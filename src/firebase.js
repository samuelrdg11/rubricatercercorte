import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA248vhZ3FGeVLWQ4PDV6eNKi1lTwNVE9Q",
    authDomain: "login-f525d.firebaseapp.com",
    projectId: "login-f525d",
    storageBucket: "login-f525d.appspot.com",
    messagingSenderId: "447377008396",
    appId: "1:447377008396:web:534734f6f3a0b8a7dc0b29"
  };
  
 app.initializeApp(firebaseConfig);

 const db=app.firestore()
 const auth=app.auth()

 export {db,auth}

