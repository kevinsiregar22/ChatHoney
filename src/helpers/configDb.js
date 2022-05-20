import {firebase} from '@react-native-firebase/database';

export const configDb = firebase
  .app()
  .database('https://chat-honey-default-rtdb.firebaseio.com');
