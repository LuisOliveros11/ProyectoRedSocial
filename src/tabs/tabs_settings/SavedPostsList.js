import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Components/AuthContext";
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { useNavigation, } from '@react-navigation/native';

import { BASE_URL } from '../../../config';
const screenWidth = Dimensions.get('window').width;

const imageWidth = screenWidth / 3;

const SavedPostsList = () => {
    const navigation = useNavigation();
    const baseUrl = BASE_URL;
    const { authToken, userData } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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

    console.log(screenWidth)

    const renderItem = ({ item, index }) => {
        const isSaved = item.savedByUsers?.some(user => user.id === userData.id);

        return (
            <TouchableOpacity
            onPress={() => navigation.navigate('Publicaciones guardadas', {
                postId: item.id,
                postIndex: index,
            })}>
                 <View>
                <Image style={{height: 130.9, width: imageWidth}} source={{ uri: item.image }}/>
            </View>

            </TouchableOpacity>
           
        )

    };
    return (
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={3}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                contentContainerStyle={styles.container}
            />
        );
};



export default SavedPostsList;

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