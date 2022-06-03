import React from 'react';
import {View, Button} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

function SaveButton(props) {
  let {onPress = () => null, title = '', style} = props;

  return (
    <View>
      <View
        style={[
          style,
          {paddingTop: verticalScale(10), width: '100%'}
        ]}>
        <Button onPress={onPress} title={title} color="gray" />
      </View>
    </View>
  );
}

export default SaveButton;
