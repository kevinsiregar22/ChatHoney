import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {navigate} from '../helpers/navigate';
import {colors} from '../utils';

const ChatIcon = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigate('Search')}
        style={styles.chatButton}>
        <Icon name="chat" size={30} color={colors.icon.color} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.button.background,
    position: 'absolute',
    // bottom: -310,
    top: 680,
    left: 350,
    borderRadius: 50,
  },
  chatButton: {
    // backgroundColor: 'green',
    height: 60,
    position: 'relative',
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
