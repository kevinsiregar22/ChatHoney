import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
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
import authProvider from '@react-native-firebase/auth';
import {configDb} from '../../helpers/configDb';

const auth = authProvider();

export default function Register() {
  const [, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessageEmail, setErrorMessageEmail] = useState(null);
  const [errorMessagePass, setErrorMessagePass] = useState(null);

  const [userState] = useState({
    email: '',
    password: '',
  });

  const createUserByEmail = async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      console.log(res);
      if ('email' in res.user && res.user.email) {
        await auth.currentUser.updateProfile({
          displayName: userState.setUsername,
        });
        await configDb.ref(`users/${res.user.uid}`).set({
          displayName: userState.setUsername,
          email: res.user.email,
          phone: res.user.phoneNumber,
          image: res.user.photoURL,
          contact: [],
          roomChat: [],
          _id: res.user.uid,
        });
        Alert.alert('User account created & signed in!');
        navigate('Home');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
        navigate('Login');
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
        navigate('Login');
      }
      // console.error(error);
    }
  };

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
          onPress={createUserByEmail}
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
