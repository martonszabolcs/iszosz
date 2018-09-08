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
import api from "../utilities/api";
import * as Keychain from "react-native-keychain";
const SideMenu = require("react-native-side-menu");
import ModalActivityIndicator from "react-native-modal-activityindicator";

import SearchBar from "react-native-searchbar";
import Swiper from "react-native-swiper";
import Drawer from "react-native-drawer-menu";
import SideBar from "./sidebar";
import Search from "./search";

var { height, width } = Dimensions.get("window");

const instructions = Platform.select({});

export default class Home extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      text: "",
      password: "",
      results: "",
      menuOpen: false,
      modalVisible: false,
      modalVisible2: false,
      index: 0,
      petName: "",
      id: "",
      canavasOpen: this.props.canavasOpen,
      token: "",
      tabbar: "left",
      oldal: this.props.oldal,
      lista: [],
      reg: this.props.reg,
      products: []
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
    this._storeData();
  }

  getProducts() {
    if (this.state.reg == "jaja") {
      console.log(this.state.token);
      let data = {
        method: "GET",
        headers: {}
      };
      return fetch("https://iszosz.herokuapp.com/products", data)
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
    } else {
      console.log(this.state.token);
      let data = {
        method: "GET",
        headers: {
          Authorization: this.state.token
        }
      };
      return fetch("https://iszosz.herokuapp.com/products", data)
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

  logout() {
    this.setState({ indicator: true });

    return fetch(
      "https://iszosz.herokuapp.com/users/" + this.state.id + "/logout",
      {}
    )
      .then(logout => logout.json())
      .then(json => {
        AsyncStorage.setItem("@eterkep:userData", "");

        setTimeout(() => {
          Actions.login();
          this.setState({ indicator: false });
        }, 500);
      });
  }

  handleSwipeIndexChange(index) {
    this.setState({ index });
  }

  componentDidMount() {
    setTimeout(() => {
      console.log(this.state.token);
      let data = {
        method: "GET",
        headers: {
          Authorization: this.state.token
        }
      };
      return fetch("https://iszosz.herokuapp.com/notes", data)
        .then(notes => notes.json())
        .then(lista => {
          if (lista.hasOwnProperty("error")) {
            AsyncStorage.setItem("@eterkep:userData", "");

            Actions.login();
          }
          this.setState({
            lista: lista.reverse()
          });
          console.log(this.state.lista);
        })
        .catch(error => {
          Actions.login();
          AsyncStorage.setItem("@eterkep:userData", "");

          Alert.alert("Hiba történt!", "Jelentkezz be újra");
        });
    }, 200);
  }

  componentWillMount() {
    if (this.state.oldal == "right") {
      this.setState({ tabbar: "right" });
      setTimeout(() => {
        this.getProducts();
      }, 500);
    }
    OneSignal.init("5536a6e1-908a-46d9-946f-aad787c376aa");
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
    console.log(this.state);
    console.log(this.state.canavasOpen);
    if (this.state.canavasOpen === 1) {
      this.props.handleMenu();
    }
  }
  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }

  onIds(device) {
    console.log("Device info: ", device);
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
  available(available) {
    if (available) {
      return "#309272";
    } else {
      return "#914646";
    }
  }

  faliujsag() {
    if (this.state.tabbar == "left") {
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
                        Actions.jegyzetReszletes({
                          note: rowData
                        });
                      }}
                    >
                      <View
                        style={{
                          width: width / 1.5,
                          backgroundColor: "transparent",
                          alignItems: "center",
                          marginLeft: 20,
                          marginRight: 20,
                          flexDirection: "row",
                          top: 30,
                          zIndex: 100,
                          backgroundColor: "white"
                        }}
                      >
                        <Image
                          style={{
                            width: width / 6,
                            height: width / 6,
                            borderRadius: 30
                          }}
                          source={{
                            uri: rowData.owner.imageURL
                          }}
                        />
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.cim,
                            {
                              color: "black",
                              marginLeft: 5,
                              marginTop: 5,
                              marginRight: 5,
                              fontSize: 18,
                              fontWeight: "bold"
                            }
                          ]}
                        >
                          {rowData.owner.name}
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: "white",
                          width: width - 40,
                          height: width / 3,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: "#309272",
                          flexDirection: "row"
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text
                            numberOfLines={3}
                            style={[
                              styles.cim,
                              {
                                color: "black",
                                padding: 10,
                                fontSize: 14,
                                top: 30
                              }
                            ]}
                          >
                            {rowData.desc}
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
    } else {
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
            <View
              style={{
                width: width - 10,
                backgroundColor: "white",
                borderRadius: 10,
                borderWidth: 1,
                padding: 5,
                borderColor: "gray",
                marginLeft: 5,
                marginTop: 5,
                marginRight: 5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 14, textAlign: "center" }}>
                {" "}
                Ha egy erőforrás kerete piros akkor jelenleg foglalt, ha zöld
                akkor szabad{" "}
              </Text>
            </View>
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
                        Actions.productReszletes({ info: rowData });
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
                          {rowData.desc}
                        </Text>
                        <View
                          style={{
                            backgroundColor: this.available(rowData.available),
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            bottom: 0
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
  }

  render() {
    console.log(this.state.tabbar);
    if (this.state.tabbar == "left") {
      var textFaliujsag = "#2A9371";
      var backgroundFaliujsag = "white";
      var textUjtermek = "white";
      var backgroundUjtermek = "#2A9371";
    } else {
      var textFaliujsag = "white";
      var backgroundFaliujsag = "#2A9371";
      var textUjtermek = "#2A9371";
      var backgroundUjtermek = "white";
    }

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
        <TouchableHighlight
          onPress={() => this.setState({ modalVisible2: true })}
          underlayColor="transparent"
          style={[
            styles.newFlight,
            { top: height * 0.75, left: addFlightLeft }
          ]}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../src/plus.png")}
          />
        </TouchableHighlight>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              width: width,
              height: height,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: width / 1.5,
                height: width / 1.5,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.jegyzet({
                    id: this.state.id,
                    token: this.state.token
                  });
                  this.setState({ modalVisible2: false });
                }}
              >
                <View
                  style={{
                    width: width / 2,
                    height: width / 9,
                    backgroundColor: "#309272",
                    justifyContent: "center",
                    borderRadius: 10,
                    alignItems: "center",
                    marginTop: height / 20
                  }}
                >
                  <Text style={{ color: "white", fontSize: 15 }}>
                    {" "}
                    Új jegyzet a faliújságra{" "}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Actions.productUpload({
                    id: this.state.id,
                    token: this.state.token
                  });
                  this.setState({ modalVisible2: false });
                }}
              >
                <View
                  style={{
                    width: width / 2,
                    height: width / 9,
                    backgroundColor: "#914646",
                    justifyContent: "center",
                    borderRadius: 10,
                    alignItems: "center",
                    marginTop: height / 20
                  }}
                >
                  <Text style={{ color: "white", fontSize: 15 }}>
                    {" "}
                    Új erőforrás feltöltése{" "}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible2: false });
                }}
              >
                <View
                  style={{
                    width: width / 2,
                    height: width / 9,
                    backgroundColor: "white",
                    justifyContent: "center",
                    borderRadius: 10,
                    alignItems: "center",
                    marginTop: height / 20
                  }}
                >
                  <Text style={{ color: "#914646", fontSize: 15 }}>
                    {" "}
                    Mégse{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <ViewPagerAndroid
            initialPage={this.state.index}
            style={{ flex: 1 }}
            onPageSelected={e => {
              console.log(e.nativeEvent.position);
            }}
            ref={viewPager => {
              this.viewPager = viewPager;
            }}
          >
            <View style={styles.pageStyle} key="1">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: height / 20
                }}
              >
                <TouchableOpacity onPress={() => this.viewPager.setPage(1)}>
                  <View>
                    <Image
                      source={require("../src/next.png")}
                      style={{ width: width / 5, height: width / 5 }}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 24
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
            <View style={styles.pageStyle} key="2">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: height / 20
                }}
              >
                <TouchableOpacity onPress={() => this.viewPager.setPage(2)}>
                  <View>
                    <Image
                      source={require("../src/next.png")}
                      style={{ width: width / 5, height: width / 5 }}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: 16
                  }}
                >
                  Az Erőforrástérkép az Ifjúsági Szolgáltatók Országos
                  Szövetsége által létrehozott, az ifjúsági területen
                  tevékenykedő szakemberek, szervezetek számára elérhető
                  adatbázis, amely lehetővé teszi azon erőforrások
                  megjelenítését, melyek a fenntartható és optimális
                  kihasználtságot, költséghatékonyságot és profizmust
                  biztosítják a megosztók munkája során. Az Erőforrástérkép az
                  ISZOSZ mindenkori tagságának és a releváns partnereinek
                  készült.
                </Text>

                <Text style={{ color: "black", fontSize: 30 }}> </Text>
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

            <View style={styles.pageStyle} key="3">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: height / 20
                }}
              >
                <TouchableOpacity onPress={() => this.viewPager.setPage(3)}>
                  <View>
                    <Image
                      source={require("../src/next.png")}
                      style={{ width: width / 5, height: width / 5 }}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: 16
                  }}
                >
                  Jelenleg az applikációnak egy teszt verziója érhető el. Három
                  fő kategóriával találkozhatsz: humán és tárgyi erőforrások,
                  valamint az előbbi kettőnél összetettebb, „csomagszerű”
                  szolgáltatás kategóriákkal. A kereső jelenleg csak az E-térkép
                  előbbi 3 fő kategóriájának alkategóriáira tud rákeresni, ám a
                  közeljövőben tartalmi keresést is elérhetővé szeretnénk tenni.
                  A megosztott tartalmak személyekhez kötött adatlapokon
                  érhetőek el. A kategorizált adatbázis egyelőre még nem
                  elérhető, tehát kérjük a lap tetején található keresőt, vagy a
                  baloldalról nyíló menü adatlapok menüpontját használd a
                  böngészéséhez.
                </Text>

                <Text style={{ color: "black", fontSize: 30 }}> </Text>
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
            <View style={styles.pageStyle} key="4">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: height / 20
                }}
              >
                <TouchableOpacity onPress={() => this.viewPager.setPage(0)}>
                  <View>
                    <Image
                      source={require("../src/backs.png")}
                      style={{ width: width / 5, height: width / 5 }}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: 16
                  }}
                >
                  Az adatlapok jelenleg még általatok nem szerkeszthetőek, ezt
                  az első fejlesztés során, egy PC-ről is elérhető admin felület
                  létrehozásával szeretnénk elérni. Ahhoz, hogy fejleszteni
                  tudjuk az applikációt, szükségünk van a te véleményedre,
                  ötleteidre is, amiket a titkar@iszosz.org email címen tudsz
                  megosztani velünk! Az APP első fejlesztése nyár elején
                  várható!
                </Text>

                <Text style={{ color: "black", fontSize: 30 }}> </Text>
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
          </ViewPagerAndroid>
        </Modal>

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
              backgroundColor: "#2A9371",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Figyelmeztetés!",
                  "Biztos, hogy kijelentkezel?",
                  [
                    {
                      text: "Mégse",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "Igen", onPress: () => this.logout() }
                  ],
                  { cancelable: false }
                );
              }}
            >
              <View style={[styles.menu1]}>
                <Image
                  source={require("../src/logout.png")}
                  style={{ width: width / 10, height: width / 10 }}
                />
              </View>
            </TouchableOpacity>

            <Text style={{ color: "white", fontSize: 20 }}>
              {"Szia " + this.state.petName + "!"}
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
                {"id:" + this.state.id}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: width,
              height: 25,
              backgroundColor: "#2A9371",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ tabbar: "left" });
              }}
            >
              <View
                style={{
                  backgroundColor: backgroundFaliujsag,
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: width / 2,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  paddingTop: 2,
                  height: 25
                }}
              >
                <Text style={{ color: textFaliujsag, fontSize: 16 }}>
                  {" "}
                  Faliújság{" "}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({ tabbar: "right" });
                this.getProducts();
              }}
            >
              <View
                style={{
                  backgroundColor: backgroundUjtermek,
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: width / 2,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  paddingTop: 2,
                  height: 25
                }}
              >
                <Text style={{ color: textUjtermek, fontSize: 16 }}>
                  {" "}
                  Új erőforrások{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

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
