import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {myDb} from '../../helpers/configDb';

function ChatMe() {
  const [messages, setMessages] = useState([]);
  const [previousMessages, setPreviousMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello You',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
        image: 'https://placeimg.com/140/140/any',
        // You can also add a video prop:
        video:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        // Mark the message as sent, using one tick
        sent: true,
        // Mark the message as received, using two tick
      },
    ]);
  }, []);

  const creatUser = useCallback(async () => {
    const res = await myDb.ref('/user').set({
      name: 'kevin',
      email: 'siregar25v@gmail.com',
      image: 'https://placeimg.com/140/140/any',
    });
    console.log('res', res);
  }, []);

  useEffect(() => {
    creatUser();
  });

  const onSend = useCallback((sendMessages = []) => {
    // eslint-disable-next-line no-shadow
    setMessages(previousMessages => {
      setPreviousMessages(previousMessages);
      return GiftedChat.append(previousMessages, sendMessages);
    });
  }, []);

  console.log('=========================================================');
  console.log(previousMessages, messages);
  console.log('=========================================================');
  console.log('<>><><><><><>><<>>><><><><><><>><<><>><<><><>><><><<>>><>');

  return (
    <GiftedChat
      messages={messages}
      onSend={sendMessages => onSend(sendMessages)}
      user={{
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      }}
    />
  );
}

export default ChatMe;
