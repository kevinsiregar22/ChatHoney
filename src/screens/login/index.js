import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Google from '../google';
import {colors} from '../../utils';
import React, {useState} from 'react';
import {Input, Button} from '@rneui/base';
import {ms} from 'react-native-size-matters';
import Poppins from '../../components/Poppins';
import {navigate} from '../../helpers/navigate';
import FastImage from 'react-native-fast-image';
import {ImageScreens} from '../../helpers/library';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessageEmail, setErrorMessageEmail] = useState(null);
  const [errorMessagePass, setErrorMessagePass] = useState(null);

  const checkemail = () => {
    let req = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // console.log(req.test('email', email));
    if (!req.test(email)) {
      setErrorMessageEmail('Email is invalid!');
    } else {
      setErrorMessageEmail(null);
    }
  };

  const checkPass = () => {
    let reqPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var strongRegex = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    );
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
        <View style={styles.imageContainer}></View>
        <FastImage
          source={ImageScreens.Login}
          style={styles.image}
          resizeMode="cover"
        />

        <Poppins
          type="Bold"
          size={30}
          marginTop={20}
          marginLeft={25}
          textAlign="left">
          Sign In
        </Poppins>

        <Input
          onBlur={() => checkemail()}
          errorMessage={errorMessageEmail ? errorMessageEmail : null}
          inputStyle={{fontSize: 18, paddingVertical: 15}}
          inputContainerStyle={{
            borderRadius: 10,
            borderBottomWidth: 1,
            borderBottomLeftRadius: 100,
            borderColor: colors.border.color,
          }}
          leftIconContainerStyle={{
            marginRight: 8,
            marginLeft: 10,
          }}
          placeholder="Email"
          leftIcon={{
            size: 30,
            name: 'email',
            type: 'entypo',
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
            size: 30,
            name: 'key',
            type: 'font-awesome-5',
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
          title="Login"
          disabled={password === '' ? true : null}
          buttonStyle={{
            width: wp('80%'),
            alignSelf: 'center',
            borderRadius: ms(10),
            paddingVertical: ms(10),
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
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        />
        <Poppins type="Bold" size={15}>
          OR
        </Poppins>
        <TouchableOpacity>
          <Google />
        </TouchableOpacity>
        <View style={styles.footer}>
          <Poppins>Don't have a account? </Poppins>
          <TouchableOpacity onPress={() => navigate('Register')}>
            <Poppins color={colors.text.four} type="Bold">
              Register
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    flex: 1,
    marginTop: 10,
  },
  image: {
    height: ms(250),
    width: wp('100%'),
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
});

export default Login;
