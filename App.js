import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./src/auth/Login";
import Register from "./src/auth/Register";
import ChangePassword from './src/tabs/tabs_settings/ChangePassword';
import EditProfile from './src/tabs/tabs_settings/EditProfile';
import SavedPostsList from './src/tabs/tabs_settings/SavedPostsList';
import SavedPostView from './src/tabs/tabs_settings/SavedPostView';
import PostImage from './src/tabs/PostImage';
import BottomNavigator from './src/Components/BottomNavigation';
import SettingsScreen from './src/tabs/SettingsScreen';
import { AuthProvider } from './src/Components/AuthContext';
import { AlertNotificationRoot } from 'react-native-alert-notification';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AlertNotificationRoot>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: true }} />
            <Stack.Screen name="Home" component={BottomNavigator} />
            <Stack.Screen name="Cambiar contraseña" component={ChangePassword} options={{ headerShown: true }} />
            <Stack.Screen name="Editar perfil" component={EditProfile} options={{ headerShown: true }} />
            <Stack.Screen name="Vista previa" component={PostImage} options={{ headerShown: true }} />
            <Stack.Screen name="Lista guardados" component={SavedPostsList} options={{ headerShown: true }} />
            <Stack.Screen name="Publicaciones guardadas" component={SavedPostView} options={{ headerShown: true }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </AlertNotificationRoot>
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
