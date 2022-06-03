import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {connect} from 'react-redux';

function DrawerMenu(props) {
  const navigation = useNavigation();
  let version = DeviceInfo.getVersion();

  const deslogar = async () => {
    try {
      props.logout();
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

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
            <Text
              style={{
                paddingLeft: scale(15),
                color: 'black',
                fontSize: moderateScale(18),
              }}>
              {title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (

    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 0.3,
        }}>
        <Text style={{fontSize: moderateScale(20), color: 'black'}}>
          Bem Vindo
        </Text>

      </View>
      <View style={{flex: 2}}>
        <ButtonMenu
          title={'Home'}
          onPress={() => navigation.navigate('Fiscalizacao')}
          icon={'home-outline'}
        />
        <ButtonMenu
          title={'Deslogar'}
          onPress={() => deslogar()}
          icon={'account-remove-outline'}
        />
      </View>
      <View style={{flex: 0.7}}>
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
  TextMenuStyle: {
    paddingLeft: scale(20),
    paddingTop: scale(15),
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(DrawerMenu);
