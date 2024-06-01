import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBXYRurStlvEDddHvLP4mup89Uvm2Sz9iQ',
  authDomain: 'birthday-reminder-c94ba.firebaseapp.com',
  projectId: 'birthday-reminder-c94ba',
  storageBucket: 'birthday-reminder-c94ba.appspot.com',
  messagingSenderId: '234604821851',
  appId: '1:234604821851:web:fa1df2b76e038ddd1dee7e',
  measurementId: 'G-W1NX32976C'
};

const app = initializeApp(firebaseConfig);

export const firebaseStorage = getStorage(app);
