import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import * as permissaoActions from '../../../store/actions/permissao';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';

const valoresIniciais = {
  nome: '',
  telefone: '',
  endereco: '',
  codTag: '',
  userMobile: '',
  passwordMobile: '',
};

const permissao = {
  label: '',
  value: 0,
};

function ColaboradorScrean() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState(valoresIniciais.nome);
  const [telefone, setTelefone] = useState(valoresIniciais.telefone);
  const [endereco, setEndereco] = useState(valoresIniciais.endereco);
  const [codTag, setCodTag] = useState(valoresIniciais.codTag);
  const [userMobile, setUserMobile] = useState(valoresIniciais.userMobile);
  const [permissaoLista, setPermissaoLista] = useState([]);
  const [permissaoSelected, setPermissaoSelected] = useState(permissao);
  const [passwordMobile, setPasswordMobile] = useState(
    valoresIniciais.passwordMobile,
  );

  useEffect(() => {
    console.log(permissaoSelected);
  }, [permissaoSelected]);

  const [permissao, setPermissao] = useState();

  function limparPerfil() {
    setNome(valoresIniciais.nome);
    setTelefone(valoresIniciais.telefone);
    setEndereco(valoresIniciais.endereco);
    setCodTag(valoresIniciais.codTag);
    setUserMobile(valoresIniciais.userMobile);
    setPasswordMobile(valoresIniciais.passwordMobile);
    setPermissao(0);
  }

  useEffect(() => {
    buscarLista();
  }, []);

  async function buscarLista() {
    let list = [];
    try {
      await axios
        .get(`http://tbiot.hopto.org:82/api/Permissaos`)
        .then(response => {
          response.data.forEach(item => {
            list.push({label: item.nomePerfil, value: item.id});
          });
          setPermissaoLista(list);
        })
        .catch();
    } catch (e) {
      console.log(e);
    }
  }

  async function savarPerfil() {
    if (
      nome != '' &&
      telefone != '' &&
      endereco != '' &&
      codTag != '' &&
      userMobile != '' &&
      permissaoLista != '' &&
      permissaoSelected != '' &&
      passwordMobile != '' &&
      permissaoSelected != ''
    ) {
      let colaborador = {
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        codTag: codTag,
        userMobile: userMobile,
        passwordMobile: passwordMobile,
        permissao: permissaoSelected,
      };
      try {
        await axios
          .post(
            `http://tbiot.hopto.org:82/api/Interacao/PostColaborador`,
            colaborador,
          )
          .then(response => {
            if (response.data.sucesso) {
              Alert.alert('Cadastro', 'Cadastrado com sucesso', [
                {text: 'OK', onPress: () => navigation.navigate('Gestao')},
              ]);
            }
          })
          .catch();
      } catch (e) {
        console.log(e);
      }
      limparPerfil();
    } else {
      Alert.alert('Erro', 'Preencha todos os campos!');
    }
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 1, padding: moderateScale(25)}}>
          <View style={styles.modalStyle}>
            <View
              style={{
                flex: 0.3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'black', fontSize: moderateScale(20)}}>
                Cadastro de Colaborador
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                paddingLeft: scale(30),
                justifyContent: 'space-around',
              }}>
              <Text style={{color: 'black', fontSize: scale(15)}}>
                Nome do Colaborador
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setNome}
                value={nome}
                placeholder="Nome do Colaborador"
                onSubmitEditing={() => null}
              />
              <Text style={{color: 'black', fontSize: scale(15)}}>
                Perfil do Colaborador
              </Text>
              <RNPickerSelect
                style={styles.input}
                placeholder={permissao}
                items={permissaoLista}
                onValueChange={value => {
                  setPermissaoSelected(value);
                }}
                value={permissaoSelected}
              />
              <Text style={{color: 'black', fontSize: scale(15)}}>
                Telefone
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setTelefone}
                value={telefone}
                placeholder="Telefone"
                onSubmitEditing={() => null}
              />
              <Text style={{color: 'black', fontSize: scale(15)}}>
                Endereço
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setEndereco}
                value={endereco}
                placeholder="Endereço"
                onSubmitEditing={() => null}
              />
              <Text style={{color: 'black', fontSize: scale(15)}}>
                Codigo Tag
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setCodTag}
                value={codTag}
                placeholder="Codigo Tag"
                onSubmitEditing={() => null}
              />
              <Text style={{color: 'black', fontSize: scale(15)}}>
                UsuarioMobile
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setUserMobile}
                value={userMobile}
                placeholder="UsuarioMobile"
                onSubmitEditing={() => null}
              />
              <Text style={{color: 'black', fontSize: scale(15)}}>
                SenhaMobile
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setPasswordMobile}
                value={passwordMobile}
                placeholder="SenhaMobile"
                onSubmitEditing={() => null}
              />
            </View>
            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => limparPerfil()}>
                <View>
                  <Icon
                    color={'black'}
                    name="close-octagon-outline"
                    size={moderateScale(70)}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => savarPerfil()}>
                <View>
                  <Icon
                    color={isLoading ? 'gray' : 'black'}
                    name="content-save-settings-outline"
                    size={moderateScale(70)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default connect(null, permissaoActions)(ColaboradorScrean);

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
