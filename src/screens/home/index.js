import React, {useCallback, useEffect, useState} from 'react';
import {View, StatusBar, StyleSheet, Text, RefreshControl} from 'react-native';
import {colors} from '../../utils';
import {Avatar} from '@rneui/base';
import Header from '../../components/Header';
import {ms} from 'react-native-size-matters';
import {setChoosenUser} from './redux/action';
import {navigate} from '../../helpers/navigate';
import {configDb} from '../../helpers/configDb';
import Loading from '../../components/Loading';
import {setLoading} from '../../store/globalAction';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function Search() {
  const dispatch = useDispatch();
  const {isLoading, isRefresh} = useSelector(state => state.global);
  const {_user = {email: ''}} = useSelector(state => state.user);
  const [data, setData] = useState([]);

  const saveSelectedPerson = payload => {
    dispatch(setChoosenUser(payload));
    navigate('Chat');
  };

  const getAllData = useCallback(async () => {
    try {
      const res = await configDb.ref('/users').once('value');
      const userList = Object.values(res.val()).filter(
        val => val.email !== _user.email,
      );
      setData(userList);
      dispatch(isRefresh(false));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      dispatch(isRefresh(false));
    }
  }, []);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const CardComponent = props => {
    const {name, email, photo} = props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={style.container}
        onPress={() => saveSelectedPerson(props)}>
        <View style={style.avatarContainer}>
          <View>
            <Avatar
              size={56}
              rounded
              source={{
                uri: photo ?? 'https://randomuser.me/api/portraits/men/36.jpg',
              }}
            />
          </View>
          <View style={style.desc}>
            <Text style={style.text}>{name}</Text>
            <Text style={style.text}>{email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderItem = ({item = {displayName: '', email: '', photoURL: ''}}) => {
    const {displayName, email, photoURL} = item;
    return (
      <CardComponent
        name={displayName}
        email={email}
        photo={photoURL}
        {...item}
      />
    );
  };

  const handleOnRefresh = () => {
    getAllData();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <Header />
      <StatusBar hidden />
      <FlatList
        refreshControl={<RefreshControl refreshing={isRefresh} />}
        data={data}
        keyExtractor={item => item._id}
        renderItem={RenderItem}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(32),
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  desc: {
    paddingVertical: ms(10),
    marginLeft: ms(25),
  },
  text: {
    color: colors.text.primary,
    fontSize: 15,
  },
});
