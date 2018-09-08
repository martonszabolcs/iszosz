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
  Easing,
  DrawerLayoutAndroid,
  ViewPagerAndroid
} from "react-native";

import OneSignal from "react-native-onesignal"; // Import package from node modules

import { Router, Scene, Actions } from "react-native-router-flux";
import moment from "moment";
import api from "../utilities/api";
import localization from "moment/locale/hu";

import * as Keychain from "react-native-keychain";
const SideMenu = require("react-native-side-menu");
import ModalActivityIndicator from "react-native-modal-activityindicator";

import SideBar from "./sidebar";

var { height, width } = Dimensions.get("window");

const instructions = Platform.select({});

export default class Category extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      text: "",
      category: this.props.category,
      keywords: this.props.keywords,
      products: []
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
    this._storeData();
    moment()
      .locale("hu", localization)
      .format("LLL");
  }

  getProducts() {
    console.log(this.state.token);
    let data = {
      method: "GET",
      headers: {}
    };
    return fetch(
      "https://iszosz.herokuapp.com/products?c=" + this.state.category,
      data
    )
      .then(notes => notes.json())
      .then(products => {
        this.setState({
          products: products.reverse()
        });
        console.log(this.state.products);
      })
      .catch(error => {
        Actions.login();
        Alert.alert("Hiba történt!", "Jelentkezz be újra");
      });
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

  componentDidMount() {}

  componentWillMount() {
    this.getProducts();

    if (this.state.canavasOpen === 1) {
      this.props.handleMenu();
    }
  }
  componentWillUnmount() {}
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }
  available(available) {
    if (available) {
      return "#309272";
    } else {
      return "#914646";
    }
  }

  faliujsag() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <ScrollView
          removeClippedSubviews={true}
          style={{ backgroundColor: "transparent" }}
        >
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.products)}
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
                      Actions.productReszletes({
                        info: rowData,
                        bongeszes: this.state.category,
                        keywords: this.state.keywords
                      });
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        borderColor: this.available(rowData.available),
                        borderWidth: 1,
                        borderRadius: 10,
                        width: width / 2 - 10,
                        height: height / 3
                      }}
                    >
                      <Image
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
                            fontWeight: "bold",
                            fontSize: 14
                          }
                        ]}
                      >
                        {rowData.title}
                      </Text>
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
                        {rowData.desc}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.cim,
                          {
                            color: "gray",
                            paddingLeft: 10,
                            fontSize: 14,
                            marginTop: 20,
                            position: "absolute",
                            bottom: 0,
                            left: 0
                          }
                        ]}
                      >
                        {moment(Number(rowData.date)).fromNow()}
                      </Text>
                      <View
                        style={{
                          backgroundColor: this.available(rowData.available),
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          bottom: 0,
                          right: 0
                        }}
                      >
                        <Text
                          numberOfLines={4}
                          style={[
                            styles.cim,
                            {
                              color: "white",
                              paddingLeft: 10,
                              paddingRight: 10,
                              textAlign: "center",
                              fontSize: 12
                            }
                          ]}
                        >
                          {rowData.owner.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View style={{ height: 200 }} />
        </ScrollView>
      </View>
    );
  }

  render() {
    var textFaliujsag = "white";
    var backgroundFaliujsag = "#2A9371";
    var textUjtermek = "#2A9371";
    var backgroundUjtermek = "white";

    var { height, width } = Dimensions.get("window");
    var iWidth = width / 240;
    var cornerLeft = width - 10; // 10 is the width/height of the corner
    var cornerTop = height - 10;
    var addFlightLeft = (width - 50) / 2;
    var addFlightTop = height - width / 6;
    var menu = width / 6;

    var navigationView = <SideBar />;

    return (
      <View style={styles.container}>
        <ModalActivityIndicator
          visible={this.state.indicator}
          size="small"
          color="white"
        />

        <View
          style={{
            flex: 1,
            borderRadius: 10,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              width: width,
              backgroundColor: "white",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Actions.bongeszes({ tipus: 1 });
              }}
            >
              <View style={[styles.menu1]}>
                <Image
                  source={require("../src/backs.png")}
                  style={{ width: width / 10, height: width / 10 }}
                />
              </View>
            </TouchableOpacity>

            <Text style={{ color: "black", fontSize: 20 }}>
              {this.state.keywords}
            </Text>

            <View
              style={{
                width: width / 10,
                height: width / 10,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{ color: "white", fontSize: 11, textAlign: "right" }}
              >
                {" "}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: width,
              height: 25,
              backgroundColor: "#914646",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row"
            }}
          />

          {this.faliujsag()}
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
    color: "black",
    fontSize: 20
  },
  viewPager: {
    flex: 1
  },
  pageStyle: {
    alignItems: "center",
    padding: 20
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  newFlightStatic: {
    height: 86,
    width: 86
  },
  newFlight: {
    height: 50,
    width: 50,
    position: "absolute",
    zIndex: 10
  },

  newFlightImage: {
    height: 86,
    width: 86
  }
});
