// PostImage.js
import React from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PostImage = () => {
  const route = useRoute();
  const { imageUri } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      {imageUri
        ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            <Text>Vista previa de la publicación</Text>
          </View>
        )
        : <Text>No se seleccionó ninguna imagen.</Text>
      }
    </SafeAreaView>
  );
};

export default PostImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eBecf4'
  },
  previewContainer: {
    alignItems: 'center'
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 16
  }
});
