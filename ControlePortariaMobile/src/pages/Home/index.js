import React, {useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header} from '../../componets';

export default function Home({navigation}) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
