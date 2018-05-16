
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
      fadeAnim: new Animated.Value(0),
      password:'',
      email:'',
      name:'',
      city:'',
      access_token: '',
      role: 'admin',
      organization: '',
      specialization: '',
      education: '',
      material: '',
      human: '',
      service: '',
      description: '',
      keywords: '',
      petName: ''
      }
    }

    login = async () => {
      var data = "Basic "+base64.encode("minden@gm.com:123456");

      console.log(data)

    var path = "https://dry-mountain-15425.herokuapp.com/auth";

     fetch(path, {  
  headers: new Headers({
     'Authorization': data, 
     'Content-Type': 'application/x-www-form-urlencoded'
   }), 
  method: 'POST',
  
 body: "access_token=e0cAiR20cMQMpSpV1z1DCuLFS3HcArbx",


})
      .then((response) => response.json())
      .then((responseData) => {


      console.log('responseData');
      console.log(responseData);

      this.setState({
        token: responseData.token,
        user: responseData.user
      })

      this.setItem();

      Actions.home({
        user: responseData.user,
        userName: responseData.user.name,
        token: responseData.token
      });
     

      

 
    })
      .catch((error) => {
      console.log(error)
      Alert.alert(
  'Hiba történt!',
  'Kérjük próbálkozzon újra',
    )
    })
  }

  


    componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start();                        // Starts the animation


  }



       componentWillMount() {
        
    }

    validate(){
      if (this.state.password === '12345'){
        Actions.home()
        this.setState({password:''})
      } else {
        Alert.alert('Hibás jelszó', 'Kérjük, próbálja újra!')
      }
    }



  render() {
    let { fadeAnim } = this.state;
    var {height, width} = Dimensions.get('window');
    var iWidth = width/240
    console.log(this.state.material)
    
    return (
      <View style={styles.container}>
     
      <View style={{flex:1}}>
      <ScrollView>
      
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        <View style={{alignItems:'center', justifyContent:'center', paddingTop:30}}>
            <Text style={{color:'black', fontSize:30,}}>{'Regisztráció'}</Text>

        </View>
      </Animated.View>
      <View style={{alignItems:'center', justifyContent:'center', marginTop:30 }}>
          <Image source={require('../src/reg.png')} style={{width:width-100, height:height/3}}/>
        </View>


        
        <View style={{padding:20, marginTop:height/50, bottom:10}}>
          <View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Név'}
              </Text>
              <TextInput
                ref='FirstInput'
                returnKeyType='go'
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 40}}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Város'}
              </Text>
              <TextInput
                ref='FirstInput'
                returnKeyType='go'
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 40}}
                onChangeText={(city) => this.setState({city})}
                value={this.state.city}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'E-mail'}
              </Text>
              <TextInput
                ref='FirstInput'
                returnKeyType='go'
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 40}}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Jelszó'}
              </Text>
              <TextInput
                ref='SecondInput'
                returnKeyType='go'
                secureTextEntry={true}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 40}}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
        </View>
        <View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Szervezet'}
              </Text>
              <TextInput
                ref='FirstInput'
                returnKeyType='go'
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 40}}
                onChangeText={(organization) => this.setState({organization})}
                value={this.state.organization}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Szakterület'}
              </Text>
              <TextInput
                ref='FirstInput'
                returnKeyType='go'
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 40}}
                onChangeText={(specialization) => this.setState({specialization})}
                value={this.state.specialization}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Tanulmányok'}
              </Text>
              <TextInput
                ref='FirstInput'
                returnKeyType='go'
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 40}}
                onChangeText={(education) => this.setState({education})}
                value={this.state.education}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Tárgyi erőforrás'}
              </Text>
              <TextInput
                ref='SecondInput'
                returnKeyType='go'
                multiline
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 120, textAlignVertical: "top"}}
                onChangeText={(material) => this.setState({material})}
                value={this.state.material}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
        </View> 
        <View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Humán erőforrás'}
              </Text>
              <TextInput
                ref='FirstInput'
                returnKeyType='go'
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 120, textAlignVertical: "top"}}
                multiline
                onChangeText={(human) => this.setState({human})}
                value={this.state.human}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Szolgáltatás'}
              </Text>
              <TextInput
                ref='FirstInput'
                returnKeyType='go'
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 120, textAlignVertical: "top"}}
                onChangeText={(service) => this.setState({service})}
                value={this.state.service}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Leírás'}
              </Text>
              <TextInput
                ref='FirstInput'
                returnKeyType='go'
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 120, textAlignVertical: "top"}}
                multiline
                onChangeText={(description) => this.setState({description})}
                value={this.state.description}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
            <View>
              <Text style={{fontSize:12, color:'gray'}}>
                {'Kulcsszavak'}
              </Text>
              <TextInput
                ref='SecondInput'
                returnKeyType='go'
                multiline
                secureTextEntry={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{height: 120}}
                onChangeText={(keywords) => this.setState({keywords})}
                value={this.state.keywords}/>
          <View style={{height:1, paddingTop:0.3, backgroundColor:'gray', top:-10}}/> 
            </View>
        </View>

        <View style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
          <TouchableOpacity onPress={ () => this.reg() }>
            <View style={{height:40, backgroundColor:'white', width:width-40, borderColor:'#2E348B', borderRadius:10, borderWidth:1, justifyContent:'center', alignItems:'center', borderRadius:20}}>
              <Text style={{color:'#2E348B'}}>{'Regisztráció'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>

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
  