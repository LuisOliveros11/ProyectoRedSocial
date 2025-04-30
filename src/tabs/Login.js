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

const Login = () => {
    const navigation = useNavigation();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }} >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/login_logo.png')}
                        style={styles.headerImg}
                    />
                    <Text style={styles.title}>Pantalla de Login</Text>
                    <Text style={styles.subtitle}>Accede a tus datos y más</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Correo electrónico</Text>

                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                            keyboardType="email-address"
                            onChangeText={email => setForm({ ...form, email })}
                            placeholder="anonimo@gmail.com"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={form.email} />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Contraseña</Text>

                        <TextInput
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                            onChangeText={password => setForm({ ...form, password })}
                            placeholder="********"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            secureTextEntry={true}
                            value={form.password} />
                    </View>

                    <View style={styles.formAction}>
                        <TouchableOpacity
                            onPress={async () => {
                                //navigation.navigate('Home');
                               
                              
                                try {
                                  //CAMBIAR IP A LA IP DE SU EQUIPO (IPV4) Y, SI ES NECESARIO, TAMBIÉN EL PUERTO
                                  //EL PUERTO DEBE SER IGUAL AL PUERTO EN DONDE SE ESTÁ CORRIENDO EL PROYECTO DE LA API
                                  const response = await fetch("http://192.168.1.250:3000/iniciarSesion", { 
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                      email: form.email,
                                      password: form.password
                                    })
                                  });
                              
                                  const data = await response.json();
                              
                                  if (response.ok) {
                                    navigation.navigate('Home');
                                  } else {
                                    alert(data.message || "Error al iniciar sesion");
                                  }
                              
                                } catch (error) {
                                  console.error("Error al iniciar seison:", error);
                                  alert("No se pudo conectar al servidor.");
                                }
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{ marginTop: 'auto' }}
                        onPress={() => {
                            navigation.navigate('Register');
                        }}>
                        <Text style={styles.formFooter}>
                            ¿No tienes una cuenta?{' '}
                            <Text style={{ textDecorationLine: 'underline' }}>Registrate</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            

         
        </SafeAreaView >
    );
};

export default Login;


const styles = StyleSheet.create({
    container: {
      padding: 24,
      flex: 1,
      
    },
    header: {
      marginVertical: 36,
  
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