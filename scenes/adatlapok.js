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
import api from "../utilities/api";

import { Router, Scene, Actions } from "react-native-router-flux";

import { CachedImage, ImageCacheProvider } from "react-native-cached-image";

import SearchBar from "react-native-searchbar";
import Swiper from "react-native-swiper";
import Drawer from "react-native-drawer-menu";
import SideBar from "./sidebar";

var { height, width } = Dimensions.get("window");

var people = require("./people.json");

const instructions = Platform.select({});

export default class Find extends Component<{}> {
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
      dataSource: people,
      lista: []
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
  }
  handleSwipeIndexChange(index) {
    this.setState({ index });
  }

  componentDidMount() {
    return fetch("https://iszosz.herokuapp.com/users", {
      method: "GET",
      headers: {}
    })
      .then(users => users.json())
      .then(user => {
        console.log(user);
        this.setState({
          lista: user
        });
        console.log(this.state.lista);
      });
  }

  componentWillMount() {
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
    console.log(this.state.results);
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
            <View // Special animatable View
              style={{
                alignItems: "center" // Bind opacity to animated value
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: "black", fontSize: 20 }}>
                  {"Többiek"}
                </Text>
              </View>
            </View>

            <View
              style={{
                height: width / 9,
                width: width / 9
              }}
            />
          </View>
          <ScrollView
            removeClippedSubviews={true}
            style={{ backgroundColor: "transparent", marginTop: 20 }}
          >
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.lista)}
              enableEmptySections={true}
              initialListSize={0}
              contentContainerStyle={styles.list}
              scrollEnabled={true}
              pageSize={2}
              renderRow={(rowData, sectionID, rowID, highlightRow) => (
                <View
                  numberOfLines={1}
                  style={{ backgroundColor: "transparent" }}
                >
                  <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        Actions.findreszletes({ user: rowData });
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#D3D3D3",
                          width: width / 2 - 10,
                          height: height / 3,
                          borderRadius: 10
                        }}
                      >
                        <CachedImage
                          resizeMode="cover"
                          source={{ uri: rowData.imageURL }}
                          style={{
                            width: width / 2 - 10,
                            height: height / 6,
                            zIndex: 100,
                            borderRadius: 10
                          }}
                        />
                        <Text
                          numberOfLines={2}
                          style={[
                            styles.cim,
                            {
                              color: "black",
                              marginLeft: 5,
                              marginTop: 5,
                              marginRight: 5,
                              textAlign: "center",
                              fontSize: 12
                            }
                          ]}
                        >
                          {rowData.name} - {rowData.city}
                        </Text>
                        <Text
                          numberOfLines={4}
                          style={[
                            styles.cim,
                            {
                              color: "black",
                              marginLeft: 5,
                              marginTop: 5,
                              marginRight: 5,
                              textAlign: "center",
                              fontSize: 12
                            }
                          ]}
                        >
                          {rowData.specialization}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <View style={{ height: 100 }} />
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
    backgroundColor: "transparent",
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
