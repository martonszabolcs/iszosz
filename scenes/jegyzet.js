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
import MultiSelect from "react-native-multiple-select";

import { Router, Scene, Actions } from "react-native-router-flux";

import * as Keychain from "react-native-keychain";

const instructions = Platform.select({});

export default class Login extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      text: "",
      fadeAnim: new Animated.Value(0),
      password: "",
      email: "",
      name: "",
      city: "",
      access_token: "",
      role: "admin",
      organization: "",
      specialization: "",
      education: "",
      material: "",
      human: "",
      service: "",
      description: "",
      petName: "pet",
      selectedItems: []
    };
    this.getItem();
  }
  async getItem() {
    try {
      const values = await AsyncStorage.getItem("@eterkep:user");
      if (values !== null) {
        const value = JSON.parse(values);
        this.setState({
          userId: value.id,
          token: value.token,
          userName: value.name
        });
        this.me();
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  news = async () => {
    let data = {
      method: "POST",
      credentials: "same-origin",
      mode: "same-origin",
      body: JSON.stringify({
        people: this.state.userName,
        title: this.state.title,
        content: this.state.content,
        image: "image"
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    return fetch("https://dry-mountain-15425.herokuapp.com/notes", data)
      .then(response => response.json())
      .then(responseJson => {
        Actions.home();
      })
      .catch(error => {
        alert("HIBA");
      });
  };

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 500 // Make it take a while
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
    console.log(this.state.material);

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Animated.View // Special animatable View
              style={{
                ...this.props.style,
                opacity: fadeAnim // Bind opacity to animated value
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 30
                }}
              >
                <Text style={{ color: "black", fontSize: 30 }}>
                  {"Új jegyzet"}
                </Text>
              </View>
            </Animated.View>
            <View style={{ width: width, height: width / 9 }}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <View
                  style={{
                    marginLeft: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    height: width / 9,
                    width: width / 9,
                    borderRadius: 30,
                    marginLeft: 5
                  }}
                >
                  <Image
                    source={require("../src/backs.png")}
                    style={{ width: width / 12, height: width / 12 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30
              }}
            >
              <Image
                source={require("../src/notes.png")}
                style={{ width: height / 4, height: height / 4 }}
              />
            </View>

            <View style={{ padding: 20, marginTop: height / 50, bottom: 10 }}>
              <View>
                <View>
                  <Text style={{ fontSize: 12, color: "gray" }}>
                    {"Jegyzet címe"}
                  </Text>
                  <TextInput
                    ref="FirstInput"
                    returnKeyType="go"
                    secureTextEntry={false}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={{ height: 40 }}
                    onChangeText={title => this.setState({ title })}
                    value={this.state.title}
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

                <Text style={{ fontSize: 12, color: "gray" }}>{"Leírás"}</Text>
                <TextInput
                  ref="FirstInput"
                  returnKeyType="go"
                  secureTextEntry={false}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  style={{ height: 120, textAlignVertical: "top" }}
                  multiline
                  onChangeText={content => this.setState({ content })}
                  value={this.state.content}
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
              {/*<View style={{ flex: 1 }}>
                  <MultiSelect
                    hideTags
                    items={items}
                    uniqueKey="id"
                    ref={component => {
                      this.multiSelect = component;
                    }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Válassz kategóriát"
                    searchInputPlaceholderText="Kulcsszó"
                    onChangeInput={text => console.log(text)}
                    //altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    //displayKey="name"
                    searchInputStyle={{ color: "#CCC" }}
                    submitButtonColor="#CCC"
                    submitButtonText="Kész"
                  />
                  <View />
                </View>*/}
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <TouchableOpacity onPress={() => this.news()}>
                <View
                  style={{
                    height: 40,
                    backgroundColor: "white",
                    width: width - 40,
                    borderColor: "#2E348B",
                    borderRadius: 10,
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20
                  }}
                >
                  <Text style={{ color: "#2E348B" }}>
                    {"Jegyzet hozzáadása!"}
                  </Text>
                </View>
              </TouchableOpacity>
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
    backgroundColor: "white"
  }
});
