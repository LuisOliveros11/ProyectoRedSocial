import React, { Children } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../tabs/HomeScreen'; 
import SettingsScreen from '../tabs/SettingsScreen';
import PostImage from '../tabs/PostImage';
import { Ionicons } from '@expo/vector-icons'; // Iconos para la barra inferior
import { TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
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
};

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
