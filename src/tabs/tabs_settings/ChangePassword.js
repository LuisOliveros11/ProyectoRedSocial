import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Components/AuthContext';

import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather'

import { BASE_URL } from '../../../config';

const screenWidth = Dimensions.get('window').width;

const ChangePassword = () => {
    const navigation = useNavigation();
    const baseUrl = BASE_URL;
    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });
    const { authToken, userData } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.TextContainer}>
                <Text style={styles.descriptionText}>
                    Elige una nueva contraseña para tu cuenta. Recuerda que debe ser segura. 
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Nueva contraseña</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={password =>
                                    setForm({ ...form, password })
                                }
                                placeholder="********"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControlWithIcon}
                                secureTextEntry={true}
                                value={form.password}
                            />
                            <FeatherIcon name="lock" size={20} color="#134ded" style={styles.inputIcon} />
                        </View>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Confirmar nueva contraseña</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={confirmPassword =>
                                    setForm({ ...form, confirmPassword })
                                }
                                placeholder="********"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControlWithIcon}
                                secureTextEntry={true}
                                value={form.confirmPassword}
                            />
                            <FeatherIcon name="lock" size={20} color="#134ded" style={styles.inputIcon} />
                        </View>
                    </View>

                    <View style={styles.formAction}>
                        <TouchableOpacity
                            onPress={async () => {
                                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

                                if (!passwordRegex.test(form.password)) {
                                    alert("La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
                                    return;
                                }
                                if (form.password !== form.confirmPassword) {
                                    alert("Las contraseñas no coinciden.");
                                    return;
                                }

                                try {
                         
                                    const response = await fetch(`${baseUrl}/actualizarUsuario/${userData.id}`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json",
                                            'Authorization': `Bearer ${authToken}`,
                                        },
                                        body: JSON.stringify({
                                            password: form.password
                                        })
                                    });

                                    const data = await response.json();

                                    if (response.ok) {
                                        alert("La contraseña se ha actualizado exitosamente");
                                        navigation.goBack(); 
                                    } else {
                                        alert(data.message || "Error al cambiar la contraseña");
                                    }

                                } catch (error) {
                                    console.error("Error en el registro:", error);
                                    alert("No se pudo conectar al servidor.");
                                }
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Cambiar contraseña</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                   
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    TextContainer: {
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: '600'
    },
    descriptionText: {
        marginTop: 10,
        width: screenWidth - 45,
        fontSize: 14,
        color: '#8c8c8c',
        textAlign: 'justify'
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
        marginTop: 24,
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
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },

    inputControlWithIcon: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },

    inputIcon: {
        marginLeft: 8,
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

});