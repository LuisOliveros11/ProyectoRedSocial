import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

const Register = () => {

  const navigation = useNavigation();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
         <View style={styles.header}>
            <Image
                source={require('../../assets/login_logo.png')}
                style={styles.headerImg}
            />
            <Text style={styles.title}>Pantalla de Registro</Text>
            <Text style={styles.subtitle}>Crea tu cuenta en la plataforma</Text>
        </View>

        <ScrollView  showsVerticalScrollIndicator={false} >
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Usuario</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={username =>
                  setForm({ ...form, username })
                }
                placeholder="tu_usuario"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.username}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Correo electrónico</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email =>
                  setForm({ ...form, email })
                }
                placeholder="anonimo@gmail.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password =>
                  setForm({ ...form, password })
                }
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirmar contraseña</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={confirmPassword =>
                  setForm({ ...form, confirmPassword })
                }
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.confirmPassword}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={() => {
                  //
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Registrate</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={styles.formFooter}>
                ¿Ya tienes una cuenta?{' '}
                <Text style={{ textDecorationLine: 'underline' }}>Iniciar sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
     
      </View>

    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    
  },
  header: {
    marginVertical: 10,

  },

  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: "1e1e1e",
    marginBottom: 6,
    alignSelf: 'center'
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center' 
  },
  form: {
    marginBottom: 24,
    flex: 1

  },
  formAction: {
    marginVertical: 24
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15
  },
  input: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: 500,
    color: '#222',
    marginBottom: 8
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222'

  },
  btn: {
    backgroundColor: '#075eec',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#075eec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'

  }
      
})
