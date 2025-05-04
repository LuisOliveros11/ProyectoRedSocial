import React, { Children } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Iconos para la barra inferior
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';



import HomeScreen from '../tabs/HomeScreen'; 
import SettingsScreen from '../tabs/SettingsScreen';
import PostImage from '../tabs/PostImage';


const Tab = createBottomTabNavigator();

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

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={() => {
      pickImage()
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

const BottomNavigator = () => {
  return (
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
                  source={require('../../assets/imagen_perfil_ejemplo.jpeg')} 
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <View style={styles.headerLeftText}>
                  <Text style={{fontSize: 11}}>Hola,</Text>
                  <Text style={{ fontSize: 14 }}>
                    Bienvenido <Text style={{ fontWeight: 'bold' }}>Kevin</Text>
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
        component={() => null}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/plus_icon.png')}
              resizeMode="contain"
              style={{
                width: 65, 
                height: 70,
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarLabel: '', 
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
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
