import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Switch,
  FlatList,
} from 'react-native';
import {ModalPermissao, ModalPermissaoEditar} from '../../componets';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import axios from 'axios';

const valoresIniciais = {
  Adm: false,
  NomePerfil: '',
  Entrada1: '',
  Saida1: '',
  Entrada2: '',
  Saida2: '',
};

export default function Gestao({navigation}) {
  const user = useSelector(state => state.user);

  const [modalPermissao, setModalPermissao] = useState(false);
  const [modalPermissaoEditar, setModalPermissaoEditar] = useState(false);
  const [modalNovoColaborador, setModalNovoColaborador] = useState(false);
  const [modalEditarColaborador, setModalEditarColaborador] = useState(false);
  const [modalRemoverColaborador, setModalRemoverColaborador] = useState(false);

  const [permissao, setPermissao] = useState(valoresIniciais);
  const [permissaoLista, setPermissaoLista] = useState([]);


  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons
          name={'md-people-outline'}
          size={moderateScale(150)}
          color={'black'}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <View>
          <TouchableOpacity onPress={() =>  navigation.navigate("Permissao")}>
            <View style={styles.cardView}>
              <View style={styles.ButtonStyle}>
                <Icon
                  name={'clipboard-clock-outline'}
                  color={'black'}
                  size={moderateScale(30)}
                />
                <Text style={styles.cardText}>Nova Permissâo</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View>
          <TouchableOpacity onPress={() =>editarPermissao()}>
            <View style={styles.cardView}>
              <View style={styles.ButtonStyle}>
                <Icon
                  name={'clipboard-edit-outline'}
                  color={'black'}
                  size={moderateScale(30)}
                />
                <Text style={styles.cardText}>Editar Permissão</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Colaborador")}>
            <View style={styles.cardView}>
              <View style={styles.ButtonStyle}>
                <Icon
                  name={'clipboard-account-outline'}
                  color={'black'}
                  size={moderateScale(30)}
                />
                <Text style={styles.cardText}>Novo Colaborador</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View>
          <TouchableOpacity onPress={() => null}>
            <View style={styles.cardView}>
              <View style={styles.ButtonStyle}>
                <Icon
                  name={'clipboard-edit-outline'}
                  color={'black'}
                  size={moderateScale(30)}
                />
                <Text style={styles.cardText}>Editar Colaborador</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
        {/* <View>
          <TouchableOpacity onPress={() => null}>
            <View style={styles.cardView}>
              <View style={styles.ButtonStyle}>
                <Icon
                  name={'clipboard-remove-outline'}
                  color={'black'}
                  size={moderateScale(30)}
                />
                <Text style={styles.cardText}>Remover Colaborador</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={{flex: 1}}>
        <ModalPermissaoEditar
          permissaoLista={permissaoLista}
          modalPermissaoEditar={modalPermissaoEditar}
          setModalPermissaoEditar={setModalPermissaoEditar}
          setPermissao={setPermissao}
          setModalPermissao={setModalPermissao}
        />
        
      </View>
    </View>
  );
}
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
