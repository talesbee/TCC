import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
import storeConfig from './src/store';
import RootNavigation from './src/routes';
import {enableScreens} from 'react-native-screens';

enableScreens();
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function Redux() {
  
  return (
    <Provider store={storeConfig}>
      <RootNavigation />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Redux);