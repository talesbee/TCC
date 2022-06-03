import React, {useEffect} from 'react';
import {CleanUsuario} from '../../data';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import {scale} from 'react-native-size-matters';
import {getID} from '../../utils';

import {connect} from 'react-redux';
import * as visitaAction from '../../store/actions';


function SideMenu() {
  const navigation = useNavigation();
  let version = DeviceInfo.getVersion();

  const storeData = async () => {
    try {
      //props.logout();
      CleanUsuario();
    } catch (e) {
      // saving error
      //console.log('Error: ' + e);
    }
  };

  async function novaFiscalizacao() {
    try {
      let fisc = {
        Id: getID(),
        isUpdate: false,
      };
      //.fiscUp(fisc);
      navigation.navigate('Visita');
    } catch (e) {
      console.log('Erro ao criar: ' + e);
    }
  }

  const ButtonMenu = props => {
    const {title, onPress = () => null, icon} = props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            padding: scale(5),
            paddingLeft: scale(20),
            paddingRight: scale(20),
          }}>
          <View style={styles.ButtonStyle}>
            <Icon name={icon} size={scale(30)} color="black" />
            <Text style={{paddingLeft: scale(10)}}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#E5E5E5',
        justifyContent: 'space-around',
        heigth: '100%',
      }}>
      <View
        style={{
          paddingTop: scale(15),
          paddingBottom: scale(15),
          alignItems: 'center',
        }}>
        {/* <Text>Bem Vindo {props.user.Nome.split(' ')[0]}</Text> */}
      </View>
      <ButtonMenu
        title={'Novo RF'}
        onPress={() => novaFiscalizacao()}
        icon={'clipboard-edit-outline'}
      />
      <ButtonMenu
        title={'Sincronização'}
        onPress={() => navigation.navigate('Sincronizar')}
        icon={'cloud-sync-outline'}
      />
      <ButtonMenu
        title={'Exportar'}
        onPress={() => navigation.navigate('Exportar')}
        icon={'database-export-outline'}
      />

      <ButtonMenu
        title={'Deslogar'}
        onPress={() => storeData()}
        icon={'account-remove-outline'}
      />

      <View style={styles.TextMenuStyle}>
        <Text>Ultima Sincronização: X dias</Text>
      </View>
      <View style={styles.TextMenuStyle}>
        <Text>Visitas não exportadas: X</Text>
      </View>
      <View style={styles.TextMenuStyle}>
        <Text>Versão e-Fisc: {version}</Text>
      </View>
    </View>
  );
}
const mapStateToProps = state => ({
  fiscalizacao: state.fiscalizacao,
  user: state.user,
})

const styles = StyleSheet.create({
  ButtonStyle: {
    padding: scale(10),
    paddingLeft: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  TextMenuStyle: {
    paddingLeft: scale(20),
    paddingTop: scale(15),
  },
});

export default SideMenu;

//export default SideMenu);



