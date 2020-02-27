import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        email: '',
        password: '',
        errorMessage: null
    };

    handleLogin = () => {
        const {email,password} = this.state

        firebase.auth().signInWithEmailAndPassword(email,password).catch(error => this.setState({errorMessage: error.message}))
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <View style={styles.logo1}>
                    <Image source={require('../assets/logo.png')} style={styles.logo}/>               
                    <Text style={styles.greeting}>{'Bem-Vindo à \nRide n\'Go'}</Text> 
                </View>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Adress</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize='none'
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>
                    <View style={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize='none'
                            secureTextEntry={true}
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}                  
                            />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={styles.textoBotao}>Sign In</Text>
                </TouchableOpacity>
                
                <View style={styles.signUp}>
                    <Text style={styles.texto}>Ainda não tens conta? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{color:'#FFA200', fontWeight: '500', fontSize:16}}>
                            Regista-te
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'#232122'      
    },
    greeting:{
        fontSize:20,
        fontWeight: '400',
        textAlign: 'center',
        color:'white'
    },
    errorMessage:{
        height:72,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:30,
    },
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form:{
        marginTop: -60,
        marginBottom: 48,
        marginHorizontal:30
    },
    inputTitle:{
        color: 'white',
        fontSize: 12,
        textTransform: 'uppercase',
        paddingHorizontal: 10
    }, 
    input:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 30,
        fontSize: 15,
        color: '#161F3D',
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        fontSize: 16,
        color: '#002f6c',
        width: 300,
        paddingHorizontal: 16
    },
    button:{
        marginHorizontal: 30,
        backgroundColor: '#FFA200',
        borderRadius: 4,
        height:52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:30
    },
    textoBotao:{
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    },
    signUp:{
		alignItems:'flex-end',
		justifyContent: 'center',
		paddingVertical:16,
		flexDirection:'row'
    },
    logo:{
        width:250,
        height:250
    },
    logo1:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:90
    },
    texto:{
        color:'white',
        fontSize: 16
    }
});