// PostImage.js
import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useLocation from '../hooks/UseLocation';
import { BASE_URL } from '../../config';
import { AuthContext } from '../Components/AuthContext';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const PostImage = () => {
  const route = useRoute();
  const { imageUri } = route.params || {};
  const { locationInfo } = useLocation();
  const baseUrl = BASE_URL;
  const { authToken, userData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [form, setForm] = useState({
    content: '',
  });


  return (
    <SafeAreaView style={styles.container}>
      {imageUri
        ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          </View>
        )
        : <Text>No se seleccionó ninguna imagen.</Text>
      }
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={content =>
            setForm({ ...form, content })
          }
          placeholder="Agrega una descripción..."
          placeholderTextColor="#6b7280"
          value={form.content}
        />
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        onPress={async () => {
          try {
            const formData = new FormData();
            const fileName = imageUri.split('/').pop();
            const match = /\.(\w+)$/.exec(fileName ?? '');
            const fileType = match ? `image/${match[1]}` : 'image';
            formData.append('image', { uri: imageUri, name: fileName, type: fileType });
            formData.append('content', form.content);
            formData.append('city', locationInfo.city);
            formData.append('country', locationInfo.country);

            const response = await fetch(`${baseUrl}/crearPost`, {
              method: "POST",
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
              body: formData,
            });

            const data = await response.json();

            if (response.ok) {
              navigation.navigate('Home');
            } else {
              alert(data.message || "Error al realizar publicación");
            }

          } catch (error) {
            console.error("Error al realizar publicación", error);
            alert("No se pudo conectar al servidor.");
          }

        }}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Subir publicación</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PostImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: '#eBecf4',
    paddingHorizontal: 16
  },
  previewContainer: {
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
    resizeMode: 'contain'
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    paddingHorizontal: 8,
  },

  btn: {
    backgroundColor: '#075eec',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#075eec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 100
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'

  }

});
