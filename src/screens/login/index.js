import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Google from '../google';
import {colors} from '../../utils';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setDataUser} from './redux/action';
import {Input, Button} from '@rneui/base';
import {ms} from 'react-native-size-matters';
import Poppins from '../../components/Poppins';
import {navigate} from '../../helpers/navigate';
import FastImage from 'react-native-fast-image';
import {configDb} from '../../helpers/configDb';
import {ImageScreens} from '../../helpers/library';
import authTypes from '@react-native-firebase/auth';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const auth = authTypes();

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);

  const [userState, setUserState] = useState({
    email: '',
    password: '',
  });

  const LoginWithEmail = async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(
        userState.email,
        userState.password,
      );
      let isUpdate = true;

      if (isUpdate) {
        const results = await configDb
          .ref(`users/${res.user.uid}`)
          .once('value');
        if (results.val()) {
          dispatch(setDataUser(results.val()));
          navigate('Home');
        }
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('The password is invalid');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('The email address is badly formatted');
      }
    }
  };

  const handleUserState = (field, value) => {
    setUserState(prevState => {
      prevState[field] = value;
      return {
        ...prevState,
      };
    });
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
          onChangeText={text => handleUserState('email', text)}
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
          // onBlur={() => checkPass()}
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
          onChangeText={text => handleUserState('password', text)}
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
          onPress={LoginWithEmail}
          title="Login"
          // disabled={password === '' ? true : null}
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
};

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
