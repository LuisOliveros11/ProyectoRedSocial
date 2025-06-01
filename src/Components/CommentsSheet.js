import React, { forwardRef, useImperativeHandle, useRef, useState, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Alert, Dimensions } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AuthContext } from './AuthContext';
import { BASE_URL } from '../../config';

const screenHeight = Dimensions.get('window').height;

const CommentsSheet = forwardRef((props, ref) => {
  const sheetRef = useRef();
  const { authToken, userData } = useContext(AuthContext);
  const baseUrl = BASE_URL;

  useImperativeHandle(ref, () => ({
    open: () => sheetRef.current?.open(),
    close: () => sheetRef.current?.close(),
  }));

  return (
    <RBSheet
      ref={sheetRef}
      height={screenHeight - 200}
      openDuration={250}
      draggable
      closeOnPressMask
      customStyles={{ container: styles.sheet }}
    >
      <View style={styles.sheetContent}>
      </View>
    </RBSheet>
  );
});

export default CommentsSheet;

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  sheetContent: {
    padding: 24,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181818',
    marginTop: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginTop: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#2b64e3',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  btnAlt: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  btnAltText: {
    color: '#2b64e3',
  },
});
