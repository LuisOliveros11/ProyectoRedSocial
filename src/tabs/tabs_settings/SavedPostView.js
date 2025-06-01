import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../Components/AuthContext";
import FeatherIcon from 'react-native-vector-icons/Feather'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';

import { BASE_URL } from '../../../config';
import CommentsSheet from "../../Components/CommentsSheet";
import PostComment from "../../Components/PostComment";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const screenWidth = Dimensions.get('window').width;


const SavedPostView = () => {
    const route = useRoute();
    const { postId, postIndex } = route.params || {};
    const baseUrl = BASE_URL;
    const sheetRef = useRef();

    const { authToken, userData } = useContext(AuthContext);
    const listRef = useRef(null);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [idPost, setIdPost] = useState(null);
    const isInitialLoad = useRef(true);


    const handleRefresh = () => {
        setRefreshing(true);
        fetch(`${baseUrl}/postsGuardados/${userData.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })

            .then(response => response.json())
            .then(json => {
                setData(json)
            })
            .catch(error => {
                alert(error);
            })
            .finally(() => setRefreshing(false));


    }
    useEffect(() => {
        fetch(`${baseUrl}/postsGuardados/${userData.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => alert(error))
    }, []);


    useEffect(() => {
        if (!data.length || !postId) return;

        if (isInitialLoad.current) {
            const index = (typeof postIndex === 'number')
                ? postIndex
                : data.findIndex(item => item.id === postId);

            if (index >= 0 && listRef.current) {
                listRef.current.scrollToIndex({
                    index: index,
                    animated: true,
                    viewPosition: 0.5,
                });
            }

            isInitialLoad.current = false;
        }
    }, [data, postId, postIndex]);

    const renderItem = ({ item }) => {
        const isLiked = item.likedByUsers?.some(user => user.id === userData.id);


        return (
            <View style={styles.postContainer}>
                <View style={styles.header}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: item.user?.photo }}
                    />
                    <Text style={styles.title}>{item.user?.name}</Text>
                </View>
                <Image
                    style={[styles.postImage, { resizeMode: 'stretch' }]}
                    source={{ uri: item.image }}
                />
                <View style={styles.actions}>
                    <TouchableOpacity onPress={async () => {
                        if (!isLiked) {
                            try {
                                const response = await fetch(`${baseUrl}/postLike/${item.id}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        'Authorization': `Bearer ${authToken}`,
                                    },

                                });
                                const data = await response.json();
                                if (response.ok) {
                                    Toast.show({
                                        type: ALERT_TYPE.SUCCESS,
                                        title: 'Dar like',
                                        textBody: data.message,
                                    });
                                    handleRefresh();

                                }
                            } catch (error) {
                                console.error("Error al actualizar los datos:", error);
                                alert("No se pudo conectar al servidor.");
                            }
                        } else {
                            try {
                                const response = await fetch(`${baseUrl}/quitarLike/${item.id}`, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                        'Authorization': `Bearer ${authToken}`,
                                    },

                                });
                                const data = await response.json();
                                if (response.ok) {
                                    Toast.show({
                                        type: ALERT_TYPE.SUCCESS,
                                        title: 'Quitar like',
                                        textBody: data.message,
                                    });
                                    handleRefresh();
                                }
                            } catch (error) {
                                console.error("Error al actualizar los datos:", error);
                                alert("No se pudo conectar al servidor.");
                            }

                        }

                    }}
                    >
                        <MaterialIcons
                            name={isLiked ? "favorite" : "favorite-border"}
                            color="#2b64e3"
                            size={25}
                            style={styles.iconHeart}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() =>{
                         setIdPost(item.id);
                        sheetRef.current?.open();
                    }}>
                        <FeatherIcon name="message-circle" color="#2b64e3" size={24} style={styles.iconMessage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        try {
                            const response = await fetch(`${baseUrl}/eliminarPostGuardado/${item.id}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    'Authorization': `Bearer ${authToken}`,
                                },

                            });
                            const data = await response.json();
                            if (response.ok) {
                                Toast.show({
                                    type: ALERT_TYPE.SUCCESS,
                                    title: 'Eliminar guardado',
                                    textBody: data.message,
                                });
                                handleRefresh();
                            }
                        } catch (error) {
                            console.error("Error al actualizar los datos:", error);
                            alert("No se pudo conectar al servidor.");
                        }
                    }}>
                        <MaterialIcons
                            name={"bookmark"}
                            color="#2b64e3"
                            size={27}
                            style={styles.iconMessage}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.LikesText}>{item.likes} Likes</Text>
                <View style={styles.descriptionContainer}>
                    <Text style={[styles.descriptionText, { fontWeight: '600' }]}>{item.user?.name}:</Text>
                    <Text style={styles.descriptionText}> {item.content} </Text>
                </View>
            </View>

        )

    };
     return (
        <>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                contentContainerStyle={styles.container}
                 onScrollToIndexFailed={info => {
                setTimeout(() => {
                    listRef.current?.scrollToIndex({ index: info.index, animated: true });
                }, 100);
            }}
            />
            <View style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <PostComment idPost={idPost} />
            </View>
            <CommentsSheet
                ref={sheetRef}
                idPost={idPost}
            />

        </>
    );
    
};



export default SavedPostView;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 60,
    },
    postContainer: {
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    profileImage: {
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    title: {
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
    postImage: {
        height: 400,
        width: screenWidth,
    },
    actions: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    iconHeart: {
        height: 24,
        width: 25,
    },
    iconMessage: {
        height: 24,
        width: 24,
        marginLeft: 15,
    },
    LikesText: {
        marginLeft: 13,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 600,
        color: 'black'
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingHorizontal: 13,
        alignItems: 'center',
    },
    descriptionText: {
        color: 'black',
    }

});