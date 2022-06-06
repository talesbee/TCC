import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {TextInputMask} from 'react-native-masked-text';

export default function Gestao({navigation}) {
  const user = useSelector(state => state.user);
  const [modalPerfil, setModalPerfil] = useState(false);
  const [modalNovoColaborador, setModalNovoColaborador] = useState(false);
  const [modalEditarColaborador, setModalEditarColaborador] = useState(false);
  const [modalRemoverColaborador, setModalRemoverColaborador] = useState(false);

  const [isAdmin, setModalIsAdmin] = useState(false);
  const [nomePerfil, setNomePerfil] = useState('');
  const [horaEntrada1, setModalHoraEntrada1] = useState('');
  const [horaEntrada2, setModalHoraEntrada2] = useState('');
  const [horaSaida1, setModalHoraSaida1] = useState('');
  const [horaSaida2, setModalHoraSaida2] = useState('');

  let refE1 = useRef();
  let refE2 = useRef();
  let refS1 = useRef();
  let refS2 = useRef();

  function savarPerfil(){

  }






  const toggleSwitch = () => setModalIsAdmin(previousState => !previousState);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons
          name={'md-people-outline'}
          size={moderateScale(150)}
          color={'black'}
        />
      </View>
      <View style={{flex: 1.5, justifyContent: 'space-around'}}>
        <View>
          <TouchableOpacity onPress={() => setModalPerfil(!modalPerfil)}>
            <View style={styles.cardView}>
              <View style={styles.ButtonStyle}>
                <Icon
                  name={'clipboard-clock-outline'}
                  color={'black'}
                  size={moderateScale(30)}
                />
                <Text style={styles.cardText}>Novo Perfil de Horário</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => setModalPerfil(!modalPerfil)}>
            <View style={styles.cardView}>
              <View style={styles.ButtonStyle}>
                <Icon
                  name={'clipboard-edit-outline'}
                  color={'black'}
                  size={moderateScale(30)}
                />
                <Text style={styles.cardText}>Editar Perfil de Horário</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => null}>
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
        <View>
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
        </View>
        <View>
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
        </View>
      </View>
      <View style={{flex: 0.2}}></View>
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
              <TouchableOpacity onPress={() => setModalPerfil(false)}>
                <View>
                  <Icon
                    color={'black'}
                    name="close-octagon-outline"
                    size={moderateScale(70)}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => null}>
                <View>
                  <Icon
                    color={'black'}
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
