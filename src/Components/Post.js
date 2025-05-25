import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState, useContext } from "react";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../../config';
import { AuthContext } from './AuthContext';

const screenWidth = Dimensions.get('window').width;

const Post = () => {
    const baseUrl = BASE_URL;
    const { authToken, userData } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        fetch(`${baseUrl}/feed/${userData.id}`, {
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
        fetch(`${baseUrl}/feed/${userData.id}`, {
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

    const renderItem = ({ item }) => (
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
                <TouchableOpacity>
                    <FeatherIcon name="bookmark" color="#2b64e3" size={24} style={styles.iconMessage} />
                </TouchableOpacity>
            </View>
            <Text style={styles.LikesText}>{item.likes} Likes</Text>
            <View style={styles.descriptionContainer}>
                <Text style={[styles.descriptionText, { fontWeight: '600' }]}>{item.user?.name}:</Text>
                <Text style={styles.descriptionText}> {item.content} </Text>
            </View>
        </View>
    );

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

export default Post;
