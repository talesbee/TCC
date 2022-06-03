import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';

export default function InputPicker(props) {
  const isTablet = DeviceInfo.isTablet();
  let {
    data,
    onChangeText = () => null,
    label = '',
    placehold = '',
    list = [{Descricao: ''}],
    refCurrent,
    style,
    onBlur = () => null,
  } = props;

  return (
    <View style={styles.campoView}>
      <TouchableOpacity
        style={{
          padding: isTablet ? scale(3) : scale(6),
          paddingLeft: scale(10),
          borderWidth: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        onPress={() => refCurrent.current?.focus?.()}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[style, {fontSize: verticalScale(13)}]}>{label}</Text>

          <Picker
            onBlur={onBlur}
            style={{display: 'none', opacity: 0, height: 0, width: 0}}
            ref={refCurrent}
            mode="dropdown"
            selectedValue={data}
            onValueChange={v => {
              onChangeText(v);
            }}>
            {list.map(itens => (
              <Picker.Item label={itens.Descricao} value={itens.Descricao} />
            ))}
          </Picker>

          <Icon
            style={{paddingRight: scale(5)}}
            name="caret-down"
            size={scale(10)}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  campoView: {
    paddingTop: scale(10),
    paddingLeft: scale(20),
    width: '100%',
  },
  Border: {},
  TextMenuStyle: {
    paddingBottom: scale(5),
  },
});
