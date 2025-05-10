import React, { useContext } from 'react';
import { AuthContext } from '../Components/AuthContext';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import Post from '../Components/Post'

const HomeScreen = () => {
  const { authToken, userData } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}  bounces={false} overScrollMode="never" alwaysBounceVertical={false}>
        <Post/>
      </ScrollView>
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
   
  });