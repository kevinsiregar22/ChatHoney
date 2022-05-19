import {firebase} from '@react-native-firebase/database';

export const myDb = firebase
  .app()
  .database('https://chat-honey-default-rtdb.firebaseio.com');
