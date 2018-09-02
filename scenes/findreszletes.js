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
import SideBar from "./sidebar";

var { height, width } = Dimensions.get("window");

var people = require("./people.json");

const instructions = Platform.select({});

export default class FindReszletes extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      text: "",
      password: "",
      results: "",
      menuOpen: false,
      modalVisible: false,
      index: 0,
      canavasOpen: this.props.canavasOpen,
      keywords: this.props.keywords,
      user: this.props.user
    };
  }
  handleSwipeIndexChange(index) {
    this.setState({ index });
  }

  componentDidMount() {}

  componentWillMount() {
    console.log(this.state.canavasOpen);
    if (this.state.canavasOpen === 1) {
      this.props.handleMenu();
    }
  }
  _handleResults(results) {
    //this.setState({ results });
  }

  handleMenu() {
    const { menuOpen } = this.state;
    this.setState({
      menuOpen: !menuOpen
    });
  }

  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    console.log(this.state.user);
    var { height, width } = Dimensions.get("window");
    var iWidth = width / 240;
    var cornerLeft = width - 10; // 10 is the width/height of the corner
    var cornerTop = height - 10;

    var navigationView = <SideBar />;

    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.modal}>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: height / 10
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 30
                }}
              >
                Szeretettel üdvözlünk az E-Térkép első felhasználói, tesztelői
                között!
              </Text>
              <Image
                source={require("../src/homeman.png")}
                style={{ width: width / 2, height: width / 2 }}
              />
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 30 }}
              >
                {" "}
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                bottom: height / 20,
                left: 10,
                right: 10,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.toggleModal(!this.state.modalVisible);
                }}
              >
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
                  <Text style={{ color: "white" }}>{"Bezárás"}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ flex: 1 }}>
          <View
            style={{
              height: width / 9,
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={() => Actions.adatlapok()}>
              <View
                style={{
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
            <View
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                width: width / 2
              }}
            >
              <Text
                numberOfLines={2}
                style={{ color: "black", fontSize: 18, textAlign: "center" }}
              >
                {this.state.user.name}
              </Text>
            </View>
            <View
              style={[
                styles.menu1,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  height: width / 9,
                  width: width / 9,
                  borderRadius: 30,
                  marginLeft: 5
                }
              ]}
            />
          </View>
          <ScrollView
            removeClippedSubviews={false}
            style={{ backgroundColor: "transparent", marginTop: 20 }}
          >
            <View
              style={{
                backgroundColor: "#D3D3D3",
                justifyContent: "center",
                alignItems: "center",
                width: width,
                borderRadius: 10
              }}
            >
              <Image
                resizeMode="cover"
                source={{ uri: this.state.user.imageURL }}
                style={{
                  width: width,
                  resizeMode: "cover",
                  height: height / 3,
                  zIndex: 100,
                  borderRadius: 10
                }}
              />
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 30,
                  width: width,
                  padding: 10
                }}
              >
                <Text
                  style={[
                    styles.cim,
                    {
                      color: "black",
                      marginLeft: 5,
                      marginTop: 5,
                      marginRight: 5,
                      textAlign: "left",
                      fontSize: 14
                    }
                  ]}
                >
                  E-mail: {this.state.user.email}
                </Text>
                <Text
                  style={[
                    styles.cim,
                    {
                      color: "black",
                      marginLeft: 5,
                      marginTop: 5,
                      marginRight: 5,
                      textAlign: "left",
                      fontSize: 14
                    }
                  ]}
                >
                  Szervezet: {this.state.user.organization}
                </Text>
                <Text
                  style={[
                    styles.cim,
                    {
                      color: "black",
                      marginLeft: 5,
                      marginTop: 5,
                      marginRight: 5,
                      textAlign: "left",
                      fontSize: 14
                    }
                  ]}
                >
                  Település: {this.state.user.city}
                </Text>
                <Text
                  style={[
                    styles.cim,
                    {
                      color: "black",
                      marginLeft: 5,
                      marginTop: 5,
                      marginRight: 5,
                      textAlign: "left",
                      fontSize: 14
                    }
                  ]}
                >
                  Végzettség: {this.state.user.education}
                </Text>
              </View>

              <Text
                style={[
                  styles.cim,
                  {
                    color: "black",
                    marginLeft: 5,
                    marginTop: 5,
                    marginRight: 5,
                    textAlign: "center",
                    fontSize: 20
                  }
                ]}
              >
                Szakterület:
              </Text>
              <Text
                style={[
                  styles.cim,
                  {
                    color: "black",
                    marginLeft: 5,
                    marginTop: 5,
                    marginRight: 5,
                    textAlign: "left",
                    fontSize: 14
                  }
                ]}
              >
                {this.state.user.specialization}
              </Text>

              <Text
                style={[
                  styles.cim,
                  {
                    color: "black",
                    marginLeft: 5,
                    marginTop: 5,
                    marginRight: 5,
                    textAlign: "center",
                    fontSize: 20
                  }
                ]}
              >
                Személyes példák:
              </Text>
              <Text
                style={[
                  styles.cim,
                  {
                    color: "black",
                    marginLeft: 5,
                    marginTop: 5,
                    marginRight: 5,
                    textAlign: "left",
                    fontSize: 14
                  }
                ]}
              >
                {this.state.user.description}
              </Text>
            </View>
            <View style={{ height: width / 3 }} />
          </ScrollView>
        </View>

        <View
          style={[
            styles.menu,
            {
              width: width,
              height: width / 4,
              justifyContent: "space-around",
              alignItems: "center"
            }
          ]}
        >
          <TouchableOpacity onPress={() => Actions.profile()}>
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/hum.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
              <Text style={{ color: "#2A9371" }}> Profilom </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.adatlapok()}>
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/menu.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
              <Text style={{ color: "#2F3590" }}> Többiek </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.bongeszes({ tipus: 1 })}>
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/targy.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
              <Text style={{ color: "#914646" }}> Erőforrások </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.toggleModal(!this.state.modalVisible)}
          >
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/inf.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
              <Text style={{ color: "#2F3590" }}> Segítség </Text>
            </View>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});
