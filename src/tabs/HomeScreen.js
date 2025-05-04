import React, { useContext } from 'react';
import { AuthContext } from '../Components/AuthContext';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = () => {
  const { authToken, userData } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_texto_container}>
        <Image source={require('../../assets/logo_subir_imagen.png')} style={styles.headerImg} />
        <Text style={styles.texto_container}>Aquí puedes adjuntar tus imágenes</Text>
      </View>
      
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Encender cámara</Text>
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.imageContainer}></ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eBecf4',
    },
    logo_texto_container: {
      alignItems: 'center',
      paddingVertical: 15,
    },
    headerImg: {
      width: 80,
      height: 80,
      alignSelf: 'center',
      marginBottom: 20,
    },
    btn: {
      backgroundColor: '#075eec',
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#075eec',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
    },
    imageContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      padding: 10,
    },
    imageWrapper: {
      width: '33.33%',
      marginBottom: 10,
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
  });