// ActionSheet.js
import React, { forwardRef, useImperativeHandle, useRef, useState, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from './AuthContext';
import { BASE_URL } from '../../config';

const ActionSheet = forwardRef(({ title: initialTitle, onImagePicked }, ref) => {
  const sheetRef = useRef();
  const { authToken, userData, updateUserData } = useContext(AuthContext);
  const baseUrl = BASE_URL;

  const [title, setTitle] = useState(initialTitle || 'Hacer una publicación');

  useImperativeHandle(ref, () => ({
    open: (newTitle) => {
      if (newTitle) setTitle(newTitle);
      sheetRef.current.open();
    },
    close: () => sheetRef.current.close(),
  }));

  const uploadImage = async (uri) => {
    const formData = new FormData();
    const fileName = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(fileName ?? '');
    const fileType = match ? `image/${match[1]}` : 'image';
    formData.append('photo', { uri, name: fileName, type: fileType });

    try {
      const response = await fetch(
        `${baseUrl}/actualizarUsuario/${userData.id}`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      if (data.user?.photo) {
        await updateUserData({ ...userData, photo: data.user.photo });
        Alert.alert('Éxito', 'Foto de perfil actualizada');
      } else {
        throw new Error('No se recibió foto actualizada');
      }
    } catch (err) {
      Alert.alert('Error al subir imagen', err.message);
    }
  };

  const handleImageUri = async (uri) => {
    if (typeof onImagePicked === 'function') {
      onImagePicked(uri);
    } else {
      await uploadImage(uri);
    }
    sheetRef.current.close();
  };

  const pickImageGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la galería');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      await handleImageUri(result.assets[0].uri);
    }
  };

  const pickImageCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      await handleImageUri(result.assets[0].uri);
    }
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={360}
      openDuration={250}
      draggable
      closeOnPressMask
      customStyles={{ container: styles.sheet }}
    >
      <View style={styles.sheetContent}>
        <FeatherIcon
          name="image"
          color="#2b64e3"
          size={48}
          style={{ alignSelf: 'center' }}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>
          Seleccione una foto desde su galería o tome una foto
        </Text>

        <TouchableOpacity onPress={pickImageGallery}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Abrir galería</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImageCamera}>
          <View style={[styles.btn, styles.btnAlt]}>
            <Text style={[styles.btnText, styles.btnAltText]}>Tomar foto</Text>
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
  btnAlt: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  btnAltText: {
    color: '#2b64e3',
  },
});
