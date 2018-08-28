import React, { Component } from "react";
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
} from "react-native";
const base64 = require("base-64");
const utf8 = require("utf8");
import ModalActivityIndicator from "react-native-modal-activityindicator";

import { Router, Scene, Actions } from "react-native-router-flux";

import * as Keychain from "react-native-keychain";

const instructions = Platform.select({});

export default class Login extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      text: "",
      password: "",
      email: "",
      token: "",
      user: [],
      fadeAnim: new Animated.Value(0)
    };
    Actions.reset("login");
  }

  /*async setItem() {
    var data = {
      id: this.state.user.id,
      token: this.state.token,
      name: this.state.user.name,
      petName: this.state.user.picture
    };
    const dataok = JSON.stringify(data);
    const username = this.state.user.id;
    const password = this.state.token;
    console.log(dataok);

    await AsyncStorage.setItem("@eterkep:user", dataok);
    const value = await AsyncStorage.getItem("@eterkep:user");
    if (value !== null) {
      // We have data!!
      console.log("mentve az adat");
      console.log(value);
    }

    // Store the credentials
    await Keychain.setGenericPassword(username, password);
  }*/

  login = async () => {
    this.setState({ indicator: true });

    var path = "https://iszosz.herokuapp.com/login";
    var dataString =
      "email=" + this.state.email + "&password=" + this.state.password;

    fetch(path, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache"
      },
      method: "POST",

      body: dataString
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("responseData");
        console.log(responseData);
        this.setState({ indicator: false });

        if (responseData.hasOwnProperty("token")) {
          console.log(responseData.token);
          /*var userData = {
            token : responseData.token;
            id : responseData.id;
            petName : responseData.petName;
          }
          
          AsyncStorage.setItem("@eterkep:userData", JSON.stringify(userData));*/
          Alert.alert("Sikeres Bejelentkezés!", " ");

          Actions.home({
            token: responseData.token,
            petName: responseData.petName,
            id: responseData.id
          });
        } else {
          Alert.alert("Hiba történt!", "Kérjük próbálkozzon újra");
        }
      })
      .catch(error => {
        this.setState({ indicator: false });

        console.log(error);
        Alert.alert("Hiba történt!", "Kérjük próbálkozzon újra");
      });
  };

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 5000 // Make it take a while
      }
    ).start(); // Starts the animation
  }

  componentWillMount() {}

  validate() {
    if (this.state.password === "12345") {
      Actions.home();
      this.setState({ password: "" });
    } else {
      Alert.alert("Hibás jelszó", "Kérjük, próbálja újra!");
    }
  }

  render() {
    let { fadeAnim } = this.state;
    var { height, width } = Dimensions.get("window");
    var iWidth = width / 240;

    return (
      <View style={styles.container}>
        <ModalActivityIndicator
          visible={this.state.indicator}
          size="large"
          color="white"
        />

        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            opacity: fadeAnim
          }}
        >
          <Image
            source={require("../src/man.png")}
            style={{ width: width * 0.8, height: width / 3 }}
          />
        </Animated.View>

        <View
          style={{
            padding: 20,
            marginTop: height / 50,
            position: "absolute",
            bottom: 10
          }}
        >
          <View>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>{"E-mail"}</Text>
              <TextInput
                ref="SecondInput"
                returnKeyType="go"
                secureTextEntry={false}
                underlineColorAndroid="rgba(0,0,0,0)"
                style={{ height: 40 }}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
              <View
                style={{
                  height: 1,
                  paddingTop: 0.3,
                  backgroundColor: "gray",
                  top: -10
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>{"Jelszó"}</Text>
              <TextInput
                ref="SecondInput"
                returnKeyType="go"
                secureTextEntry={true}
                underlineColorAndroid="rgba(0,0,0,0)"
                style={{ height: 40 }}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
              <View
                style={{
                  height: 1,
                  paddingTop: 0.3,
                  backgroundColor: "gray",
                  top: -10
                }}
              />
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10
            }}
          >
            <TouchableOpacity onPress={() => this.login()}>
              <View
                style={{
                  height: 40,
                  backgroundColor: "#2E348B",
                  width: width - 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20
                }}
              >
                <Text style={{ color: "white" }}>{"Bejelentkezés"}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10
            }}
          >
            <TouchableOpacity onPress={() => Actions.reg()}>
              <View
                style={{
                  height: 40,
                  backgroundColor: "white",
                  width: width - 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20
                }}
              >
                <Text style={{ color: "#2E348B" }}>{"Regisztráció"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
