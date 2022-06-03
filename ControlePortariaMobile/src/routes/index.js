import React, {useEffect, useState} from 'react';

import LoginScrean from '../page/Login';
import HomeScrean from '../page/Home';
import HorasScrean from '../page/ControleHoras';
import AcessoScrean from '../page/ControleAcesso';
import {createDrawerNavigator} from '@react-navigation/drawer';

const RootStack = props => {
  const Drawer = createDrawerNavigator();
  const isLoggedIn = useSelector(state => state.user.isAutenticated);

  return (
    <Drawer.Navigator initialRouteName="Login">
      {isLoggedIn ? (
        <>
          <Drawer.Screen name="Home" component={HomeScrean} />
          <Drawer.Screen name="Horas" component={HorasScrean} />
          <Drawer.Screen name="Acesso" component={AcessoScrean} />
        </>
      ) : (
        <Drawer.Screen name="Login" component={LoginScrean} />
      )}
    </Drawer.Navigator>
  );
};
export default RootStack;