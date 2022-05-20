import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Poppins = ({
  type = 'Regular',
  children,
  color = '#14233E',
  size = 16,
  textAlign = 'center',
  marginLeft = 0,
  marginBottom = 0,
  marginTop = 0,
  marginRight = 0,
}) => {
  //styled
  const style = StyleSheet.create({
    text: {
      color: color,
      fontFamily: `Poppins-${type}`,
      fontSize: size,
      textAlign: textAlign,
      marginLeft: marginLeft,
      marginBottom: marginBottom,
      marginTop: marginTop,
      marginRight: marginRight,
      ...style,
    },
  });
  return <Text style={style.text}>{children}</Text>;
};

export default Poppins;
