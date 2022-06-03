import React from 'react';
import {AtualizarFiscalizacao, BuscarFiscalizacao, BuscarFiscalizacaoCode, InserirFiscalizacao,delFiscalizacaoId} from '../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getID} from '../utils';
import Enuns from '../data/Enuns';

function jsonString(json){
  return JSON.stringify(json);
}

async function newFiscalizacaoTemp() {
  
  try {
    await delFiscalizacaoTemp();
    let fisc = {
      Id: getID(),
      Imagens: [],
      isUpdate: false,
      Obra: Enuns.fiscalizacao.Obra,
      Responsavel: Enuns.fiscalizacao.Responsavel,
      Contratante: Enuns.fiscalizacao.Contratante,
      Proprietario: Enuns.fiscalizacao.Proprietario,
    }

    await setStorage('@storage_Fiscalizacao', fisc);
  } catch (e) {
    console.log('Erro ao criar: ' + e);
  }
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

const getFiscalizacaoTemp = async () => {
  try {
    return new Promise(async resolve => {
      const value = await AsyncStorage.getItem('@storage_Fiscalizacao');

      if (value !== null) {
        const obj = JSON.parse(value);
        resolve(obj);
      }
    });
  } catch (e) {
    console.log('Erro ao recuperar: ' + e);
  }
};

const setFiscalizacaoTemp = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_Fiscalizacao', jsonValue);
  } catch (e) {
    console.log('Erro ao salvar: ' + e);
  }
};

const upFiscalizacaoTemp = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem('@storage_Fiscalizacao', jsonValue);
  } catch (e) {
    console.log('Erro ao salvar: ' + e);
  }
};

const delFiscalizacaoTemp = async () => {
  try {
    await AsyncStorage.removeItem('@storage_Fiscalizacao');
  } catch (e) {
    // remove error
  }
};

const getFiscalizacao = async () =>{
  try{
    return BuscarFiscalizacao();
  }catch(e){
    console.log('Erro ao Buscar: ',e);
  }
}

const getFiscalizacaoCode = async (code) =>{
  try{
    return await BuscarFiscalizacaoCode(code);
  }catch(e){
    console.log('Erro ao Buscar Code: ',e);
  }
}

const setFiscalizacao = async (fisc) => {
  return InserirFiscalizacao(fisc);
}

const upFiscalizacao = async (fisc) =>{
  return AtualizarFiscalizacao(fisc);
}

const delFiscalizacao = async (id)=>{
  await delFiscalizacaoId(id);
}


export {
  getFiscalizacaoTemp,
  setFiscalizacaoTemp,
  upFiscalizacaoTemp,
  delFiscalizacaoTemp,
  newFiscalizacaoTemp,
  getFiscalizacao,
  getFiscalizacaoCode,
  setFiscalizacao,
  upFiscalizacao,
  delFiscalizacao,
  setStorage,
  getStorage
};
