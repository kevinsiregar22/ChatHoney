import React from 'react';
import {colors} from '../utils';
import {View, Text, StyleSheet} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import GoBack from './GoBack';
import {ms} from 'react-native-size-matters';
const HeaderContact = () => (
  <View style={styles.container}>
    <GoBack />
    <Text style={styles.logo}>Pilih kontak</Text>
  </View>
);

export default HeaderContact;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderColor: colors.border.primary,
    justifyContent: 'flex-start',
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
});
