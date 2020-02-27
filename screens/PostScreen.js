import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Fire from '../Fire';

export default class PostScreen extends React.Component {
    state = {
        text: '',
        image: null
    };

    componentDidMount() {
        this.getPhotoPermission();
    }

    getPhotoPermission = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status != 'granted') {
                alert('Precisamos da sua permissão para aceder à galeria!');
            }
        }
    };

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })
        if (!result.cancelled) {
            this.setState({image: result.uri})
        }
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name='md-arrow-round-back' size={24} color='black'></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontWeight: '500'}}>Post</Text>
                    </TouchableOpacity>
                </View> 
                <View style={styles.inputContainer}>
                    <Image source={require('../assets/ALPHA.png')} style={styles.avatar}/>
                    <TextInput autoFocus={true} multiline={true}  numberOfLines={4} style={{flex:1}} placeholder='O que vais partilhar?'/>
                </View>
                <TouchableOpacity style={styles.photo} onPres={this.pickImage}>
                    <Ionicons name='md-camera' size={32} color='#FFA200'></Ionicons>
                </TouchableOpacity>

                <View style={{marginHorizontal: 32, marginTop:32, height: 150}}>
                    <Image source={{uri: this.state.image}} style={{width: '100%', height: '100%'}}></Image>
                </View>
            </SafeAreaView>
        )
    }
}

const styles =StyleSheet.create({
    container: {
        flex:1       
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:32,
        paddingVertical:12,
        borderBottomWidth:1,
        borderBottomColor: '#D8D9DB',
        marginTop:35
    },
    inputContainer:{
        margin:30,
        flexDirection:'row'
    }, 
    avatar:{
        width: 48,
        height:48,
        borderRadius:24,
        marginRight:16
    },
    photo:{
        alignItems: 'flex-end',
        marginHorizontal:32
    }
})