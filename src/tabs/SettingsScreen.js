import React, { useContext, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'

import { AuthContext } from '../Components/AuthContext';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from '../Components/ActionSheet';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { authToken, userData } = useContext(AuthContext);
  const sheetRef = useRef();
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profile}>
            <TouchableOpacity onPress={() => {
              sheetRef.current.open('Sube una foto de perfil');
            }}>
              <View style={styles.profileAvatarWrapper}>
                <Image
                  alt="foto de perfil"
                  source={{ uri: userData.photo }}
                  style={styles.profileAvatar}
                />
              </View>
              <View style={styles.profileAction}>
                <FeatherIcon name="edit-3" size={15} color="#fff" />
              </View>

            </TouchableOpacity>
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileAddress}>{userData.email}</Text>
          </View>

          {/* Secciones que tendrá el apartado de ajustes/settings */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Cuenta</Text>
            <TouchableOpacity onPress={() => {
              //Reedirigir a pantalla
            }}>
              <View style={styles.row}>
                <View style={[styles.rowIcon, { backgroundColor: "#134ded" }]}>
                  <FeatherIcon name="bell" color="#fff" size={18}></FeatherIcon>
                </View>
                <Text style={[styles.rowLabel, { flex: 1 }]}>Notificaciones</Text>


                <FeatherIcon
                  name="chevron-right"
                  color="#0c0c0c"
                  size={22}
                />
              </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              //Reedirigir a pantalla
            }}>
              <View style={styles.row}>
                <View style={[styles.rowIcon, { backgroundColor: "#134ded" }]}>
                  <FeatherIcon name="bookmark" color="#fff" size={18}></FeatherIcon>
                </View>
                <Text style={[styles.rowLabel, { flex: 1 }]}>Publicaciones guardadas</Text>


                <FeatherIcon
                  name="chevron-right"
                  color="#0c0c0c"
                  size={22}
                />
              </View>

            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Datos de la cuenta</Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Change password');
            }}>
              <View style={styles.row}>
                <View style={[styles.rowIcon, { backgroundColor: "#134ded" }]}>
                  <FeatherIcon name="lock" color="#fff" size={18}></FeatherIcon>
                </View>
                <Text style={[styles.rowLabel, { flex: 1 }]}>Cambiar Contraseña</Text>


                <FeatherIcon
                  name="chevron-right"
                  color="#0c0c0c"
                  size={22}
                />
              </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Edit profile');
            }}>
              <View style={styles.row}>
                <View style={[styles.rowIcon, { backgroundColor: "#134ded" }]}>
                  <FeatherIcon name="edit-3" color="#fff" size={18}></FeatherIcon>
                </View>
                <Text style={[styles.rowLabel, { flex: 1 }]}>Editar perfil</Text>


                <FeatherIcon
                  name="chevron-right"
                  color="#0c0c0c"
                  size={22}
                />
              </View>

            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Sesión</Text>
            <TouchableOpacity onPress={() => {
              //Reedirigir a pantalla
            }}>
              <View style={styles.row}>
                <View style={[styles.rowIcon, { backgroundColor: "#134ded" }]}>
                  <FeatherIcon name="log-out" color="#fff" size={18}></FeatherIcon>
                </View>
                <Text style={[styles.rowLabel, { flex: 1 }]}>Cerrar sesión</Text>


                <FeatherIcon
                  name="chevron-right"
                  color="#0c0c0c"
                  size={22}
                />
              </View>

            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      <ActionSheet ref={sheetRef} />
    </>

  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  profile: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileName: {
    fontSize: 21,
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center'
  },
  profileAvatar: {
    width: 90,
    height: 90,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: 'relative'
  },
  profileAction: {
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
    right: -60,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '50',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  arrowIcon: {
    alignItems: 'flex-end'
  }
});