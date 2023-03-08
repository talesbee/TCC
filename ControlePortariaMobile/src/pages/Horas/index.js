import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Header } from '../../componets';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { getHoras, getDate } from '../../utils';

export default function Horas({ navigation }) {
  const user = useSelector(state => state.user);
  const [listaHoras, setListaHoras] = useState([]);

  useEffect(() => {
    buscarHoras();
  }, []);

  async function buscarHoras() {
    try {
      await axios
        .get(
          `http://tbiot.hopto.org:82/api/Interacao/GetHoras?id=${user.idColaborador}`,
        )
        .then(response => {
          if (response.data.sucesso) {
            setListaHoras(response.data.data);
          }
        })
        .catch();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: moderateScale(25), color: 'black' }}>
          Suas Horas Registradas
        </Text>
        <Text style={{ fontSize: moderateScale(20), color: 'black' }}>
          {user.nome}
        </Text>
        <TouchableOpacity onPress={() => buscarHoras()}>
          <Text style={{ fontSize: moderateScale(15), color: 'red' }}>Buscar Horas</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2 }}>
        <FlatList
          data={listaHoras}
          renderItem={({ item, index }) => (
            <View
              style={{ paddingBottom: verticalScale(15), paddingLeft: scale(25), paddingRight: scale(25) }}>
              <View style={styles.ButtonStyle}>
                <Text style={{ color: 'black', fontSize: moderateScale(15) }}>Dia: {getDate(new Date(item.data))}</Text>
                <Text style={{ color: 'black', fontSize: moderateScale(15) }}>Hora: {getHoras(new Date(item.data))}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  ButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: scale(10),
    paddingLeft: scale(15),
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
