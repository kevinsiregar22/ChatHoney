import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {colors} from '../../utils';
import React, {useState} from 'react';
import {Input, Button} from '@rneui/base';
import {ms} from 'react-native-size-matters';
import Poppins from '../../components/Poppins';
import FastImage from 'react-native-fast-image';
import {navigate} from '../../helpers/navigate';
import {ImageScreens} from '../../helpers/library';
import {ScrollView} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBack from '../../components/GoBack';

export default function Register() {
  const [, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessageEmail, setErrorMessageEmail] = useState(null);
  const [errorMessagePass, setErrorMessagePass] = useState(null);

  const checkemail = () => {
    let reqEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // console.log(reqEmail.test('email', email));
    if (!reqEmail.test(email)) {
      setErrorMessageEmail('Email is invalid!');
    } else {
      setErrorMessageEmail(null);
    }
  };

  const checkPass = () => {
    let reqPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{8,})/;
    // console.log(reqPass.test('password', password));
    if (!reqPass.test(password)) {
      setErrorMessagePass(
        'Password should contain at least least 8, one digit, lower case and uppercase!',
      );
    } else {
      setErrorMessagePass(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <GoBack />
        <View style={styles.imageContainer}></View>
        <FastImage
          source={ImageScreens.Register}
          style={styles.image}
          resizeMode="cover"
        />

        <Poppins
          type="Bold"
          size={30}
          textAlign="left"
          marginLeft={25}
          marginTop={20}>
          Sign Up
        </Poppins>

        <Input
          inputStyle={{fontSize: 18, paddingVertical: 15}}
          inputContainerStyle={{
            borderBottomWidth: 2,
            borderBottomLeftRadius: 80,
            borderColor: colors.border.color,
            borderRadius: 10,
          }}
          leftIconContainerStyle={{
            marginRight: 8,
            marginLeft: 10,
          }}
          placeholder="Username"
          leftIcon={{
            type: 'feather',
            name: 'user',
            size: 30,
            color: colors.icon.color,
          }}
          onChangeText={text => setUsername(text)}
        />

        <Input
          onBlur={() => checkemail()}
          errorMessage={errorMessageEmail ? errorMessageEmail : null}
          inputStyle={{fontSize: 18, paddingVertical: 15}}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomLeftRadius: 80,
            borderColor: colors.border.color,
            borderRadius: 10,
          }}
          leftIconContainerStyle={{
            marginRight: 8,
            marginLeft: 10,
          }}
          placeholder="Email"
          leftIcon={{
            type: 'entypo',
            name: 'email',
            size: 30,
            color: colors.icon.color,
          }}
          onChangeText={text => setEmail(text)}
        />

        <Input
          inputStyle={{
            fontSize: 18,
            paddingVertical: 15,
            alignContent: 'center',
            justifyContent: 'center',
          }}
          inputContainerStyle={{
            borderBottomWidth: 2,
            borderBottomLeftRadius: 80,
            borderColor: colors.border.color,
            borderRadius: 10,
          }}
          onBlur={() => checkPass()}
          errorMessage={errorMessagePass ? errorMessagePass : null}
          leftIconContainerStyle={{
            marginRight: 8,
            marginLeft: 15,
          }}
          placeholder="Password"
          leftIcon={{
            type: 'font-awesome-5',
            name: 'key',
            size: 30,
            color: colors.icon.color,
          }}
          onChangeText={text => setPassword(text)}
          secureTextEntry={showPassword}
          rightIcon={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setShowPassword(val => !val);
                }}>
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={ms(30)}
                />
              </TouchableOpacity>
            );
          }}
        />

        <Button
          title="Register"
          disabled={password === '' ? true : null}
          buttonStyle={{
            paddingVertical: ms(10),
            width: wp('80%'),
            alignSelf: 'center',
            borderRadius: ms(10),
            backgroundColor: colors.button.background,
          }}
          containerStyle={{
            paddingHorizontal: 10,
            marginTop: 25,
            marginBottom: 10,
          }}
          titleStyle={{
            fontSize: 24,
            letterSpacing: 3,
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        />

        <View style={styles.footer}>
          <Poppins>Already have an account? </Poppins>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Poppins color={colors.text.four} type="Bold" marginLeft={5}>
              Login
            </Poppins>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPage,
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
    marginTop: -10,
  },
  image: {
    width: wp('100%'),
    height: ms(230),
    borderRadius: ms(25),
  },
  logo: {
    width: ms(160),
    height: ms(160),
  },
  footer: {
    marginTop: ms(20),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textFooter: {
    paddingLeft: 10,
  },
});
