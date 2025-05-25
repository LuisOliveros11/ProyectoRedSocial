import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Post from '../Components/Post';
import useLocation from '../hooks/UseLocation';

const HomeScreen = () => {
  const { latitude, longitude, errorMsg, locationInfo, loading } = useLocation();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#075eec" />
          <Text style={styles.loadingText}>Cargando datos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Post />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#eBecf4',
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});
