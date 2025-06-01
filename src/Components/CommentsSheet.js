import React, { forwardRef, useImperativeHandle, useRef, useState, useContext, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Alert, Dimensions, TextInput, KeyboardAvoidingView, Platform, ScrollView, BackHandler } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AuthContext } from './AuthContext';
import { BASE_URL } from '../../config';
import PostComment from './PostComment';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


const screenHeight = Dimensions.get('window').height;

const CommentsSheet = forwardRef(({ idPost }, ref) => {
  const sheetRef = useRef();
  const isSheetOpen = useRef(false);
  const { authToken, userData } = useContext(AuthContext);
  const postCommentRef = useRef();
  const baseUrl = BASE_URL;
  const [form, setForm] = useState({
    comment: '',
  });


  useImperativeHandle(ref, () => ({
    open: () => {
      isSheetOpen.current = true;
      sheetRef.current?.open();
    },
    close: () => {
      isSheetOpen.current = false;
      sheetRef.current?.close();
    },

  }));

  useEffect(() => {
    const onBackPress = () => {
      sheetRef.current?.close()
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, []);

  return (
    <RBSheet
      ref={sheetRef}
      height={screenHeight - 10}
      openDuration={250}
      draggable
      closeOnPressMask
      onOpen={() => {
        isSheetOpen.current = true;
      }}
      onClose={() => {
        isSheetOpen.current = false;
        setForm({ comment: '' });
      }}
      customStyles={{ container: styles.sheet }}
    >
      <KeyboardAvoidingView
        style={styles.sheetContent}
        behavior={'padding'}
        keyboardVerticalOffset={30}
      >
        <View style={styles.header}>
          <TouchableOpacity style={{ width: 24 }} />
          <Text style={styles.headerTitle}>Comentarios</Text>
          <TouchableOpacity onPress={() => sheetRef.current?.close()}>
            <FeatherIcon name="x" size={24} color="#b5b5b5" />
          </TouchableOpacity>
        </View>
        <PostComment ref={postCommentRef} idPost={idPost} />


        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.postComment}>
            <View style={styles.lineDivider}></View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                onChangeText={comment => setForm({ ...form, comment })}
                placeholder="Realiza un comentario"
                value={form.comment}
              />
              <TouchableOpacity style={styles.button} onPress={async () => {
                try {

                  const response = await fetch(`${baseUrl}/comentar/${idPost}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                      content: form.comment
                    })
                  });

                  const data = await response.json();

                  if (response.ok) {
                    postCommentRef.current?.handleRefresh?.();
                    setForm({ comment: '' });
                  } else {
                    alert(data.message || "No se pudo publicar el comentario");
                  }

                } catch (error) {
                  console.error("Error al realizar el comentario:", error);
                  alert("No se pudo conectar al servidor.");
                }
              }}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RBSheet>

  );
});

export default CommentsSheet;

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  headerTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  sheetContent: {
    flex: 1,
    padding: 24,
    flexDirection: 'column',
  },
  postComment: {
    flex: 1,
    justifyContent: 'flex-end',

  },
  lineDivider: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',

  },
  input: {
    flex: 1,
    height: 40,
    marginTop: 10,
    paddingHorizontal: 0,
  },

  button: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    backgroundColor: 'white'
  },

  buttonText: {
    fontSize: 14,
    color: '#333',
  },

});