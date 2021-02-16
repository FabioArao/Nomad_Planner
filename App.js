import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import * as firebase from 'firebase'
//import {Provider} from 'react-redux'
import { StyleSheet, Text, View, Image, ImageBackground} from  'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'

const firebaseConfig = {
  apiKey: "AIzaSyAc_S19cPHBVSaK8Ii2mElmadsbI6bVItM",
  authDomain: "nomadplanner-378b1.firebaseapp.com",
  projectId: "nomadplanner-378b1",
  storageBucket: "nomadplanner-378b1.appspot.com",
  messagingSenderId: "14406785091",
  appId: "1:14406785091:web:922c4b408af235853f9cf6",
  measurementId: "G-0G5JFF9CCY"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
  super(props);
  this.state = {
    loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style= {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return(
      <View style= {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>User alredy Loged in</Text>
        </View>
    )
    
  }
}

export default App

   