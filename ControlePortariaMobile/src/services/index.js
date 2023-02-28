import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getID} from '../utils';
import Enuns from '../data/Enuns';

function jsonString(json){
  return JSON.stringify(json);
}

async function setStorage(local,data){
  await AsyncStorage.setItem(local, jsonString(data));
}

async function getStorage(local){
  try {
    return new Promise(async resolve => {
      const value = await AsyncStorage.getItem(local);
      if (value !== null) {
        const obj = JSON.parse(value);
        resolve(obj);
      }
    });
  } catch (e) {
    console.log('Erro ao recuperar: ' + e);
  }
}




export {
  setStorage,
  getStorage
};
