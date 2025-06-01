import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState, useContext, useRef } from "react";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from '../../config';
import { AuthContext } from './AuthContext';
import CommentsSheet from './CommentsSheet';
import PostComment from './PostComment';

const screenWidth = Dimensions.get('window').width;

const Post = () => {
    const baseUrl = BASE_URL;
    const { authToken, userData } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [likes, setLikes] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [idPost, setIdPost] = useState(null);

    const sheetRef = useRef();

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
    }


    const fetchData = () => {
        const fetchFeed = fetch(`${baseUrl}/feed/${userData.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        }).then(response => response.json());

        const fetchLikes = fetch(`${baseUrl}/likes/${userData.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        }).then(response => response.json());

        Promise.all([fetchFeed, fetchLikes])
            .then(([feedData, likesData]) => {
                setData(feedData);
                setLikes(likesData)
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

    useEffect(() => {
        if (idPost !== null) {
            sheetRef.current?.open();
        }
    }, [idPost]);

    const renderItem = ({ item }) => {
        const isSaved = item.savedByUsers?.some(user => user.id === userData.id);
        const isLiked = item.likedByUsers?.some(user => user.id === userData.id);
        return (
            <View style={styles.postContainer}>
                <View style={styles.header}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: item.user?.photo }}
                    />
                    <View style={styles.textPost}>
                        <Text style={styles.title}>{item.user?.name}</Text>
                        <View style={styles.locationText}>
                            <FeatherIcon name="map-pin" color="#6b6b6b" size={18} style={{paddingLeft: 7}}/>
                            <Text style={[styles.title, { fontWeight: '400', fontSize: 12, paddingLeft: 6 }]}>{item.country},</Text>
                            <Text style={[styles.title, { fontWeight: '300', fontSize: 12, paddingLeft: 6 }]}>{item.city}</Text>
                        </View>
                    </View>
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
                                    alert(data.message);
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
                                    alert(data.message);
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
                            size={27}
                            style={styles.iconHeart}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        setIdPost(item.id);
                        sheetRef.current?.open();
                    }}>
                        <FeatherIcon name="message-circle" color="#2b64e3" size={24} style={styles.iconMessage} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={async () => {
                        if (!isSaved) {
                            try {

                                const response = await fetch(`${baseUrl}/guardarPost`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        'Authorization': `Bearer ${authToken}`,
                                    },
                                    body: JSON.stringify({
                                        userId: userData.id,
                                        postId: item.id
                                    })
                                });

                                const data = await response.json();

                                if (response.ok) {
                                    alert(data.message);
                                    handleRefresh();
                                } else {
                                    alert(data.message);
                                }

                            } catch (error) {
                                console.error("Error al actualizar los datos:", error);
                                alert("No se pudo conectar al servidor.");
                            }
                        } else {
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
                                    alert(data.message);
                                    handleRefresh();
                                }
                            } catch (error) {
                                console.error("Error al actualizar los datos:", error);
                                alert("No se pudo conectar al servidor.");
                            }

                        }

                    }}>
                        <MaterialIcons
                            name={isSaved ? "bookmark" : "bookmark-border"}
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
    locationText: {
        flexDirection: 'row'
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

export default Post;
