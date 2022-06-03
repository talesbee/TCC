import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {LogoCreaRedondo} from '../../assets';
import {TextInputMask} from 'react-native-masked-text';
import {getActualDate, compararDatas} from '../../utils';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import * as userActions from '../../store/actions/user';

const initialUser = {
  UsuarioID: null,
  PessoaID: null,
  Email: null,
  Nome: null,
  Cpf: null,
  data: null,
  isAutenticated: false,
};

function Login(props) {
  const [isDateSave, setIsDateSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, onChangeUser] = useState('');
  const [userPass, onChangeUserPass] = useState('');
  const [userData, setUserData] = useState(initialUser);
  const navigation = useNavigation();
  const passRef = useRef(null);

  useEffect(() => {
    setIsLoading(false);
    if (__DEV__) {
      onChangeUser('03606557183');
      onChangeUserPass('arlequina');
    }
  }, []);

  // const BuscarDadosLogin = async () => {
  //   const sysKey = '4AC8E05199124D208C3E886BD51D9624';
  //   try {
  //     setIsLoading(true);
  //     await axios
  //       .get(
  //         `https://hwcf.crea-mt.org.br/Autenticacao/UsuarioService.svc/autenticar/json?sysKey=${sysKey}&cpf=${user}&senha=${userPass}`,
  //       )
  //       .then(response => {
  //         if (response.data.EhValido) {
  //           setUserData({
  //             UsuarioID: response.data.Usuario.UsuarioID,
  //             PessoaID: response.data.Usuario.PessoaID,
  //             Email: response.data.Usuario.Email,
  //             Nome: response.data.Usuario.Nome,
  //             Cpf: response.data.Usuario.Cpf,
  //             isAutenticated: response.data.EhValido,
  //             data: getActualDate(),
  //           });
  //         } else {
  //           Alert.alert('Erro no Login', response.data.Mensagem);
  //         }
  //       })
  //       .catch();
  //     setIsLoading(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   if (userData.UsuarioID) {
  //     props.login(userData);
  //     if (!inserirUsuario(userData)) {
  //       //console.log('Erro Realm!');
  //     } else {
  //       //console.log('Registrado!');
  //     }
  //   }
  // }, [userData]);

  // const autenticacao = () => {
  //   console.log(isDateSave);
  //   if (!isDateSave) {
  //     const cpfIsValid = cpfField.isValid();
  //     if (cpfIsValid) {
  //       BuscarDadosLogin();
  //     } else {
  //       Alert.alert('Erro no Login', 'Prencha todos os campos corretamente!');
  //     }
  //   }
  // };

  return (
    <View>
      <View style={{height: '100%'}}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{flex:1, resizeMode: 'contain'}}
            source={LogoCreaRedondo}></Image>
          <Text style={{flex: 0.3, fontSize:moderateScale(25), color:'black', fontWeight:'bold'}}>Controle Portaria</Text>
        </View>
        <View style={{flex: 2}}>
          <View style={{paddingTop: '5%'}}>
            <View style={{paddingLeft: '10%'}}>
              <Text style={{color: 'black', fontSize: scale(18)}}>User</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeUserPass}
                value={user}
                placeholder="Digite seu Usuário"
                ref={passRef}
                autoComplete={'password'}
                onSubmitEditing={() => autenticacao()}
              />
              <Text style={{color: 'black', fontSize: scale(18)}}>Pass</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeUserPass}
                value={userPass}
                placeholder="Digite sua Senha"
                ref={passRef}
                secureTextEntry
                autoComplete={'password'}
                onSubmitEditing={() => autenticacao()}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={{width: '50%', paddingTop: '5%'}}>
                <TouchableOpacity onPress={() => autenticacao()}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: scale(40),
                      backgroundColor: isLoading ? '#8bc34a' : '#0040C0',
                    }}>
                    {isLoading ? (
                      <ActivityIndicator size="large" color="yellow" />
                    ) : (
                      <Text style={styles.buttonText}>Login</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, userActions)(Login);

const styles = StyleSheet.create({
  input: {
    height: verticalScale(35),
    width: '80%',
    margin: scale(12),
    fontSize: verticalScale(18),
    borderWidth: 1,
    padding: scale(5),
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: scale(240),
    height: verticalScale(70),
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(20),
  },
});
