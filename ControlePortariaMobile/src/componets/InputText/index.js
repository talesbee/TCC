import React, {useEffect, useState} from 'react';
import {Text, View, Button, TextInput, StyleSheet} from 'react-native';
import {cpf, cnpj} from 'cpf-cnpj-validator';
import {scale, verticalScale} from 'react-native-size-matters';

function InputText(props) {
  let {
    multiline = false,
    keyboardType = 'default',
    data,
    onSubmitEditing = () => null,
    onChangeText = () => null,
    label = '',
    placehold = '',
    refCurrent,
    maxLength = 50,
    style,
    onBlur = () => null,
  } = props;

  return (
    <View>
      <View style={styles.campoView}>
        <View>
          {label != '' && (
            <View style={styles.TextMenuStyle}>
              <Text>{label}</Text>
            </View>
          )}
          <View style={{paddingLeft: scale(15)}}>
            <View>
              <TextInput
                multiline={multiline}  
                onBlur={onBlur}
                maxLength={maxLength}
                style={[styles.Border, style,{paddingLeft:scale(10),fontSize:verticalScale(13)}]}
                keyboardType={keyboardType}
                ref={refCurrent}
                placeholder={placehold}
                onSubmitEditing={onSubmitEditing}
                onChangeText={onChangeText}
                value={data}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  campoView: {
    paddingTop: scale(10),
    paddingLeft: scale(5),
    width: '100%',
  },
  Border: {
    fontSize: verticalScale(10),
    padding: scale(3),
    paddingLeft: scale(10),
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  TextMenuStyle: {
    paddingBottom: scale(5),
  },
});

export default InputText;
