import React from 'react';
import {colors} from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {navigate} from '../helpers/navigate';
import {Avatar} from '@rneui/base';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import authType from '@react-native-firebase/auth';
const auth = authType();

export default function Header() {
  const signOutUser = async () => {
    try {
      await auth().signOut();
      navigate(Login);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Chat Honey</Text>
      <View style={styles.containerIcons}>
        <TouchableOpacity onPress={() => navigate('Search')}>
          <Icon
            name="search"
            color={colors.icon.primary}
            size={40}
            style={styles.Icons}
          />
        </TouchableOpacity>
        {/* onPress={() => navigate('Search')}> onPress={signOutUser}>*/}
        <TouchableOpacity onPress={signOutUser}>
          <Avatar
            size={56}
            rounded
            icon={{name: 'sign-out', type: 'font-awesome'}}
            // sign-out
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderColor: colors.border.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp(4),
    paddingHorizontal: wp(3),
    marginBottom: ms(10),
  },
  logo: {
    fontSize: 25,
    color: colors.border.primary,
    fontWeight: '500',
  },
  containerIcons: {
    flexDirection: 'row',
  },
  Icons: {
    padding: 10,
  },
  Avatar: {
    left: 200,
  },
});
