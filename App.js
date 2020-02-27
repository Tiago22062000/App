import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons';

import ChatScreen from './screens/ChatScreen';
import PostScreen from './screens/PostScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import FirebaseKeys from './config';
import * as firebase from 'firebase';

  const AppContainer = createStackNavigator(
    {
      default: createBottomTabNavigator(
        {
            Home: {
              screen: HomeScreen,
              navigationOptions: {
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-home' size={30} color={tintColor}></Ionicons>
              }
            },
            Chat: {
              screen: ChatScreen,
              navigationOptions: {
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-chatboxes' size={30} color={tintColor}> </Ionicons>
              }
            },
            Home: {
              screen: HomeScreen,
              navigationOptions: {
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-home' size={30} color={tintColor} style={{
                  shadowColor:'#E9446A', 
                  shadowOffset:{
                   width:0, 
                   heigth:0, 
                   shadowRadius:10, 
                   shadowOpacity:0.3}}}></Ionicons>
              }
            },
            Post: {
              screen: PostScreen,
              navigationOptions: {
                tabBarIcon: ({tintColor}) => 
                <Ionicons name='ios-add-circle' 
                  size={48} color={tintColor}>
                </Ionicons>
              }
            },
            Notification: {
              screen: NotificationScreen,
              navigationOptions: {
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-notifications' size={30} color={tintColor}> </Ionicons>
              }
            },
            Profile: {
              screen: ProfileScreen,
              navigationOptions: {
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-person' size={30} color={tintColor}> </Ionicons>
              }
            }
          },
          {
            defaultNavigationOptions:{
              tabBarOnPress: ({navigation, defaultHandler}) => {
                if (navigation.state.key === 'Post') {
                  navigation.navigate('postModal')
                } else {
                  defaultHandler()
                }
              }
            },
            tabBarOptions: {
              activeTintColor: '#FFA200',
              inactiveTintColor: '#B8B8C4',
              showLabel: false
            }
          }
      ),
      postModal: {
        screen: PostScreen
      }
    },
    {
      mode: 'modal',
      headerMode:'none',
      initialRouteName: 'postModal'
    }
  )

  const AuthStack= createStackNavigator({
	  Login: LoginScreen,
	  Register: RegisterScreen
  })

  export default createAppContainer(
	  createSwitchNavigator(
		  {
			  Loading: LoadingScreen,
			  App: AppContainer,
			  Auth: AuthStack
		  },
		  {
				initialRouteName: 'Loading'
		  }		  
	  )
  )