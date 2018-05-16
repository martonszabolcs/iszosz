
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  StatusBar,
  ScrollView,
  Image,
  Modal,
  Switch,
  TouchableOpacity,
  Linking,
  WebView,
  ListView,
  AsyncStorage,
  TextInput,
  Alert,
  Animated
} from 'react-native';
const base64 = require('base-64');
const utf8 = require('utf8');


import {
  Router,
  Scene,
  Actions
} from 'react-native-router-flux';

import * as Keychain from 'react-native-keychain';





const instructions = Platform.select({
});

export default class Login extends Component<{}> {

  constructor(props) {
    console.log(props);
    super(props);
    this.state={
      text:'',
      password:'',
      email:'',
      token:'',
      user:[],
      fadeAnim: new Animated.Value(0),

      }
    }


    componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 5000,              // Make it take a while
      }
    ).start();                        // Starts the animation


  }


    validate(){
      if (this.state.password === '1'){
        Actions.regDone()
        this.setState({password:''})
      } else {
        Alert.alert('Hibás jelszó', 'Kérjük, próbálja újra!')
      }
    }



  render() {
    let { fadeAnim } = this.state;
    var {height, width} = Dimensions.get('window');
    var iWidth = width/240

    
    return (
      <View style={styles.container}>
     
      <View style={{flex:1}}>
      
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        <View style={{alignItems:'center', justifyContent:'center', paddingTop:30}}>
            <Text style={{color:'black', fontSize:30,}}>{'Üdvözlünk!'}</Text>

        </View>
      </Animated.View>


        <View style={{alignItems:'center', justifyContent:'center', marginTop:30 }}>
          <Image source={require('../src/iszosz.png')} style={{width:width-100, height:height/3}}/>
        </View>



        
        <View style={{padding:20, marginTop:height/50, position:'absolute', bottom:10}}>
          <View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Regisztrációs kód'}
              </Text>
              <TextInput
                ref='SecondInput'
                returnKeyType='go'
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 40}}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
        </View>

        <View style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
          <TouchableOpacity onPress={ () => this.validate() }>
            <View style={{height:40, backgroundColor:'white', width:width-40, justifyContent:'center', alignItems:'center', borderRadius:20}}>
              <Text style={{color:'#2E348B'}}>{'Regisztráció'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }})
  