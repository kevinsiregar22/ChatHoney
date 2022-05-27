import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, InputToolbar, Bubble} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {configDb} from '../../helpers/configDb';
import {colors} from '../../utils';

function ChatRoom() {
  const {_user, selectedUser} = useSelector(state => state.user);
  const [user, setUser] = useState({});

  const createIntialData = useCallback(() => {
    try {
      configDb.ref(`users/${selectedUser._id}`).on('value', res => {
        const userData = res.val();
        if (userData.chatRoom) {
          setUser(userData);
        } else {
          setUser(prevState => {
            return {...prevState, ...userData, chatRoom: []};
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [selectedUser._id]);

  useEffect(() => {
    createIntialData();
  }, [createIntialData]);

  const onSend = useCallback(
    async (sendedMessage = []) => {
      let isUpdating = true;
      await configDb.ref(`users/${_user._id}`).update({
        chatRoom: [
          ...user.chatRoom,
          {
            ...sendedMessage[0],
            // idx: user.chatRoom?.length + 1,
          },
        ],
      });

      await configDb.ref(`users/${selectedUser._id}`).update({
        chatRoom: [
          ...user.chatRoom,
          {
            ...sendedMessage[0],
            // idx: user.chatRoom.length + 1,
          },
        ],
      });
    },
    [
      user.chatRoom,
      _user._id,
      selectedUser._id,
      _user.displayName,
      // selectedUser.notifToken,
    ],
  );

  return (
    <GiftedChat
      messages={user?.chatRoom?.reverse().sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
        // messages={user?.chatRoom.sort(function (a, b) {
        //   return new Date(b.createdAt) - new Date(a.createdAt);
      })}
      onSend={sendedMessage => {
        onSend(sendedMessage);
      }}
      optionTintColor="red"
      isTyping={true}
      user={{
        _id: _user._id,
        name: _user.displayName,
        avatar:
          user.photoUrl ?? 'https://randomuser.me/api/portraits/men/36.jpg',
      }}
      messagesContainerStyle={{backgroundColor: colors.background}}
      renderInputToolbar={props => {
        return (
          <InputToolbar
            {...props}
            containerStyle={{
              borderTopWidth: 2.5,
              borderTopColor: colors.background.secondary,
            }}
            textInputStyle={{color: 'green'}}
          />
        );
      }}
      renderBubble={props => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: colors.background.white,
              },
              right: {
                backgroundColor: colors.background.secondary,
              },
            }}
          />
        );
      }}
    />
  );
}

export default ChatRoom;
