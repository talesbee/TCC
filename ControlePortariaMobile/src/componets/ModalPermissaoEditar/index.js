import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import ModalPermissao from '../ModalPermissao';
import {connect} from 'react-redux';
import * as permissaoActions from '../../store/actions/permissao';
import {useNavigation} from '@react-navigation/native';

function ModalPermissaoEditar(props) {
  const navigation = useNavigation();
  const {
    permissaoLista,
    modalPermissaoEditar = false,
    setModalPermissaoEditar = () => null,
    setPermissao = () => null,
  } = props;

  function permissaoSelecionado(item, index) {
    item.atualizar = true;
    item.id = index;
    props.permissaoUp(item);
    setModalPermissaoEditar(false);
    navigation.navigate('Permissao');
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPermissaoEditar}
        onRequestClose={() => {
          setModalPermissaoEditar(!modalPermissaoEditar);
        }}>
        <View style={{flex: 1, padding: moderateScale(25)}}>
          <View style={styles.modalStyle}>
            <View
              style={{
                flex: 0.3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'black', fontSize: moderateScale(20)}}>
                Selecione o Perfil
              </Text>
            </View>
            <View style={{flex: 3}}>
              <FlatList
                data={permissaoLista}
                renderItem={({item, index}) => (
                  <View style={{paddingBottom: verticalScale(15)}}>
                    <TouchableOpacity
                      onPress={() => permissaoSelecionado(item, index)}>
                      <View style={styles.cardView}>
                        <View style={styles.ButtonStyle}>
                          <Icon
                            name={'clipboard-check-outline'}
                            color={'black'}
                            size={moderateScale(30)}
                          />
                          <Text style={styles.cardText}>{item.nomePerfil}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <View style={{flex: 0.5, alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setModalPermissaoEditar(false)}>
                <View>
                  <Icon
                    color={'black'}
                    name="close-octagon-outline"
                    size={moderateScale(70)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default connect(null, permissaoActions)(ModalPermissaoEditar);

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
  cardView: {
    paddingLeft: scale(35),
    paddingRight: scale(35),
  },
  cardText: {
    color: 'black',
    paddingLeft: scale(15),
    fontSize: moderateScale(20),
  },
  modalStyle: {
    flex: 1,
    backgroundColor: '#D8D8D8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  input: {
    height: verticalScale(35),
    width: '80%',
    margin: scale(12),
    fontSize: verticalScale(15),
    borderWidth: 1,
    padding: scale(5),
  },
});
