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
  Easing,
  DrawerLayoutAndroid
} from "react-native";

import { Router, Scene, Actions } from "react-native-router-flux";

import SearchBar from "react-native-searchbar";
import Swiper from "react-native-swiper";
import Drawer from "react-native-drawer-menu";
var { height, width } = Dimensions.get("window");

export default class Sidebar extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {};
  }

  logout() {
    AsyncStorage.setItem("@eterkep:user", "");
    Actions.login();
  }

  render() {
    var { height, width } = Dimensions.get("window");
    var iWidth = width / 240;
    var cornerLeft = width - 10; // 10 is the width/height of the corner
    var cornerTop = height - 10;

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: height / 6,
            backgroundColor: "#2E348B",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              margin: 10,
              fontSize: 30,
              color: "white",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            MENÜ
          </Text>
        </View>

        <TouchableOpacity onPress={() => Actions.profile()}>
          <View
            style={{
              height: height / 20,
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "black", fontSize: 30 }}>{"Profilom"}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Actions.adatlapok({ keywords: "Adatlapok" })}
        >
          <View
            style={{
              height: height / 20,
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>{"Adatlapok"}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.logout()}>
          <View
            style={{
              height: height / 20,
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>
              {"Kijelentkezés"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  menu: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  felirat: {
    color: "black",
    textAlign: "center",
    marginTop: 1,
    fontSize: 10
  },
  felirat2: {
    color: "black",
    textAlign: "center",
    fontSize: 10
  },
  menu1: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    resizeMode: "cover" // or 'stretch'
  },
  modal: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  }
});
