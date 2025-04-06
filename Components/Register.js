import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
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
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{ uri: 'https://assets.withfra.me/SignIn.2.png' }}
          />

          <Text style={styles.title}>
            Regis<Text style={{ color: '#075eec' }}>trate</Text>
          </Text>

          <Text style={styles.subtitle}>
            Crea tu cuenta para acceder a un mundo a tu alrededor
          </Text>
        </View>

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
        </View>
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
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
