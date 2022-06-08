import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {enableScreens} from 'react-native-screens';

import LoginScreen from '../../pages/Login';
import HomeScrean from '../../pages/Home';
import HoraScrean from '../../pages/Horas';
import GestaoScrean from '../../pages/Gestao';

import PermissaoScrean from '../../pages/Gestao/Permissao';
import ColaboradorScrean from '../../pages/Gestao/Colaborador';

import {connect} from 'react-redux';
import {DrawerMenu} from '../../componets';
import * as userAction from '../../store/actions';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

enableScreens();
const RootStack = props => {
  const Drawer = createDrawerNavigator();
  const isLoggedIn = useSelector(state => state.user.isAutenticated);

  return (
    <Drawer.Navigator
      initialRouteName="Login"
      defaultStatus="closed"
      screenOptions={{
        drawerStyle: {
          width: isTablet ? '60%' : '70%',
        },
      }}
      drawerContent={props => <DrawerMenu {...props} />}>
      {isLoggedIn ? (
        <>
          <Drawer.Screen name="Home" component={HomeScrean} options={{headerShown: false}}/>
          <Drawer.Screen name="Hora" component={HoraScrean} options={{headerTitle: 'Controle de Horas'}}/>
          <Drawer.Screen name="Gestao" component={GestaoScrean} options={{headerTitle: 'Gestão de Colaboradores'}}/>
          <Drawer.Screen name="Permissao" component={PermissaoScrean} options={{headerTitle: 'Permissão'}}/>
          <Drawer.Screen name="Colaborador" component={ColaboradorScrean} options={{headerTitle: 'Colaborador'}}/>
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false, }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, userAction)(RootStack);
