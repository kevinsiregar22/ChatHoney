import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import Poppins from '../../components/Poppins';
import {ms} from 'react-native-size-matters';
import {colors} from '../../utils';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function index() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.OauthGoogle}>
        <Image
          style={styles.cover}
          source={require('../../assets/icons/google2.png')}
          resizeMode="cover"
        />
        <Poppins size={20} color={colors.button.text2} type="SemiBold">
          Login With Google
        </Poppins>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  OauthGoogle: {
    width: wp('80%'),
    height: ms(50),
    alignSelf: 'center',
    borderRadius: ms(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-around',
    backgroundColor: colors.button.Secondary,
  },
  cover: {
    width: ms(25),
    height: ms(25),
    // marginLeft: -10,
  },
});
