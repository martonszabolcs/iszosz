import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
  Modal,
  InteractionManager,
  ScrollView,
  Platform,
  BackHandler,
  AsyncStorage,
  Alert
} from "react-native";
//import SplashScreen from 'react-native-splash-screen'

import { Router, Scene, Actions } from "react-native-router-flux";

import SplashScreen from "react-native-smart-splash-screen";

import login from "./scenes/login";
import home from "./scenes/home";
import bongeszes from "./scenes/bongeszes";
import adatlap from "./scenes/adatlap";
import find from "./scenes/find";
import findreszletes from "./scenes/findreszletes";
import adatlapok from "./scenes/adatlapok";
import reg from "./scenes/reg";
import regDone from "./scenes/regDone";
import profile from "./scenes/profile";
import jegyzet from "./scenes/jegyzet";
import jegyzetReszletes from "./scenes/jegyzetReszletes";

export default class Flux extends Component {
  constructor(props) {
    super(props);
    console.log("component created");
    this.state = {};
    this.getItem();
  }
  async getItem() {
    try {
      const values = await AsyncStorage.getItem("@eterkep:userData");
      console.log(values);
      var value = JSON.parse(values);

      if (value.hasOwnProperty("token")) {
        Actions.home();
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }
  componentDidMount() {
    //Actions.reset('login');
    console.log("myView loaded");
    if (Platform.OS === "android") {
      SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 1500,
        delay: 1000
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    console.log("addEventListener");
    console.log(Actions.state.index);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    if (Actions.state.index != 0) {
      Actions.pop();
      return true;
    } else {
      Alert.alert(
        "Alkalmazás bezárása",
        "Biztosan bezárod az alkalmazást?",
        [
          {
            text: "Mégse",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Igen", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );
      return true;
    }
  };

  //SplashScreen.hide();

  handleLogout() {
    console.log("User logged out");
  }

  StatusBarcsik() {
    if (Platform.OS == "ios") {
      return <View style={{ height: 20, backgroundColor: "white" }} />;
    }
  }

  render() {
    console.log("render");
    // Lekerekitett sarkok pozicioja
    var { height, width } = Dimensions.get("window");
    var cornerLeft = width - 10; // 10 is the width/height of the corner
    var cornerTop = height - 10;

    return (
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          paddingTop: 0,
          flexDirection: "column"
        }}
      >
        {this.StatusBarcsik()}
        {/* Lekerekitett sarok */}
        <View style={[styles.roundedCorner, { top: 0, left: 0 }]}>
          <Image
            style={styles.roundedCornerImage}
            source={require("./src/images/style/corner-top-left.png")}
          />
        </View>
        <View style={[styles.roundedCorner, { top: 0, left: cornerLeft }]}>
          <Image
            style={styles.roundedCornerImage}
            source={require("./src/images/style/corner-top-right.png")}
          />
        </View>
        <View style={[styles.roundedCorner, { top: cornerTop, left: 0 }]}>
          <Image
            style={styles.roundedCornerImage}
            source={require("./src/images/style/corner-bottom-left.png")}
          />
        </View>
        <View
          style={[styles.roundedCorner, { top: cornerTop, left: cornerLeft }]}
        >
          <Image
            style={styles.roundedCornerImage}
            source={require("./src/images/style/corner-bottom-right.png")}
          />
        </View>

        <StatusBar hidden={false} transparent={false} />

        <Router>
          <Scene key="root" hideNavBar={true} duration={10}>
            <Scene
              key="login"
              hideNavBar={true}
              component={login}
              initial={true}
              title="E-Térkép"
              onRight={() => {
                BackHandler.exitApp();
              }}
              rightTitle="Kilépés"
            />
            <Scene key="home" component={home} title="home" />
            <Scene key="bongeszes" component={bongeszes} title="bongeszes" />
            <Scene key="adatlap" component={adatlap} title="adatlap" />
            <Scene key="find" component={find} title="find" />
            <Scene
              key="findreszletes"
              component={findreszletes}
              title="findreszletes"
            />
            <Scene key="adatlapok" component={adatlapok} title="adatlapok" />
            <Scene key="profile" component={profile} title="profile" />
            <Scene key="reg" component={reg} title="reg" />
            <Scene key="regDone" component={regDone} title="regDone" />
            <Scene key="jegyzet" component={jegyzet} title="jegyzet" />
            <Scene
              key="jegyzetReszletes"
              component={jegyzetReszletes}
              title="jegyzetReszletes"
            />
          </Scene>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // lekerekitett sarkok
  roundedCorner: {
    width: 10,
    height: 10,
    position: "absolute",
    zIndex: 10
  },

  roundedCornerImage: {
    width: 10,
    height: 10
  }
});
