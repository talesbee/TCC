import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Switch,
  Alert
} from 'react-native';
import axios from 'axios';
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const valoresIniciais = {
  Adm: false,
  NomePerfil: '',
  Entrada1: '',
  Saida1: '',
  Entrada2: '',
  Saida2: '',
};

export default function ModalPermissao(props) {
  const {
    modalPerfil = false,
    setModalPerfil = () => null,
    permissao = valoresIniciais,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setModalIsAdmin] = useState(permissao.Adm);
  const [nomePerfil, setNomePerfil] = useState(permissao.NomePerfil);
  const [horaEntrada2, setModalHoraEntrada2] = useState(permissao.Saida1);
  const [horaEntrada1, setModalHoraEntrada1] = useState(permissao.Entrada1);
  const [horaSaida2, setModalHoraSaida2] = useState(permissao.Saida2);
  const [horaSaida1, setModalHoraSaida1] = useState(permissao.Entrada2);
  let refE1 = useRef();
  let refE2 = useRef();
  let refS1 = useRef();
  let refS2 = useRef();

  function limparPerfil() {
    setModalIsAdmin(valoresIniciais.Adm);
    setNomePerfil(valoresIniciais.NomePerfil);
    setModalHoraEntrada1(valoresIniciais.Saida1);
    setModalHoraEntrada2(valoresIniciais.Entrada1);
    setModalHoraSaida1(valoresIniciais.Saida2);
    setModalHoraSaida2(valoresIniciais.Entrada2);
    setModalPerfil(false);
  }

  async function savarPerfil() {
    if (
      nomePerfil != '' &&
      horaEntrada1 != '' &&
      horaSaida1 != '' &&
      horaEntrada2 != '' &&
      horaSaida2 != ''
    ) {
      let permissao = {
        Adm: isAdmin,
        NomePerfil: nomePerfil,
        Entrada1: horaEntrada1,
        Saida1: horaSaida1,
        Entrada2: horaEntrada2,
        Saida2: horaSaida2,
      };
      try {
        setIsLoading(true);
        await axios
          .post(`http://tbiot.hopto.org:82/api/Permissaos`, permissao)
          .then(response => {
            console.log(response.data);
          })
          .catch();
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
      limparPerfil();
    }else{
        Alert.alert("Erro","Preencha todos os campos!");
    }
  }

  const toggleSwitch = () => setModalIsAdmin(previousState => !previousState);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPerfil}
        onRequestClose={() => {
          setModalPerfil(!modalPerfil);
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
                Cadastro de Horário
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                paddingLeft: scale(30),
                justifyContent: 'space-around',
              }}>
              <Text style={{color: 'black', fontSize: scale(15)}}>
                Nome do Perfil
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setNomePerfil}
                value={nomePerfil}
                placeholder="Nome do Perfil"
                onSubmitEditing={() => null}
              />
              <Text style={{color: 'black', fontSize: scale(15)}}>
                Entrada 1
              </Text>
              <TextInputMask
                type={'datetime'}
                options={{
                  format: 'HH:mm',
                }}
                value={horaEntrada1}
                onChangeText={text => {
                  setModalHoraEntrada1(text);
                }}
                style={styles.input}
                ref={ref => (refE1 = ref)}
                returnKeyType={'next'}
                placeholder={'Hora entrada 1'}
                onSubmitEditing={() => refS1.current?.focus()}
              />
              <Text style={{color: 'black', fontSize: scale(15)}}>Saida 1</Text>
              <TextInputMask
                type={'datetime'}
                options={{
                  format: 'HH:mm',
                }}
                value={horaSaida1}
                onChangeText={text => {
                  setModalHoraSaida1(text);
                }}
                style={styles.input}
                ref={ref => (refS1 = ref)}
                returnKeyType={'next'}
                placeholder={'Hora Saida 1'}
                onSubmitEditing={() => refE2.current?.focus()}
              />
              <Text style={{color: 'black', fontSize: scale(15)}}>
                Entrada 2
              </Text>
              <TextInputMask
                type={'datetime'}
                options={{
                  format: 'HH:mm',
                }}
                value={horaEntrada2}
                onChangeText={text => {
                  setModalHoraEntrada2(text);
                }}
                style={styles.input}
                ref={ref => (refE2 = ref)}
                returnKeyType={'next'}
                placeholder={'Hora entrada 2'}
                onSubmitEditing={() => refS2.current?.focus()}
              />
              <Text style={{color: 'black', fontSize: scale(15)}}>Saida 2</Text>
              <TextInputMask
                type={'datetime'}
                options={{
                  format: 'HH:mm',
                }}
                value={horaSaida2}
                onChangeText={text => {
                  setModalHoraSaida2(text);
                }}
                style={styles.input}
                ref={ref => (refS2 = ref)}
                placeholder={'Hora Saida 2'}
                onSubmitEditing={() => null}
              />
            </View>
            <View
              style={{
                flex: 0.1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Perfil de Admin: </Text>
              <Switch
                trackColor={{false: '#767577', true: '#767577'}}
                thumbColor={isAdmin ? '#58FA58' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isAdmin}
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
      </Modal>
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
