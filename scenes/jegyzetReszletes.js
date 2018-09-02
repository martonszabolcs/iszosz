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
var { height, width } = Dimensions.get("window");

import { Router, Scene, Actions } from "react-native-router-flux";

import * as Keychain from "react-native-keychain";

const instructions = Platform.select({});

export default class Login extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      jegyzetName: this.props.jegyzetName,
      title: this.props.title,
      content: this.props.content,
      id: this.props.id,
      note: this.props.note
    };
    console.log(this.state.id);
    this._storeData();
  }
  _storeData = async () => {
    try {
      const value = await AsyncStorage.getItem("@eterkep:userData");
      if (value !== null) {
        var values = JSON.parse(value);
        this.setState({
          token: values.token,
          id: values.id,
          petName: values.petName
        });
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  deleteApi() {
    let data = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
    return fetch(
      "https://iszosz.herokuapp.com/users/" +
        this.state.id +
        "/notes/" +
        this.state.note.id,
      data
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        Actions.home();
      })
      .catch(error => {
        console.log(error);

        Actions.home();
      });
  }

  delete() {
    console.log(this.state.jegyzetName);
    console.log(this.state.userName);
    if (this.state.note.userId == this.state.id) {
      return (
        <TouchableOpacity onPress={() => this.deleteApi()}>
          <View
            style={{
              height: 40,
              backgroundColor: "white",
              width: width - 40,
              borderColor: "#914646",
              borderRadius: 10,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20
            }}
          >
            <Text style={{ color: "#914646" }}>{"Jegyzet törlése!"}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  componentDidMount() {}

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
    var iWidth = width / 240;
    console.log(this.state.material);

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View
              style={{
                width: width,
                height: width / 9,
                backgroundColor: "transparent",
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity onPress={() => Actions.home()}>
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
              <Animated.View // Special animatable View
                style={{
                  ...this.props.style,
                  opacity: fadeAnim,
                  alignItems: "center" // Bind opacity to animated value
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    width: width / 2
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ color: "black", fontSize: 20 }}
                  >
                    {this.state.note.title}
                  </Text>
                </View>
              </Animated.View>

              <View
                style={{
                  height: width / 9,
                  width: width / 9
                }}
              />
            </View>

            <View
              style={{
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: height / 50,
                bottom: 10
              }}
            >
              <View
                style={{
                  justifyContent: "space-around",
                  flexDirection: "row",
                  alignItems: "center",
                  width: width - 40,
                  borderRadius: 20,
                  borderColor: "white",
                  borderWidth: 1
                }}
              >
                <Image
                  source={{ uri: this.state.note.userImageUrl }}
                  style={{
                    width: width / 3,
                    height: width / 3,
                    borderRadius: 30
                  }}
                />
                <View
                  style={{
                    justifyContent: "center",
                    width: width / 2.5,
                    alignItems: "center",
                    flexDirection: "column",
                    marginRight: 10
                  }}
                >
                  <Text
                    style={{ fontSize: 20, textAlign: "center", color: "gray" }}
                  >
                    {this.state.note.userName}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      color: "black"
                    }}
                  >
                    {this.state.note.title}
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    height: width * 0.7,
                    width: width - 40,
                    backgroundColor: "#EEEEEE",
                    borderRadius: 10,
                    marginTop: 20
                  }}
                >
                  <ScrollView>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "left",
                        padding: 10,
                        color: "gray"
                      }}
                    >
                      {this.state.note.desc}
                    </Text>
                  </ScrollView>
                </View>
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
              {this.delete()}
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
