import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

const screenWidth = Dimensions.get('window').width;

const Post = () => {
    return (
        <View style={styles.container}>
            <View style={styles.postContainer}>
                <View>
                    <View style={styles.header}>
                        <Image 
                            style={styles.profileImage} 
                            source={require('../../assets/imagen_perfil_ejemplo.jpeg')} 
                        />
                        <Text style={styles.title}>Nombre de usuario</Text>
                    </View>
                    <View>
                        <Image  
                            style={styles.postImage} 
                            source={require('../../assets/post.jpg')} 
                        />
                    </View>
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
                    <Text style={styles.LikesText}>20 likes</Text>
                    <View style={styles.descriptionContainer}>
                        <Text style={[styles.descriptionText, { fontWeight: 600}]}>Nombre de usuario:</Text>
                        <Text style={styles.descriptionText}> Lorem ipsum dolor sit amet, </Text>
                    </View>
                </View>            
            </View>

            <View style={styles.postContainer}>
                <View>
                    <View style={styles.header}>
                        <Image 
                            style={styles.profileImage} 
                            source={require('../../assets/imagen_perfil_ejemplo.jpeg')} 
                        />
                        <Text style={styles.title}>Nombre de usuario</Text>
                    </View>
                    <View>
                        <Image  
                            style={styles.postImage} 
                            source={require('../../assets/post.jpg')} 
                        />
                    </View>
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
                    <Text style={styles.LikesText}>20 likes</Text>
                    <View style={styles.descriptionContainer}>
                        <Text style={[styles.descriptionText, { fontWeight: 600}]}>Nombre de usuario:</Text>
                        <Text style={styles.descriptionText}> Lorem ipsum dolor sit amet, </Text>
                    </View>
                </View>            
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
