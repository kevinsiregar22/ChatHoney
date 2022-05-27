import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {IconLists} from '../helpers/library';
import FastImage from 'react-native-fast-image';
import {ms} from 'react-native-size-matters';

import {navigate} from '../helpers/navigate';

export default function GoBack(navigation) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigate('Home')}>
        <FastImage
          source={IconLists.arrowBack}
          style={styles.icons}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    height: ms(30),
    width: ms(30),
    margin: 10,
  },
});
