import React from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

const PostImage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Pantalla en donde se mostrará una vista previa de la publicación del usuario</Text>
    </SafeAreaView>
  );
};

export default PostImage;

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