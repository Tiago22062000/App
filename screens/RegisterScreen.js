import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';
import {Ionicons} from '@expo/vector-icons';

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        primeiro_nome: '',
        ultimo_nome: '',
        email: '',
        password: '',
        errorMessage: null
    };

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.primeiro_nome
                });
            })
            .catch(error => this.setState({ errorMessage: error.message}));
    }

    render() {
        return (
            <View style={styles.container} >
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name='md-arrow-round-back' size={32} color='white'></Ionicons>
                </TouchableOpacity>
                <View>
                    <Text style={styles.greeting}>{'Cria uma conta para começares!'}</Text> 
                </View>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Primeiro Nome</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize='none'
                            onChangeText={primeiro_nome => this.setState({primeiro_nome})}
                            value={this.state.primeiro_nome}
                        />
                    </View>
                    <View style={{marginTop:32}}> 
                        <Text style={styles.inputTitle}>Último Nome</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize='none'
                            onChangeText={ultimo_nome => this.setState({ultimo_nome})}
                            value={this.state.ultimo_nome}
                        />
                    </View>
                    <View style={{marginTop:32}}>
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

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={styles.textoBotao}>Sign in</Text>
                </TouchableOpacity>
                
                <View style={styles.signUp}>
                    <Text style={{color:'white', fontWeight: '500', fontSize:16}}>Já tens uma conta? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{color:'#FFA200', fontWeight: '500', fontSize:16}}>
                            Entra
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
        marginTop:32,
        fontSize:20,
        fontWeight: '400',
        textAlign: 'center',
        color:'white',
        marginTop: 100
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
        fontWeight: '500'
    },
    signUp:{
		alignItems:'flex-end',
		justifyContent: 'center',
		paddingVertical:16,
		flexDirection:'row'
    },
    back: {
        position: 'absolute',
        top: 48,
        left: 20,
        width:32,
        height:32,
        borderRadius:16,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent:'center'
    }
});