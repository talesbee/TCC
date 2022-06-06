import React, {useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Text, View, Button, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header} from '../../componets';
import {useNavigation} from '@react-navigation/native';
import {moderateScale, scale} from 'react-native-size-matters';
import {LogoCreaRedondo} from '../../assets';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

export default function Home() {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, padding: moderateScale(5)}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconAntDesign
              name="menuunfold"
              size={moderateScale(30)}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{flex: 10, justifyContent: 'center', paddingLeft: scale(50)}}>
          <Image
            style={{resizeMode: 'contain'}}
            source={LogoCreaRedondo}></Image>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{color: 'black', fontSize: moderateScale(25)}}>
          Controle Portaria
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: moderateScale(20),
            fontWeight: 'bold',
          }}>
          Bem vindo
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: moderateScale(20),
            fontWeight: '600',
          }}>
          {user.nome}
        </Text>
      </View>
    </View>
  );
}
