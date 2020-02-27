import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import Fire from '../Fire';

export default class LoadingScreen extends React.Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }
    
    render() {
        return (
            <View style={StyleSheet.container}>
                <Text>Loading...</Text> 
                <ActivityIndicator size='large'></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contaier:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});