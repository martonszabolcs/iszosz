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
      id: this.props.id
    };
    console.log(this.state.id);
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
          userName: value.name,
          picture: value.picture
        });
        this.me();
        console.log(this.state.image);
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  deleteApi() {
    return fetch(
      "https://dry-mountain-15425.herokuapp.com/notes/" + this.state.id,
      {
        method: "DELETE"
      }
    );
    api.res().then(res => {
      Actions.home();
    });
  }

  delete() {
    console.log(this.state.jegyzetName);
    console.log(this.state.userName);
    if (this.state.jegyzetName == this.state.userName) {
      return (
        <TouchableOpacity onPress={() => this.deleteApi()}>
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
            <Text style={{ color: "#2E348B" }}>{"Jegyzet törlése!"}</Text>
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
            <View // Special animatable View
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 30
                }}
              >
                <Text style={{ color: "black", fontSize: 30 }}>
                  {this.state.title}
                </Text>
              </View>
            </View>
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

            <View
              style={{
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: height / 50,
                bottom: 10
              }}
            >
              <View>
                <View style={{ height: 50 }}>
                  <Text
                    style={{ fontSize: 50, textAlign: "center", color: "gray" }}
                  >
                    {this.state.jegyzetName}
                  </Text>
                </View>
                <View style={{ height: 100, marginTop: 20 }}>
                  <ScrollView>
                    <Text
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                        color: "gray"
                      }}
                    >
                      {this.state.content}
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
