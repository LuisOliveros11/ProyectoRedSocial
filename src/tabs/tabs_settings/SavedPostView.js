import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../Components/AuthContext";
import FeatherIcon from 'react-native-vector-icons/Feather'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';

import { BASE_URL } from '../../../config';
const screenWidth = Dimensions.get('window').width;


const SavedPostView = () => {
    const route = useRoute();
    const { postId, postIndex } = route.params || {};
    const baseUrl = BASE_URL;
    const { authToken, userData } = useContext(AuthContext);
    const listRef = useRef(null);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
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
        const isSaved = item.savedByUsers?.some(user => user.id === userData.id);

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
                    <TouchableOpacity>
                        <FeatherIcon name="heart" color="#2b64e3" size={24} style={styles.iconHeart} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FeatherIcon name="message-circle" color="#2b64e3" size={24} style={styles.iconMessage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
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
        <FlatList
            ref={listRef}
            data={data}
            keyExtractor={item => item.id.toString()}
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
        paddingHorizontal: 13,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    iconHeart: {
        height: 24,
        width: 24,
    },
    iconMessage: {
        height: 24,
        width: 28,
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