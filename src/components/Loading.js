import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../utils';

export default function Loading() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator
        style={{marginBottom: moderateScale(8)}}
        color={colors.background.primary}
        size={moderateScale(32)}
      />
      <Text>Loading ...</Text>
    </View>
  );
}
