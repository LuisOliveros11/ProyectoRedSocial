// ActionSheet.js
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';


const ActionSheet = forwardRef((props, ref) => {
  const sheetRef = useRef();
  

  useImperativeHandle(ref, () => ({
    open: () => sheetRef.current.open(),
    close: () => sheetRef.current.close()
  }));
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      alert('Error al procesar la imagen');
    }
  };
  const pickImageGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      alert('Error al procesar la imagen');
    }
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={360}
      openDuration={250}
      customStyles={{ container: styles.sheet }}
    >
      <View style={styles.sheetContent}>
        <FeatherIcon name="image" color="#2b64e3" size={48} style={{ alignSelf: 'center' }} />
        <Text style={styles.title}>Hacer una publicación</Text>
        <Text style={styles.message}>
          Seleccione una foto desde su galería o tome una foto
        </Text>

        <TouchableOpacity onPress={() => {
            pickImageGallery();
        }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Abrir galería</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            pickImage();
        }}>
          <View style={[styles.btn, { marginTop: 12, backgroundColor: '#FFF',     borderWidth: 1, }]}>
            <Text style={[styles.btnText, { color: '#2b64e3' }]}>Tomar foto</Text>
          </View>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
});

export default ActionSheet;

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
});
