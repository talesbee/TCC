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
  nome: null,
  idColaborador: null,
  admin: false,
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
    navigation.closeDrawer();
  }, []);

  const BuscarDadosLogin = async () => {
    try {
      setIsLoading(true);
      await axios
        .get(
          `http://tbiot.hopto.org:82/api/Interacao/GetLogin?user=${user}&pass=${userPass}`,
        )
        .then(response => {
          if(response.data.sucesso){
            userData.admin = response.data.data.admin;
            userData.idColaborador = response.data.data.idColaborador;
            userData.isAutenticated = true;
            userData.nome = response.data.data.nome;
            props.login(userData);
            setUserData(userData);
          }else{
            Alert.alert("Erro Login","Usuário ou senha inválidos!")
          }
        })
        .catch();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

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
                placeholderTextColor="gray"
                onChangeText={onChangeUser}
                value={user}
                placeholder="Digite seu Usuário"
                autoComplete={'username'}
                onSubmitEditing={()=> passRef.current.focus()}
              />
              <Text style={{color: 'black', fontSize: scale(18)}}>Pass</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                onChangeText={onChangeUserPass}
                value={userPass}
                placeholder="Digite sua Senha"
                ref={passRef}
                secureTextEntry
                autoComplete={'password'}
                onSubmitEditing={()=> BuscarDadosLogin()}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={{width: '50%', paddingTop: '5%'}}>
                <TouchableOpacity onPress={() => BuscarDadosLogin()}>
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
    color: 'black',
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
