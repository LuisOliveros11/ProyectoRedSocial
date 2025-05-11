// ActionSheet.js
import React, { forwardRef, useImperativeHandle, useRef, useState, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from './AuthContext';

const ActionSheet = forwardRef((props, ref) => {
  const sheetRef = useRef();
  const { authToken, userData, updateUserData } = useContext(AuthContext);



  const [title, setDescription] = useState(
    props.title || 'Hacer una publicación'
  );


  useImperativeHandle(ref, () => ({
    open: (newDescription) => {
      if (newDescription) setDescription(newDescription);
      sheetRef.current.open();
    },
    close: () => sheetRef.current.close()
  }));

  const uploadImage = async (imageUri) => {
    const formData = new FormData();
    const fileName = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(fileName ?? '');
    const fileType = match ? `image/${match[1]}` : `image`;
    formData.append('photo', {
      uri: imageUri,
      name: fileName,
      type: fileType
    });

    const maxRetries = 3;
    let retryCount = 0;

    const timeout = (ms, promise) => {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error("La solicitud tardó demasiado. Intenta con una imagen más liviana."));
        }, ms);

        promise
          .then((res) => {
            clearTimeout(timer);
            resolve(res);
          })
          .catch((err) => {
            clearTimeout(timer);
            reject(err);
          });
      });
    };

    const attemptUpload = async () => {
      try {
        const response = await timeout(60000, fetch(`http://192.168.1.81:3000/actualizarUsuario/${userData.id}`, {
          method: 'PUT',
          body: formData,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }));

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.user && data.user.photo) {
          await updateUserData({
            ...userData,
            photo: data.user.photo,
          });
          alert("Los datos se han actualizado exitosamente");
          return true;
        } else {
          throw new Error("No se recibió la información de la foto actualizada");
        }
      } catch (error) {
        if (retryCount < maxRetries - 1) {
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, 2000));
          return attemptUpload();
        }
        throw error;
      }
    };

    try {
      await attemptUpload();
    } catch (error) {
      let errorMessage = 'Error al subir la imagen. ';
      
      if (error.message.includes('Network request failed')) {
        errorMessage += 'Por favor, verifica tu conexión a internet e intenta nuevamente.';
      } else if (error.message.includes('tardó demasiado')) {
        errorMessage += 'La imagen es demasiado pesada. Intenta con una imagen más liviana.';
      } else {
        errorMessage += 'Por favor, intente nuevamente.';
      }
      
      setTimeout(() => {
        alert(errorMessage);
        sheetRef.current?.close();
      }, 0);
    }
  };
  const pickImageGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        await uploadImage(imageUri);
      }
    } catch (error) {
      sheetRef.current?.close();
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        await uploadImage(imageUri);
      }
    } catch (error) {
      sheetRef.current?.close();
    }
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={360}
      openDuration={250}
      draggable={true}
      closeOnPressMask={true}
      customStyles={{ container: styles.sheet }}
    >
      <View style={styles.sheetContent}>
        <FeatherIcon name="image" color="#2b64e3" size={48} style={{ alignSelf: 'center' }} />
        <Text style={styles.title}>
          {title}
        </Text>
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
          <View style={[styles.btn, { marginTop: 12, backgroundColor: '#FFF', borderWidth: 1, }]}>
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
