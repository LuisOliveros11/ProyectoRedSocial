import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./src/tabs/Login";
import Register from "./src/tabs/Register";
import HomeScreen from './src/tabs/HomeScreen';
import BottomNavigator from './src/Components/BottomNavigation';
import SettingsScreen from './src/tabs/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register}  options={{
            headerShown: true,
           }}  />
        <Stack.Screen name="Home" component={BottomNavigator}  options={{
            headerShown: false,
           }}  />
        
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
