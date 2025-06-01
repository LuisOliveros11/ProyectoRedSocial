import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, FlatList, } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState, useEffect, useContext } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from '../../config';
import { AuthContext } from './AuthContext';


const screenWidth = Dimensions.get('window').width;

const PostComment = forwardRef(({ idPost }, ref) => {
    const baseUrl = BASE_URL;
    const { authToken, userData } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    useImperativeHandle(ref, () => ({
        handleRefresh
    }));

    const fetchData = () => {
        fetch(`${baseUrl}/comentariosPost/${idPost}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(response => response.json())
            .then(feedData => {
                setData(feedData);
            })
            .catch(error => {
                alert(error);
            })
            .finally(() => {
                setRefreshing(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({ item }) => {
        const isCommentByUser = item.userId == userData.id;

        return (
            <View style={styles.commentContainer}>
                <Image
                    source={{ uri: item.user.photo }}
                    style={styles.avatar}
                />
                <View style={styles.commentContent}>
                    <View style={styles.content}>
                        <Text style={styles.username}>{item.user.name}</Text>
                        <Text style={styles.commentText}>{item.content}</Text>
                    </View>
                    {isCommentByUser && (
                        <TouchableOpacity style={styles.deleteButton} onPress={async () => {
                            try {
                                const response = await fetch(`${baseUrl}/eliminarComentario/${item.id}`, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                        'Authorization': `Bearer ${authToken}`,
                                    },
                                });

                                const data = await response.json();

                                if (response.ok) {
                                    alert("Comentario eliminado");
                                    handleRefresh();
                                } else {
                                    alert(data.message || "No se pudo eliminar el comentario");
                                }

                            } catch (error) {
                                console.error("Error al eliminar el comentario:", error);
                                alert("No se pudo conectar al servidor.");
                            }


                        }}>
                            <MaterialIcons name="delete" size={20} color="red" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            contentContainerStyle={styles.container}
        />
    );
});


const styles = StyleSheet.create({
    container: {
        paddingBottom: 60,
    },
    postContainer: {
        marginTop: 20,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },

    commentContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    content: {
        flex: 1
    },

    username: {
        fontWeight: '500',
        fontSize: 12,
        marginBottom: 2,
    },

    commentText: {
        fontSize: 14,
        color: '#333',
    },

    deleteButton: {
        marginTop: 5,
    },

    deleteText: {
        fontSize: 12,
        color: 'red',
    },



});

export default PostComment;
