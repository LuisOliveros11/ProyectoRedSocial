import React, { Children, createContext, useState, useEffect, useContext, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Iconos para la barra inferior
import { TouchableOpacity, Image, Text, StyleSheet, SafeAreaView, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import HomeScreen from '../tabs/HomeScreen'; 
import SettingsScreen from '../tabs/SettingsScreen';
import PostImage from '../tabs/PostImage';

import { AuthContext } from './AuthContext';
import ActionSheet from './ActionSheet'; 

import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { authToken, userData } = useContext(AuthContext);
  const sheetRef = useRef();
  const navigation = useNavigation();
  const onImagePicked = (uri) => {
    navigation.navigate('PostImage', { imageUri: uri });
  };

  if (!authToken || !userData) {
    return null;
  }
  
  const CustomTabBarButton = ({ children }) => (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        sheetRef.current.open();
      }}
    >
      <View
        style={{
          height: 70,
          width: 70,
          borderRadius: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true, 
          
          
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: '',
            headerLeft: () => (
          
              <View style={styles.headerLeftWrapper}>
                <TouchableOpacity
                  onPress={async () => {
                    alert('Imagen presionada');
                  }}
                >
                 <Image
                   source={{
                    uri: userData.photo
                  }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.headerLeftText}>
                    <Text style={{fontSize: 12}}>Hola,</Text>
                    <Text style={{ fontSize: 14 }}>
                      Bienvenido <Text style={{ fontWeight: 'bold' }}>{userData.name}</Text>
                    </Text>
                </View>
              </View>
              
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostImage}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../assets/plus_icon_2.png')}
                resizeMode="contain"
                style={{
                  width: 60, 
                  height: 65,
                }}
              />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
            tabBarLabel: '', 
          }}
        />
        <Tab.Screen
          name="Ajustes"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <ActionSheet
        ref={sheetRef}
        title="Realizar publicacion"
          onImagePicked={onImagePicked}
      />
    </>
    
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
    headerLeftWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 5
    },
    headerLeftText: {
      flexDirection: 'column',
      marginLeft: 11
    },
   
  });
